import { AppBar, Button, CircularProgress, Toolbar, Typography } from "@mui/material";
import { useUserStore } from "../store/user-store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { useCurrentUser } from "../api/hooks/use-current-user";
export const Header = () => {
    const userStore = useUserStore();
    const currentUserQuery = useCurrentUser();
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const onLogoutClick = (): void => {
        userStore.logout();
        navigate({to: '/login'});
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{gap: 1}}>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    Senior Care
                </Typography>
                {currentUserQuery.isLoading && <CircularProgress />}
                {currentUserQuery.data && (
                    <Typography>
                        {currentUserQuery.data.name}
                    </Typography>
                )}
                <Button color="inherit" onClick={onLogoutClick}>{t('logout')}</Button>
            </Toolbar>
        </AppBar>
    );
};