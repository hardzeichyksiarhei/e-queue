import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login' />

            return <Component { ...this.props } />
        }
    }

    const mapStateToProps = state => ({
        isAuth: state.auth.token
    })

    return connect(mapStateToProps)(RedirectComponent);

}