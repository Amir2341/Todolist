import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Text, IconButton } from "react-native-paper";

interface props {
  todos: string[];
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
}

const TodoList: React.FC<props> = ({ todos, setTodos }) => {
  const handleDelete = async (index: number) => {
    let reducedToDo = [...todos];
    reducedToDo.splice(index, 1);
    await AsyncStorage.setItem("todolist", JSON.stringify(reducedToDo));
    setTodos(reducedToDo);
  };

  return (
    <View style={styles.list}>
      {todos.map((todo, index) => (
        <Card mode="outlined" key={index}>
          <Card.Content>
            <Text>{todo}</Text>
            <Card.Actions>
              <IconButton
                icon="delete"
                onPress={() => {
                  handleDelete(index);
                }}
              ></IconButton>
            </Card.Actions>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    height: 40,
    width: 300,
  },
});

export default TodoList;
