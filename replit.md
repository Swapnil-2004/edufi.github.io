# EduFi - Your AI Mentor

## Overview

EduFi is a modern, multilingual educational platform designed specifically for Indian students aged 14-25. The platform serves as an AI-powered mentor that provides personalized college recommendations, budget-aware academic planning, scholarship discovery, and peer collaboration through innovative features like "EduSwipe" (a Tinder-style teammate matching system). Built with a focus on accessibility for Tier 2 & 3 cities, EduFi offers multilingual support and engaging UI/UX to guide students from classroom to career.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built using React with TypeScript and follows a modern component-based architecture. The application uses Wouter for client-side routing and TanStack Query for state management and server communication. The UI is implemented with shadcn/ui components built on top of Radix UI primitives, providing accessible and customizable interface elements.

**Key Design Patterns:**
- Component composition with Radix UI primitives
- Custom hooks for language management and mobile detection
- Context providers for global state (language, theme)
- Query-based data fetching with caching and error handling

### Backend Architecture
The server follows a REST API architecture built with Express.js and TypeScript. The application uses a modular route structure with proper error handling middleware and request logging. The storage layer is abstracted through an interface pattern, allowing for flexible data persistence strategies.

**API Structure:**
- Authentication endpoints for user registration and login
- RESTful routes for users, colleges, scholarships, and internships
- EduSwipe matching system with compatibility scoring
- Progress tracking and recommendation endpoints

### Data Storage Solutions
The application uses Drizzle ORM with PostgreSQL for type-safe database operations. The schema is designed to support the educational platform's core features including user profiles, college information, scholarships, internships, user matching, and progress tracking.

**Database Design:**
- User management with roles, preferences, and gamification elements
- College catalog with filtering capabilities (location, fees, ratings)
- Scholarship and internship discovery with eligibility criteria
- User matching system for peer collaboration
- Progress tracking and recommendation storage

### Authentication and Authorization
The platform implements a role-based authentication system supporting students, mentors, and administrators. User sessions are managed with password-based authentication, with plans for enhanced security features.

### Styling and UI Framework
The frontend uses Tailwind CSS for utility-first styling with a custom design system featuring warm color palettes (sky blue, emerald green, warm orange). The design is fully responsive and includes support for dark mode through CSS custom properties.

### Internationalization
The application supports multilingual functionality with English, Hindi, and Bengali language options. Translation management is handled through a custom hook system with localStorage persistence for user preferences.

## External Dependencies

### Database and ORM
- **PostgreSQL**: Primary database using Neon serverless PostgreSQL for cloud deployment
- **Drizzle ORM**: Type-safe database toolkit with schema migrations and query building
- **Drizzle Kit**: Database migration and schema management tools

### Frontend Libraries
- **React**: Core frontend framework with TypeScript support
- **Wouter**: Lightweight client-side routing library
- **TanStack Query**: Server state management with caching and synchronization
- **Radix UI**: Headless component library for accessible UI primitives
- **shadcn/ui**: Pre-built component system based on Radix UI
- **Tailwind CSS**: Utility-first CSS framework for styling

### Backend Dependencies
- **Express.js**: Web application framework for Node.js
- **Zod**: TypeScript-first schema validation library
- **React Hook Form**: Form library with validation integration

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking for JavaScript
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

### UI and Animation
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icon sets including social media icons
- **Embla Carousel**: Touch-friendly carousel component
- **Class Variance Authority**: Utility for creating variant-based component APIs

The platform is designed to be deployed on Replit with automatic environment setup and includes development tools for debugging and monitoring. The architecture supports scalability and maintainability while providing a smooth user experience for educational mentoring and collaboration.