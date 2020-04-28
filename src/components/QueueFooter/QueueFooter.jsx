import React from 'react';
import { Typography } from '@material-ui/core';

import './QueueFooter.sass';

import BSPU from './../../img/bspu.png';

function QueueFooter() {
  return (
    <div className="app-footer">
        <div className="app-footer__copyright">
            <a href="https://bspu.by/" target="_blank"><img src={BSPU} alt="BSPU"/></a>
            <Typography>(с) { new Date().getFullYear() }, Учреждение образования «Белорусский государственный педагогический университет имени Максима Танка»</Typography>
        </div>
    </div>
  );
}

export default QueueFooter;