# Tentalk

Tentalk is a full‑stack web app that helps users schedule their work shifts and get real‑time traffic alerts before leaving for work. It combines a React frontend, an Express backend, Supabase for authentication and data storage, and Google Maps APIs for traffic estimation.

---

## 🧰 Features

- **Authentication** – Sign up, login, and email confirmation via Supabase
- **Shift Scheduling** – Users can add, update, and view their work shifts
- **Traffic Alerts** – Backend fetches real‑time traffic data before shift and emails the user
- **Calendar UI** – Displays all shifts and their estimated travel times
- **Interactive Map** – Shows route from start to destination with live travel time
- **Responsive Design** – Works well on desktop and mobile
- **Secure API** – Backend protected with CORS allowing only frontend requests

---

## 🚀 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, Tailwind CSS (or CSS modules) |
| **Backend** | Node.js, Express |
| **Database/Auth** | Supabase |
| **APIs** | Google Maps (Directions, Distance Matrix, Street View) |
| **Email** | Resend API |
| **Hosting** | Render (Frontend + Backend) |

---

## 🧭 Getting Started

### Prerequisites

- Node.js (>= 16 recommended)
- Supabase project (URL + anon & service‑role keys)
- Google Maps API key (Directions + Distance Matrix + Street View enabled)
- Resend API key for email notifications

### Setup

1. **Clone the repo**

```bash
git clone https://github.com/greenbat0365/tentalk.git
cd tentalk
```

2. **Install dependencies**

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. **Create `.env` files**

In `/backend/.env`

```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GOOGLE_MAPS_API_KEY=your-google-maps-key
RESEND_API_KEY=your-resend-key
FRONTEND_URL=https://your-frontend-url
```

4. **Configure Supabase redirect URLs**

Go to **Supabase Dashboard → Authentication → URL Configuration → Redirect URLs** and add your frontend URL. This ensures the confirmation email link redirects users back to your site.

5. **Run locally**

```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```

Visit `http://localhost:5173` (or the port Vite assigns) to view the app.

---

## 📁 Project Structure

```
tentalk/
├── backend/         # Express backend server
│   ├── index.js
│   ├── package.json
│   └── ...other backend files
├── frontend/        # React frontend
│   ├── src/
│   ├── package.json
│   └── ...React components
├── .gitignore
└── README.md
```

---

## 🔗 Live Demo

- **Frontend:** [https://tentalk.onrender.com](https://tentalk.onrender.com)
- **Backend:** [https://tentalk-api.onrender.com](https://tentalk-api.onrender.com)

---

## 📌 Future Improvements

- Add recurring shifts support
- Push notifications for alerts (instead of only email)
- Improved error handling and logging
- Advanced route optimization
- UI/UX refinements

---

## 📄 License

This project is open‑source and available under the MIT License.
