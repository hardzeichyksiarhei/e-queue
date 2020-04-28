import React from 'react';
import { ruRU } from '@material-ui/core/locale';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Container, Grid, Paper } from '@material-ui/core';

import QueueMain from './components/QueueMain/QueueMain';
import QueueFooter from './components/QueueFooter/QueueFooter';

import './App.sass';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2157a1' }
  },
}, ruRU);

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
}))

function App() {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title} align="center">
              Онлайн  очередь на ЦТ*
            </Typography>
          </Toolbar>
        </AppBar>
        <Container className="app-content" maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <QueueMain />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <QueueFooter />
      </div>
    </ThemeProvider>
  );
}

export default App;