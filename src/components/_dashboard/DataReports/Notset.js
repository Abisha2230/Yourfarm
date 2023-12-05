import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
// material
import { styled,useTheme } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
//
import BaseOptionChart from '../../charts/BaseOptionChart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { log } from 'deck.gl';
const Notset=()=>{
  const[NotSet,SetNotSet] = useState([]);
  const not = NotSet.data;
  console.log("notset",not?.[6]?.title);

  useEffect(()=>{
    axios('https://jsonplaceholder.typicode.com/todos').then((e)=>{
      SetNotSet(e);
    })
  },[])
    
    const RootStyle = styled(Card)(({ theme }) => ({
        width: '100%',
        boxShadow: 'none',
        position: 'relative',
        color: theme.palette.warning.darker,
        backgroundColor: theme.palette.warning.lighter,
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
        color: theme.palette.warning.lighter,
        backgroundColor: theme.palette.warning.dark
      }));
    return (
        <RootStyle>
          <IconWrapperStyle>
           
            <LocalShippingOutlinedIcon/>
          </IconWrapperStyle>
    
          <Stack spacing={1} sx={{ p: 3 }}>
            <Typography sx={{ typography: 'subtitle2' }}>Not % 20 Set</Typography>
            <Typography sx={{ typography: 'h4' }}>{not?.[6]?.title}</Typography>
           
          </Stack>
    
          {/* <ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={120} /> */}
        </RootStyle>
    )
}
export default Notset;