

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config_database_conn/mongo_DB_conn";

import authRoutes from "./routes/auth.route";
import adminUserRoutes from "./routes/admin.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

const PORT = process.env.PORT || 5000;

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admin/users", adminUserRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import connectDB from "./config_database_conn/mongo_DB_conn";

// // Routes
// import userRoutes from "./routes/user_route";
// import authRoutes from "./routes/auth.route";

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// connectDB();

// const PORT = process.env.PORT || 5000;

// app.use("/api/users", userRoutes); //:::::::::::::::::::// CRUD routes
// app.use("/api/auth", authRoutes); //::::::::::::::::::::: // Auth routes

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
