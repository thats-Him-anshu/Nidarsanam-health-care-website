# 🏥 Nidarsanam Health Care

A modern, full-stack healthcare website built with **React + Vite** (frontend) and **Express + MongoDB** (backend).

## 📁 Project Structure

```
├── client/          → React frontend (Vite)
│   ├── src/
│   │   ├── components/   → Reusable UI components
│   │   ├── pages/        → Page components
│   │   ├── services/     → API service layer
│   │   └── styles/       → Global CSS & animations
│   └── ...
├── server/          → Express backend
│   ├── config/      → Database configuration
│   ├── controllers/ → Route handler logic
│   ├── models/      → Mongoose schemas
│   ├── routes/      → Express routes
│   └── middleware/  → Error handling
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or later)
- **MongoDB** (local or Atlas)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd "Nidarsanam Health Care"
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI
   ```

5. **Run the development servers**

   **Frontend** (runs on `http://localhost:5173`):
   ```bash
   cd client
   npm run dev
   ```

   **Backend** (runs on `http://localhost:5000`):
   ```bash
   cd server
   npm run dev
   ```

## 🛠️ Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Frontend  | React 18, React Router, Vite  |
| Styling   | Vanilla CSS (custom design system) |
| Backend   | Express.js, Node.js           |
| Database  | MongoDB, Mongoose             |
| HTTP      | Axios                         |

## 📄 Pages

- **Home** — Hero section, services preview, and CTA
- **About** — Story, values, and milestone timeline
- **Services** — Department listings with features
- **Contact** — Contact form (saves to MongoDB) + info cards
- **404** — Custom not-found page

## 📝 License

© Nidarsanam Health Care. All rights reserved.
