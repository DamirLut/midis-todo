export type TableData = {
  title: string;
  columns: ColumnData[];
};

export type ColumnData = {
  name: string;
  tasks: TaskData[];
  main: boolean;
  color: 'default' | 'error' | 'primary' | 'secondary' | 'success' | 'warning';
};

export type TaskData = {
  name: string;
  description: string;
  id: string;
  column: number;
};
