import React, { Component } from 'react';
import { userServices } from '../../../services';
import Chart from "react-apexcharts";
import axios from 'axios';
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import { Grid, TextField } from '@material-ui/core';
import ru from 'date-fns/locale/ru';

class QueueDashboard extends Component {
  constructor(props) {
    super(props);
    this.defaultMinDate = new Date(2020, 4, 2, 9, 0);
    this.defaultMaxDate = new Date(2020, 5, 1);
    this.state = {
      isAccess: true,
      selectedDate: this.defaultMinDate,
      dayStats: {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: []
          },
          legend: {
            show: false
          },
          plotOptions: {
            bar: {
              distributed: true
            }
          },
          theme: {
            mode: 'light',
            palette: 'palette1'
          }
        },
        series: [{
          name: "numberOfReg",
          data: []
        }]
      },
      allTimeStats: {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: []
          },
          legend: {
            show: false
          },
          plotOptions: {
            bar: {
              distributed: true
            }
          },
          theme: {
            mode: 'light',
            palette: 'palette2'
          }
        },
        series: [{
          name: "numberOfReg",
          data: []
        }]
      }
    }

  }


  componentDidMount() {
    this._fetchDashboardData();
    this._fetchNumberOfUsersByDay('2020-05-04');
    this._fetchNumberOfUsersByDay();
  }

  async _fetchNumberOfUsersByDay(date) {
    if (date) {
      const { labels, values } = await userServices.fetchNunmberOfUsersByDay(date);
      this.setState({
        ...this.state,
        dayStats: {
          ...this.state.dayStats,
          options: {
            ...this.state.dayStats.options,
            xaxis: {
              ...this.state.dayStats.xaxis,
              categories: labels
            }
          },
          series: [{
            name: "numberOfReg",
            data: values
          }]
        }
      });
    } else {
      const { labels, values } = await userServices.fetchNunmberOfUsers();
      this.setState({
        ...this.state,
        allTimeStats: {
          ...this.state.allTimeStats,
          options: {
            ...this.state.allTimeStats.options,
            xaxis: {
              ...this.state.allTimeStats.options.xaxis,
              categories: labels
            }
          },
          series: [{
            name: "numberOfReg",
            data: values
          }]
        }
      });
    }

  }

  async _fetchDashboardData() {
    try {
      const { data } = await axios.get('https://equeue-bspu.herokuapp.com/admin/stats');
      console.log(data);
    } catch (e) {
      this.setState({
        ...this.state,
        isAccess: false
      })
      console.log(e);
    }
  }

  _filterDate = d => {
    const day = d.getDay();
    const month = d.getMonth();
    const date = d.getDate();
    return (day !== 0 && day !== 6) ||
      (month === 4 && (date === 2 || date === 30))
  }

  handleDateChange = (date) => {
    const formatedDate = format(date, 'yyyy-MM-dd');
    this._fetchNumberOfUsersByDay(formatedDate);
    this.setState({ ...this.state, selectedDate: date }, () => {
      console.log(this.state);
    });

  }

  render() {
    const { isAccess } = this.state;

    if (!isAccess) return (
      <div>
        Not Access
      </div>
    )

    return (
      <Grid container spacing={3}>
        <Grid item md={12} lg={6}>
          <div>
            <Chart
              options={this.state.dayStats.options}
              series={this.state.dayStats.series}
              type="bar"
              width="100%"
            />
            <DatePicker
              customInput={
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
          </div>
        </Grid>
        <Grid item md={12} lg={6}>
          <Chart
            options={this.state.allTimeStats.options}
            series={this.state.allTimeStats.series}
            type="bar"
            width="100%"
          />
        </Grid>
      </Grid>
    )
  }
}

export default QueueDashboard;