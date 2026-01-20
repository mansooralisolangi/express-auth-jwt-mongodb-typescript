# 🚀 Express.js User Management REST API

A secure and scalable **User Management REST API** built with **Node.js, Express, TypeScript, MongoDB**, and modern backend best practices.

This project demonstrates **real-world backend architecture**, focusing on **authentication, authorization, security, and clean code structure**.

---

## ✨ Features

- 🔐 JWT Authentication (Register / Login)
- 👥 Role-Based Access Control (RBAC)
  - **Admin** → Create, Read, Update, Delete users
  - **User** → Read-only access
- 🔑 bcrypt Password Hashing
- ✅ Zod Validation for request safety
- 🧱 Clean MVC Architecture
- 🗄 MongoDB + Mongoose
- 🧪 Tested with Postman
- 🔒 Production-ready security patterns

---

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Zod
- Postman

---

---

## 🔐 Authentication Flow

1. User registers
2. User logs in
3. Server returns JWT token
4. Token is sent in headers:
5. Protected routes are accessed securely

---

## 👮 Role-Based Access

| Role  | Permissions |
|------|-------------|
| Admin | Create, Read, Update, Delete users |
| User  | Read-only access |

Role validation is handled using middleware.

---

## 📌 API Endpoints

### 🔑 Auth Routes

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get logged-in user profile |

---

### 👑 Admin Routes (Protected)

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/users/:id` | Get user by ID |
| POST | `/api/admin/users` | Create new user |
| PUT | `/api/admin/users/:id` | Update user |
| DELETE | `/api/admin/users/:id` | Delete user |

---

## 🔐 Password Security

- Passwords are never stored in plain text
- bcrypt hashing is applied using a Mongoose `pre-save` hook
- Secure against common security vulnerabilities

---

## 🧪 Testing

All endpoints tested using **Postman**

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

🎯 Learning Outcomes

JWT Authentication
Role-Based Authorization
Secure password handling with bcrypt
Express.js MVC architecture
Zod-based request validation
Real-world backend API patterns

👨‍💻 Author
Mansoor Ali
Junior Software Developer
Laravel | Node.js | Express | MongoDB

⭐ Feedback
If you find this project helpful, feel free to ⭐ the repository and share feedback.
Happy Coding

