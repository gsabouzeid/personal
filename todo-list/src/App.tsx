import { Add } from "@mui/icons-material";
import "./App.css";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import Item from "./Item";

function App() {
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState<string[]>([]);

  function handleAddItem(item: string) {
    setItemList((prevList) => [...prevList, item]);
    setItem("");
  }

  return (
    <>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <TextField
          id="item-input"
          label="Item"
          variant="outlined"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleAddItem(item)}
          disabled={!item}
        >
          Add Item
        </Button>
      </div>
      <Stack spacing={2}>
        {itemList.map((item, key) => (
          <Item key={key} item={item} setItemList={setItemList} />
        ))}
      </Stack>
    </>
  );
}

export default App;
