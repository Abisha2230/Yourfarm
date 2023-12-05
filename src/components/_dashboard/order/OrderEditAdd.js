import React from "react"
import * as Yup from 'yup';
import { Stack, MenuItem, TextField, Box, } from "@mui/material";
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { OrderDetails } from "src/_apis_";
import { useNavigate } from "react-router-dom";
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import moment from "moment";


const OrderEditAdd = ({ onMCls, Trk, ids }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const userdata = JSON.parse(window.localStorage.getItem('User'))?.userData?.name
  const UpdateUserSchema = Yup.object().shape({
    pincode: Yup.number().test('len', 'Atleast 4 characters', val => !val || (val && val.toString().length > 3)).test('len', 'Must be exactly 6 characters', val => !val || (val && val.toString().length < 7)).required('Zipcode is required'),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      add1: Trk.add1 || "",
      add2: Trk.add2 || "",
      add3: Trk.add3 || "",
      city: Trk.city || "",
      pincode: Trk.pincode || "",
      state: Trk.state || "",

    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      const time = moment().format('LLL');

      try {
        const data = {
          id: Number(ids),
          address_line1: values.add1,
          address_line2: values.add2,
          address_line3: values.add3,
          city: values.city,
          state: values.state,
          // country:values.country,
          pincode: Number(values.pincode),
        }
        // console.log('runnn')
        const res = await OrderDetails.orderAddressUpdate(ids, Token, data)
        if (res.data.code === 200) {
          const commentdata = {
            internal_comments: `Updated address \n ${userdata} \n ${time}`,
            id: Number(Trk.id)
          }
          // console.log(JSON.stringify(commentdata)+'cooooooooooooooooooooooo')
          const res = await OrderDetails.orderUpdateId(Trk.id, Token, commentdata)
          if (res.data.code === 200) {
            // console.log('runnn-mhajgs')
            enqueueSnackbar('Update success', { variant: 'success' });
            setTimeout(() => {
              navigate("/order");
            }, 2000);
          } else {
            enqueueSnackbar('Update Failed', { variant: 'error' });
          }
        }
        else {
          enqueueSnackbar('Update Failed', { variant: 'error' });
        }
      }
      catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
      onMCls();
    }
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, } = formik;



  return (


    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ mb: "15px" }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField fullWidth label="Door No : " {...getFieldProps('add1')}
            error={Boolean(touched.add1 && errors.add1)}
            helperText={touched.add1 && errors.add1} />
          <TextField fullWidth label="Street" {...getFieldProps('add2')}
            error={Boolean(touched.add2 && errors.add2)}
            helperText={touched.add2 && errors.add2} />
        </Stack>

        <Stack sx={{ mb: "15px" }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField fullWidth label="VIllage / Taluk" {...getFieldProps('add3')}
            error={Boolean(touched.add3 && errors.add3)}
            helperText={touched.add3 && errors.add3} />
          <TextField type="number" fullWidth label="Pincode" {...getFieldProps('pincode')}
            error={Boolean(touched.pincode && errors.pincode)}
            helperText={touched.pincode && errors.pincode} />

        </Stack>

        <Stack sx={{ mb: "15px" }} direction={{ xs: 'column', md: 'row' }} spacing={2}>


          <TextField fullWidth label="District" {...getFieldProps('city')}
            error={Boolean(touched.city && errors.city)}
            helperText={touched.city && errors.city} />



          <TextField
            select
            fullWidth
            label="State"

            placeholder="State"
            {...getFieldProps("state")}
            error={Boolean(
              touched.sales_person && errors.sales_person
            )}
            helperText={
              touched.sales_person && errors.sales_person
            }
          >
            <MenuItem value={'Tamil_Nadu'}>Tamil Nadu</MenuItem>
            <MenuItem value={'Kerala'}>Kerala</MenuItem>
            <MenuItem value={'Karnataka'}>Karnataka</MenuItem>
            <MenuItem value={'Andhra_Pradesh'}>Andhra Pradesh</MenuItem>
            <MenuItem value={'Telangana'}>Telangana</MenuItem>
          </TextField>
          {/* <TextField fullWidth label="State" {...getFieldProps('state')}
                    error={Boolean(touched.state && errors.state)}    
                     helperText={touched.state && errors.state} /> */}
        </Stack>

        <Stack sx={{ mb: "15px" }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
          {/* <TextField fullWidth label="Country" {...getFieldProps('country')}
                    error={Boolean(touched.country && errors.country)}    
                     helperText={touched.country && errors.country} /> */}
          {/* <TextField fullWidth label="State" {...getFieldProps('state')}
                    error={Boolean(touched.state && errors.state)}    
                     helperText={touched.state && errors.state} /> */}
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
export default OrderEditAdd;