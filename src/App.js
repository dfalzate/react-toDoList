import React from 'react';
import './App.css';

function TaskList(props) {
  return props.tasks.map((task, index) => (
    <p
      onClick={props.onClick}
      id={index + 1}
      name={task}
      className={props.className}
    >
      {task}
    </p>
  ));
}

class App extends React.Component {
  state = {
    tasks: [
      'task1',
      'task2',
      'task3',
      'task4',
      'task5',
      'task6',
      'task7',
      'task8',
      'task9',
      'task10'
    ],
    completedTasks: ['completed']
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
    // const newTask = this.state.completedTasks.splice(
    //   event.currentTarget.id - 1,
    //   1
    // )[0];
    // this.state.tasks.push(newTask);
    // this.setState(prevState => ({}));
  };

  render() {
    return (
      <div className="App">
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
