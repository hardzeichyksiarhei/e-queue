import React from "react";
import { compose } from 'redux'

import { withAuthRedirect } from '../../../hoc/withAuthRedirect'
import { withLayout } from '../../../hoc/withLayout'

import Default from './../../../pages/layout/Default';
import QueueDashboard from '../../../components/admin/QueueDashboard/QueueDashboard'

function AdminDashboard() {

    return (
        <div className="dashboard-page">
            <QueueDashboard />
        </div>
    )
}

export default compose(
    withLayout(null, { paperSize: 'xl' }),
    withAuthRedirect
)(AdminDashboard);