import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TodoList } from "../../App";

interface CreateListDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTodoLists: React.Dispatch<React.SetStateAction<TodoList[]>>;
  setSelectedListId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function CreateListDialog({
  open,
  setOpen,
  setTodoLists,
  setSelectedListId,
}: CreateListDialogProps) {
  const { t } = useTranslation();
  const [name, setName] = useState<string>("");

  function handleClose() {
    setOpen(false);
    setName("");
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
    handleClose();
  }

  return (
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
            label={t("list.listName")}
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("form.cancel")}</Button>
        <Button type="submit" form="create-list-form">
          {t("form.create")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateListDialog;
