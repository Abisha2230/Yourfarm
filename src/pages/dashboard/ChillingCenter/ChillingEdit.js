import React, { useState, useEffect,useRef } from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Form, FormikProvider, useFormik,FieldArray} from "formik";
import { capitalCase } from 'change-case';
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


// ----------------------------------------------------------------------

const ChillingEdit = () => {
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [categoryData, setCategoryData] = useState([]);
  const theme = useTheme();
  const tempFun=useRef();
  const tempFunOne=useRef();
  const tempFunTwo=useRef();
  const tempFunFour=useRef();
  const { themeStretch } = useSettings();
  const [discounttpyes, setDiscountTypes] = useState(0);
  const [discountType,setDiscountType] =useState("");
  const [Price,serPrice] = useState("");
  const [productlist,setProductlist] = useState();
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const fileId = useParams();
  const [getItemSignle, setGetItemSignle] = useState([]);
  const [currentTab, setCurrentTab] = useState(1);
  const [languageList,setLanguageList]=useState([]);
  const [filteres,setFilteres]=useState([]);
  const [diologBox,setDiologBox]=useState(false);
  const relate = useRef([])
  const [dairyins,SetDairyins] = useState();

  console.log(JSON.stringify(getItemSignle))
  useEffect(()=>{
    const getSalesper = async() => {
        const res = await Item_Details.DairyList(Token);
        SetDairyins(res?.data?.data);
    }
    getSalesper()
  },[])
  const UpdateUserSchema = Yup.object().shape({
    center_name: Yup.string().required("Center Name is required"),
    cc_mgr: Yup.string().required("CC Manager Name is required"),
    contact_no:Yup.string().test('len', 'Must be exactly 13 characters and Add +91 ', val => !val || (val && val.toString().length === 13)).required('Contact Number is required'),
    dairy_industry_id: Yup.number().required("Dairy Industry is required"),
    address_line1: Yup.mixed().required("Address_line1 is required"),
    address_line2: Yup.mixed().required("Address_line1 is required"),
    city: Yup.mixed().required("City is required"),
    state: Yup.mixed().required("State is required"),
    country: Yup.mixed().required("Country is required"),
    pincode:Yup.number().test('len', 'Must be exactly 6 characters', val => !val || (val && val.toString().length === 6)).required('Contact Number is required'),
  });
  const discountScheme = Yup.object().shape({
    
    dosageInfo: Yup.number().min(1,"greater than 0").required("Product net weight is required"),
    price: Yup.number().min(1,"greater than 0").required("price is required"),
    photoURL: Yup.mixed().required("image is required"),
    discountstatus: Yup.string().required("discount status is required"),
    discounttype: Yup.string(),
    discountvalue: Yup.string(),
    maxcat: Yup.string().required("Maximum Cattle is required"),
    visibility:Yup.string().required("Visibility is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      center_name:getItemSignle?.center_name||"",
      cc_mgr:getItemSignle?.cc_mgr||"",
        contact_no:getItemSignle?.contact_no||"",
        dairy_industry_id:getItemSignle?.dairy_industry_id||"",
        email:getItemSignle?.email||"",
        logo_url:getItemSignle?.logo_url||"",
        additional_info:getItemSignle?.additional_info||"",
        address_line1:getItemSignle?.address?.address_line1||"",
        address_line2:getItemSignle?.address?.address_line2||"",
        address_line3:getItemSignle?.address?.address_line3||"",
        city:getItemSignle?.address?.city||"",
        state:getItemSignle?.address?.state||"",
        country:getItemSignle?.address?.country||"",
        other_address_details:getItemSignle?.address?.other_address_details||"",
        pincode:getItemSignle?.address?.pincode||"",
        // company_name:getItemSignle.company_name||"",
        // procurement_mgr:getItemSignle.procurement_mgr||"",
        // contact_no:getItemSignle.contact_no||"",
        // email:getItemSignle.email||"",
        // logo_url:getItemSignle.logo_url||"",
        // additional_info:getItemSignle.additional_info||"",
        // address_id:getItemSignle.address_id||"",
    //   language:getItemSignle.language ||[{language_id:'',
    //     language_code:'',}],
    //   photoURL: getItemSignle.image_url || "",
    //   dosageInfo: getItemSignle.package_weight_in_gram || "",
    //   price: getItemSignle.amount || "",
    //   discountstatus: JSON.stringify(getItemSignle.discount_status)|| "",
    //   discounttype:JSON.stringify( getItemSignle.discount_type) || "",
    //   discountvalue: getItemSignle.discount_amount || "",
    //   maxcat: getItemSignle.maximum_cattle || "",
    //   visibility:getItemSignle.visibility===1 ? "on":"off" || "",
    //   kitdetails:getItemSignle.kit_details || "",

    },
    validationSchema: UpdateUserSchema ,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {

        const data = {
          center_name:values.center_name,
          cc_mgr:values.cc_mgr,
          dairy_industry_id:values.dairy_industry_id,
          contact_no:values.contact_no,
          email:values.email,
          logo_url:values.logo_url,
          additional_info:values.additional_info,
          address:{
            address_line1:values.address_line1,
            address_line2:values.address_line2,
            address_line3:values.address_line3,
            city:values.city,
            state:values.state,
            country:values.country,
            other_address_details:values.other_address_details,
            pincode:values.pincode
          }
        }
     
        console.log(JSON.stringify(data))
          const res = await Item_Details.ChillingEdit(data, fileId.id,Token);
          console.log(JSON.stringify(res))
          if (res.data.code === 200) {
            enqueueSnackbar("Update success", { variant: "success" });
            setTimeout(() => {
              navigate("/chilling");
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
      setFieldValue("logo_url", imageUrl["path"]);
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
 







  useEffect(() => {
    if (values.discountstatus === '1') {
      setDiscountTypes("on");
    } else {
      setDiscountTypes("off");
    }
    return ()=>{
      if (values.discountstatus === '1') {
        setDiscountTypes("on");
      } else {
        setDiscountTypes("off");
      }
    }
  }, [values.discountstatus]);

  const getCategory =async () => {
    const res = await category_Details.categoryList(Token);
    if (res?.data?.code === 200) {
      res?.data?.data?.forEach(ele=>{
        ele.cattle_type?.toLowerCase();
      })
      setCategoryData(
        res?.data?.data.filter(
          (re) => re.type === 0 || re.type === 5 && re.visibility ===1 
        )
      );
     
    }
  };
  tempFunTwo.current=getCategory;
  const getItemsingle = async () => {
    const res = await Item_Details.ChillingbyId(Token,fileId.id);
    console.log(JSON.stringify(res?.data?.code)+'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
    if (res?.data?.code === 200) {
      // relate.current = res.data.data[0].related_products

      // res.data.data.forEach(ele=>{
        // ele.cattle_type=ele.cattle_type?.toLowerCase();
        // ele.language.forEach(polo=>{
        //   polo.cattle_type =  polo.cattle_type.toLowerCase();
        // },
        // )
        // ele.language = ele.language.filter(t=> languageList.some(y=>y.language_id===t.language_id));
    // });
      // if (isMountedRef.current) {
      setGetItemSignle(res?.data?.data);
      // }
    }
  }
  tempFunFour.current = getItemsingle;
useEffect(
  ()=>{
    tempFunTwo.current();
  },[]
);
useEffect(()=>{
  getItemsingle();
},[])

useEffect(
  ()=>{
    // tempFunOne.current();
    return()=>{
      // emptyFun();
    }
  },[]
);

 
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
 




const getProduct = async() => {
  const res = await Item_Details.ItemsList(Token);
  setProductlist(res.data.data);
}
useEffect(
  ()=>{
    // tempFunOne.current();
    // getProduct()
  },[currentTab]
);


const addRelated = (event) => {
  if (event.target.checked) {
    relate.current = [...relate.current, parseInt(event.target.value)]
  } else {
    relate.current = relate.current.filter((item) => item !== parseInt(event.target.value))
  }
}

  return (
    <Page title="Chilling Management | Animeta">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Chilling Center Management"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "Chilling Center Management",
              href: PATH_DASHBOARD.chilling.root,
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
                      values.photoURL === "removed" ? null : values.logo_url
                    }
                    onDrop={handleDrop}
                    error={Boolean(touched.logo_url && errors.logo_url)}
                  />

                  <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                    {touched.logo_url && errors.logo_url}
                  </FormHelperText>

                  {values.logo_url === "" ? (
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
                <Card sx={{ p: 3 }}>
                  <Stack spacing={{ xs: 2, md: 3 }}>
                  {/* {diologBox ? <Alert sx={{display:"flex",alignItems:"center",justifyContent:"flex-start"}} severity="error">
       {filteres.map((t)=>(
         <Typography key={t.language_id} sx={{fontSize:"13px"}}>
           {`Fill the Details for ${t.language_name} language`}
         </Typography>
       ))}
     </Alert> :""} */}
                  {/* <Tabs
            value={currentTab}
            scrollbuttons="auto"
            variant="scrollable"
            //allowScrollButtonsMobile
            onChange={handleChangeTab}
           
          >
            {languageList.map((tab,index) => (
              <Tab variant="scrollable"
               disableRipple key={tab.language_id} label={capitalCase(tab.language_name)} value={index} />
            ))}
          </Tabs> */}
          {/* <FieldArray
            name="language"
            render={arrayHelpers => (
              <div>
              {
                 values.language.map((lang,index) => (
                    <div key={index}>
                    {lang.language_id === languageList[currentTab]?.language_id?  
                    (<div>
                       <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                     <TextField
                        fullWidth
                        label={"Product Name"}
                        {...getFieldProps(`language[${index}].medicine_name`)}
                    error={Boolean(touched.language?.[index]?.medicine_name && errors.language?.[index]?.medicine_name)}
                    helperText={touched.language?.[index]?.medicine_name && errors.language?.[index]?.medicine_name}
                      />
                    <TextField
                        fullWidth
                        label="Medicine Type"
                        {...getFieldProps(`language[${index}].medicine_type`)}
                        error={Boolean(touched.language?.[index]?.medicine_type && errors.language?.[index]?.medicine_type)}
                                            helperText={touched.language?.[index]?.medicine_type && errors.language?.[index]?.medicine_type}
                      />
                       </Stack>
<Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                      {categoryData.length>0? <TextField
select
                        fullWidth
                        label="Category"
                        placeholder="Category"
                        {...getFieldProps(`language[${index}].cattle_type`)}
                        error={Boolean(touched.language?.[index]?.cattle_type && errors.language?.[index]?.cattle_type)}
                        helperText={touched.language?.[index]?.cattle_type && errors.language?.[index]?.cattle_type}
                     >
                        {categoryData.map((option) => (
                            <MenuItem key={option.id} value={option.language?.filter(t=>t?.language_id===languageList[currentTab]?.language_id)?.[0]?.category?.toLowerCase()?option.language?.filter(t=>t?.language_id===languageList[currentTab]?.language_id)?.[0]?.category?.toLowerCase():""}>
                          {option.language?.filter(t=>t?.language_id===languageList[currentTab]?.language_id)?.[0]?.category }
                         </MenuItem>
                        ))}
                      </TextField>:""}
                    </Stack>
                          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                       <TextField
                       {...getFieldProps(`language[${index}].discription`)}
                      fullWidth
                      multiline
                      minRows={4}
                      maxRows={4}
                      label="Description"
                      error={Boolean(touched.language?.[index]?.discription && errors.language?.[index]?.discription)}
                      helperText={touched.language?.[index]?.discription && errors.language?.[index]?.discription}
                    />
                    </Stack>
</div>)
                   :""}
                    </div>
                  )) 
                 }
              
              </div>
            )}
            /> */}
            {(dairyins &&dairyins.length) && <Stack>
          <TextField
        fullWidth
          id="outlined-select-currency"
          select
          label="Dairy Industry"
          value={values.dairy_industry_id}
          onChange={(e)=>setFieldValue('dairy_industry_id',e.target.value)}
          SelectProps={{
            native: true
          }}
          error={Boolean(touched.dairy_industry_id && errors.dairy_industry_id)}
                 helperText={touched.dairy_industry_id && errors.dairy_industry_id}
        >
          {dairyins.map((option) => (
            <option key={option?.id} value={option?.id}>
              {option?.company_name}
            </option>
          ))}
        </TextField>
          </Stack>}

<Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>

<TextField
                 
                 fullWidth
                 label="Center Name"
                 {...getFieldProps(`center_name`)}
                 error={Boolean(touched.center_name && errors.center_name)}
                 helperText={touched.center_name && errors.center_name}
               />

<TextField
                 
                 fullWidth
                 label="CC Mgr"
                 {...getFieldProps(`cc_mgr`)}
                 error={Boolean(touched.cc_mgr && errors.cc_mgr)}
                 helperText={touched.cc_mgr && errors.cc_mgr}
               />
                           </Stack>
                   
                   <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      
                      fullWidth
                      label="Contact No"
                      {...getFieldProps("contact_no")}
                      error={Boolean(
                        touched.contact_no && errors.contact_no)}
                      helperText={ touched.contact_no &&  errors.contact_no}
                    />
                    
                      <TextField
                        
                        fullWidth
                        label="Email"
                        {...getFieldProps('email')}
                        error={Boolean(
                          touched.email && errors.email
                        )}
                        helperText={
                          touched.email  && errors.email
                        }
                      />
                    </Stack>
                    <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      
                      fullWidth
                      label="Additional Info"
                      {...getFieldProps("additional_info")}
                      error={Boolean(
                        touched.additional_info && errors.additional_info)}
                      helperText={ touched.additional_info &&  errors.additional_info}
                    />
                    
                      {/* <TextField
                        
                        fullWidth
                        label="Address Id"
                        {...getFieldProps('address_id')}
                        error={Boolean(
                          touched.address_id && errors.address_id
                        )}
                        helperText={
                          touched.address_id  && errors.address_id
                        }
                      /> */}
                    </Stack>
                    <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      
                      fullWidth
                      label="Addressline 1"
                      {...getFieldProps("address_line1")}
                      error={Boolean(
                        touched.address_line1 && errors.address_line1)}
                      helperText={ touched.address_line1 &&  errors.address_line1}
                    />
                    
                      <TextField
                        
                        fullWidth
                        label="Addressline 2"
                        {...getFieldProps('address_line2')}
                        error={Boolean(
                          touched.address_line2 && errors.address_line2
                        )}
                        helperText={
                          touched.address_line2  && errors.address_line2
                        }
                      />
                    </Stack>  
                     <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      
                      fullWidth
                      label="Addressline 3"
                      {...getFieldProps("address_line3")}
                      error={Boolean(
                        touched.address_line3 && errors.address_line3)}
                      helperText={ touched.address_line3 &&  errors.address_line3}
                    />
                    
                      <TextField
                        
                        fullWidth
                        label="City"
                        {...getFieldProps('city')}
                        error={Boolean(
                          touched.city && errors.city
                        )}
                        helperText={
                          touched.city  && errors.city
                        }
                      />
                     <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      
                      fullWidth
                      label="State"
                      {...getFieldProps("state")}
                      error={Boolean(
                        touched.state && errors.state)}
                      helperText={ touched.state &&  errors.state}
                    />
                    
                      <TextField
                        
                        fullWidth
                        label="Country"
                        {...getFieldProps('country')}
                        error={Boolean(
                          touched.country && errors.country
                        )}
                        helperText={
                          touched.country  && errors.country
                        }
                      />
                    </Stack>
                    </Stack>   
                    <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      
                      fullWidth
                      label="Pincode"
                      {...getFieldProps("pincode")}
                      error={Boolean(
                        touched.pincode && errors.pincode)}
                      helperText={ touched.pincode &&  errors.pincode}
                    />
                    
                    </Stack>
                      <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      
                      fullWidth
                      multiline
                      minRows={4}
                      maxRows={4}
                      label="Other address details"
                      {...getFieldProps("additional_info")}
                      error={Boolean(
                        touched.additional_info && errors.additional_info)}
                      helperText={ touched.additional_info &&  errors.additional_info}
                    />
                    
                    </Stack>
                    {/* <FormControl>
                    <FormLabel sx={{textAlign:"left",fontSize:"13px"}} id="demo-row-radio-buttons-group-label">Item Visibility</FormLabel>
      <RadioGroup
      {...getFieldProps('visibility')} 
     
    
      
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
      >
        <FormControlLabel value={"off"} control={<Radio  name="visibility"
        id="radioOption1" />} label="Off" />
        <FormControlLabel value={"on"} control={<Radio   name="visibility"
        id="radioOption2"/>} label="On" />
      </RadioGroup>
    </FormControl>
    
             
    <FormHelperText error sx={{ px: 2,mb:3,mt:"0px!important", textAlign: 'left' }}>
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
                        <MenuItem value={'1'}>On</MenuItem>
                        <MenuItem value={'0'}>Off</MenuItem>
                      </TextField>
                  
                    </Stack> */}
                    {/* {values.discountstatus === '1' && (
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
                          label="Discount Value"
                          {...getFieldProps("discountvalue")}
                          error={Boolean(
                            touched.discountvalue && errors.discountvalue
                          )}
                          helperText={
                            touched.discountvalue && errors.discountvalue
                          }
                        />
                      </Stack>
                    )} */}

{/* <FormLabel sx={{textAlign:"left",fontSize:"13px",marginTop:5}}>Related Products</FormLabel> */}

{/* {productlist?.map((item)=>{
  return(
  <Stack key={item.id} sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                      <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'600px'}}>
                      <img style={{height:40,width:'8%',objectFit:'cover'}}  src={item.image_url} alt="My Image" />
                      <h5 style={{width:'44%',marginLeft:'15px',fontWeight:'normal'}}>{item.medicine_name}</h5>
                      <h5  style={{width:'44%',fontWeight:'normal'}}>{item.cattle_type}</h5>
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
})} */}

                    
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
export default ChillingEdit;
