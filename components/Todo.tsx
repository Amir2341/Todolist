import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet } from "react-native";
import { IconButton, Tooltip } from "react-native-paper";
import { TextInput } from "react-native-paper";

interface props {
  todos: string[];
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
}

const TodoList: React.FC<props> = ({ todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleNewTodo = async () => {
    try {
      setTodos([...todos, newTodo]);
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem("todolist", jsonValue);
      setNewTodo("");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue: any = await AsyncStorage.getItem("todolist");
        const savedtodos = JSON.parse(jsonValue);
        if (savedtodos) {
          setTodos(savedtodos);
        }
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        placeholder="add task..."
        style={styles.input}
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <Tooltip title="add">
        <IconButton
          size={30}
          mode="outlined"
          icon="plus"
          onPress={handleNewTodo}
          disabled={todos.length >= 5}
        ></IconButton>
      </Tooltip>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    width: 220,
  },
});

export default TodoList;
