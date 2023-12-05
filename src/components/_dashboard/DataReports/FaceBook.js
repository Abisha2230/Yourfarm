import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { styled } from "@mui/material/styles";
import { Card, Typography, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
// utils
//

import { useEffect, useState } from "react";
import axios from "axios";

const FaceBook = () => {
  const [Data, SetData] = useState([]);
  let users = Data.data
  console.log("data", users?.[1]?.id);


  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/albums")
      .then((res) => {
        SetData(res);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error fetching data:", error);
      });
  }, []);

  //
  const RootStyle = styled(Card)(({ theme }) => ({
    width: "100%",
    boxShadow: "none",
    position: "relative",
    color: theme.palette.primary.darker,
    backgroundColor: theme.palette.primary.lighter,
    backgroundColor: "#8cc2de",
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
    color: theme.palette.primary.lighter,
    backgroundColor: "#0866FF",
  }));
  return (
    <RootStyle>
      <IconWrapperStyle>
        <FacebookIcon />
      </IconWrapperStyle>

      <Stack spacing={1} sx={{ p: 3 }}>
        <Typography sx={{ typography: "subtitle2", color: "#0866FF" }}>
          FaceBook
        </Typography>
        
          <div>
          {/* {users.map((list)=>{ */}
                 <Typography sx={{ typography: "h4" }}>{users?.[1]?.id}</Typography>
          {/* })} */}
       
          </div>
        
      </Stack>

      {/* <ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={120} /> */}
    </RootStyle>
  );
};
export default FaceBook;
