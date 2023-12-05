import React,{useState} from "react"
import * as Yup from 'yup';
import {Stack,MenuItem,TextField,Box,}from "@mui/material";
import { Form, FormikProvider, useFormik} from 'formik';
import { LoadingButton } from '@mui/lab';
import { OrderDetails } from "src/_apis_";
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import moment from "moment";

const ListingEditsCommentsUpdate=({onMCls,Trk,ids})=>{

  const { enqueueSnackbar } = useSnackbar();
    const isMountedRef = useIsMountedRef();
    const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
    const userdata = JSON.parse(window.localStorage.getItem('User'))?.userData?.name

    const [comment,setComment] = useState('')
    const UpdateUserSchema = Yup.object().shape({
        orderstatus:Yup.string().required('Tracking No is required'),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          internal_comments:"",
        },
    
        // validationSchema: UpdateUserSchema,
        onSubmit: async (values, { setErrors, setSubmitting }) => {
         const time = moment().format('LLL');
          try {
            if(comment !== ''){
            const data={ 
              listing:{
                internal_comments:`${comment} \n ${userdata} \n ${time}`,
              }
            }
            console.log(JSON.stringify(data)+'datadatadatadatadatadatadata')
            const res = await OrderDetails.listingUpdateId(ids, Token,data)
            if(res.data.code===200){
              enqueueSnackbar('Update success', { variant: 'success' });
              onMCls();
     
            }
            else{
              enqueueSnackbar('Update Failed', { variant: 'error' });
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
  const {  errors, touched, isSubmitting, handleSubmit, getFieldProps, } = formik;
  

return(

         
        <FormikProvider value={formik}>
     <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

   <Stack sx={{mb:"15px",textAlign:"left"}} direction={{ xs: 'column', md: 'row' }} spacing={2}>
   <TextField
                        onChange={(e)=>setComment(e.target.value)}
                        fullWidth
                        label="Internal Comments"
                        placeholder="Add Comment"
                        error={Boolean(
                          touched.internal_comments && errors.internal_comments
                        )}
                        multiline
                        rows={4}
                        helperText={
                          touched.internal_comments && errors.internal_comments
                        }
                        value={comment}
                      >
                      </TextField>
                      </Stack>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                 Save Changes
               </LoadingButton>
             </Box>
     </Form>
   </FormikProvider>   
);
}
export default ListingEditsCommentsUpdate;