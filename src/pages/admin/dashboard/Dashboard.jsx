import React from "react";
import { Grid, Typography } from '@material-ui/core';

import QueueDashboard from '../../../components/admin/QueueDashboard/QueueDashboard'

function AdminDashboard() {

    return (
        <div className="dashboard-page">
            <QueueDashboard />
        </div>
    )
}

export default AdminDashboard;