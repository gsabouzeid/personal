import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TodoList } from "../App";

interface MenuDialProps {
  setTodoLists: React.Dispatch<React.SetStateAction<TodoList[]>>;
  setSelectedListId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function MenuDial({ setTodoLists, setSelectedListId }: MenuDialProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  function handleClose() {
    setOpen(false);
  }

  function handleCreateList(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const newId = crypto.randomUUID();
    setTodoLists((prevLists) => [
      ...prevLists,
      {
        name,
        items: [],
        id: newId,
      },
    ]);
    setSelectedListId(newId);
    setName("");
    handleClose();
  }

  return (
    <>
      <Tooltip title={t("list.createNewList")} placement="left" arrow>
        <Fab
          color="primary"
          aria-label={t("list.createNewList")}
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Create New List</DialogTitle>
        <DialogContent>
          <form onSubmit={handleCreateList} id="create-list-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="List name"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="create-list-form">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MenuDial;
