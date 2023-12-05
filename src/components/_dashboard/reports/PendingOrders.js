import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
// material
import { styled,useTheme } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
//
import BaseOptionChart from '../../charts/BaseOptionChart';
const PendingOrders=({PendingOrderNo})=>{
    const theme = useTheme();
const CHART_DATA = [{ data: [111, 136, 76, 108, 74, 54, 57, 84] }];
    const chartOptions = merge(BaseOptionChart(), {
        colors: [theme.palette.error.main],
        chart: { sparkline: { enabled: true } },
        xaxis: { show: false  },
        yaxis: { show: false  },
        stroke: {  curve: 'smooth'},
        legend: { show: false },
        grid: { show: false },
        tooltip: {
          marker: { show: false },
          y: {
            show: false
          },
          x: {
            show: false
          }
          
        },
     fill: { gradient: { opacityFrom: 0.56, opacityTo: 0.56 } }
      });
    
    const RootStyle = styled(Card)(({ theme }) => ({
        width: '100%',
        boxShadow: 'none',
        position: 'relative',
        color: theme.palette.error.darker,
        backgroundColor: theme.palette.error.lighter,
        "& .apexcharts-tooltip":{
            display:"none",
             "& .apexcharts-tooltip-marker":{
            display:"none"
        },
        "& .apexcharts-xaxistooltip":{
            dipslay:"none"
        }
        },
       
      }));
      
      const IconWrapperStyle = styled('div')(({ theme }) => ({
        width: 48,
        height: 48,
        display: 'flex',
        borderRadius: '50%',
        position: 'absolute',
        alignItems: 'center',
        top: theme.spacing(3),
        right: theme.spacing(3),
        justifyContent: 'center',
        color: theme.palette.error.lighter,
        backgroundColor: theme.palette.error.dark
      }));
    return (
        <RootStyle>
          <IconWrapperStyle>
           
            <PendingActionsIcon/>
          </IconWrapperStyle>
    
          <Stack spacing={1} sx={{ p: 3 }}>
            <Typography sx={{ typography: 'subtitle2' }}>Pending Orders</Typography>
            <Typography sx={{ typography: 'h4' }}>{PendingOrderNo}</Typography>
           
          </Stack>
    
          {/* <ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={120} /> */}
        </RootStyle>
    )
}
export default PendingOrders;