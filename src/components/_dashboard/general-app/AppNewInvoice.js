import React,{useCallback,useRef} from "react";
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
// material

import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import {
  Box,
  Chip,
  Card,
  IconButton,
  Table,
  Button,
  Divider,
  Typography,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  TableContainer,
  CircularProgress
} from '@mui/material';
// utils
//
import Scrollbar from '../../Scrollbar';
import { OrderDetails } from 'src/_apis_';
import { useEffect,useState } from 'react';
import {PATH_DASHBOARD} from "../../../routes/paths";
import { format } from 'date-fns';
import {alpha, useTheme } from '@mui/material/styles';
import useIsMountedRef from "src/hooks/useIsMountedRef";
// ----------------------------------------------------------------------



// ----------------------------------------------------------------------



export default function AppNewInvoice() {
  const theme=useTheme();
  const [orderList,setOrderList]=useState([]);
  const isMountedRef = useIsMountedRef();
  const tempFun=useRef();
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const getRecentOrders=useCallback(async()=>{
      const res = await OrderDetails.getOrdersList(Token);
      if(res.status===200 && res?.data?.code===200){
        res?.data?.data?.forEach(
          ele=>{
            ele.order_date=ele.order_date !== '' ? format(new Date(ele.order_date),'dd MM yyyy').replace(/ /g, '/') : ele.order_date;
            ele.created_at=new Date(ele.created_at);
            switch (ele.payment_status) {  
             case 1:  
             ele.payment_status = "Success"; 
             ele.color=theme.palette.info.main;
             break;
             case 2:
               ele.payment_status = "Failure";
               ele.color=theme.palette.success.main;
               break; 
               case 3:
                 ele.payment_status = "Pending"; 
                 ele.color=theme.palette.error.main;
                  break; 
                  default:  
                   ele.payment_status = "error code"; 
                   ele.color=theme.palette.error.main;
                   };
            ele.payStatus ={
              StatusTxt:ele.payment_status,
              ChipColor:ele.color
            }
            switch(ele.order_status){
              case 1:
                ele.order_status = "Pending";
                ele.colors=theme.palette.warning.dark;
                break;
                case 2:
                  ele.order_status = "On The Way";
                  ele.colors=theme.palette.info.main;
                  break;
                  case 3:
                    ele.order_status = "Delivered";
                    ele.colors=theme.palette.secondary.main;
                    break;
                    case 4:
                      ele.order_status = "Accepted";
                      ele.colors=theme.palette.success.main;
                      break;
                      case 5:
                        ele.order_status = "Rejected";
                        ele.colors=theme.palette.error.main;
                        break;
                      default:  
                      ele.order_status = "error code"; 
                      ele.colors=theme.palette.error.main;

            }
            ele.orderStatus={
              statusTxt:ele.order_status,
              statusColor:ele.colors
            }
            // ele.shippingAddress={
            //   add1:ele.address_line1,
            //   add2:ele.address_line2,
            //   add3:ele.address_line3,
            //   addcity:ele.city,
            //   addstate:ele.state,
            //   addcountry:ele.country,
            //   addother_address_details:ele.other_address_details,
            // }
          }
        );
        const thisMounth = new Date().getMonth(); 
        const thisYear = new Date().getFullYear(); 
        const temp = [];
        temp.push(res?.data?.data?.filter(t=>t.created_at.getMonth()===thisMounth && t.created_at.getFullYear()===thisYear));
       if(isMountedRef.current){
         if(temp.flatMap(p=>p).length===0){
          res?.data?.data.forEach(op=>{
            if(op.created_at.getMonth()-1===thisMounth-1){
              orderList.push(op);
            }
          })
         }
         else{
          setOrderList(res?.data?.data?.filter(t=>t.created_at.getMonth()===thisMounth && t.created_at.getFullYear()===thisYear).slice(0,3));
         }
       }
  
      }

  },[isMountedRef,Token,theme,orderList]);
  tempFun.current=getRecentOrders;
  useEffect(
    ()=>{
      tempFun.current();
    },[]
  );
  
    return (
    <Card>
      <CardHeader title="New Orders" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720,overflowX: "scroll",
         '&::-webkit-scrollbar':
{
  height: '6px',
  width:"6px",
	borderRadius: "10px",
	backgroundColor:theme.palette.background.neutral,
},

'&::-webkit-scrollbar-track': 
{
	width:" 6px",
},

'&::-webkit-scrollbar-thumb':
{
	borderRadius: '10px',

	backgroundColor: theme.palette.grey[400],
}
}}>
          <Table>
            <TableHead sx={{'& .MuiTableCell-head':{padding:"10px 25px",whiteSpace: "nowrap",fontSize:"13px",}}}>
              <TableRow>
              <TableCell>Order Id </TableCell>
              <TableCell>Order Date</TableCell>
                {/* <TableCell>User Name </TableCell>
                <TableCell>Mobile No</TableCell>
                <TableCell>Email</TableCell> */}
                <TableCell>Item Count</TableCell>
                <TableCell>Subtotal Total(₹)</TableCell>
                <TableCell>Shipping charges(₹)</TableCell>
                <TableCell>Total Amount(₹)</TableCell>
                <TableCell>Payment Type</TableCell>
                <TableCell>Payment Status</TableCell>
                {/* <TableCell>Address</TableCell> */}
                <TableCell>Order Status</TableCell>
                <TableCell>View</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            {
              orderList?.length>0?(
                <TableBody>
                {orderList.map((orders)=>(
                    <TableRow key={orders.id} sx={{"& .MuiTableCell-body":{padding:"10px 15px",fontSize:"13px"}}}>
                      <TableCell>
                     {`# ${orders.id}`}
                       </TableCell>
                       {/* <TableCell>{orders.name} </TableCell>
                       <TableCell>{orders.mobile_no} </TableCell>
                       <TableCell>{orders.email} </TableCell> */}
                        <TableCell>{orders.order_date} </TableCell>
                       <TableCell>{orders.items_count} </TableCell>
                       <TableCell>{orders.subtotal}</TableCell>
                       <TableCell>{orders.shipping_charges} </TableCell>
                       <TableCell>{orders.total_amount} </TableCell>
                       <TableCell>{orders.payment_type===0?"Cash On Delivery" : "Online"} </TableCell>
                       <TableCell> <Chip label={orders.payStatus?.StatusTxt} 
                       sx={{height:"26px",borderRadius:"10px",
                       color:orders?.payStatus?.ChipColor,
                       backgroundColor:`${alpha(orders?.payStatus?.ChipColor, 0.24)}`}} /></TableCell>
                       {/* <TableCell>
                       <Box width={200}>
                         <Typography sx={{fontSize:"13px"}}>{`${orders.shippingAddress.add1}, ${orders.shippingAddress.add2}`}</Typography>
                         <Typography sx={{fontSize:"13px"}}>{`${orders.shippingAddress.add3}, ${orders.shippingAddress.addcity} - ${orders.pincode}`}</Typography>
                         <Typography sx={{fontSize:"13px"}}>{`${orders.shippingAddress.addstate}, ${orders.shippingAddress.addcountry}`}</Typography>
                       </Box>
                       </TableCell> */}
                       <TableCell> <Chip label={orders.orderStatus.statusTxt} sx={{height:"26px",borderRadius:"10px",color:orders.orderStatus.statusColor,backgroundColor:`${alpha(orders.orderStatus.statusColor, 0.24)}`}} /></TableCell>
                       {/* <TableCell>{format(orders.created_at,'dd MM yyyy').replace(/ /g, '/')} </TableCell> */}
                       <TableCell>
                       <IconButton component={RouterLink}
                to={`${PATH_DASHBOARD.order.preview}/${orders.id}`}><TrendingFlatIcon sx={{fontSize:"20px",marginRight:"4px"}}/></IconButton> 
                       </TableCell>
                       
                    </TableRow>
                ))}
              </TableBody>
              ):(
                <TableBody >
                  <CircularProgress  sx={{margin:"50px auto",display:"flex",alignItems:"center",justifyContent:"center",marginLeft:"550px"}}/>

<TableRow>
{/* <TableCell colSpan={17}>  */}
{/* <img style={{margin:"auto"}}width="200px" height="200px" alt={"empty"} src={`/static/illustrations/illustration_empty_cart.svg`}/> */}
{/* <Typography sx={{marginTop:"10px",textAlign:"center"}}>
  No Orders for This Years!
</Typography> */}
{/* </TableCell> */}
</TableRow>
                </TableBody>
              )
            }
           
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          component={RouterLink}
          to={`${PATH_DASHBOARD.order.root}`}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}
