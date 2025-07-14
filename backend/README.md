# RBAC Backend API

A Role-Based Access Control (RBAC) backend API built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with register/login
- **Role-Based Access Control**: Three roles - user, moderator, admin
- **Resource Management**: CRUD operations for resources with role-based permissions
- **User Management**: Admin-only user management features
- **Profile Management**: User profile updates

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (MongoDB Atlas)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: validator.js
- **CORS**: Cross-Origin Resource Sharing enabled

## Folder Structure

```
backend/
├── config/
│   ├── db.js          # Database connection
│   └── jwt.js         # JWT configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── resourceController.js # Resource CRUD operations
│   └── userController.js     # User management
├── middleware/
│   ├── auth.js        # Authentication middleware
│   ├── async.js       # Async error handler
│   └── error.js       # Error handling middleware
├── models/
│   ├── User.js        # User model
│   └── Resource.js    # Resource model
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   ├── resourceRoutes.js  # Resource routes
│   └── userRoutes.js      # User routes
├── utils/
│   └── errorResponse.js   # Error response utility
├── validators/
│   ├── authValidators.js  # Auth validation
│   └── userValidators.js  # User validation
├── app.js            # Express app configuration
├── server.js         # Server entry point
├── package.json      # Dependencies
└── .env.example      # Environment variables example
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-backend-repo-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d
   ```

4. **Start the server**
   ```bash
   # Development
   npm start
   
   # Production
   npm run build
   node server.js
   ```

## API Documentation

### Authentication Endpoints

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/api/auth/register` | POST | Public | Register a new user |
| `/api/auth/login` | POST | Public | Login user |

### User Endpoints

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/api/users/profile` | GET | Private | Get current user profile |
| `/api/users/profile` | PUT | Private | Update current user profile |
| `/api/users` | GET | Admin | Get all users |
| `/api/users/:id` | GET | Admin | Get specific user |
| `/api/users/:id` | PUT | Admin | Update specific user |
| `/api/users/:id` | DELETE | Admin | Delete specific user |

### Resource Endpoints

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/api/resources` | GET | Private | Get resources (filtered by role) |
| `/api/resources/:id` | GET | Private | Get specific resource |
| `/api/resources` | POST | Moderator/Admin | Create new resource |
| `/api/resources/:id` | PUT | Moderator/Admin | Update resource |
| `/api/resources/:id` | DELETE | Admin | Delete resource |

### Request/Response Examples

#### Register User
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}

Response:
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login User
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

## Role-Based Access Control

### User Roles
- **user**: Can view their own resources and update profile
- **moderator**: Can create and update resources
- **admin**: Full access to all features including user management

### Permission Matrix

| Action | User | Moderator | Admin |
|--------|------|-----------|-------|
| View own resources | ✅ | ✅ | ✅ |
| View all resources | ❌ | ✅ | ✅ |
| Create resources | ❌ | ✅ | ✅ |
| Update own resources | ❌ | ✅ | ✅ |
| Update all resources | ❌ | ❌ | ✅ |
| Delete resources | ❌ | ❌ | ✅ |
| Manage users | ❌ | ❌ | ✅ |

## Deployment

### Deploy to Render

1. **Create Render Account**
   - Sign up at [render.com](https://render.com)

2. **Connect Repository**
   - Connect your GitHub repository
   - Select the backend folder

3. **Configure Service**
   - **Name**: rbac-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables**
   Add these in Render dashboard:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-production-jwt-secret
   JWT_EXPIRE=30d
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

### Deploy to Railway

1. **Create Railway Account**
   - Sign up at [railway.app](https://railway.app)

2. **Deploy from GitHub**
   - Connect your repository
   - Select the backend folder

3. **Environment Variables**
   Add the same environment variables as above

4. **Deploy**
   - Railway will automatically deploy your app

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_EXPIRE` | JWT token expiration time | No (default: 30d) |

## Error Handling

The API uses centralized error handling with the following error types:
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (authentication required)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found (resource not found)
- **500**: Internal Server Error

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation
- CORS protection
- Environment variable protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 