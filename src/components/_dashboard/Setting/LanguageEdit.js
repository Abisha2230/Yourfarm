import React, { useEffect,useState,useCallback } from "react";
import {Dialog,DialogTitle,DialogContent,DialogActions,Button,Divider,TextField} from "@mui/material";
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { LanguageDetails } from "src/_apis_";
import { useSnackbar } from 'notistack';
import useIsMountedRef from "src/hooks/useIsMountedRef";
const LanguageEdit=({reload,lanEdit,DialogEdit,popUpEditOpen,popUpEditClose})=>{
  const isMountedRef = useIsMountedRef();
  const Token  = JSON.parse(window.localStorage.getItem('Token')).useAuth;
  const { enqueueSnackbar } = useSnackbar();
  const [languageEditData,setLanguageEditData] = useState('');
    const SignupSchema = Yup.object().shape({
        languageName: Yup.string()
          .required('Required'),
          languageCode: Yup.string().test('Must be exactly 2 characters', val => val?.length === 2)
          .required('Required'),
      });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          languageName: languageEditData.language_name ||'',
          languageCode: languageEditData.language_code ||'',
        },
        validationSchema:SignupSchema,
        onSubmit: async(values) => {
          const data={
            language_code:values.languageCode,
            language_name:values.languageName
          };
             const res = await LanguageDetails.EditLanguageId(data,lanEdit,Token);
             if(res?.status===200 && res?.data?.code===200){
              enqueueSnackbar('Language Updated', { variant: 'success' });
              reload(true);
              popUpEditClose();
             }
             else{
              enqueueSnackbar('Language Not Updated', { variant: 'error' });
             }
        },
      });
      const {  errors, touched, handleSubmit, getFieldProps,  } = formik;
      const getLanguage=useCallback(async()=>{
        if(lanEdit!==""){
          const res = await LanguageDetails.getLanguageId(lanEdit,Token);
          if(res?.data?.code===200 && res.status===200){
            if(isMountedRef.current){
              setLanguageEditData(res.data.data[0]);
            }
          }
        }
      },[isMountedRef,lanEdit,Token])
   
      useEffect(()=>{
        getLanguage()},[getLanguage,DialogEdit]
      );
    return(
        <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={DialogEdit}
        onClose={popUpEditClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{padding:"12px 20px",fontSize:"14px"}}>{"Are you Edit this language?"}</DialogTitle>
        <Divider/>
        <DialogContent sx={{py:"15px"}}>
        <FormikProvider value={formik}>
      <Form autoComplete="off"  onSubmit={handleSubmit}>
        <TextField  fullWidth sx={{marginBottom:"15px"}} id="outlined-basic" label="Language Code" variant="outlined"
       {...getFieldProps('languageCode')}
       error={Boolean(touched.languageCode && errors.languageCode)}
                    helperText={touched.languageCode && errors.languageCode}
       />
       
        <TextField  fullWidth sx={{marginBottom:"15px"}} id="outlined-basic" label="Language Name" 
        variant="outlined" {...getFieldProps('languageName')} 
        error={Boolean(touched.languageName && errors.languageName)}
        helperText={touched.languageName && errors.languageName}
        />
          
            </Form>
            </FormikProvider>
        </DialogContent>
        <Divider/>
        <DialogActions sx={{padding:"12px 15px!important"}}>
          <Button onClick={popUpEditClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    )
}
export default LanguageEdit;