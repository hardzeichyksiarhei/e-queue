import React, { Component } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import WatchLaterOutlinedIcon from "@material-ui/icons/WatchLaterOutlined";

import TabPanel from './TabPanel';
import QueueDayStats from './QueueDayStats/QuqueDayStats';
import QueueAllTimeStatsChart from './QueueAllTimeStats/QueueAllTimeStatsChart';

class QueueDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: 0
    }
  }

  handleTabsChange = (event, tabs) => {
    this.setState({ ...this.state, tabs });
  }

  render() {
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
          <QueueDayStats />
        </TabPanel>
        <TabPanel value={this.state.tabs} index={1}>
          <QueueAllTimeStatsChart />
        </TabPanel>
      </div>
    )
  }
}

export default QueueDashboard;