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

const Table = ({
  students,
  deleteStudent,
  updateStudent,
  pageNationStudent,
  updatestudentAge,
}) => {
  let chankArray = pageNationStudent();
  console.log("CHANKARRAY", chankArray);
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
            <TableHeaderCell>NAME</TableHeaderCell>
            <TableHeaderCell>ACTION</TableHeaderCell>
            <TableHeaderCell>ADDITION</TableHeaderCell>
            <TableHeaderCell>ADDITION</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {chankArray.length ? (
            chankArray.map((s) => {
              return (
                <tr key={s.id}>
                  <TableBodyCell>{s.id}</TableBodyCell>
                  <TableBodyCell>{s.name}</TableBodyCell>
                  <TableBodyCell>{s.age}</TableBodyCell>
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
                  <TableBodyCell>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        updatestudentAge(s.id, 1);
                        console.log("CLICKED");
                      }}
                      title="plus[＋]"
                    />
                  </TableBodyCell>
                  <TableBodyCell>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        updatestudentAge(s.id, -1);
                        console.log("CLICKED");
                      }}
                      title="plus[-]"
                    />
                  </TableBodyCell>
                </tr>
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
