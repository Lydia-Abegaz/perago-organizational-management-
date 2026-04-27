# Perago Information System
## Perago Organizational Management - Full Stack Application

[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0.0-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-green.svg)](https://jwt.io/)

A **complete full-stack enterprise application** for managing organizational hierarchies with modern React frontend and secure NestJS backend.

## Project Overview

This is a comprehensive organizational management system featuring:

- **Secure Authentication** with JWT tokens and role-based access
- **Hierarchical Position Management** with advanced business logic
- **Modern React Frontend** with Next.js, Tailwind CSS, and Mantine UI
- **Enterprise Backend** with NestJS, PostgreSQL, and TypeORM
- **Comprehensive Testing** with unit and E2E test coverage
- **Professional Documentation** and setup guides

## Project Structure

```
perago-organizational-management/
├── frontend/                    # Next.js React Application
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   ├── components/         # Reusable UI components
│   │   ├── api/               # API integration layer
│   │   ├── store/             # Redux Toolkit state management
│   │   ├── types/             # TypeScript type definitions
│   │   └── utils/             # Utility functions
│   ├── public/                # Static assets
│   └── package.json
├── backend/                     # NestJS API Application
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   ├── positions/         # Position management
│   │   ├── users/             # User management
│   │   ├── common/            # Shared utilities
│   │   └── config/            # Configuration files
│   ├── test/                  # Test files
│   └── package.json
└── README.md                   # This file
```

## Quick Start

### Prerequisites
- **Node.js** 16+ 
- **PostgreSQL** 12+
- **npm** or **yarn**

### Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/Lydia-Abegaz/perago-organizational-management-.git
cd perago-organizational-management-
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up Environment Variables**

**Backend (.env):**
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=orga_structure

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=24h

# Application Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3001
```

**Frontend (.env):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

5. **Set up Database**
```bash
# Create PostgreSQL database named 'orga_structure'
# The backend will automatically create tables on startup
```

6. **Start Both Applications**

**Start Backend:**
```bash
cd backend
npm run start:dev
```

**Start Frontend (in separate terminal):**
```bash
cd frontend
npm run dev
```

7. **Access the Application**
- **Frontend:** `http://localhost:3001`
- **Backend API:** `http://localhost:3000`
- **API Documentation:** `http://localhost:3000/api`

## Frontend Features

### **Authentication System**
- User registration and login
- JWT token management
- Protected routes and components
- Automatic token refresh

### **Position Management**
- Create, edit, and delete positions
- Hierarchical tree visualization
- Drag-and-drop organization structure
- Real-time updates

### **Dashboard & Analytics**
- Organization overview
- Position statistics
- Team hierarchy visualization
- Search and filtering

### **Modern UI/UX**
- Responsive design with Tailwind CSS
- Mantine UI components
- Dark/light theme support
- Mobile-friendly interface

### **Performance Features**
- Server-side rendering with Next.js
- Optimistic updates
- Caching and state management
- Lazy loading components

## Backend Features

### **Security & Authentication**
- JWT-based authentication with Passport
- Role-based access control (Admin/User)
- Password hashing with bcrypt
- Protected API endpoints

### **Business Logic**
- Hierarchical position management
- Circular reference prevention
- Hierarchy depth validation
- Soft delete functionality

### **Data Management**
- PostgreSQL with TypeORM
- Advanced validation with class-validator
- Global error handling
- Request/response logging

### **Testing & Quality**
- Unit tests for services and controllers
- E2E tests for complete API flows
- Test coverage reporting
- Mock services for testing

## API Documentation

Visit `http://localhost:3000/api` for interactive Swagger documentation.

### Authentication Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Position Endpoints (All Protected)
- `GET /positions` - Get all positions
- `GET /positions/tree` - Get hierarchy tree
- `POST /positions` - Create position
- `GET /positions/:id` - Get specific position
- `PUT /positions/:id` - Update position
- `DELETE /positions/:id` - Delete position (Admin only)
- `GET /positions/:id/children` - Get direct children
- `GET /positions/:id/descendants` - Get all descendants
- `GET /positions/:id/ancestors` - Get all ancestors
- `GET /positions/:id/level` - Get hierarchy level

## Testing

### Backend Tests
```bash
cd backend

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Frontend Tests
```bash
cd frontend

# Run tests
npm test

# Test coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## Technology Stack

### **Frontend**
- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript 5+
- **Styling:** Tailwind CSS + Mantine UI
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Icons:** Lucide React

### **Backend**
- **Framework:** NestJS 10+
- **Language:** TypeScript 5+
- **Database:** PostgreSQL with TypeORM
- **Authentication:** JWT with Passport
- **Validation:** class-validator
- **Documentation:** Swagger/OpenAPI
- **Testing:** Jest + Supertest

### **Development Tools**
- **Code Quality:** ESLint + Prettier
- **Git Hooks:** Husky
- **Package Manager:** npm
- **Environment:** dotenv

## Security Features

### **Authentication & Authorization**
- JWT tokens with configurable expiration
- Role-based access control (Admin/User)
- Password hashing with bcrypt
- Route protection with guards

### **Data Validation**
- Input validation with class-validator
- Business logic validation
- SQL injection prevention
- XSS protection

### **API Security**
- CORS configuration
- Rate limiting capabilities
- Security headers
- Request/response logging

## Business Logic

### **Hierarchy Validation**
- Circular reference prevention
- Hierarchy depth limits
- Parent existence validation
- Position name uniqueness
- Safe deletion rules

### **Data Integrity**
- Soft delete functionality
- Audit trails with timestamps
- Referential integrity
- Transaction management

## Deployment

### **Environment Variables**

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 5432 |
| `DB_USERNAME` | Database username | postgres |
| `DB_PASSWORD` | Database password | - |
| `DB_DATABASE` | Database name | orga_structure |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRES_IN` | Token expiration | 24h |
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment | development |
| `FRONTEND_URL` | CORS origin | http://localhost:3001 |

### **Production Deployment**

1. **Set production environment variables**
2. **Build frontend:** `cd frontend && npm run build`
3. **Build backend:** `cd backend && npm run build`
4. **Set up reverse proxy** (nginx/Apache)
5. **Configure SSL/TLS** certificates
6. **Set up process manager** (PM2)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Enterprise Features

This application includes **enterprise-grade features**:

✅ **Security:** JWT authentication + role-based access control  
✅ **Data Integrity:** Comprehensive validation + business rules  
✅ **Error Handling:** Professional error responses with logging  
✅ **Testing:** Unit + E2E test coverage with mocking  
✅ **Documentation:** Enhanced Swagger with authentication  
✅ **Configuration:** Environment-based setup management  
✅ **Logging:** Request/response tracking and error monitoring  
✅ **Scalability:** Modular architecture with clean separation  
✅ **Maintainability:** Clean code principles and documentation  
✅ **Production Ready:** All enterprise requirements implemented  

---

## Getting Started Guide

### **First Time Setup:**
1. Clone repository
2. Install dependencies (both frontend and backend)
3. Set up PostgreSQL database
4. Configure environment variables
5. Start both applications
6. Register first user (automatically gets Admin role)
7. Start building your organization hierarchy!

### **Default Admin User:**
The first registered user automatically receives Admin privileges, allowing full access to all organizational management features.

**Built with ❤️ using modern enterprise technologies and best practices**
The above libraries are already on the project (just npm install)