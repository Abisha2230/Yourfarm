
// material
import { styled,useTheme } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
import GoogleIcon from '@mui/icons-material/Google';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { log } from 'deck.gl';
//

const GooglePlay=()=>{
const [play,SetPlay] = useState([]);

useEffect(()=>{
  axios('https://jsonplaceholder.typicode.com/todos').then((e)=>SetPlay(e))
},[])

const GooglePlay = play.data;
console.log("googleplay",GooglePlay?.[5]?.id);

    
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
           
            <GoogleIcon/>
          </IconWrapperStyle>
    
          <Stack spacing={1} sx={{ p: 3 }}>
            <Typography sx={{ typography: 'subtitle2' }}>Google Play</Typography>
            <Typography sx={{ typography: 'h4' }}>{GooglePlay?.[5]?.id}</Typography>
           
          </Stack>
    
          {/* <ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={120} /> */}
        </RootStyle>
    )
}
export default GooglePlay;