import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  useColorScheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface SettingsDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SettingsDialog({ open, setOpen }: SettingsDialogProps) {
  const { t } = useTranslation();
  function handleClose() {
    setOpen(false);
  }

  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>{t("settings.settings")}</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel id="theme-radio-buttons-group-label">
            {t("settings.theme")}
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="theme-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={mode}
            onChange={(event) =>
              setMode(event.target.value as "system" | "light" | "dark")
            }
          >
            <FormControlLabel
              value="light"
              control={<Radio />}
              label={t("settings.light")}
            />
            <FormControlLabel
              value="dark"
              control={<Radio />}
              label={t("settings.dark")}
            />
            <FormControlLabel
              value="system"
              control={<Radio />}
              label={t("settings.system")}
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("form.close")}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SettingsDialog;
