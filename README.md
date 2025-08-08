

💬 ChatOrbit - Community Forum
A full-featured, modern discussion forum built with the MERN stack (MongoDB, Express.js, React, Node.js), where users can post, comment, vote, and become premium members. The platform supports secure authentication, real-time interactions, and admin moderation.

🌐 Live URL
🔗 ChatOrbit Live Site

🚀 Project Overview
A community-based forum for open discussions, Q&A, and content sharing.

Offers voting system, comment reporting, and premium membership (Bronze, Gold).

Includes an Admin Dashboard to manage users, posts, and reports.

Ensures responsiveness and accessibility across all devices.

🛠️ Key Features
🔐 User Authentication (Email + Social Login via Firebase)

📝 Post Creation with Tags, Voting & Commenting

🚩 Comment Reporting System with Admin Review Panel

💎 Membership Badges: Bronze and Gold with Stripe Payment Integration

🧑‍💼 Admin Dashboard for Moderation and Analytics

📊 Data Visualizations via Recharts

📱 Mobile-Responsive, Fast and Optimized UI

🧩 Technologies Used
⚛️ Frontend
Package	Version	Purpose
react	^19.1.0	Core UI framework
react-dom	^19.1.0	DOM rendering
react-router	^7.6.3	Routing
react-hook-form	^7.60.0	Form handling
@tanstack/react-query	^5.82.0	Data fetching & caching
firebase	^11.10.0	Auth & Hosting
@stripe/react-stripe-js	^3.7.0	Payment Integration
sweetalert2	^11.22.2	Alert & Confirm Dialogs
@headlessui/react	^2.2.4	Accessible Modals and UI elements
lottie-react	^2.4.1	Animation rendering
react-icons	^5.5.0	Icon support
recharts	^3.1.0	Charts & Graphs
axios	latest	HTTP Requests

🌐 Backend
express – Web server framework

mongoose – MongoDB object modeling

jsonwebtoken – Secure auth via JWT

stripe – Payment handling

⚙️ Dev Tools
vite – Fast dev server

eslint – Code linting and formatting

📦 How to Run Locally
bash
Copy
Edit
# Clone the repository
git clone https://github.com/your-username/chatorbit.git
cd chatorbit

# Install dependencies
npm install

# Add environment variables
# Create a .env file and include Firebase, Stripe, and MongoDB URIs

# Start the development server
npm run dev
Make sure to also run the backend server (in a separate terminal) if decoupled.

🧾 Admin - Reported Comments Panel
Admin can view and manage user-reported comments:

Features:
Paginated Reports (5 per page)

Feedback Reasons and Reporter Email

Full Comment Preview (with "Read More" modal)

Delete Comment with confirmation via SweetAlert

MongoDB Aggregation used for efficient backend queries

Why It Matters:
Helps maintain a clean and respectful community, much like moderation in Reddit or Facebook Groups.

🖼️ Screenshots & Media
Add your homepage screenshot and admin dashboard screenshots in this section using GitHub or external image links.

🧪 Optional Future Enhancements
🔔 Mark reports as Resolved instead of deleting

📊 Filter by feedback reason

📬 Warning email system to repeated offenders

📄 View user comment history for admins

🏫 Education & Credits
This project was developed as part of a full-stack developer learning journey using:

Firebase

MongoDB Atlas

Stripe

React

Vite
