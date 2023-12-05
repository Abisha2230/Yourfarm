import React from "react";
import {Dialog,DialogTitle,DialogContent,DialogActions,Button,Divider,TextField} from "@mui/material";
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
const LanguageCreate=({Dialogopen,popUpOpen,popUpClose})=>{
    const SignupSchema = Yup.object().shape({
        languageName: Yup.string()
          .required('Required'),
          languageCode: Yup.string().test('Must be exactly 2 characters', val => val?.length === 2)
          .required('Required'),
      });
    const formik = useFormik({
        initialValues: {
          languageName: '',
          languageCode: '',
        },
        validationSchema:SignupSchema,
        onSubmit: values => {
            popUpClose();
        },
      });
      const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
    return(
        <Dialog
        fullWidth="true"
        maxWidth="sm"
        open={Dialogopen}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{padding:"12px 20px",fontSize:"14px"}}>{"Are you create new language?"}</DialogTitle>
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
          <Button onClick={popUpClose}>Cancel</Button>
          <Button onClick={popUpClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    )
}
export default LanguageCreate;