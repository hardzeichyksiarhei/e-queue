import React, { Component } from "react";
import Chart from "react-apexcharts";

import { Grid } from '@material-ui/core';

import { userServices } from '../../../../services';

class QueueAllTimeStatsChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: { id: 'Распределение количества абитуриентов по датам' },
                xaxis: { categories: [] },
                legend: { show: false },
                plotOptions: { bar: { distributed: true }, },
                title: {
                    text: 'Распределение количества абитуриентов по датам',
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
        }
    }

    componentDidMount() {
        this._fetchNunmberOfUsers();
    }

    async _fetchNunmberOfUsers() {
        try {
            const { labels, values } = await userServices.fetchNunmberOfUsers();
            this.setState({
                ...this.state,
                options: {
                    ...this.state.options,
                    xaxis: { categories: labels }
                },
                series: [{ name: 'Количество абитуриентов', data: values }]
            });
        } catch (e) {
            this.setState({ ...this.state, isAccess: false })
            console.error(e);
        }
    }

    render() {
        return (
            <Grid item md={12} lg={8}>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="bar"
                    width="100%"
                />
            </Grid>
        )
    }
}

export default QueueAllTimeStatsChart;