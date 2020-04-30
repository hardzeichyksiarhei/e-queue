import React from "react";
import { Typography } from '@material-ui/core';

import QueueLoginForm from '../../../components/admin/QueueLoginForm/QueueLoginForm';

import './Login.sass';

function Login() {

    return (
        <div className="login-page">
            <Typography className="login-title" variant="h5">Войти в панель администратора</Typography>
            <QueueLoginForm />
        </div>
    )
}

export default Login;