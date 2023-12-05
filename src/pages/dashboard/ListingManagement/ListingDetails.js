import React, { useState, useEffect, useRef } from "react";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import {
  Container,
  styled,
  FormControlLabel,
  RadioGroup,
  Radio,
  Chip,
  Stack,
  Avatar,
  Div,
  MenuItem,
  Typography,
  Card,
  Box,
  Paper,
  IconButton,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  TextField,
  Switch,
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
import { useSnackbar } from "notistack";
import { alpha, useTheme } from "@mui/material/styles";
import DateRangePicker from "@mui/lab/DateRangePicker";
import OrderEditTrackNo from "../../../components/_dashboard/order/OrderEditTrackNo";
import OrderEditOrderStatus from "src/components/_dashboard/order/OrderEditOrderStatus";
import OrderEditTransporterId from "src/components/_dashboard/order/OrderEditTransporterId";
import OrderEditSalesPerson from "src/components/_dashboard/order/orderEditSalesPerson";
import ListingEditsCommentsUpdate from "src/components/_dashboard/listing/ListingEditsCommentsUpdate";
import OrderEditAdd from "src/components/_dashboard/order/OrderEditAdd";
import Featured from "../../../components/_dashboard/listing/Featured";
import { Form, FormikProvider, useFormik } from "formik";
import { useParams } from "react-router";
import "./listing.css";
import Invoice from "src/components/_dashboard/order/Invoice";
import { getLineAndCharacterOfPosition } from "typescript";
import { Item_Details } from "src/_apis_";
import InputAdornment from "@mui/material/InputAdornment";

const ServiceProviderDetails = () => {
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const [user, setuser] = useState(localStorage.getItem("Role"));
  // const [localfilter, setlocalfilter] = useState(localStorage.getItem('filterlisting'));
  const theme = useTheme();
  const tempFun = useRef();
  const navigate = useNavigate();
  const [serviceProvider, setServiceProvider] = useState([]);
  const [value, setValue] = React.useState(
    window.localStorage.getItem("fromlisting") !== null &&
      window.localStorage.getItem("fromlisting") !== "null" &&
      window.localStorage.getItem("fromlisting") !== undefined &&
      window.localStorage.getItem("fromlisting") !== "undefined"
      ? [
          window.localStorage.getItem("fromlisting"),
          window.localStorage.getItem("tolisting"),
        ]
      : [null, null]
  );
  const [dropValue, setDropvalue] = useState(
    window.localStorage.getItem("listingstatus") !== null &&
      window.localStorage.getItem("listingstatus") !== undefined
      ? window.localStorage.getItem("listingstatus")
      : 0
  );
  const [cattleValue, setCattleValue] = useState(
    window.localStorage.getItem("listingstatus") !== null &&
      window.localStorage.getItem("listingstatus") !== undefined
      ? window.localStorage.getItem("listingstatus")
      : 0
  );
  const [localfilters, setlocalfilters] = useState(
    localStorage.getItem("filterlisting")
  );

  const [editOrder, setEditOrder] = useState(false);
  const [track, setTrack] = useState(false);
  const [transporter_id, setTransporter] = useState(false);
  const [isFilter, setIsfilter] = useState(false);
  const [Filter, setFilter] = useState(false);
  const [comments, setComments] = useState(false);
  const [orderDate, setOrderDate] = useState("");
  const [invoice, setInvoice] = useState(false);
  const [add, setAdd] = useState(false);
  const [salesPerson, setSalesperson] = useState(false);
  const [trakId, setTrackId] = useState("");
  const [orderData, setOrderData] = useState("");
  const [isDataempty, setISdataempty] = useState(false);
  const [trakData, setTrakData] = useState("");
  const [multipleAuth, setMultipleAuth] = useState(false);
  const [startPage, setStartPage] = useState(1);
  const [startPageSize, setStartPageSize] = useState(100);
  const [totalItemCount, setTotalItemCount] = useState("");
  const [selespersonlist, setSalespersonlist] = useState();
  const [providerList, setProviderList] = useState();
  const [diseases, setDiseases] = useState();

  const [diseasesType, setDiseasesType] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const Tokens = JSON.parse(window.localStorage.getItem("Token"))?.useAuth;
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const data = [{ id: 0, name: "Direct" }];
  // const initialFeaturedStatus = row?.listing?.featured || false;
  // const [currentFeaturedStatus, setCurrentFeaturedStatus] = useState(initialFeaturedStatus);
  const fileId = useParams();
  const [cattleDetails, setCattleDetails] = useState([]);
  const [listManagment, setlistManagment] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [items, SetItems] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [myDropdownOptions, setMyDropdownOptions] = useState([]);
  // const [dropValue, setDropValue] = useState('');
  const [dropvalue, setDropValue] = useState("");
  const [searchQuerry, setSearchQuerry] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  // const [searchQuerry, setSearchQuery] = useState('');
  const resetSearch = () => {
    setSearchQuery("");
    setIsDataEmpty(false);
    setIsSearching(false);
    // getitemsList();
  };

  const diid = useRef(
    window.localStorage.getItem("diid") !== null &&
      window.localStorage.getItem("diid") !== undefined
      ? window.localStorage.getItem("diid")
      : 1
  );

  const [status, setStatus] = useState([
    {
      id: 0,
      title: "All",
    },
  ]);

  const [staus, setStaus] = useState([
    {
      id: 0,
      title: "All",
    },
  ]);

  const SwitchStyle = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });

  const listingstatus = [
    {
      value: 0,
      label: "All",
    },
    {
      value: 1,
      label: "Draft",
    },
    {
      value: 2,
      label: "InReview",
    },
    {
      value: 3,
      label: "Draft",
    },
  ];

  var fromlisting = useRef();
  var tolisting = useRef();
  var listing_status = useRef();
  var filterlisting = useRef();
  // useEffect(() => {
  //   if ((fromlisting.current !== undefined && tolisting.current !== undefined) || listing_status !== undefined) {
  //     filterlisting.current = 'filterlisting'
  //   }
  // }, [fromlisting, tolisting, listing_status])

  var published_at = useRef();
  useEffect(() => {
    if (
      (fromlisting.current !== undefined && tolisting.current !== undefined) ||
      listing_status !== undefined
    ) {
      filterlisting.current = "filterlisting";
    }
  }, [fromlisting, tolisting, listing_status]);

  const setdate = async () => {
    fromlisting.current =
      new Date(value?.[0]).getFullYear() +
      "-" +
      Number(new Date(value?.[0]).getMonth() + 1)
        .toString()
        .padStart(2, "0") +
      "-" +
      new Date(value?.[0]).getDate().toString().padStart(2, "0");
    console.log(fromlisting + "assas");
    tolisting.current =
      new Date(value?.[1]).getFullYear() +
      "-" +
      Number(new Date(value?.[1]).getMonth() + 1)
        .toString()
        .padStart(2, "0") +
      "-" +
      new Date(value?.[1]).getDate().toString().padStart(2, "0");
    setIsfilter(false);
    return true;
  };

  const getStatus = async () => {
    const res = await OrderDetails.getStatusListing(Tokens);
    console.log(
      JSON.stringify(res) + "res?.data?.datares?.data?.datares?.data?.data"
    );
    if (res?.data?.code) {
      const data = res.data.data;
      setStatus([...status, ...res?.data?.data]);
      console.log(
        JSON.stringify([...status, ...res?.data?.data]) +
          "res?.data?.datares?.data?.datares?.data?.data"
      );
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    if (value?.[0] !== null && value?.[0] !== "null" && value?.[1] !== null) {
      setdate().then((res) => {});
    } else {
      fromlisting.current = undefined;
      tolisting.current = undefined;
    }
  }, [value]);

  useEffect(() => {
    if (dropValue !== 0 && dropValue !== "undefined" && dropValue !== null) {
      listing_status.current = dropValue;
    }
  }, [dropValue]);

  const searchList = async () => {
    var data;
    data = {
      // cattle_type_id: 1,
      cattle_type_id: cattleValue,
      search_text: searchText,
    };
    console.log(data);

    const res = await OrderDetails.getSearchListing(Tokens, data);
    console.log(JSON.stringify(res));

    if (res?.data?.code == 200) {
      setTotalItemCount(res.data.total_count);
      // if (res.data.total_count === 0) {
      // setCattleDetails([]);
      res.data.data.forEach((ele, index) => {
        switch (ele.listing.listing_status) {
          case 1:
            ele.listing.listing_status = "Draft";
            break;
          case 2:
            ele.listing.listing_status = "In Review";
            break;
          case 3:
            ele.listing.listing_status = "Published";
            break;
          case 4:
            ele.listing.listing_status = "Sold Out";
            break;
          case 5:
            ele.listing.listing_status = "Expired";
            break;
          default:
            ele.listing.listing_status = "error code";
        }
        ele.id = index + 1;
        console.log(
          JSON.stringify(res.data.data[0].listing.listing_status) +
            "res.data.total_countres.data.total_count"
        );

        ele.listing_status = ele.listing.listing_status;
      });
      // console.log(setCattleDetails + 'setCattleDetailssetCattleDetails')
      setISdataempty(true);
      setCattleDetails(res.data.data);
      // }
      // else {
      //   res.data.data.forEach((ele, index) => {
      //     console.log(ele + 'ele.idele.id')

      //     ele.id = index + 1;

      //   })
      // if (isMountedRef.current) {
      //   console.log(JSON.stringify(res.data) + 'res.data.total_countres.data.total_count')
      //   setCattleDetails(res.data.data);
      // }
    } else {
      setCattleDetails([]);
    }
  };

  const setdates = async () => {
    fromlisting.current =
      new Date(value?.[0]).getFullYear() +
      "-" +
      Number(new Date(value?.[0]).getMonth() + 1)
        .toString()
        .padStart(2, "0") +
      "-" +
      new Date(value?.[0]).getDate().toString().padStart(2, "0");
    tolisting.current =
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
      setdates().then((res) => {});
    } else {
      fromlisting.current = undefined;
      tolisting.current = undefined;
    }
  }, [value]);

  const getListing = async () => {
    var params;
    // if(from.current!== undefined && to.current!== undefined && from.current!==""&&to.current!==""&&from.current!==NaN+"-"+NaN+"-"+NaN&&to.current!==NaN+"-"+NaN+"-"+NaN){

    if (listing_status.current !== 0 && listing_status !== undefined) {
      params = {
        skip: startPage,
        limit: startPageSize,
        from_date: fromlisting.current,
        to_date: tolisting.current,
        listing_status:
          listing_status.current !== 0 &&
          listing_status !== undefined &&
          listing_status.current,
      };
    } else {
      params = {
        skip: startPage,
        limit: startPageSize,
        from_date: fromlisting.current,
        to_date: tolisting.current,
      };
    }
    console.log(JSON.stringify(params) + "paaaaaaaaaaaaaaaaaaaa");

    const res = await OrderDetails.getCattleListing(Tokens, params);
    console.log(res);
    console.log(res.status);
    if (res.status == 200) {
      // setTotalItemCount(res.data.total_count);
      setTotalItemCount(res.data.total_count);
      if (res.data.total_count === 0) {
        setServiceProvider([]);

        setISdataempty(true);
      }
      // if (res.data.total_count === 0) {
      // setCattleDetails([]);
      else {
        res.data.data.forEach((ele, index) => {
          switch (ele.listing.listing_status) {
            case 1:
              ele.listing.listing_status = "Draft";
              break;
            case 2:
              ele.listing.listing_status = "In Review";
              break;
            case 3:
              ele.listing.listing_status = "Published";
              break;
            case 4:
              ele.listing.listing_status = "Sold Out";
              break;
            case 5:
              ele.listing.listing_status = "Expired";
              break;
            default:
              ele.listing.listing_status = "error code";
          }
          ele.id = index + 1;
          console.log(
            JSON.stringify(res.data.data[0].listing.listing_status) +
              "res.data.total_countres.data.total_count"
          );

          ele.listing_status = ele.listing.listing_status;
          ele.published_at = ele.listing.published_at;
        });
      }
      // console.log(setCattleDetails + 'setCattleDetailssetCattleDetails')
      setISdataempty(true);
      setCattleDetails(res.data.data);
      // }
      // else {
      //   res.data.data.forEach((ele, index) => {
      //     console.log(ele + 'ele.idele.id')

      //     ele.id = index + 1;

      //   })
      // if (isMountedRef.current) {
      //   console.log(JSON.stringify(res.data) + 'res.data.total_countres.data.total_count')
      //   setCattleDetails(res.data.data);
      // }
    } else {
      setCattleDetails([]);
    }
  };

  tempFun.current = getListing;

  useEffect(() => {
    tempFun.current();
    return () => {
      const { row } = data;
      if (row?.cattle?.cattle_type_id) {
        getListing(row?.cattle?.cattle_type_id);
      }

      setCattleDetails([]);
      setDiseasesType([]);
    };
  }, [startPageSize, startPage]);
  // useEffect(() => {
  //   const { row } = data;
  //   if (diseasesType.length > 0 && row.cattle?.disease_history.length > 0) {

  //     var diseaseList = [];
  //     const dis = row.cattle?.disease_history.map((item) => {
  //       const disease = diseasesType.filter((item1) => item1?.id == item);
  //         diseaseList = [...diseaseList]
  //     })
  //     setDiseases(diseaseList);

  //   }
  // }, [diseasesType])

  // const handleSwitchChange = () => {
  //   setCurrentFeaturedStatus(!currentFeaturedStatus);
  // };
  const onClickFeatured = (featured, id) => {
    setOrderData(featured);
    setTrackId(id);
    setAdd(true);
    // console.log("runnnnn" + featured + " hg " + id)
    // openPopUp();
    // setIsFeatured()
  };
  const popupAddClose = () => {
    setAdd(false);
    getListing();
  };
  //   const formattedDate = getItemSignle?.listing?.published_at?.toLocaleString(undefined, {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit',
  //     hour12: true,
  // });

  const tableHeaderData = [
    {
      field: "id",
      headerName: " Id",
      width: 70,
      renderCell: (data) => {
        const { row } = data;
        // console.log(row)
        return (
          <Typography variant="subtitle2" sx={{ fontWeight: "300" }}>
            {row.listing?.id}
          </Typography>
        );
      },
      valueGetter: (data) => data?.value,
    },
    {
      field: "listing?.subscription_id",
      headerName: "Paid",
      width: 80,
      renderCell: (data) => {
        const { row } = data;
        // console.log(row)
        const subscriptionId = row.listing?.subscription_id;
        const displayValue = subscriptionId ? "Yes" : "No";
        return (
          // <Typography variant="subtitle2" sx={{ fontWeight: "300" }} >{row.listing?.subscription_id}</Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: "300" }}>
            {displayValue}
          </Typography>
        );
      },
      valueGetter: (data) => data?.value,
    },

    {
      field: "title",
      headerName: "Title",
      width: 100,
      renderCell: (data) => {
        const { row } = data;
        return (
          <a title={row?.listing?.title}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "300", width: 170 }}
            >
              {row?.listing?.title}
            </Typography>
          </a>
        );
      },
      valueGetter: (data) => data?.value?.title,
    },
    {
      field: "rate",
      headerName: "Rate",
      width: 100,
      renderCell: (data) => {
        const { row } = data;
        return (
          <Typography variant="subtitle2" sx={{ fontWeight: "300" }}>
            {row?.listing?.rate}
          </Typography>
        );
      },
      valueGetter: (data) => data?.value?.rate,
    },

    {
      field: "featured",
      headerName: "Featured",
      width: 90,
      renderCell: (data) => {
        const { row } = data;
        return (
          <div
            onClick={() => {
              onClickFeatured(row?.listing?.featured, row?.listing?.id);
            }}
          >
            <SwitchStyle component="div">
              {row?.listing?.featured == 1 ? (
                <Switch {...label} checked={true} />
              ) : (
                <Switch {...label} disabled />
              )}
            </SwitchStyle>
          </div>
        );
      },
      valueGetter: (data) => data?.value?.featured,
    },
    {
      field: "listing_status",
      headerName: "Listing Status",
      width: 100,
      renderCell: (data) => {
        const { row } = data;

        // const statusText = statusMapping[row?.listing?.listing_status];
        return (
          <Typography variant="subtitle2" sx={{ fontWeight: "300" }}>
            {row?.listing?.listing_status}
          </Typography>
        );
      },
      valueGetter: (data) => data?.value,
    },
    {
      field: "place",
      headerName: "Place",
      width: 100,
      renderCell: (data) => {
        const { row } = data;
        return (
          <Typography variant="subtitle2" sx={{ fontWeight: "300" }}>
            {row?.listing?.place}
          </Typography>
        );
      },
      valueGetter: (data) => data?.value?.place,
    },

    {
      field: "published_at",
      headerName: "Published Date",
      width: 150,
      renderCell: (data) => {
        const { row } = data;

        const publishedAt = new Date(row?.listing?.published_at);
        if (isNaN(publishedAt)) {
          return (
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "300" }}
            ></Typography>
          );
        }
        return (
          // <Typography variant="subtitle2" sx={{ fontWeight: "300" }} >{formattedDate}</Typography>
          <>
            {row?.listing?.published_at ? (
              <>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <a
                    title={format(
                      new Date(row?.listing?.published_at),
                      "yyyy-MM-dd"
                    )}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: "300" }}>
                      {format(
                        new Date(row?.listing?.published_at),
                        "yyyy-MM-dd"
                      )}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: "300" }}>
                      {format(
                        new Date(row?.listing?.published_at),
                        "hh:mm aaaaa'm'"
                      )}
                    </Typography>
                  </a>
                </div>
                {/* <Typography variant="subtitle2" sx={{ fontWeight: "300" }} >{formattedDate}</Typography> */}
              </>
            ) : null}
          </>
        );
      },
      valueGetter: (data) => data?.value,
    },
    {
      field: "updated_at",
      headerName: "Updated Date",
      width: 150,
      renderCell: (data) => {
        const { row } = data;

        const publishedAt = new Date(row?.listing?.updated_at);
        if (isNaN(publishedAt)) {
          return (
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "300" }}
            ></Typography>
          );
        }
        return (
          // <Typography variant="subtitle2" sx={{ fontWeight: "300" }} >{formattedDate}</Typography>
          <>
            {row?.listing?.updated_at ? (
              <>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <a
                    title={format(
                      new Date(row?.listing?.updated_at),
                      "yyyy-MM-dd"
                    )}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: "300" }}>
                      {format(new Date(row?.listing?.updated_at), "yyyy-MM-dd")}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: "300" }}>
                      {format(
                        new Date(row?.listing?.updated_at),
                        "hh:mm aaaaa'm'"
                      )}
                    </Typography>
                  </a>
                </div>
                {/* <Typography variant="subtitle2" sx={{ fontWeight: "300" }} >{formattedDate}</Typography> */}
              </>
            ) : null}
          </>
        );
      },
      valueGetter: (data) => data?.value?.updated_at,
    },

    {
      field: "internal_comments",
      headerName: "Internal Comments",
      width: 170,
      filterable: false,
      renderCell: (params) => {
        const { row } = params;
        // console.log(row.listing.internal_comments)
        return (
          <>
            {/* <TextField value={row.internal_comments}></TextField> */}

            <IconButton
              onClick={() => {
                OrderInternalCommentsPopup(
                  row.listing.id,
                  row.listing.internal_comments
                );
                setComments(true);
              }}
            >
              <EditIcon sx={{ fontSize: "12px", marginRight: "2px" }} />
            </IconButton>
            <Typography
              onClick={() => {
                OrderInternalCommentsPopup(
                  row.listing.id,
                  row.listing.internal_comments
                );
                setComments(true);
              }}
              sx={{ fontSize: "12px" }}
            >
              {row.listing.internal_comments?.length > 20
                ? row.listing.internal_comments.substring(0, 20 - 5) + "..."
                : row.listing.internal_comments}
            </Typography>
          </>
        );
      },
      valueGetter: (data) => data?.value?.internal_comments,
    },
    // {
    //   field: 'visibility', headerName: "Visibility", width: 100, renderCell: (data) => {
    //     const { row } = data;
    //     return (
    //       <Typography variant="subtitle2" sx={{ fontWeight: "300" }} >{row?.listing?.visibility}</Typography>
    //     )
    //   },
    //   valueGetter: (data) => data?.value?.visibility,
    // },

    {
      field: "provider_id",
      headerName: "Provider Id",
      width: 70,
      renderCell: (data) => {
        const { row } = data;
        return (
          <Typography variant="subtitle2" sx={{ fontWeight: "300" }}>
            {row?.listing?.provider_id}
          </Typography>
        );
      },
      valueGetter: (data) => data?.value?.provider_id,
    },

    {
      field: "provider_id",
      headerName: "Action",
      width: 80,
      renderCell: (data) => {
        const { row } = data;
        // console.log()
        return (
          <Box sx={{ display: "flex" }}>
            <IconButton
              component={RouterLink}
              to={`${PATH_DASHBOARD.listing.preview}/${row?.listing?.id}`}
            >
              <RemoveRedEyeIcon sx={{ fontSize: "20px", marginRight: "4px" }} />
            </IconButton>
          </Box>
        );
      },
      filterable: false,
      disableExport: true,
    },
  ];

  const onCancel = () => {
    // window.location.reload()
    // navigate("/")
    // navigate("/listing");
    window.localStorage.setItem("fromlisting", undefined);
    window.localStorage.setItem("tolisting", undefined);
    window.localStorage.setItem("listingstatus", undefined);
    window.localStorage.setItem("filterlisting", true);
    setValue([null, null]);
    setIsfilter(false);
    fromlisting.current = undefined;
    tolisting.current = undefined;
    setDropvalue(0);
    listing_status.current = undefined;
    getListing();
  };
  const onfilter = () => {
    console.log(fromlisting + "fromlistingfromlistingfromlistingfromlisting");
    if (
      (fromlisting.current !== undefined && tolisting.current !== undefined) ||
      listing_status.current !== undefined
    ) {
      window.localStorage.setItem("fromlisting", value[0]);
      window.localStorage.setItem("tolisting", value[1]);
      window.localStorage.setItem("listingstatus", listing_status.current);
      window.localStorage.setItem("filterlisting", false);
      getListing();
      setIsfilter(true);
      // window.location.reload()
      // window.location.reload()
      window.localStorage.setItem("filterlistingSearch", true);
      // window.localStorage.setItem('fromSearch', undefined);
      // window.localStorage.setItem('toSearch', undefined);
      // window.localStorage.setItem('searchstatus', undefined);
      // window.localStorage.setItem('filterSearch', true);
      // setDropvalue([null, null]);
      // setFilter(false);
      // fromlisting.current = undefined;
      // tolisting.current = undefined;
      // setIsfilter(true)
    } else if (
      (fromlisting.current !== "" && tolisting.current !== "undefined") ||
      listing_status.current !== undefined
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
  };
  const event = (e) => {
    // listing_status.current = e
    setDropvalue(e);
    window.localStorage.setItem("filterlisting", true);
    setIsfilter(false);
  };
  const event1 = (e) => {
    // listing_status.current = e
    setCattleValue(e);

    // setSelectedOption(event1.target.value);

    // window.localStorage.setItem('filterlisting', true);
    // setIsfilter(false);
  };

  const OrderInternalCommentsPopup = (id, Trk) => {
    setTrackId(id);
    setOrderDate(Trk);
  };

  const popupCommentClose = () => {
    setComments(false);
    // getProvider()
  };

  // const listManag = async () => {

  //   try {
  //     const response = await OrderDetails.listManag(Tokens);
  //     if (response.status === 200) {
  //       const data = response.data.data; // Assuming data is an array of objects

  //       // Get a reference to the select element
  //       const selectElement = document.getElementById('myDropdown'); // Replace 'myDropdown' with the actual ID of your select element

  //       // Loop through the data and create an option for each item
  //       data.forEach(item => {
  //         const option = document.createElement('option');
  //         option.value = item.title; // Set the value for the option
  //         option.text = item.title;   // Set the text displayed in the option
  //         selectElement.appendChild(option); // Append the option to the select element
  //         console.log(data);
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // listManag();

  useEffect(() => {
    const listManag = async () => {
      try {
        const response = await OrderDetails.listManag(Tokens);
        console.log(response.data.data);
        if (response.status === 200) {
          const data = response.data.data;
          setMyDropdownOptions(data); // Set the API response data as your dropdown options
        }
      } catch (error) {
        console.error(error);
      }
    };

    listManag();
  }, []);

  const handleSearch = async () => {
    if (searchText === "") {
      // Handle the case where searchText is empty
      console.log("Search text is empty");
      return; // Exit the function or handle it as needed
    }

    // Define the search parameters with only search_text
    const data = {
      search_text: searchText, // Assuming searchText is the search text
      skip: startPage,
      limit: startPageSize,
    };

    try {
      // Make the API call with the required search_text parameter
      const res = await OrderDetails.getSearchListing(Tokens, data);
      console.log(res.data + "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
      if (res?.data?.code == 200) {
        setTotalItemCount(res.data.total_count);

        setISdataempty(true);
        // if (res.data.total_count === 0) {
        // setCattleDetails([]);
        res.data.data.forEach((ele, index) => {
          switch (ele.listing.listing_status) {
            case 1:
              ele.listing.listing_status = "Draft";
              break;
            case 2:
              ele.listing.listing_status = "In Review";
              break;
            case 3:
              ele.listing.listing_status = "Published";
              break;
            case 4:
              ele.listing.listing_status = "Sold Out";
              break;
            case 5:
              ele.listing.listing_status = "Expired";
              break;
            default:
              ele.listing.listing_status = "error code";
          }
          ele.id = index + 1;
          console.log(
            JSON.stringify(res.data.data[0].listing.listing_status) +
              "res.data.total_countres.data.total_count"
          );

          ele.listing_status = ele.listing.listing_status;
          ele.published_at = ele.listing.published_at;
        });
        // console.log(setCattleDetails + 'setCattleDetailssetCattleDetails')
        setISdataempty(true);
        setCattleDetails(res.data.data);
        // }
        // else {
        //   res.data.data.forEach((ele, index) => {
        //     console.log(ele + 'ele.idele.id')

        //     ele.id = index + 1;

        //   })
        // if (isMountedRef.current) {
        //   console.log(JSON.stringify(res.data) + 'res.data.total_countres.data.total_count')
        //   setCattleDetails(res.data.data);
        // }
      } else {
        setCattleDetails([]);
      }
      // Handle the API response here
    } catch (error) {
      // Handle API error
      console.error("Error:", error);
    }

    setIsSearching(true);
    window.localStorage.setItem("fromlisting", undefined);
    window.localStorage.setItem("tolisting", undefined);
    window.localStorage.setItem("listingstatus", undefined);
    window.localStorage.setItem("filterlisting", true);
    setValue([null, null]);
    setIsfilter(false);
    fromlisting.current = undefined;
    tolisting.current = undefined;
    setDropvalue(0);
    listing_status.current = undefined;

    // ... Rest of your code
  };

  const handleCancel = () => {
    // window.location.reload()
    // window.localStorage.setItem('filterSearch', true);
    // setIsSearching(false);

    window.location.reload();
    // navigate("/")
    // navigate("/listing");
    window.localStorage.setItem("fromSearch", undefined);
    window.localStorage.setItem("toSearch", undefined);
    window.localStorage.setItem("searchstatus", undefined);
    window.localStorage.setItem("filterlistingSearch", true);
    setDropvalue([null, null]);
    // setFilter(false);
    fromlisting.current = undefined;
    tolisting.current = undefined;
    // setDropvalue(0)

    // getListing()
  };

  const searchwithText = (text) => {
    setSearchText(text);
    window.localStorage.setItem("filterlisting", true);
  };

  const showAllData = () => {
    // Implement the logic to display all data here
    // For example, if you have a data array, you can set it to your UI state
    // const allData = [...]; // Your array of all data
    // setData(allData); // Update your UI state with all data
  };

  return (
    <Page title="Listing Management | Animeta">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Listing Management"
          links={[
            {
              name: "Listing  Management",
            },
          ]}
        />
        <div
          className="cards"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="card">
            <TextField
              label="Search"
              variant="outlined"
              value={searchText}
              onChange={(e) => searchwithText(e.target.value)}
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
                window.localStorage.setItem("filterlisting", true);
                // getProvider()
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
              label="Listing status"
              value={dropValue}
              onChange={(e) => event(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              <option value="" disabled>
                Select an option
              </option>{" "}
              {/* Add a placeholder option */}
              {status?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
            </TextField>
          </div>
          {/* 
  <div className="card" style={{ marginTop: '10px' }}>
    {localStorage.getItem('filterlisting') === 'true' || localStorage.getItem('filterlisting') === null ?
      <div><h3 onClick={() => onfilter()} className="button">Filter</h3></div>
       ):(
      <div><h3 onClick={() => onCancel()} className="cancelbutton">Cancel</h3></div>
       )
    }
  </div> */}

          {localStorage.getItem("filterlisting") === "true" ||
          localStorage.getItem("filterlisting") === null ? (
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

        {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: '850px', marginTop: '-65px', marginBottom: '20px' }}>
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                type="text"
                placeholder="Enter product name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
           
            {!isSearching ?
              <div className="card" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '20px' }}><h3 onClick={() => handleSearch()} className="button">Search</h3></div>
              :
              <div className="card" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '20px' }}><h3 onClick={() => resetSearch()} className="cancelbutton">Cancel</h3></div>

            }
           

          </Grid>
        </div> */}

        <Card>
          {cattleDetails?.length > 0 ? (
            <ResponsiveTable
              Filter={true}
              Export={false}
              tableHeaderData={tableHeaderData}
              tabelBodyData={cattleDetails}
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
          open={add}
          onClose={popupAddClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ padding: "12px 20px", fontSize: "14px" }}>
            {"Update Featuerd"}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ py: "15px" }}>
            <Featured Trk={orderData} ids={trakId} onMCls={popupAddClose} />
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
            <ListingEditsCommentsUpdate
              Trk={orderDate}
              ids={trakId}
              onMCls={popupCommentClose}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </Page>
  );
};
export default ServiceProviderDetails;
