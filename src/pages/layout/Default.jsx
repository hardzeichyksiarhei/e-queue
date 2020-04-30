import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Container, Paper, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ExitToApp, Home, Dashboard } from '@material-ui/icons';

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



function Default(props) {
    const classes = useStyles();
    const { children, paperSize, dispatch, history, location } = props;

    const exit = async () => {
        await dispatch(logout());
        history.push('/login')
    }

    return (
        <div className="default-layout">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} align="center">
                        Электронная очередь для предварительной записи посещения пункта регистрации на ЦТ (БГПУ)
                </Typography>
                </Toolbar>
            </AppBar>
            <Container className="app-content" maxWidth={paperSize || 'lg'}>
                <Paper className={classes.paper}>
                    {children}
                </Paper>
            </Container>
            <QueueFooter />

            <div className="fab-buttons">
                {location.pathname !== '/' ? <Link to='/'><Fab color="primary">
                    <Home />
                </Fab></Link> : ''}
                {location.pathname !== '/dashboard' && localStorage.getItem('token') ? <Link to='/dashboard'><Fab color="primary">
                    <Dashboard />
                </Fab></Link> : ''}
                {localStorage.getItem('token') ? <Fab color="secondary" onClick={exit}>
                    <ExitToApp />
                </Fab> : ''}
            </div>

        </div>
    );
}

export default connect()(Default);