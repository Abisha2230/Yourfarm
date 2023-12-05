import React,{useState,useEffect} from 'react' ;
import Page from '../../../components/Page';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { Container,Box,TextField,Stack,Grid,MenuItem,Avatar,Card,Typography,FormHelperText} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { UploadAvatar } from '../../../components/upload';
import * as Yup from 'yup';
import {countries} from "src/_apis_/DummyApis/country";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from '../../../routes/paths';
import {Files} from "src/_apis_/file";
import { ServiceProvider_Details_Api } from "src/_apis_";
import useAuth from "../../../hooks/useAuth";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {googleMapDetails} from "src/_apis_";
import { useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import useSettings from '../../../hooks/useSettings';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useParams } from "react-router";
const ServiceProviderEdit=()=>{
    const navigate = useNavigate();
    const theme= useTheme();
    const { themeStretch } = useSettings();
    const fileId = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const {  updateProfile } = useAuth();
    const isMountedRef = useIsMountedRef();
    const [imgURI,setImageURI] = useState();
    const [serviceGoogle,setServiceGoogle]=useState('');
    const [serviceDate,setServiceDate] = useState([]);
   const [latitudes,setLatitudes] = useState('');
   const [longitudes,setLongitudes] = useState('');
   const Token  = JSON.parse(window.localStorage.getItem('Token')).useAuth;
    const UpdateUserSchema = Yup.object().shape({
        providername: Yup.string().required('Provider name is required'),
        other_address_details: Yup.number().test('len', 'Must be exactly 6 characters', val => !val || (val && val.toString().length === 6)).required('zipcode is required'),
        address_line1:Yup.string().required('Door no is  required'),
        address_line2:Yup.string().required('Street name is  required'),
        address_line3:Yup.string().required('Streer name 2 is  required'),
        city:Yup.string().required('city is  required'),
        state:Yup.string().required('state is  required'),
        country:Yup.string().required('country is  required'),
        phone: Yup.number().test('len', 'Must be exactly 10 characters', val => !val || (val && val.toString().length === 10)).required('Phone is required'),
        photoURL: Yup.mixed().required('Picture is required'),
        provideremailid:Yup.string().email().required('email  is required'),
      });
    
      const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          providername: '',
          photoURL: '',
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
        },
        validationSchema: UpdateUserSchema,
        onSubmit: async (values, { setErrors, setSubmitting }) => {
     
          try {
            const parms= `${values.address_line1}+${values.address_line2}+${values.address_line3}+${values.city}+${values.state}+${values.country}+${values.other_address_details}`
            setServiceGoogle(parms);
            const data={
              logo:"",
              mobile_no:values.phone,
              email:values.provideremailid,
              latitude:latitudes,
              longitude:longitudes,
              address_line1:values.address_line1,
              address_line2:values.address_line2,
              address_line3:values.address_line3,
              city:values.city,
              state:values.state,
              country:values.country,
              other_address_details:values.other_address_details
            }
            if(latitudes!==""&&longitudes!==""){
              const res = await ServiceProvider_Details_Api.EditServiceProvider(fileId.id,data,Token)
       
              if(res.status===200 && res.data.code===200){
                enqueueSnackbar('service created successfully', { variant: 'success' });
                setTimeout(() => {
                  navigate("/provider");
                });
              }
             else{
              enqueueSnackbar('creation faild', { variant: 'error' });
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
    
      const handleDrop = useCallback(
       async (acceptedFiles) => {
          const file = acceptedFiles[0];
          const ApiFileData = new FormData();
          ApiFileData.set('files', file);
          const res = await Files.FileUpload(ApiFileData);
    
          if (file) {
            setFieldValue('photoURL', {
              ...file,
              preview: URL.createObjectURL(file)
            });
            if(res.status===200){
              setImageURI(res.data.data[0].path);
              enqueueSnackbar('image uploaded successfully', { variant: 'success' });
            }
            else{
              enqueueSnackbar('image uploaded failed', { variant: 'error' });
            }
    
          }
        },
        [setFieldValue] 
      );
      const getMPAPI=async()=>{
        const res= await googleMapDetails.getLATLONG(serviceGoogle);
        if(res.status===200){
          setLongitudes(res.data.results[0].geometry.location.lng);
          setLatitudes(res.data.results[0].geometry.location.lat);
        }
      }
      const getServiceProviderDetails=React.useCallback(async()=>{
        const res = await ServiceProvider_Details_Api.GetServiceProviderId(fileId.id,Token);
        if(res.status===200 && res.data.code === 200){
            setServiceDate(res.data.data[0]);
          }
      },[Token]);
      useEffect(
        ()=>{
          getMPAPI();
        },[serviceGoogle]
      );
      useEffect(
          ()=>{
            const Token  = JSON.parse(window.localStorage.getItem('Token')).useAuth;
            
          },[Token]
      );
      useEffect(
        ()=>{
          getServiceProviderDetails();
        },[getServiceProviderDetails]
      );
      return(
        <Page title="Order Management | Animeta">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Order Management"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'Order Management',
                href: PATH_DASHBOARD.order.root
              },
              {
                name: 'Order Create',
      
              },
            ]}
          
          />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
                
                  <UploadAvatar
                    accept="image/*"
                    file={values.photoURL}
                
                    onDrop={handleDrop}
                    error={Boolean(touched.photoURL && errors.photoURL)}
                    
                  />
    
                  <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                    {touched.photoURL && errors.photoURL}
                  </FormHelperText>
                  <Typography sx={{mt:3,fontSize:"15px",color:theme.palette.primary.main}}>
          Upload Provider  Image
         </Typography>
         
                </Card>
              </Grid>
    
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
               
                  <Stack spacing={{ xs: 2, md: 3 }}>
    
                    <Stack direction={{ xs: 'coluLinemn', md: 'row' }} spacing={2}>
                        <TextField  fullWidth label="Provider Name" {...getFieldProps('providername')} 
                     error={Boolean(touched.providername && errors.providername)}
                     helperText={touched.providername && errors.providername} />
                      
                
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
    )
}
export default ServiceProviderEdit;