import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MenuDial from ".";

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
});
