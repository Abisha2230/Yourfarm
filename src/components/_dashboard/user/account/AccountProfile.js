import React, { useEffect,useState,useCallback } from "react"
import { Card,Grid,Typography,List,ListItem,ListItemAvatar,ListItemText,CircularProgress} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WifiCalling3OutlinedIcon from '@mui/icons-material/WifiCalling3Outlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Admin_login_Service } from "src/_apis_";
import { format } from 'date-fns';
import useIsMountedRef from "src/hooks/useIsMountedRef";
const AccountProfile=()=>{
    const isMountedRef =useIsMountedRef();
    const userId = JSON.parse(window.localStorage.getItem('User')).userData?.id;
    const Tokens = JSON.parse(window.localStorage.getItem('Token')).useAuth;
    const [adminProfile,setAdminProfile] = useState({});
    const getUserProfile=useCallback(async()=>{
      const res = await Admin_login_Service.adminDetails(Tokens,userId);
      if(res.status===200 && res.data.code===200 ){
        if(isMountedRef.current){
          setAdminProfile(
            {
              name:res.data.data[0].name,
              mobile_no:res.data.data[0].mobile_no,
              role:res.data.data[0].role,
              created_at:format(new Date(res.data.data[0].created_at),'dd MM yyyy').replace(/ /g, '/'),
              updated_at:res.data.data[0].updated_at
             }
          )
        }
       
      }
    },[isMountedRef,Tokens,userId])
   useEffect(
     ()=>{
      getUserProfile();
},[getUserProfile,Tokens]
   );
    return(
   
        <Grid container spacing={3}>
          {Object.keys(adminProfile).length>0 ?
          <Grid item xs={12} md={12}>
          <Card sx={{ py: 2, px: 3, textAlign: 'left', }}>
          <Typography sx={{fontSize:"18px",mb:2}}>
              Profile Info
          </Typography>
          <List >
              <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
              <ListItem alignItems="flex-start">
          <ListItemAvatar sx={{marginTop:"2px",marginRight:"10px"}}>
            <AccountCircleOutlinedIcon sx={{fontSize:"25px"}}/>
          </ListItemAvatar>
          <ListItemText
            primary="Name"
            secondary={
              <React.Fragment>
                {adminProfile.name?adminProfile.name:"---"}
              </React.Fragment>
            }
          />
        </ListItem>
              </Grid>
              <Grid item xs={12} md={6}>
              <ListItem alignItems="flex-start">
          <ListItemAvatar sx={{marginTop:"2px",marginRight:"10px"}} >
        <EmailOutlinedIcon/>
          </ListItemAvatar>
          <ListItemText
            primary="Role"
            secondary={
              <React.Fragment>
                {adminProfile.role?adminProfile.role:"---"}
              </React.Fragment>
            }
          />
        </ListItem>
              </Grid>
              <Grid item xs={12} md={6}>
              <ListItem alignItems="flex-start">
          <ListItemAvatar sx={{marginTop:"2px",marginRight:"10px"}} >
        <WifiCalling3OutlinedIcon/>
          </ListItemAvatar>
          <ListItemText
            primary="Phone"
            secondary={
              <React.Fragment>
                {adminProfile.mobile_no?adminProfile.mobile_no:"---"}
              </React.Fragment>
            }
          />
        </ListItem>
                   </Grid>
             
              <Grid item xs={12} md={6}> 
              <ListItem alignItems="flex-start">
          <ListItemAvatar sx={{marginTop:"2px",marginRight:"10px"}} >
        <HomeOutlinedIcon/>
          </ListItemAvatar>
          <ListItemText
            primary="Created At"
            secondary={
              <React.Fragment>
                {adminProfile.created_at?adminProfile.created_at:"---"}
              </React.Fragment>
            }
          />
        </ListItem>
              </Grid>
              <Grid item xs={12} md={6}>
              <ListItem alignItems="flex-start">
          <ListItemAvatar sx={{marginTop:"2px",marginRight:"10px"}} >
        <MapsHomeWorkOutlinedIcon/>
          </ListItemAvatar>
          <ListItemText
            primary="Updated At"
            secondary={
              <React.Fragment>
                 {format(new Date(adminProfile.updated_at),'dd MM yyyy').replace(/ /g, '/')?format(new Date(adminProfile.updated_at),'dd MM yyyy').replace(/ /g, '/'):"---"}
              </React.Fragment>
            }
          />
        </ListItem>
                   </Grid>
          
            
              </Grid>
          </List>
              </Card>
              </Grid>
           :
           <Grid item xs={12} md={12} sx={{position:"relative"}}>
           <CircularProgress  sx={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
           </Grid>
           }
        
            
            </Grid>
    )
}
export default AccountProfile;