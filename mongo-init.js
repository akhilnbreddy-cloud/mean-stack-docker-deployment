// Initialize database and create collections
db = db.getSiblingDB('meandb');

// Create application user
db.createUser({
  user: 'appuser',
  pwd: 'apppassword',
  roles: [
    {
      role: 'readWrite',
      db: 'meandb'
    }
  ]
});

// Create sample collections
db.createCollection('users');
db.createCollection('tutorials');

// Insert sample data
db.tutorials.insertMany([
  {
    title: "Sample Tutorial 1",
    description: "This is a sample tutorial",
    published: true,
    createdAt: new Date()
  },
  {
    title: "Sample Tutorial 2", 
    description: "Another sample tutorial",
    published: false,
    createdAt: new Date()
  }
]);

print('Database initialized successfully');