import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
// material
import { styled,useTheme } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
//
import BaseOptionChart from '../../charts/BaseOptionChart';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Yfdm=()=>{
  const[user,SetUser]= useState();

  console.log('yfdm',user?.data?.[7].name);

  useEffect(()=>{
    axios('https://jsonplaceholder.typicode.com/users').then((e)=>{SetUser(e)})
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
            <Typography sx={{ typography: 'subtitle2' }}>YFDM</Typography>
            <Typography sx={{ typography: 'h4' }}>{user?.data?.[7].name}</Typography>
           
          </Stack>
    
          {/* <ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={120} /> */}
        </RootStyle>
    )
}
export default Yfdm;