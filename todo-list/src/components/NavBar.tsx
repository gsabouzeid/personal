import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TodoList } from "../App";

interface NavBarProps {
  todoLists: TodoList[];
}

function NavBar({ todoLists }: NavBarProps) {
  const { t } = useTranslation();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

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
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setOpenDrawer(false)}
          >
            <List>
              {todoLists.map((list, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={list.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t("todoList")}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
