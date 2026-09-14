# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


src/
│
├── assets/
│
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── Loading.jsx
│   │
│   ├── layout/
│   │   ├── AdminLayout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── meals/
│   │   ├── MealCard.jsx
│   │   ├── MealForm.jsx
│   │   └── MealTable.jsx
│   │
│   ├── categories/
│   │   ├── CategoryForm.jsx
│   │   └── CategoryTable.jsx
│   │
│   └── orders/
│       ├── OrderTable.jsx
│       └── OrderStatus.jsx
│
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   │
│   ├── Dashboard.jsx
│   ├── Meals.jsx
│   ├── Categories.jsx
│   └── Orders.jsx
│
├── atoms/
│   ├── authAtoms.js
│   ├── mealAtoms.js
│   ├── categoryAtoms.js
│   └── orderAtoms.js
│
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── mealService.js
│   ├── categoryService.js
│   └── orderService.js
│
├── routes/
│   └── AppRoutes.jsx
│
├── App.jsx
├── main.jsx
└── index.css