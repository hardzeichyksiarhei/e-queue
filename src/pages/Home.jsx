import React from 'react';
import { Grid } from '@material-ui/core';

import { withLayout } from '../hoc/withLayout'

import Default from './../pages/layout/Default';
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

export default withLayout((props) => <Default {...props} paperSize={'md'} />)(Home);