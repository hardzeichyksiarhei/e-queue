import React from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExitToApp } from '@material-ui/icons';

import QueueFooter from '../../components/QueueFooter/QueueFooter';

import './Default.sass';

const useStyles = makeStyles(theme => ({
    title: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(4),
      color: theme.palette.text.secondary,
    }
  }))



function Default({ children, title, paperSize, history }) {
    const classes = useStyles();

    function logout() {
        localStorage.removeItem('token');
        history.push('/login');
    }

    return (
        <div className="default-layout">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} align="center">
                        Регистрация на ЦТ* — онлайн очередь
                </Typography>
                </Toolbar>
            </AppBar>
            <Container className="app-content" maxWidth={paperSize || 'lg'}>
                <Paper className={classes.paper}>
                    {children}
                </Paper>
            </Container>
            <QueueFooter />

            { localStorage.getItem('token') ? <Fab className="logout" color="secondary" onClick={logout}>
                <ExitToApp />
            </Fab> : '' }
        </div>
    );
}

export default Default;