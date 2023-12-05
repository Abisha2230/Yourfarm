 import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  TextField,
  Container,
  Typography,
  FormHelperText,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import useAuth from "../../../hooks/useAuth";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { UploadAvatar } from "../../../components/upload";
// utils

//
import { useNavigate } from "react-router-dom";
import { category_Details } from "src/_apis_";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import { PATH_DASHBOARD } from "../../../routes/paths";
import useSettings from "../../../hooks/useSettings";
import { useTheme } from "@mui/material/styles";
import { Item_Details } from "src/_apis_";
import Select from "src/theme/overrides/Select";
import { ContactlessOutlined } from "@mui/icons-material";
import { Files } from "../../../_apis_/file";
// ----------------------------------------------------------------------

export default function  ItemCreateLan (){
  const [categoryData, setCategoryData] = useState([]);
  const isMountedRef = useIsMountedRef();
  const [discounttpyes, setDiscountTypes] = useState("off");
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { updateProfile } = useAuth();
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const { themeStretch } = useSettings();
  const UpdateUserSchema = Yup.object().shape({
    productName: Yup.string().required("Productname is required"),
    productWeight: Yup.number().required("Product Weight is required"),
    price: Yup.number().required("Price is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    photoURL: Yup.mixed().required("Image is required"),
    discountstatus: Yup.string().required("Discount status is required"),
    discounttype: Yup.string().required("Discount type is required"),
    discountvalue: Yup.number().required("Discount value is required"),
    mtype: Yup.string().required("Medicine  Type is required"),
    packangestack: Yup.string().required("Please select a value"),
    maxcat: Yup.number().required("Cattle is required"),
  });
  const discountScheme = Yup.object().shape({
    productName: Yup.string().required("Productname is required"),
    productWeight: Yup.number().required("Product Weight  is required"),
    price: Yup.number().required("Price is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    photoURL: Yup.mixed().required("Image is required"),
    discountstatus: Yup.string().required("Discount status is required"),
    discounttype: Yup.string(),
    discountvalue: Yup.string(),
    mtype: Yup.string().required("Medicine Type is required"),
    packangestack: Yup.string().required("Please select a value"),
    maxcat: Yup.number().required("Cattle is required"),
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      discountstatus: "",
      photoURL: "",
      productWeight: "",
      category: "",
      price: "",
      description: "",
      discounttype: "",
      discountvalue: "",
      mtype: "",
      packangestack: "",
      maxcat: "",
    },

    validationSchema:
      discounttpyes === "on" ? UpdateUserSchema : discountScheme,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const data = {
          medicine_type: values.mtype,
          cattle_type: values.category,
          maximum_cattle: Number(values.maxcat),
          amount: Number(values.price),
          package_weight_in_gram: Number(values.productWeight),
          is_one_packet_for_many: values.packangestack,
          medicine_name: values.productName,
          discount_amount: Number(values.discountvalue),
          discount_type: Number(values.discounttype),
          discount_status: Number(values.discountstatus),
          discription: values.description,
          image_url: values.photoURL,
        };
        const res = await Item_Details.ItemsCreate(data, Token);
        if (res?.data?.code === 200) {
          enqueueSnackbar("  Item Creation Successfully", {
            variant: "success",
          });
          setTimeout(() => {
            navigate("/item");
          });
        } else {
          enqueueSnackbar("Item Creation failed", { variant: "error" });
        }
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
    handleChange,
    getFieldProps,
    setFieldValue,
  } = formik;

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const ApiFileData = new FormData();
    ApiFileData.set("files", file);
    const res = await Files.FileUpload(ApiFileData);
    if (res?.status < 400) {
      let imageUrl = res?.data?.data[0];
      setFieldValue("photoURL", imageUrl["path"]);
      enqueueSnackbar("Image Uploaded Successfully", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Image Upload Failed", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (values.discountstatus === 1) {
      setDiscountTypes("on");
    } else {
      setDiscountTypes("off");
    }
  }, [values.discountstatus]);
  const getCategory = async () => {
    const res = await category_Details.categoryList(Token);
    if (res?.data?.code === 200) {
      setCategoryData(
        res?.data?.data.filter((re) => re.type === 0 && re.visibility === 1)
      );
    }
  };
  useEffect(() => {
    const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
    getCategory();
  }, [Token]);

  return(
<FormikProvider value={formik}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
                  <UploadAvatar
                    accept="image/*"
                    file={values.photoURL}
                    onDrop={handleDrop}
                    error={Boolean(touched.photoURL && errors.photoURL)}
                  />

                  <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                    {touched.photoURL && errors.photoURL}
                  </FormHelperText>

                  <Typography
                    sx={{
                      mt: 3,
                      fontSize: "15px",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Upload Product Image
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={{ xs: 2, md: 3 }}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Product Name"
                        {...getFieldProps("productName")}
                        error={Boolean(
                          touched.productName && errors.productName
                        )}
                        helperText={touched.productName && errors.productName}
                      />

                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Category"
                        {...getFieldProps("category")}
                        fullWidth
                        error={Boolean(touched.category && errors.category)}
                        helperText={touched.category && errors.category}
                      >
                        {categoryData.map((option) => (
                          <MenuItem key={option.id} value={option.category}>
                            {option.category}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Stack>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Medicine Type"
                        {...getFieldProps("mtype")}
                        error={Boolean(touched.mtype && errors.mtype)}
                        helperText={touched.mtype && errors.mtype}
                      />
                      <TextField
                        fullWidth
                        label="Product Net Weight"
                        {...getFieldProps("productWeight")}
                        error={Boolean(
                          touched.productWeight && errors.productWeight
                        )}
                        helperText={
                          touched.productWeight && errors.productWeight
                        }
                      />
                    </Stack>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                      <TextField
                        select
                        fullWidth
                        label="Please Select a Value"
                        placeholder="Please Select a Value"
                        {...getFieldProps("packangestack")}
                        error={Boolean(
                          touched.packangestack && errors.packangestack
                        )}
                        helperText={
                          touched.packangestack && errors.packangestack
                        }
                      >
                        <MenuItem value={true}>YES</MenuItem>
                        <MenuItem value={false}>NO</MenuItem>
                      </TextField>

                      <TextField
                        fullWidth
                        label="Maximum Cattle"
                        {...getFieldProps("maxcat")}
                        error={Boolean(touched.maxcat && errors.maxcat)}
                        helperText={touched.maxcat && errors.maxcat}
                      />
                    </Stack>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                      <TextField
                        fullWidth
                      
                        label="price"
                        {...getFieldProps("price")}
                        error={Boolean(touched.price && errors.price)}
                        helperText={touched.price && errors.price}
                      />
                      <TextField
                        select
                        fullWidth
                        label="Discount Status"
                        placeholder="Discount Status"
                        {...getFieldProps("discountstatus")}
                        error={Boolean(
                          touched.discountstatus && errors.discountstatus
                        )}
                        helperText={
                          touched.discountstatus && errors.discountstatus
                        }
                      >
                        <MenuItem value={1}>On</MenuItem>
                        <MenuItem value={0}>Off</MenuItem>
                      </TextField>
                    </Stack>
                    {values.discountstatus === 1 && (
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                      >
                        <TextField
                          select
                          fullWidth
                          label="Discount Type"
                          placeholder="Discount Type"
                          {...getFieldProps("discounttype")}
                          error={Boolean(
                            touched.discounttype && errors.discounttype
                          )}
                          helperText={
                            touched.discounttype && errors.discounttype
                          }
                        >
                          <MenuItem value={0}>Offer</MenuItem>
                          <MenuItem value={1}>Flat</MenuItem>
                        </TextField>
                        <TextField
                          fullWidth
                          label="Discount Values"
                          {...getFieldProps("discountvalue")}
                          error={Boolean(
                            touched.discountvalue && errors.discountvalue
                          )}
                          helperText={
                            touched.discountvalue && errors.discountvalue
                          }
                        />
                      </Stack>
                    )}

                    <TextField
                      {...getFieldProps("description")}
                      fullWidth
                      multiline
                      minRows={4}
                      maxRows={4}
                      label="Description"
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Stack>

                  <Box
                    sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                    >
                      Save Changes
                    </LoadingButton>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
);
};