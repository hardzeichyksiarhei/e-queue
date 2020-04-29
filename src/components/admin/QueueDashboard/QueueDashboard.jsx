import React, { Component } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

import axios from 'axios';

class QueueDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAccess: true
        }

    }

    componentDidMount() {
        this._fetchDashboardData()
    }

    async _fetchDashboardData() {
        const token = localStorage.getItem('token');
        try {
            const { data, status } = await axios.get('https://equeue-bspu.herokuapp.com/admin/stats', { headers: { Authorization: `Bearer ${token}` } });

            console.log(data);
        } catch(e) {
            this.setState({
                ...this.state,
                isAccess: false
            })
            console.log(e);
        }
    }

    render() {
        const { isAccess } = this.state;

        if (!isAccess) return (
            <div>
                Not Access
            </div>
        )

        return (
            <div>
                Access
            </div>
        )
    }
}

export default QueueDashboard;