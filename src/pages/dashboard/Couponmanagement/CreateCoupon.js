import React, { useState,useEffect,useRef } from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Form, FormikProvider, useFormik,FieldArray } from "formik";
import { capitalCase } from 'change-case';
import {
  Grid,
  Card,
  Stack,
  Button,
  TextField,
  Container,
  Box,
  Tabs,
  Typography,
  FormHelperText,
  FormControl,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Tab
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { UploadAvatar } from "../../../components/upload";
import { useNavigate } from "react-router-dom";
import { category_Details } from "src/_apis_";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import { PATH_DASHBOARD } from "../../../routes/paths";
import useSettings from "../../../hooks/useSettings";
import { useTheme } from "@mui/material/styles";
import { Item_Details } from "src/_apis_";
import { Files } from "../../../_apis_/file";
import { LanguageDetails } from "src/_apis_";
import { object, array, string, } from "yup";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// ----------------------------------------------------------------------

const CreateCoupon = () => {
  const [categoryData, setCategoryData] = useState([]);
  const isMountedRef = useIsMountedRef();
  const [currentTab, setCurrentTab] = useState(0);
  const [discountType,setDiscountType] =useState("");
  const [productlist,setProductlist] = useState();
  const [Price,serPrice] = useState("");
  const [filteres,setFilteres]=useState([]);
  const [diologBox,setDiologBox]=useState(false);
  const [languageList,setLanguageList]=useState([]);
  const [discounttpyes, setDiscountTypes] = useState("off");
  const theme = useTheme();
  const themFun=useRef();
  const tempFun=useRef();
  const tempFunOne=useRef();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const { themeStretch } = useSettings();
  const [related,setRelated]=useState([])
  const relate = useRef([])
  
  const UpdateUserSchema = Yup.object().shape({
  
    language: array()
    .of(
      object().shape({
        medicine_name: string().required("Productname is required"),
        discription: Yup.string().required("Description is required"),
        medicine_type: Yup.string().required("Medicine Type is required"),
        cattle_type: Yup.string().required("Category is required"),
      })
    ),
    productWeight: Yup.number().min(1,"greater than 0").required("Product Weight is required"),
    price: Yup.number().min(1,"greater than 0").required("Price is required"),
    photoURL: Yup.mixed().required("Image is required"),
    discountstatus: Yup.string().required("Discount status is required"),
    discounttype: Yup.string().required("Discount type is required"),
    discountvalue:discountType===1 ? Yup.number().min(1,"greater than 0").lessThan(Number(101),"offer is lessthen or equal to 100").required("Discount value is required"):Yup.number().min(1,"greater than 0").lessThan(Number(Price),"value lessthen price ").required("Discount value is required"),
    maxcat: Yup.number().required("Cattle is required"),
    visibility:Yup.string().required("Visibility  is required"),
  });
  const discountScheme = Yup.object().shape({
    code:Yup.string().required("Code is required"),
    description: Yup.string().required("Description is required"),
    discounttype: Yup.string().required("Discount type is required"),
    discountvalue: Yup.number().required("Discount amount is required"),
    expire_at: Yup.date().required("Expire date is required"),
  });

  const formik = useFormik({
    initialValues: {
      code:"",
      description:"",
      expire_at:"",
      discounttype: "",
      discountvalue: "",
    },

    validationSchema:discountScheme,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
      
        const data = {
         description:values.description,
         code:values.code,
         expires_at:new Date(values.expire_at),
          discount: Number(values.discountvalue),
          discount_type: Number(values.discounttype),
        };
        console.log(JSON.stringify(data)+'ddddddddddddddddd')
         
        const res = await Item_Details.CouponCreate(data, Token);
        console.log(JSON.stringify(res)+'rrrrrrrrrrrr')
        if (res?.data?.code === 200) {
          enqueueSnackbar("  Item Creation Successfully", {
            variant: "success",
          });
          setTimeout(() => {
            navigate("/coupon");
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
    return ()=>{
      if (values.discountstatus === 1) {
        setDiscountTypes("on");
      } else {
        setDiscountTypes("off");
      }
    }
  }, [values.discountstatus]);
  const getCategory =async() => {
    const res = await category_Details.categoryList(Token);
    if (res?.data?.code === 200) {
        res.data.data.forEach(t=>{
        if(t.language===null)
        {
          t.language=[]; 
        }
        }
        );
   if(isMountedRef.current){
    setCategoryData(
      res?.data?.data.filter((re) => re.type === 0 || re.type === 5 && re.visibility === 1 && re.language!==0)
    );
   }
  
    }
  };
//   tempFunOne.current = getCategory;
  const getLanguages=async()=>{
    const res = await LanguageDetails.getLanguageList(Token);
    if(res.status===200 && res?.data?.code===200){
      res.data.data.forEach(ele=>{
        ele.language_id = ele.id 
delete ele.id 
ele.medicine_type="";
ele.cattle_type="";
ele.medicine_name="";
ele.discription="";
      });
  if(isMountedRef.current){
    setLanguageList(res.data.data.filter(u=>u.status===1));
 
    setFieldValue("language",res.data.data.filter(u=>u.status===1) );
  }
    }
};
// tempFun.current=getLanguages;
const handleChangeTab = (event, newValue) => {
  setCurrentTab(newValue);
};
const removeImg = () => {
  setFieldValue("photoURL", "");
};

 
// useEffect(
//   ()=>{
//     tempFun.current();
//   },[]
// );
const getProduct = async() => {
  const res = await Item_Details.ItemsList(Token);
  setProductlist(res.data.data);
}

const addRelated = (event) => {
  if (event.target.checked) {
    relate.current = [...relate.current, parseInt(event.target.value)]
  } else {
    relate.current = relate.current.filter((item) => item !== parseInt(event.target.value))
  }
}

useEffect(
  ()=>{
    // tempFunOne.current();
    getProduct()
  },[]
);

  const errorAlert=()=>{
    if(errors.language?.filter(y=>y?.cattle_type==="Category is required"||y?.medicine_type==="Medicine Type is required"||
    y?.medicine_name==="Productname is required" ||y?.discription==="Description is required").length>0 && touched.language?.filter(t=>t?.cattle_type===true || t?.discription===true || t?.medicine_name===true||t?.medicine_type===true).length>0 ){
      setDiologBox(true);
      const temp=[];
      const filters=[];
      errors.language?.map((t,index)=>{
        if(t?.cattle_type==="Category is required"||t?.medicine_type==="Medicine Type is required"||
        t?.medicine_name==="Productname is required" ||t?.discription==="Description is required"){
        const t = values.language?.[index].language_id;
        temp?.push(t);
        }
        return(temp);
        });
        temp.map(t=>{
      languageList.filter(y=>y.language_id===t).forEach(y=>{
        filters.push(y);
          });
          return(filters);
        });
        setFilteres([...new Set(filters)]);
    
    }
   else{
      setDiologBox(false);
    }
  }
  themFun.current = errorAlert;
  useEffect(
    ()=>{
    //   themFun.current()
      
    },[isSubmitting]
  );
  useEffect(
   ()=> {serPrice(values.price);},[values.price]
  );
  useEffect(
    ()=> {setDiscountType(Number(values.discounttype));},[values.discounttype]
   );
 
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
              name: "Coupon Create",
            },
          ]}
        />
 <FormikProvider value={formik}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* <Grid item xs={12} md={4}>
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
              </Grid> */}

              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  {/* <Stack spacing={{ xs: 2, md: 3 }}>
                  {diologBox ? <Alert sx={{display:"flex",alignItems:"center",justifyContent:"flex-start"}} severity="error">
       {filteres.map((t)=>(
         <Typography key={t.language_id} sx={{fontSize:"13px"}}>
           {`Fill the Details for ${t.language_name} language`}
         </Typography>
       ))}
     </Alert> :""}
                  <Tabs
            value={currentTab}
            scrollbuttons="auto"
            variant="scrollable"
            onChange={handleChangeTab}
           
          >
            {languageList.map((tab,index) => (
              <Tab variant="scrollable"
               disableRipple key={tab.language_id} label={capitalCase(tab.language_name)} value={index} />
            ))}
          </Tabs>
      
<FieldArray
            name="language"
            render={arrayHelpers => (
              <div>
              {
                  languageList.map((lang,index) => (
                    <div key={index}>
                    {lang.language_id===languageList[currentTab].language_id ?  
                    (<div>
                     <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>

 <TextField
                      fullWidth
                      label="Product Name"
                    {...getFieldProps(`language[${index}].medicine_name`)}
                    error={Boolean(touched.language?.[index]?.medicine_name && errors.language?.[index]?.medicine_name)}
                    helperText={touched.language?.[index]?.medicine_name && errors.language?.[index]?.medicine_name}
 /> 
                 <TextField
        {...getFieldProps(`language[${index}].medicine_type`)}
    fullWidth
    label="Medicine Type"
    error={Boolean(touched.language?.[index]?.medicine_type && errors.language?.[index]?.medicine_type)}
                        helperText={touched.language?.[index]?.medicine_type && errors.language?.[index]?.medicine_type}
  />
                     </Stack>
                     <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
             <TextField
                        id="outlined-select-currency"
                        select
                        defaultValue=""
                        label="Category"
                        {...getFieldProps(`language[${index}].cattle_type`)}
                        fullWidth
                        error={Boolean(touched.language?.[index]?.cattle_type && errors.language?.[index]?.cattle_type)}
                        helperText={touched.language?.[index]?.cattle_type && errors.language?.[index]?.cattle_type}
                      >
                        {categoryData.map((option) => (
                          <MenuItem key={option.id} value={option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category?option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""}>
                           {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""}
                          </MenuItem>
                        ))}
                        </TextField>
                      </Stack>
                      <Stack  sx={{mt:"10px"}}  direction={{ xs: "column", md: "row" }} spacing={2}>
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
          />
                    <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>

<TextField
                 
                 fullWidth
                 label="Maximum Cattle"
                 {...getFieldProps(`maxcat`)}
                 error={Boolean(touched.maxcat && errors.maxcat)}
                 helperText={touched.maxcat && errors.maxcat}
               />

<TextField
                 
                 fullWidth
                 label="Kit Details"
                 {...getFieldProps(`kitdetails`)}
                 error={Boolean(touched.kitdetails && errors.kitdetails)}
                 helperText={touched.kitdetails && errors.kitdetails}
               />
                           </Stack>

                    <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      
                      fullWidth
                      label="Price"
                      {...getFieldProps("price")}
                      error={Boolean(
                        touched.price && errors.price)}
                      helperText={ touched.price &&  errors.price}
                    />
                    
                      <TextField
                        
                        fullWidth
                        label="Product Net Weight"
                        {...getFieldProps('productWeight')}
                        error={Boolean(
                          touched.productWeight && errors.productWeight
                        )}
                        helperText={
                          touched.productWeight  && errors.productWeight
                        }
                      />
                    </Stack>
                    <FormControl sx={{mt:"10px",display:"flex",padding:"0px 14px"}}>
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
                    <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
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
                    )}

<FormLabel sx={{textAlign:"left",fontSize:"13px",marginTop:5}}>Related Products</FormLabel>

{productlist?.map((item)=>{
  return(
  <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                      <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'600px'}}>
                      <img style={{height:40,width:'8%',objectFit:'cover'}}  src={item.image_url} alt="My Image" />
                      <h5 style={{width:'44%',marginLeft:'15px',fontWeight:'normal'}}>{item.medicine_name}</h5>
                      <h5  style={{width:'44%',fontWeight:'normal'}}>{item.cattle_type}</h5>
                      </div>
                   
                      <input
          type="checkbox"
          value={item.id}
          // checked={relate.current.includes(item.id)}
          onChange={addRelated}
        />
                      </Stack>
  );
})}



  
</Stack> */}    <Stack  direction={{ xs: "column", md: "row" }}
spacing={2}>
     <TextField
                      fullWidth
                      label="Code"
                    {...getFieldProps(`code`)}
                    error={Boolean(touched.code && errors.code)}
                    helperText={touched.code && errors.code}
 /> 
 
</Stack>
<Stack style={{marginTop:17}}>
<TextField
                     
                     {...getFieldProps(`description`)}
                     fullWidth
                     multiline
                     minRows={4}
                     maxRows={4}
                     label="Description"
                     error={Boolean(touched.description && errors.description)}
                   helperText={touched.description && errors.description}
                   />
</Stack>

<Stack  direction={{ xs: "column", md: "column" }}
                        spacing={2} style={{marginTop:13,marginBottom:13}}>
                            <FormLabel sx={{textAlign:"left",fontSize:"16px"}}>Expire Date</FormLabel>

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
export default CreateCoupon;
