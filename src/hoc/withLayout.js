import React from 'react';

import Default from './../pages/layout/Default';
export const withLayout = (Layout, options = { paperSize: 'md' }) => Component => {

    class LayoutComponent extends React.Component {
        render() {
            if (!Layout) {
                return <Default {...this.props} { ...options }><Component { ...this.props } /></Default>
            }
            return <Layout {...this.props} { ...options }><Component { ...this.props } /></Layout>
        }
    }

    return LayoutComponent;

}