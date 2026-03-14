import { PlaylistAddCircleOutlined } from "@mui/icons-material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useTranslation } from "react-i18next";

function MenuDial() {
  const { t } = useTranslation();

  const actions = [
    { icon: <PlaylistAddCircleOutlined />, name: t("list.createNewList") },
  ];

  return (
    <SpeedDial
      ariaLabel={t("list.listControls")}
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          slotProps={{
            tooltip: {
              title: action.name,
            },
          }}
        />
      ))}
    </SpeedDial>
  );
}

export default MenuDial;
