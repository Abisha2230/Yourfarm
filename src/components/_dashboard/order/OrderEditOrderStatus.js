import React, { useState,useEffect } from "react"
import * as Yup from 'yup';
import { Stack, MenuItem, TextField, Box, } from "@mui/material";
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { OrderDetails } from "src/_apis_";
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import moment from "moment";
import { log } from "deck.gl";
// import { OrderDetails } from "src/_apis_";


const OrderEditOrderStatus = ({ onMCls, Trk, ids , paymentType }) => {
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const userdata = JSON.parse(window.localStorage.getItem('User'))?.userData?.name
  const user = localStorage.getItem('Role')
  // const pending = [{ "name": "Verified", "value": 6 }, { "name": "Cancelled", "value": 7 }]
  // const verification = [{ "name": "Dispatched", "value": 4 }]
  // const Dispatch = [{ "name": "On the Way", "value": 2 }, { "name": "Rejected", "value": 5 }, { "name": "Returned", "value": 8 }]
  // const OntheWay = [{ "name": "Delivered", "value": 3 }]
  // const Return = [{ "name": "Refunded", "value": 9 }]
 

  const [orderStatusOptions, setOrderStatusOptions] = useState([]);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState([]);
  const UpdateUserSchema = Yup.object().shape({
    orderstatus: Yup.string().required('Tracking No is required'),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      orderstatus: Trk || "",
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      const time = moment().format('LLL');

      try {
        const data = {
          order_status: Number(values.orderstatus),
         
          id: Number(ids)
        }
        console.log("orderStatus" + values.orderstatus);

        const res = await OrderDetails.orderUpdateId(ids, Token, data)
        if (res.data.code === 200) {
          var orderStatus;
          switch (Number(values.orderstatus)) {
            case 1:
              orderStatus = "Pending";
              break;
            case 2:
              orderStatus = "On the Way";
              break;
            case 3:
              orderStatus = "Delivered";
              break;
            case 4:
              orderStatus = "Dispatched";
              break;
            case 5:
              orderStatus = "Rejected";
              break;
            case 6:
              orderStatus = "Verified";
              break;
            case 7:
              orderStatus = "Cancelled";
              break;
            case 8:
              orderStatus = "Refunded";
              break;
            case 9:
              orderStatus = "Returned";
              break;
              case 10:
                orderStatus = "Return in Transit";
                break;

            default:
              orderStatus = "error code";
          };

          const commentdata = {
            internal_comments: `Updated order status to ${orderStatus} \n ${userdata} \n ${time}`,
            id: Number(ids)
          }
          const res = await OrderDetails.orderUpdateId(ids, Token, commentdata)
          if (res.data.code === 200) {
            enqueueSnackbar('Update success', { variant: 'success' });
            onMCls();
          } else {
            enqueueSnackbar('Update Failed', { variant: 'error' });
          }
        }
        else {
          enqueueSnackbar('Update Failed', { variant: 'error' });
        }
      } catch (error) {
        console.log(error +"Order status error");
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }

    }
  });


  useEffect(() => {
    console.log(paymentType+'paymentTypepaymentTypepaymentTypepaymentType');
    console.log(Trk+'TrkTrkTrkTrkTrkTrkTrkTrk');

    
    if(paymentType===0){
      switch (Trk) {
      
        case 1:
          setOrderStatusOptions([{ "name": "Pending", "value": 1 },{ "name": "Verified", "value": 6 }, { "name": "Cancelled", "value": 7 }]);
          break;
          case 2:
         setOrderStatusOptions([{ "name": "On the Way", "value": 2 },{ "name": "Return in transit", "value": 10 },{ "name": "Delivered", "value": 3 }]);
               break;
           case 4:
          setOrderStatusOptions([{"name":"Dispatched","value":4},{ "name": "On the Way", "value": 2 }]);
          break;
          case 6:
            setOrderStatusOptions([{ "name": "Verified", "value": 6 },{"name":"Dispatched","value":4},{ "name": "Cancelled", "value": 7 }]);          break;
            case 10:
              setOrderStatusOptions([{ "name": "Return in Transit", "value": 10 },{"name":"Rejected","value":5},{"name":"Returned","value":9}]);
              break;
              case 9:
                setOrderStatusOptions([{"name":"Returned","value":9},{ "name": "Refunded", "value": 8 }]);
                break;
              default:
                setOrderStatusOptions([]);
                break;
  
  
    }
  }
  else{
    switch (Trk) {
      
      case 1:
        setOrderStatusOptions([{ "name": "Pending", "value": 1 },{ "name": "Verified", "value": 6 }, { "name": "Cancelled", "value": 7 }]);
        break;

        case 4:
          setOrderStatusOptions([{"name":"Dispatched","value":4},{ "name": "On the Way", "value": 2 }]);
          break;
      // case 6:
      //   setOrderStatusOptions([{ "name": "Cancelled", "value": 7 },{ "name": "Refunded", "value": 9 }]);
      //   break;
        
      case 7:
        setOrderStatusOptions([{ "name": "Cancelled", "value": 7 },{ "name": "Refunded", "value": 8 }]);
        break;
        case 9:
          setOrderStatusOptions([{"name":"Returned","value":9},{ "name": "Refunded", "value": 8 }]);
          break;
      case 2:
        setOrderStatusOptions([{ "name": "On the Way", "value": 2 },{ "name": "Delivered", "value": 3 },{ "name": "Return in transit", "value": 10 }]);
        break;
    
      case 8:
        setOrderStatusOptions([{ "name": "Returned", "value": 8 },{ "name": "Refunded", "value": 9 }]);
        break;
      // case 2:
      //   setOrderStatusOptions([{ "name": "Returned", "value": 8 },{ "name": "Refunded", "value": 9 }]);
      //   break;

      case 6:
        setOrderStatusOptions([{ "name": "Verified", "value": 6 },{"name":"Dispatched","value":4},{ "name": "Cancelled", "value": 7 }]);
        break;
        case 10:
          setOrderStatusOptions([{ "name": "Return in Transit", "value": 10 },{"name":"Returned","value":8}]);
          break;

      default:
        setOrderStatusOptions([]);
        break;
    }
}
  }, [Trk]);


  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, } = formik;


  return (


    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

        <Stack sx={{ mb: "15px", textAlign: "left" }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
          {user === 'Verifier' ?
            <TextField
              select
              fullWidth
              label="Order Status"

              placeholder="Order Status"
              {...getFieldProps("orderstatus")}
              error={Boolean(
                touched.orderstatus && errors.orderstatus
              )}
              helperText={
                touched.orderstatus && errors.orderstatus
              }
            >
              <MenuItem value={'1'}>Pending</MenuItem>
              <MenuItem value={'6'}>Verified</MenuItem>


            </TextField>
            :
            <TextField
              select
              fullWidth
              label="Order Status"
              onChange={(e) => setSelectedOrderStatus(e.target.value)}
              placeholder="Order Status"
              {...getFieldProps("orderstatus")}
              error={Boolean(
                touched.orderstatus && errors.orderstatus
              )}
              helperText={
                touched.orderstatus && errors.orderstatus
              }
            >

              
              {orderStatusOptions.map((item) => { 
                return ( 
                <MenuItem  value={item.value}>
                  {item.name}
                </MenuItem>
                )
               })}
            
            </TextField>
          }
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
export default OrderEditOrderStatus;