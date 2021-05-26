import cx from 'classnames';
import { Component } from 'react';

export default class App extends Component {
    state = {
        todo: "",
        todos: [],
        completedTodos: {
          0: true,
          1: false
        },
    }
    changeTodo = (e) => {
      this.setState({
        todo: e.target.value
      })
    }
    addTodo = (e) => {
      e.preventDefault();
      let newTodo = {
        text: this.state.todo,
        isDone: false,
      }
        this.setState({
            todo: '',
            todos: [ ...this.state.todos, newTodo ]
        });
        this.clearField();
    }

    clearField =()=> {
      this.setState({todo: ""});
    }

    completeTodo = (index) => {
      this.setState({
        todos: this.state.todos.map((todo, index) => {
          console.log(todo, index)
          if(todo[index] === index){
            todo[index].isDone = !todo[index].isDone
          }
          return todo;
        })
      });
      console.log(this.state.todos)
    }
    returnCompleted = (todos) => {
      return todos.filter((todo) => todo.isDone === true );
    }
    render() {
        return (
            <>
                <div>
                    <h2>
                        Todo List
                    </h2>
                </div>
                <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
                <input id="todo" type="text" value={this.state.todo} onChange={this.changeTodo} />
                <button onClick={this.addTodo}>Add</button>
                <p className="task-counter">{this.state.todos.filter((todo) => todo.isDone === true )} remaining out of { this.state.todos.length} tasks </p>
                <ul>
                  { this.state.todos.map((todo, index) => 
                    <li className={`${todo.isDone ? 'is-done' : ''}`} key={index} onClick={() => this.completeTodo(index)}>{todo.text} {todo.isDone && 'done'}</li>
                  )}
                </ul>
            </>
        );
    }
}
