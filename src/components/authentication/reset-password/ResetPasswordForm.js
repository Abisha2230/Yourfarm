import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { TextField, Alert, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
//import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import {useSnackbar} from "notistack";
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import {MIconButton} from "../../../components/@material-extend";
import {Admin_login_Service} from "../../../_apis_";
// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func
};

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const ResetPasswordSchema = Yup.object().shape({
    phone: Yup.number().test('len', 'Must be exactly 10 characters', val => !val || (val && val.toString().length === 10)).required('Phone is required'),
  });

  const formik = useFormik({
    initialValues: {
      phone: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const phone={
          mobile_no:values.phone,
        };
        const res = await Admin_login_Service.ResetPassword(phone);
        if(res.status===200 && res.data.code===200){
          onSent();
          onGetEmail(formik.values.phone);
          setSubmitting(false);
        }
        else if (res.message.includes('422')){
          enqueueSnackbar('Invalid Mobile number', {
            variant: 'error',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        }
       /* if (isMountedRef.current) {
          onSent();
          onGetEmail(formik.values.phone);
          setSubmitting(false);
        }*/
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            {...getFieldProps('phone')}
            type="test"
            label="Phone No"
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Reset Password
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
