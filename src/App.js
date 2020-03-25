import React from 'react';
import './App.css';
import uuid from 'uuid-random';

function TaskList(props) {
  return props.tasks.map((task, index) => (
    <p key={uuid()} onClick={props.onClick} id={index + 1} name={task.title}>
      {task.title}-{task.description}
    </p>
  ));
}

class App extends React.Component {
  state = {
    tasks: [],
    completedTasks: [],
    toDo: '',
    description: ''
  };

  clickTasks = event => {
    const newCompletedTask = this.state.tasks.slice(
      event.currentTarget.id - 1,
      event.currentTarget.id
    )[0];
    const index = event.currentTarget.id;
    this.setState(prevState => ({
      tasks: prevState.tasks
        .slice(0, index - 1)
        .concat(prevState.tasks.slice(index)),
      completedTasks: prevState.completedTasks.concat(newCompletedTask)
    }));
  };

  clickCompletedTasks = event => {
    const newTask = this.state.completedTasks.slice(
      event.currentTarget.id - 1,
      event.currentTarget.id
    )[0];
    const index = event.currentTarget.id;
    this.setState(prevState => ({
      tasks: prevState.tasks.concat(newTask),
      completedTasks: prevState.completedTasks
        .slice(0, index - 1)
        .concat(prevState.completedTasks.slice(index))
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const newTask = {
      id: uuid(),
      title: this.state.toDo,
      description: this.state.description
    };
    this.setState(prevState => ({
      tasks: prevState.tasks.concat(newTask)
    }));
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>Tarea</label>
          <input
            type="Text"
            name="toDo"
            id="toDo"
            value={this.toDo}
            onChange={this.handleChange}
          />
          <label>Descripción</label>
          <input
            type="Text"
            name="description"
            id="description"
            value={this.description}
            onChange={this.handleChange}
          />
          <button>Crear</button>
        </form>
        <h2>Tasks</h2>
        <TaskList onClick={this.clickTasks} tasks={this.state.tasks} />
        <h2>Completed tasks</h2>
        <TaskList
          onClick={this.clickCompletedTasks}
          tasks={this.state.completedTasks}
        />
      </div>
    );
  }
}

export default App;
