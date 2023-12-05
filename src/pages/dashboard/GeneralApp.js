import React,{useCallback,useEffect,useState} from "react";
// material
import { Container, Grid, } from '@mui/material';
// hooks
import { useSnackbar } from "notistack";
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { useNavigate } from 'react-router-dom';
import {
  AppNewInvoice,
  OrderReportView,
  AppTotalDownloads,
  AppTotalInstalled,
  AppTotalActiveUsers,
  Appfeeddata

} from '../../components/_dashboard/general-app';
import {dashBoardReports} from "../../_apis_";
import useIsMountedRef from "src/hooks/useIsMountedRef";
// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const [dashBoardReport,setDashBoardReport]=useState([]);
  const [loader,setLoader] = useState(false);
  const Token  = JSON.parse(window.localStorage.getItem('Token')).useAuth;
  const user = localStorage.getItem('Role')
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  //const { user } = useAuth();

  useEffect(()=>{
if(user === 'Verifier'){
  navigate('/order');
}
  },[])
  const getDashBoard=useCallback(async()=>{
   const res = await dashBoardReports.orderReportsList(Token);
 
   if(res?.status===200 && res?.data?.code===200){
    console.log(JSON.stringify(res.data))
     if(isMountedRef.current){
      setDashBoardReport(res.data.data[0]);
     }
   }
   else if(res?.response?.status>=400&&res?.response?.statusText==="Unauthorized"){
    enqueueSnackbar("Multiple logins detected please relogin it  ", { variant: "error" });
   }
else{
  setLoader(true);
}
  },[isMountedRef,Token,enqueueSnackbar]);
  useEffect(()=>{
    getDashBoard();
  },[getDashBoard]);
  return (
    <Page title="Dashboard | Animeta">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
         


          <Grid item xs={12} md={4}>
            <AppTotalActiveUsers TotalUser={dashBoardReport?.["dashboard"]?.[0]?.user_count} />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalInstalled  TotalTreat={dashBoardReport?.["dashboard"]?.[0]?.treatment_count}/>
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalDownloads  TotalDelivery={dashBoardReport?.["dashboard"]?.[0]?.delivery_count}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <Appfeeddata  TotalAmount={dashBoardReport?.["dashboard"]?.[0]?.total_amount}/>
          </Grid>
          <Grid item xs={12} lg={12}>
       <OrderReportView lading={loader} OrderToday={dashBoardReport?.["today"]?.[0]} OrderWeek={dashBoardReport?.["weekly"]?.[0]} OrderMonth={dashBoardReport?.["monthly"]?.[0]} /> 
          </Grid>
          <Grid item xs={12} lg={12}>
            <AppNewInvoice />
          </Grid>


        
        </Grid>
      </Container>
    </Page>
  );
}
