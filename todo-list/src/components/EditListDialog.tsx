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
import type { TodoList } from "../App";

interface EditListDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedList: TodoList;
  setSelectedListId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTodoLists: React.Dispatch<React.SetStateAction<TodoList[]>>;
}

function EditListDialog({
  open,
  setOpen,
  selectedList,
  setSelectedListId,
  setTodoLists,
}: EditListDialogProps) {
  const { t } = useTranslation();
  const [name, setName] = useState<string>(selectedList.name);

  function handleClose() {
    setOpen(false);
    setName(selectedList.name);
  }

  function handleEditList(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setTodoLists((prevLists) =>
      prevLists.map((list) =>
        list.id === selectedList.id ? { ...list, name } : list,
      ),
    );
    setOpen(false);
  }

  function handleDeleteList() {
    setTodoLists((prevLists) =>
      prevLists.filter((list) => list.id !== selectedList.id),
    );
    setSelectedListId(undefined);
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit List</DialogTitle>
      <DialogContent>
        <form onSubmit={handleEditList} id="create-list-form">
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
        <Button onClick={handleClose}>{t("form.cancel")}</Button>
        <Button onClick={handleDeleteList} color="error">
          {t("form.delete")}
        </Button>
        <Button type="submit" form="create-list-form">
          {t("form.edit")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditListDialog;
