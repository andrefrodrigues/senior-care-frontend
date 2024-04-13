import { QueryClient, QueryClientProvider } from 'react-query';
import { router } from './router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from '@tanstack/react-router';


export const App = (): JSX.Element => {
  const queryClient = new QueryClient();

  const defaultTheme = createTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
};