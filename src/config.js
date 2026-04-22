import { format } from "date-fns";

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
  midnight: "Midnight",
  dune: "Dune",
  arctic: "Arctic",
  ember: "Ember",
};

const now = new Date();
export const DATE_FORMATS = {
  "EEE MMM do yyyy '@' h:mmaaa": format(now, "EEE MMM do yyyy '@' h:mmaaa"),
  "MM-dd-yyyy HH:mm": format(now, "MM-dd-yyyy HH:mm"),
  "MM/dd/yyyy h:mmaaa": format(now, "MM/dd/yyyy h:mmaaa"),
  "dd/MM/yyyy HH:mm": format(now, "dd/MM/yyyy HH:mm"),
  "yyyy-MM-dd HH:mm": format(now, "yyyy-MM-dd HH:mm"),
  "MMM d, yyyy h:mmaaa": format(now, "MMM d, yyyy h:mmaaa"),
  "MMMM d, yyyy h:mmaaa": format(now, "MMMM d, yyyy h:mmaaa"),
  "EEEE, MMMM do yyyy": format(now, "EEEE, MMMM do yyyy"),
  "MM-dd-yyyy": format(now, "MM-dd-yyyy"),
  "MMM do ''yy '@' HH:mm": format(now, "MMM do ''yy '@' HH:mm"),
  "d MMM yyyy, HH:mm": format(now, "d MMM yyyy, HH:mm"),
};
