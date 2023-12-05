import React,{useState} from "react";
import {Card,Box,Tab,Tabs,Typography,CircularProgress} from '@mui/material';
import {Daily,Weekly,Monthly} from "./orderreports";
import { capitalCase } from 'change-case';
import { useTheme } from '@mui/material/styles';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
const OrderReportView=({lading,OrderToday,OrderWeek,OrderMonth})=>{
    const [currentTab, setCurrentTab] = useState(0);
    const theme = useTheme();
  
    const ACCOUNT_TABS = [
        {
          value: 'Today',
          icon:<TodayOutlinedIcon/> ,
          component: <Daily data={OrderToday}/>
        },
        {
          value: 'Weekly',
          icon:<DateRangeOutlinedIcon/>,
          component:  <Weekly data={OrderWeek}/>
        },
        {
          value: 'Monthly',
          icon:<EventOutlinedIcon/> ,
          component: <Monthly data={OrderMonth}/>
        },
      ];
      const handleChangeTab = async (event, newValue) => {
        setCurrentTab(newValue);
      }
     
    return(
        <Card >
      <Box sx={{p:2}}>
     <Typography sx={{fontSize:"19px",fontWeight:"bold"}}>
         Order Details
     </Typography>
      </Box>
      {!lading ? <Box sx={{border:`1px solid ${theme.palette.background.neutral}`,mb:2,mx:2,display:"flex"}}>
      <Tabs
      sx={{background:theme.palette.background.neutral,width:"130px",py:1,pl:1,"& .MuiTab-labelIcon":{marginRight:"0px!important"}}}
              value={currentTab}
              scrollButtons="auto"
              orientation="vertical"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={handleChangeTab}
            >
              {ACCOUNT_TABS.map((tab,index) => (
                <Tab sx={{justifyContent:"flex-start"}} disableRipple key={index} label={capitalCase(tab.value)} icon={tab.icon} value={index} />
              ))}
            </Tabs>

            {ACCOUNT_TABS.map((tab,index) => {
              const isMatched = index === currentTab;
              return isMatched && <Box sx={{width:'100%'}}  key={tab.value}>{tab.component}</Box>;
            })}
            </Box>:
            <Box sx={{pt:1,pb:5,display:"flex",justifyContent:"center",alignItems:"center"}}><CircularProgress /></Box> }
        </Card>
        
    )
}
export default OrderReportView;