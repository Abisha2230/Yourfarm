import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
// material
import { styled, useTheme } from "@mui/material/styles";
import { Card, Typography, Stack } from "@mui/material";
// utils
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import BaseOptionChart from "../../charts/BaseOptionChart";
import { useEffect, useState } from "react";
import axios from "axios";

const TimeOut = () => {
  const [TimeOut, SetTimeOut] = useState([]);
  
  console.log('timeout',TimeOut?.data?.[2].address.city);

  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/users").then((e) => {
      SetTimeOut(e);
    });
  }, []);

  const RootStyle = styled(Card)(({ theme }) => ({
    width: "100%",
    boxShadow: "none",
    position: "relative",
    color: theme.palette.error.darker,
    backgroundColor: theme.palette.error.lighter,
    "& .apexcharts-tooltip": {
      display: "none",
      "& .apexcharts-tooltip-marker": {
        display: "none",
      },
      "& .apexcharts-xaxistooltip": {
        dipslay: "none",
      },
    },
  }));

  const IconWrapperStyle = styled("div")(({ theme }) => ({
    width: 48,
    height: 48,
    display: "flex",
    borderRadius: "50%",
    position: "absolute",
    alignItems: "center",
    top: theme.spacing(3),
    right: theme.spacing(3),
    justifyContent: "center",
    color: theme.palette.error.lighter,
    backgroundColor: theme.palette.error.dark,
  }));
  return (
    <RootStyle>
      <IconWrapperStyle>
        <AlarmOffIcon />
      </IconWrapperStyle>

      <Stack spacing={1} sx={{ p: 3 }}>
        <Typography sx={{ typography: "subtitle2" }}>CRM Timeout</Typography>
        <Typography sx={{ typography: "h4" }}>{TimeOut?.data?.[2].address.city}</Typography>
      </Stack>

      {/* <ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={120} /> */}
    </RootStyle>
  );
};
export default TimeOut;
