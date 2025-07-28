

# Chatorbit - Community Forum

## Purpose
A full-featured discussion forum built with MERN stack (MongoDB, Express, React, Node.js) where users can create posts, comment, vote, and become premium members.

## Live URL
https://chatorbit-example.netlify.app

## Key Features
- User authentication (email + social login)
- Post creation with tags and voting
- Comment system with reporting
- Membership system with Bronze/Gold badges
- Admin dashboard for content management
- Responsive design for all devices

## NPM Packages Used
### Frontend Packages
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.1.0 | Core framework |
| react-dom | ^19.1.0 | React DOM rendering |
| @tanstack/react-query | ^5.82.0 | Data fetching |
| react-router | ^7.6.3 | Routing |
| react-hook-form | ^7.60.0 | Form management |
| firebase | ^11.10.0 | Authentication |
| @stripe/react-stripe-js | ^3.7.0 | Payment processing |
| react-share | ^5.2.2 | Social sharing |
| lottie-react | ^2.4.1 | Animations |
| react-icons | ^5.5.0 | Icon library |
| sweetalert2 | ^11.22.2 | Alert notifications |
| @headlessui/react | ^2.2.4 | UI components |
| recharts | ^3.1.0 | Data visualization |

### Backend
- `express` - Server framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - Authentication
- `stripe` - Payment processing

### Dev Tools
- `vite` - Build tool
- `eslint` - Code linting

🔎 Reported Activities / Comments (Admin Panel)
This feature allows the Admin to review, manage, and take actions on reported user comments — just like a Facebook group admin moderates inappropriate or harmful content.

📋 Overview
Admins can view a paginated list of all reported comments.

Each report includes:

Reporter Email (Who reported the comment)

Comment Text (with "Read More" option if long)

Feedback Reason (selected by the reporter)

Reported Time

Admin Actions

🛠️ Admin Functionalities
View Comment Details:

If a comment exceeds 20 characters, a "Read More" button allows the admin to view the full comment in a modal.

Delete Reported Comment:

Admin can click the "Delete Comment" button.

A confirmation prompt (via SweetAlert) ensures safety before deletion.

If confirmed:

The comment is permanently deleted from the system.

The report associated with it is also removed.

Success or error feedback is shown using styled alerts.

Pagination:

Admins can navigate through all reports using pagination controls.

Only 5 reports are shown per page to maintain clarity.

💡 Why This Feature Matters
This feature ensures community safety and quality by empowering admins to take action against harmful, spammy, or irrelevant content. It mimics real-world community moderation practices like those in Facebook groups or Reddit forums.

✅ Technologies Used
React for UI

TanStack React Query for efficient data fetching and caching

Axios (with Secure Hook) for API calls

SweetAlert2 for confirmation prompts

React Dialog (Modal) for full comment preview

MongoDB Aggregation (server-side) for paginated report fetch

🧪 Optional Enhancements (Future Ideas)
Mark as Resolved instead of just deleting

View User History (to detect repeated offenses)

Send Warning Email to the reported user

Filter by Feedback Type for focused moderation

