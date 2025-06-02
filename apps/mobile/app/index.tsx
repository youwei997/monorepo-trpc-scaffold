import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { trpcClient } from '../lib/trpc';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};
export default function Index() {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState('');

  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: () => trpcClient.todo.getTodos.query(),
  });

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      await trpcClient.todo.createTodo.mutate({ title: newTodo });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setNewTodo('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const toggleTodoCompletion = async (id: number, completed: boolean) => {
    try {
      await trpcClient.todo.updateTodo.mutate({
        id,
        completed: !completed,
      });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    } catch (error) {
      console.error('Failed to toggle todo completion:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await trpcClient.todo.deleteTodo.mutate({ id });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  if (isLoading) return <Text>加载中...</Text>;
  if (error) return <Text>错误: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>待办事项</Text>
      <FlatList
        style={styles.list}
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItemContainer}>
            <Text style={[styles.todoItem, item.completed && styles.completed]}>
              {item.title}
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => toggleTodoCompletion(item.id, item.completed)}
              >
                <Text style={styles.buttonText}>
                  {item.completed ? '撤销' : '完成'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => deleteTodo(item.id)}
              >
                <Text style={styles.buttonText}>删除</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="新待办事项"
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTodo}>
        <Text style={styles.addButtonText}>添加待办</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  list: {
    width: '100%',
  },
  todoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
  },
  todoItem: {
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
