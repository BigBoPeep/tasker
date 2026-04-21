export const STORE_KEY = "tasker";

export const DEFAULT_SETTINGS = {
  schemeVer: 1,
  dateFormatDue: "EEE MMM do yyyy '@' h:mmaaa",
  dateFormatCreated: "MM-dd-yyyy HH:mm",
  dateFormatCompleted: "EEE MMM do yyyy '@' h:mmaaa",
  filters: ["completed", "incomplete", "overdue"],
  sortBy: "deadline",
  sortOrder: "descending",
  theme: "ozark",
};

export const FILTERS = {
  completed: "Completed",
  incomplete: "Incomplete",
  overdue: "Overdue",
};
export const SORT_OPTIONS = {
  created: "Created",
  deadline: "Deadline",
  completed: "Completed",
  overdue: "Overdue",
  title: "Title",
};
export const SORT_ORDERS = {
  descending: "Descending",
  ascending: "Ascending",
  random: "Surprise Me",
};
export const THEMES = {
  ozark: "Ozark",
};
