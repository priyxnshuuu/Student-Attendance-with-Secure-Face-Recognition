const express = require("express");
const multer = require("multer");
const fs = require("fs");
const xlsx = require("xlsx");
const cors = require("cors"); // Import the cors middleware

const app = express();
const port = 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "photos/");
  },
  filename: (req, file, cb) => {
    const studentName = req.body.name;
    const photoName = studentName.trim().replace(/\s+/g, '-') + ".jpg";
    cb(null, photoName);
  },
});

const upload = multer({ storage: storage });

const photoPath = "photos/";

const workbook = xlsx.utils.book_new();
const studentData = [];
const ws = xlsx.utils.json_to_sheet(studentData);
xlsx.utils.book_append_sheet(workbook, ws, "Students");
const excelPath = "students.xlsx";

// Enable CORS for all routes
app.use(cors()); // Use the cors middleware to enable CORS

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/photos", express.static(photoPath));

app.post("/api/add-student", upload.single("photo"), (req, res) => {
  const { name, email } = req.body;

  // Move the uploaded photo to the photos directory
  const photoFile = req.file;
  const photoName = (name || "default").trim().replace(/\s+/g, '-') + ".jpg";
  fs.rename(photoFile.path, photoPath + photoName, () => {
    // Add student data to the Excel file
    studentData.push({ Name: name, Email: email });
    xlsx.utils.sheet_add_json(ws, studentData, { skipHeader: true, origin: -1 });
    xlsx.writeFile(workbook, excelPath);

    res.json({ message: "Student added successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
