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
</tr>;
