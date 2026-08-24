import { Box, Toolbar } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
            display: "flex",
            flexDirection: "column",
            height: "100%",
            bgcolor: "background.default",
            color: "text.primary",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            p: 3,
          }}
        >
          {selectedListId !== undefined ? (
            <ListEditor
              selectedListId={selectedListId}
              todoLists={todoLists}
              setTodoLists={setTodoLists}
            />
          ) : (
            t("feelsEmpty")
          )}
        </Box>
      </main>
      <MenuDial
        setTodoLists={setTodoLists}
        setSelectedListId={setSelectedListId}
      />
    </Box>
  );
}

export default App;
