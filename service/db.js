// db.js
import Dexie from 'dexie';

export const db = new Dexie('myWorkoutDatabase');
db.version(1).stores({
  workout: '++id, user_email', // Primary key and indexed props
});
