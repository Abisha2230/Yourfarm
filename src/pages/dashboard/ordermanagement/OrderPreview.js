import React, { useState, useEffect, useRef } from "react";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import { PATH_DASHBOARD } from "../../../routes/paths";

import { Container, Grid, Card, Box, Avatar, Typography, Table, TableRow, TableBody, TableCell, TableHead, CircularProgress, TextField } from "@mui/material";
import useSettings from "../../../hooks/useSettings";
import { OrderDetails } from "src/_apis_";
import { useParams } from "react-router";
import { format } from 'date-fns';
import { styled, useTheme } from '@mui/material/styles';
import GridGoldenratioIcon from '@mui/icons-material/GridGoldenratio';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import EditRoadOutlinedIcon from '@mui/icons-material/EditRoadOutlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
// import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import GradingIcon from '@mui/icons-material/Grading';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import { makeStyles } from '@mui/styles';


const ItemManagementPreview = () => {
  const theme = useTheme();
  const fileId = useParams();
  const tempFun = useRef();
  const { themeStretch } = useSettings();
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const [getItemSignle, setGetItemSignle] = useState([]);
  const [getOrderList, setGetOrderList] = useState([]);
  const isMountedRef = useIsMountedRef();
  const [packageSlipValue, setPackageSlipValue] = useState('');// Initialize with an empty string or a default value
  const [downloadUrl, setDownloadUrl] = React.useState('');
  const [orderType, setOrderType] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);



  const useStyles = makeStyles({
    scrollBar: {
      "&::-webkit-scrollbar": {
        width: "3px",
      },

      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 5px rgb(255, 251, 251)",
        borderRadius: "10px",
      },

      "&::-webkit-scrollbar-thumb": {
        background: "lightgreen",
        borderRadius: "10px",
      },

      "&::-webkit-scrollbar-thumb:hover": {
        background: "rgb(255, 251, 251)",
      }
    }
  });

  const classes = useStyles()

  const getItemsingle = async () => {
    const res = await OrderDetails.getOrdersListId(fileId.id, Token);


    console.log(res)
    if (res.data.code === 200) {
      res?.data?.data?.forEach(ele => {
        ele.updated_at = format(new Date(ele.updated_at), 'dd MM yyyy').replace(/ /g, '/')
        // ele.created_at= format(new Date(ele.created_at),'dd MM yyyy').replace(/ /g, '/');
        // ele.order_date= format(new Date(ele.order_date),'dd MM yyyy').replace(/ /g, '/');
        ele.order_date = ele.order_date !== '' ? format(new Date(ele.order_date), 'dd MM yyyy').replace(/ /g, '/') : ele.order_date;
        ele.payment_type === 0 ? ele.payment_type = "Cash On Delivery" : ele.payment_type = "Online";
        switch (ele.payment_status) {
          case 1:
            ele.payment_status = "Success"
            break;
          case 2:
            ele.payment_status = "Failure"
            break;
          case 3:
            ele.payment_status = "Pending"
            break;
          default:
            ele.payment_status = "Error Status"
        }
        switch (ele.order_status) {
          case 1:
            ele.order_status = "Pending";
            ele.colors = theme.palette.error.main;
            break;
          case 2:
            ele.order_status = "On The Way";

            break;
          case 3:
            ele.order_status = "Delivered";

            break;
          case 4:
            ele.order_status = "Accepted";

            break;
          // case 5:
          //   ele.order_status = "Accepted";

          //   break;
          case 6:
            ele.order_status = "Verified";
            break;
          case 7:
            ele.order_status = "Cancelled";
            break;

          default:
            ele.order_status = "error code";


        }

      }
      )
      if (isMountedRef.current) {
        setGetItemSignle(res.data.data[0]);
      }
    }


  };
  tempFun.current = getItemsingle;
  const TableStyle = styled('div')(({ theme }) => ({
    "& .MuiTable-root": {
      maxWidth: "100%",
      '&::-webkit-scrollbar':
      {
        height: '6px',
        width: "6px",
        borderRadius: "10px",
        backgroundColor: theme.palette.background.neutral,
      },

      '&::-webkit-scrollbar-track':
      {
        width: " 6px",
      },

      '&::-webkit-scrollbar-thumb':
      {
        borderRadius: '10px',

        backgroundColor: theme.palette.grey[400],
      },
      "& .MuiTableRow-head": {


        "& .MuiTableCell-head": {
          padding: "10px",
          fontSize: "11px",
          backgroundColor: theme.palette.grey[200],
          fontWeight: "bold"
        }
      },
      "& .MuiTableBody-root": {
        "& .MuiTableCell-root": {
          padding: "10px",
          fontSize: "11px",
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
        }
      }
    }
  }));

  useEffect(
    () => {
      tempFun.current();
    }, []
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await OrderDetails.getOrdersListId(fileId.id, Token);
        const orderType = res1?.data?.data[0]?.order_type;
        setOrderType(orderType);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching order type:', error);
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    const res1 = await OrderDetails.getOrdersListId(fileId.id, Token);
    // const orderType = res1?.data?.data[0]?.order_type;
    // setOrderType(orderType);
    // console.log(JSON.stringify(res1.data.data[0])+'res1.data.data[0]res1.data.data[0]res1.data.data[0]')

    // console.log('hhhhhhhhhhhhhhhhfgtdxres')
    //   console.log(JSON.stringify(setGetOrderList)+'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
    if (res1.data.data[0].order_type === 0 || res1.data.data[0].order_type === 2) {
      try {
        // if (res.data.orderType === 0 || res.data.orderType === 2) {
        const res = await OrderDetails.packageslip(Token, fileId.id);

        // const res1 = await OrderDetails.getOrdersListId(fileId.id, Token);
        // console.log(res1.data.data[0].order_type);


        // console.log(JSON.stringify(res)+'packageslippackageslip');
        // console.log('annnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
        // if (res1.data.data[0].order_type === 0 || res1.data.data[0].order_type === 2) {
        //   console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
        //   console.log(JSON.stringify(res.data.orderType )+'Order type is 3. Skipping download.');
        //   return;
        // }

        if (res.data.url) {
          const link = document.createElement('a');
          link.href = res.data.url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        else {
          console.error('URL not found in the response');
        }
      }
      catch (error) {
        console.error('Error fetching package slip:', error);
      }
      // if (isMountedRef.current) {
      //   setGetOrderList(res1.data.data[0]);
      //   console.log(JSON.stringify(setGetOrderList)+'order_typeorder_type');
      // }
    }
  };



  return (
    <Page title="Order Management | Animeta">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Order Management"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "Order Management",
              href: PATH_DASHBOARD.order.root,
            },
            {
              name: "Order Details",
            },
          ]}

        />
<div>
  {isLoaded && (orderType !== 1 && orderType !== 3) && (
    <div className="card" style={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '10px',
      fontSize: '14px',
      width: '100%',
      marginLeft: '-85px', // Use marginLeft instead of marginRight
    }}>
      <h3 onClick={() => handleSearch()} className="button">Packing Slip</h3>
    </div>
  )}
</div>






        <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} md={10} >
            <Card
              sx={{
                display: "flex",
                p: "10px",
                flexDirection: "column",
              }}
            >

              {/* <div className="card" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '700px', fontSize: "05px" }}>
                <h3 onClick={() => handleSearch()} className="button">Packing Slip</h3>
                
              </div> */}



              <Typography sx={{ fontWeight: "500", fontSize: "15px", pl: "15px", pb: "15px" }}>

                Order Items

              </Typography>


              <TableStyle>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Item Id</TableCell>
                      <TableCell align="left">Picture</TableCell>
                      <TableCell align="left">Product Name</TableCell>
                      <TableCell align="left">Discount</TableCell>
                      <TableCell align="left">Quantity</TableCell>
                      <TableCell align="left">Rate</TableCell>
                      <TableCell align="left">Cattle Type</TableCell>
                      <TableCell align="left">details</TableCell>
                    </TableRow>
                  </TableHead>
                  {getItemSignle.order_items?.length > 0 ?
                    <TableBody>
                      {getItemSignle.order_items?.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell align="left">{`#${row.product_id}`}</TableCell>
                          <TableCell align="left">
                            <Avatar src={row.image_url} alt={row.image_url} />
                          </TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          {row.discount_type === 1 ?
                            <TableCell align="left">{`${row.discount} %`}</TableCell> : <TableCell align="left">{`${row.discount} ₹`}</TableCell>
                          }
                          <TableCell align="left">{row.quantity}</TableCell>
                          <TableCell align="left">{`Rs. ${row.rate}`}</TableCell>
                          <TableCell align="left">{row.cattle_type}</TableCell>
                          <TableCell align="left">{row.kit_details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody> :
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={6}>
                          <CircularProgress sx={{ width: "15px!important", height: "15px!important", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto" }} />
                        </TableCell>
                      </TableRow>
                    </TableBody>

                  }
                </Table>
              </TableStyle>
              <Box sx={{ padding: "9px 15px 0px", display: "flex", alignItems: "center", justifyContent: "flex-end", fontSize: "13px", fontWeight: "bold" }}>
                {`Total: Rs.${getItemSignle.subtotal ? getItemSignle.subtotal : 0}`}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={10} >
            <Card
              sx={{
                display: "flex",
                p: 4,
                flexDirection: "column",
                backgroundSize: "cover",
                backgroundImage: `url(/static/mock-images/covers/ItemDetail.png)`,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <GridGoldenratioIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Order Id
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle.id ? getItemSignle.id : "---"}
                      </Typography>
                    </Box>
                  </Box>

                </Grid>
                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <AssignmentIndOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        User  id
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle.user_id ? getItemSignle.user_id : "---"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <GradingIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Order Date
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle.order_date ? getItemSignle.order_date : "---"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <TextSnippetOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Notes
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle.notes ? getItemSignle.notes : "---"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <PersonOutlineOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        User  Name
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle.name ? getItemSignle.name : "---"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <EmailOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Email
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle.email ? getItemSignle.email : "---"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <PhoneAndroidOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Mobile no
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle.mobile_no ? getItemSignle.mobile_no : "---"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <CreditScoreOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Payment Type
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle?.payment_type ? getItemSignle?.payment_type : "---"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <CreditScoreOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Subtotal
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle?.subtotal ? getItemSignle?.subtotal : "---"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>



                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <CreditScoreOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Discount
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle?.discount ? getItemSignle?.discount : "---"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <CreditScoreOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Coupon Discount
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle?.coupon_discount ? getItemSignle?.coupon_discount : "---"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>


                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <CreditScoreOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Total Amount
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle?.total_amount ? getItemSignle?.total_amount : "---"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <CreditScoreOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Shipping Charge
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle?.shipping_charges ? getItemSignle?.shipping_charges : "---"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>



                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <PriceCheckOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Payment Status
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle?.payment_status ? getItemSignle?.payment_status : "---"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <ShoppingCartOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Order Status
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle?.order_status ? getItemSignle?.order_status : "---"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <GpsFixedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Tracking No
                      </Typography>
                      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                        {getItemSignle?.tracking_no ? getItemSignle?.tracking_no : "---"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <DoorBackOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Address
                      </Typography>
                      <Typography sx={{ fontSize: "14px" }}>{`${getItemSignle?.name}`}</Typography>
                      <Typography sx={{ fontSize: "14px" }}>{`${getItemSignle?.address?.address_line1}, ${getItemSignle?.address?.address_line2}`}</Typography>
                      <Typography sx={{ fontSize: "14px" }}>{`${getItemSignle?.address?.address_line3}- ${getItemSignle?.address?.pincode}, ${getItemSignle?.address?.city}`}</Typography>
                      <Typography sx={{ fontSize: "14px" }}>{`${getItemSignle?.address?.state}, ${getItemSignle?.address?.country}`}</Typography>

                      <Typography sx={{ fontSize: "14px" }}>{`Contact no : ${getItemSignle?.mobile_no} , ${getItemSignle?.alternate_no} `}</Typography>
                      {/* <Typography sx={{fontSize:"14px"}}>{getItemSignle?.alternate_no}</Typography> */}


                      {/* <Typography sx={{fontSize:"14px"}}>{`${row.shippingaddress.addother}`}</Typography> */}
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6} >
                  <Box sx={{ display: "flex" }}>
                    <FlagOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} />
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                        Internal Comment
                      </Typography>
                      <div className={classes.scrollBar} style={{ marginTop: '10px', whiteSpace: 'pre-line', height: '200px', width: '250px', overflow: 'auto', paddingRight: '5px' }}>
                        <p style={{ fontWeight: "100", fontSize: "14px" }}>
                          {getItemSignle?.internal_comments !== '' ? getItemSignle?.internal_comments : "---"}
                        </p>
                      </div>
                    </Box>
                  </Box>
                </Grid>


              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
export default ItemManagementPreview;
