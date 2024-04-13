import { Avatar, Box, Button, CircularProgress, Paper, TextField, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "../api/hooks/use-login";
import { useNavigate } from "@tanstack/react-router";
import { useUserStore } from "../store/user-store";
import { useEffect } from "react";
import { LoginError } from "../components/login/LoginError";

type FormInput = {
  username: string;
  password: string;
};

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm<FormInput>();
  const { mutate: login, isLoading, isError, error } = useLogin();
  const userStore = useUserStore();
  const { errors } = formState;

  useEffect(() => {
    if (!userStore.isLoggedIn()) {
      return;
    }
    navigate({to: '/'});
  }, [userStore]);

  const onSubmit: SubmitHandler<FormInput> = (data: FormInput): void => {
    login(data);
  };

  return (
    <Box component="section" height={1} display="flex" justifyContent="center" alignItems="center" px={[3, 0]}>
      <Paper sx={{px: 3, py: 7, width: 582 }}>
        <Box textAlign="center">
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', margin: '0 auto', height: 56, width: 56 }}>
            <LockOutlinedIcon sx={{height: 32, width: 32}}/>
          </Avatar>
          <Typography mt={1} fontWeight="bold" fontSize={32}>{t('login.title')}</Typography>
          <Box component="form" mt={6} display="flex" flexDirection="column" gap={3} px={4} onSubmit={handleSubmit(onSubmit)}>
            <TextField label={`${t('login.username')}*`} {...register('username', { required: true })} error={!!errors.username || isError}/>
            <TextField type="password" label={`${t('login.password')}*`} {...register('password', { required: true })} error={!!errors.password || isError}/>
            {!!error && !isLoading && <LoginError error={error} />}
            <Button variant="contained" type="submit" size="large" disabled={isLoading}>
              {!isLoading && t('login.submit')}
              {isLoading && <CircularProgress size={24}/>}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
};