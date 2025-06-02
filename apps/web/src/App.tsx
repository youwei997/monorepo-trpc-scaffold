import { useState } from 'react';
import './App.css';
import { trpc } from './trpc';

function App() {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<{
    id: number;
    title: string;
    completed: boolean;
  } | null>(null);

  const { data: todos = [], refetch } = trpc.todo.getTodos.useQuery();

  const createTodo = trpc.todo.createTodo.useMutation({
    onSuccess: () => {
      setNewTodoTitle('');
      refetch();
    },
  });

  const updateTodo = trpc.todo.updateTodo.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const deleteTodo = trpc.todo.deleteTodo.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

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
        <button
          onClick={() => createTodo.mutate({ title: newTodoTitle })}
          className="button"
        >
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
                  updateTodo.mutate({
                    id: selectedTodo.id,
                    title: selectedTodo.title,
                    completed: selectedTodo.completed,
                  });
                  setSelectedTodo(null);
                }
              }}
              className="todo-title"
            />
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={e =>
                updateTodo.mutate({
                  id: todo.id,
                  title: todo.title,
                  completed: e.target.checked,
                })
              }
              className="todo-checkbox"
            />
            <button
              onClick={() => deleteTodo.mutate({ id: todo.id })}
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
