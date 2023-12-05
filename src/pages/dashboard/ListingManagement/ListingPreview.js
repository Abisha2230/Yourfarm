import React, { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Form, FormikProvider, useFormik, FieldArray } from "formik";
import { capitalCase } from "change-case";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import GridGoldenratioIcon from "@mui/icons-material/GridGoldenratio";
// import Listingcomment from "src/components/_dashboard/listing/L";
// import { Container, Chip, Stack, MenuItem, Typography, Card, Box, IconButton, CircularProgress, Dialog, DialogTitle, Divider, DialogContent, TextField } from "@mui/material";
import {
  Container,
  Grid,
  TextField,
  Stack,
  Button,
  Card,
  Box,
  Avatar,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  Typography,
  Text,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CircularProgress,
} from "@mui/material";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

import { LoadingButton } from "@mui/lab";

import useIsMountedRef from "../../../hooks/useIsMountedRef";

import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import { PATH_DASHBOARD } from "../../../routes/paths";
import useSettings from "../../../hooks/useSettings";
import { useParams } from "react-router";

import { category_Details } from "src/_apis_";
import { OrderDetails } from "src/_apis_";
import { useNavigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";

import moment from "moment";

// ----------------------------------------------------------------------

// setpublish(True);

const ListingEdit = () => {
  const [publish, setpublish] = useState();
  const [reject, setReject] = useState();
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [categoryData, setCategoryData] = useState([]);
  const theme = useTheme();

  const tempFunFour = useRef();
  const { themeStretch } = useSettings();
  const [showGrid, setShowGrid] = useState(false);
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const fileId = useParams();
  const [getItemSignle, setGetItemSignle] = useState([]);
  const [listingId, setListingId] = React.useState(2);
  const [comments, setComments] = useState("");
  const [status, setStatus] = useState(0);
  const [diseases, setDiseases] = useState();
  const [diseasesType, setDiseasesType] = useState();
  const [diseaseshistory, setDiseasesHistory] = useState();
  const [listingStatus, SetListingStatus] = useState();
  const [isFeaturedOn, setIsFeaturedOn] = useState(false);
  const initialFeaturedStatus = getItemSignle?.listing?.featured || false;
  const [currentFeaturedStatus, setCurrentFeaturedStatus] = useState(
    initialFeaturedStatus
  );
  const userdata = JSON.parse(window.localStorage.getItem("User"))?.userData;

  const Tokens = JSON.parse(window.localStorage.getItem("Token"))?.useAuth;

  const relate = useRef([]);
  const formattedDate = getItemSignle?.listing?.published_at?.toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }
  );

  console.log("formattedDate:", formattedDate);

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
      },
    },
  });

  const classes = useStyles();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      provider_id: getItemSignle.provider_id || "",
      title: getItemSignle.title || "",
      rate: getItemSignle.rate || "",
      description: getItemSignle.description || "",
      posted_at: getItemSignle.posted_at || "",
      visibility: getItemSignle.visibility || "",
      image_front_url: getItemSignle.image_front_url || "",
      image_side_url: getItemSignle.image_side_url || "",
      image_body_url: getItemSignle.image_body_url || "",
      video_url: getItemSignle.video_url || "",
      comments: "",
    },

    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const { row } = data;
        const data = {
          id: row?.listing?.id,
          provider_id: row?.listing?.subscription_id,
          title: row?.listing?.title,
          rate: row?.listing?.rate,
          description: row?.listing?.description,
          posted_at: row?.listing?.posted_at,
          visibility: row?.listing?.visibility,
          image_front_url: row?.cattle?.image_front_url,
          image_side_url: row?.cattle?.image_side_url,
          image_body_url: row?.cattle?.image_body_url,
          video_url: row?.cattle?.video_url,
          cattle_type_id: row?.cattle?.cattle_type_id,
          provider_id: row?.listing?.provider_id,
        };

        // const res = await category_Details.couponEdit(Token, fileId.id, data);
        // if (res.data.code === 200) {
        //     enqueueSnackbar("Update success", { variant: "success" });
        //     setTimeout(() => {
        //         navigate("/coupon");
        //     });
        // }
        // else {
        //     enqueueSnackbar("Update Fail", { variant: "error" });
        // }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    },
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  const getItemsingle = async () => {
    const res = await OrderDetails.getCattleListingId(fileId.id, Token);
    console.log(JSON.stringify(res) + "getCattleListingIdgetCattleListingId");
    if (res?.status === 200) {
      res.data.data.forEach((ele, index) => {
        // ele.id = index;
        // console.log(JSON.stringify(ele) + 'elelllllllllllllllllll')
        switch (ele?.listing?.listing_status) {
          case 1:
            ele.listing_status = "Draft";
            break;
          case 2:
            ele.listing_status = "In Review";
            break;
          case 3:
            ele.listing_status = "Published";
            break;
          case 4:
            ele.listing_status = "Sold Out";
            break;
          case 5:
            ele.listing_status = "Expired";
            break;
          default:
            ele.listing_status = "error code";
        }
      });
      // if (isMountedRef.current) {
      setGetItemSignle(res.data.data[0]);
      if (res?.data?.data[0]?.listing_status === "In Review") {
        setShowGrid(true);
      }
      console.log(
        JSON.stringify(res.data.data[0]) + "res.data.data[0]res.data.data[0]"
      );

      // }
    }
  };

  // tempFunFour.current = getItemsingle;
  // useEffect(
  //     () => {
  //         tempFunFour.current();
  //     }, []
  // );

  const getAllDiseases = async () => {
    const response = await OrderDetails.getDiseases(Tokens);
    // console.log(JSON.stringify(response) + 'responseresponseresponse')
    if (response.status === 200) {
      setDiseasesHistory(response?.data?.data);
    }
  };

  useEffect(() => {
    getAllDiseases();
    getItemsingle();
    // getListingStatus();
  }, []);

  useEffect(() => {
    // console.log(JSON.stringify(diseaseshistory) + '----------')
    // const { row } = data;
    // console.log(JSON.stringify(getItemSignle?.cattle?.disease_history) + 'diseaseListdiseaseListdiseaseList');
    if (
      diseaseshistory &&
      getItemSignle?.cattle?.disease_history &&
      diseaseshistory.length > 0 &&
      getItemSignle?.cattle?.disease_history.length > 0
    ) {
      var diseaseList = [];
      const dis = getItemSignle?.cattle?.disease_history.map((item) => {
        // console.log(item + 'itemitem')
        const disease = diseaseshistory.filter((item1) => item1?.id == item);
        diseaseList = [...diseaseList, disease[0]];
      });
      setDiseases(diseaseList);

      // console.log(JSON.stringify(diseaseList) + '----yyyyyyyyyy------')
    }
  }, [diseaseshistory, getItemSignle]);
  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };
  const handleSwitchChange = () => {
    setCurrentFeaturedStatus(!currentFeaturedStatus);
  };

  const updateListing = async (isPublish) => {
    const newStatus = 2;
    const data = {
      listing_id: fileId.id,
      listing: {
        listing_status: 2,
        newStatus: newStatus,
      },
    };
    const res = await OrderDetails.updateCattleListing(fileId.id, Token, data);
    // console.log(JSON.stringify(res) + 'fileId.id, Token, datafileId.id, Token, datafileId.id, Token, data');
    if (res.status === 200) {
      const time = moment().format("LLL");
      const data1 = {
        listing_id: fileId.id,
        remarks: comments,
        remarks: `${comments} \n  ${userdata?.name} #${userdata?.id} \n ${time}`,

        old_status: 1,
        new_status: 2,
        assignee_id: userdata?.id,
      };

      const response = await OrderDetails.createBannerList(Token, data1);
      if (response.status === 200) {
        setListingId(newStatus);
        setStatus(newStatus);
        // console.log(JSON.stringify(response.status) + 'postListingReviewpostListingReviewpostListingReview');
        enqueueSnackbar("Update listingStatus success", { variant: "success" });
        getItemsingle();
      } else {
        enqueueSnackbar("Update listingStatus Fail", { variant: "error" });
      }

      setListingId(newStatus);
      // console.log(JSON.stringify(res.status) + 'fileId.id, Token, datafileId.id, Token, datafileId.id, Token, datag');
      enqueueSnackbar("Listing Status Changes into Review", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Listing Status Changes error", { variant: "error" });
    }
  };

  const addReviewUser = async (isPublish) => {
    var oldStatus;
    switch (getItemSignle?.listing_status) {
      case "Draft":
        oldStatus = 1;
        break;
      case "In Review":
        oldStatus = 2;
        break;
      case "Published":
        oldStatus = 3;
        break;
      case "Sold Out":
        oldStatus = 4;
        break;
      case "Expired":
        oldStatus = 5;
        break;
      // default:
      //     ele.listing_status = "error code";
    }
    // updatedComments
    const newStatus = 2;
    // const {row} = data;

    const data = {
      listing_id: fileId.id,
      listing: {
        listing_status: isPublish ? 3 : 1,
        new_status: isPublish ? 3 : 1,
      },
    };
    const res = await OrderDetails.updateCattleListing(fileId.id, Token, data);
    // console.log(JSON.stringify(res) + 'updateCattleListingupdateCattleListingupdateCattleListing');
    if (res.status === 200) {
      setListingId(newStatus);
      // console.log(JSON.stringify(res.status) + 'updateCattleListingupdateCattleListingupdateCattleListing');
      enqueueSnackbar(" Update Listing success", { variant: "success" });
      navigate("/listing");
    } else {
      enqueueSnackbar("Update Listing Fail", { variant: "error" });
    }

    const time = moment().format("LLL");
    const data1 = {
      listing_id: fileId.id,
      remarks: comments,
      remarks: `${comments} \n  ${userdata?.name} #${userdata?.id} \n ${time}`,

      old_status: oldStatus,
      new_status: isPublish ? 3 : 1,
      assignee_id: userdata?.id,
    };

    const response = await OrderDetails.createBannerList(Token, data1);
    if (response.status === 200) {
      setListingId(newStatus);
      setStatus(newStatus);
      // console.log(JSON.stringify(response.status) + 'postListingReviewpostListingReviewpostListingReview');
      enqueueSnackbar("Update listingStatus success", { variant: "success" });
    } else {
      enqueueSnackbar("Update listingStatus Fail", { variant: "error" });
    }
  };

  const rejectedProfile = async () => {
    const newStatus = 1;
    const data = {
      listing_id: fileId.id,
      listing: {
        listing_status: 1,
      },
    };

    const res = await OrderDetails.updateCattleListing(fileId.id, Token, data);
    // console.log(JSON.stringify(res) + 'OrderDetailsOrderDetailsOrderDetails');
    if (res.status === 200) {
      setListingId(newStatus);
      enqueueSnackbar("Listing Rejected", { variant: "success" });
    } else {
      enqueueSnackbar("Fail To Update", { variant: "error" });
    }

    const data1 = {
      listing_id: fileId.id,
      remarks: comments,
      old_status: 1,
      new_status: 1,
      // assignee_id:userdata
    };
    console.log(
      JSON.stringify(data1) +
        "postListingReviewpostListingReviewpostListingReviewpostListingReview"
    );
    const response = await OrderDetails.postListingReview(
      fileId.id,
      Token,
      data1
    );
    // console.log(JSON.stringify(response) + 'postListingReviewpostListingReviewpostListingReviewpostListingReview');
    if (response.status === 200) {
      setListingId(newStatus);
      setStatus(newStatus);
      // console.log(JSON.stringify(response.status) + 'postListingReviewpostListingReviewpostListingReview');
      enqueueSnackbar("Rejection success", { variant: "success" });
    } else {
      enqueueSnackbar("Updated Fail", { variant: "error" });
    }
  };
  // const [isEditingFeatured, setIsEditingFeatured] = useState(false);
  // const [editedFeatured, setEditedFeatured] = useState(getItemSignle?.listing?.featured || "");

  // const handleEditFeatured = () => {
  //     setIsEditingFeatured(true);
  // };

  // const handleSaveFeatured = () => {

  //     setIsEditingFeatured(false);

  // };

  // const handleCancelEdit = () => {
  //     setIsEditingFeatured(false);
  //     setEditedFeatured(getItemSignle?.listing?.featured || "");
  // };
  // const statusLookup = {
  //     1: "Draft",
  //     2: "In Review",
  //     3: "Published",
  //   };

  useEffect(() => {
    console.log(
      JSON.stringify(getItemSignle?.listing?.subscription_id) +
        "getItemSignlegetItemSignlegetItemSignle"
    );
  }, [getItemSignle]);

  return (
    <Page title="Listing Management | Animeta">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Listing Management"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "Listing Management",
              href: PATH_DASHBOARD.listing.root,
            },
            {
              name: "Review",
            },
          ]}
        />

        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={10}>
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
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        {/* <GridGoldenratioIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} /> */}
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Listing Id
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {getItemSignle?.listing?.id
                              ? getItemSignle?.listing?.id
                              : "---"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        {/* <AssignmentIndOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} /> */}
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Cattle Id
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {getItemSignle?.cattle?.id
                              ? getItemSignle?.cattle?.id
                              : "---"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        {/* <TextSnippetOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} /> */}
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Subscription Id
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {getItemSignle?.listing?.subscription_id
                              ? getItemSignle?.listing?.subscription_id
                              : "---"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        {/* <GradingIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} /> */}
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Seller Id
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {getItemSignle?.listing?.provider_id
                              ? getItemSignle?.listing?.provider_id
                              : "---"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        {/* <GradingIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} /> */}
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Seller Name
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {getItemSignle?.listing?.provider?.provider_name
                              ? getItemSignle?.listing?.provider?.provider_name
                              : "---"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>{" "}
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        {/* <GradingIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} /> */}
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Seller Mobile Number
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {getItemSignle?.listing?.provider?.mobile_no
                              ? getItemSignle?.listing?.provider?.mobile_no
                              : "---"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        {/* <PersonOutlineOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} /> */}
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Title
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {getItemSignle?.listing?.title
                              ? getItemSignle?.listing?.title
                              : "---"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        {/* <EmailOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} /> */}
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Rate
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {getItemSignle?.listing?.rate
                              ? getItemSignle?.listing?.rate
                              : "---"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    {/* <Grid xs={12} md={6}>
                                            <Box sx={{ display: "flex" }}>
                                                <FormControl>
                                                    <Box sx={{ marginBottom: "10px" }}>
                                                        <Typography sx={{ marginLeft: "15px", fontWeight: "500", fontSize: "16px" }}>
                                                            Featured
                                                        </Typography>
                                                        <RadioGroup  onChange={handleSwitchChange}  checked={currentFeaturedStatus} 
                                                            {...getItemSignle?.listing?.featured ? getItemSignle?.listing?.featured : "---"}
                                                             row
                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                        >
                                                            <FormControlLabel value={"off"} control={<Radio name="visibility"
                                                                id="radioOption1" sx={{ marginLeft: "15px" }} />} label="Off" />
                                                            <FormControlLabel value={"on"}  checked={currentFeaturedStatus}    control={<Radio name="visibility"
                                                                id="radioOption2" />} label="On" />
                                                        </RadioGroup>
                                                    </Box>
                                                </FormControl>
                                            </Box>
                                        </Grid> */}
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Age
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {getItemSignle?.cattle?.age
                              ? getItemSignle?.cattle?.age
                              : "---"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Number of Calves Delivered
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {getItemSignle?.cattle?.lactation_num
                              ? getItemSignle?.cattle?.lactation_num
                              : "---"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Featured
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {getItemSignle?.listing?.featured ? "ON" : "OFF"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
                                            <Box sx={{ display: "flex" }}>
                                                <Box sx={{ marginBottom: "10px" }}>
                                                    <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                                                        Featured
                                                    </Typography>
                                                    {isEditingFeatured ? (
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <TextField
                                                                value={editedFeatured}
                                                                type="number"
                                                                onChange={(e) => setEditedFeatured(e.target.value)}
                                                            />
                                                            <Button onClick={handleSaveFeatured}>Save</Button>
                                                            <Button onClick={handleCancelEdit}>Cancel</Button>
                                                        </Box>
                                                    ) : (
                                                        <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                                                            {editedFeatured ? editedFeatured : "---"}
                                                        </Typography>
                                                    )}
                                                </Box>
                                                {isEditingFeatured || (
                                                    <Button onClick={handleEditFeatured}>Edit</Button>
                                                )}
                                            </Box>
                                        </Grid> */}
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        {/* <PhoneAndroidOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} /> */}
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Place
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {getItemSignle?.listing?.place
                              ? getItemSignle?.listing?.place
                              : "---"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        {/* <PhoneAndroidOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} /> */}
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Description
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {getItemSignle?.listing?.description
                              ? getItemSignle?.listing?.description
                              : "---"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Diseases History
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {diseases && diseases?.length > 0
                              ? diseases.map((item) => (
                                  <Typography
                                    sx={{ fontWeight: "100", fontSize: "14px" }}
                                  >
                                    {item?.disease}
                                  </Typography>
                                ))
                              : null}
                            {/* {getItemSignle?.cattle?.disease_history ? getItemSignle?.cattle?.disease_history : "---"} */}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        {/* <PhoneAndroidOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} /> */}
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Listing Status
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {/* {statusLookup[getItemSignle?.listing?.listing_status ? getItemSignle?.listing?.listing_status : "---"]} */}
                            {getItemSignle?.listing_status
                              ? getItemSignle?.listing_status
                              : "---"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        {/* <CreditScoreOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} /> */}
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Published Date
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {getItemSignle?.listing?.published_at
                              ? format(
                                  new Date(
                                    getItemSignle?.listing?.published_at
                                  ),
                                  "yyyy-MM-dd"
                                )
                              : null}
                            {/* {getItemSignle?.listing?.published_at ? format(new Date(getItemSignle?.listing?.published_at), "hh:mm aaaaa'm'") : null} */}

                            {/* {formattedDate} */}

                            {/* {getItemSignle?.listing?.published_at ? getItemSignle?.listing?.published_at : "---"} */}
                            {/* {getItemSignle?.listing?.published_at ? new Date(getItemSignle?.listing?.published_at).toLocaleString() : "---"} */}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            {/* {getItemSignle?.listing?.published_at ? format(new Date(getItemSignle?.listing?.published_at), "yyyy-MM-dd") : null} */}
                            {getItemSignle?.listing?.published_at
                              ? format(
                                  new Date(
                                    getItemSignle?.listing?.published_at
                                  ),
                                  "hh:mm aaaaa'm'"
                                )
                              : null}

                            {/* {formattedDate} */}

                            {/* {getItemSignle?.listing?.published_at ? getItemSignle?.listing?.published_at : "---"} */}
                            {/* {getItemSignle?.listing?.published_at ? new Date(getItemSignle?.listing?.published_at).toLocaleString() : "---"} */}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Image Front
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            <img
                              src={
                                getItemSignle?.cattle?.image_front_url
                                  ? getItemSignle?.cattle?.image_front_url
                                  : "---"
                              }
                              width={200}
                              height={200}
                              alt="Image"
                            />
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Image Side
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            <img
                              src={
                                getItemSignle?.cattle?.image_side_url
                                  ? getItemSignle?.cattle?.image_side_url
                                  : "---"
                              }
                              width={200}
                              height={200}
                              alt="Image"
                            />
                            {/* {getItemSignle?.cattle?.image_side_url ? getItemSignle?.cattle?.image_side_url : "---"} */}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        {/* <CreditScoreOutlinedIcon sx={{ fontSize: "23px", marginRight: "5px", marginTop: "5px" }} /> */}
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Image Body
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "100", fontSize: "14px" }}
                          >
                            <img
                              src={
                                getItemSignle?.cattle?.image_body_url
                                  ? getItemSignle?.cattle?.image_body_url
                                  : "---"
                              }
                              width={200}
                              height={200}
                              alt="Image"
                            />
                            {/* {getItemSignle?.cattle?.image_body_url ? getItemSignle?.cattle?.image_body_url : "---"} */}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            video
                          </Typography>
                          {getItemSignle?.cattle?.video_url ? (
                            <video controls width="100%">
                              <source
                                src={getItemSignle.cattle.video_url}
                                width={250}
                                height={250}
                                type="video/mp4"
                              />
                            </video>
                          ) : (
                            <Typography
                              sx={{ fontWeight: "100", fontSize: "14px" }}
                            >
                              ---
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex" }}>
                        <FlagOutlinedIcon
                          sx={{
                            fontSize: "23px",
                            marginRight: "5px",
                            marginTop: "5px",
                          }}
                        />
                        <Box sx={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Internal Comments
                          </Typography>
                          <div
                            className={classes.scrollBar}
                            style={{
                              marginTop: "10px",
                              whiteSpace: "pre-line",
                              height: "200px",
                              width: "250px",
                              overflow: "auto",
                              paddingRight: "5px",
                            }}
                          >
                            <p style={{ fontWeight: "100", fontSize: "14px" }}>
                              {getItemSignle?.listing?.internal_comments !== ""
                                ? getItemSignle?.listing?.internal_comments
                                : "---"}
                            </p>
                          </div>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              {getItemSignle?.listing_status !== "Published" &&
                getItemSignle?.listing_status !== "In Review" &&
                getItemSignle?.listing?.subscription_id !== 0 && (
                  <Box sx={{ mt: 3, display: "flex", marginLeft: 50 }}>
                    <LoadingButton
                      //   type="submit"
                      variant="contained"
                      onClick={() => {
                        setShowGrid(true);
                        updateListing();
                      }}

                      //   loading={isSubmitting}
                    >
                      Review
                    </LoadingButton>
                  </Box>
                )}

              {showGrid && (
                <Grid item xs={12} md={8}>
                  <Card sx={{ p: 3 }}>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
                      style={{ marginTop: 17 }}
                    >
                      <TextField
                        fullWidth
                        label="Add Comments "
                        minRows={4}
                        maxRows={4}
                        multiline
                        value={comments}
                        onChange={handleCommentsChange}
                      />
                    </Stack>

                    <Box sx={{ mt: 3, display: "flex", marginLeft: 65 }}>
                      <LoadingButton
                        variant="contained"
                        onClick={() => {
                          if (comments) {
                            setpublish(true);
                          } else {
                            enqueueSnackbar("Please Add Comment", {
                              variant: "error",
                            });
                          }
                        }}
                      >
                        Publish
                      </LoadingButton>
                    </Box>
                    <Box sx={{ mt: -4.5, display: "flex", marginLeft: 50 }}>
                      <LoadingButton
                        variant="contained"
                        onClick={() => {
                          if (comments) {
                            setReject(true);
                          } else {
                            enqueueSnackbar("Please Add Comment", {
                              variant: "error",
                            });
                          }
                        }}
                        // onClick={() => { addReviewUser(false) }}
                      >
                        Reject
                      </LoadingButton>
                    </Box>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={publish}
        onClose={() => {
          setpublish(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle sx={{ padding: "12px 20px", fontSize: "14px" }}>{"Publish"}</DialogTitle> */}
        {/* <Divider /> */}

        <DialogContent sx={{ py: "15px" }}>
          <DialogTitle sx={{ padding: "12px 20px", fontSize: "14px" }}>
            {"Do you want to publish this item"}
          </DialogTitle>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <LoadingButton
              type="submit"
              variant="contained"
              onClick={() => {
                addReviewUser(true);
              }}
            >
              Yes
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setpublish(false);
              }}
            >
              No
            </LoadingButton>
          </Box>
          {/* <Invoice Trk={orderData} ids={trakId} onMCls={popupInvoiceClose} /> */}
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={reject}
        onClose={() => {
          setReject(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle sx={{ padding: "12px 20px", fontSize: "14px" }}>{"Publish"}</DialogTitle> */}
        {/* <Divider /> */}

        <DialogContent sx={{ py: "15px" }}>
          <DialogTitle sx={{ padding: "12px 20px", fontSize: "14px" }}>
            {"Do you want to reject this item"}
          </DialogTitle>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <LoadingButton
              type="submit"
              variant="contained"
              onClick={() => {
                addReviewUser(false);
              }}
            >
              Yes
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setReject(false);
              }}
            >
              No
            </LoadingButton>
          </Box>
          {/* <Invoice Trk={orderData} ids={trakId} onMCls={popupInvoiceClose} /> */}
        </DialogContent>
      </Dialog>
    </Page>
  );
};
export default ListingEdit;
