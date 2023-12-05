
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
import React from "react";
// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31] }];

export default function AppTotalDownloads({TotalDelivery}) {
  const theme = useTheme();
  const chartOptions = {
    colors: [theme.palette.chart.red[0]],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => ''
        }
      },
      marker: { show: false }
    }
  };

  return (
    <>
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Total Earnings <span style={{fontSize:12}}>(Herbal Products)</span></Typography>     
        <Typography variant="h3">{TotalDelivery!=="" && TotalDelivery!==undefined ? `₹ ${TotalDelivery}` : 0}</Typography>
      </Box>
      <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} width={60} height={36} />
    </Card>
    </>
  );
}
