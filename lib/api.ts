import { writeFileSync, readFileSync } from 'fs';

import { TableData } from './api.type';
import { ShortID, RandomID } from './random';

const dbFile = '/root/projects/midis-todo/db.json';
let db: Record<string, TableData> = JSON.parse(readFileSync(dbFile, 'utf-8'));

function dbSave() {
  return writeFileSync(dbFile, JSON.stringify(db, null, 2));
}

export function removeDB(): boolean {
  db = {};
  dbSave();
  return true;
}

export function createTable(title: string): string {
  let uid = ShortID();
  db[uid] = {
    title,
    columns: [
      { name: 'Задачи', tasks: [], main: true, color: 'primary' },
      { name: 'В работе', tasks: [], main: false, color: 'secondary' },
      { name: 'Тестируются', tasks: [], main: false, color: 'warning' },
      { name: 'Выполненно', tasks: [], main: false, color: 'success' },
    ],
  };
  dbSave();
  return uid;
}

export function getTable(uid: string) {
  return db[uid];
}

export function createTask(uid: string, name: string, description: string) {
  if (!db[uid]) return null;
  db[uid].columns[0].tasks.push({
    id: RandomID(),
    name,
    description,
    column: 0,
  });
  dbSave();
  return db[uid].columns[0].tasks.at(-1);
}

export function moveTask(uid: string, taskId: string, moveTo: number) {
  if (!db[uid]) return false;

  for (const column of db[uid].columns) {
    const finded = column.tasks.find((data) => data.id == taskId);
    if (finded) {
      const index = column.tasks.indexOf(finded);
      const temp = column.tasks[index];
      temp.column = moveTo;
      column.tasks.splice(index, 1);
      db[uid].columns[moveTo].tasks.push(temp);
      dbSave();
      return getTable(uid);
    }
  }
  return false;
}

export function deleteTask(uid: string, taskId: string) {
  if (!db[uid]) return false;
  for (const column of db[uid].columns) {
    const finded = column.tasks.find((data: any) => data.id != taskId);
    if (finded) {
      const index = column.tasks.indexOf(finded);
      column.tasks.splice(index, 1);
      dbSave();
      return getTable(uid);
    }
  }
  return false;
}
