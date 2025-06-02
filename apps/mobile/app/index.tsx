import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { trpc } from '../lib/trpc'; // ✅ 引入新的 trpc

export default function Index() {
  const [newTodo, setNewTodo] = useState('');
  const { data: todos = [], isLoading, error, refetch } = trpc.todo.getTodos.useQuery();

  const addTodo = trpc.todo.createTodo.useMutation({
    onSuccess: () => {
      refetch();
      setNewTodo('');
    },
  });

  const toggleTodo = trpc.todo.updateTodo.useMutation({
    onSuccess: () => refetch(),
  });

  const deleteTodo = trpc.todo.deleteTodo.useMutation({
    onSuccess: () => refetch(),
  });

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
            <Text style={[styles.todoItem, item.completed && styles.completed]}>{item.title}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => toggleTodo.mutate({ id: item.id, completed: !item.completed })}
              >
                <Text style={styles.buttonText}>{item.completed ? '撤销' : '完成'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => deleteTodo.mutate({ id: item.id })}>
                <Text style={styles.buttonText}>删除</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TextInput style={styles.input} placeholder="新待办事项" value={newTodo} onChangeText={setNewTodo} />
      <TouchableOpacity style={styles.addButton} onPress={() => addTodo.mutate({ title: newTodo })}>
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
