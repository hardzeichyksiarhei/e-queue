import React from 'react';

export const withLayout = Layout => Component => {

    class LayoutComponent extends React.Component {
        render() {
            return <Layout {...this.props}><Component { ...this.props } /></Layout>
        }
    }

    return LayoutComponent;

}