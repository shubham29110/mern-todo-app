import React, { Component } from 'react';
import axios from 'axios';

export class CreateTodo extends Component {
  state = {
    description: '',
    responsible: '',
    priority: '',
    completed: false,
  };

  onInput = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  onSubmit = e => {
    e.preventDefault();

    const { description, completed, start_date, end_date } = this.state

    const payload = {
      description,
      completed,
      start_date,
      end_date
    };

    axios
      .post('http://localhost:4001/todo/create', payload)
      .then(res => {
        this.props.history.push('/');
        this.setState({
          description: '',
          completed: '',
          start_date: '',
          end_date: ''
        });;
      });


  };

  render() {
    const { description, completed, start_date, end_date } = this.state
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={description}
              onChange={this.onInput}
            />
          </div>
          <div className="form-group">
            <label>Start Date: </label>
            <input
              type="date"
              name="start_date"
              className="form-control"
              value={start_date}
              onChange={this.onInput}
            />
          </div>
          <div className="form-group">
            <label>End Date: </label>
            <input
              type="date"
              name="end_date"
              className="form-control"
              value={end_date}
              onChange={this.onInput}
            />
          </div>
          

          <div className="form-group">
            <input
              type="submit"
              value="Create Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
