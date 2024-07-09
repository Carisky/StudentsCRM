import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';


export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { students: [], loading: true };
  }

  componentDidMount() {
    this.populateStudentData();
  }

  renderStudentsTable(students) {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="students table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Group</TableCell>
              <TableCell align="right">Grades</TableCell>
              <TableCell align="right">Has Scholarship</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  render() {
    const { students, loading } = this.state;
  
    return (
      <Box>
        <h1 id="tabelLabel">Students</h1>
        <p>This component demonstrates fetching data from the server and displaying it in a table.</p>
        {loading ? <p><em>Loading...</em></p> : this.renderStudentsTable(students)}
      </Box>
    );
  }

  async populateStudentData() {
    const response = await fetch('/students');
    const data = await response.json();
    this.setState({ students: data, loading: false });
  }
}
