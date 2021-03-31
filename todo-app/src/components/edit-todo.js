import React, { Component } from 'react';
import axios from 'axios';

export class EditTodo extends Component {
  state = {
    description: '',
    responsible: '',
    priority: '',
    completed: false,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:4001/todo/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          description: response.data.description,
          start_date: response.data.start_date,
          end_date: response.data.end_date,
          completed: response.data.completed,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  onInput = (e) => {
    const { name, value } = e.target
    if (name === "completed") {
      this.setState({ completed: e.target.checked })
      return
    }
    this.setState({ [name]: value })
  }


  onSubmit = e => {
    e.preventDefault();
    const { description, completed, start_date, end_date } = this.state

    const payload = {
      id: this.props.match.params.id,
      description,
      completed,
      start_date,
      end_date
    };
    axios
      .put(
        `http://localhost:4001/todo/update`,
        payload,
      )
      .then(res => this.props.history.push('/'));
  };

  render() {
    const { description, completed, start_date, end_date } = this.state
    return (
      <>
        <h3 align="center">Update Todo</h3>
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
              className="form-control"
              name="start_date"
              value={start_date}
              onChange={this.onInput}
            />
          </div>
          <div className="form-group">
            <label>End Date: </label>
            <input
              type="date"
              className="form-control"
              name="end_date"
              value={end_date}
              onChange={this.onInput}
            />
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              id="completedCheckbox"
              type="checkbox"
              name="completedCheckbox"
              name="completed"
              onChange={this.onInput}
              checked={completed}
              value={completed}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>

          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </>
    );
  }
}
