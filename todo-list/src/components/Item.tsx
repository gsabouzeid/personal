import DeleteIcon from "@mui/icons-material/Delete";
import { Checkbox, FormControlLabel, IconButton, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

interface itemProps {
  item: string;
  index: number;
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

const Item = ({ item, index, setItemList }: itemProps) => {
  const { t } = useTranslation();
  function handleDeleteItem(index: number) {
    setItemList((prevList) =>
      prevList.filter((_value, i: number) => i !== index),
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
        <FormControlLabel control={<Checkbox />} label={item} />
        <IconButton
          aria-label={t("item.deleteItem")}
          onClick={() => handleDeleteItem(index)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </ItemCard>
  );
};

export default Item;
