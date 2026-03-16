import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
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
import EditListDialog from "./EditListDialog";
import SettingsDialog from "./SettingsDialog";

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
  const [openEditListDialog, setOpenEditListDialog] = useState<boolean>(false);
  const [openSettingsDialog, setOpenSettingsDialog] = useState<boolean>(false);

  const selectedList = todoLists.find((list) => list.id === selectedListId);

  function handleSelectList(list: TodoList) {
    setSelectedListId(list.id);
  }

  return (
    <AppBar position="fixed" color="primary" enableColorOnDark>
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
            <List sx={{ flexGrow: 1, overflowY: "auto" }}>
              {todoLists.length > 0 ? (
                todoLists.map((list, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton onClick={() => handleSelectList(list)}>
                      <ListItemText primary={list.name} />
                    </ListItemButton>
                  </ListItem>
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    p: 2,
                  }}
                >
                  {t("feelsEmpty")}
                </Box>
              )}
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpenCreateListDialog(true)}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("list.createNewList")} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpenSettingsDialog(true)}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("settings.settings")} />
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
        <SettingsDialog
          open={openSettingsDialog}
          setOpen={setOpenSettingsDialog}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t("todoList")}
        </Typography>
        {selectedList !== undefined && (
          <>
            <Typography variant="subtitle1" component="div">
              {selectedList.name}
            </Typography>
            <IconButton
              color="inherit"
              aria-label={t("list.editList")}
              sx={{ ml: 1 }}
              size="small"
              onClick={() => setOpenEditListDialog(true)}
            >
              <EditIcon />
            </IconButton>
            <EditListDialog
              open={openEditListDialog}
              setOpen={setOpenEditListDialog}
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
