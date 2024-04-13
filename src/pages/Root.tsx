import { Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import { useUserStore } from "../store/user-store";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { Header } from "../components/Header";

export const Root = (): JSX.Element => {
  const navigate = useNavigate();
  const userStore = useUserStore();

  useEffect(() => {
    if (!userStore.isLoggedIn()) {
      navigate({to: '/login'});
      return;
    }
    if (userStore.isRoot()) {
      navigate({to: '/admin'})
      return;
    }
  }, [userStore, navigate]);

  return (
    <Box height={1} component="main" sx={{backgroundColor: 'palette.background.default'}}>
      {userStore.isLoggedIn() && (
        <Suspense>
          <Header />
        </Suspense>
      )}
      <Box px={3} mt={1}>
        <Outlet />
      </Box>
    </Box>
  );
}