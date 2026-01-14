# ReNote  
**Explore, organize, and summarize academic resources in one place.**

ReNote is a **web-based academic repository prototype** designed to help users upload, browse, and manage learning resources with the assistance of AI-generated summaries.  
This project focuses on **user experience, interface design, and system flow**, serving as a functional prototype for demonstration and academic purposes.

---

## ✦ Features ✦

### 🏠 Home Page
- System introduction (What is ReNote)
- Call-to-action buttons (Sign in / Sign up)
- Hero section with custom background
- Quick access to repository exploration

### 🔐 Authentication
- Authentication flow prepared for Clerk integration
- UI-ready Sign in and Sign up pages

### 📂 Repository / Explore Page
- View uploaded resources in a list layout
- Keyword search
- Sorting options (Recents, A–Z)
- Resource cards with metadata (tags, type, updated date)
- Like/star indicator

### 📄 Resource Detail Page
- View resource metadata
- Preview placeholder (PDF/Text-ready)
- AI-generated summary (mock)
- Re-summarize button (mock behavior)
- Delete resource functionality

### ⬆️ Upload Page
- Upload UI for documents (PDF, DOCX, TXT, Images)
- Title and tag input
- Ready for progress indicator and submission logic

### 📚 Collections Page
- Placeholder for user-created collections
- Designed for saving and organizing resources

### 📊 Dashboard
- User overview
- Recent activity placeholders
- Designed for future analytics and summaries

---

## Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS (Dark Mode, custom purple/pink theme)
- **Routing:** React Router
- **Icons:** Lucide React
- **State Management:** React Context API
- **Authentication (Planned):** Clerk
- **AI Integration (Planned):** OpenAI / summarization API

---

## Getting Started (Setup Instructions)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/AlihCA/ReNote.git
cd renote
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the development server
```bash
npm run dev
```

### 4️⃣ Open in browser
http://localhost:5173

