import React from "react"
import * as Yup from 'yup';
import { Stack, TextField, Box, } from "@mui/material";
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { OrderDetails } from "src/_apis_";
import { useNavigate } from "react-router-dom";
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import moment from "moment";

const OrderEditTrackNo = ({ trck, onMCls, Trk, ids }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const userdata = JSON.parse(window.localStorage.getItem('User'))?.userData?.name
  const UpdateUserSchema = Yup.object().shape({
    trackingno: Yup.number().min(1, "greater than 0").required('Tracking No is required'),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      trackingno: "",
    },

    // validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      const time = moment().format('LLL');

      try {
        const data = {
          tracking_no: (values.trackingno),
          order_status: 2,
          id: Number(ids)
        }
        const res = await OrderDetails.orderUpdateId(ids, Token, data)
        if (res.data.code === 200) {
          const commentdata = {
            internal_comments: `Updated tracking number to ${values.trackingno} \n ${userdata} \n ${time}`,
            id: Number(ids)
          }
          const res = await OrderDetails.orderUpdateId(ids, Token, commentdata)
          if (res.data.code === 200) {
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
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
      onMCls();
      trck(false);
    }
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, } = formik;



  return (


    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ mb: "15px" }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField fullWidth label="Tracking No" {...getFieldProps('trackingno')}
            error={Boolean(touched.trackingno && errors.trackingno)}
            helperText={touched.trackingno && errors.trackingno} />
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
export default OrderEditTrackNo;