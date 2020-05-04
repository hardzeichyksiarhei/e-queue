import React from "react";
import { compose } from 'redux'

import { withAuthRedirect } from '../../../hoc/withAuthRedirect'

import QueueDashboard from '../../../components/admin/QueueDashboard/QueueDashboard'

function AdminDashboard() {

    return (
        <div className="dashboard-page">
            <QueueDashboard />
        </div>
    )
}

export default compose(
    withAuthRedirect
)(AdminDashboard);