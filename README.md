# Smart Attendance System with Face Recognition

**Description:**
The Smart Attendance System with Face Recognition is a comprehensive solution designed to streamline the attendance tracking process for educational institutions. Leveraging cutting-edge technologies, this project combines mobile and web applications with a sophisticated face recognition system to provide an efficient and secure attendance management system.

**Key Features:**

**Admin Section:**
- The admin section allows administrators to manage student profiles, including adding new students to the system.
- Admins are responsible for assigning login credentials to students.

**Mobile Application:**
- Students can access the system via a user-friendly mobile application.
- Students log in using credentials provided by the admin.

**Face Recognition Technology:**
- The core of the attendance system is a Python-based face recognition script.
- During the student registration process, facial features are captured and stored in the MongoDB database.

**Attendance Marking:**
- In each classroom, a camera is installed and connected to the server.
- Upon entering the class, students look into the camera, and the system recognizes their faces.
- Attendance records are then marked in the MongoDB database.

**Database Management:**
- MongoDB is used as the database to store student information and attendance records.

**Attendance Viewing:**
- Students can conveniently view their attendance records through the mobile application.
- Admins have access to a comprehensive overview of all student attendance.

**Technologies Used:**

**Frontend:**
- React JS for web application
- React Native for mobile application

**Backend:**
- Express JS for server-side development

**Face Recognition:**
- Python-based face recognition script

**Database:**
- MongoDB for efficient and scalable data storage.

**Benefits:**
- **Accuracy:** Face recognition ensures precise attendance tracking.
- **Efficiency:** Streamlines the attendance process, reducing manual effort.
- **Accessibility:** Students and admins can access attendance information anytime, anywhere.
- **Scalability:** Built on robust technologies to accommodate the needs of growing educational institutions.

**Getting Started:**
1. Clone the repository.
2. Ensure you have the necessary dependencies installed (refer to documentation).
3. Configure database connection details in relevant files.
4. Run the setup script to initialize the system.
5. Follow detailed setup instructions provided in the project's README file.

**Contribute:**
We welcome your contributions! Feel free to fork the repository, make improvements, and submit pull requests.
