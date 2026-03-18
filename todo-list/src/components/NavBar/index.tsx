import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { TodoList } from "../../App";
import EditListDialogButton from "./EditListDialogButton";
import SideMenuToggle from "./SideMenuToggle";

interface NavBarProps {
  todoLists: TodoList[];
  setTodoLists: React.Dispatch<React.SetStateAction<TodoList[]>>;
  selectedListId: string | undefined;
  setSelectedListId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function NavBar({
  todoLists,
  setTodoLists,
  selectedListId,
  setSelectedListId,
}: NavBarProps) {
  const { t } = useTranslation();
  const selectedList = todoLists.find((list) => list.id === selectedListId);

  return (
    <AppBar position="fixed" color="primary" enableColorOnDark>
      <Toolbar>
        <SideMenuToggle
          todoLists={todoLists}
          setTodoLists={setTodoLists}
          setSelectedListId={setSelectedListId}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t("todoList")}
        </Typography>
        {selectedList !== undefined && (
          <>
            <Typography variant="subtitle1" component="div">
              {selectedList.name}
            </Typography>
            <EditListDialogButton
              selectedList={selectedList}
              setSelectedListId={setSelectedListId}
              setTodoLists={setTodoLists}
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
