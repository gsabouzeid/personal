import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TodoList } from "../../App";
import EditListDialog from "../EditListDialog";

interface EditListDialogButtonProps {
  selectedList: TodoList;
  setSelectedListId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTodoLists: React.Dispatch<React.SetStateAction<TodoList[]>>;
}

function EditListDialogButton({
  selectedList,
  setSelectedListId,
  setTodoLists,
}: EditListDialogButtonProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <IconButton
        color="inherit"
        aria-label={t("list.editList")}
        sx={{ ml: 1 }}
        size="small"
        onClick={() => setOpen(true)}
      >
        <EditIcon />
      </IconButton>
      <EditListDialog
        key={selectedList.id}
        open={open}
        setOpen={setOpen}
        selectedList={selectedList}
        setSelectedListId={setSelectedListId}
        setTodoLists={setTodoLists}
      />
    </>
  );
}

export default EditListDialogButton;
