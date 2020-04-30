import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import QueueReservationForm from '../components/QueueReservationForm/QueueReservationForm';

function Home() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <QueueReservationForm />
            </Grid>
        </Grid>
    )
}

export default Home;