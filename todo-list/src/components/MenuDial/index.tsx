import AddIcon from "@mui/icons-material/Add";
import { Fab, Tooltip } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TodoList } from "../../App";
import CreateListDialog from "../CreateListDialog";

interface MenuDialProps {
  setTodoLists: React.Dispatch<React.SetStateAction<TodoList[]>>;
  setSelectedListId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function MenuDial({ setTodoLists, setSelectedListId }: MenuDialProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

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
      <CreateListDialog
        open={open}
        setOpen={setOpen}
        setTodoLists={setTodoLists}
        setSelectedListId={setSelectedListId}
      />
    </>
  );
}

export default MenuDial;
