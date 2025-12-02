# 🧠 ThinkSpace

> A modern, open discussion and idea-sharing platform — where curiosity meets collaboration.

ThinkSpace is a next-generation social discussion platform inspired by Reddit, designed for deeper conversations, innovation, and knowledge exchange.  
Built with the **MERN stack (MongoDB, Express, React, Node.js)**, ThinkSpace empowers users to create communities, share ideas, post discussions, and connect with like-minded thinkers.

---

## 🚀 Vision

ThinkSpace aims to become **the digital playground for thinkers, creators, and innovators** — a platform where content quality, learning, and interaction matter more than popularity.  
Our mission is to **foster thoughtful discussions** using modern tech, AI-assisted content curation, and community-driven moderation.

---

## ✨ Key Features

### 🗣️ Core Discussion System
- Create, upvote, and comment on posts (text, image, link, or polls)
- Nested threaded discussions with markdown support
- Intelligent content ranking algorithm (based on engagement, freshness, and quality)

### 👥 Community Spaces
- Create or join "Spaces" (topic-based communities)
- Moderators and custom rules for each Space
- Invite-only or public Space visibility

### 🔐 Authentication & Security
- JWT + bcrypt-secured authentication
- Social logins (Google, GitHub)
- Role-based access control (User, Moderator, Admin)

### 💬 Realtime Interaction
- Live commenting system with WebSockets
- Notifications for replies, mentions, and messages

### 🔍 Smart Discovery
- Search and filter posts by tags, topics, and keywords
- AI-assisted “Smart Feed” to recommend relevant discussions
- Trending topics and user insights

### ⚙️ Admin & Moderation Tools
- Flag/report inappropriate content
- User analytics dashboard
- Space moderation console

### 💾 Profile & Gamification
- Custom user profiles with bio, badges, and reputation points
- Achievements based on participation and helpfulness
- Contribution heatmap like GitHub

---

## 🎨 Design System

**Color Palette:**
- Primary: `#1995AD` - Main brand color for buttons, links, and active states
- Accent: `#A1D6E2` - Secondary highlights and hover effects
- Background: `#F1F1F2` - Neutral surface color

All colors are defined as CSS variables (`--color-primary`, `--color-accent`, `--color-bg`) for easy theming.

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js + Next.js + TailwindCSS |
| Backend | Node.js + Express.js |
| Database | MongoDB (Mongoose ORM) |
| Authentication | JWT, bcrypt, Clerk |
| Realtime | Socket.io |
| Deployment | Vercel (client) + Render/Atlas (server + DB) |
| Version Control | Git + GitHub |

---

## 🧩 Project Structure

```
ThinkSpace/
├── client/               # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
│
├── server/               # Express Backend
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── config/
│   ├── package.json
│   └── server.js
│
├── .env
├── .gitignore
├── README.md
└── package.json
```

---

## 🛠️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Rudrxxx/ThinkSpace.git
cd ThinkSpace
```

### 2️⃣ Install Dependencies
```bash
# Root
npm install

# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in `/server` with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### 4️⃣ Run the Development Servers
```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
```

Visit 👉 **http://localhost:5173**

---

## 📚 API Overview (Backend)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/posts | Get all posts |
| POST | /api/posts | Create new post |
| GET | /api/spaces | Get all spaces |
| POST | /api/spaces | Create new community |
| PUT | /api/posts/:id/upvote | Upvote a post |
| POST | /api/comments/:postId | Comment on a post |

---

## 🧠 Future Enhancements
- AI-powered content summarization and spam detection
- Advanced moderation dashboard
- Push notifications (Web + Mobile)
- Collaborative discussion boards (real-time editing)
- Mobile app (React Native)
- API rate limiting & caching layer (Redis)

---

## 🤝 Contributing

We love contributions from thinkers and builders! 💡

1. **Fork** the repository  
2. Create a new **branch**  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes  
   ```bash
   git commit -m "Add: your feature name"
   ```
4. **Push** your branch and create a **Pull Request**

Please check our [Issues](https://github.com/Rudrxxx/ThinkSpace/issues) tab for active tasks and ideas.

---