import React from "react"
import * as Yup from 'yup';
import {Stack,MenuItem,TextField,Box,}from "@mui/material";
import { Form, FormikProvider, useFormik} from 'formik';
import { LoadingButton } from '@mui/lab';
import { OrderDetails } from "src/_apis_";
import { format } from 'date-fns';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import moment from "moment";

const OrderEditTransporterId=({onMCls,Trk,ids,providerList})=>{
    const { enqueueSnackbar } = useSnackbar();
    const isMountedRef = useIsMountedRef();
    const userdata = JSON.parse(window.localStorage.getItem('User'))?.userData?.name
    const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
    const UpdateUserSchema = Yup.object().shape({
        transporter_id:Yup.string().required('Transporter No is required'),
    });
    console.log(JSON.stringify(providerList)+'providerListproviderListproviderList')
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          transporter_id:Trk||"",
        },
    
        validationSchema: UpdateUserSchema,
        onSubmit: async (values, { setErrors, setSubmitting }) => {
          const time = moment().format('LLL');

          try {
            const data={ 
                transporter_id:Number(values.transporter_id), 
                id:Number(ids)  
            }
            const res = await OrderDetails.orderUpdateId(ids, Token,data)
            if(res.data.code===200){

              const transporterName = providerList.filter((item)=>item.id == Number(values.transporter_id))

              const commentdata={ 
                internal_comments:`Updated transporter to ${transporterName[0].name} \n ${userdata} \n ${time}`,
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
  const {  errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue} = formik;




return(

         
        <FormikProvider value={formik}>
     <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

   <Stack sx={{mb:"15px",textAlign:"left"}} direction={{ xs: 'column', md: 'row' }} spacing={2}>
   {/* <TextField
                        select
                        fullWidth
                        label="transporter_id"
                     
                        placeholder="Transporter Id"
                        {...getFieldProps("transporter_id")}
                        error={Boolean(
                          touched.transporter_id && errors.transporter_id
                        )}
                        helperText={
                          touched.transporter_id && errors.transporter_id
                        }
                      >
                        <MenuItem value={'1'}>ST Courier</MenuItem>
                        <MenuItem value={'2'}>Reg. Parcel</MenuItem>
                        <MenuItem value={'3'}>COD</MenuItem>
                        <MenuItem value={'4'}>Speed Post</MenuItem>
                        <MenuItem value={'5'}>Professional Courier</MenuItem>
                        <MenuItem value={'6'}>DTDC</MenuItem>
                        <MenuItem value={'7'}>Hyperlocal Delivery</MenuItem>
                        <MenuItem value={'8'}>Shiprocket</MenuItem>
                        <MenuItem value={'9'}>Icarry</MenuItem>

                      </TextField> */}
                       <TextField
        fullWidth
          id="outlined-select-currency"
          select
          label="Order status"
          defaultValue={Trk}
          onChange={(e)=>{setFieldValue('transporter_id',e.target.value)}}
          SelectProps={{
            native: true
          }}
        >
  {providerList.map((option) => (
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
export default OrderEditTransporterId;