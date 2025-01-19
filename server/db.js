import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Database configuration
const dbPath = path.join(process.cwd(), 'db', 'leads.db');
const dbDir = path.dirname(dbPath);

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Create leads table
db.prepare(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    message TEXT,
    receivedAt TEXT NOT NULL
  )
`).run();

// Create indexes
db.prepare('CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email)').run();

export default db;