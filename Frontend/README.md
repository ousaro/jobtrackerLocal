# 🖥️ JobTracker Frontend

**JobTracker Frontend** is a modern React application built with Next.js 14 that provides a comprehensive user interface for job application tracking and management. It features a responsive design with dark/light theme support and real-time updates.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 14](https://nextjs.org/) with App Router
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Charts:** [Ant Design Charts](https://charts.ant.design/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **State Management:** React Context API
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Authentication:** JWT-based with refresh tokens

---

## ✨ Key Features

###  Analytics
- Real-time application statistics
- Interactive charts and graphs
- Recent activity feed

###  Application Management
- Create and edit job applications
- Track application status and timeline
- Company and position details
- Advanced filtering and search

###  Interview Scheduling
- Calendar integration
- Interview type management
- Interview preparation notes
- Success tracking

###  Profile Management
- Personal information and skills
- Work experience and education
- Social media links
- Profile photo upload
- Resume management

###  Advanced Search
- Real-time search across all data
- Filter by multiple criteria
- Saved search queries
- Quick filters

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### 1. Clone the Repository

```bash
git clone https://github.com/ousaro/jobtrackerLocal.git
cd jobtrackerLocal/Frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

### 5. Access the Application

- **Frontend:** http://localhost:3000

---

## 📁 Project Structure

```
Frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/                # Main dashboard
│   │   ├── page.tsx
│   │   ├── layout.tsx             # Dashboard layout
│   │   ├── analytics/
│   │   ├── applications/
│   │   ├── contacts/
│   │   ├── interviews/
│   │   ├── profile/
│   │   └── settings/
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── types/                    # TypeScript type definitions
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── theme-toggle.tsx          # Dark/light mode toggle
│   ├── withAuth.tsx              # Higher-order component for authentication
│   └── theme-provider.tsx        # Theme management
├── context/                      # React context providers
│   └──  AuthContext.tsx
├── hooks/                        # Custom React hooks
│   └── use-toast.ts
├── lib/                          # Utility libraries
│   └── utils.ts
├── utils/                        # Utility functions
│   ├── appClient.ts               # API client configuration
│   ├── axios.ts                   # Axios instance with interceptors
│   └── tokenService.ts            # Token management
├── api/                          # API integration modules
│   ├── authApi/
│   ├── applicationApi/
│   ├── userApi/
│   └── analyticsApi/
├── constants/                    # Application constants
└── public/                       # Static assets
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | http://localhost:8000/api |

---

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop:** Full-featured interface with sidebars and multiple columns
- **Tablet:** Adapted layout with collapsible navigation
- **Mobile:** Touch-optimized interface with bottom navigation

---

## 🎨 Theme System

### Dark/Light Mode Support
The application supports both dark and light themes with automatic system preference detection:

## 🔐 Authentication Flow

### Login Process
1. User enters credentials
2. Frontend sends request to auth service
3. Receives JWT access and refresh tokens
4. Stores tokens securely
5. Redirects to dashboard

---

> [🔗 Back to main Job Tracker README](../README.md)
