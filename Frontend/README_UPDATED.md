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

### 🏠 Dashboard
- Real-time application statistics
- Interactive charts and graphs
- Quick action buttons
- Recent activity feed
- Progress tracking

### 📋 Application Management
- Create and edit job applications
- Track application status and timeline
- Company and position details
- Document upload (resume, cover letters)
- Advanced filtering and search

### 📅 Interview Scheduling
- Calendar integration
- Interview type management
- Reminder notifications
- Interview preparation notes
- Success tracking

### 👤 Profile Management
- Personal information and skills
- Work experience and education
- Social media links
- Profile photo upload
- Resume management

### 📊 Analytics & Reports
- Application success rates
- Interview conversion metrics
- Company application trends
- Time-based analytics
- Export capabilities

### 🔍 Advanced Search
- Real-time search across all data
- Filter by multiple criteria
- Saved search queries
- Quick filters

### ⚙️ Settings & Preferences
- Theme customization (dark/light)
- Notification preferences
- Account settings
- Export/import data

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### 1. Clone the Repository

```bash
git clone https://github.com/ousaro/JobTracker.git
cd JobTracker/Frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Authentication
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret

# Analytics (Optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA-MEASUREMENT-ID

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_DARK_MODE=true

# Upload Configuration
NEXT_PUBLIC_MAX_FILE_SIZE=5242880
NEXT_PUBLIC_ALLOWED_FILE_TYPES=pdf,doc,docx,txt
```

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

### 5. Access the Application

- **Frontend:** http://localhost:3000
- **Storybook:** http://localhost:6006 (if configured)

---

## 📁 Project Structure

```
Frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── dashboard/                # Main dashboard
│   │   ├── page.tsx
│   │   ├── analytics/
│   │   ├── applications/
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
│   ├── charts/                   # Chart components
│   ├── forms/                    # Form components
│   ├── layout/                   # Layout components
│   └── theme-provider.tsx        # Theme management
├── context/                      # React context providers
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── NotificationContext.tsx
├── hooks/                        # Custom React hooks
│   ├── use-auth.ts
│   ├── use-api.ts
│   └── use-toast.ts
├── lib/                          # Utility libraries
│   └── utils.ts
├── utils/                        # Utility functions
│   ├── api.ts                    # API client configuration
│   ├── auth.ts                   # Authentication helpers
│   └── validation.ts             # Form validation schemas
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
| `NEXT_PUBLIC_JWT_SECRET` | JWT secret for token validation | - |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Enable analytics features | true |
| `NEXT_PUBLIC_ENABLE_NOTIFICATIONS` | Enable notifications | true |
| `NEXT_PUBLIC_MAX_FILE_SIZE` | Maximum file upload size (bytes) | 5242880 |
| `NEXT_PUBLIC_ALLOWED_FILE_TYPES` | Allowed file extensions | pdf,doc,docx,txt |

### API Integration

The frontend communicates with backend services through a centralized API client:

```typescript
// utils/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Request interceptor for authentication
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop:** Full-featured interface with sidebars and multiple columns
- **Tablet:** Adapted layout with collapsible navigation
- **Mobile:** Touch-optimized interface with bottom navigation

### Breakpoints
```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

---

## 🎨 Theme System

### Dark/Light Mode Support
The application supports both dark and light themes with automatic system preference detection:

```tsx
// components/theme-provider.tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

### Custom Color Scheme
```css
/* app/globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... more custom properties */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}
```

---

## 🔐 Authentication Flow

### Login Process
1. User enters credentials
2. Frontend sends request to auth service
3. Receives JWT access and refresh tokens
4. Stores tokens securely
5. Redirects to dashboard

### Token Management
```typescript
// utils/tokenService.ts
export const tokenService = {
  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },
  
  getAccessToken: () => localStorage.getItem('accessToken'),
  
  refreshToken: async () => {
    // Refresh token logic
  },
  
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};
```

---

## 📊 State Management

### Authentication Context
```tsx
// context/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Authentication logic
  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### E2E Tests
```bash
# Run Cypress tests
npm run cypress:run

# Open Cypress interactive mode
npm run cypress:open
```

### Testing Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
```

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

### Environment-Specific Builds
```bash
# Development
npm run dev

# Staging
npm run build:staging

# Production
npm run build:production
```

---

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for all components
- Follow ESLint and Prettier rules
- Use functional components with hooks
- Implement proper error boundaries

### Component Structure
```tsx
// components/Example.tsx
interface ExampleProps {
  title: string;
  children: React.ReactNode;
}

export const Example: React.FC<ExampleProps> = ({ 
  title, 
  children 
}) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
};
```

### API Integration Pattern
```tsx
// hooks/use-applications.ts
export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await applicationApi.getApplications();
      setApplications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return { applications, loading, error, refetch: fetchApplications };
};
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [React Hook Form Guide](https://react-hook-form.com/get-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

> [🔗 Back to main Job Tracker README](../README.md)
