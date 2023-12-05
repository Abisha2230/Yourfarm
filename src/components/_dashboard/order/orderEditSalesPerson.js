import React, {useState} from "react"
import * as Yup from 'yup';
import {Stack,MenuItem,TextField,Box,}from "@mui/material";
import { Form, FormikProvider, useFormik} from 'formik';
import { LoadingButton } from '@mui/lab';
import { OrderDetails } from "src/_apis_";
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import moment from "moment";


const OrderEditSalesPerson=({onMCls,Trk,ids,salespersonlist})=>{
    const { enqueueSnackbar } = useSnackbar();
    const isMountedRef = useIsMountedRef();
    const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
    const [name,Setname] = useState();
    const userdata = JSON.parse(window.localStorage.getItem('User'))?.userData?.name
    const UpdateUserSchema = Yup.object().shape({
        sales_person:Yup.string().required('Transporter No is required'),
    });
    console.log(salespersonlist);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            sales_person:Trk||"",
            sales_person_name:""
        },
    
        validationSchema: UpdateUserSchema,
        onSubmit: async (values, { setErrors, setSubmitting }) => {
          const time = moment().format('LLL');
          try {
            const seles = salespersonlist.filter((item)=>item.id == Number(values.sales_person))
            const data={ 
                sales_person:Number(values.sales_person), 
                id:Number(ids)  
            }
            const res = await OrderDetails.orderUpdateId(ids, Token,data)
            if(res.data.code===200){
              const commentdata={ 
                internal_comments:`Updated sales person to ${seles[0]?.name} \n  ${userdata} \n ${time}`,
                id:Number(ids)  
            }
              const res = await OrderDetails.orderUpdateId(ids, Token,commentdata)
              if(res.data.code===200){
                enqueueSnackbar('Update success', { variant: 'success' });
                onMCls();
              }else{
                enqueueSnackbar('Update Failed', { variant: 'error' });
              }
            }
            else{
              enqueueSnackbar('Update Failed', { variant: 'error' });
            }
          } catch (error) {
            if (isMountedRef.current) {
              setErrors({ afterSubmit: error.code });
              setSubmitting(false);
            }
          }
     
        }
      });
  const {  errors, touched, isSubmitting, handleSubmit, getFieldProps,setFieldValue } = formik;




return(

         
        <FormikProvider value={formik}>
     <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

   <Stack sx={{mb:"15px",textAlign:"left"}} direction={{ xs: 'column', md: 'row' }} spacing={2}>

   {/* <TextField
                        select
                        fullWidth
                        label="sales_person"
                     
                        placeholder="Sales Person"
                        {...getFieldProps("sales_person")}
                        error={Boolean(
                          touched.sales_person && errors.sales_person
                        )}
                        helperText={
                          touched.sales_person && errors.sales_person
                        }
                      >
                         <MenuItem value={'0'}>Direct</MenuItem>
                        <MenuItem value={'41'}>Ashwin</MenuItem>
                        <MenuItem value={'29'}>Latha</MenuItem>
                        <MenuItem value={'37'}>Manjula</MenuItem>
                        <MenuItem value={'26'}>Meenakshi</MenuItem>
                        <MenuItem value={'36'}>Narmatha</MenuItem>
                        <MenuItem value={'48'}>Sathish</MenuItem>
                        <MenuItem value={'24'}>Tamil</MenuItem>
                        <MenuItem value={'49'}>Kavitha</MenuItem>
                      </TextField> */}
                      <TextField
        fullWidth
          id="outlined-select-currency"
          select
          label="Order status"
          defaultValue={Trk}
          onChange={(e)=>{setFieldValue('sales_person',e.target.value)}}
          SelectProps={{
            native: true
          }}
        >
  {salespersonlist.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
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
export default OrderEditSalesPerson;