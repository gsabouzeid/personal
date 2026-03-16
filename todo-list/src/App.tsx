import { Box, Toolbar } from "@mui/material";
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

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <NavBar
        todoLists={todoLists}
        setTodoLists={setTodoLists}
        selectedListId={selectedListId}
        setSelectedListId={setSelectedListId}
      />
      <Toolbar />
      <main style={{ flexGrow: 1 }}>
        <Box
          sx={{
            height: "100%",
            bgcolor: "background.default",
            color: "text.primary",
            alignContent: "center",
            padding: "1.5rem",
            
          }}
        >
          {selectedListId !== undefined ? (
            <ListEditor
              selectedListId={selectedListId}
              todoLists={todoLists}
              setTodoLists={setTodoLists}
            />
          ) : null}
        </Box>
      </main>
      <MenuDial
        setTodoLists={setTodoLists}
        setSelectedListId={setSelectedListId}
      />
    </div>
  );
}

export default App;
