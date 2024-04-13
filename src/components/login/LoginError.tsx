import { Typography } from "@mui/material";
import { ApiError } from "../../api/types";
import { useTranslation } from "react-i18next";

type Props = {
    error: ApiError;
};

type ErrorTranslationKeyMap = {
    [key: number]: string;
}
const mapTranslationKey: ErrorTranslationKeyMap = {
    1: 'login.error.wrong-username-password'
}

export const LoginError = ({ error }: Props): JSX.Element => {
    const { t } = useTranslation();
    const translationKey = mapTranslationKey[error.code];
    return <Typography component="span" sx={{color: 'error.main'}}>{translationKey ? t(translationKey) : t('error')}</Typography>
};