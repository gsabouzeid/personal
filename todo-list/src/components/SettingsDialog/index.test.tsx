import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SettingsDialog from ".";

describe("SettingsDialog", () => {
  it("does not render when closed", () => {
    const setOpen = vi.fn();
    render(<SettingsDialog open={false} setOpen={setOpen} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  // TODO: Need to mock useColorScheme
  // it("renders and lets user select theme mode", async () => {
  //   const setOpen = vi.fn();
  //   const setMode = vi.fn();

  //   render(<SettingsDialog open={true} setOpen={setOpen} />);
  //   expect(screen.getByRole("dialog")).toBeInTheDocument();

  //   const lightBtn = screen.getByRole("radio", { name: /light/i });
  //   fireEvent.click(lightBtn);

  //   expect(setMode).toHaveBeenCalledWith("light");
  // });
});
