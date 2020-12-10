import React from "react";
import { Button } from "./Button";

let resultName = [];
const TableBodyCell = (props) => (
  <td style={{ padding: "5px 10px", border: "solid 1px #ccc" }}>
    {props.children}
  </td>
);
const TableHeaderCell = (props) => (
  <th
    style={{
      padding: "5px 10px",
      border: "solid 1px #ccc",
      backgroundColor: "#ddd",
    }}
  >
    {props.children}
  </th>
);

//フィルター実行
// const Passed = (result) => {
//   resultName = result;
// };

// const Search = (props) => {
//   return (
//     <div>
//       <span>Search</span>
//       <input
//         type="text"
//         placeholder="userName"
//         onChange={(e) => {
//           e.preventDefault();
//           const searchName = e.target.value;
//           const result = props.students.filter((student) => {
//             return student.includes(searchName);
//           });
//           resultName = result;
//           console.log(resultName);
//         }}
//       />
//     </div>
//   );
// };

const Table = ({
  students,
  deleteStudent,
  updateStudent,
  pageNationStudent,
  studentSearch,
}) => {
  let chankArray = pageNationStudent();
  return (
    <div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "solid 1px #ccc",
        }}
      >
        <thead>
          <tr>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>NAME</TableHeaderCell>
            <TableHeaderCell>ACTION</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {chankArray.length ? (
            chankArray.map((s) => {
              return (
                studentSearch === s.name && (
                  <tr key={s.id}>
                    <TableBodyCell>{s.id}</TableBodyCell>
                    <TableBodyCell>{s.name}</TableBodyCell>
                    <TableBodyCell>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          deleteStudent(s.id);
                        }}
                        title="delete"
                      />
                      <Button
                        style={{ marginRight: 10 }}
                        onClick={(e) => {
                          e.preventDefault();
                          updateStudent(s.id);
                          console.log("CLICKED");
                        }}
                        title="update"
                      />
                    </TableBodyCell>
                  </tr>
                )
              );
            })
          ) : (
            <tr>
              <td>no student</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { Table };
