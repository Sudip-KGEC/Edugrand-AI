# 🎓 Edugrand AI (V2)

🚀 AI-powered Scholarship Discovery & Application Platform  
🏆 Top 6 Project (Out of 40+ Teams) — GDGOC Tech Sprint Hackathon 2026 @ MCKVIE  

---

## 🌐 Live Demo
🔗 https://edugrand-ai.vercel.app/ 

## 💻 GitHub Repository
🔗 https://github.com/Sudip-KGEC/Edugrand-AI 

## 📬 API Documentation (Postman)
🔗 https://letsupgradexpostman.postman.co/workspace/Backend-Leaning~89dea459-241f-4859-8d3d-929489e47eda/request/41840308-1be91147-1207-4dd2-81c7-474722dee43a?action=share&creator=41840308&ctx=documentation&active-environment=41840308-b457dc7d-948a-46f9-ba5e-1a1c841d513a

---

## 📌 Overview

**Edugrand AI** is a full-stack web application designed to help students discover and apply for **eligible scholarships** using AI-powered personalization.

The platform simplifies the scholarship process with:
- Smart filtering  
- Secure authentication  
- Admin management system  
- AI chatbot assistance  

---

## ✨ Features

### 🔐 Authentication & Security
- OTP-based email verification  
- JWT Authentication (Access + Refresh Tokens)  
- Secure session handling  
- Password hashing using bcrypt  
- OTP hashing using crypto  

---

### 🎯 Smart Scholarship System
- AI-based eligibility filtering  
- Personalized scholarship recommendations  
- Direct official application links  
- Easy-to-use UI for application flow  

---

### 🤖 AI Chatbot
- Handles scholarship-related queries  
- Improves user guidance and experience  

---

### 🧑‍💼 Admin Dashboard
- Add / Update / Delete scholarships  
- Manage applications  
- Track status:
  - Under Review  
  - Accepted  
  - Rejected  

---

### ⚡ Performance & Architecture
- Lazy loading for performance optimization  
- Modular & feature-based folder structure  
- Scalable backend architecture  

---

## 🛠️ Tech Stack

### 🎨 Frontend
- React.js  
- SCSS  
- Framer Motion  

**Libraries:**
- react-markdown  
- canvas-confetti  
- lucide-react  
- axios  

---

### ⚙️ Backend
- Node.js  
- Express.js  

**Authentication & Security:**
- JWT (Access + Refresh Tokens)  
- bcrypt  
- crypto  

**Email Service:**
- Nodemailer (Gmail SMTP)  

---

### 🗄️ Database
- MongoDB  

---

## 📂 Project Structure
Frontend/
├── components/
├── features/
├── pages/
├── hooks/
├── services/
└── styles/

Backend/
├── modules/
│ ├── auth/
│ ├── ai/
│ ├── scholarships/
│ └── users/
├── routes/
├── middleware/
├── utils/
└── config/


---

## 🔄 Authentication Flow

1. User enters email  
2. OTP is generated & sent via email  
3. OTP is hashed and stored in DB  
4. User verifies OTP  
5. JWT tokens issued (Access + Refresh)  
6. Role-based access granted  

---

## 🧠 AI Integration

- AI analyzes user profile  
- Filters scholarships based on eligibility  
- Chatbot provides real-time assistance  

---

## ⭐ Show Your Support

If you like this project and found it useful, consider giving it a ⭐ on GitHub — it really helps and motivates me to build more!

Thank you for your support 🙌