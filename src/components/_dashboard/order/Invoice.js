import React, { useState } from "react";
// import * as Yup from 'yup';
import { Stack, MenuItem, TextField, Box, } from "@mui/material";
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { OrderDetails } from "src/_apis_";
import { useNavigate } from "react-router-dom";
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// import { format } from 'date-fns';
import moment from "moment";
import { useSnackbar } from 'notistack';


const Invoice = ({onMCls}) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const userdata = JSON.parse(window.localStorage.getItem('User'))?.userData?.name
  const [orderData, setOrderdata] = useState('');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      mobileno: "",
      transcationid: "",
      amount: "",

    },


    onSubmit: async (values, { setErrors, setSubmitting }) => {
      const time = moment().format('LLL');
      console.log('running')
      // console.log('running')

      try {
        console.log('running try')
        var data;
        if (values.transcationid !== '') {
          data = {
            mobile_no: values.mobileno,
            transId: values.transcationid,
            amount: values.amount,
          }
        } else {
          data = {
            mobile_no: values.mobileno,
            amount: values.amount,
          }
        }
        const res = await OrderDetails.orderInvoice(Token, data)
        console.log(JSON.stringify(res) + 'aaaaaaaaaaaaaaaaaaa');

        if (res.status === 200) {
          console.log(JSON.stringify(res) + 'aaaaaaaaaaaaaaaaaaa');
          setOrderdata(res.data)          

        }
        else {
          enqueueSnackbar("User not found!",{ variant: 'error' });
        }


      }
      catch (error) {
        console.log(JSON.stringify(error) + 'running try')
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }

    },
    validate: (values) => {
      const errors = {};

      if (!values.mobileno) {
        errors.mobileno = 'Mobile number is required.';
      } 
      else if (!/^[0-9]{10}$/.test(values.mobileno)) {
        errors.mobileno = 'Invalid mobile number. Please enter a 10-digit number.';
      }

      return errors;
    },
   
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, } = formik;



  return (

    <>
      {orderData === '' ?
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
            <Stack sx={{ mb: "15px" }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
              {/* <TextField fullWidth label="Mobile Number: " {...getFieldProps('mobileno')}
                error={Boolean(touched.mobileno && errors.mobileno)}
                helperText={touched.mobileno && errors.mobileno}
              /> */}
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobileno"
                value={formik.mobileno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={touched.mobileno && Boolean(errors.mobileno)}
                helperText={touched.mobileno && errors.mobileno}
              />

            </Stack>
            <Stack sx={{ mb: "15px" }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField fullWidth label="Transcation Id: " {...getFieldProps('transcationid')}
                error={Boolean(touched.transcationid && errors.transcationid)}
                helperText={touched.transcationid && errors.transcationid} />

            </Stack>
            <Stack sx={{ mb: "15px" }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField fullWidth label="Amount : " {...getFieldProps('amount')}
                error={Boolean(touched.amount && errors.amount)}
                helperText={touched.amount && errors.amount} />

            </Stack>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Submit
              </LoadingButton>
            </Box>
          </Form>
        </FormikProvider>
        :
        <>
          <div>
            <Stack sx={{ mb: "15px" }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField fullWidth label="Order Id" value={orderData?.id}
              />
              <a href={orderData?.invoiceUrl} target="_blank">{orderData?.invoiceUrl}</a>

            </Stack>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton variant="contained" onClick={()=>{onMCls()}}>
                Close
              </LoadingButton>
            </Box>

          </div>
        </>
      }
    </>
  );
}

export default Invoice;