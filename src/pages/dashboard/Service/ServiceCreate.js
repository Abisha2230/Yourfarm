
import React,{useState,useEffect,useRef} from "react";
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik ,FieldArray} from 'formik';
// material
import {Tab,Tabs, Box,Alert,CircularProgress,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio, Grid,Button, Card, Stack, TextField,MenuItem, Container, Typography, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { UploadAvatar } from '../../../components/upload';
// utils
import { capitalCase } from 'change-case';
//
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';

import { category_Details } from "src/_apis_";
import { Service_Details_Api } from "src/_apis_/service";
import {Files} from "src/_apis_/file";
import {countries} from "src/_apis_/DummyApis/country";
import {googleMapDetails} from "src/_apis_";
import { LanguageDetails } from "src/_apis_";
import { object, array, string, } from "yup";
// ----------------------------------------------------------------------

const ServiceCreate=()=>{
  const theme= useTheme();
  const tempFun = useRef();
  const tempFunOne = useRef();
  const tempFunTwo = useRef();
  const tempFunTh=useRef();
  const tempFour = useRef();
  const tempFive = useRef();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [languageList,setLanguageList]=useState([]);
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [categoryData,setCategoryData] = useState([]);
  const [filteres,setFilteres]=useState([]);
  const [diologBox,setDiologBox]=useState(false);
  const[languageProvider,setLanguageProvider]=useState([]);
  const [serviceGoogle,setServiceGoogle]=useState('');
 const [latitudes,setLatitudes] = useState('');
 const [longitudes,setLongitudes] = useState('');
  const Token  = JSON.parse(window.localStorage.getItem('Token')).useAuth;
  const { themeStretch } = useSettings();
  const UpdateUserSchema = Yup.object().shape({

    language: array()
    .of(
      object().shape({
        addl_info:string().required('Disclaimer  is required'),
        description:string().required('Description  is required'),
      })
    ),

    provider_language: array()
    .of(
      object().shape({
        provider_name:string().required('Provider Name  is required'),
      })
    ),
    category: Yup.string().required('Category  is required'),
    rate: Yup.number().min(1,"greater than 0").required('Rate is required'),
   
    other_address_details: Yup.number().test('len', 'Atleast 4 characters', val => !val || (val && val.toString().length >3)).test('len', 'Must be exactly 6 characters', val => !val || (val && val.toString().length <7)).required('Zipcode is required'),
    address_line1:Yup.string().required('Door no is  required'),
    address_line2:Yup.string().required('Street name is  required'),
    address_line3:Yup.string().required('Street name 2 is  required'),
    city:Yup.string().required('City is  required'),
    state:Yup.string().required('State is  required'),
    country:Yup.string().required('Country is  required'),
    phone: Yup.number().test('len', 'Must be exactly 10 characters', val => !val || (val && val.toString().length === 10)).required('Phone No is required'),
    photoURL: Yup.mixed().required('Picture is required'),
    logo: Yup.mixed().required('Picture is required'),
    visibility:Yup.string().required('Visibility is  required'),
    provideremailid:Yup.string().email().required('Email Id is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      language:[
         {description: "",
           addl_info: "",}
          ],
          provider_language:[{ provider_name:''}],
      category: '',
      photoURL: '',
      rate:'',
      phone:'',
      provideremailid:'',
      latitude:'',
      longitude:'',
      other_address_details:'',
      address_line1:'',
      address_line2:'',
      address_line3:'',
      city:'',
      state:'',
      country:'',
      logo:'',
      visibility:'',
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
     
      try {
        const data={
          category_id:Number(values.category),
          display_pic:values.photoURL,
          rate:values.rate,
          mobile_no:values.phone,
          email:values.provideremailid,
          latitude:latitudes,
          longitude:longitudes,
          logo:values.logo,
          address_line1:values.address_line1,
          address_line2:values.address_line2,
          address_line3:values.address_line3,
          city:values.city,
          state:values.state,
          country:values.country,
          other_address_details:values.other_address_details,
          visibility:Number(values.visibility==="on"?1:0),
          language:values.language,
          provider_language:values.provider_language,
        }
        if(latitudes!==""&&longitudes!==""){
          const res = await Service_Details_Api.postService(data,Token)
   
          if(res.status===200 && res.data.code===200){
            enqueueSnackbar('Service created successfully', { variant: 'success' });
            setTimeout(() => {
              navigate("/service");
            });
          }
         else{
          enqueueSnackbar('Creation faild', { variant: 'error' });
         }
        }

      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleDrop = 
   async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const ApiFileData = new FormData();
      ApiFileData.set('files', file);
      const res = await Files.FileUpload(ApiFileData);

      if (file) {
       
        if(res.status===200){
          setFieldValue("photoURL",res.data.data[0].path);
          enqueueSnackbar('Image uploaded successfully', { variant: 'success' });
        }
        else{
          enqueueSnackbar('Image uploaded failed', { variant: 'error' });
        }

      }
    };

  const handleDropLogo = 
    async (acceptedFiles) => {
       const file = acceptedFiles[0];
       const ApiFileData = new FormData();
       ApiFileData.set('files', file);
       const res = await Files.FileUpload(ApiFileData);
 
       if (file) {
        
         if(res.status===200){
          
          setFieldValue('logo',res.data.data[0].path );
           enqueueSnackbar('Image uploaded successfully', { variant: 'success' });
         }
         else{
           enqueueSnackbar('Image uploaded failed', { variant: 'error' });
         }
 
       }
     };
 
  const getCategory= async()=>{
    const res = await category_Details.categoryList(Token);
    if(res?.data?.code===200){
      if(isMountedRef.current){
        setCategoryData(res?.data?.data.filter((re)=>re.type===1 && re.visibility===1));
      }
    }
    };
    tempFunTh.current = getCategory

    const getLanguages=async()=>{
      const res = await LanguageDetails.getLanguageList(Token);
      if(res.status===200 && res?.data?.code===200){
        res.data.data.forEach(ele=>{
          ele.language_id = ele.id 
  delete ele.id 
  ele.addl_info="";
  ele.description="";
        });
    if(isMountedRef.current){
      setLanguageList(res.data.data.filter(u=>u.status===1));
      values.language.push({description: "", addl_info:""});
      setFieldValue("language",languageList );
    }
      }
  };
  tempFour.current = getLanguages;
   const getEditorProvicer=async()=>{
    const res = await LanguageDetails.getLanguageList(Token);
    if(res?.status===200 && res?.data?.code===200 ){
      res.data.data.forEach(r=>{
        r.language_id=r.id
        delete r.id
        r.provider_name="";
      })
    
  
      setLanguageProvider(res.data.data);
      setFieldValue("provider_language",languageProvider)
    }
   };
   tempFive.current = getEditorProvicer;
    const getMPAPI=React.useCallback(async()=>{
      const parms= `${values.address_line1}+${values.address_line2}+${values.address_line3}+${values.city}+${values.state}+${values.country}+${values.other_address_details}`
      setServiceGoogle(parms)
      if(serviceGoogle!==""){
      const res= await googleMapDetails.getLATLONG(serviceGoogle);
      if(res.status===200){
        setLongitudes(res.data.results[0]?.geometry.location.lng);
        setLatitudes(res.data.results[0]?.geometry.location.lat);
      }
    }
    },[values.address_line1,values.address_line2,values.address_line3,values.city,values.state,values.country,values.other_address_details,serviceGoogle]);
  
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const removeImg = () => {
    setFieldValue("photoURL", "");
  };
  const removeImgs=()=>{
    setFieldValue("logo", "");
  }
    useEffect(
      ()=>{
        getMPAPI();
      },[getMPAPI]
    );
 

    useEffect(
      ()=>{
        tempFour.current();
      },[]
    );
    useEffect(
      ()=>{
        tempFunTh.current();
      },[]
    );
    useEffect(
      ()=>{
        tempFive.current();
      },[]
    )
    const LanguSet=()=>{
      setFieldValue("language",languageList );
    }
    const ProviderSet=()=>{
      setFieldValue("provider_language",languageProvider );
    }
    tempFun.current=LanguSet;
   tempFunOne.current=ProviderSet;
    useEffect(()=>{
      tempFun.current();
      tempFunOne.current();
      },[languageList,languageProvider]);
   
    const languageAlert=()=>{
      if((errors.language?.filter(y=>y?.addl_info==="Disclaimer  is required"||y?.description==="Description  is required").length>0
      && errors.provider_language?.filter(o=>o?.provider_name==="Provider Name  is required").length>0 && touched.language?.filter(t=>t?.addl_info===true || t?.description===true).length>0 )||( touched.provider_language?.filter(t=>t?.provider_name===true).length>0)
         ){
         setDiologBox(true);
         const temp=[];
         const temp2=[];
         const filters=[];
         errors.language?.map((t,index)=>{
           if(t?.addl_info==="Disclaimer  is required"||t?.description==="Description  is required"){
           const t = values.language?.[index].language_id;
           temp?.push(t);
           }
           return(temp);
           });
           errors.provider_language?.map((o,index)=>{
             if(o?.provider_name==="Provider Name  is required"){
            const t2=values.provider_language?.[index].language_id;
            temp2?.push(t2);
             }
             return(temp2);
           })
           temp.map(t=>{
         languageList.filter(y=>y.language_id===t).forEach(y=>{
           filters.push(y);
             });
             return(filters);
           });
           temp2.map(t=>{
             languageList.filter(y=>y.language_id===t).forEach(y=>{
               filters.push(y);
                 });
                 return(filters); 
           });
           setFilteres([...new Set(filters)]);
       
       }
       else if(errors.language?.filter(y=>y?.addl_info==="Disclaimer  is required"||y?.description==="Description  is required").length===undefined && errors.provider_language?.filter(o=>o?.provider_name==="Provider Name  is required").length===undefined)
       {
         setDiologBox(false);
       }
      else{
         setDiologBox(false);
       }
      }
      tempFunTwo.current=languageAlert;
      useEffect(
        ()=>{
          tempFunTwo.current();
         
        },[isSubmitting]
      );
    countries.sort(function(a, b) {
      var nameA = a.label.toUpperCase(); // ignore upper and lowercase
      var nameB = b.label.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {

        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      return 0;
    });
  return(
    <Page title="Service Management | Animeta">
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading="Service Management"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: 'Service Management',
            href: PATH_DASHBOARD.service.root
          },
          {
            name: 'Service Create',
  
          },
        ]}
      
      />
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 5, px: 2,mb:"10px", textAlign: 'center' }}>
            
              <UploadAvatar
                accept="image/*"
                file={values.photoURL}
            
                onDrop={handleDrop}
                error={Boolean(touched.photoURL && errors.photoURL)}
                
              />

              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
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
                    Upload Service Image
                  </Typography>
                  ) : (
                    <Button
                      onClick={removeImg}
                      sx={{ borderRadius: "5px", mt: 5 }}
                      variant="outlined"
                      startIcon={<PersonRemoveIcon />}
                    >
                      Remove Service Image
                    </Button>
                  )}
            </Card>
            <Card sx={{ py:5, px: 2, textAlign: 'center' }}>
            
              <UploadAvatar
                accept="image/*"
                file={values.logo}
            
                onDrop={handleDropLogo}
                error={Boolean(touched.logo && errors.logo)}
                
              />

              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.logo && errors.logo}
              </FormHelperText>
            
     {values.logo === "" ? (  <Typography sx={{mt:3,fontSize:"15px",color:theme.palette.primary.main}}>
      Upload Service Provider Image
     </Typography>) :( <Button
                      onClick={removeImgs}
                      sx={{ borderRadius: "5px", mt: 5 }}
                      variant="outlined"
                      startIcon={<PersonRemoveIcon />}
                    >
                      Remove Provider Image
                    </Button>)}
     
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
            
              <Stack spacing={{ xs: 2, md: 3 }}>
              {diologBox && filteres.length>0 ? <Alert sx={{display:"flex",alignItems:"center",justifyContent:"flex-start"}} severity="error">
       {filteres.map((t)=>(
         <Typography key={t.language_id} sx={{fontSize:"13px"}}>
           {` Fill the Details for ${t.language_name} language`}
         </Typography>
       ))}
     </Alert> :""}
              <Tabs
            value={currentTab}
            scrollbuttons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
           
          >
            {languageList.map((tab,index) => (
              <Tab variant="scrollable"
               disableRipple key={tab.language_id} label={capitalCase(tab.language_name)} value={index} />
            ))}
          </Tabs>
 
           
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      {values.provider_language.length>0?
                <FieldArray
               
            name="provider_language"
            render={arrayHelpers => (
              <div  style={{width:"100%"}}>
              {
                  values.provider_language.map((lang,index) => (
                    <div key={index}>
                    {lang?.language_id===languageList?.[currentTab]?.language_id ?  
                    (<div>
<TextField  {...getFieldProps(`provider_language[${index}].provider_name`)} fullWidth 
                label="Provider Name" error={Boolean(touched.provider_language?.[index]?.provider_name && errors.provider_language?.[index]?.provider_name)}
                helperText={touched.provider_language?.[index]?.provider_name && errors.provider_language?.[index]?.provider_name} />

                    </div>)
                    :""}
                     </div>
                   )) 
                  }
               
               </div>
             )}
           />
           :
           <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                 <CircularProgress sx={{width:"20px!important",height:"20px!important"}} />
           </Box>
           }
                  
            
                    <TextField  fullWidth label="Provider Email" {...getFieldProps('provideremailid')} 
                 error={Boolean(touched.provideremailid && errors.provideremailid)}
                 helperText={touched.provideremailid && errors.provideremailid} />
              
              
                </Stack>
          
                <Stack direction={{xs:"column",md:"row"}} spacing={2}>
                <TextField fullWidth label="Phone Numbers" {...getFieldProps('phone')}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone} />
                          <TextField fullWidth label="Address line 1" {...getFieldProps('address_line1')} 
                 error={Boolean(touched.address_line1 && errors.address_line1)}
                 helperText={touched.address_line1 && errors.address_line1} />
                
                </Stack>
                <Stack direction={{xs:"column",md:"row"}} spacing={2}>
                <TextField fullWidth label="Address Line 2" {...getFieldProps('address_line2')}
                  error={Boolean(touched.address_line2 && errors.address_line2)}
                  helperText={touched.address_line2 && errors.address_line2}  />
                   <TextField fullWidth label="Street Name" {...getFieldProps('address_line3')}
                  error={Boolean(touched.address_line3 && errors.address_line3)}
                  helperText={touched.address_line3 && errors.address_line3}  />
                </Stack>
                <Stack direction={{xs:"column",md:"row"}} spacing={2}>
                <TextField fullWidth label="City" {...getFieldProps('city')}
                  error={Boolean(touched.city && errors.city)}
                  helperText={touched.city && errors.city}  />
                  <TextField fullWidth label="State" {...getFieldProps('state')}
                  error={Boolean(touched.state && errors.state)}
                  helperText={touched.state && errors.state}  />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                    select
                    fullWidth
                    label="Country"
                    placeholder="Country"
                    {...getFieldProps('country')}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    
                    {
                      countries.map((c)=>(
                        <MenuItem  key={c.label} value={c.label}>
                          {c.label}</MenuItem>
                      ))
                    }
                
                  </TextField> 

                  <TextField fullWidth label="Zip code" {...getFieldProps('other_address_details')} 
                 error={Boolean(touched.other_address_details && errors.other_address_details)}
                 helperText={touched.other_address_details && errors.other_address_details} />
                  </Stack>

                <Stack direction={{xs:"column",md:"row"}} spacing={2}>
                <TextField fullWidth label="Rate" {...getFieldProps('rate')} 
                 error={Boolean(touched.rate && errors.rate)}
                 helperText={touched.rate && errors.rate} />
                <TextField
                    select
                    fullWidth
                    label="Category"
                    placeholder="Category"
                    {...getFieldProps('category')}
                    error={Boolean(touched.category && errors.category)}
                    helperText={touched.category && errors.category}
                  >
                    
                    {
                      categoryData.map((c)=>(
                        <MenuItem key={c.id} value={c.id}>{c.category}</MenuItem>
                      ))
                    }
                
                  </TextField> 
                </Stack>
                <FormControl sx={{mt:"10px",display:"flex",padding:"0px 14px"}}>
      <FormLabel sx={{textAlign:"left",fontSize:"13px"}} id="demo-row-radio-buttons-group-label">Serivice Visibility</FormLabel>
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
                <FieldArray
            name="language"
            render={arrayHelpers => (
              <div>
              {
                  values.language.map((lang,index) => (
                    <div key={index}>
                    {lang?.language_id===languageList?.[currentTab]?.language_id ?  
                    (<div>
<TextField  sx={{my:"10px"}}  onChange={formik.handleChange}{...getFieldProps(`language[${index}].addl_info`)} fullWidth multiline minRows={4} maxRows={4} 
                label="Disclaimer" error={Boolean(touched.language?.[index]?.addl_info && errors.language?.[index]?.addl_info)}
                helperText={touched.language?.[index]?.addl_info && errors.language?.[index]?.addl_info} />


                <TextField 
                onChange={formik.handleChange}
                {...getFieldProps(`language[${index}].description`)} fullWidth multiline minRows={4} maxRows={4} 
                label="Description" error={Boolean(touched.language?.[index]?.description && errors.language?.[index]?.description)}
                helperText={touched.language?.[index]?.description && errors.language?.[index]?.description} />

                   </div>)
                   :""}
                    </div>
                  )) 
                 }
              
              </div>
            )}
          />
                
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
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
}
export default ServiceCreate;