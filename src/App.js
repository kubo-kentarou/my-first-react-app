import React, { useEffect, useState } from "react";
import "./App.css";
import { Table } from "./components/Table";
import { Button } from "./components/Button";
import { firebaseApp } from "./firebase";
const INITIAL_STUDENTS = [
  { id: 1, name: "Bob" },
  { id: 2, name: "Amy" },
];
function App() {
  const [students, setStudents] = React.useState([]);
  const [studentName, setStudentName] = React.useState("");
  const [studentSearch, setStudentSearch] = React.useState([]);
  const [id, setId] = React.useState(0);
  const [currentPageNum, setCurrentPageNum] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const perPage = 3;
  let chankArray;

  const getStudents = async () => {
    const studentsRef = await firebaseApp
      .firestore()
      .collection("students") //�R���N�V����
      .get(); //�擾
    if (studentsRef.empty) return;
    const students = [];
    for (const doc of studentsRef.docs) {
      const student = doc.data();
      students.push({ ...student, id: doc.id });
    }
    setStudentSearch(
      students.map((student) => {
        console.log("set", student.name);
        return student.name;
      })
    );

    setStudents(students);
    console.log(students);
  };

  useEffect(() => {
    getStudents();
  }, []);
  /** ���k�̒ǉ����s������ */
  const addStudent = async () => {
    if (studentName === "") return alert("Please input name");
    setStudents([...students, { id, name: studentName }]);
    setStudentName("");
    setId((prevState) => prevState + 1);

    const data = {
      name: studentName,
      age: "20",
    };

    // const res = await firebaseApp
    //   .firestore()
    //   .collection("students")
    //   .doc()
    //   .set(data);
    // console.log(res);

    if (studentName === "") return alert("Please input name");
    const db = firebaseApp.firestore();
    const studentCollection = db.collection("students");
    const newStudentDocRef = studentCollection.doc();
    await newStudentDocRef.set(data);

    await getStudents();
  };
  /** ���k�̍폜���s������ */
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
      console.log("Delete Return", deleteReturn);
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };
  /** ���k�̃A�b�v�f�[�g���s������ */
  const updateStudent = async (studentId) => {
    const inputVal = prompt("name please: ");
    if (inputVal === "") {
      alert("�A���[�g�̕��");
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

    console.log(updateReturn);
  };
  /** �y�[�W�l�[�V�����̐ݒ���s������ */
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
    //�O�փ{�^��
    setCurrentPageNum(currentPageNum - 1);
  };
  const nextPageNation = () => {
    //���փ{�^��
    setCurrentPageNum(currentPageNum + 1);
  };
  return (
    <div className="App" style={{ maxWidth: "80%", margin: "20px auto" }}>
      <span>Search</span>
      <input
        type="text"
        placeholder="userName"
        onChange={(e) => {
          e.preventDefault();
          const searchName = e.target.value;
          // console.log(studentSearch);
          setStudentSearch(
            studentSearch.filter((student) => {
              return student.includes(searchName);
            })
          );
        }}
      />

      <div>
        {/** �����Ő��k�̏���ǉ����邽�߂̃t�B�[���h��p�� */}
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
          <Button onClick={addStudent} title="Add student"></Button>
        </div>
      </div>
      <Table
        deleteStudent={deleteStudent}
        students={students}
        updateStudent={updateStudent}
        pageNationStudent={pageNationStudent}
        studentSearch={studentSearch}
      />
      <div className="pageNationButton">
        {currentPageNum >= 1 ? (
          <button onClick={prevPageNation}>prev</button>
        ) : (
          <span>no data</span>
        )}
        {/* �y�[�W�ԍ��̕\�� */}
        <span className="page"> {currentPageNum + 1} </span>
        {totalPages - 1 !== currentPageNum ? (
          <button onClick={nextPageNation}>next</button>
        ) : (
          <span>no data</span>
        )}
        {/* ���y�[�W / ���y�[�W�̕\�� */}
        <div>
          {currentPageNum + 1} / {totalPages}
        </div>
      </div>
    </div>
  );
}
export default App;
