import { Add } from "@mui/icons-material";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TodoList } from "../App";
import Item from "./Item";

interface ListEditorProps {
  selectedListId: string;
  todoLists: TodoList[];
  setTodoLists: React.Dispatch<React.SetStateAction<TodoList[]>>;
}

function ListEditor({
  selectedListId,
  todoLists,
  setTodoLists,
}: ListEditorProps) {
  const { t } = useTranslation();
  const [item, setItem] = useState("");

  const selectedList = todoLists.find((list) => list.id === selectedListId);

  function handleAddItem(e: React.SubmitEvent<HTMLFormElement>, item: string) {
    e.preventDefault();
    if (selectedListId === undefined) {
      return;
    }
    setTodoLists((prevLists) =>
      prevLists.map((list) =>
        list.id === selectedListId
          ? {
              ...list,
              items: [
                ...list.items,
                { name: item, completed: false, id: crypto.randomUUID() },
              ],
            }
          : list,
      ),
    );

    setItem("");
  }

  return (
    <Box sx={{ height: "100%" }}>
      <form onSubmit={(e) => handleAddItem(e, item)}>
        <Box
          sx={{
            display: "flex",
            gap: "0.75rem",
            mb: 2,
          }}
        >
          <TextField
            id="item-input"
            label={t("item.item")}
            variant="outlined"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<Add />}
            disabled={!item}
          >
            {t("item.addItem")}
          </Button>
        </Box>
        <Stack spacing={2}>
          {selectedList?.items.map((item) => (
            <Item
              key={item.id}
              item={item}
              selectedListId={selectedListId}
              setTodoLists={setTodoLists}
            />
          ))}
        </Stack>
      </form>
    </Box>
  );
}

export default ListEditor;
