# CrossLink Frontend

## Overview

CrossLink is a web-based application designed to enhance the quality and structure of internship experiences for university and college students in Africa. The platform provides role-based dashboards for students, employers, and schools to manage internship programs, track goals, and facilitate interaction between all parties involved in the internship process.

## Features

- **Multi-role Support**: Separate dashboards for students, employers, and schools
- **Goal Management**: Track and manage internship goals and objectives
- **Modern UI**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **State Management**: Redux Toolkit for robust state management
- **Responsive Design**: Mobile-friendly interface with modern components

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **UI Components**: Radix UI + Custom components
- **Package Manager**: pnpm
- **Charts**: Recharts
- **Icons**: Lucide React, Tabler Icons

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/BayinganaEdwin/crosslink-fn.git
cd crosslink-fn
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Variables

**Important**: This application requires environment variables to function properly. Without them, the app won't be able to connect to the backend API.

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url_here
NEXT_PUBLIC_TOKEN_NAME=crossLink_token
```

**Note**: Make sure to replace `your_backend_api_url_here` with your actual backend API URL.

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Project Structure

```
crosslink-fn/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Dashboard components
│   ├── login/            # Authentication pages
│   ├── students/         # Student management
│   └── reflections/      # Reflection system
├── components/           # Reusable UI components
├── store/               # Redux store and actions
├── hooks/               # Custom React hooks
├── utils/               # Utility functions and constants
└── public/              # Static assets
```

## Role-Based Access

The application supports three user roles:

- **Students**: Access to internship goals, reflections, and progress tracking
- **Employers**: Manage student goals, provide feedback, and track intern performance
- **Schools**: Oversee student progress and manage internship programs
