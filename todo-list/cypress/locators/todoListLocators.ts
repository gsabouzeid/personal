export default {
  createNewListButton: "button[aria-label='Create New List']",

  listNameInput: "#list-name",
  submitButton: "button[type='submit']:contains('Create')",

  showListsToggle: "button[aria-label='Show Lists Toggle']",
  listToggle: (listName: string) => `div[role='button']:contains(${listName})`,
  sideNavCreateNewListbutton: "div[role='button']:contains('Create New List')",
  settingsButton: "div[role='button']:contains('Settings')",

  editListButton: "button[aria-label='Edit List']",
  editButton: "button:contains('Edit')",
  deleteButton: "button:contains('Delete')",

  itemInput: "#item-input",
  addItemButton: "button[type='submit']:contains('Add Item')",
};
