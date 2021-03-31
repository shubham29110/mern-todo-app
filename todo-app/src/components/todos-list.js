import React, { Component } from 'react';
import { Todo } from './todo';
import axios from 'axios';

export class TodosList extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    this.getTodos()
  }

  getTodos = () => {
    axios
    .get('http://localhost:4001/todo/todos/')
    .then(response => {
      this.setState({ todos: response.data });
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  todoList = () => {
    return this.state.todos.map((currentTodo, i) => {
      return <Todo todo={currentTodo} onDelete={this.onDelete} key={i} />;
    });
  };

  onDelete = (id) => {
    axios
    .delete(`http://localhost:4001/todo/delete?id=${id}`)
    .then(response => {
      this.getTodos()
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Completed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </>
    );
  }
}
