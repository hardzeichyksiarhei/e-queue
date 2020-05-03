import React from "react";
import {Grid} from "@material-ui/core";

export default function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
        style={{padding: 12}}
      >
        {value === index && (
           <Grid container spacing={3} justify="center"
           alignItems="center">{children} </Grid> 
        )}
      </div>
    );
  }