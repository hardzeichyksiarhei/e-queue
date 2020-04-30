import React from 'react';
import { connect } from 'react-redux'

import { AppBar, Toolbar, Typography, Container, Paper, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExitToApp } from '@material-ui/icons';

import { logout } from '../../store/actions/authActions'

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



function Default({ children, paperSize, dispatch, history }) {
    const classes = useStyles();

    const exit = async () => {
        await dispatch(logout());
        history.push('/login')
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

            { localStorage.getItem('token') ? <Fab className="logout" color="secondary" onClick={exit}>
                <ExitToApp />
            </Fab> : '' }
        </div>
    );
}

export default connect()(Default);