import React,{useState} from "react";
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Card, TextField,InputAdornment,IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import fakeRequest from '../../../../utils/fakeRequest';
import { Admin_login_Service } from 'src/_apis_';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();
  const [oldPwsType,setOldPwsType]=useState(false);
  const [newPwsType,setNewPwsType]=useState(false);
  const [conPwsType,setConPwsType]=useState(false);
  const ChangePassWordSchema = Yup.object().shape({
    phone:Yup.number().test('len', 'Must be exactly 10 characters', val => !val || (val && val.toString().length === 10)).required('phone is required'),
    oldPassword: Yup.string().required('Old Password is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      phone: '',
      oldPassword: '',
      password: '',
      confirmNewPassword:'',
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const adminChage={
        mobile_no :values.phone,
        oldpassword :values.oldPassword,
        password :values.password,
      };
     const res = await Admin_login_Service.ChangePassword(adminChage);
     if(res.status===200 && res.data.code===200 && res.data.message){
      enqueueSnackbar(res.data.message, { variant: 'success' });
     }
     else if(res?.response?.status===422){
      enqueueSnackbar(`${res?.response?.data?.message}`, { variant: 'error' });
     }
     
      await fakeRequest(500);
      setSubmitting(false);
      
  }
});
const oldPwsVisibility=()=>{
  setOldPwsType(!oldPwsType);
}
const newPwsVisibility=()=>{
  setNewPwsType(!newPwsType);
}
const conPwsVisibility=()=>{
  setConPwsType(!conPwsType);
}
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps('phone')}
              fullWidth
              type="text"
              label="Phone No"
              autoComplete='phone'
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />

            <TextField
              {...getFieldProps('oldPassword')}
              fullWidth
              autoComplete="oldPassword"
              type={oldPwsType?"text":"password"}
              label="Old Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={oldPwsVisibility}>
                    {oldPwsType ?<VisibilityOff/>: <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.oldPassword && errors.oldPassword)}
              helperText={(touched.oldPassword && errors.oldPassword) }
            />

            <TextField
              {...getFieldProps('password')}
              fullWidth
              autoComplete="on"
              type={newPwsType?"text":"password"}
              label="New Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={newPwsVisibility}>
                    {newPwsType ?<VisibilityOff/>: <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              {...getFieldProps('confirmNewPassword')}
              fullWidth
              autoComplete="on"
              type={conPwsType ? "text": "password"}
              label="Confirm Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={conPwsVisibility}>
                    {conPwsType ?<VisibilityOff/>: <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save Changes
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
