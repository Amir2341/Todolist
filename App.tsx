import { StyleSheet, View, ImageBackground } from "react-native";
import { useState } from "react";
import ToDo from "./components/Todo";
import TodoList from "./components/List";
import { Provider as PaperProvider, Text } from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { adaptNavigationTheme } from "react-native-paper";
import { MD3DarkTheme } from "react-native-paper";
const { DarkTheme } = adaptNavigationTheme({
  reactNavigationDark: NavigationDarkTheme,
});
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};
const image = {
  uri: "https://lh3.googleusercontent.com/-ohttY-trX1I/X6wZJHOnmTI/AAAAAAAANPk/agg7fEOh4-Ytxvhq_RI9G7YaSN2r7n03QCLcBGAsYHQ/s1600/1605114144046646-0.png",
};

export default function App() {
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          <View style={styles.sectionTitle}>
            <Text variant="titleLarge" style={styles.title}>
              ToDo
            </Text>
          </View>
          <View style={styles.listContainer}>
            <TodoList todos={todos} setTodos={setTodos} />
          </View>
          <View style={styles.todoContainer}>
            <ToDo todos={todos} setTodos={setTodos} />
          </View>
        </View>
      </ImageBackground>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },

  sectionTitle: {
    padding: 25,
  },
  title: {
    fontWeight: "bold",
    color: "white",
    fontFamily: "serif",
  },
  listContainer: {
    flexDirection: "column-reverse",
  },
  todoContainer: {
    position: "absolute",
    height: 100,
    top: 690,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
