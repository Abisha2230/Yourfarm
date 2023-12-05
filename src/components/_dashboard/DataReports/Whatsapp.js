
// material
import { styled,useTheme } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
//
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Whatsapp=()=>{
  const[what,SetWhat] = useState([]);
  const WhatsappUser = what.data;
  console.log(WhatsappUser?.[2].username);


  useEffect(()=>{
    axios('https://jsonplaceholder.typicode.com/users').then((e)=>SetWhat(e))
  },[])
  

    
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
            display:"none"
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
           
            <WhatsAppIcon />
          </IconWrapperStyle>
    
          <Stack spacing={1} sx={{ p: 3 }}>
            <Typography sx={{ typography: 'subtitle2' }}>Whatsapp</Typography>
            <Typography sx={{ typography: 'h4' }}>{WhatsappUser?.[2].username}</Typography>
           
          </Stack>
    
          {/* <ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={120} /> */}
        </RootStyle>
    )
}
export default Whatsapp;