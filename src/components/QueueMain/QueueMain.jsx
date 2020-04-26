import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import ReservationForm from '../QueueReservationForm/QueueReservationForm';
import ImageMask from './../../img/image_mask.png'

import './QueueMain.sass'

function QueueMain() {
  return (
    <div className="Main">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <ReservationForm/>
        </Grid>
        <Grid item xs={6}>
          <img className="image-mask" src={ImageMask} alt=""/>
          <Typography>
            В связи с неблагоприятной эпидемиологической обстановкой в стране и соответствующими рекомендациями Министерства образования Республики Беларусь <b>для минимализации очереди</b> мы предлагаем Вам <b>забронировать дату и время</b> посещения БГПУ для регистрации на *Централизованное тестирование.
          </Typography>
        </Grid>
      </Grid>
    </div >
  );
}

export default QueueMain;