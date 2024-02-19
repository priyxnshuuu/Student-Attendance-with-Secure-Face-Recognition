import face_recognition
import cv2
import numpy as np
from datetime import datetime
import os
from pymongo import MongoClient
import pandas as pd

# Your MongoDB connection string
mongo_uri = "mongodb+srv://gurpratap:gurpratap@attendancecluster.yctfvwb.mongodb.net/?retryWrites=true&w=majority"

# Connect to the MongoDB server
client = MongoClient(mongo_uri)
db = client["test"]  # Replace "attendance_database" with your database name

# Create or get a collection for attendance
attendance_collection = db["attendance-sheets"]
student_users_collection = db["student-users"]

# Excel file for backup (optional)
excel_file = "attendance.xlsx"

# Check if the attendance Excel file exists, and create it if not (optional)
if not os.path.exists(excel_file):
    df = pd.DataFrame(columns=["Name", "Date", "InTime"])
    df.to_excel(excel_file, index=False)
else:
    df = pd.read_excel(excel_file)

video_capture = cv2.VideoCapture(0)

students_directory = "./server/photos"  # Directory containing student photos

known_face_encodings = []
known_face_names = []

for student_image_filename in os.listdir(students_directory):
    student_name, ext = os.path.splitext(student_image_filename)
    if ext.lower() not in (".jpg", ".jpeg", ".png"):
        continue  # Skip non-image files

    student_image_path = os.path.join(students_directory, student_image_filename)
    student_image = face_recognition.load_image_file(student_image_path)

    # Ensure that a face is found in the image before extracting the encoding
    face_encodings = face_recognition.face_encodings(student_image)

    if len(face_encodings) > 0:
        student_encoding = face_encodings[0]
        known_face_encodings.append(student_encoding)
        known_face_names.append(student_name)

# Create a dictionary to keep track of students' attendance
attendance_record = {name: {"status": "absent", "date": None, "inTime": None} for name in known_face_names}

while True:
    _, frame = video_capture.read()
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    rgb_small_frame = small_frame[:, :, ::-1]

    face_locations = face_recognition.face_locations(rgb_small_frame)
    face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
    face_names = []

    current_time = datetime.now().time()
    current_date = datetime.now().date()

    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        name = "Unknown"  # Default to "Unknown" if no match is found

        for i, match in enumerate(matches):
            if match:
                name = known_face_names[i]
                break

        face_names.append(name)

        if name != "Unknown" and attendance_record[name]["status"] == "absent":
            # Check current time and set the status
            if current_time <= datetime.strptime("10:00", "%H:%M").time():
                status = "on time"
            elif current_time >= datetime.strptime("12:00", "%H:%M").time():
                status = "late"
            else:
                status = "absent"

            # Convert the date to a string
            current_date_str = current_date.strftime("%Y-%m-%d")

            attendance_record[name] = {
                "status": status,
                "date": current_date_str,
                "inTime": current_time.strftime("%H:%M"),
            }

            # Check if the student is not already marked present in the MongoDB collection
            existing_attendance = attendance_collection.find_one(
                {"Name": name, "Date": current_date_str}
            )

            if not existing_attendance:
                # Attempt to fetch student details from the student_users_collection
                studentDetails = student_users_collection.find_one({"name": name.replace("-", " ")})
                print(studentDetails)
                if studentDetails:
                    new_attendance = {
                        "StudentId": studentDetails.get("_id"),  # Provide a default value if "email" is not found
                        "Name": name,
                        "Date": current_date_str,
                        "InTime": current_time.strftime("%H:%M"),
                        "Status": status,
                        "createdAt": datetime.now()
                    },
                    new_attendance = {
                        "StudentId": studentDetails.get("_id"),  #,  # Provide a default value if student details are not found
                        "Name": name,
                        "Date": current_date_str,
                        "InTime": current_time.strftime("%H:%M"),
                        "Status": status,
                        "createdAt": datetime.now()

                    }

                # Insert the attendance document into the MongoDB collection
                attendance_collection.insert_one(new_attendance)

            # Optional: Save the attendance data to an Excel file for backup
            if not ((df["Name"] == name) & (df["Date"] == current_date_str)).any():
                # Append attendance data to the DataFrame
                new_row = {"Name": name, "Date": current_date_str, "InTime": current_time.strftime("%H:%M")}
                df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
                df.to_excel(excel_file, index=False)

    for (top, right, bottom, left), name in zip(face_locations, face_names):
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
        font = cv2.FONT_HERSHEY_SIMPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6), font, 0.5, (255, 255, 255), 1)

    cv2.imshow("Attendance System", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# When you're done, close the MongoDB connection
client.close()

video_capture.release()
cv2.destroyAllWindows()
