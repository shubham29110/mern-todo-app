import React from 'react';
import { Link } from 'react-router-dom';

export const Todo = ({ todo, onDelete }) => {console.log(todo);return(
  <tr>
    <td className={todo.completed ? 'completed' : ''}>{todo.description}</td>
    <td className={todo.completed ? 'completed' : ''}>{todo.start_date}</td>
    <td className={todo.completed ? 'completed' : ''}>{todo.end_date}</td>
    <td className={todo.completed ? 'completed' : ''}>{todo.completed ? 'Yes' : 'No'}</td>
    <td>
      <Link to={`/edit/${todo.id}`}>Edit</Link>
    </td>
    <td>
      <div 
        style={{ 
          cursor: todo.completed ? 'none': 'pointer',
          textDecoration: todo.completed ? 'auto': 'underline',
          color: todo.completed ? '#a9a9a9': '#007bff'
        }}
        disabled={todo.completed}
        onClick={e => {
        e.preventDefault()
        onDelete(todo.id)
      }}>Delete</div>
    </td>
  </tr>
)};

