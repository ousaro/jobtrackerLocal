# JobTracker Frontend

Modern React single-page application built with Next.js 14 that provides a comprehensive user interface for job application tracking and management. Features a responsive design with dark/light theme support.

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Charts:** Ant Design Charts
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Authentication:** JWT-based with refresh tokens

## Key Features

### Analytics Dashboard
- Real-time application statistics with interactive charts
- Monthly application trends (area chart)
- Application status distribution (pie chart)
- Recent activity feed

### Application Management
- Create, edit, and delete job applications
- Track application status lifecycle (SAVED -> APPLIED -> INTERVIEW_SCHEDULED -> OFFER_RECEIVED -> REJECTED -> HIRED)
- Company, position, location, salary, and job description tracking
- Inline status updates via dialog

### Interview Scheduling
- Calendar integration
- Interview type management
- Success tracking

### Profile Management
- Personal information, skills, and title
- Resume upload and management
- Avatar upload
- Social links (GitHub, LinkedIn)

### Advanced Search
- Real-time search across applications and profiles
- Powered by Meilisearch backend

## Getting Started

### Prerequisites
- Node.js 18+

```bash
# Install dependencies
npm install

# Configure environment
# Create .env with:
# NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Start development server
npm run dev
```

Access the application at `http://localhost:3000`.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL via Kong | `http://localhost:8000/api` |

## Theme System

Supports dark and light themes with automatic system preference detection. Toggle available via the theme switcher in the dashboard header.

## Authentication Flow

1. User submits credentials to the auth service
2. Auth service returns JWT access + refresh tokens
3. Tokens are stored by the client and sent with every API request
4. Kong gateway validates the JWT before routing to backend services

## Project Structure

```
Frontend/
├── app/                          # Next.js App Router pages
│   ├── (auth)/login/             # Login page
│   ├── (auth)/register/          # Registration page
│   ├── dashboard/                # Main application shell
│   │   ├── analytics/            # Analytics dashboard
│   │   ├── applications/         # Application management
│   │   ├── contacts/             # Contact management
│   │   ├── interviews/           # Interview scheduling
│   │   ├── profile/              # User profile
│   │   └── settings/             # Settings
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                  # Landing page
│   └── types/                    # TypeScript type definitions
├── api/                          # API integration modules
│   ├── applicationApi/
│   ├── analyticsApi/
│   ├── authApi/
│   └── userApi/
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui primitives
│   ├── theme-toggle.tsx
│   ├── theme-provider.tsx
│   └── withAuth.tsx
├── constants/                    # Service URLs and constants
├── context/                      # React context providers
│   └── AuthContext.tsx
├── hooks/
├── lib/
└── utils/
```
