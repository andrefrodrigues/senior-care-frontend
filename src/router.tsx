
import { Root } from './pages/Root';
import { Login } from "./pages/Login";
import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { Home } from './pages/Home';
import { CircularProgress } from '@mui/material';
import { Admin } from './pages/Admin';


const rootRoute = createRootRoute({
  component: Root
});

const routeTree = rootRoute.addChildren([
  createRoute({
    path: '/',
    getParentRoute: () => rootRoute,
    component: Home,
    pendingComponent: CircularProgress
  }),
  createRoute({
    path: '/login',
    getParentRoute: () => rootRoute,
    component: Login,
    pendingComponent: CircularProgress
  }),
  createRoute({
    path: '/admin',
    getParentRoute: () => rootRoute,
    component: Admin,
    pendingComponent: CircularProgress
  })
]);

export const router = createRouter({ routeTree });