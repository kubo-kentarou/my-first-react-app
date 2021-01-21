import { firebaseApp } from "../firebase";

export const deleteStudent = async (studentId) => {
  //   setStudents(
  //     students.filter((student) => {
  //       return student.id !== studentId;
  //     })
  //   );

  try {
    const deleteReturn = await firebaseApp
      .firestore()
      .collection("students")
      .doc(studentId)
      .delete();
  } catch (e) {
    console.error("Error removing document: ", e);
  }
};
