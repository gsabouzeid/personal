import MailIcon from "@mui/icons-material/Mail";
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

function NavBar() {
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
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{<MailIcon />}</ListItemIcon>
                  <ListItemText primary={"Thing 1"} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{<MailIcon />}</ListItemIcon>
                  <ListItemText primary={"Thing 2"} />
                </ListItemButton>
              </ListItem>
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
