# 🛒 Full Stack E-Commerce Web Application

A complete **full-stack e-commerce platform** built with modern technologies, featuring user authentication, admin panel, product management, and secure API integration.

---

## 🚀 Live Demo

* 🌐 Frontend: https://ecommerce-frontend-32kd.vercel.app
* 🔗 Backend API: https://ecommerce-backend-dfvr.onrender.com

---

## 🧩 Tech Stack

### 🎨 Frontend

* React (Vite)
* Axios
* React Router
* CSS / Tailwind (if used)

### ⚙️ Backend

* Spring Boot
* REST APIs
* Spring Security
* JWT Authentication

### 🗄️ Database

* MySQL (Hosted on Railway)

### ☁️ Cloud & Deployment

* Frontend: Vercel
* Backend: Render
* Database: Railway
* Image Storage: Cloudinary

---

## 🔐 Features

### 👤 User Features

* User Registration & Login (JWT आधारित authentication)
* Secure Authentication & Authorization
* Browse Products
* Add to Cart
* Responsive UI

### 🛠️ Admin Features

* Admin Dashboard
* Add / Update / Delete Products
* Manage Users
* Manage Orders (if implemented)

---

## 🔑 Authentication

* JWT-based authentication system
* Secure API endpoints using Spring Security
* Token-based login session

---

## 📁 Project Structure

```
ecommerce/
│
├── ecommerce-frontend   # React Frontend
├── ecommerce-backend    # Spring Boot Backend
```

---

## ⚙️ Environment Variables

### Frontend (.env)

```
VITE_API_URL=https://ecommerce-backend-dfvr.onrender.com
```

### Backend (application.properties)

```
spring.datasource.url=YOUR_RAILWAY_DB_URL
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD

jwt.secret=YOUR_SECRET_KEY
```

---

## 🛠️ Installation & Setup

### 🔹 Clone the repository

```
git clone https://github.com/your-username/ecommerce.git
```

---

### 🔹 Backend Setup

```
cd ecommerce-backend
mvn clean install
mvn spring-boot:run
```

---

### 🔹 Frontend Setup

```
cd ecommerce-frontend
npm install
npm run dev
```

---

## 🚀 Deployment

* Frontend deployed on **Vercel**
* Backend deployed on **Render**
* Database hosted on **Railway**
* Images stored on **Cloudinary**

---

## 📸 Screenshots

*Add your project screenshots here (Home, Login, Admin Panel, etc.)*

---

## 🔮 Future Improvements

* 💳 Payment Integration (Stripe / Razorpay)
* 📦 Order Tracking System
* 🔍 Product Search & Filters
* 📊 Analytics Dashboard
* ❤️ Wishlist Feature

---

## 👨‍💻 Author

**Aman Kumar**

* GitHub: https://github.com/aman01246
* LinkedIn: (add your link here)

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and support!

---
