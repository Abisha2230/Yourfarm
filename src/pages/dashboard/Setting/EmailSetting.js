import React,{useState,useRef, useEffect} from "react";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {Container,Card,CardHeader,OutlinedInput,Typography,InputLabel,FormControl,TextField,Grid,Box,CircularProgress,InputAdornment,IconButton} from "@mui/material";
import useSettings from '../../../hooks/useSettings';
import { PATH_DASHBOARD } from '../../../routes/paths';
import * as Yup from 'yup'; 
import { Form, FormikProvider, useFormik } from 'formik';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { Email_details } from "src/_apis_";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
const EmailSetting=()=>{
  const navigate = useNavigate();
  const [multipleAuth,setMultipleAuth]=useState(false);
    const { themeStretch } = useSettings();
    const theme=useTheme();
    const tempFun = useRef();
    const isMountedRef=useIsMountedRef;
    const [emailDetails,setEmailDetails]=useState([]);
    const [refrasher,setRefrasher]=useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const Token  = JSON.parse(window.localStorage.getItem('Token')).useAuth;
    const UpdateUserSchema = Yup.object().shape({
        smtpPassword: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
smtpUsename :Yup.string().required('Username is required'),
      });
    
      const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          smtpUsename:emailDetails.username||'',
          smtpPassword:emailDetails.password||'',
          showPassword: false,
        },
    
        validationSchema: UpdateUserSchema,
        onSubmit: async (values) => {
              const data={

                username: values.smtpUsename,
                password: values.smtpPassword,
              };
              const res = await Email_details.EmailSettingCreate(Token,data);
              if(res.status===200 && res?.data?.code===200){
                enqueueSnackbar('Email Setting Updated', { variant: 'success' });
                setRefrasher(true);
              }
              else if(res?.response?.status>=400&&res?.response?.statusText==="Unauthorized"){
                setMultipleAuth(true)
               }
             else{
              enqueueSnackbar('Email Setting Not Updated', { variant: 'error' });
              setRefrasher(false);
             }
        }
      });
    
      const { errors, touched, isSubmitting, handleSubmit, values,getFieldProps,setErrors,setFieldValue } = formik;
const getEmailDetailsId=async()=>{
    try{
      const res = await Email_details.EmailList(Token);
      if(res.status<400){
        setEmailDetails(res.data.data[0]);
      }
      else if(res?.response?.status>=400&&res?.response?.statusText==="Unauthorized"){
        setMultipleAuth(true)
       }

    }
    catch(error){
      if (isMountedRef.current) {
        setErrors({ afterSubmit: error.code });
      }
    }
};
const handleClickShowPassword = () => {
  setFieldValue('showPassword',!values.showPassword);
};
tempFun.current=getEmailDetailsId;
useEffect(
  ()=>{
    tempFun.current();
    return()=>{
      setEmailDetails([]);
    }
  },[refrasher]
);
useEffect(
  ()=>{
    if(multipleAuth===true){
      navigate("/")
    }
  },[multipleAuth,navigate]
)
    return(
        <Page title="Email Setting | Animeta">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Email Setting"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'Email Setting',
              },
            ]}
          />
          <Card>
           <CardHeader title='SMTP Setting'/>
           <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
          <Box sx={{p:3}}>
            {Object.keys(emailDetails).length >0 ?
      <Grid container spacing={3} >
        
          <Grid item xs={12} md={6}>
          <TextField  fullWidth sx={{marginBottom:"15px"}}  label="SMTP Username" variant="outlined"
       {...getFieldProps('smtpUsename')}
       autoComplete='off'
       error={Boolean(touched.smtpUsename && errors.smtpUsename)}
       helperText={touched.smtpUsename && errors.smtpUsename} /> 
       <FormControl sx={{ width: '100%' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">SMTP Password</InputLabel>
         <OutlinedInput   autoComplete='new-password' fullWidth sx={{marginBottom:"15px"}}  label="SMTP Password" variant="outlined"
        type={values.showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      {...getFieldProps('smtpPassword')}
       error={Boolean(touched.smtpPassword && errors.smtpPassword)}
      /> 
     <Typography sx={{color:theme.palette.error.main,fontSize:"11px",paddingBottom:"10px"}}>{touched.smtpPassword && errors.smtpPassword ? errors.smtpPassword  :""}</Typography>
       </FormControl>
          </Grid>
        
          </Grid>
          :
          <Box sx={{display:"flex",justifyContent:"center",alignItems:"Center"}}>
          <CircularProgress />
          </Box>
           }
          <LoadingButton sx={{mt:2}} type="submit" variant="contained" loading={isSubmitting}>
                   Save Changes
                  </LoadingButton>
                  </Box>
           </Form>
           </FormikProvider>
          </Card>
          </Container>
          </Page>
    )
}
export default EmailSetting;