import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { students: [], loading: true };
  }

  componentDidMount() {
    this.populateStudentData();
  }

  static renderStudentsTable(students) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Group</th>
            <th>Grades</th>
            <th>Has Scholarship</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student =>
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.group}</td>
              <td>{student.grades.join(', ')}</td>
              <td>{student.hasScholarship ? "Yes" : "No"}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Home.renderStudentsTable(this.state.students);

    return (
      <div>
        <h1 id="tabelLabel">Students</h1>
        <p>This component demonstrates fetching data from the server and displaying it in a table.</p>
        {contents}
      </div>
    );
  }

  async populateStudentData() {
    const response = await fetch('/students');
    const data = await response.json();
    this.setState({ students: data, loading: false });
  }
}
