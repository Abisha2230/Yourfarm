import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
// material
import { styled,useTheme } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
//
import BaseOptionChart from '../../charts/BaseOptionChart';
const TotalEarning=({TotalEarningNo})=>{
    const theme = useTheme();
const CHART_DATA = [{ data: [111, 136, 76, 108, 74, 54, 57, 84] }];
    const chartOptions = merge(BaseOptionChart(), {
        colors: [theme.palette.info.main],
        chart: { sparkline: { enabled: true } },
        xaxis: { show: false  },
        yaxis: { show: false  },
        stroke: {  curve: 'smooth'},
        legend: { show: false },
        grid: { show: false },
        tooltip: {
          marker: { show: false ,  size: 0,},
          y: {
            show: false,
            tooltip: {
                enabled: false
              }
          },
          x: {
            show: false,
            tooltip: {
                enabled: false
              }
          }
          
        },
     fill: { gradient: { opacityFrom: 0.56, opacityTo: 0.56 } }
      });
    
    const RootStyle = styled(Card)(({ theme }) => ({
        width: '100%',
        boxShadow: 'none',
        position: 'relative',
        color: theme.palette.info.darker,
        backgroundColor: theme.palette.info.lighter,
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
        color: theme.palette.info.lighter,
        backgroundColor: theme.palette.info.dark
      }));
    return (
        <RootStyle>
          <IconWrapperStyle>
           
            <SavingsOutlinedIcon/>
          </IconWrapperStyle>
    
          <Stack spacing={1} sx={{ p: 3 }}>
            <Typography sx={{ typography: 'subtitle2' }}>Total Earnings</Typography>
            <Typography sx={{ typography: 'h4' }}>{`₹. ${TotalEarningNo}`}</Typography>
           
          </Stack>
    
          {/* <ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={120} /> */}
        </RootStyle>
    )
}
export default TotalEarning;