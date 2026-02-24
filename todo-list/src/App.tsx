import { Add } from "@mui/icons-material";
import "./App.css";
import { Button } from "@mui/material";

function App() {
  return (
    <>
      <Button variant="contained" startIcon={<Add />}>
        Add Item
      </Button>
    </>
  );
}

export default App;
