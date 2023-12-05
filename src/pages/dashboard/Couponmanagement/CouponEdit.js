import React, { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Form, FormikProvider, useFormik, FieldArray } from "formik";
import { capitalCase } from 'change-case';
import { useTheme } from "@mui/material/styles";
import { format } from 'date-fns';

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
  Alert
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
import { object, array, string, } from "yup";
import { phoneNumber } from "src/utils/mock-data/phoneNumber";


// ----------------------------------------------------------------------

const CouponEdit = () => {
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
  const [discounttpyes, setDiscountTypes] = useState(0);
  const [discountType, setDiscountType] = useState("");
  const [Price, serPrice] = useState("");
  const [productlist, setProductlist] = useState();
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const fileId = useParams();
  const [getItemSignle, setGetItemSignle] = useState([]);
  const [currentTab, setCurrentTab] = useState(1);
  const [languageList, setLanguageList] = useState([]);
  const [filteres, setFilteres] = useState([]);
  const [diologBox, setDiologBox] = useState(false);
  const relate = useRef([])
  const [notadddNumber, setnotAddNumber] = useState([]);
  const notnum = useRef([])
  const UpdateUserSchema = Yup.object().shape({
    language: array()
      .of(
        object().shape({
          medicine_name: string().required("Productname is required"),
          discription: Yup.string().required("Description is required"),
          medicine_type: Yup.string().required("Medicine Type is required"),
          cattle_type: Yup.string().required("Category is required"),
          language_id: Yup.string(),
          language_code: Yup.string(),
        })
      ),
    dosageInfo: Yup.number().min(1, "greater than 0").required("Product Net Weight is required"),
    price: Yup.number().min(1, "greater than 0").required("price is required"),
    photoURL: Yup.mixed().required("image is required"),
    discountstatus: Yup.string().required("discount status is required"),
    discounttype: Yup.string().required("discount type is required"),
    discountvalue: discountType === 1 ? Yup.number().min(1, "greater than 0").lessThan(Number(101), "offer is lessthen or equal to 100").required("Discount value is required") : Yup.number().min(1, "greater than 0").lessThan(Number(Price), "value lessthen price ").required("Discount value is required"),
    maxcat: Yup.string().required("Maximum Cattle is required"),
    visibility: Yup.string().required("Visibility is required"),
  });
  const discountScheme = Yup.object().shape({
    code: Yup.string().required("Code is required"),
    description: Yup.string().required("Description is required"),
    discounttype: Yup.string().required("Discount type is required"),
    discountvalue: Yup.number().required("Discount amount is required"),
    expire_at: Yup.date().required("Expire date is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: getItemSignle.code || "",
      description: getItemSignle.description || "",
      discounttype: JSON.stringify(getItemSignle.discount_type) || "",
      discountvalue: getItemSignle.discount || "",
      expire_at: getItemSignle.expires_at || "",
      phone: ""
    },
    validationSchema: discountScheme,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {

        const data = {
          description: values.description,
          code: values.code,
          expires_at: new Date(values.expire_at),
          discount: Number(values.discountvalue),
          discount_type: Number(values.discounttype),
        };

        const res = await category_Details.couponEdit(Token, fileId.id, data);
        if (res.data.code === 200) {
          enqueueSnackbar("Update success", { variant: "success" });
          setTimeout(() => {
            navigate("/coupon");
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
    if (res.status === 200 && res?.data?.code === 200) {
      res.data.data.forEach(ele => {
        ele.language_id = ele.id
        delete ele.id
      });

      setLanguageList(res.data.data.filter(u => u.status === 1));
      setCurrentTab(0);
    }
  };
  tempFunOne.current = getLanguages;

  useEffect(
    () => {
      const result = languageList.filter(o1 => !getItemSignle.language?.some(o2 => o1.language_id === o2.language_id));
      result.map((y) => {
        y['medicine_name'] = "";
        y['medicine_type'] = "";
        y['cattle_type'] = "";
        y['discription'] = "";
        return (y);
      })
      result.forEach(t => {
        getItemSignle.language?.push(t);
      });
      if (getItemSignle.language === null) {
        getItemSignle.language = [];
        languageList.forEach(t => {
          getItemSignle.language?.push(t);
        });
      }
      return () => {
        const result = languageList.filter(o1 => !getItemSignle.language?.some(o2 => o1.language_id === o2.language_id));
        result.map(y => {
          y['medicine_name'] = "";
          y['medicine_type'] = "";
          y['cattle_type'] = "";
          y['discription'] = "";
          return (y);
        })
        result.forEach(t => {
          getItemSignle.language?.push(t);
        });
        if (getItemSignle.language === null) {
          getItemSignle.language = [];
          languageList.forEach(t => {
            getItemSignle.language?.push(t);
          });
        }
      }
    }, [values.language, currentTab, getItemSignle, languageList]
  );





  useEffect(() => {
    if (values.discountstatus === '1') {
      setDiscountTypes("on");
    } else {
      setDiscountTypes("off");
    }
    return () => {
      if (values.discountstatus === '1') {
        setDiscountTypes("on");
      } else {
        setDiscountTypes("off");
      }
    }
  }, [values.discountstatus]);

  const getCategory = async () => {
    const res = await category_Details.categoryList(Token);
    if (res?.data?.code === 200) {
      res?.data?.data?.forEach(ele => {
        ele.cattle_type?.toLowerCase();
      })
      setCategoryData(
        res?.data?.data.filter(
          (re) => re.type === 0 || re.type === 5 && re.visibility === 1
        )
      );

    }
  };
  tempFunTwo.current = getCategory;
  const getItemsingle = async () => {
    const res = await category_Details.couponbyId(Token, fileId.id);
    console.log(JSON.stringify(res) + 'reeeeeeeeeer')
    if (res?.data?.code === 200) {
      res.data.data.forEach(ele => {
        console.log(format(new Date(ele.expires_at), "yyyy-MM-dd"))

        ele.expires_at = format(new Date(ele.expires_at), "yyyy-MM-dd");
        

      });
      if (isMountedRef.current) {
        setGetItemSignle(res.data.data[0]);
      }
    }
  }
  tempFunFour.current = getItemsingle;
  useEffect(
    () => {
      tempFunTwo.current();
    }, []
  );
  const emptyFun = () => {
    setLanguageList([]);
  }
  useEffect(
    () => {
      tempFunOne.current();
      return () => {
        emptyFun();
      }
    }, []
  );
  useEffect(
    () => {
      tempFunFour.current();
    }, [languageList]
  );

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const alertLangu = () => {
    if (errors.language?.filter(y => y?.cattle_type === "Category is required" || y?.medicine_type === "Medicine Type is required" ||
      y?.medicine_name === "Productname is required" || y?.discription === "Description is required").length > 0 && touched.language?.filter(t => t?.cattle_type === true || t?.discription === true || t?.medicine_name === true || t?.medicine_type === true).length > 0) {
      setDiologBox(true);
      const temp = [];
      const filters = [];
      errors.language?.map((t, index) => {
        if (t?.cattle_type === "Category is required" || t?.medicine_type === "Medicine Type is required" ||
          t?.medicine_name === "Productname is required" || t?.discription === "Description is required") {
          const t = values.language?.[index].language_id;
          temp?.push(t);
        }
        return (temp);
      });
      temp.map(t => {
        languageList.filter(y => y.language_id === t).forEach(y => {
          filters.push(y);
        });
        return (filters);
      });
      setFilteres([...new Set(filters)]);

    }
    else {
      setDiologBox(false);
    }
  }
  tempFun.current = alertLangu;
  useEffect(
    () => {
      tempFun.current()
    }, [isSubmitting]
  );
  useEffect(
    () => { serPrice(values.price); }, [values.price]
  );
  useEffect(
    () => { setDiscountType(Number(values.discounttype)); }, [values.discounttype]
  );

  useEffect(
    () => {
      const com = [];
      const indexing = [];
      const yupd = [];
      categoryData.map(yy => {
        yupd.push(getItemSignle.language?.filter(y => yy.language?.some(op => op.category.toLowerCase() === y.cattle_type)));
        return (yupd);
      })
      getItemSignle.language?.forEach((ii, index) => {
        indexing.push(index);
        categoryData.forEach(t => {
          t.language?.forEach(pos => {
            if (pos.category.toLowerCase() === ii.cattle_type?.toLowerCase()) {

              const g = getItemSignle.language.findIndex(ip => ip.language_id === ii.language_id);
              com.push(g);
              indexing.filter(rrr => !com.some(e => e === rrr))?.map(ri => {
                getItemSignle.language[ri].cattle_type = ""
                return (ri);
              })
            }
          })


          if (yupd?.flatMap(p => p).length === 0) {
            indexing.map(ri => {
              getItemSignle.language[ri].cattle_type = "";
              return (ri);
            })
          }
        })
      })
    }, [getItemSignle.language, categoryData]
  )



  const addRelated = (event) => {
    if (event.target.checked) {
      relate.current = [...relate.current, parseInt(event.target.value)]
    } else {
      relate.current = relate.current.filter((item) => item !== parseInt(event.target.value))
    }
  }
  const addCoupons = async (item) => {
    if (item.length !== 13) {
      notnum.current = [...notnum.current, item]
      enqueueSnackbar("Phone Number must be 10 digits", { variant: "error" });
    } else if (item.length === 13) {
      const data = {
        coupon_id: fileId.id,
        mobile_no: item
      }
      console.log(data)
      const res = await category_Details.addCoupontoUser(Token, data);
      console.log(res?.data)
      if (res?.data.code === 200) {
        enqueueSnackbar("Coupon created successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Unable to create coupon", { variant: "error" });
        notnum.current = [...notnum.current, item]
      }
      //   console.log(values.phone)
    }
  }
  const addCoupontoUser = async () => {
    notnum.current = []
    setnotAddNumber(notnum.current)
    if (values.phone !== '') {
      const data = values?.phone.split(',')
      data?.length && data?.map((item) => {
        addCoupons(item);
      })
      setnotAddNumber(notnum.current)
    }

  }


  return (
    <Page title="Coupon Management | Animeta">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Coupon Management"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "Coupon Management",
              href: PATH_DASHBOARD.coupon.root,
            },
            {
              name: "Item Edit",
            },
          ]}
        />

        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Stack direction={{ xs: "column", md: "row" }}
                    spacing={2}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      {...getFieldProps(`phone`)}
                    
                    />



                  </Stack>
                  <Stack>
                    {(notnum.current).length > 0 &&
                      <TextField
                        fullWidth
                        multiline
                        style={{ marginTop: '15px' }}
                        minRows={4}
                        maxRows={4}
                        label="Phone Numbers not coupon assigned"
                     
                        value={JSON.stringify(notnum.current)}
                     
                      />}
                  </Stack>
                  <Box
                    sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                  >
                    <LoadingButton
                      //   type="submit"
                      variant="contained"
                      onClick={() => { addCoupontoUser() }}
                    //   loading={isSubmitting}
                    >
                      Assign coupon to customer
                    </LoadingButton>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
              
                  <Stack direction={{ xs: "column", md: "row" }}
                    spacing={2}>
                    <TextField
                      fullWidth
                      label="Code"
                      {...getFieldProps(`code`)}
                      error={Boolean(touched.code && errors.code)}
                      helperText={touched.code && errors.code}
                    />

                  </Stack>
                  <Stack direction={{ xs: "column", md: "row" }}
                    spacing={2} style={{ marginTop: 17 }}>  <TextField

                      {...getFieldProps(`description`)}
                      fullWidth
                      multiline
                      minRows={4}
                      maxRows={4}
                      label="Description"
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                    /></Stack>
                  <Stack direction={{ xs: "column", md: "column" }}
                    spacing={2} style={{ marginTop: 13, marginBottom: 13 }}>
                    <FormLabel sx={{ textAlign: "left", fontSize: "16px" }}>Expire Date</FormLabel>

                    <TextField
                      type="date"
                      fullWidth
                      //   label="Expire date"
                      {...getFieldProps(`expire_at`)}
                      error={Boolean(touched.expire_at && errors.expire_at)}
                      helperText={touched.expire_at && errors.expire_at}
                    />
                  </Stack>
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
                      <MenuItem value={1}>Offer</MenuItem>
                      <MenuItem value={0}>Flat</MenuItem>
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
export default CouponEdit;
