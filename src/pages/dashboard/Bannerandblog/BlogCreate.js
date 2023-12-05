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

const BlogCreate = () => {
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
  const [user,setuser] = useState(localStorage.getItem('Role'));

  
  const UpdateUserSchema = Yup.object().shape({
  
    // language: array()
    // .of(
    //   object().shape({
        // title: string().required("Title is required"),
        // contents: Yup.string().required("Contents is required"),
      // })
    // ),
    link: Yup.string().required("Link is required"),
    type: Yup.string().required("Type is required"),
    // youtubeid:Yup.string().required("Youtube Id is required"),
    featured: Yup.number().required("featured is required"),
    visibility:Yup.string().required("Visibility  is required"),
    // photoURL: Yup.mixed().required("Image is required"),
  });
  const discountScheme = Yup.object().shape({
    language: array()
    .of(
      object().shape({
        title: string().required("Title is required"),
        contents: Yup.string().required("Contents is required"),
      })
    ),
    link: Yup.string().required("Link is required"),
    type: Yup.string().required("Type is required"),
    youtubeid: Yup.number().required("Youtube Id is required"),
    // discountvalue: Yup.string(),
    featured: Yup.number().required("featured is required"),
    visibility:Yup.string().required("Visibility  is required"),
  });

  const formik = useFormik({
    initialValues: {
      language:[ {
        title: "",
      contents: "",
      }],
      type:"",
      photoURL: "",
      youtubeid: "",
      link: "",
      visibility:"",
      featured:"",
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        var lang = values.language[0] ; 
        var lang1 = values.language[1];
        if(values.language[0].contents === '') {
          lang = {...values.language[0],contents:[]}
        }else{
          lang = {...values.language[0],contents:JSON.parse(values.language[0].contents)}
        }
        
        if(values.language[1].contents === '') {
          lang1 = {...values.language[1],contents:[]}
        }else{
          lang1 = {...values.language[1],contents:JSON.parse(values.language[1].contents)}
        }
        // console.log(values.language[0].contents)
        // console.log(JSON.parse(values.language[0].contents))
  // const jsonArray = JSON.parse(values.language[0].contents);
  // const jsonArrayType = typeof jsonArray;
  // console.log(jsonArrayType)

        const data = {
          type:values.type,
          youtube_video_id: values.youtubeid,
          contents:[],
          title:"",
          // maximum_cattle: Number(values.maxcat),
          link: values.link,
          featured: Number(values.featured),
          // is_one_packet_for_many:false,
          // discount_amount: Number(values.discountvalue),
          // discount_type: Number(values.discounttype),
          // discount_status: Number(values.discountstatus),
          visibility:Number(values.visibility==="on"?1:0),
          img_url: values.photoURL,
          language:[...[],lang,lang1],
        };


        const res = await Item_Details.ResourceCreate(data, Token);
        console.log(JSON.stringify(res))
        if (res?.data?.code === 200) {
          enqueueSnackbar("  Item Creation Successfully", {
            variant: "success",
          });
          setTimeout(() => {
            navigate("/BlogBanner");
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
  tempFunOne.current = getCategory;
  const getLanguages=async()=>{
    const res = await LanguageDetails.getLanguageList(Token);
    if(res.status===200 && res?.data?.code===200){
      res.data.data.forEach(ele=>{
        ele.language_id = ele.id 
delete ele.id 
ele.title="";
ele.contents="";
// ele.medicine_name="";
// ele.discription="";
      });
  if(isMountedRef.current){
    setLanguageList(res.data.data.filter(u=>u.status===1));
 
    setFieldValue("language",res.data.data.filter(u=>u.status===1) );
  }
    }
};
tempFun.current=getLanguages;
const handleChangeTab = (event, newValue) => {
  setCurrentTab(newValue);
};
const removeImg = () => {
  setFieldValue("photoURL", "");
};

 
useEffect(
  ()=>{
    tempFun.current();
  },[]
);
// const getProduct = async() => {
//   const res = await Item_Details.ItemsList(Token);
//   setProductlist(res.data.data);
// }

const addRelated = (event) => {
  if (event.target.checked) {
    relate.current = [...relate.current, parseInt(event.target.value)]
  } else {
    relate.current = relate.current.filter((item) => item !== parseInt(event.target.value))
  }
}

useEffect(
  ()=>{
    tempFunOne.current();
    // getProduct()
  },[currentTab]
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
  // themFun.current = errorAlert;
  // useEffect(
  //   ()=>{
  //     themFun.current()
      
  //   },[isSubmitting]
  // );
  // useEffect(
  //  ()=> {serPrice(values.price);},[values.price]
  // );
  // useEffect(
  //   ()=> {setDiscountType(Number(values.discounttype));},[values.discounttype]
  //  );
 
 return (
    <Page title="Online Resource Management | Animeta">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Online Resource Management"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "Online Resource Management",
              href: PATH_DASHBOARD.BlogBanner.root,
            },
            {
              name: "Item Create",
            },
          ]}
        />
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

                 
                  {values.photoURL === "" ? (
                     <Typography
                     sx={{
                       mt: 3,
                       fontSize: "15px",
                       color: theme.palette.primary.main,
                     }}
                   >
                     Upload  Image
                   </Typography>
                  ) : (
                    <Button
                      onClick={removeImg}
                      sx={{ borderRadius: "5px", mt: 5 }}
                      variant="outlined"
                      startIcon={<PersonRemoveIcon />}
                    >
                      Remove  Image
                    </Button>
                  )}
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={{ xs: 2, md: 3 }}>
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
                      label="Title"
                    {...getFieldProps(`language[${index}].title`)}
                    error={Boolean(touched.language?.[index]?.title && errors.language?.[index]?.title)}
                    helperText={touched.language?.[index]?.title && errors.language?.[index]?.title}
 /> 
                 <TextField
        {...getFieldProps(`language[${index}].contents`)}
    fullWidth
    label="Contents"
    error={Boolean(touched.language?.[index]?.contents && errors.language?.[index]?.contents)}
                        helperText={touched.language?.[index]?.contents && errors.language?.[index]?.contents}
  />
                     </Stack>
                     
                      {/* <Stack  sx={{mt:"10px"}}  direction={{ xs: "column", md: "row" }} spacing={2}>
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
            
                       </Stack> */}
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
                        id="outlined-select-currency"
                        select
                        defaultValue=""
                        label="Category"
                        {...getFieldProps(`type`)}
                        fullWidth
                        error={Boolean(touched.type && errors.type)}
                        helperText={touched.type && errors.type}
                      >
                        {/* {categoryData.map((option) => ( */}
                          <MenuItem value={"நாட்டு மாடு"}>
                          நாட்டு மாடு
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"கறவை மாடு"}>
                          கறவை மாடு
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"வெள்ளாடு"}>
                          வெள்ளாடு
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"நாட்டு கோழி"}>
                          நாட்டு கோழி
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"banner"}>
                          banner
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem><MenuItem  value={"blog"}>
                          blog
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"doctor"}>
                          doctor
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"menu"}>
                          menu
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem value={"partner"}>
                          partner
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"statistics"}>
                          statistics
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"testimonial"}>
                          testimonial
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          
                        </TextField>
                      </Stack>
                    <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>

<TextField
                 
                 fullWidth
                 label="Link"
                 {...getFieldProps(`link`)}
                 error={Boolean(touched.link && errors.link)}
                 helperText={touched.link && errors.link}
               />

<TextField
                 
                 fullWidth
                 label="Featured"
                 {...getFieldProps(`featured`)}
                 error={Boolean(touched.featured && errors.featured)}
                 helperText={touched.featured && errors.featured}
               />
                           </Stack>

                    <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      
                      fullWidth
                      label="Youtube Id"
                      {...getFieldProps("youtubeid")}
                      error={Boolean(
                        touched.youtubeid && errors.youtubeid)}
                      helperText={ touched.youtubeid &&  errors.youtubeid}
                    />
                    
                      {/* <TextField
                        
                        fullWidth
                        label="Product Net Weight"
                        {...getFieldProps('productWeight')}
                        error={Boolean(
                          touched.productWeight && errors.productWeight
                        )}
                        helperText={
                          touched.productWeight  && errors.productWeight
                        }
                      /> */}
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
        {(values.type === 'menu' && user === 'Admin') &&
        <FormControlLabel value={"on"} control={<Radio   name="visibility"
        id="radioOption2"/>} label="On" />
        }
        {values.type !== 'menu' &&
        <FormControlLabel value={"on"} control={<Radio   name="visibility"
        id="radioOption2"/>} label="On" />}
      </RadioGroup>
    </FormControl>
    
             
    {/* <FormHelperText error sx={{ px: 2,mb:3,mt:"0px!important", textAlign: 'left' }}>
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
                      </Stack> */}
                     
                    {/* {values.discountstatus === 1 && (
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
                    )} */}

{/* <FormLabel sx={{textAlign:"left",fontSize:"13px",marginTop:5}}>Related Products</FormLabel>

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
export default BlogCreate;
