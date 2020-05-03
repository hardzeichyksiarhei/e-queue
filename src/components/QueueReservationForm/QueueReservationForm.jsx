import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import {
    Grid,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Collapse,
    IconButton,
    CircularProgress,
    Modal,
    Backdrop,
    Fade,
    Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { DateRange, Schedule, Close } from '@material-ui/icons';

import DatePicker from "react-datepicker";
import { format, formatISO9075, eachDayOfInterval } from 'date-fns';

import ru from 'date-fns/locale/ru';

import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";
import './QueueReservationForm.sass';

const styles = theme => ({
    checkedWrapper: {
        paddingTop: '0 !important',
        paddingBottom: '0 !important'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    close: {
        position: 'absolute',
        top: '10px',
        right: '10px'
    },
    paper: {
        position: 'relative',
        backgroundColor: '#4caf50',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        color: 'white',
        borderRadius: '5px',
        '&:focus': {
            outline: 'none'
        }
    },
})

class QueueReservationForm extends Component {
    constructor(props) {
        super(props);

        this.defaultMinDate = new Date(2020, 4, 2, 9, 0);
        this.defaultMaxDate = new Date(2020, 5, 1);

        this.defaultMinTime = new Date().setHours(9, 0, 0, 0);
        this.defaultMaxTime = new Date().setHours(18, 45, 0, 0);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            date: '',

            isChecked: false,

            minTime: null,
            maxTime: null,

            busy: false,
            alert: {
                open: false,
                severity: 'success',
                message: ''
            },
            isNotAccess: process.env.NODE_ENV === 'production' && new Date() < this.defaultMinDate,

            closedDates: []
        };
    }

    async componentDidMount() {
        const closedDates = await this._fetchClosedDates();

        this.setState({
            ...this.state,

            minTime: this.defaultMinTime,
            maxTime: this.defaultMaxTime,

            closedDates
        }, () => { this._initDate(); });
    }


    /* Internal Methods */

    _dateFormat = () => {
        if (!this.state.date) return '';
        const date = this.state.date;
        const nextTime = format(new Date(date).setMinutes(50), 'HH:mm');
        return format(date, `d MMMM yyyy HH:mm - ${nextTime}`, { locale: ru })
    }

    async _fetchClosedDates() {
        const { data, status } = await axios.get('https://equeue-bspu.herokuapp.com/api/closed-dates');
        return status === 200 ? data.map(d => new Date(d).setHours(0)) : [];
    }

    _refreshTime = () => {
        const { date, maxTime } = this.state;
        const isSaturday = date.getDay() === 6;
        const isDefaultMaxTime = this.defaultMaxTime === maxTime
        if (isSaturday && isDefaultMaxTime) {
            this.setState({ ...this.state, maxTime: new Date().setHours(17, 45, 0, 0) })
        } else if (!isSaturday && !isDefaultMaxTime) {
            this.setState({ ...this.state, maxTime: new Date().setHours(18, 45, 0, 0) })
        }
    }

    _initDate() {
        const allDates = eachDayOfInterval({
            start: this.defaultMinDate,
            end: this.defaultMaxDate
        });

        const currentDate = allDates.find(d => this._filterDate(d));
        currentDate.setHours(9);

        this.setState({
            ...this.state,
            date: currentDate
        }, () => { this._refreshTime(); })
    }

    _filterDate = d => {
        const day = d.getDay();
        const month = d.getMonth();
        const date = d.getDate();
        const isCloseDay = this.state.closedDates.includes(d.getTime());
        return (day !== 0 && day !== 6 && !isCloseDay)
            || (!isCloseDay && month === 4 && (date === 2 || date === 30))
    }

    /* Methods */

    handleInputChange = (event) => {
        event.persist();
        this.setState(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    handleCheckedChange = (event) => {
        this.setState({ ...this.state, isChecked: event.target.checked });
    }

    handleDateChange = (date) => {
        this.setState({ ...this.state, date }, () => { this._refreshTime(); });
    }

    handleSendClick = async (event) => {
        event.preventDefault();

        if (this.state.isNotAccess) return;

        const { firstName, lastName, email, date, isChecked } = this.state;

        this.setState({ ...this.state, busy: true });

        try {
            const { data: { message }, status } = await axios.post('https://equeue-bspu.herokuapp.com/api/graduates', {
                firstName,
                lastName,
                email,
                date: formatISO9075(date),
                isChecked
            });

            if (status === 200) {
                this.setState({
                    ...this.state,
                    isChecked: false,
                    busy: false,
                    alert: {
                        open: true,
                        severity: 'success',
                        message
                    }
                });
            }
        } catch (error) {
            const { data: { message }, status } = error.response;
            if (message && status >= 400) {
                this.setState({
                    ...this.state,
                    busy: false,
                    alert: {
                        open: true,
                        severity: 'error',
                        message
                    }
                });
            }
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <form autoComplete="off" onSubmit={this.handleSendClick}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="first-name"
                            variant="outlined"
                            fullWidth
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleInputChange}
                            placeholder="Иван"
                            label="Имя"
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="last-name"
                            variant="outlined"
                            fullWidth
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleInputChange}
                            placeholder="Иванов"
                            label="Фамилия"
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="e-mail"
                            variant="outlined"
                            fullWidth
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            placeholder="example@gmail.com"
                            label="E-mail"
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <DatePicker
                            className="date-range"
                            customInput={
                                <Grid container spacing={2}>
                                    <Grid item lg={9} md={9} xs={12}>
                                        <div className="date-wrapper">
                                            <TextField
                                                id="date"
                                                variant="outlined"
                                                fullWidth
                                                value={this._dateFormat()}
                                                placeholder="Выберите день недели и имя *"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                required
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item lg={3} md={3} xs={12}>
                                        <Button className="date-range-btn" fullWidth size="large" variant="contained" color="secondary">
                                            <DateRange />&nbsp;&nbsp;|&nbsp;&nbsp;<Schedule />
                                        </Button>
                                    </Grid>

                                </Grid>
                            }
                            locale={ru}
                            selected={this.state.date}
                            onChange={this.handleDateChange}
                            minDate={this.defaultMinDate}
                            maxDate={this.defaultMaxDate}
                            minTime={this.state.minTime}
                            maxTime={this.state.maxTime}
                            showTimeSelect
                            timeIntervals={60}
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
                            className="checkbox-control"
                            control={
                                <Checkbox
                                    checked={this.state.isChecked}
                                    onChange={this.handleCheckedChange}
                                    name="isChecked"
                                    color="primary"
                                />
                            }
                            label="Даю согласие на обработку персональных данных"
                        />
                    </Grid>

                    <Grid item xs={12} className="submit-wrapper">
                        <Button size="large" variant="contained" color="primary" type="submit" disabled={this.state.isNotAccess || (!this.state.isChecked || this.state.busy)}>
                            Забронировать
                        </Button>
                        {(this.state.busy) ? <CircularProgress className="submit-loading" /> : ''}
                    </Grid>
                </Grid>
                <Collapse in={this.state.alert.open && this.state.alert.severity !== 'success'}>
                    <Alert
                        className="reservation-alert"
                        variant="filled"
                        severity={this.state.alert.severity}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => this.setState({
                                    ...this.state,
                                    alert: {
                                        ...this.state.alert,
                                        open: false,
                                        message: ''
                                    }
                                })}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {this.state.alert.message}
                    </Alert>
                </Collapse>

                {this.state.isNotAccess ? <Alert
                    className="reservation-alert"
                    variant="filled"
                    severity="info"
                >
                    Предварительная запись начнется с {format(this.defaultMinDate, 'd MMMM yyyy HH:mm', { locale: ru })}
                </Alert> : ''}

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.alert.open && this.state.alert.severity === 'success'}
                    onClose={() => { this.setState({ ...this.state, alert: { ...this.state.alert, open: false } }) }}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        transitionDuration: 400,
                    }}
                >
                    <Fade in={this.state.alert.open && this.state.alert.severity === 'success'} timeout={400}>
                        <div className={classes.paper}>
                            <IconButton
                                className={classes.close}
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => this.setState({ ...this.state, alert: { ...this.state.alert, open: false } })}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                            <Typography variant="h4" id="transition-modal-title">{this.state.alert.message}</Typography>
                            <Typography id="transition-modal-description">Приходите на регистрацию в назначеное время!</Typography>
                        </div>
                    </Fade>
                </Modal>
            </form>
        );
    }
}

export default withStyles(styles)(QueueReservationForm);