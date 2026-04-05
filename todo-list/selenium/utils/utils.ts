import { Key } from "selenium-webdriver";

export const selectAll =
  process.platform === "darwin"
    ? Key.chord(Key.COMMAND, "a")
    : Key.chord(Key.CONTROL, "a");
