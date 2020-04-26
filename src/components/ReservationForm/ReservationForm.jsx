import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Grid, FormControl, InputLabel, Input, Button, TextField, FormControlLabel, Checkbox, Typography, Collapse, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { DateRange, Schedule, Close } from '@material-ui/icons';

import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';

import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";
import './ReservationForm.sass';

const styles = theme => ({
    checkedWrapper: {
        paddingTop: '0 !important',
        paddingBottom: '0 !important'
    }
})

class ReservationForm extends Component {
    constructor(props) {
        super(props);

        this.minDate = new Date(2020, 4, 2, 9, 0);
        this.maxDate = new Date(2020, 5, 2);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            isChecked: false,

            date: '',

            alert: {
                open: false,
                severity: 'info',
                message: ''
            }
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);

        this.handleDateChange = this.handleDateChange.bind(this);

        this.handleCheckedChange = this.handleCheckedChange.bind(this);

        this.handleSendClick = this.handleSendClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            date: this._initDate()
        })
    }

    _initDate() {
        const currentDate = new Date();
        if (currentDate < this.minDate) return this.minDate;
        return currentDate;
    }

    _filterDate(d) {
        const day = d.getDay();
        const month = d.getMonth();
        const date = d.getDate();
        return (day !== 0 && day !== 6) || (month === 4 && (date === 2 || date === 30));
    }

    _defaultAlert() {
        return {
            open: false,
            severity: 'info',
            message: ''
        }
    }

    handleLastNameChange(event) {
        this.setState({ ...this.state, lastName: event.target.value });
    }

    handleFirstNameChange(event) {
        this.setState({ ...this.state, firstName: event.target.value });
    }

    handleEmailChange(event) {
        this.setState({ ...this.state, email: event.target.value });
    }

    handleCheckedChange(event) {
        this.setState({ ...this.state, isChecked: event.target.checked });
    }

    handleDateChange(date) {
        this.setState({ ...this.state, date });
    }

    async handleSendClick(event) {
        event.preventDefault();

        const { firstName, lastName, email, date, alert } = this.state;

        let severity = 'success';
        let message = 'Успех!';
        let refreshForm = true;
        try {
            const { data, status } = await axios.post('https://equeue-bspu.herokuapp.com/api/graduates', {
                firstName,
                lastName,
                email,
                date
            });

            if (status === 200) {
                message = data.message;
            } else {
                severity = 'error';
                message = 'Ошибка';
                refreshForm = false;
            }

            this.setState({
                ...this.state,
                firstName: refreshForm ? '' : firstName,
                lastName: refreshForm ? '' : lastName,
                email: refreshForm ? '' : email,
                date: refreshForm ? '' : date,
                alert: {
                    ...alert,
                    open: true,
                    severity,
                    message
                }
            })
        } catch (error) { console.error(error) }
    }

    render() {
        const { classes } = this.props;

        return (
            <form autoComplete="off" onSubmit={this.handleSendClick}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="first-name" required>Имя</InputLabel>
                            <Input id="first-name" fullWidth value={this.state.firstName} onChange={this.handleFirstNameChange} placeholder="Сергей" required />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="last-name" required>Фамилия</InputLabel>
                            <Input id="last-name" fullWidth value={this.state.lastName} onChange={this.handleLastNameChange} placeholder="Гардейчик" required />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="e-mail" required>E-mail</InputLabel>
                            <Input id="e-mail" fullWidth value={this.state.email} onChange={this.handleEmailChange} placeholder="example@gmail.com" required />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <DatePicker
                            className="date-range"
                            customInput={
                                <Grid container spacing={2}>
                                    <Grid item xs={9}>
                                        <div className="date-wrapper">
                                            <TextField
                                                id="date"
                                                variant="outlined"
                                                fullWidth
                                                value={this.state.date && format(this.state.date, 'd MMMM yyyy HH:mm', { locale: ru })}
                                                placeholder="Выберите день недели и имя *"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                required
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button className="date-range-btn" fullWidth size="large" variant="contained" color="secondary">
                                            <DateRange />&nbsp;&nbsp;|&nbsp;&nbsp;<Schedule />
                                        </Button>
                                    </Grid>
                                    
                                </Grid>
                            }
                            locale={ru}
                            selected={this.state.date}
                            onChange={this.handleDateChange}
                            minDate={this.minDate}
                            maxDate={this.maxDate}
                            minTime={new Date().setHours(9, 0)}
                            maxTime={new Date().setHours(18, 45)}
                            showTimeSelect
                            timeIntervals={15}
                            timeFormat="p"
                            dateFormat="dd.MM.yyyy HH:mm"
                            timeCaption="Время"
                            timeClassName={() => 'date-range__time'}
                            filterDate={this._filterDate}
                            shouldCloseOnSelect={false}
                        />
                    </Grid>

                    <Grid item xs={12} className={classes.checkedWrapper}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.isChecked}
                                    onChange={this.handleCheckedChange}
                                    name="isChecked"
                                    color="primary"
                                />
                            }
                            label="Я согласен на обработку персональных данных"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        {/* <Typography>* Мы не производим сбор Ваших данных</Typography> */}
                        <Button size="large" variant="contained" color="primary" type="submit" disabled={!this.state.isChecked}>
                            Забронировать
                        </Button>
                    </Grid>
                </Grid>
                <Collapse in={this.state.alert.open}>
                    <Alert
                        className="reservation-alert"
                        variant="filled"
                        severity={this.state.alert.severity}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => this.setState({ ...this.state, alert: { ...this._defaultAlert() } })}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {this.state.alert.message}
                    </Alert>
                </Collapse>
            </form>
        );
    }
}

export default withStyles(styles)(ReservationForm);