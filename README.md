# Learn Assist Now - Backend API

A comprehensive Node.js/Express backend for the Learn Assist Now Learning Management System.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Student, instructor, and admin roles with profile management
- **Q&A System**: Questions, answers, voting, and tagging functionality
- **Announcements**: Course announcements with priority and targeting
- **Course Management**: Course creation, enrollment, and management
- **AI Study Assistant**: OpenAI integration for educational support
- **Dashboard Analytics**: Statistics and insights for users
- **File Upload**: Support for document and image uploads
- **Real-time Features**: Socket.IO for live updates

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (with Sequelize ORM)
- **Authentication**: JWT
- **Real-time**: Socket.IO
- **AI Integration**: OpenAI API
- **File Upload**: Multer
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL=sqlite:./database.sqlite

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Server
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# OpenAI (optional, for AI features)
OPENAI_API_KEY=your_openai_api_key_here

# Email (optional, for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### 3. Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout user
- `PUT /api/auth/change-password` - Change password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id/role` - Update user role (admin)
- `PUT /api/users/:id/status` - Activate/deactivate user (admin)
- `GET /api/users/:id/stats` - Get user statistics
- `GET /api/users/instructors/list` - Get instructors list

### Questions
- `GET /api/questions` - Get all questions (with filtering)
- `GET /api/questions/:id` - Get single question with answers
- `POST /api/questions` - Create new question
- `POST /api/questions/:id/vote` - Vote on question
- `POST /api/questions/:id/answers` - Add answer to question
- `PUT /api/questions/:id/resolve` - Mark question as resolved

### Announcements
- `GET /api/announcements` - Get all announcements
- `GET /api/announcements/:id` - Get single announcement
- `POST /api/announcements` - Create announcement (instructor/admin)
- `PUT /api/announcements/:id` - Update announcement
- `DELETE /api/announcements/:id` - Delete announcement
- `PUT /api/announcements/:id/pin` - Pin/unpin announcement (admin)
- `GET /api/announcements/stats/overview` - Get announcement statistics

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create new course (instructor/admin)
- `PUT /api/courses/:id` - Update course
- `POST /api/courses/:id/enroll` - Enroll in course (student)
- `DELETE /api/courses/:id/enroll` - Unenroll from course (student)
- `GET /api/courses/enrolled/my-courses` - Get enrolled courses

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/activities` - Get recent activities
- `GET /api/dashboard/trending` - Get trending questions
- `GET /api/dashboard/announcements` - Get recent announcements
- `GET /api/dashboard/unanswered` - Get unanswered questions (instructor)
- `GET /api/dashboard/overview` - Get system overview (admin)

### AI Assistant
- `POST /api/ai/study-assistant` - Chat with AI study assistant
- `POST /api/ai/suggest-questions` - Generate question suggestions
- `POST /api/ai/analyze-question` - Analyze question quality
- `POST /api/ai/study-plan` - Generate personalized study plan

### File Upload
- `POST /api/upload/single` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files
- `DELETE /api/upload/:filename` - Delete file

## Database Models

- **User**: Authentication and basic user info
- **Profile**: Extended user profile information
- **Question**: Student questions with metadata
- **Answer**: Answers to questions
- **Announcement**: Course announcements
- **Course**: Course information and management
- **Enrollment**: Student course enrollments
- **Vote**: Voting system for questions/answers
- **Tag**: Question tagging system
- **QuestionTag**: Many-to-many relationship for question tags

## Security Features

- JWT-based authentication
- Role-based authorization
- Rate limiting
- Input validation and sanitization
- CORS protection
- Helmet security headers
- Password hashing with bcrypt

## Real-time Features

The backend supports real-time updates using Socket.IO:

- New questions broadcast
- New answers on questions
- Announcement updates
- Live notifications

## Development

### Running Tests

```bash
npm test
```

### Database Operations

The database will be automatically created and synchronized when you start the server for the first time.

### Adding New Features

1. Create new models in `src/models/`
2. Add routes in `src/routes/`
3. Implement middleware in `src/middleware/`
4. Update the main server file to include new routes

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a production database (PostgreSQL recommended)
3. Set up proper logging
4. Configure reverse proxy (nginx)
5. Set up SSL certificates
6. Configure environment variables securely

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## License

MIT License - see LICENSE file for details
