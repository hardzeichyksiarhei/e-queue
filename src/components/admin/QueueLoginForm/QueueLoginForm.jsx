import React, { Component } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

import { withRouter } from 'react-router-dom'

class QueueLoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: ''
        }

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.handleSendClick = this.handleSendClick.bind(this);
    }

    handleLoginChange(event) {
        this.setState({ ...this.state, login: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ ...this.state, password: event.target.value });
    }

    async handleSendClick(event) {
        const { history } = this.props;
        localStorage.setItem('token', '123');

        history.push('/dashboard');
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        id="login"
                        variant="outlined"
                        fullWidth
                        value={this.state.login}
                        onChange={this.handleLoginChange}
                        label="Login"
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="last-name"
                        variant="outlined"
                        fullWidth
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        label="Password"
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button size="large" variant="contained" color="primary" onClick={this.handleSendClick}>
                        Войти
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(QueueLoginForm);