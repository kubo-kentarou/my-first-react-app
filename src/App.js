import React, { useEffect, useState } from "react";
import "./App.css";
import { Table } from "./components/Table";
import { Button } from "./components/Button";
import { firebaseApp } from "./firebase";
//ここから授業リファクタリング
import { addStudent } from "./components/Addstudent";

function App() {
  const [students, setStudents] = React.useState([]);
  const [studentName, setStudentName] = React.useState("");
  const [id, setId] = React.useState(0);
  const [currentPageNum, setCurrentPageNum] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const perPage = 3;
  let chankArray;

  const getStudents = async () => {
    const studentsRef = await firebaseApp
      .firestore()
      .collection("students")
      .get();
    if (studentsRef.empty) return;
    const students = [];
    for (const doc of studentsRef.docs) {
      students.push({ ...doc.data(), id: doc.id });
    }
    setStudents(students);
  };

  useEffect(() => {
    getStudents();
  }, []);

  const receiveAddStudent = async () => {
    addStudent(studentName);
    await getStudents();
    setStudentName("");
  };

  const deleteStudent = async (studentId) => {
    setStudents(
      students.filter((student) => {
        return student.id !== studentId;
      })
    );

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

  const updateStudent = async (studentId) => {
    const inputVal = prompt("name please: ");
    if (inputVal === "") {
      alert("Please input name");
      return;
    }
    setStudents(
      students.map((student) => {
        if (student.id === studentId) {
          student.name = inputVal;
        }
        return student;
      })
    );
    const updateReturn = await firebaseApp
      .firestore()
      .collection("students")
      .doc(studentId)
      .update({ name: inputVal });
  };

  const pageNationStudent = () => {
    chankArray = students.filter((student, index) => {
      return (
        currentPageNum * perPage <= index &&
        index < perPage * currentPageNum + perPage
      );
    });
    setTotalPages(Math.ceil(students.length / 3));
    return chankArray;
  };
  const prevPageNation = () => {
    //?O??{?^??
    setCurrentPageNum(currentPageNum - 1);
  };
  const nextPageNation = () => {
    //????{?^??
    setCurrentPageNum(currentPageNum + 1);
  };
  return (
    <div className="App" style={{ maxWidth: "80%", margin: "20px auto" }}>
      <div>
        {/** ????????k??????????????t?B?[???h??p?? */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: "30px",
            marginBottom: "50px",
          }}
        >
          <input
            style={{
              width: "80%",
              fontSize: "25px",
              lineHeight: "25",
              height: 30,
            }}
            type="text"
            placeholder="userName"
            value={studentName}
            onChange={(e) => {
              e.preventDefault();
              setStudentName(e.target.value);
            }}
          />
          <Button onClick={receiveAddStudent} title="Add student"></Button>
        </div>
      </div>
      <Table
        deleteStudent={deleteStudent}
        students={students}
        updateStudent={updateStudent}
        pageNationStudent={pageNationStudent}
      />
      <div className="pageNationButton">
        {currentPageNum >= 1 ? (
          <button onClick={prevPageNation}>prev</button>
        ) : (
          <span>no data</span>
        )}
        {/* ?y?[?W?????\?? */}
        <span className="page"> {currentPageNum + 1} </span>
        {totalPages - 1 !== currentPageNum ? (
          <button onClick={nextPageNation}>next</button>
        ) : (
          <span>no data</span>
        )}
        {/* ???y?[?W / ???y?[?W??\?? */}
        <div>
          {currentPageNum + 1} / {totalPages}
        </div>
      </div>
    </div>
  );
}
export default App;
