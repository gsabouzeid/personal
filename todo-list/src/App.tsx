import { Add } from "@mui/icons-material";
import "./App.css";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Item from "./Item";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@mui/material/styles";

function App() {
  const { t } = useTranslation();
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState<string[]>([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const { mode } = useColorScheme();
  if (!mode) {
    return null;
  }

  function handleAddItem(e: React.SubmitEvent<HTMLFormElement>, item: string) {
    e.preventDefault();

    setItemList((prevList) => [...prevList, item]);
    setItem("");
  }

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="menu"
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
            Todo List
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={(e) => handleAddItem(e, item)}>
        <div
          style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}
        >
          <TextField
            id="item-input"
            label="Item"
            variant="outlined"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<Add />}
            disabled={!item}
          >
            {t("item.addItem")}
          </Button>
        </div>
      </form>
      <Stack spacing={2}>
        {itemList.map((item, key) => (
          <Item key={key} item={item} index={key} setItemList={setItemList} />
        ))}
      </Stack>
    </>
  );
}

export default App;
