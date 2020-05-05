import React, { Component } from "react";
import Chart from "react-apexcharts";

import ru from 'date-fns/locale/ru';
import { format } from 'date-fns';

class QueueDayStatsChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: { id: 'Количество абитуриентов по времени' },
                title: {
                    text: 'Количество абитуриентов по времени',
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
                xaxis: { categories: [] },
                tooltip: { y: { formatter: (value) => Number(value) } },
                legend: { show: false },
                plotOptions: { bar: { distributed: true } },
                theme: { mode: 'light', palette: 'palette1' }
            },
            series: [{ name: undefined, data: [] }]
        }
    }

    static getDerivedStateFromProps({ data, selectedDate }, prevState) {        
        if (!data || !selectedDate) return prevState;

        const { labels, values } = data;
        return {
            ...prevState,
            options: {
                ...prevState.options,
                title: {
                    ...prevState.options.title,
                    text: format(selectedDate, 'd MMMM yyyy', { locale: ru })
                },
                xaxis: { categories: labels },
            },
            series: [{ name: 'Количество абитуриентов', data: values }]
        };
    }

    render() {
        return (
            <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="100%"
            />
        )
    }
}

export default QueueDayStatsChart;