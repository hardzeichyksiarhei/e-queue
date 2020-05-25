import React, { Component } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { login } from '../../../store/actions/authActions'

class QueueLoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.handleSendClick = this.handleSendClick.bind(this);
    }

    handleLoginChange(event) {
        this.setState({ ...this.state, username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ ...this.state, password: event.target.value });
    }

    async handleSendClick(event) {
        const { username, password } = this.state;
        const { dispatch, history } = this.props;

        try {
            await dispatch(login(username, password));
            history.push('/dashboard');
        } catch(e) { console.error(e); }
    }

    render() {
        return (
            <form onSubmit={this.handleSendClick}>
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
                            type="password"
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
                        <Button type="submit" size="large" variant="contained" color="primary">
                            Войти
                        </Button>
                    </Grid>
                </Grid>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    hasErrors: state.auth.hasErrors,
})

export default withRouter(connect(mapStateToProps)(QueueLoginForm));