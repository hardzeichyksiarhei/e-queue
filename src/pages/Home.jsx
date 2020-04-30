import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import QueueReservationForm from '../components/QueueReservationForm/QueueReservationForm';

function Home() {
    return (
        <Grid container spacing={3}>
            <Grid item lg={6} md={6} xs={12}>
                <QueueReservationForm />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
                <Typography>
                    В связи с неблагоприятной эпидемиологической обстановкой в стране и соответствующими рекомендациями Министерства образования Республики Беларусь <b>для минимализации очереди</b> мы предлагаем Вам <b>забронировать дату и время</b> посещения БГПУ для регистрации на *Централизованное тестирование.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Home;