import DeleteIcon from "@mui/icons-material/Delete";
import { Checkbox, FormControlLabel, IconButton, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import type { ItemObj, TodoList } from "../App";

interface itemProps {
  item: ItemObj;
  selectedListId: string;
  setTodoLists: React.Dispatch<React.SetStateAction<TodoList[]>>;
}

const ItemCard = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const Item = ({ item, selectedListId, setTodoLists }: itemProps) => {
  const { t } = useTranslation();

  function handleDeleteItem(id: string) {
    setTodoLists((prevLists) =>
      prevLists.map((list) =>
        list.id === selectedListId
          ? { ...list, items: list.items.filter((item) => item.id !== id) }
          : list,
      ),
    );
  }

  function handleCheckItem(e: React.ChangeEvent<HTMLInputElement>, id: string) {
    setTodoLists((prevLists) =>
      prevLists.map((list) =>
        list.id === selectedListId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === id
                  ? { ...item, completed: e.target.checked }
                  : item,
              ),
            }
          : list,
      ),
    );
  }

  return (
    <ItemCard>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={item.completed}
              onChange={(e) => handleCheckItem(e, item.id)}
            />
          }
          label={item.name}
        />
        <IconButton
          aria-label={t("item.deleteItem")}
          onClick={() => handleDeleteItem(item.id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </ItemCard>
  );
};

export default Item;
