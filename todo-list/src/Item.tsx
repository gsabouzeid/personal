import { IconButton, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

interface itemProps {
  item: string;
  setItemList: React.Dispatch<React.SetStateAction<string[]>>;
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

const Item = ({ item, setItemList }: itemProps) => {
  function handleDeleteItem(item: string) {
    setItemList((prevList) =>
      prevList.filter((listItem: string) => listItem !== item),
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
        {item}
        <IconButton
          aria-label="Delete Item"
          onClick={() => handleDeleteItem(item)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </ItemCard>
  );
};

export default Item;
