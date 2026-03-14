import AddIcon from "@mui/icons-material/Add";
import { Fab, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

function MenuDial() {
  const { t } = useTranslation();

  return (
    <Tooltip title={t("list.createNewList")} placement="left" arrow>
      <Fab
        color="primary"
        aria-label={t("list.createNewList")}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
}

export default MenuDial;
