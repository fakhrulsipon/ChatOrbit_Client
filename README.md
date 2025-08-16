# 💬 ChatOrbit - Community Forum

A **full-featured**, modern discussion forum built with the **MERN stack** (MongoDB, Express.js, React, Node.js), where users can post, comment, vote, and become premium members.  
Supports secure authentication, real-time interactions, Stripe payments, and admin moderation panel.

---

## 🌐 Live Demo
[🔗 Visit Live Site](https://super-gelato-a1166f.netlify.app/)
---

## 🚀 Project Overview

ChatOrbit is a **community-based platform** for open discussions, Q&A, and knowledge-sharing.  
Built for **engagement**, **moderation**, and **growth**, it combines all the essential features of a modern social forum:

- 🌟 Vote on posts and share opinions
- 📝 Report inappropriate comments
- 💎 Become a premium member (Bronze or Gold)
- 🧑‍💼 Admin Dashboard for moderation and analytics
- 📱 100% responsive and mobile-ready

---

## 🛠️ Key Features

- 🔐 **Secure Authentication** (Email + Social Login via Firebase)
- 📝 **Create Posts** with title, tags, and rich descriptions
- 💬 **Voting System** for community-powered content ranking
- 🚩 **Report Comments** with feedback reasons
- 🧪 **Admin Panel** with comment moderation & analytics
- 💎 **Stripe Payment Integration** for Premium Memberships
- 📊 **Charts & Insights** using Recharts
- 🌙 **Dark/Light Mode Toggle**
- 🧠 **User-friendly, Fast, & Accessible UI**

---

## 🧩 Technologies Used

### ⚛️ Frontend

| Package                     | Version   | Purpose                             |
|----------------------------|-----------|-------------------------------------|
| `react`                    | ^19.1.0   | Core UI framework                   |
| `react-router`             | ^7.6.3    | SPA Routing                         |
| `react-hook-form`          | ^7.60.0   | Form handling                       |
| `@tanstack/react-query`    | ^5.82.0   | Data fetching & caching             |
| `firebase`                 | ^11.10.0  | Authentication & Hosting            |
| `@stripe/react-stripe-js`  | ^3.7.0    | Payment Integration                 |
| `sweetalert2`              | ^11.22.2  | Alert & Confirm Dialogs             |
| `@headlessui/react`        | ^2.2.4    | Accessible UI components            |
| `lottie-react`             | ^2.4.1    | Animations                          |
| `react-icons`              | ^5.5.0    | Icon support                        |
| `recharts`                 | ^3.1.0    | Data visualizations                 |
| `axios`                    | latest    | API Requests                        |

### 🌐 Backend

- `express` – Web server framework  
- `mongoose` – MongoDB object modeling  
- `jsonwebtoken` – Secure JWT auth  
- `stripe` – Payment gateway integration

### ⚙️ Dev Tools

- `vite` – Lightning-fast dev environment  
- `eslint` – Linting & code formatting  
- `dotenv` – Environment variable management

---

## 📦 How to Run Locally

```bash
# 1️⃣ Clone the repository
git clone https://github.com/fakhrulsipon/chatorbit.git
cd ChatOrbit_Client

# 2️⃣ Install frontend dependencies
npm install

# 3️⃣ Add environment variables
# ➜ Create a .env file with:
# - VITE_FIREBASE_API_KEY
# - VITE_FIREBASE_AUTH_DOMAIN
# - VITE_MONGODB_URI
# - VITE_STRIPE_PUBLIC_KEY

# 4️⃣ Start development server
npm run dev
