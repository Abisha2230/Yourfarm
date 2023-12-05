import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
// material
import { styled,useTheme } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
//
import BaseOptionChart from '../../charts/BaseOptionChart';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FollowUp=()=>{

  const[Follow,SetFollow]=useState([]);
console.log('follow',Follow.data?.[7].address.city);


useEffect(()=>{
  axios('https://jsonplaceholder.typicode.com/users').then((e)=>{SetFollow(e)})
},[])

   
    
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
            <Typography sx={{ typography: 'subtitle2' }}>CRM -Followup</Typography>
            <Typography sx={{ typography: 'h4' }}>{Follow.data?.[7].address.city} </Typography>
           
          </Stack>
    
          {/* <ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={120} /> */}
        </RootStyle>
    )
}
export default FollowUp;