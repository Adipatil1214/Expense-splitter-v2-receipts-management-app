# 💸 Expense Splitter V2 – Receipt Management System

🔗 **Live Demo:** https://expense-splitter-v2-receipts-manage.vercel.app

---

## 📌 Overview

Expense Splitter V2 is a full-stack MERN application designed to simplify **expense tracking, receipt management, and approval workflows**.

The system uses **OCR (Optical Character Recognition)** to automatically extract key details from uploaded receipts, reducing manual data entry and improving accuracy.

It supports both **user and admin roles**, making it suitable for personal use as well as organizational expense management.

---

## 🚀 Features

### 👤 User Features

* 📤 Upload receipt images
* 🔍 Automatic data extraction (vendor, amount, date)
* 📊 View expense status (Pending / Approved / Rejected)
* 🧾 Track all submitted expenses
* ⚠️ Report issues to admin

---

### 👨‍💼 Admin Features

* 📊 Dashboard with:

  * Total expenses
  * Approved / Rejected / Pending counts
  * Category-wise insights
* 📋 Manage all expenses in table format
* ✏️ Edit expense details (vendor, amount, date, status)
* ✅ Approve / Reject expenses
* 🔍 Filter by status (Pending / Approved / Rejected)
* 👁️ View uploaded receipt images (modal preview)
* ⚠️ View and manage reported issues

---

## 🧠 Tech Stack

### Frontend

* React.js
* Axios
* CSS / Inline Styling

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### OCR

* Tesseract OCR

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Adipatil1214/Expense-splitter-v2-receipts-management-app
cd Expense-splitter-v2-receipts-management-app
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Authentication

* JWT-based authentication
* Role-based access:

  * `user`
  * `admin`

---

## 📊 Future Improvements

* 📈 Charts & analytics (monthly trends)
* 📱 Mobile responsiveness improvements
* 🔔 Notifications system

---

## 🧾 Key Highlights

* Automated receipt parsing using OCR
* Full admin control panel
* Clean role-based UI
* Real-world expense approval workflow

---

## 👨‍💻 Author

**Aditya Patil**

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub and feel free to fork & improve!
