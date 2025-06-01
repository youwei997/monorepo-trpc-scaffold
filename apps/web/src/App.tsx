import { useEffect, useState } from 'react';
import './App.css'; // Add a CSS file for styling
import { trpc } from './trpc';

function App() {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<any>(null);

  useEffect(() => {
    trpc.todo.getTodos.query().then(data => {
      setTodos(data);
    });
  }, []);

  const createTodo = () => {
    trpc.todo.createTodo.mutate({ title: newTodoTitle }).then(newTodo => {
      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
    });
  };

  const updateTodo = (id: number, title: string, completed: boolean) => {
    trpc.todo.updateTodo.mutate({ id, title, completed }).then(updatedTodo => {
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    });
  };

  const deleteTodo = (id: number) => {
    trpc.todo.deleteTodo.mutate({ id }).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  return (
    <div className="app-container">
      <h1 className="title">Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
          placeholder="New Todo Title"
          className="input"
        />
        <button onClick={createTodo} className="button">
          Add Todo
        </button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <input
              type="text"
              value={
                selectedTodo?.id === todo.id ? selectedTodo.title : todo.title
              }
              onChange={e =>
                setSelectedTodo({ ...todo, title: e.target.value })
              }
              onBlur={() => {
                if (selectedTodo) {
                  updateTodo(
                    selectedTodo.id,
                    selectedTodo.title,
                    selectedTodo.completed
                  );
                  setSelectedTodo(null);
                }
              }}
              className="todo-title"
            />
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={e => updateTodo(todo.id, todo.title, e.target.checked)}
              className="todo-checkbox"
            />
            <button
              onClick={() => deleteTodo(todo.id)}
              className="button delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
