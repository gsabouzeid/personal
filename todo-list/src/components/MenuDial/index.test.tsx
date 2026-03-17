import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MenuDial from ".";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("MenuDial", () => {
  it("opens create-list dialog when FAB is clicked", () => {
    const setTodoLists = vi.fn();
    const setSelectedListId = vi.fn();

    render(
      <MenuDial
        setTodoLists={setTodoLists}
        setSelectedListId={setSelectedListId}
      />,
    );

    const fab = screen.getByRole("button", { name: /list.createNewList/i });
    fireEvent.click(fab);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  // it("creates a list and closes dialog on submit", () => {
  //   const setTodoLists = vi.fn();
  //   const setSelectedListId = vi.fn();

  //   render(
  //     <ThemeProvider theme={theme}>
  //       <MenuDial
  //         setTodoLists={setTodoLists}
  //         setSelectedListId={setSelectedListId}
  //       />
  //     </ThemeProvider>,
  //   );

  //   fireEvent.click(screen.getByRole("button", { name: /list.createNewList/i }));

  //   const dialog = screen.getByRole("dialog");
  //   const input = within(dialog).getByLabelText(/list.listName/i);
  //   fireEvent.change(input, { target: { value: "New list" } });

  //   fireEvent.click(within(dialog).getByRole("button", { name: /form.create/i }));

  //   expect(setTodoLists).toHaveBeenCalled();
  //   expect(setSelectedListId).toHaveBeenCalled();
  // });
});
