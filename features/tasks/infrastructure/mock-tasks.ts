export type Task = {
  id: string;
  title: string;
  dueDate: string;
  dueDateLabel: string;
  completed: boolean;
};

const todayDate = new Date();
const tomorrowDate = new Date(todayDate);
tomorrowDate.setDate(todayDate.getDate() + 1);
const nextWeekDate = new Date(todayDate);
nextWeekDate.setDate(todayDate.getDate() + 7);
const lastWeekDate = new Date(todayDate);
lastWeekDate.setDate(todayDate.getDate() - 7);

const formatDateKey = (date: Date) => date.toISOString().split('T')[0];

const formatDateLabel = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

const todayKey = formatDateKey(todayDate);

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Write project status update',
    dueDate: formatDateKey(todayDate),
    dueDateLabel: formatDateLabel(todayDate),
    completed: false,
  },
  {
    id: 'task-2',
    title: 'Review pull requests',
    dueDate: formatDateKey(todayDate),
    dueDateLabel: formatDateLabel(todayDate),
    completed: false,
  },
  {
    id: 'task-3',
    title: 'Plan sprint backlog',
    dueDate: formatDateKey(tomorrowDate),
    dueDateLabel: formatDateLabel(tomorrowDate),
    completed: false,
  },
  {
    id: 'task-4',
    title: 'Refactor onboarding form',
    dueDate: formatDateKey(nextWeekDate),
    dueDateLabel: formatDateLabel(nextWeekDate),
    completed: false,
  },
  {
    id: 'task-5',
    title: 'Archive old design files',
    dueDate: formatDateKey(todayDate),
    dueDateLabel: formatDateLabel(todayDate),
    completed: true,
  },
  {
    id: 'task-6',
    title: 'Write product requirements document',
    dueDate: formatDateKey(lastWeekDate),
    dueDateLabel: formatDateLabel(lastWeekDate),
    completed: false,
  },
];

export const getAllTasks = () => mockTasks;

export const getTodayTasks = () =>
  mockTasks.filter((task) => task.dueDate === todayKey && !task.completed);

export const getTodayAndOverdueTasks = () =>
  mockTasks.filter((task) => !task.completed && task.dueDate <= todayKey);
