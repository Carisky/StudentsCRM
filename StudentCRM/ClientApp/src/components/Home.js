import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({ name: '', age: '', group: '', grades: '', hasScholarship: false });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await fetch('/Students');
    const data = await response.json();
    setStudents(data);
    setLoading(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentStudent({ name: '', age: '', group: '', grades: '', hasScholarship: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  const handleSave = async () => {
    try {
      const studentData = {
        ...currentStudent,
        grades: Array.isArray(currentStudent.grades) ? currentStudent.grades : currentStudent.grades.split(',').map(Number), // Handle grades field correctly
        hasScholarship: currentStudent.hasScholarship === 'true' || currentStudent.hasScholarship === true, // Ensure boolean value
      };
  
      let response;
      if (editMode) {
        response = await fetch(`/Students/${studentData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData),
        });
      } else {
        response = await fetch('/Students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData),
        });
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert(`Error: ${errorData.title} - ${Object.values(errorData.errors).flat().join(', ')}`);
      } else {
        fetchStudents();
        handleClose();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setEditMode(true);
    handleClickOpen();
  };

  const handleDelete = async (id) => {
    await fetch(`/Students/${id}`, {
      method: 'DELETE',
    });
    fetchStudents();
  };

  const renderStudentsTable = (students) => (
    <TableContainer component={Paper}>
      <Table aria-label="students table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Group</TableCell>
            <TableCell align="right">Grades</TableCell>
            <TableCell align="right">Has Scholarship</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell component="th" scope="row">
                {student.name}
              </TableCell>
              <TableCell align="right">{student.age}</TableCell>
              <TableCell align="right">{student.group}</TableCell>
              <TableCell align="right">{student.grades.join(', ')}</TableCell>
              <TableCell align="right">{student.hasScholarship ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleEdit(student)}>Edit</Button>
                <Button onClick={() => handleDelete(student.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box>
      <h1 id="tabelLabel">Students</h1>
      <p>This component demonstrates fetching data from the server and displaying it in a table with CRUD operations.</p>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Student</Button>
      {loading ? <p><em>Loading...</em></p> : renderStudentsTable(students)}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Student' : 'Add Student'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={currentStudent.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="age"
            label="Age"
            type="number"
            fullWidth
            value={currentStudent.age}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="group"
            label="Group"
            type="text"
            fullWidth
            value={currentStudent.group}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="grades"
            label="Grades (comma separated)"
            type="text"
            fullWidth
            value={currentStudent.grades}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="hasScholarship"
            label="Has Scholarship (true/false)"
            type="text"
            fullWidth
            value={currentStudent.hasScholarship}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
