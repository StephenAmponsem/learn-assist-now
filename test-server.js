const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running' });
});

// Basic auth routes for testing
app.post('/api/auth/login', (req, res) => {
  res.json({
    user: {
      id: '1',
      email: 'test@example.com',
      role: 'student'
    },
    token: 'test-token'
  });
});

app.post('/api/auth/register', (req, res) => {
  res.json({
    user: {
      id: '2',
      email: req.body.email,
      role: 'student'
    },
    token: 'test-token'
  });
});

app.get('/api/auth/profile', (req, res) => {
  res.json({
    id: '1',
    email: 'test@example.com',
    role: 'student',
    displayName: 'Test User'
  });
});

// Basic questions routes for testing
app.get('/api/questions', (req, res) => {
  res.json({
    questions: [
      {
        id: '1',
        title: 'Test Question',
        content: 'This is a test question',
        subject: 'Computer Science',
        difficulty: 'medium',
        votes: 0,
        views: 10,
        isResolved: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: {
          id: '1',
          displayName: 'Test User'
        },
        answers: []
      }
    ],
    total: 1
  });
});

// Basic announcements routes for testing
app.get('/api/announcements', (req, res) => {
  res.json({
    announcements: [
      {
        id: '1',
        title: 'Welcome to Learn Assist Now',
        content: 'This is a test announcement',
        priority: 'medium',
        targetAudience: 'all',
        isPinned: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: {
          id: '1',
          displayName: 'Admin User'
        }
      }
    ],
    total: 1
  });
});

app.listen(PORT, () => {
  console.log(`Test backend server running on port ${PORT}`);
});
