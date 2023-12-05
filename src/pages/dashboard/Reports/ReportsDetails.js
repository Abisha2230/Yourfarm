import React, { useRef, useEffect, useState } from "react";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {
  Container,
  Card,
  TextField,
  Box,
  Grid,
  Stack,
  MenuItem,
} from "@mui/material";
import { PATH_DASHBOARD } from "../../../routes/paths";
import useSettings from "../../../hooks/useSettings";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { ReportsListDetails } from "src/_apis_/reports";
import TotalOrders from "src/components/_dashboard/reports/TotalOrders";
import PendingOrders from "src/components/_dashboard/reports/PendingOrders";
import TotalEarning from "src/components/_dashboard/reports/TotalEarning";
import TotalDelivery from "src/components/_dashboard/reports/TotalDelivery";
import { useNavigate } from "react-router-dom";
import TotalCustomer from "src/components/_dashboard/reports/TotalCustomer";
import ExportExcel from "src/components/_dashboard/reports/excelexport";
import "./order.css";
import FaceBook from "src/components/_dashboard/DataReports/FaceBook"
import GoogleAds from "src/components/_dashboard/DataReports/GoogleAds";
import GooglePlay from "src/components/_dashboard/DataReports/GooglePlay";
import Notset from "src/components/_dashboard/DataReports/Notset";
import Whatsapp from "src/components/_dashboard/DataReports/Whatsapp";
import Yfdm from "src/components/_dashboard/DataReports/Yfdm";
import TimeOut from "src/components/_dashboard/DataReports/TimeOut";
import FollowUp from "src/components/_dashboard/DataReports/FollowUp"
const ReportsDetails = () => {
  const { themeStretch } = useSettings();
  const tempFun = useRef();
  const navigate = useNavigate();
  const [multipleAuth, setMultipleAuth] = useState(false);
  const [Datavalue, setDataValue] = React.useState([null, null]);

  const [value, setValue] = React.useState([null, null]);
  const [isFilter, setIsfilter] = useState(true);
  const [isDataFilter, setIsDatafilter] = useState(true);
  const [fromDate, setfromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [exportele, setExport] = useState(false);
  const [dropValue, setDropvalue] = useState(-1);
  const isMountedRef = useIsMountedRef();
  const Tokens = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const [user, setuser] = useState(localStorage.getItem("Role"));

  const [ReportsData, setReportsData] = React.useState([]);
  const [ReportsData1, setReportsData1] = React.useState([]);
  var from = useRef();
  var to = useRef();
  var payment_type = useRef();

  const orderStatus = [
    {
      value: -1,
      label: "All",
    },
    {
      value: 0,
      label: "App Installer Reports",
    },
    {
      value: 1,
      label: "Online Pay",
    },
  ];

  const DataStatus = [
    {
      value:0,
      label:'FaceBook'
    },
    {
      value:1,
      label:'Google Ads'
    },
    {
      value:2,
      label:'Google Play'
    },
    {
      value:3,
      label:'Not % 20 set'
    },
    {
      value:4,
      label:'YF - DM '
    },
    {
      value:5,
      label:'Whatsapp'
    }
  ]

  const getReportItems = async () => {
    // if(fromDate!==""&&toDate!==""&&fromDate!==NaN+"-"+NaN+"-"+NaN&&toDate!==NaN+"-"+NaN+"-"+NaN){
    const res = await ReportsListDetails.getReportList(Tokens, {
      from_date: from.current,
      to_date: to.current,
      payment_type: payment_type.current,
    });
    console.log(res.data);
    if (isMountedRef.current) {
      if (res.status === 200 && res?.data?.code === 200) {
        console.log(
          JSON.stringify(res?.data?.data) +
            "res.data.datares.data.datares.data.datares.data.data"
        );

        res?.data?.data?.data?.forEach((ele) => {
          switch (ele.payment_status) {
            case 1:
              ele.payment_status = "Success";
              break;
            case 2:
              ele.payment_status = "Failure";
              break;
            case 3:
              ele.payment_status = "Pending";
              break;
            default:
              ele.payment_status = "error code";
          }
          ele.payment_type =
            ele.payment_type === 0 ? "Cash On Delivery" : "Online";
          switch (ele.order_status) {
            case 1:
              ele.order_status = "Pending";
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
            case 5:
              ele.order_status = "Rejected";
              break;
            case 6:
              ele.order_status = "Verified";
              break;
            case 7:
              ele.order_status = "Cancelled";
              break;
            default:
              ele.order_status = "error code";
          }
          // console.log(ele);
          ele.order_items = JSON.stringify(ele.order_items);
        });
        if (isMountedRef.current) {
          setReportsData(res.data.data);
        }
      }
    } else if (
      res?.response?.status >= 400 &&
      res?.response?.statusText === "Unauthorized"
    ) {
      console.log(
        res?.response?.status >= 400 &&
          res?.response?.statusText === "Unauthorized",
        "sdfd"
      );
      setMultipleAuth(true);
    }

    // const getReportPickItems=async()=>{
    const res1 = await ReportsListDetails.getReportPickList(Tokens, {
      from_date: from.current,
      to_date: to.current,
      payment_type: payment_type.current,
    });
    console.log(res1.data);

    setReportsData1(res1.data);
    // if(isMountedRef.current){
    //   if(res1.status===200&&res?.data?.code===200){
    //     console.log(JSON.stringify(res1.data.data.data)+"res.data.datares.data.datares.data.datares.data.data")
    //     res1.data.data.data.map((i,index)=>{
    //       res1.data.data.data.forEach(t=>{
    //         t.id=index+1;
    //       });
    //       return(i)
    //     })
    //     res1.data.data.data.forEach(ele=>{
    //       switch (ele.payment_status) {
    //         case 1:
    //           ele.payment_status = "Success";
    //           break;
    //         case 2:
    //           ele.payment_status = "Failure";
    //           break;
    //           case 3:
    //           ele.payment_status = "Pending";
    //           break;
    //           default:
    //           ele.payment_status = "error code";
    //       };
    //       ele.payment_type = ele.payment_type === 0 ? 'Cash On Delivery' : 'Online';
    //       switch(ele.order_status){
    //         case 1:
    //           ele.order_status = "Pending";
    //           break;
    //           case 2:
    //             ele.order_status = "On The Way";
    //             break;
    //             case 3:
    //               ele.order_status = "Delivered";
    //               break;
    //               case 4:
    //                 ele.order_status = "Accepted";
    //                 break;
    //                 case 5:
    //                   ele.order_status = "Rejected";
    //                   break;
    //                   case 6:
    //                   ele.order_status = "Verified";
    //                   break;
    //                   case 7:
    //                   ele.order_status = "Cancelled";
    //                   break;
    //                 default:
    //                 ele.order_status = "error code";
    //       }
    //      })
    //      if(isMountedRef.current){
    //       setReportsData1(res1.data.data);
    //     }
    //   }    }
    //   else if(res1?.response?.status>=400&&res1?.response?.statusText==="Unauthorized"){
    //     console.log(res?.response?.status>=400&&res?.response?.statusText==="Unauthorized","sdfd");
    //     setMultipleAuth(true)
    //    }
  };
  tempFun.current = getReportItems;

  useEffect(() => {
    if (value?.[0] !== null && value?.[1] !== null) {
      from.current =
        new Date(value?.[0]).getFullYear() +
        "-" +
        Number(new Date(value?.[0]).getMonth() + 1)
          .toString()
          .padStart(2, "0") +
        "-" +
        new Date(value?.[0]).getDate().toString().padStart(2, "0");
      to.current =
        new Date(value?.[1]).getFullYear() +
        "-" +
        Number(new Date(value?.[1]).getMonth() + 1)
          .toString()
          .padStart(2, "0") +
        "-" +
        new Date(value?.[1]).getDate().toString().padStart(2, "0");
      setIsfilter(true);
      // setfromDate (new Date(value?.[0]).getFullYear()+"-"+Number(new Date(value?.[0]).getMonth()+1).toString().padStart(2, "0")+"-"+new Date(value?.[0]).getDate().toString().padStart(2, "0"));
      // setToDate(new Date(value?.[1]).getFullYear()+"-"+Number(new Date(value?.[1]).getMonth()+1).toString().padStart(2, "0")+"-"+new Date(value?.[1]).getDate().toString().padStart(2, "0"));
    } else {
      from.current = undefined;
      to.current = undefined;
    }
  }, [value]);
  const onfilter = () => {
    if (
      (from.current !== undefined && to.current !== undefined) ||
      payment_type.current !== undefined
    ) {
      getReportItems();

      setIsfilter(false);
      if (from.current !== undefined && to.current !== undefined) {
        setExport(true);
      }
    }
  };
  const onDataSearch = () => {
    setIsDatafilter(false);
  };

  const onCancel = () => {
    // window.location.reload()
    setExport(false);
    setValue([null, null]);
    setIsfilter(true);
    setDropvalue(-1);
    from.current = undefined;
    to.current = undefined;
    payment_type.current = undefined;
    // order_Status.current = undefined;
    getReportItems();
  };
  const onDataCancel = () => {
    setIsDatafilter(true);
  };
  useEffect(() => {
    tempFun.current();
  }, []);
  useEffect(() => {
    if (multipleAuth === true) {
      navigate("/");
    }
  }, [multipleAuth, navigate]);
  const datea = [
    {
      first: "ljhas",
      habkd: "mhba",
    },
    {
      khd: "ljhc",
      jkqhdk: "lqjhd",
    },
  ];

  const event = (e) => {
    if (e !== -1) {
      payment_type.current = e;
      setDropvalue(e);
      setIsfilter(true);
    }
  };

  return (
    <Page title="Reports | Animeta">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Reports"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "Reports",
            },
          ]}
        />
        <Card>
          <Box sx={{ padding: "10px 20px" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="cards">
                <div className="card">
                  <DateRangePicker
                    startText="From Date"
                    endText="To Date"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> - </Box>
                        <TextField {...endProps} />
                      </React.Fragment>
                    )}
                    inputFormat="dd/MM/yyyy"
                  />
                </div>
                <div className="card">
                  <TextField
                    fullWidth
                    id="outlined-select-currency"
                    select
                    label="Payment Type"
                    value={dropValue}
                    onChange={(e) => event(e.target.value)}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {orderStatus.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>
                {/* <div className="card">
        <Stack sx={{mb:"15px",textAlign:"left"}} direction={{ xs: 'column', md: 'row' }} spacing={2}>
   <TextField
                        select
                        fullWidth
                        label="orderStatus"
                        placeholder="orderStatus"
                        // {...getFieldProps("orderStatus")}
                        onChange={(e)=>event(e.target.value)}
                      >
                       <MenuItem value={'0'}>COD</MenuItem>
                        <MenuItem value={'1'}>Prepaid</MenuItem>
                      </TextField>
                      </Stack>
        </div> */}
                {/* <div className="card"> */}
                {isFilter ? (
                  <div
                    className="card"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <h3 onClick={() => onfilter()} className="button">
                      Filter
                    </h3>
                  </div>
                ) : (
                  <div
                    className="card"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <h3 onClick={() => onCancel()} className="cancelbutton">
                      Cancel
                    </h3>
                  </div>
                )}
                {/* <h1 onClick={()=>getReportItems()}>Button</h1> */}
                {/* </div> */}
              </div>
              {user === "Admin" && (
                <ExportExcel
                  exportele={exportele}
                  exceldata={ReportsData?.data}
                  exceldata1={ReportsData1}
                  filename={"Export"}
                  from={from.current}
                  to={to.current}
                />
              )}
              {user === "Dispatch" && (
                <ExportExcel
                  exportele={exportele}
                  exceldata={ReportsData?.data}
                  exceldata1={ReportsData1}
                  filename={"Export"}
                  from={from.current}
                  to={to.current}
                />
              )}
              {user === "CRM" && (
                <ExportExcel
                  exportele={exportele}
                  exceldata={ReportsData?.data}
                  exceldata1={ReportsData1}
                  filename={"Export"}
                  from={from.current}
                  to={to.current}
                />
              )}
            </LocalizationProvider>
          </Box>
          <Box sx={{ mx: "15px", my: "10px" }}>
            <Grid container spacing={2}>
              <Grid item lg={3} md={4} sm={6}>
                <TotalOrders
                  TotalOrderNo={
                    ReportsData?.total_orders ? ReportsData?.total_orders : 0
                  }
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <PendingOrders
                  PendingOrderNo={
                    ReportsData?.pending_orders
                      ? ReportsData?.pending_orders
                      : 0
                  }
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <TotalEarning
                  TotalEarningNo={
                    ReportsData?.total_earnings
                      ? ReportsData?.total_earnings
                      : 0
                  }
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <TotalDelivery
                  TotalDeliveryNo={
                    ReportsData?.total_delivery
                      ? ReportsData?.total_delivery
                      : 0
                  }
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <TotalCustomer
                  TotalCustomerNo={
                    ReportsData?.total_customers
                      ? ReportsData?.total_customers
                      : 0
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Card>

        {/* SECOND PART OF REPORT */}

        <Card sx={{ marginTop: "10rem" }}>
          <Box sx={{ padding: "20px 30px" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="cards">
                <div className="card">
                  <DateRangePicker
                    startText="From Date"
                    endText="To Date"
                    value={Datavalue}
                    onChange={(data) => {
                      setDataValue(data);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> - </Box>
                        <TextField {...endProps} />
                      </React.Fragment>
                    )}
                    inputFormat="dd/MM/yyyy"
                  />
                </div>
                <div className="card">
                  <TextField
                    fullWidth
                    id="outlined-select-currency"
                    select
                    label="Data - Type"
                    value={dropValue}
                    onChange={(e) => event(e.target.value)}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {DataStatus.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>
                {/* <div className="card">
        <Stack sx={{mb:"15px",textAlign:"left"}} direction={{ xs: 'column', md: 'row' }} spacing={2}>
   <TextField
                        select
                        fullWidth
                        label="orderStatus"
                        placeholder="orderStatus"
                        // {...getFieldProps("orderStatus")}
                        onChange={(e)=>event(e.target.value)}
                      >
                       <MenuItem value={'0'}>COD</MenuItem>
                        <MenuItem value={'1'}>Prepaid</MenuItem>
                      </TextField>
                      </Stack>
        </div> */}
                {/* <div className="card"> */}
                {isDataFilter ? (
                  <div
                    className="card"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <h3 onClick={() => onDataSearch()} className="button">
                      Search
                    </h3>
                  </div>
                ) : (
                  <div
                    className="card"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <h3 onClick={() => onDataCancel()} className="cancelbutton">
                      Cancel
                    </h3>
                  </div>
                )}
                {/* <h1 onClick={()=>getReportItems()}>Button</h1> */}
                {/* </div> */}
              </div>
              {user === "Admin" && (
                <ExportExcel
                  // exportele={exportele}
                  // exceldata={ReportsData?.data}
                  // exceldata1={ReportsData1}
                  // filename={"Export"}
                  // from={from.current}
                  // to={to.current}
                />
              )}
              {/* {user === "Dispatch" && (
                <ExportExcel
                  exportele={exportele}
                  exceldata={ReportsData?.data}
                  exceldata1={ReportsData1}
                  filename={"Export"}
                  from={from.current}
                  to={to.current}
                />
              )} */}
              {/* {user === "CRM" && (
                <ExportExcel
                  exportele={exportele}
                  exceldata={ReportsData?.data}
                  exceldata1={ReportsData1}
                  filename={"Export"}
                  from={from.current}
                  to={to.current}
                />
              )} */}
            </LocalizationProvider>
          </Box>
          <Box sx={{ mx: "15px", my: "10px" }}>
            <Grid container spacing={2}>
              <Grid item lg={3} md={4} sm={6}>
                <FaceBook
                  TotalOrderNo={
                    ReportsData?.total_orders ? ReportsData?.total_orders : 0
                  }
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <GoogleAds
                  PendingOrderNo={
                    ReportsData?.pending_orders
                      ? ReportsData?.pending_orders
                      : 0
                  }
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <GooglePlay
                  TotalEarningNo={
                    ReportsData?.total_earnings
                      ? ReportsData?.total_earnings
                      : 0
                  }
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <Notset
                  TotalDeliveryNo={
                    ReportsData?.total_delivery
                      ? ReportsData?.total_delivery
                      : 0
                  }
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <Whatsapp
                  TotalCustomerNo={
                    ReportsData?.total_customers
                      ? ReportsData?.total_customers
                      : 0
                  }
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <Yfdm
                  TotalCustomerNo={
                    ReportsData?.total_customers
                      ? ReportsData?.total_customers
                      : 0
                  }
                />
              </Grid>

              <Grid item lg={3} md={4} sm={6}>
                <TimeOut
                  TotalCustomerNo={
                    ReportsData?.total_customers
                      ? ReportsData?.total_customers
                      : 0
                  }
                />
              </Grid>

              
              <Grid item lg={3} md={4} sm={6}>
                <FollowUp
                  TotalCustomerNo={
                    ReportsData?.total_customers
                      ? ReportsData?.total_customers
                      : 0
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </Page>
  );
};
export default ReportsDetails;
