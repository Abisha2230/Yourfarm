import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
// material
import { styled,useTheme } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
//
import BaseOptionChart from '../../charts/BaseOptionChart';
const TotalCustomer=({TotalCustomerNo})=>{
    const theme = useTheme();
const CHART_DATA = [{ data: [111, 136, 76, 108, 74, 54, 57, 84] }];
    const chartOptions = merge(BaseOptionChart(), {
        colors: [theme.palette.success.main],
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
        color: theme.palette.success.darker,
        backgroundColor: theme.palette.success.lighter,
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
        color: theme.palette.success.lighter,
        backgroundColor: theme.palette.success.dark
      }));
   
    return (
        <RootStyle>
          <IconWrapperStyle>
           
            <PeopleAltOutlinedIcon/>
          </IconWrapperStyle>
    
          <Stack spacing={1} sx={{ p: 3 }}>
            <Typography sx={{ typography: 'subtitle2' }}>Total Customer</Typography>
            <Typography sx={{ typography: 'h4' }}>{TotalCustomerNo}</Typography>
           
          </Stack>
    
          {/* <ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={120} /> */}
        </RootStyle>
    )
}
export default TotalCustomer;