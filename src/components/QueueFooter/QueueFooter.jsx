import React from 'react';
import { Typography } from '@material-ui/core';

import './QueueFooter.sass';

import BSPU from './../../img/bspu.png';

function QueueFooter() {
  return (
    <div className="app-footer">
        <Typography className="app-footer__copyright"><img src={BSPU} alt=""/> (с) { new Date().getFullYear() }, Учреждение образования «Белорусский государственный педагогический университет имени Максима Танка»</Typography>
    </div>
  );
}

export default QueueFooter;