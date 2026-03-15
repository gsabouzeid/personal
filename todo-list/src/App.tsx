import { Toolbar } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useState } from "react";
import "./App.css";
import ListEditor from "./components/ListEditor";
import MenuDial from "./components/MenuDial";
import NavBar from "./components/NavBar";

export type ItemObj = {
  name: string;
  completed: boolean;
  id: string;
};

export type TodoList = {
  name: string;
  items: ItemObj[];
  id: string;
};

function App() {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>();

  const { mode } = useColorScheme();
  if (!mode) {
    return null;
  }

  return (
    <>
      <NavBar
        todoLists={todoLists}
        setTodoLists={setTodoLists}
        selectedListId={selectedListId}
        setSelectedListId={setSelectedListId}
      />
      <Toolbar />
      <main>
        {selectedListId !== undefined ? (
          <ListEditor
            selectedListId={selectedListId}
            todoLists={todoLists}
            setTodoLists={setTodoLists}
          />
        ) : null}
      </main>
      <MenuDial
        setTodoLists={setTodoLists}
        setSelectedListId={setSelectedListId}
      />
    </>
  );
}

export default App;
