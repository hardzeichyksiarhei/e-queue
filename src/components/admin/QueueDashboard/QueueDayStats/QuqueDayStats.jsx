import React, { Component } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { DateRange, Schedule } from '@material-ui/icons';
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { format } from 'date-fns';

import { userServices } from '../../../../services';
import QueueDayStatsChart from './QuqueDayStatsChart';
import QueueDayStatsTable from './QuqueDayStatsTable';

class QueueDayStats extends Component {
    constructor(props) {
        super(props);

        this.defaultMinDate = new Date(2020, 4, 2, 9, 0);
        this.defaultMaxDate = new Date(2020, 5, 1);

        this.state = {
            selectedDate: this.defaultMinDate,

            dayStats: null,
        }
    }

    componentDidMount() {
        this._fetchNumberOfUsersByDay();
    }


    _filterDate = d => {
        const day = d.getDay();
        const month = d.getMonth();
        const date = d.getDate();
        return (day !== 0 && day !== 6) ||
            (month === 4 && (date === 2 || date === 30))
    }

    handleDateChange = (date) => {
        this._fetchNumberOfUsersByDay(date);
        this.setState(prev => ({ ...prev, selectedDate: date }));
    }

    async _fetchNumberOfUsersByDay(date = this.defaultMinDate) {
        const formatDate = format(date, 'yyyy-MM-dd');
        try {
            const dayStats = await userServices.fetchNunmberOfUsersByDay(formatDate);
            this.setState(prev => ({ ...prev, dayStats }));
        } catch (e) {
            this.setState({ ...this.state, isAccess: false })
            console.error(e);
        }
    }

    render() {
        return (
            <>
                <Grid item md={12} lg={12}>
                    <Grid container justify="center"
                        alignItems="center">
                        <Grid item md={12} lg={4}>
                            <DatePicker
                                customInput={
                                    <Grid container spacing={2}>
                                        <Grid item lg={9} md={9} xs={12}>
                                            <div className="date-wrapper">
                                                <TextField
                                                    id="date"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={this.state.selectedDate && format(this.state.selectedDate, 'd MMMM yyyy', { locale: ru })}
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
                                dateFormat="yyyy.MM.dd"
                                filterDate={this._filterDate}
                                minDate={this.defaultMinDate}
                                maxDate={this.defaultMaxDate}
                                shouldCloseOnSelect={false}
                                onChange={this.handleDateChange}
                                selected={this.state.selectedDate}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={12} lg={6}>
                    <QueueDayStatsChart selectedDate={this.state.selectedDate} data={this.state.dayStats} />
                </Grid>
                <Grid item md={12} lg={6}>
                    <QueueDayStatsTable data={this.state.dayStats} />
                </Grid>
            </>
        )
    }
}

export default QueueDayStats;