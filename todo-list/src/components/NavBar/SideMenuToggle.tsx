import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TodoList } from "../../App";
import CreateListDialog from "../CreateListDialog";
import SettingsDialog from "../SettingsDialog";

interface SideMenuProps {
  todoLists: TodoList[];
  setTodoLists: React.Dispatch<React.SetStateAction<TodoList[]>>;
  setSelectedListId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function SideMenuToggle({
  todoLists,
  setTodoLists,
  setSelectedListId,
}: SideMenuProps) {
  const { t } = useTranslation();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openCreateListDialog, setOpenCreateListDialog] =
    useState<boolean>(false);
  const [openSettingsDialog, setOpenSettingsDialog] = useState<boolean>(false);

  function handleSelectList(list: TodoList) {
    setSelectedListId(list.id);
  }

  return (
    <>
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
              <ListItemButton
                id="side-nav-create-new-list"
                onClick={() => setOpenCreateListDialog(true)}
              >
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
    </>
  );
}

export default SideMenuToggle;
