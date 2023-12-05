import React, { useEffect, useState, useRef } from "react";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {
  Container,
  Button,
  Grid,
  Card,
  Avatar,
  Chip,
  CircularProgress,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  Switch,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Input,
} from "@mui/material";
import ResponsiveTable from "../../../components/_dashboard/ResponsiveTable";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { Link as RouterLink } from "react-router-dom";
import useSettings from "../../../hooks/useSettings";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { useTheme, styled } from "@mui/material/styles";
import { Item_Details, category_Details } from "src/_apis_";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { useNavigate } from "react-router-dom";
import "./item.css";

const SwitchStyle = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const ItemManagementDetails = () => {
  const theme = useTheme();
  const tempFunTwo = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();
  const { themeStretch } = useSettings();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [items, SetItems] = useState([]);
  const [categryData, setCategoryData] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [deleteTrue, setDeleteTrue] = useState(false);
  const [startPage, setStartPage] = useState(1);
  const [startPageSize, setStartPageSize] = useState(25);
  const [totalItemCount, setTotalItemCount] = useState("");
  const [multiAuth, setMultiAuth] = useState(false);
  const [isDataempty, setISdataempty] = useState(false);
  const [DairyId, setDairyId] = useState();
  const [search, setSearch] = useState([]);
  const [dairyindus, setDairyindus] = useState(
    window.localStorage.getItem("diid") !== null &&
      window.localStorage.getItem("diid") !== undefined
      ? window.localStorage.getItem("diid")
      : 1
  );
  const [dairyins, SetDairyins] = useState([]);

  const diid = useRef(
    window.localStorage.getItem("diid") !== null &&
      window.localStorage.getItem("diid") !== undefined
      ? window.localStorage.getItem("diid")
      : 1
  );
  const [user, setuser] = useState(localStorage.getItem("Role"));

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [tableData, setTableData] = useState([]);

  const DeleteHandleClose = () => {
    setDeleteOpen(false);
  };
  const openDeleteItem = (id, di_id) => {
    setDeleteOpen(true);
    setDeleteId(id);
    setDairyId(di_id);
  };

  useEffect(() => {
    const getSalesper = async () => {
      const res = await Item_Details.DairyList(Token);
      SetDairyins(res?.data?.data);
    };
    getSalesper();
  }, []);

  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const tableHeaderData = [
    {
      field: "image_url",
      headerName: "Picture",
      filterable: false,
      width: 130,
      renderCell: (params) => <Avatar src={params.value} alt={params.value} />,
    },
    {
      field: "productType",
      headerName: "Type",
      width: 100,
    },
    { field: "productName", headerName: "Product Name", width: 160 },
    {
      field: "package_weight_in_gram",
      headerName: "Product Net Wight",
      width: 190,
    },
    {
      field: "discount_status",
      headerName: "Discount Status",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <SwitchStyle component="div">
          {params.value === "True" ? (
            <Switch {...label} checked={true} />
          ) : (
            <Switch {...label} disabled />
          )}
        </SwitchStyle>
      ),
    },
    { field: "discount_type", headerName: "Discount Type", width: 190 },
    { field: "discount_amount", headerName: "Discount Amount", width: 190 },
    {
      field: "productCategory",
      headerName: "Category",
      width: 150,
      renderCell: (params) => (
        <Box>
          {categryData
            .filter((opo) =>
              opo?.language?.some(
                (pop) =>
                  pop.category?.toLowerCase() === params.value?.toLowerCase()
              )
            )?.[0]
            ?.language?.filter((io) => io.language_id === 1)?.[0].category ? (
            <Typography sx={{ fontSize: "15px" }}>
              {
                categryData
                  .filter((opo) =>
                    opo?.language?.some(
                      (pop) =>
                        pop.category?.toLowerCase() ===
                        params.value?.toLowerCase()
                    )
                  )?.[0]
                  ?.language?.filter((io) => io.language_id === 1)?.[0].category
              }
            </Typography>
          ) : (
            <Chip
              sx={{
                padding: "2px",
                height: "25px",
                borderRadius: "10px",
                background: theme.palette.info.light,
                color: theme.palette.info.dark,
              }}
              label="Not Found"
            />
          )}{" "}
        </Box>
      ),
    },
    {
      field: "visibility",
      headerName: "Item Visibility",
      width: 200,
      renderCell: (params) => (
        <Box>
          {params.value ? (
            <Chip
              sx={{
                padding: "2px",
                height: "25px",
                borderRadius: "10px",
                background: theme.palette.success.light,
                color: theme.palette.success.dark,
              }}
              label={"On"}
            />
          ) : (
            <Chip
              sx={{
                padding: "2px",
                height: "25px",
                borderRadius: "10px",
                background: theme.palette.error.light,
                color: theme.palette.error.dark,
              }}
              label="Off"
            />
          )}
        </Box>
      ),
    },
    {
      field: "amount",
      headerName: "Price(₹)",
      width: 120,
      renderCell: (params) => (
        <Typography variant="subtitle2" sx={{ fontWeight: "300" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "sell_price",
      headerName: "Sell Price(₹)",
      width: 140,
      renderCell: (params) => (
        <Typography variant="subtitle2" sx={{ fontWeight: "300" }}>
          {params.value}
        </Typography>
      ),
    },
    // {
    //   field: 'created_at', headerName: "Created At", width: 150,
    //   renderCell: (params) => (
    //     <Typography variant="subtitle2" sx={{ fontWeight: "300" }} >
    //       {format(new Date(params.value), 'dd MM yyyy').replace(/ /g, '/')}
    //     </Typography>
    //   )
    // },
    // {
    //   field: 'updated_at', headerName: "Updated At", width: 150,
    //   renderCell: (params) => (
    //     <Typography variant="subtitle2" sx={{ fontWeight: "300" }} >
    //       {format(new Date(params.value), 'dd MM yyyy').replace(/ /g, '/')}
    //     </Typography>
    //   )
    // },
    {
      field: "id",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        // const diid = [{params.value}]
        // const data = {di_id:2}
        const { row } = params;
        // console.log(row)
        return (
          <Box sx={{ display: "flex" }}>
            <IconButton
              component={RouterLink}
              to={`${PATH_DASHBOARD.item.preview}/${params.value}/${row.di_id}`}
            >
              <RemoveRedEyeIcon sx={{ fontSize: "20px", marginRight: "4px" }} />
            </IconButton>
            {(user === "DM" || user === "Admin") && (
              <IconButton
                component={RouterLink}
                to={`${PATH_DASHBOARD.item.edit}/${params.value}/${row.di_id}`}
              >
                {" "}
                <EditIcon sx={{ fontSize: "20px", marginRight: "4px" }} />
              </IconButton>
            )}
            {(user === "DM" || user === "Admin") && (
              <IconButton
                onClick={() => {
                  openDeleteItem(params.value, row.di_id);
                }}
              >
                {" "}
                <DeleteOutlineIcon
                  sx={{ fontSize: "20px", marginRight: "4px" }}
                />
              </IconButton>
            )}
          </Box>
        );
      },
    },
  ];

  const getitemsList = React.useCallback(async () => {
    try {
      const params = {
        skip: startPage,
        limit: startPageSize,
        di_id: diid.current,
      };
      const res = await Item_Details.ItemsList(Token, params);
      if (res?.data?.code === 200 && res.status === 200) {
        if (res.data.total_count === 0) {
          setISdataempty(true);
        }

        setTotalItemCount(res.data.total_count);
        res.data.data.forEach((element) => {
          element.sell_price =
            element.discount_status === 1
              ? element.discount_type === 0
                ? element.amount - element.discount_amount
                : (
                    element.amount -
                    (element.amount * element.discount_amount) / 100
                  ).toFixed(0)
              : element.amount;
          // element.visibility = element.visibility === 1 ? "True" : "False";
          element.discount_status =
            element.discount_status === 1 ? "True" : "False";
          element.discount_type =
            element.discount_type === 1 ? "Offer" : "Flat";
          element.productName = element?.language?.filter(
            (t) => t.language_id === 1
          )?.[0]?.medicine_name;
          element.productType = element?.language?.filter(
            (t) => t.language_id === 1
          )?.[0]?.medicine_type;
          element.productCategory = element?.language?.filter(
            (t) => t.language_id === 1
          )?.[0]?.cattle_type;
        });
        if (isMountedRef.current) {
          SetItems(res.data.data);
          if (res.data.data.length == 0) {
            setISdataempty(true);
          }
          console.log(res.data.data.length);
        }
      } else if (
        res?.response?.status >= 400 &&
        res?.response?.statusText === "Unauthorized"
      ) {
        setMultiAuth(true);
      } else {
        setISdataempty(true);
      }
    } catch (err) {
      console.error(err);
      setISdataempty(true);
    }
  }, [isMountedRef, Token, startPageSize, startPage]);
  const DeleteItem = async () => {
    const res = await Item_Details.ItemsDeletes(deleteId, Token, DairyId);
    if (res.data.code === 200) {
      setDeleteOpen(false);
      setDeleteTrue(true);
      enqueueSnackbar("Item Deleted", { variant: "success" });
      setDeleteTrue(false);
    } else {
      setDeleteOpen(false);
      enqueueSnackbar("Item Not Delete", { variant: "error" });
    }
  };
  const getCategory = async () => {
    const res = await category_Details.categoryList(Token);
    if (res?.data?.code === 200) {
      res?.data?.data?.forEach((ele) => {
        ele.cattle_type?.toLowerCase();
      });

      setCategoryData(
        res?.data?.data.filter(
          (re) =>
            re.type === 0 ||
            re.type === 5 ||
            (re.type == 6 && re.visibility === 1)
        )
      );
      // console.log(  (re) => re.type === 0 || re.type === 5 || re.type == 6 &&  re.visibility === 1 );
    }
  };
  tempFunTwo.current = getCategory;

  const handleSearch = async () => {
    if (searchQuery !== "") {
      try {
        setIsSearching(true);
        const params = {
          skip: startPage,
          limit: startPageSize,
          di_id: diid.current,
          keyword: searchQuery,
        };

        setIsSearching(true);
        const res = await Item_Details.searchList(Token, params);
        // console.log(JSON.stringify(res) + 'searchListsearchList')

        if (res?.data?.code === 200) {
          res?.data?.data.forEach((element) => {
            element.sell_price =
              element.discount_status === 1
                ? element.discount_type === 0
                  ? element.amount - element.discount_amount
                  : (
                      element.amount -
                      (element.amount * element.discount_amount) / 100
                    ).toFixed(0)
                : element.amount;
            element.visibility = element.visibility === 1 ? "True" : "False";
            element.discount_status =
              element.discount_status === 1 ? "True" : "False";
            element.discount_type =
              element.discount_type === 1 ? "Offer" : "Flat";
            element.productName = element?.language?.filter(
              (t) => t.language_id === 1
            )?.[0]?.medicine_name;
            element.productType = element?.language?.filter(
              (t) => t.language_id === 1
            )?.[0]?.medicine_type;
            element.productCategory = element?.language?.filter(
              (t) => t.language_id === 1
            )?.[0]?.cattle_type;
          });
          setIsDataEmpty(true); // Set isDataEmpty to true if no results found
          SetItems(res.data.data);
        } else {
          setIsDataEmpty(false); // Set isDataEmpty to false if results found
          SetItems([]);
          console.log(JSON.stringify(res) + "searchListsearchList");
        }
        // setSearchResults(res.data.data);
        setTableData(res.data.data);
      } catch (err) {
        console.error(err);
        setISdataempty(false);
      } finally {
        // setIsSearching(false);
      }
    }
  };
  const resetSearch = () => {
    setSearchQuery("");
    setIsDataEmpty(false);
    setIsSearching(false);
    getitemsList();
  };
  useEffect(() => {
    // handleSearch();
  }, []);

  useEffect(() => {
    getitemsList();
    return () => {
      SetItems([]);
    };
  }, [getitemsList, deleteTrue, startPageSize, startPage, dairyindus]);
  useEffect(() => {
    tempFunTwo.current();
  }, []);
  useEffect(() => {
    if (multiAuth === true) {
      navigate("/");
    }
  }, [multiAuth, navigate]);
  const onClickCreate = () => {
    navigate("/item/create");
  };
  return (
    <Page title="Item Management | Animeta">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Item Management"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "Item Management",
            },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              // onClick={()=>onClickCreate()}
              to={
                (user === "DM" || user === "Admin") &&
                PATH_DASHBOARD.item.create
              }
              startIcon={<AddIcon sx={{ color: "#fff" }} />}
            >
              Create New Item
            </Button>
          }
        />

        {dairyins?.length && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <h3 style={{ marginLeft: "15px", marginRight: "33px" }}>
              Select Dairy Industry
            </h3>
            <TextField
              style={{ width: "330px" }}
              id="outlined-select-currency"
              select
              // label="Dairy Industry"
              value={dairyindus}
              onChange={(e) => {
                setDairyindus(e.target.value);
                diid.current = e.target.value;
                window.localStorage.setItem("diid", e.target.value);
              }}
              SelectProps={{
                native: true,
              }}
            >
              {dairyins.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.company_name}
                </option>
              ))}
            </TextField>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginLeft: "600px",
            marginTop: "-99px",
            marginBottom: "30px",
          }}
        >
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
            {/* <Grid item >
              {isSearching ? (
                <Button variant="contained" disabled>Searching...</Button>
              ) : (
                <Button variant="contained" onClick={handleSearch}>Search</Button>
              )}
            </Grid> */}
            {/* <Grid item>
              {searchResults.length > 0 && !isSearching && (
                <Button

                  variant="contained"
                  style={{ marginLeft: '28px' }}
                  onClick={() => {
                    
                    resetSearch();
                    getitemsList();
                  }}

                >
                  Cancel
                </Button>
              )}
            </Grid> */}
            {!isSearching ? (
              <div
                className="card"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginLeft: "20px",
                }}
              >
                <h3 onClick={() => handleSearch()} className="button">
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
                  marginLeft: "20px",
                }}
              >
                <h3 onClick={() => resetSearch()} className="cancelbutton">
                  Cancel
                </h3>
              </div>
            )}
            {/* {isDataempty && !isSearching && (
              <p>No data found</p>
            )} */}

            {/* {!isDataempty && (
              <ul>
                {searchResults.map((result) => (
                  
                  <li key={result.id}></li>
                ))}
              </ul>
            )} */}

            {/* {isDataempty ? (
            <p>No data found</p>
          ) : (
            <ul>
              {searchResults.map((result) => (
             
                <li key={result.id}></li>

              ))}
              {isDataempty && <li>No data found</li>}
            </ul>

          )} */}
          </Grid>
        </div>

        <Card>
          {items.length > 0 ? (
            <ResponsiveTable
              Export={true}
              tableHeaderData={tableHeaderData}
              tabelBodyData={items}
              PageSizeCustom={startPageSize}
              ChangePageSize={setStartPageSize}
              StartPage={startPage}
              ChangeStartPage={setStartPage}
              TotalItem={totalItemCount}
            />
          ) : !isDataempty || !isSearching ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Loading
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
          open={deleteOpen}
          fullWidth={true}
          maxWidth="sm"
          onClose={DeleteHandleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Are you sure delete this item?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              you want to delete this item in items list
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ paddingTop: "0px!important" }}>
            <Button onClick={DeleteHandleClose}>Cancel</Button>
            <Button onClick={DeleteItem}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Page>
  );
};
export default ItemManagementDetails;
