import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TodoList } from "../App";
import CreateListDialog from "./CreateListDialog";

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
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openCreateListDialog, setOpenCreateListDialog] =
    useState<boolean>(false);

  function handleSelectList(list: TodoList) {
    setSelectedListId(list.id);
  }

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          aria-label={t("nav.showListsToggle")}
          sx={{ mr: 2 }}
          onClick={() => setOpenDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={openDrawer} onClick={() => setOpenDrawer(false)}>
          <Box
            sx={{
              width: 250,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            role="presentation"
          >
            <List sx={{ flexGrow: 1 }}>
              {todoLists.map((list, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => handleSelectList(list)}>
                    <ListItemText primary={list.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpenCreateListDialog(true)}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create New List" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <CreateListDialog
          open={openCreateListDialog}
          setOpen={setOpenCreateListDialog}
          setTodoLists={setTodoLists}
          setSelectedListId={setSelectedListId}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t("todoList")}
        </Typography>
        {selectedListId !== undefined && (
          <Typography variant="subtitle1" component="div">
            {todoLists.find((list) => list.id === selectedListId)?.name}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
