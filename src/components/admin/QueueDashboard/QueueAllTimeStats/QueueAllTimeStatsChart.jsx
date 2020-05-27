import React, { Component } from "react";
import Chart from "react-apexcharts";

import { Grid, CircularProgress } from '@material-ui/core';

import { userServices } from '../../../../services';

class QueueAllTimeStatsChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,

            allDays: {
                options: {
                    chart: { id: 'Распределение абитуриентов по датам' },
                    xaxis: { categories: [] },
                    legend: { show: false },
                    plotOptions: { bar: { distributed: true }, },
                    title: {
                        text: 'Распределение абитуриентов по датам',
                        align: 'center',
                        margin: 10,
                        offsetX: 0,
                        offsetY: 0,
                        floating: false,
                        style: {
                            fontSize: '24px',
                            fontWeight: 'bold',
                            fontFamily: undefined,
                            color: '#263238'
                        },
                    },
                    theme: { mode: 'light', palette: 'palette2' }
                },
                series: [{ name: undefined, data: [] }]
            },

            allHours: {
                options: {
                    chart: { id: 'Распределение абитуриентов по времени' },
                    xaxis: { categories: [] },
                    legend: { show: false },
                    plotOptions: { bar: { distributed: true }, },
                    title: {
                        text: 'Распределение абитуриентов по времени',
                        align: 'center',
                        margin: 10,
                        offsetX: 0,
                        offsetY: 0,
                        floating: false,
                        style: {
                            fontSize: '24px',
                            fontWeight: 'bold',
                            fontFamily: undefined,
                            color: '#263238'
                        },
                    },
                    theme: { mode: 'light', palette: 'palette8' }
                },
                series: [{ name: undefined, data: [] }]
            }
        }
    }

    componentDidMount() {
        this._fetchNunmberOfUsers();
    }

    async _fetchNunmberOfUsers() {
        try {
            const { labels, values, hoursLabels, hoursValues } = await userServices.fetchNunmberOfUsers();
            
            this.setState({
                ...this.state,
                allDays: {
                    options: {
                        ...this.state.allDays.options,
                        xaxis: { categories: labels },
                        title: {
                            ...this.state.allDays.options.title,
                            text: `Распределение абитуриентов по датам (${values.reduce((a, b) => a + b)})`
                        }
                    },
                    series: [{ name: 'Количество абитуриентов', data: values }],
                },
                allHours: {
                    options: {
                        ...this.state.allHours.options,
                        xaxis: { categories: hoursLabels },
                        title: {
                            ...this.state.allHours.options.title,
                            text: `Распределение абитуриентов по времени (${hoursValues.reduce((a, b) => a + b)})`
                        }
                    },
                    series: [{ name: 'Количество абитуриентов', data: hoursValues }],
                },
                loading: false
            });
        } catch (e) { console.error(e); }
    }

    render() {
        if (this.state.loading) return <div className="dashboard-loading"><CircularProgress /></div>

        return (
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Chart
                        options={this.state.allDays.options}
                        series={this.state.allDays.series}
                        type="bar"
                        width="100%"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Chart
                        options={this.state.allHours.options}
                        series={this.state.allHours.series}
                        type="bar"
                        width="100%"
                    />
                </Grid>
            </Grid>
        )
    }
}

export default QueueAllTimeStatsChart;