# Bai6 - React + TypeScript + Tailwind CSS

A modern React application built with TypeScript and Tailwind CSS, following clean code principles and a structured design system.

## 🚀 Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Heroicons** - Beautiful SVG icons

## 📁 Project Structure

```
src/
├── api/          # API calls and services
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── layouts/      # Layout components
├── pages/        # Page components
├── routes/       # Route configuration
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

## 🎨 Design System

This project follows a strict design system:

### Grid System
- **Column Width**: 72px
- **Gutter**: 24px
- **Outer Margin (Desktop)**: 288px
- All layouts must align to the grid

### Spacing Scale (8px base unit)
- 8px
- 16px
- 24px
- 32px
- 48px
- 72px

### Border Radius
- **Small (12px)**: Buttons, Inputs, Tags
- **Medium (16px)**: Forms, Tables, Panels
- **Large (24px)**: Cards, Modals, Main Containers

### Typography
- **Headline Large**: 32px / 130% line-height
- **Headline Medium**: 20px / 130% line-height
- **Body Large**: 16px / 150% line-height
- **Body Small**: 12px / 150% line-height

## 🛠️ Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5174/`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📝 Code Conventions

- **BEM Convention** for CSS class naming
- **Protected Routes** for authentication
- **Nested Routes** for complex layouts
- **Layout Routes** for shared layouts
- Clean, maintainable folder structure

## 🎯 Key Features

- ✅ TypeScript for type safety
- ✅ Tailwind CSS with custom design system
- ✅ Heroicons integration
- ✅ React Router for navigation
- ✅ Clean folder structure
- ✅ Grid-based layout system
- ✅ Consistent spacing and typography

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [React Router](https://reactrouter.com/)
