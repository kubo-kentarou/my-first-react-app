import { firebaseApp } from "../firebase";

export const addStudent = async (studentName) => {
  const data = {
    name: studentName,
    age: "20",
  };
  if (studentName === "") return alert("Please input name");
  const db = firebaseApp.firestore();
  const studentCollection = db.collection("students");
  const newStudentDocRef = studentCollection.doc();
  await newStudentDocRef.set(data);
};
