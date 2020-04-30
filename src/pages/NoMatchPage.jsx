import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';

import Image404 from './../img/404.jpeg';


function NoMatchPage(props) {
    const goHome = () => {
        props.history.push('/');
    }

    return (
        <div className="content-404">
            <img className="content-404__img" width="300" src={Image404} alt="" />
            <div className="content-404__content" >
                <div className="content-404__text">
                    <Typography variant="h1"><b>404</b></Typography>
                    <Typography variant="h4">Page Not Found</Typography>
                    <div className="content-404__btn-group">
                        <Button className="content-404__btn content-404__btn--home" variant="contained" size="large" onClick={goHome}>Главная</Button>
                        <Button className="content-404__btn content-404__btn--university" variant="contained" color="primary" size="large" href="https://bspu.by/" target="_blank">Сайт университета</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoMatchPage;