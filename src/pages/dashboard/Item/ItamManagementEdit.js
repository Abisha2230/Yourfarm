import React, { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Form, FormikProvider, useFormik, FieldArray, Field } from "formik";
import { capitalCase } from "change-case";
import { useTheme } from "@mui/material/styles";
// material
import {
  Box,
  Grid,
  Button,
  Card,
  Typography,
  Stack,
  TextField,
  Container,
  FormHelperText,
  MenuItem,
  Tabs,
  Tab,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { UploadAvatar } from "../../../components/upload";
// utils
//

import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import { PATH_DASHBOARD } from "../../../routes/paths";
import useSettings from "../../../hooks/useSettings";
import { useParams } from "react-router";
import { Item_Details } from "src/_apis_";
import { category_Details } from "src/_apis_";
import { useNavigate } from "react-router-dom";
import { Files } from "../../../_apis_/file";
import { LanguageDetails } from "src/_apis_";
import { object, array, string } from "yup";
import { values } from "lodash";
import { price } from "src/utils/mock-data/number";

// ----------------------------------------------------------------------

const ItemManagementEdit = () => {
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [categoryData, setCategoryData] = useState([]);
  const theme = useTheme();
  const tempFun = useRef();
  const tempFunOne = useRef();
  const tempFunTwo = useRef();
  const tempFunFour = useRef();
  const { themeStretch } = useSettings();
  const [discounttpyes, setDiscountTypes] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [Price, serPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [flat, setFlat] = useState("");
  const [offer, setOffer] = useState("");
  const [productlist, setProductlist] = useState();
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const fileId = useParams();
  const [getItemSignle, setGetItemSignle] = useState([]);
  const [currentTab, setCurrentTab] = useState(1);
  const [languageList, setLanguageList] = useState([]);
  const [filteres, setFilteres] = useState([]);
  const [diologBox, setDiologBox] = useState(false);
  const [dairyins, SetDairyins] = useState([]);
  const relate = useRef([]);
  useEffect(() => {
    const getSalesper = async () => {
      const res = await Item_Details.DairyList(Token);
      SetDairyins(res?.data?.data);
    };
    getSalesper();
  }, []);
  const UpdateUserSchema = Yup.object().shape({
    language: array().of(
      object().shape({
        medicine_name: string().required("Productname is required"),
        discription: Yup.string().required("Description is required"),
        medicine_type: Yup.string().required("Medicine Type is required"),
        cattle_type: Yup.string().required("Category is required"),
        language_id: Yup.string(),
        language_code: Yup.string(),
      })
    ),
    di_id: Yup.number().required("Dairy Industry is required"),
    dosageInfo: Yup.number()
      .min(1, "greater than 0")
      .required("Product Net Weight is required"),
    //GST: Yup.number().min(1, "greater than 0").required("GST is required"),

    price: Yup.number().min(1, "greater than 0").required("price is required"),
    photoURL: Yup.mixed().required("image is required"),
    discountstatus: Yup.string().required("discount status is required"),
    discounttype: Yup.string().required("discount type is required"),
    discountvalue:
      discountType === 1
        ? Yup.number()
            .min(1, "greater than 0")
            .lessThan(Number(101), "offer is lessthen or equal to 100")
            .required("Discount value is required")
        : Yup.number()
            .min(1, "greater than 0")
            .lessThan(Number(Price), "value lessthen price ")
            .required("Discount value is required"),
    maxcat: Yup.string().required("Maximum Cattle is required"),
    visibility: Yup.string().required("Visibility is required"),
  });
  const discountScheme = Yup.object().shape({
    language: array().of(
      object().shape({
        medicine_name: string().required("Productname is required"),
        discription: Yup.string().required("Description is required"),
        medicine_type: Yup.string().required("Medicine Type is required"),
        cattle_type: Yup.string().required("Category is required"),
        language_id: Yup.string(),
        language_code: Yup.string(),
      })
    ),
    di_id: Yup.number().required("Dairy Industry is required"),
    dosageInfo: Yup.number()
      .min(1, "greater than 0")
      .required("Product net weight is required"),
    //GST: Yup.number().min(1, "greater than 0").required("GST is required"),

    price: Yup.number().min(1, "greater than 0").required("price is required"),
    // sellingprice:Yup.number().min(1,"greater than 0").required("Selling Price is required"),
    sellingprice: Yup.string(),
    photoURL: Yup.mixed().required("image is required"),
    discountstatus: Yup.string().required("discount status is required"),
    discounttype: Yup.string(),
    discountvalue: Yup.string(),
    maxcat: Yup.string().required("Maximum Cattle is required"),
    visibility: Yup.string().required("Visibility is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      language: getItemSignle.language || [
        {
          language_id: "",
          language_code: "",
        },
      ],
      di_id: getItemSignle.di_id || 0,
      photoURL: getItemSignle.image_url || "",
      dosageInfo: getItemSignle.package_weight_in_gram || "",
      GST: JSON.stringify(getItemSignle.gst) || "",

      price: getItemSignle.amount || "",
      sellingPrice: getItemSignle.sellingPrice || "",
      discountstatus: JSON.stringify(getItemSignle.discount_status) || "",
      discounttype: JSON.stringify(getItemSignle.discount_type) || "",
      // discountvalue: getItemSignle.discount_amount || "",
      discountvalue: JSON.stringify(getItemSignle.discount_amount) || "",
      sellingPrice: JSON.stringify(getItemSignle.sellingPrice) || "",
      maxcat: getItemSignle.maximum_cattle || "",
      visibility: getItemSignle.visibility === 1 ? "on" : "off" || "",
      kitdetails: getItemSignle.kit_details || "",
    },
    validationSchema:
      discounttpyes === "on" ? UpdateUserSchema : discountScheme,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      console.log(values.language);

      try {
        const data = {
          kit_details: values.kitdetails,
          maximum_cattle: Number(values.maxcat),
          // amount: Number(values.price),
          package_weight_in_gram: Number(values.dosageInfo),
          GST_Percentage: Number(values.GST),
          gst: Number(values.GST),
          is_one_packet_for_many: false,
          // discount_amount: Number(values.discountvalue),
          // discount_type: Number(values.discounttype),
          medicine_name: values.language[1].medicine_name,
          visibility: Number(values.visibility === "on" ? 1 : 0),
          image_url: values.photoURL,
          language: values.language,
          related_products: relate.current,
          price: [
            {
              di_id: values.di_id,
              visibility: Number(values.visibility === "on" ? 1 : 0),
              discount_amount: Number(values.discountvalue),
              discount_type: Number(values.discounttype),
              discount_status: Number(values.discountstatus),
              discountValue: Number(values.discountvalue),
              sellingPrice: Number(values.sellingPrice),
              amount: Number(values.price),
            },
          ],
        };
        console.log(JSON.stringify(data));
        const res = await Item_Details.ItemsEdit(
          data,
          fileId.id,
          fileId.di_id,
          Token
        );
        if (res.data.code === 200) {
          enqueueSnackbar("Update success", { variant: "success" });
          setTimeout(() => {
            navigate("/item");
          });
        } else {
          enqueueSnackbar("Update Fail", { variant: "error" });
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
      enqueueSnackbar("Image Uploaded Failed", {
        variant: "error",
      });
    }
  };

  const removeImg = () => {
    setFieldValue("photoURL", "");
  };
  const getLanguages = async () => {
    const res = await LanguageDetails.getLanguageList(Token);
    console.log(res);
    if (res.status === 200 && res?.data?.code === 200) {
      res.data.data.forEach((ele) => {
        ele.language_id = ele.id;
        delete ele.id;
      });

      setLanguageList(res.data.data.filter((u) => u.status === 1));
      //  setCurrentTab(0);
    }
  };
  tempFunOne.current = getLanguages;

  useEffect(() => {
    const result = languageList.filter(
      (o1) =>
        !getItemSignle.language?.some((o2) => o1.language_id === o2.language_id)
    );
    result.map((y) => {
      y["medicine_name"] = "";
      y["medicine_type"] = "";
      y["cattle_type"] = "";
      y["discription"] = "";
      return y;
    });
    result.forEach((t) => {
      getItemSignle.language?.push(t);
    });
    if (getItemSignle.language === null) {
      getItemSignle.language = [];
      languageList.forEach((t) => {
        getItemSignle.language?.push(t);
      });
    }
    return () => {
      const result = languageList.filter(
        (o1) =>
          !getItemSignle.language?.some(
            (o2) => o1.language_id === o2.language_id
          )
      );
      result.map((y) => {
        y["medicine_name"] = "";
        y["medicine_type"] = "";
        y["cattle_type"] = "";
        y["discription"] = "";
        return y;
      });
      result.forEach((t) => {
        getItemSignle.language?.push(t);
      });
      if (getItemSignle.language === null) {
        getItemSignle.language = [];
        languageList.forEach((t) => {
          getItemSignle.language?.push(t);
        });
      }
    };
  }, [values.language, currentTab, getItemSignle, languageList]);

  useEffect(() => {
    if (values.discountstatus === "1") {
      setDiscountTypes("on");
    } else {
      setDiscountTypes("off");
    }
    return () => {
      if (values.discountstatus === "1") {
        setDiscountTypes("on");
      } else {
        setDiscountTypes("off");
      }
    };
  }, [values.discountstatus]);

  const getCategory = async () => {
    const res = await category_Details.categoryList(Token);
    console.log(res?.data?.data);
    if (res?.data?.code === 200) {
      res?.data?.data?.forEach((ele) => {
        ele.cattle_type?.toLowerCase();
        // console.log(ele.cattle_type);
      });
      setCategoryData(
        res?.data?.data.filter(
          (re) =>
            re.type === 0 ||
            re.type === 5 ||
            (re.type === 6 && re.visibility === 1)
        )
      );
    }
  };
  tempFunTwo.current = getCategory;
  const getItemsingle = async () => {
    const querystring = {
      di_id: Number(fileId.di_id),
    };
    console.log(querystring);
    const res = await Item_Details.ItemsGetId(fileId.id, Token, querystring);
    console.log(res);
    if (res?.data?.code === 200) {
      relate.current = res.data.data[0].related_products;
      // console.log(related_products);

      res.data.data.forEach((ele) => {
        ele.cattle_type = ele.cattle_type?.toLowerCase();
        ele.language.forEach((polo) => {
          polo.cattle_type = polo.cattle_type.toLowerCase();
        });
        ele.language = ele.language.filter((t) =>
          languageList.some((y) => y.language_id === t.language_id)
        );
        // console.log(ele.cattle_type);
      });
      if (isMountedRef.current) {
        setGetItemSignle(res.data.data[0]);
      }
    }
  };
  tempFunFour.current = getItemsingle;
  useEffect(() => {
    tempFunTwo.current();
  }, []);
  const emptyFun = () => {
    setLanguageList([]);
  };
  useEffect(() => {
    tempFunOne.current();
    return () => {
      emptyFun();
    };
  }, []);
  useEffect(() => {
    tempFunFour.current();
  }, [languageList]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const alertLangu = () => {
    if (
      errors.language?.filter(
        (y) =>
          y?.cattle_type === "Category is required" ||
          y?.medicine_type === "Medicine Type is required" ||
          y?.medicine_name === "Productname is required" ||
          y?.discription === "Description is required"
      ).length > 0 &&
      touched.language?.filter(
        (t) =>
          t?.cattle_type === true ||
          t?.discription === true ||
          t?.medicine_name === true ||
          t?.medicine_type === true
      ).length > 0
    ) {
      setDiologBox(true);
      const temp = [];
      const filters = [];
      errors.language?.map((t, index) => {
        if (
          t?.cattle_type === "Category is required" ||
          t?.medicine_type === "Medicine Type is required" ||
          t?.medicine_name === "Productname is required" ||
          t?.discription === "Description is required"
        ) {
          const t = values.language?.[index].language_id;
          temp?.push(t);
        }
        return temp;
      });
      temp.map((t) => {
        languageList
          .filter((y) => y.language_id === t)
          .forEach((y) => {
            filters.push(y);
          });
        return filters;
      });
      setFilteres([...new Set(filters)]);
    } else {
      setDiologBox(false);
    }
  };
  tempFun.current = alertLangu;
  useEffect(() => {
    tempFun.current();
  }, [isSubmitting]);
  useEffect(() => {
    serPrice(values.price);
  }, [values.price]);
  useEffect(() => {
    setDiscountType(Number(values.discounttype));
  }, [values.discounttype]);
  useEffect(() => {
    setDiscountValue(Number(values.discountvalue));
  }, [values.discountvalue]);
  useEffect(() => {
    if (getItemSignle.discount_type === 1) {
      // setSellingPrice(Number(getItemSignle.discount_amount));
      const offer = (
        (getItemSignle.amount * getItemSignle.discount_amount) /
        100
      ).toFixed();
      setSellingPrice(Number(getItemSignle.amount - offer));
    }
    if (getItemSignle.discount_type === 0) {
      setSellingPrice(
        Number(getItemSignle.amount - getItemSignle.discount_amount)
      );
    }
  }, [getItemSignle]);

  useEffect(() => {
    const com = [];
    const indexing = [];
    const yupd = [];
    // console.log(cattle_type);
    // console.log(categoryData);

    categoryData.map((yy) => {
      yupd.push(
        getItemSignle.language?.filter((y) =>
          yy.language?.some((op) => op.category.toLowerCase() === y.cattle_type)
        )
      );
      // console.log(yupd.cattle_type);
      // console.log(categoryData.y.cattle_type);
      // console.log(yupd)
      return yupd;
    });
    console.log(categoryData);
    getItemSignle.language?.forEach((ii, index) => {
      indexing.push(index);
      categoryData.forEach((t) => {
        t.language?.forEach((pos) => {
          if (pos.category.toLowerCase() === ii.cattle_type?.toLowerCase()) {
            const g = getItemSignle.language.findIndex(
              (ip) => ip.language_id === ii.language_id
            );
            com.push(g);
            indexing
              .filter((rrr) => !com.some((e) => e === rrr))
              ?.map((ri) => {
                getItemSignle.language[ri].cattle_type = "";
                return ri;
              });
          }
        });

        if (yupd?.flatMap((p) => p).length === 0) {
          indexing.map((ri) => {
            getItemSignle.language[ri].cattle_type = "";
            return ri;
          });
        }
      });
    });
  }, [getItemSignle.language, categoryData]);

  const getProduct = async () => {
    const res = await Item_Details.ItemsList(Token);
    setProductlist(res.data.data);
  };
  useEffect(() => {
    tempFunOne.current();
    getProduct();
  }, [currentTab]);

  const addRelated = (event) => {
    if (event.target.checked) {
      relate.current = [...relate.current, parseInt(event.target.value)];
    } else {
      relate.current = relate.current.filter(
        (item) => item !== parseInt(event.target.value)
      );
    }
  };
  useEffect(() => {
    serPrice(values.price);
  }, [values.price]);
  useEffect(() => {
    setDiscountType(Number(values.discounttype));
  }, [values.discounttype]);

  const handlePriceChange = (event) => {
    const { value } = event.target;
    serPrice(value);
    setFieldValue("price", value);
  };

  useEffect(() => {
    console.log(sellingPrice);
    calculateDiscount(Price, sellingPrice);
  }, [Price, sellingPrice]);

  const handleSellingPriceChange = (event) => {
    const { value } = event.target;
    setSellingPrice(value);
  };

  const calculateDiscount = (p, s) => {
    console.log(typeof values.discounttype + "fllllllllllllllllllll");
    if (values.discounttype == 1) {
      console.log(p - s + "anuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
      setDiscountValue((100 - (100 / p) * s).toFixed());
      setFieldValue("discountvalue", (100 - (100 / p) * s).toFixed());
    }
    if (values.discounttype == 0) {
      console.log(p - s + "22222222222222222222222222222");

      setDiscountValue(p - s);
      setFieldValue("discountvalue", p - s);
    }
  };

  const setDiscoType = (value) => {
    console.log(value + "llllllllllllllllll");
    setFieldValue("discounttype", value);

    if (value === 1) {
      console.log("flaet:" + 100 - (100 / Price) * sellingPrice);
      const offrate = (100 - (100 / Price) * sellingPrice).toFixed();
      setFieldValue("discountvalue", offrate);
      setDiscountValue(offrate);
    }
    if (value === 0) {
      console.log("off:" + Price - sellingPrice);
      setFieldValue("discountvalue", Price - sellingPrice);
      setDiscountValue(Price - sellingPrice);
    }
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
              href: PATH_DASHBOARD.item.root,
            },
            {
              name: "Item Edit",
            },
          ]}
        />

        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
                  <UploadAvatar
                    accept="image/*"
                    file={
                      values.photoURL === "removed" ? null : values.photoURL
                    }
                    onDrop={handleDrop}
                    error={Boolean(touched.photoURL && errors.photoURL)}
                  />

                  <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                    {touched.photoURL && errors.photoURL}
                  </FormHelperText>

                  {values.photoURL === "" ? (
                    <Typography
                      sx={{
                        mt: 3,
                        fontSize: "15px",
                        color: theme.palette.primary.main,
                      }}
                    >
                      Upload Product Image
                    </Typography>
                  ) : (
                    <Button
                      onClick={removeImg}
                      sx={{ borderRadius: "5px", mt: 5 }}
                      variant="outlined"
                      startIcon={<PersonRemoveIcon />}
                    >
                      Remove Profile Image
                    </Button>
                  )}
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "10px",
                  }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Save Changes
                  </LoadingButton>
                </Box>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={{ xs: 2, md: 3 }}>
                    {diologBox ? (
                      <Alert
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                        severity="error"
                      >
                        {filteres.map((t) => (
                          <Typography
                            key={t.language_id}
                            sx={{ fontSize: "13px" }}
                          >
                            {`Fill the Details for ${t.language_name} language`}
                          </Typography>
                        ))}
                      </Alert>
                    ) : (
                      ""
                    )}
                    <Tabs
                      value={currentTab}
                      scrollbuttons="auto"
                      variant="scrollable"
                      //allowScrollButtonsMobile
                      onChange={handleChangeTab}
                    >
                      {languageList.map((tab, index) => (
                        <Tab
                          variant="scrollable"
                          disableRipple
                          key={tab.language_id}
                          label={capitalCase(tab.language_name)}
                          value={index}
                        />
                      ))}
                    </Tabs>

                    <FieldArray
                      name="language"
                      render={(arrayHelpers) => (
                        <div>
                          {values.language.map((lang, index) => (
                            <div key={index}>
                              {lang.language_id ===
                              languageList[currentTab]?.language_id ? (
                                <div>
                                  <Stack
                                    sx={{ my: "10px" }}
                                    direction={{ xs: "column", md: "row" }}
                                    spacing={2}
                                  >
                                    <TextField
                                      fullWidth
                                      label={"Product Name"}
                                      {...getFieldProps(
                                        `language[${index}].medicine_name`
                                      )}
                                      error={Boolean(
                                        touched.language?.[index]
                                          ?.medicine_name &&
                                          errors.language?.[index]
                                            ?.medicine_name
                                      )}
                                      helperText={
                                        touched.language?.[index]
                                          ?.medicine_name &&
                                        errors.language?.[index]?.medicine_name
                                      }
                                    />
                                    <TextField
                                      fullWidth
                                      label="Medicine Type"
                                      {...getFieldProps(
                                        `language[${index}].medicine_type`
                                      )}
                                      error={Boolean(
                                        touched.language?.[index]
                                          ?.medicine_type &&
                                          errors.language?.[index]
                                            ?.medicine_type
                                      )}
                                      helperText={
                                        touched.language?.[index]
                                          ?.medicine_type &&
                                        errors.language?.[index]?.medicine_type
                                      }
                                    />
                                  </Stack>
                                  <Stack
                                    sx={{ my: "10px" }}
                                    direction={{ xs: "column", md: "row" }}
                                    spacing={2}
                                  >
                                    {categoryData.length > 0 ? (
                                      <TextField
                                        select
                                        fullWidth
                                        label="Category"
                                        placeholder="Category"
                                        {...getFieldProps(
                                          `language[${index}].cattle_type`
                                        )}
                                        error={Boolean(
                                          touched.language?.[index]
                                            ?.cattle_type &&
                                            errors.language?.[index]
                                              ?.cattle_type
                                        )}
                                        helperText={
                                          touched.language?.[index]
                                            ?.cattle_type &&
                                          errors.language?.[index]?.cattle_type
                                        }
                                      >
                                        {categoryData.map((option) => (
                                          <MenuItem
                                            key={option.id}
                                            value={
                                              option.language
                                                ?.filter(
                                                  (t) =>
                                                    t?.language_id ===
                                                    languageList[currentTab]
                                                      ?.language_id
                                                )?.[0]
                                                ?.category?.toLowerCase()
                                                ? option.language
                                                    ?.filter(
                                                      (t) =>
                                                        t?.language_id ===
                                                        languageList[currentTab]
                                                          ?.language_id
                                                    )?.[0]
                                                    ?.category?.toLowerCase()
                                                : ""
                                            }
                                          >
                                            {
                                              option.language?.filter(
                                                (t) =>
                                                  t?.language_id ===
                                                  languageList[currentTab]
                                                    ?.language_id
                                              )?.[0]?.category
                                            }
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    ) : (
                                      ""
                                    )}
                                  </Stack>
                                  <Stack
                                    direction={{ xs: "column", md: "row" }}
                                    spacing={2}
                                  >
                                    <TextField
                                      {...getFieldProps(
                                        `language[${index}].discription`
                                      )}
                                      fullWidth
                                      multiline
                                      minRows={4}
                                      maxRows={4}
                                      label="Description"
                                      error={Boolean(
                                        touched.language?.[index]
                                          ?.discription &&
                                          errors.language?.[index]?.discription
                                      )}
                                      helperText={
                                        touched.language?.[index]
                                          ?.discription &&
                                        errors.language?.[index]?.discription
                                      }
                                    />
                                  </Stack>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    />

                    <Stack
                      sx={{ my: "10px" }}
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
                    >
                      <TextField
                        id="outlined-select-currency"
                        select
                        defaultValue=""
                        label="Dairy Industry"
                        {...getFieldProps(`di_id`)}
                        fullWidth
                        error={Boolean(touched.di_id && errors.di_id)}
                        helperText={touched.di_id && errors.di_id}
                      >
                        {dairyins.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.company_name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Stack>

                    <Stack
                      sx={{ my: "10px" }}
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
                    >
                      <TextField
                        fullWidth
                        label="Maximum Cattle"
                        {...getFieldProps("maxcat")}
                        error={Boolean(touched.maxcat && errors.maxcat)}
                        helperText={touched.maxcat && errors.maxcat}
                      />

                      <TextField
                        fullWidth
                        label="Kit Details"
                        {...getFieldProps("kitdetails")}
                        error={Boolean(touched.kitdetails && errors.kitdetails)}
                        helperText={touched.kitdetails && errors.kitdetails}
                      />
                    </Stack>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                      <TextField
                        fullWidth
                        label="MRP"
                        value={Price}
                        type="number"
                        onChange={handlePriceChange}
                        error={Boolean(touched.price && errors.price)}
                        helperText={touched.price && errors.price}
                      />
                      <TextField
                        fullWidth
                        label="Selling Price"
                        value={sellingPrice}
                        onChange={handleSellingPriceChange}
                        type="number"
                        error={Boolean(
                          touched.sellingprice && errors.sellingprice
                        )}
                        helperText={touched.sellingprice && errors.sellingprice}
                      />
                      <TextField
                        fullWidth
                        label="Net Weight"
                        {...getFieldProps("dosageInfo")}
                        error={Boolean(touched.dosageInfo && errors.dosageInfo)}
                        helperText={touched.dosageInfo && errors.dosageInfo}
                      />

                      <TextField
                        fullWidth
                        label="GST%"
                        {...getFieldProps("GST")}
                        error={Boolean(touched.GST && errors.GST)}
                        helperText={touched.GST && errors.GST}
                      />
                    </Stack>
                    <FormControl>
                      <FormLabel
                        sx={{ textAlign: "left", fontSize: "13px" }}
                        id="demo-row-radio-buttons-group-label"
                      >
                        Item Visibility
                      </FormLabel>
                      <RadioGroup
                        {...getFieldProps("visibility")}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                      >
                        <FormControlLabel
                          value={"off"}
                          control={
                            <Radio name="visibility" id="radioOption1" />
                          }
                          label="Off"
                        />
                        <FormControlLabel
                          value={"on"}
                          control={
                            <Radio name="visibility" id="radioOption2" />
                          }
                          label="On"
                        />
                      </RadioGroup>
                    </FormControl>

                    <FormHelperText
                      error
                      sx={{
                        px: 2,
                        mb: 3,
                        mt: "0px!important",
                        textAlign: "left",
                      }}
                    >
                      {touched.visibility && errors.visibility}
                    </FormHelperText>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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
                        <MenuItem value={"1"}>On</MenuItem>
                        <MenuItem value={"0"}>Off</MenuItem>
                      </TextField>
                    </Stack>
                    {values.discountstatus === "1" && (
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
                          onChange={(e) => {
                            setDiscoType(e.target.value);
                          }}
                          error={Boolean(
                            touched.discounttype && errors.discounttype
                          )}
                          helperText={
                            touched.discounttype && errors.discounttype
                          }
                        >
                          <MenuItem value={1}>Offer</MenuItem>
                          <MenuItem value={0}>Flat</MenuItem>
                        </TextField>
                        <TextField
                          fullWidth
                          label="Discount Value"
                          value={discountValue}
                          // {...getFieldProps("discountvalue")}
                          error={Boolean(
                            touched.discountvalue && errors.discountvalue
                          )}
                          helperText={
                            touched.discountvalue && errors.discountvalue
                          }
                        />
                      </Stack>
                    )}

                    <FormLabel
                      sx={{ textAlign: "left", fontSize: "13px", marginTop: 5 }}
                    >
                      Related Products
                    </FormLabel>

                    {productlist?.map((item) => {
                      return (
                        <Stack
                          key={item.id}
                          sx={{ my: "10px" }}
                          direction={{ xs: "column", md: "row" }}
                          spacing={2}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              width: "600px",
                            }}
                          >
                            <img
                              style={{
                                height: 40,
                                width: "8%",
                                objectFit: "cover",
                              }}
                              src={item.image_url}
                              alt="My Image"
                            />
                            <h5
                              style={{
                                width: "44%",
                                marginLeft: "15px",
                                fontWeight: "normal",
                              }}
                            >
                              {item.medicine_name}
                            </h5>
                            <h5 style={{ width: "44%", fontWeight: "normal" }}>
                              {item.cattle_type}
                            </h5>
                          </div>

                          <input
                            type="checkbox"
                            value={item.id}
                            defaultChecked={relate.current.includes(item.id)}
                            // checked={relate.current.includes(item.id) && true}
                            onChange={addRelated}
                          />
                        </Stack>
                      );
                    })}
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
      </Container>
    </Page>
  );
};
export default ItemManagementEdit;
