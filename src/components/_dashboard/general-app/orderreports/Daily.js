import React from "react";
import {List,ListItem,ListItemText,Box,Divider,ListItemAvatar} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useTheme,alpha } from '@mui/material/styles';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
const Daily=({data})=>{
    const theme = useTheme();

 return(
    <List sx={{ width: '100%'}}>
 <ListItem sx={{width:"50%",display:"inline-flex"}}>
        <ListItemAvatar>
            <Box sx={{ justifyContent:"center",alignItems:"center",display:"flex",width: "45px",height:"45px",borderRadius:"50%", bgcolor: alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),}}>
            <ShoppingCartOutlinedIcon sx={{color:theme.palette.primary.main}}/>
            </Box>
        </ListItemAvatar>
        <ListItemText primary="Total Orders" secondary={data?.order_count} />
      </ListItem>
      <Divider/>
      <ListItem sx={{width:"50%",display:"inline-flex"}}>
        <ListItemAvatar>
            <Box sx={{ justifyContent:"center",alignItems:"center",display:"flex",width: "45px",height:"45px",borderRadius:"50%", bgcolor: alpha(theme.palette.secondary.main, theme.palette.action.activatedOpacity),}}>
            <PriceCheckOutlinedIcon sx={{color:theme.palette.secondary.main}}/>
            </Box>
        </ListItemAvatar>
        <ListItemText primary="Total Earnings" secondary={`Rs.${data?.earnings}`} />
      </ListItem>
      <Divider/>
      <ListItem sx={{width:"50%",display:"inline-flex"}}>
        <ListItemAvatar>
            <Box sx={{ justifyContent:"center",alignItems:"center",display:"flex",width: "45px",height:"45px",borderRadius:"50%", bgcolor: alpha(theme.palette.info.main, theme.palette.action.activatedOpacity),}}>
            <LocalShippingOutlinedIcon sx={{color:theme.palette.info.main}}/>
            </Box>
        </ListItemAvatar>
        <ListItemText primary="Delivered Orders" secondary={data?.delivery_count} />
      </ListItem>
      
    </List>
 )   
}
export default Daily; 