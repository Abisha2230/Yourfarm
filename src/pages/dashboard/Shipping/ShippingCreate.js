
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

const ShippingCreate=()=>{
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


    provider_language: array()
    .of(
      object().shape({
        provider_name:string().required('Provider Name  is required'),
      })
    ),
   
    other_address_details: Yup.number().test('len', 'Atleast 4 characters', val => !val || (val && val.toString().length >3)).test('len', 'Must be exactly 6 characters', val => !val || (val && val.toString().length <7)).required('Zipcode is required'),
    address_line1:Yup.string().required('Door no is  required'),
    address_line2:Yup.string().required('Street name is  required'),
    address_line3:Yup.string().required('Street name 2 is  required'),
    city:Yup.string().required('City is  required'),
    state:Yup.string().required('State is  required'),
    country:Yup.string().required('Country is  required'),
    phone: Yup.number().test('len', 'Must be exactly 10 characters', val => !val || (val && val.toString().length === 10)).required('Phone No is required'),
    // photoURL: Yup.mixed().required('Picture is required'),
    // logo: Yup.mixed().required('Picture is required'),
    visibility:Yup.string().required('Visibility is  required'),
    provideremailid:Yup.string().email().required('Email Id is required'),
    tn05:Yup.number().required('Value for 0.5 kg')
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
      tn05:'',
      tn1:'',
      tn2:'',
      tn3:'',
      tn4:'',
      tn5:'',
      tn6:'',
      tn7:'',
      tn8:'',
      tn9:'',
      tn10:''
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
     
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
        tn05:values.tn05,
        tn1:values.tn1,
        tn2:values.tn2,
        tn3:values.tn3,
        tn4:values.tn4,
        tn5:values.tn5,
        tn6:values.tn6,
        tn7:values.tn7,
        tn8:values.tn8,
        tn9:values.tn9,
        tn10:values.tn10,
      }

      // try {
      //   const data={
      //     category_id:Number(values.category),
      //     display_pic:values.photoURL,
      //     rate:values.rate,
      //     mobile_no:values.phone,
      //     email:values.provideremailid,
      //     latitude:latitudes,
      //     longitude:longitudes,
      //     logo:values.logo,
      //     address_line1:values.address_line1,
      //     address_line2:values.address_line2,
      //     address_line3:values.address_line3,
      //     city:values.city,
      //     state:values.state,
      //     country:values.country,
      //     other_address_details:values.other_address_details,
      //     visibility:Number(values.visibility==="on"?1:0),
      //     language:values.language,
      //     provider_language:values.provider_language,
      //   }
      //   if(latitudes!==""&&longitudes!==""){
      //     const res = await Service_Details_Api.postService(data,Token)
   
      //     if(res.status===200 && res.data.code===200){
      //       enqueueSnackbar('Service created successfully', { variant: 'success' });
      //       setTimeout(() => {
      //         navigate("/service");
      //       });
      //     }
      //    else{
      //     enqueueSnackbar('Creation faild', { variant: 'error' });
      //    }
      //   }

      // } catch (error) {
      //   if (isMountedRef.current) {
      //     setErrors({ afterSubmit: error.code });
      //     setSubmitting(false);
      //   }
      // }
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
    <Page title="Shipping Provider Management | Animeta">
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading="Shipping Provider Management"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: 'Shipping Provider Management',
            href: PATH_DASHBOARD.shipping.root
          },
          {
            name: 'Shipping Create',
  
          },
        ]}
      
      />
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
         

          <Grid item xs={12} md={12}>
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

                
    
             
 
                
              </Stack>
              

              {/* <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </Box> */}
            </Card>
          </Grid>


          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
            
              <Stack spacing={{ xs: 2, md: 3 }}>
              
                   <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>

                    <TextField disabled={true} fullWidth label="TN" />

                  <TextField  fullWidth label="0.5" {...getFieldProps('tn05')} 
                 error={Boolean(touched.tn05 && errors.tn05)}
                 helperText={touched.tn05 && errors.tn05} />

                 <TextField  fullWidth label="1" {...getFieldProps('tn1')} 
                 error={Boolean(touched.tn1 && errors.tn1)}
                 helperText={touched.tn1 && errors.tn1} />

                 <TextField  fullWidth label="2" {...getFieldProps('tn2')} 
                 error={Boolean(touched.tn2 && errors.tn2)}
                 helperText={touched.tn2 && errors.tn2} />

                 <TextField  fullWidth label="3" {...getFieldProps('tn3')} 
                 error={Boolean(touched.tn3 && errors.tn3)}
                 helperText={touched.tn3 && errors.tn3} />

                 <TextField  fullWidth label="4" {...getFieldProps('tn4')} 
                 error={Boolean(touched.tn4 && errors.tn4)}
                 helperText={touched.tn4 && errors.tn4} />

                 <TextField  fullWidth label="5" {...getFieldProps('tn5')} 
                 error={Boolean(touched.tn5 && errors.tn5)}
                 helperText={touched.tn5 && errors.tn5} />

                 <TextField  fullWidth label="6" {...getFieldProps('tn6')} 
                 error={Boolean(touched.tn6 && errors.tn6)}
                 helperText={touched.tn6 && errors.tn6} />

                 <TextField  fullWidth label="7" {...getFieldProps('tn7')} 
                 error={Boolean(touched.tn7 && errors.tn7)}
                 helperText={touched.tn7 && errors.tn7} />

                 <TextField  fullWidth label="8" {...getFieldProps('tn8')} 
                 error={Boolean(touched.tn8 && errors.tn8)}
                 helperText={touched.tn8 && errors.tn8} />

                 <TextField  fullWidth label="9" {...getFieldProps('tn9')} 
                 error={Boolean(touched.tn9 && errors.tn9)}
                 helperText={touched.tn9 && errors.tn9} />

                 <TextField  fullWidth label="10" {...getFieldProps('tn10')} 
                 error={Boolean(touched.tn10 && errors.tn10)}
                 helperText={touched.tn10 && errors.tn10} />
              
              
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>

<TextField disabled={true} fullWidth label="KL" />

<TextField  fullWidth label="0.5" {...getFieldProps('tn05')} 
error={Boolean(touched.tn05 && errors.tn05)}
helperText={touched.tn05 && errors.tn05} />

<TextField  fullWidth label="1" {...getFieldProps('tn1')} 
error={Boolean(touched.tn1 && errors.tn1)}
helperText={touched.tn1 && errors.tn1} />

<TextField  fullWidth label="2" {...getFieldProps('tn2')} 
error={Boolean(touched.tn2 && errors.tn2)}
helperText={touched.tn2 && errors.tn2} />

<TextField  fullWidth label="3" {...getFieldProps('tn3')} 
error={Boolean(touched.tn3 && errors.tn3)}
helperText={touched.tn3 && errors.tn3} />

<TextField  fullWidth label="4" {...getFieldProps('tn4')} 
error={Boolean(touched.tn4 && errors.tn4)}
helperText={touched.tn4 && errors.tn4} />

<TextField  fullWidth label="5" {...getFieldProps('tn5')} 
error={Boolean(touched.tn5 && errors.tn5)}
helperText={touched.tn5 && errors.tn5} />

<TextField  fullWidth label="6" {...getFieldProps('tn6')} 
error={Boolean(touched.tn6 && errors.tn6)}
helperText={touched.tn6 && errors.tn6} />

<TextField  fullWidth label="7" {...getFieldProps('tn7')} 
error={Boolean(touched.tn7 && errors.tn7)}
helperText={touched.tn7 && errors.tn7} />

<TextField  fullWidth label="8" {...getFieldProps('tn8')} 
error={Boolean(touched.tn8 && errors.tn8)}
helperText={touched.tn8 && errors.tn8} />

<TextField  fullWidth label="9" {...getFieldProps('tn9')} 
error={Boolean(touched.tn9 && errors.tn9)}
helperText={touched.tn9 && errors.tn9} />

<TextField  fullWidth label="10" {...getFieldProps('tn10')} 
error={Boolean(touched.tn10 && errors.tn10)}
helperText={touched.tn10 && errors.tn10} />


</Stack>

<Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>

<TextField disabled={true} fullWidth label="KR" />

<TextField  fullWidth label="0.5" {...getFieldProps('tn05')} 
error={Boolean(touched.tn05 && errors.tn05)}
helperText={touched.tn05 && errors.tn05} />

<TextField  fullWidth label="1" {...getFieldProps('tn1')} 
error={Boolean(touched.tn1 && errors.tn1)}
helperText={touched.tn1 && errors.tn1} />

<TextField  fullWidth label="2" {...getFieldProps('tn2')} 
error={Boolean(touched.tn2 && errors.tn2)}
helperText={touched.tn2 && errors.tn2} />

<TextField  fullWidth label="3" {...getFieldProps('tn3')} 
error={Boolean(touched.tn3 && errors.tn3)}
helperText={touched.tn3 && errors.tn3} />

<TextField  fullWidth label="4" {...getFieldProps('tn4')} 
error={Boolean(touched.tn4 && errors.tn4)}
helperText={touched.tn4 && errors.tn4} />

<TextField  fullWidth label="5" {...getFieldProps('tn5')} 
error={Boolean(touched.tn5 && errors.tn5)}
helperText={touched.tn5 && errors.tn5} />

<TextField  fullWidth label="6" {...getFieldProps('tn6')} 
error={Boolean(touched.tn6 && errors.tn6)}
helperText={touched.tn6 && errors.tn6} />

<TextField  fullWidth label="7" {...getFieldProps('tn7')} 
error={Boolean(touched.tn7 && errors.tn7)}
helperText={touched.tn7 && errors.tn7} />

<TextField  fullWidth label="8" {...getFieldProps('tn8')} 
error={Boolean(touched.tn8 && errors.tn8)}
helperText={touched.tn8 && errors.tn8} />

<TextField  fullWidth label="9" {...getFieldProps('tn9')} 
error={Boolean(touched.tn9 && errors.tn9)}
helperText={touched.tn9 && errors.tn9} />

<TextField  fullWidth label="10" {...getFieldProps('tn10')} 
error={Boolean(touched.tn10 && errors.tn10)}
helperText={touched.tn10 && errors.tn10} />


</Stack>
           
               
          
                
    
  
                
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
export default ShippingCreate;