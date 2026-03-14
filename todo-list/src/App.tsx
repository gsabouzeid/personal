import { Add } from "@mui/icons-material";
import { Button, Stack, TextField, Toolbar } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import Item from "./components/Item";
import MenuDial from "./components/MenuDial";
import NavBar from "./components/NavBar";

function App() {
  const { t } = useTranslation();
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState<string[]>([]);

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
      <NavBar />
      <Toolbar />
      <main>
        <form onSubmit={(e) => handleAddItem(e, item)}>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginBottom: "0.75rem",
              justifyContent: "center",
            }}
          >
            <TextField
              id="item-input"
              label={t("item.item")}
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
      </main>
      <MenuDial />
    </>
  );
}

export default App;
