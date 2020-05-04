import React from "react";
import { Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { withRouter } from 'react-router-dom';

import QueueLoginForm from '../../../components/admin/QueueLoginForm/QueueLoginForm';

import './Login.sass';

function Login({ location }) {

    return (
        <div className="login-page">
            <Typography className="login-title" variant="h5">Войти в панель администратора</Typography>
            <QueueLoginForm />
            {location.state?.sessionExpired && <><br/><Alert severity="warning">
                <AlertTitle>Внимание</AlertTitle>
                Время Вашего сеанса истекло.
            </Alert></>}
        </div>
    )
}

export default withRouter(Login);