const fs = require('fs');
const path = require('path');

const dbFile = path.join(__dirname, 'users.json');

// Initialize database file if it doesn't exist
function initializeDatabase() {
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify({ users: [], nextId: 1 }), 'utf-8');
    console.log('Database initialized');
  } else {
    console.log('Connected to JSON database');
  }
}

// Read all data from database
function readDatabase() {
  try {
    const data = fs.readFileSync(dbFile, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return { users: [], nextId: 1 };
  }
}

// Write data to database
function writeDatabase(data) {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to database:', err);
  }
}

// Database methods that mimic sqlite3 API
const db = {
  run: function(query, params, callback) {
    try {
      const data = readDatabase();

      if (query.includes('INSERT INTO users')) {
        const [username, email, password] = params;

        // Check if user already exists
        const userExists = data.users.some(u => u.username === username || u.email === email);
        if (userExists) {
          const err = new Error('UNIQUE constraint failed');
          err.message = 'UNIQUE constraint failed';
          return callback(err);
        }

        const newUser = {
          id: data.nextId++,
          username,
          email,
          password,
          created_at: new Date().toISOString()
        };

        data.users.push(newUser);
        writeDatabase(data);

        callback(null);
      }
    } catch (err) {
      callback(err);
    }
  },

  get: function(query, params, callback) {
    try {
      const data = readDatabase();

      if (query.includes('SELECT * FROM users')) {
        const username = params[0];
        const user = data.users.find(u => u.username === username);
        callback(null, user || null);
      }
    } catch (err) {
      callback(err, null);
    }
  }
};

// Initialize database on load
initializeDatabase();

module.exports = db;
