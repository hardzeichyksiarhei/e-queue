import React, { Component } from 'react';
import { userServices } from '../../../services';
import Chart from "react-apexcharts";
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import { Grid, TextField, Tab, Tabs, CircularProgress } from '@material-ui/core';
import ru from 'date-fns/locale/ru';
import QueueNotAccess from '../QueueNotAccess/QueueNotAccess';
import TabPanel from './TabPanel';
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import WatchLaterOutlinedIcon from "@material-ui/icons/WatchLaterOutlined";
import MaterialTable from 'material-table';

class QueueDashboard extends Component {
  constructor(props) {
    super(props);

    this.defaultMinDate = new Date(2020, 4, 2, 9, 0);
    this.defaultMaxDate = new Date(2020, 5, 1);
    this.state = {
      loading: true,
      tabs: 0,
      isAccess: true,
      selectedDate: this.defaultMinDate,
      dayStats: {
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
      },
      allTimeStats: {
        options: {
          chart: { id: 'Распределение количества абитуриентов по датам' },
          xaxis: { categories: [] },
          legend: { show: false },
          plotOptions: {  bar: { distributed: true }, },
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
      },
      table: {
        columns: [
          { title: 'Имя', field: 'firstName' },
          { title: 'Фамилия', field: 'lastName' },
          { title: 'Электронная почта', field: 'email' },
          { title: 'Время', field: 'time', },
        ],
        data: [],
      }
    }
  }

  componentDidMount() {
    this._fetchAllData();
  }

  async _fetchAllData() {
    try {
      await this._fetchNumberOfUsersByDay();
      await this._fetchNunmberOfUsers();

      this.setState({ ...this.state, loading: false })
    } catch (e) { this.setState({ ...this.state, loading: false }); console.error(e); }
  }

  async _fetchNumberOfUsersByDay(date = this.defaultMinDate) {
    const formatDate = format(date, 'yyyy-MM-dd');
    try {
      const { labels, values, users } = await userServices.fetchNunmberOfUsersByDay(formatDate);
      this.setState(prev => ({
        ...prev,
        selectedDate: date,
        dayStats: {
          ...prev.dayStats,
          options: {
            ...prev.dayStats.options,
            title: {
              ...prev.dayStats.options.title,
              text: format(date, 'd MMMM yyyy', { locale: ru }),
            },
            xaxis: {
              ...prev.dayStats.options.xaxis,
              categories: labels
            }
          },
          series: [{
            name: "Количество абитуриентов",
            data: values
          }]
        },
        table: {
          ...prev.table,
          data: users
        }
      }));
    } catch (e) {
      this.setState({ ...this.state, isAccess: false })
      console.error(e);
    }
  }

  async _fetchNunmberOfUsers() {
    try {
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
            name: "Количество абитуриентов",
            data: values
          }]
        }
      });
    } catch (e) {
      this.setState({ ...this.state, isAccess: false })
      console.error(e);
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
    this._fetchNumberOfUsersByDay(date);
  }

  handleTabsChange = (event, tabs) => {
    this.setState({ ...this.state, tabs });
  }

  render() {
    const { isAccess, loading } = this.state;

    if (!isAccess) return <QueueNotAccess />

    if (loading) return <div className="dashboard-loading"><CircularProgress /></div>

    console.log(this.state)

    return (
      <div>
        <Tabs
          value={this.state.tabs}
          onChange={this.handleTabsChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Статистика за день" icon={<WatchLaterOutlinedIcon />} />
          <Tab label="Статистика за все время" icon={<DateRangeOutlinedIcon />} />
        </Tabs>
        <TabPanel value={this.state.tabs} index={0}>
          <Grid item md={12} lg={12}>
            <Grid container justify="center"
              alignItems="center">
              <Grid item md={12} lg={4}>
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
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} lg={6}>
            <div>
              <Chart
                options={this.state.dayStats.options}
                series={this.state.dayStats.series}
                type="bar"
                width="100%"
              />
            </div>
          </Grid>
          <Grid item md={12} lg={6}>
            <MaterialTable
              title="Список абитуриентов"
              columns={this.state.table.columns}
              data={this.state.table.data}
              localization={{
                pagination: {
                  labelRowsSelect: 'записей',
                  labelDisplayedRows: '{from}-{to} из {count}'
                },
                toolbar: {
                  searchPlaceholder: 'Поиск'
                }
              }}
            />
          </Grid>
        </TabPanel>
        <TabPanel value={this.state.tabs} index={1}>
          <Grid item md={12} lg={8}>
            <Chart
              options={this.state.allTimeStats.options}
              series={this.state.allTimeStats.series}
              type="bar"
              width="100%"
            />
          </Grid>
        </TabPanel>
      </div>
    )
  }
}

export default QueueDashboard;