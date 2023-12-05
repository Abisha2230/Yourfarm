import React, { useState, useEffect, useRef } from "react";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import {
  Container,
  Chip,
  Stack,
  MenuItem,
  Typography,
  Card,
  Box,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  TextField,
  Grid,
} from "@mui/material";
import useSettings from "../../../hooks/useSettings";
import { Link as RouterLink } from "react-router-dom";
import { format } from "date-fns";
import { OrderDetails } from "src/_apis_";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import ResponsiveTable from "src/components/_dashboard/ResponsiveTable";
import { useNavigate } from "react-router-dom";
import { alpha, useTheme } from "@mui/material/styles";
import DateRangePicker from "@mui/lab/DateRangePicker";
import OrderEditTrackNo from "../../../components/_dashboard/order/OrderEditTrackNo";
import OrderEditOrderStatus from "src/components/_dashboard/order/OrderEditOrderStatus";
import OrderEditTransporterId from "src/components/_dashboard/order/OrderEditTransporterId";
import OrderEditSalesPerson from "src/components/_dashboard/order/orderEditSalesPerson";
import OrderEditCommentUpdate from "src/components/_dashboard/order/OrderEditCommentsUpdate";
import OrderEditAdd from "src/components/_dashboard/order/OrderEditAdd";
import { Form, FormikProvider, useFormik } from "formik";
import InputAdornment from "@mui/material/InputAdornment";
import { useParams } from "react-router";

import "./order.css";
import Invoice from "src/components/_dashboard/order/Invoice";

const ServiceProviderDetails = () => {
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const [user, setuser] = useState(localStorage.getItem("Role"));
  const [local, setlocalfilter] = useState(localStorage.getItem("filter"));
  const theme = useTheme();
  const tempFun = useRef();
  const navigate = useNavigate();
  const [serviceProvider, setServiceProvider] = useState([]);
  const [value, setValue] = React.useState(
    window.localStorage.getItem("from") !== null &&
      window.localStorage.getItem("from") !== "null" &&
      window.localStorage.getItem("from") !== undefined &&
      window.localStorage.getItem("from") !== "undefined"
      ? [window.localStorage.getItem("from"), window.localStorage.getItem("to")]
      : [null, null]
  );
  const [dropValue, setDropvalue] = useState(
    window.localStorage.getItem("orderStatus") !== null &&
      window.localStorage.getItem("orderStatus") !== undefined
      ? window.localStorage.getItem("orderStatus")
      : 0
  );
  const [editOrder, setEditOrder] = useState(false);
  const [track, setTrack] = useState(false);
  const [transporter_id, setTransporter] = useState(false);
  const [isFilter, setIsfilter] = useState(false);
  const [comments, setComments] = useState(false);

  const [invoice, setInvoice] = useState(false);
  const [add, setAdd] = useState(false);
  const [salesPerson, setSalesperson] = useState(false);
  const [trakId, setTrackId] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [orderData, setOrderData] = useState("");
  const [isDataempty, setISdataempty] = useState(false);
  // const [iSDataempty, setISDataempty] = useState(false)
  const [trakData, setTrakData] = useState("");
  const [multipleAuth, setMultipleAuth] = useState(false);
  const [startPage, setStartPage] = useState(1);
  const [startPageSize, setStartPageSize] = useState(100);
  const [totalItemCount, setTotalItemCount] = useState("");
  const [selespersonlist, setSalespersonlist] = useState();
  const [searchText, setSearchText] = useState("");

  const [providerList, setProviderList] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [searchId, setSearchId] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchIds, setSearchIds] = useState("");

  const Tokens = JSON.parse(window.localStorage.getItem("Token"))?.useAuth;
  const data = [{ id: 0, name: "Direct" }];
  // const saledata = [...selespersonlist,data]

  const fileId = useParams();

  const getProvidersList = async () => {
    const res = await OrderDetails.getShippingProvidersList(Token);
    setProviderList(res?.data?.data);
    console.log(JSON.stringify(res?.data) + " aaaaaaaaa");
  };
  const getSalesper = async () => {
    const res = await OrderDetails.getSalesperson(Token);
    setSalespersonlist([...data, ...res?.data?.data]);
  };

  useEffect(() => {
    getSalesper();
    getProvidersList();
  }, []);

  const orderStatus = [
    {
      value: 0,
      label: "All",
    },
    {
      value: 1,
      label: "Pending",
    },
    {
      value: 6,
      label: "Verified",
    },

    {
      value: 4,
      label: "Dispatched",
    },

    {
      value: 2,
      label: "On the way",
    },

    {
      value: 3,
      label: "Delivered",
    },
    {
      value: 7,
      label: "Cancelled",
    },
    {
      value: 10,
      label: "Return in Transit",
    },
    {
      value: 9,
      label: "Returned",
    },

    {
      value: 5,
      label: "Rejected",
    },

    {
      value: 8,
      label: "Refunded",
    },
  ];
  // const params1 = ;
  // const params2 = ;

  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  var from = useRef();
  var to = useRef();
  var order_Status = useRef();
  var filter = useRef();

  useEffect(() => {
    if (
      (from.current !== undefined && to.current !== undefined) ||
      order_Status !== undefined
    ) {
      filter.current = "Filter";
    }
  }, [from, to, order_Status]);

  const setdate = async () => {
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
    setIsfilter(false);
    // setfromDate (new Date(value?.[0]).getFullYear()+"-"+Number(new Date(value?.[0]).getMonth()+1).toString().padStart(2, "0")+"-"+new Date(value?.[0]).getDate().toString().padStart(2, "0"));
    // setToDate(new Date(value?.[1]).getFullYear()+"-"+Number(new Date(value?.[1]).getMonth()+1).toString().padStart(2, "0")+"-"+new Date(value?.[1]).getDate().toString().padStart(2, "0"));
    return true;
  };

  useEffect(() => {
    // console.log((value?.[0])+'vaaaaaaaaaaaaaaaaaaa');

    if (value?.[0] !== null && value?.[0] !== "null" && value?.[1] !== null) {
      setdate().then((res) => {});
    } else {
      from.current = undefined;
      to.current = undefined;
    }
  }, [value]);

  useEffect(() => {
    if (dropValue !== 0 && dropValue !== "undefined" && dropValue !== null) {
      order_Status.current = dropValue;
    }
  }, [dropValue]);

  const tableHeaderDataCro = [
    {
      field: "id",
      headerName: "Id",
      width: 70,
      renderCell: (params) => (
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "300" }}
        >{`#${params.value}`}</Typography>
      ),
      valueGetter: (params) => `${params.value}`,
    },
    {
      field: "order_date",
      headerName: "Order Date",
      width: 100,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "300", fontSize: "13px" }}
            >
              {row.date}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "300", fontSize: "13px" }}
            >
              {row.time}
            </Typography>
          </Box>
        );
      },
      valueGetter: (params) => `${params.value}`,
      filterable: true,
    },
    // { field: 'items_count',headerName:"Item Count", width: 150,filterable: false},
    {
      field: "shippingaddress",
      headerName: "Address",
      width: 230,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        // console.log(row.payment_type);
        return (
          <Box>
            <a
              title={`${row?.address?.address_line1}, ${row?.address?.address_line2},${row?.address?.address_line3}, ${row?.address?.city} - ${row?.address?.pincode}, ${row?.address?.state}, ${row?.address?.country}`}
              className="hovaddress"
              onClick={() => {
                onClickAddress(row.location_id, {
                  id: row.id,
                  add1: row?.address?.address_line1,
                  add2: row?.address?.address_line2,
                  add3: row?.address?.address_line3,
                  city: row?.address?.city,
                  pincode: row?.address?.pincode,
                  state: row?.address?.state,
                  country: row?.address?.country,
                });
              }}
              style={{ color: "blue" }}
            >
              <Typography sx={{ fontSize: "13px" }}>
                {`${row?.address?.address_line1}, ${row?.address?.address_line2},`}
                <EditIcon sx={{ fontSize: "12px", marginLeft: "2px" }} />
              </Typography>
              <Typography
                sx={{ fontSize: "13px" }}
              >{`${row?.address?.address_line3}  - ${row?.address?.pincode}, ${row?.address?.city}`}</Typography>
              {/* <Typography sx={{fontSize:"14px"}}>{`${row.state}, ${row.country}`}</Typography> */}
              {/* <Typography sx={{fontSize:"14px"}} style={{color:'blue'}}><EditIcon sx={{fontSize:"12px",marginRight:"2px"}}/></Typography> */}
            </a>
          </Box>
        );
      },
      valueGetter: (params) => `${params.value}`,
    },
    //   { field: 'pincode',headerName:"Pincode", width: 170,filterable: false,
    //   renderCell:(params)=>{
    //     const {row}=params;
    // return(<Typography sx={{fontSize:"13px"}}>{row.pincode}</Typography>)
    //   },
    // },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 130,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        // const onClickPaymentStatus=(statusId,statusTxt,payment_status)

        return (
          <Chip
            onClick={() => {
              {
                onClickOrderStatus(
                  row.orderStatus.statusId,
                  row.orderStatus.statusTxt,
                  row.payment_type
                );
              }
            }}
            label={row.orderStatus.statusTxt}
            sx={{
              height: "26px",
              fontSize: "13px",
              borderRadius: "10px",
              color: row.orderStatus.statusColor,
              backgroundColor: `${alpha(row.orderStatus.statusColor, 0.24)}`,
            }}
          />
        );
      },
      valueGetter: (params) => params.value.statusTxt,
    },

    // { field: 'name',headerName:"User Name", width: 150,sortable:false},
    // { field: 'email',headerName:"Email Id", width: 150,filterable: false},
    // { field: 'mobile_no',headerName:"Phone no", width: 150,filterable: true},

    {
      field: "payment_type",
      headerName: "Payment Type",
      width: 100,
      filterable: false,
      renderCell: (params) => (
        <Typography sx={{ fontSize: "13px" }}> {params.value}</Typography>
      ),
      valueGetter: (params) => `${params.value === 0 ? "COD" : "Online"}`,
    },
    {
      field: "payStatus",
      headerName: "Payment Status",
      width: 100,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "600",
              color: row.payStatus.ChipColor,
            }}
          >
            {" "}
            {row.payStatus.StatusTxt}
          </Typography>

          //  <Chip label={row.payStatus.StatusTxt} sx={{height:"26px",borderRadius:"10px",color:row.payStatus.ChipColor,backgroundColor:`${alpha(row.payStatus.ChipColor, 0.24)}`}} />
        );
      },
      valueGetter: (params) => params.value.StatusTxt,
    },
    //   { field: 'subtotal',headerName:"Subtotal(₹)", width: 170,filterable: false,
    //     renderCell:(params)=>{
    //       const {row}=params;
    //   return(<Typography sx={{fontSize:"13px"}}>{params.value}</Typography>)
    //     },
    //     valueGetter: (params) =>params.value
    //   },

    //   { field: 'shipping_charges',headerName:"Shipping Charges(₹)", width: 170,filterable: false,
    //   renderCell:(params)=>{
    //     const {row}=params;
    // return(<Typography sx={{fontSize:"13px"}}>{params.value}</Typography>)
    //   },
    //   valueGetter: (params) =>params.value

    // },

    //     { field: 'total_amount',headerName:"Total Amount(₹)", width: 170,filterable: false,
    //     renderCell:(params)=>{
    //       const {row}=params;
    //   return(<Typography sx={{fontSize:"13px"}}>{params.value}</Typography>)
    //     },
    //     valueGetter: (params) =>params.value
    //   },

    {
      field: "invoice_url",
      headerName: "Invoice",
      width: 100,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        return (
          <>
            {row.invoice_url !== "" ? (
              <a sx={{ fontSize: "13px" }} href={params.value} target="_blank">
                Download
              </a>
            ) : (
              <a>No Invoice</a>
            )}
          </>
        );
      },
      valueGetter: (params) => `${params.value}`,
    },

    {
      field: "transporter_id",
      headerName: "Transporter Id",
      width: 120,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Chip
            title={row.transporter_id}
            onClick={() => {
              onClickTransporter(row.id, row.transporter_id);
            }}
            label={
              row.transporter_id.length > 15
                ? row.transporter_id.substring(0, 15 - 4) + "..."
                : row.transporter_id
            }
            sx={{
              height: "26px",
              borderRadius: "10px",
              color: row.orderStatus.statusColor,
              backgroundColor: `${alpha(row.orderStatus.statusColor, 0.24)}`,
            }}
          />
        );
      },
      // valueGetter: (params) =>{params.value}
    },
    {
      field: "tracking_no",
      headerName: "Tracking No",
      width: 140,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        return (
          <>
            {params.value === "" ? (
              <>
                {/* <IconButton  onClick={()=>{onClickTrackingNo(params.id,params.value.trackNo)}}><EditIcon sx={{fontSize:"12px",marginRight:"2px"}}/></IconButton> */}
                <Typography
                  className="hovaddress"
                  onClick={() => {
                    onClickTrackingNo(params.id, params.value.trackNo);
                  }}
                  sx={{ fontSize: "13px", color: "blue" }}
                >
                  Add Tracking
                </Typography>
              </>
            ) : (
              <>
                {" "}
                <IconButton
                  onClick={() => {
                    onClickTrackingNo(params.id, params.value.trackNo);
                  }}
                >
                  <EditIcon sx={{ fontSize: "12px", marginRight: "2px" }} />
                </IconButton>
                <Typography
                  onClick={() => {
                    onClickTrackingNo(params.id, params.value.trackNo);
                  }}
                  title={params.value}
                  sx={{ fontSize: "13px" }}
                >
                  {params.value}
                </Typography>
              </>
            )}
            {/* <IconButton onClick={()=>{openPopUp(params.value.editId,params.value.trackNo);setTrack(true)}}><EditIcon sx={{fontSize:"12px",marginRight:"2px"}}/></IconButton> */}
          </>
        );
      },
    },

    {
      field: "internal_comments",
      headerName: "Internal Comments",
      width: 170,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        return (
          <>
            {/* <TextField value={row.internal_comments}></TextField> */}
            <IconButton
              onClick={() => {
                OrderInternalCommentsPopup(row.id, row.internal_comments);
                setComments(true);
              }}
            >
              <EditIcon sx={{ fontSize: "12px", marginRight: "2px" }} />
            </IconButton>
            {/* <Chip  onClick={()=>{OrderInternalCommentsPopup(row.id,row.internal_comments);setComments(true)}} label={row.internal_comments.length > 20 ? row.internal_comments.substring(0, 20 - 5) + "..." : row.internal_comments} sx={{height:"26px",borderRadius:"10px",color: row.internal_comments !== 'No Comment' ? theme.palette.info.dark :theme.palette.warning.dark,backgroundColor:row.internal_comments === 'No Comments' ? (theme.palette.info.dark,0.24) :(theme.palette.warning.dark,0.24)}} /> */}
            <Typography
              onClick={() => {
                OrderInternalCommentsPopup(row.id, row.internal_comments);
                setComments(true);
              }}
              sx={{ fontSize: "12px" }}
            >
              {row.internal_comments.length > 20
                ? row.internal_comments.substring(0, 20 - 5) + "..."
                : row.internal_comments}
            </Typography>
          </>
        );
      },
      // valueGetter: (params) =>{params.value}
    },
    {
      field: "orderId",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex" }}>
          <IconButton
            component={RouterLink}
            to={`${PATH_DASHBOARD.order.preview}/${params.value.editId}`}
          >
            <RemoveRedEyeIcon sx={{ fontSize: "20px", marginRight: "4px" }} />
          </IconButton>
        </Box>
      ),
      filterable: false,
      disableExport: true,
    },
  ];

  const tableHeaderData = [
    {
      field: "id",
      headerName: "Id",
      width: 70,
      renderCell: (params) => (
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "300" }}
        >{`#${params.value}`}</Typography>
      ),
      valueGetter: (params) => `${params.value}`,
    },

    {
      field: "order_date",
      headerName: "Order Date",
      width: 100,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "300", fontSize: "13px" }}
            >
              {row.date}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "300", fontSize: "13px" }}
            >
              {row.time}
            </Typography>
          </Box>
        );
      },
      valueGetter: (params) => `${params.value}`,
      filterable: true,
    },
    // { field: 'items_count',headerName:"Item Count", width: 150,filterable: false},
    {
      field: "shippingaddress",
      headerName: "Address",
      width: 230,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        // console.log(JSON.stringify(row.address)+'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        return (
          <Box>
            <a
              title={`${row?.address?.address_line1}, ${row?.address?.address_line2},${row?.address?.address_line3}, ${row?.address?.city} - ${row?.address?.pincode}, ${row?.address?.state}, ${row?.address?.country}`}
              className="hovaddress"
              onClick={() => {
                onClickAddress(row.location_id, {
                  id: row.id,
                  add1: row?.address?.address_line1,
                  add2: row?.address?.address_line2,
                  add3: row?.address?.address_line3,
                  city: row?.address?.city,
                  pincode: row?.address?.pincode,
                  state: row?.address?.state,
                  country: row?.address?.country,
                });
              }}
              style={{ color: "blue" }}
            >
              <Typography sx={{ fontSize: "13px" }}>
                {`${row?.address?.address_line1}, ${row?.address?.address_line2},`}
                <EditIcon sx={{ fontSize: "12px", marginLeft: "2px" }} />
              </Typography>
              <Typography
                sx={{ fontSize: "13px" }}
              >{`${row?.address?.address_line3}  - ${row?.address?.pincode}, ${row?.address?.city}`}</Typography>
              {/* <Typography sx={{fontSize:"14px"}}>{`${row.state}, ${row.country}`}</Typography> */}
              {/* <Typography sx={{fontSize:"14px"}} style={{color:'blue'}}><EditIcon sx={{fontSize:"12px",marginRight:"2px"}}/></Typography> */}
            </a>
          </Box>
        );
      },
      valueGetter: (params) => `${params.value}`,
    },
    //   { field: 'pincode',headerName:"Pincode", width: 170,filterable: false,
    //   renderCell:(params)=>{
    //     const {row}=params;
    // return(<Typography sx={{fontSize:"13px"}}>{row.pincode}</Typography>)
    //   },
    // },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 130,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Chip
            onClick={() => {
              onClickOrderStatus(
                row.orderStatus.statusId,
                row.orderStatus.statusTxt,
                row.payment_type
              );
            }}
            label={row.orderStatus.statusTxt}
            sx={{
              height: "26px",
              fontSize: "13px",
              borderRadius: "10px",
              color: row.orderStatus.statusColor,
              backgroundColor: `${alpha(row.orderStatus.statusColor, 0.24)}`,
            }}
          />
        );
      },
      valueGetter: (params) => params.value.statusTxt,
    },

    // { field: 'name',headerName:"User Name", width: 150,sortable:false},
    // { field: 'email',headerName:"Email Id", width: 150,filterable: false},
    // { field: 'mobile_no',headerName:"Phone no", width: 150,filterable: true},

    {
      field: "payment_type",
      headerName: "Payment Type",
      width: 100,
      filterable: false,
      renderCell: (params) => (
        <Typography sx={{ fontSize: "13px" }}> {params.value}</Typography>
      ),
      valueGetter: (params) => `${params.value === 0 ? "COD" : "Online"}`,
    },
    {
      field: "payStatus",
      headerName: "Payment Status",
      width: 100,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "600",
              color: row.payStatus.ChipColor,
            }}
          >
            {" "}
            {row.payStatus.StatusTxt}
          </Typography>

          //  <Chip label={row.payStatus.StatusTxt} sx={{height:"26px",borderRadius:"10px",color:row.payStatus.ChipColor,backgroundColor:`${alpha(row.payStatus.ChipColor, 0.24)}`}} />
        );
      },
      valueGetter: (params) => params.value.StatusTxt,
    },
    //   { field: 'subtotal',headerName:"Subtotal(₹)", width: 170,filterable: false,
    //     renderCell:(params)=>{
    //       const {row}=params;
    //   return(<Typography sx={{fontSize:"13px"}}>{params.value}</Typography>)
    //     },
    //     valueGetter: (params) =>params.value
    //   },

    //   { field: 'shipping_charges',headerName:"Shipping Charges(₹)", width: 170,filterable: false,
    //   renderCell:(params)=>{
    //     const {row}=params;
    // return(<Typography sx={{fontSize:"13px"}}>{params.value}</Typography>)
    //   },
    //   valueGetter: (params) =>params.value

    // },

    //     { field: 'total_amount',headerName:"Total Amount(₹)", width: 170,filterable: false,
    //     renderCell:(params)=>{
    //       const {row}=params;
    //   return(<Typography sx={{fontSize:"13px"}}>{params.value}</Typography>)
    //     },
    //     valueGetter: (params) =>params.value
    //   },

    {
      field: "invoice_url",
      headerName: "Invoice",
      width: 100,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        return (
          <>
            {row.invoice_url !== "" ? (
              <a sx={{ fontSize: "13px" }} href={params.value} target="_blank">
                Download
              </a>
            ) : (
              <a>No Invoice</a>
            )}
          </>
        );
      },
      valueGetter: (params) => `${params.value}`,
    },
    // {
    //   field: 'sales_person', headerName: "Sales Person", width: 120, filterable: false,
    //   renderCell: (params) => {
    //     const { row } = params;
    //     const seles = selespersonlist?.filter((item) => item.id == row.sales_person)
    //     if (seles && seles.length > 0) {
    //       return (<Chip onClick={() => { onClickSalesPerson(row.id, row.sales_person) }}
    //         label={seles[0]?.name === undefined ? 'Direct' : seles[0]?.name}
    //         sx={{
    //           height: "26px", fontSize: '13px', borderRadius: "10px",
    //           color: row.orderStatus.statusColor, backgroundColor: `${alpha(row.orderStatus.statusColor, 0.24)}`
    //         }} />
    //       )
    //     }
    //   },
    //   // valueGetter: (params) =>{params.value}

    // },

    {
      field: "sales_person",
      headerName: "Sales Person",
      width: 120,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        const seles = selespersonlist?.filter(
          (item) => item.id == row.sales_person
        );
        return (
          <Chip
            onClick={() => {
              onClickSalesPerson(row.id, row.sales_person);
            }}
            label={seles[0]?.name === undefined ? "Direct" : seles[0]?.name}
            sx={{
              height: "26px",
              fontSize: "13px",
              borderRadius: "10px",
              color: row.orderStatus.statusColor,
              backgroundColor: `${alpha(row.orderStatus.statusColor, 0.24)}`,
            }}
          />
        );
      },
      // valueGetter: (params) =>{params.value}
    },
    // {
    //   field: 'transporter_id', headerName: "Transporter Id", width: 120, filterable: false,
    //   renderCell: (params) => {
    //     const { row } = params;
    //     const seles = selespersonlist?.filter((item) => item.id === row.sales_person);

    //     // Check if seles is defined and not an empty array
    //     if (seles && seles.length > 0) {
    //       return (
    //         <Chip
    //           onClick={() => { onClickTransporter(row.id, row.sales_person) }}
    //           label={seles[0]?.name === undefined ? 'Direct' : seles[0]?.name}
    //           sx={{
    //             height: "26px",
    //             fontSize: '13px',
    //             borderRadius: "10px",
    //             color: row.orderStatus.statusColor,
    //             backgroundColor: `${alpha(row.orderStatus.statusColor, 0.24)}`,
    //           }}
    //         />
    //       );
    //     } else {
    //       return (
    //         <Chip
    //           onClick={() => { onClickTransporter(row.id, row.sales_person) }}
    //           label="Direct"
    //           sx={{
    //             height: "26px",
    //             fontSize: '13px',
    //             borderRadius: "10px",
    //             color: row.orderStatus.statusColor,
    //             backgroundColor: `${alpha(row.orderStatus.statusColor, 0.24)}`,
    //           }}
    //         />
    //       );
    //     }
    //   },

    // },
    {
      field: "transporter_id",
      headerName: "Transporter Id",
      width: 120,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        const provider = providerList?.filter(
          (item) => item.id == row.transporter_id
        );
        console.log("provider:" + JSON.stringify(provider));
        return (
          <Chip
            title={row.transporter_id}
            onClick={() => {
              onClickTransporter(row.id, row.transporter_id);
            }}
            label={
              provider[0]?.name.length > 15
                ? provider[0]?.name.substring(0, 15 - 4) + "..."
                : provider[0]?.name
            }
            sx={{
              height: "26px",
              borderRadius: "10px",
              backgroundColor: `${alpha(row.orderStatus.statusColor, 0.24)}`,
              color: row.orderStatus.statusColor,
            }}
          />
        );
      },
    },
    {
      field: "tracking_no",
      headerName: "Tracking No",
      width: 140,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        return (
          <>
            {params.value === "" ? (
              <>
                {/* <IconButton  onClick={()=>{onClickTrackingNo(params.id,params.value.trackNo)}}><EditIcon sx={{fontSize:"12px",marginRight:"2px"}}/></IconButton> */}
                <Typography
                  className="hovaddress"
                  onClick={() => {
                    onClickTrackingNo(params.id, params.value.trackNo);
                  }}
                  sx={{ fontSize: "13px", color: "blue" }}
                >
                  Add Tracking
                </Typography>
              </>
            ) : (
              <>
                {" "}
                <IconButton
                  onClick={() => {
                    onClickTrackingNo(params.id, params.value.trackNo);
                  }}
                >
                  <EditIcon sx={{ fontSize: "12px", marginRight: "2px" }} />
                </IconButton>
                <Typography
                  onClick={() => {
                    onClickTrackingNo(params.id, params.value.trackNo);
                  }}
                  title={params.value}
                  sx={{ fontSize: "13px" }}
                >
                  {params.value}
                </Typography>
              </>
            )}
            {/* <IconButton onClick={()=>{openPopUp(params.value.editId,params.value.trackNo);setTrack(true)}}><EditIcon sx={{fontSize:"12px",marginRight:"2px"}}/></IconButton> */}
          </>
        );
      },
    },

    {
      field: "internal_comments",
      headerName: "Internal Comments",
      width: 170,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        return (
          <>
            {/* <TextField value={row.internal_comments}></TextField> */}
            <IconButton
              onClick={() => {
                OrderInternalCommentsPopup(row.id, row.internal_comments);
                setComments(true);
              }}
            >
              <EditIcon sx={{ fontSize: "12px", marginRight: "2px" }} />
            </IconButton>
            {/* <Chip  onClick={()=>{OrderInternalCommentsPopup(row.id,row.internal_comments);setComments(true)}} label={row.internal_comments.length > 20 ? row.internal_comments.substring(0, 20 - 5) + "..." : row.internal_comments} sx={{height:"26px",borderRadius:"10px",color: row.internal_comments !== 'No Comment' ? theme.palette.info.dark :theme.palette.warning.dark,backgroundColor:row.internal_comments === 'No Comments' ? (theme.palette.info.dark,0.24) :(theme.palette.warning.dark,0.24)}} /> */}
            <Typography
              onClick={() => {
                OrderInternalCommentsPopup(row.id, row.internal_comments);
                setComments(true);
              }}
              sx={{ fontSize: "12px" }}
            >
              {row.internal_comments.length > 20
                ? row.internal_comments.substring(0, 20 - 5) + "..."
                : row.internal_comments}
            </Typography>
          </>
        );
      },
      // valueGetter: (params) =>{params.value}
    },
    {
      field: "orderId",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex" }}>
          <IconButton
            component={RouterLink}
            to={`${PATH_DASHBOARD.order.preview}/${params.value.editId}`}
          >
            <RemoveRedEyeIcon sx={{ fontSize: "20px", marginRight: "4px" }} />
          </IconButton>
        </Box>
      ),
      filterable: false,
      disableExport: true,
    },
  ];
  const getProvider = async () => {
    var params;
    // if(from.current!== undefined && to.current!== undefined && from.current!==""&&to.current!==""&&from.current!==NaN+"-"+NaN+"-"+NaN&&to.current!==NaN+"-"+NaN+"-"+NaN){

    if (order_Status.current !== 0 && order_Status !== undefined) {
      params = {
        skip: startPage,
        limit: startPageSize,
        from_date: from.current,
        to_date: to.current,
        order_status:
          order_Status.current !== 0 &&
          order_Status !== undefined &&
          order_Status.current,
      };
    } else {
      params = {
        skip: startPage,
        limit: startPageSize,
        from_date: from.current,
        to_date: to.current,
      };
    }
    console.log(JSON.stringify(params) + "paaaaaaaaaaaaaaaaaaaa");
    // }
    // else{
    //    params={
    //     skip:startPage,
    //     limit:startPageSize,
    //     order_status:order_Status.current
    //   }
    //  }
    const res = await OrderDetails.getOrdersList(Token, params);
    console.log(res);

    // if(res.status === 200 && res.data.total_count === 0){
    //   setTotalItemCount(0);
    //   setServiceProvider([]);
    // }else

    if (res.status === 200) {
      setTotalItemCount(res.data.total_count);
      if (res.data.total_count === 0) {
        setServiceProvider([]);

        setISdataempty(true);
      } else {
        res.data.data.forEach((ele) => {
          ele.internal_comments =
            ele.internal_comments === "" ? "No Comment" : ele.internal_comments;
          ele.date = format(new Date(ele.order_date), "yyyy-MM-dd");
          console.log(ele.order_date);
          ele.time = format(new Date(ele.order_date), "hh:mm aaaaa'm'");
          if (
            ele.address &&
            ele.address.address_line1 &&
            ele.address.address_line2 &&
            ele.address.city &&
            ele.address.pincode &&
            ele.address.state &&
            ele.address.country
          ) {
            ele.shippingaddress = `${ele.address.address_line1}, ${ele.address.address_line2}, ${ele.address.city} - ${ele.address.pincode}, ${ele.address.state}, ${ele.address.country}`;
          } else if (
            ele.address_line1 &&
            ele.address_line2 &&
            ele.city &&
            ele.pincode &&
            ele.state &&
            ele.country
          ) {
            ele.shippingaddress = `${ele.address_line1}, ${ele.address_line2}, ${ele.city} - ${ele.pincode}, ${ele.state}, ${ele.country}`;
          } else {
            ele.shippingaddress = "Invalid Address Data";
          }
          console.log(ele.shippingaddress);
          switch (ele.payment_status) {
            case 0:
              ele.payment_status = "Success";
              ele.color = theme.palette.info.dark;
              break;

            case 1:
              ele.payment_status = "Success";
              ele.color = theme.palette.info.dark;
              break;
            case 2:
              ele.payment_status = "Failure";
              ele.color = theme.palette.success.dark;
              break;
            case 3:
              ele.payment_status = "Pending";
              ele.color = theme.palette.error.dark;
              break;
            default:
              ele.payment_status = "error code";
              ele.color = theme.palette.error.dark;
          }

          switch (ele.order_status) {
            case 1:
              ele.order_status = "Pending";
              ele.colors = theme.palette.warning.dark;
              break;
            case 2:
              ele.order_status = "On The Way";
              ele.colors = theme.palette.info.dark;
              break;
            case 3:
              ele.order_status = "Delivered";
              ele.colors = theme.palette.success.main;
              break;
            case 4:
              ele.order_status = "Dispatched";
              ele.colors = theme.palette.success.dark;
              break;
            case 5:
              ele.order_status = "Rejected";
              ele.colors = theme.palette.error.dark;
              break;
            case 6:
              ele.order_status = "Verified";
              ele.colors = theme.palette.error.dark;
              break;
            case 7:
              ele.order_status = "Cancelled";
              ele.colors = theme.palette.error.dark;
              break;

            case 8:
              ele.order_status = "Refunded";
              ele.colors = theme.palette.error.dark;
              break;
            case 9:
              ele.order_status = "Returned";
              ele.colors = theme.palette.error.dark;
              break;
            case 10:
              ele.order_status = "Return in Transit";
              ele.colors = theme.palette.error.dark;
              break;

            default:
              ele.order_status = "error code";
              ele.colors = theme.palette.error.dark;
          }

          ele.orderId = {
            editId: ele.id,
            trackNo: ele.tracking_no,
          };

          ele.orderStatus = {
            statusTxt: ele.order_status,
            statusColor: ele.colors,
            statusId: ele.id,
          };
          ele.payStatus = {
            StatusTxt: ele.payment_status,
            ChipColor: ele.color,
          };
          ele.tracking_no =
            ele.tracking_no === "undefined" || ele.tracking_no === "null"
              ? ""
              : ele.tracking_no;
          ele.createdAt = new Date(ele.created_at);

          delete ele.payment_status;
          delete ele.color;
          delete ele.order_status;
          delete ele.colors;
        });
        if (isMountedRef.current) {
          setServiceProvider(res.data.data);
        }
      }
    } else if (
      res?.response?.status >= 400 &&
      res?.response?.statusText === "Unauthorized"
    ) {
      setMultipleAuth(true);
    } else if (res?.response?.status === 422) {
      setServiceProvider([]);
      setISdataempty(true);
      // Handle the case where the status is 422
      // setServiceProvider([]); // Clear the data
      // setISdataempty(true); // Set data as empty
    } else {
    }
  };
  tempFun.current = getProvider;

  const onClickAddress = (id, data) => {
    if (
      user === "Admin" ||
      user === "Dispatch" ||
      user === "Cro" ||
      user === "Verifier" ||
      user === "Cro Listing"
    ) {
      OrderAddresspopup(id, data);
      setAdd(true);
    }
  };

  const onClickTrackingNo = (editId, trackNo) => {
    if (user === "Admin" || user === "Dispatch" || user === "CRM") {
      openPopUp(editId, trackNo);
      setTrack(true);
    }
  };

  const onClickTransporter = (id, transporter_id) => {
    if (user === "Admin" || user === "Dispatch" || user === "CRM") {
      OrderTRansporterPopup(id, transporter_id);
      setTransporter(true);
    }
  };

  const onClickSalesPerson = (id, sales_person) => {
    if (user === "Admin" || user === "Dispatch" || user === "CRM") {
      OrderSalespersonPopup(id, sales_person);
      setSalesperson(true);
    }
  };
  const onClickInvoice = () => {
    if (user === "Admin") {
      setInvoice(true);
    }
  };

  const onClickOrderStatus = (statusId, statusTxt, paymentType) => {
    console.log(statusId, statusTxt);
    setPaymentType(paymentType);
    if (user === "Admin" || user === "Dispatch" || user === "CRM") {
      // console.log(statusId,statusTxt)
      OrderPopup(statusId, statusTxt, paymentType);
      setTrack(false);
    }
    if (
      user === "Verifier" &&
      (statusTxt === "Pending" || statusTxt === "Verified")
    ) {
      OrderPopup(statusId, statusTxt, paymentType);
      setTrack(false);
    }
  };

  const onfilter = () => {
    console.log(from);
    if (
      (from.current !== undefined && to.current !== undefined) ||
      order_Status.current !== undefined
    ) {
      window.localStorage.setItem("from", value[0]);
      window.localStorage.setItem("to", value[1]);
      window.localStorage.setItem("orderStatus", order_Status.current);
      window.localStorage.setItem("filter", false);
      getProvider();
      setIsfilter(true);

      // window.location.reload()
      window.localStorage.setItem("filterSearch", true);
    } else if (
      (from.current !== "" && to.current !== "undefined") ||
      order_Status.current !== undefined
    ) {
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No data Found
      </div>;
    }
    // else{
    //   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No data Found</div>

    // }
  };

  const event = (e) => {
    // order_Status.current = e
    setDropvalue(e);
    // const inital = {order_Status : e}
    // formik.setValues({...inital})
    window.localStorage.setItem("filter", true);
    setIsfilter(false);
  };
  const onCancel = () => {
    // window.location.reload()
    // navigate("/")
    // navigate("/order");
    window.localStorage.setItem("from", undefined);
    window.localStorage.setItem("to", undefined);
    window.localStorage.setItem("orderStatus", undefined);
    window.localStorage.setItem("filter", true);
    setValue([null, null]);
    setIsfilter(false);
    from.current = undefined;
    to.current = undefined;
    setDropvalue(0);
    order_Status.current = undefined;
    getProvider();
  };

  const popUpEditClose = () => {
    setEditOrder(false);
    getProvider();
  };
  const popUpTransporterEditClose = () => {
    setTransporter(false);
    getProvider();
  };
  const popupSalespersonClose = () => {
    setSalesperson(false);
    getProvider();
  };
  const popupCommentClose = () => {
    setComments(false);
    getProvider();
  };
  const popupInvoiceClose = () => {
    setInvoice(false);
    getProvider();
  };

  const popupAddClose = () => {
    setAdd(false);
    getProvider();
  };
  const openPopUp = (id, Trk) => {
    setEditOrder(true);
    setTrackId(id);
    setTrakData(Trk);
  };
  const OrderPopup = (id, Trk, pay) => {
    // console.log(pay+'&& (Trk !== "Cancelled" && paymentType !== 0)')
    if (Trk !== "Rejected" && Trk !== "Delivered") {
      if ((Trk === "Cancelled" && paymentType == 0) || Trk === "Refunded") {
      } else {
        setEditOrder(true);
      }
    }

    setTrackId(id);
    switch (Trk) {
      case "Pending":
        Trk = 1;
        break;
      case "On The Way":
        Trk = 2;
        break;
      case "Delivered":
        Trk = 3;
        break;
      case "Dispatched":
        Trk = 4;
        break;
      case "Rejected":
        Trk = 5;
        break;
      case "Verified":
        Trk = 6;
        break;
      case "Cancelled":
        Trk = 7;
        break;
      case "Refunded":
        Trk = 8;
        break;
      case "Returned":
        Trk = 9;
        break;
      case "Return in Transit":
        Trk = 10;
        break;
      default:
        Trk = 5;
    }
    setOrderData(Trk);
  };

  const OrderSalespersonPopup = (id, Trk) => {
    setTrackId(id);
    // switch(Trk){
    //   case "Direct":
    //     Trk = 0;
    //     break;
    //   case "Ashwin":
    //     Trk = 41;
    //     break;
    //     case "Latha":
    //       Trk = 29;
    //       break;
    //       case "Manjula":
    //         Trk = 37;
    //         break;
    //         case "Meenakshi":
    //           Trk = 26;
    //           break;
    //           case "Narmatha":
    //             Trk = 36;
    //             break;
    //               case "Sathish":
    //               Trk = 48
    //               break;
    //               case "Tamil":
    //                 Trk = 24
    //                 break;
    //                 case "Kavitha":
    //                 Trk = 49
    //                 break;
    //           default:
    //           Trk = 0;
    // }
    setOrderData(Trk);
  };

  const OrderInternalCommentsPopup = (id, Trk) => {
    setTrackId(id);
    setOrderData(Trk);
  };

  const OrderAddresspopup = (id, Trk) => {
    setTrackId(id);
    setOrderData(Trk);
  };

  const OrderTRansporterPopup = (id, Trk) => {
    setTrackId(id);
    // switch (Trk) {
    //   case "ST Courier":
    //     Trk = 1;
    //     break;
    //   case "Reg. Parcel":
    //     Trk = 2;
    //     break;
    //   case "COD":
    //     Trk = 3;
    //     break;
    //   case "Speed Post":
    //     Trk = 4;
    //     break;
    //   case "Professional Courier":
    //     Trk = 5;
    //     break;
    //   case "DTDC":
    //     Trk = 6
    //     break;
    //   case "Hyperlocal Delivery":
    //     Trk = 7
    //     break;
    //   case "Shiprocket":
    //     Trk = 8
    //     break;
    //   case "Icarry":
    //     Trk = 9
    //     break;
    //   default:
    //     Trk = 0;
    // }
    setOrderData(Trk);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    console.log(searchId + " search id");

    try {
      const res = await OrderDetails.getOrdersListId(searchId, Token);
      console.log(res.data);
      if (res?.response?.status === 422) {
        setServiceProvider([]);
        setISdataempty(true);
      } else {
        res.data.data.forEach((ele) => {
          ele.internal_comments =
            ele.internal_comments === "" ? "No Comment" : ele.internal_comments;
          ele.date = format(new Date(ele.order_date), "yyyy-MM-dd");
          ele.time = format(new Date(ele.order_date), "hh:mm aaaaa'm'");
          if (
            ele.address &&
            ele.address.address_line1 &&
            ele.address.address_line2 &&
            ele.address.city &&
            ele.address.pincode &&
            ele.address.state &&
            ele.address.country
          ) {
            ele.shippingaddress = `${ele.address.address_line1}, ${ele.address.address_line2}, ${ele.address.city} - ${ele.address.pincode}, ${ele.address.state}, ${ele.address.country}`;
          } else if (
            ele.address_line1 &&
            ele.address_line2 &&
            ele.city &&
            ele.pincode &&
            ele.state &&
            ele.country
          ) {
            ele.shippingaddress = `${ele.address_line1}, ${ele.address_line2}, ${ele.city} - ${ele.pincode}, ${ele.state}, ${ele.country}`;
          } else {
            ele.shippingaddress = "Invalid Address Data";
          }
          console.log(
            ele.shippingaddress +
              "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
          );
          switch (ele.payment_status) {
            case 0:
              ele.payment_status = "Success";
              ele.color = theme.palette.info.dark;
              break;

            case 1:
              ele.payment_status = "Success";
              ele.color = theme.palette.info.dark;
              break;
            case 2:
              ele.payment_status = "Failure";
              ele.color = theme.palette.success.dark;
              break;
            case 3:
              ele.payment_status = "Pending";
              ele.color = theme.palette.error.dark;
              break;
            default:
              ele.payment_status = "error code";
              ele.color = theme.palette.error.dark;
          }

          switch (ele.order_status) {
            case 1:
              ele.order_status = "Pending";
              ele.colors = theme.palette.warning.dark;
              break;
            case 2:
              ele.order_status = "On The Way";
              ele.colors = theme.palette.info.dark;
              break;
            case 3:
              ele.order_status = "Delivered";
              ele.colors = theme.palette.success.main;
              break;
            case 4:
              ele.order_status = "Dispatched";
              ele.colors = theme.palette.success.dark;
              break;
            case 5:
              ele.order_status = "Rejected";
              ele.colors = theme.palette.error.dark;
              break;
            case 6:
              ele.order_status = "Verified";
              ele.colors = theme.palette.error.dark;
              break;
            case 7:
              ele.order_status = "Cancelled";
              ele.colors = theme.palette.error.dark;
              break;

            case 8:
              ele.order_status = "Refunded";
              ele.colors = theme.palette.error.dark;
              break;
            case 9:
              ele.order_status = "Returned";
              ele.colors = theme.palette.error.dark;
              break;
            case 10:
              ele.order_status = "Return in Transit";
              ele.colors = theme.palette.error.dark;
              break;

            default:
              ele.order_status = "error code";
              ele.colors = theme.palette.error.dark;
          }

          ele.orderId = {
            editId: ele.id,
            trackNo: ele.tracking_no,
          };

          ele.orderStatus = {
            statusTxt: ele.order_status,
            statusColor: ele.colors,
            statusId: ele.id,
          };
          ele.payStatus = {
            StatusTxt: ele.payment_status,
            ChipColor: ele.color,
          };
          ele.tracking_no =
            ele.tracking_no === "undefined" || ele.tracking_no === "null"
              ? ""
              : ele.tracking_no;
          ele.createdAt = new Date(ele.created_at);

          delete ele.payment_status;
          delete ele.color;
          delete ele.order_status;
          delete ele.colors;
        });
        if (isMountedRef.current) {
          setServiceProvider(res.data.data);
        }
      }
      // setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFilteredData([]);
    } finally {
      setIsLoading(false);
    }
    setIsSearching(true);
    window.localStorage.setItem("from", undefined);
    window.localStorage.setItem("to", undefined);
    window.localStorage.setItem("orderStatus", undefined);
    window.localStorage.setItem("filter", true);
    setValue([null, null]);
    setIsfilter(false);
    from.current = undefined;
    to.current = undefined;
    setDropvalue(0);
    order_Status.current = undefined;
  };

  // useEffect(() => {
  //   // If searchText is empty, clear the filteredData
  //   if (searchId === "") {
  //     setFilteredData([]);
  //   }
  // }, [searchId]);

  const handleCancel = () => {
    // handleSearch();
    window.location.reload();
    window.localStorage.setItem("filterSearch", true);
    setIsSearching(false);
    setFilteredData([]);
  };

  useEffect(() => {
    tempFun.current();
    // getProvider()
    return () => {
      setServiceProvider([]);
    };
  }, [startPageSize, startPage]);
  useEffect(() => {
    if (multipleAuth === true) {
      navigate("/");
    }
  }, [multipleAuth, navigate]);

  return (
    <Page title="Order Management | Animeta">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Order Management"
          links={[
            // { name: 'Dashboard', href: '' },
            {
              name: "Order  Management",
            },
          ]}
        />

        {user == "Admin" && (
          <div
            className="card"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <h3
              onClick={() => {
                onClickInvoice();
              }}
              className="button"
            >
              Invoice
            </h3>
          </div>
        )}

        {/* <FormikProvider value={formik}>
     <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

   <Stack sx={{mb:"15px",textAlign:"left"}} direction={{ xs: 'column', md: 'row' }} spacing={2}>
   <TextField
                        select
                        fullWidth
                        label="orderStatus"
                     
                        placeholder="orderStatus"
                        // {...getFieldProps("orderStatus")}
                        onChange={(e)=>order_Status.current = e.target.value}
                      >
                        <MenuItem value={'1'}>ST Courier</MenuItem>
                        <MenuItem value={'2'}>Reg. Parcel</MenuItem>
                        <MenuItem value={'3'}>COD</MenuItem>
                        <MenuItem value={'4'}>Speed Post</MenuItem>
                        <MenuItem value={'5'}>Professional Courier</MenuItem>
                        <MenuItem value={'6'}>DTDC</MenuItem>
                        <MenuItem value={'7'}>Hyperlocal Delivery</MenuItem>
                      </TextField>
                      </Stack>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                 Save Changes
               </LoadingButton>
             </Box>
     </Form>
   </FormikProvider>  */}

        {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: '1000px', marginTop: '-100px', marginBottom: '30px' }}>
          <Grid container alignItems="center">
            <div className="card" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '-150px', marginTop: '0px' }}><h3 onClick={() => handleSearch()} className="button">Package slip</h3></div>
           </Grid>
        </div> */}

        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div className="card">
            <TextField
              label="Order Id"
              variant="outlined"
              type="number"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end"></InputAdornment>,
              }}
            />
          </div>

          <div
            className="card"
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "20px",
            }}
          >
            {isSearching ? (
              <h3 onClick={() => handleCancel()} className="cancelbutton">
                Cancel
              </h3>
            ) : (
              <h3 onClick={() => handleSearch()} className="button">
                Search
              </h3>
            )}
          </div>

          <div className="card">
            <DateRangePicker
              startText="From Date"
              endText="To Date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                window.localStorage.setItem("filter", true);
                // getProvider()
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField
                    {...startProps}
                    style={{ width: "120px" }} // Adjust the width as needed
                  />
                  <Box sx={{ mx: 2 }}> - </Box>
                  <TextField
                    {...endProps}
                    style={{ width: "120px" }} // Adjust the width as needed
                  />
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
              label="Order status"
              value={dropValue}
              onChange={(e) => event(e.target.value)}
              SelectProps={{
                native: true,
                style: { width: "200px" }, // Adjust the width as needed
              }}
            >
              {orderStatus.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </div>

          {localStorage.getItem("filter") === "true" ||
          localStorage.getItem("filter") === null ? (
            <div className="card" style={{ marginTop: "12px" }}>
              <h3 onClick={() => onfilter()} className="button">
                Filter
              </h3>
            </div>
          ) : (
            <div className="card" style={{ marginTop: "12px" }}>
              <h3 onClick={() => onCancel()} className="cancelbutton">
                Cancel
              </h3>
            </div>
          )}
        </div>

        <div>
          {isDataempty ? (
            //
            <></>
          ) : (
            <div>
              {serviceProvider.map((item, index) => (
                <div key={index}>{/* Render your data here */}</div>
              ))}
            </div>
          )}
        </div>

        <Card>
          {serviceProvider.length > 0 ? (
            <ResponsiveTable
              Filter={true}
              Export={false}
              tableHeaderData={
                user === "Cro" || user === "Cro Listing"
                  ? tableHeaderDataCro
                  : tableHeaderData
              }
              tabelBodyData={serviceProvider}
              PageSizeCustom={startPageSize}
              ChangePageSize={setStartPageSize}
              StartPage={startPage}
              ChangeStartPage={setStartPage}
              TotalItem={totalItemCount}
              selectCheckBox={true}
            />
          ) : isDataempty ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              No data Found
            </div>
          ) : (
            <CircularProgress
              sx={{
                margin: "50px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          )}
        </Card>
        <Dialog
          fullWidth={true}
          maxWidth="sm"
          open={editOrder}
          onClose={popUpEditClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ padding: "12px 20px", fontSize: "14px" }}>
            {track
              ? "Are you Edit This Track No?"
              : "Are you Edit This Order Status"}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ py: "15px" }}>
            {track ? (
              <OrderEditTrackNo
                trck={setTrack}
                Trk={trakData}
                ids={trakId}
                onMCls={popUpEditClose}
              />
            ) : (
              <OrderEditOrderStatus
                paymentType={paymentType}
                Trk={orderData}
                ids={trakId}
                onMCls={popUpEditClose}
              />
            )}
          </DialogContent>
        </Dialog>
        <Dialog
          fullWidth={true}
          maxWidth="sm"
          open={transporter_id}
          onClose={popUpTransporterEditClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ padding: "12px 20px", fontSize: "14px" }}>
            {"Edit Transporter Id"}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ py: "15px" }}>
            <OrderEditTransporterId
              Trk={orderData}
              ids={trakId}
              onMCls={popUpTransporterEditClose}
              providerList={providerList}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          fullWidth={true}
          maxWidth="sm"
          open={salesPerson}
          onClose={popupSalespersonClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ padding: "12px 20px", fontSize: "14px" }}>
            {"Edit sales person"}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ py: "15px" }}>
            <OrderEditSalesPerson
              Trk={orderData}
              ids={trakId}
              onMCls={popupSalespersonClose}
              salespersonlist={selespersonlist}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          fullWidth={true}
          maxWidth="sm"
          open={comments}
          onClose={popupCommentClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ padding: "12px 20px", fontSize: "14px" }}>
            {"Add Internal comments"}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ py: "15px" }}>
            <OrderEditCommentUpdate
              Trk={orderData}
              ids={trakId}
              onMCls={popupCommentClose}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          fullWidth={true}
          maxWidth="sm"
          open={invoice}
          onClose={popupInvoiceClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ padding: "12px 20px", fontSize: "14px" }}>
            {"Add Invoice"}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ py: "15px" }}>
            <Invoice Trk={orderData} ids={trakId} onMCls={popupInvoiceClose} />
          </DialogContent>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="sm"
          open={add}
          onClose={popupAddClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ padding: "12px 20px", fontSize: "14px" }}>
            {"Update Address"}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ py: "15px" }}>
            <OrderEditAdd Trk={orderData} ids={trakId} onMCls={popupAddClose} />
          </DialogContent>
        </Dialog>
      </Container>
    </Page>
  );
};
export default ServiceProviderDetails;
