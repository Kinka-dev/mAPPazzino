import * as SQLite from 'expo-sqlite';
import { addMutation, } from './mutationLog';

export type Product = {
  id: number;
  name: string;
  quantity: number;
  updated_at: number;
};

function generateId() {
  return 'evt_' + Math.random().toString(36).substring(2, 10);
}

export function openDatabase() {
  return SQLite.openDatabaseSync('magazzino.db');
}

export async function initDatabase() {
  const db = openDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `);
}

export async function getAllProducts(): Promise<Product[]> {
  const db = openDatabase();
  return await db.getAllAsync<Product>(
    'SELECT id, name, quantity, updated_at FROM products ORDER BY name ASC'
  );
}

export async function addProduct(name: string, quantity: number): Promise<void> {
  const db = openDatabase();
  const now = Math.floor(Date.now() / 1000);

  await db.runAsync(
    'INSERT INTO products (name, quantity, updated_at) VALUES (?, ?, ?)',
    [name, quantity, now]
  );

  addMutation({
    id: generateId(),
    type: 'create',
    table: 'products',
    payload: { name, quantity },
    timestamp: now,
    device: 'KinkaPhone'
  });
}

export async function updateProductQuantity(id: number, quantity: number): Promise<void> {
  const db = openDatabase();
  const now = Math.floor(Date.now() / 1000);

  await db.runAsync(
    'UPDATE products SET quantity = ?, updated_at = ? WHERE id = ?',
    [quantity, now, id]
  );

  addMutation({
    id: generateId(),
    type: 'update',
    table: 'products',
    payload: { id, quantity },
    timestamp: now,
    device: 'KinkaPhone'
  });
}

export async function deleteProduct(id: number): Promise<void> {
  const db = openDatabase();

  await db.runAsync('DELETE FROM products WHERE id = ?', [id]);

  addMutation({
    id: generateId(),
    type: 'delete',
    table: 'products',
    payload: { id },
    timestamp: Math.floor(Date.now() / 1000),
    device: 'KinkaPhone'
  });
}

