import React, { useState, useEffect } from "react"
import * as Yup from 'yup';
import { Stack, TextField, Box, Grid, Typography, Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { OrderDetails } from "src/_apis_";
import { useNavigate } from "react-router-dom";
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import { useParams } from "react-router";
import moment from "moment";
import { JsonWebTokenError } from "jsonwebtoken";

const Featured = ({ trck, onMCls, Trk, ids }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const userdata = JSON.parse(window.localStorage.getItem('User'))?.userData?.name
  const [isEditingFeatured, setIsEditingFeatured] = useState(false);
  const [getItemSignle, setGetItemSignle] = useState([]);
  const [editedFeatured, setEditedFeatured] = useState(getItemSignle?.listing?.featured || "");
  const [isfeatured, setIsFeatured] = useState(Number(Trk));
  const fileId = useParams();
  const [isFeaturedOn, setIsFeaturedOn] = useState(false); 
  const UpdateUserSchema = Yup.object().shape({
    trackingno: Yup.number().min(1, "greater than 0").required('Tracking No is required'),
  });
  console.log(Trk, ids);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // trackingno: "",
      featured: 1
    },

   
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      
      try {
        
          
              
            
            const newFeaturedValue = isFeaturedOn ? "0" : "1";
        
            try {
              
              const response = await OrderDetails.updateCattleListing(fileId.id, Token, newFeaturedValue);
              console.log(JSON.stringify(response)+'responseresponseresponseresponse')
              if (response.status === 200) {
                setIsFeaturedOn(isFeaturedOn); 
                enqueueSnackbar("Featured Status Updated", { variant: "success" });
                onMCls()
              } else {
                enqueueSnackbar("Fail to Update Featured", { variant: "error" });
              }
            } catch (error) {
              console.error("Error updating featured status:", error);
            }
          

        
      }
      catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
      onMCls();
      trck(false);
    }
  });
  const {values , errors, touched, isSubmitting, handleSubmit, getFieldProps,setFieldValue } = formik;
 
  const handlesubmit1 = async() =>{
    try {

      const data = {
        listing:{
          featured:!isfeatured
        }
      }
      console.log(JSON.stringify(data)+'responseresponseresponseresponse')
   
      const response = await OrderDetails.updateCattleListing(ids, Token, data);
      console.log(JSON.stringify(response)+'responseresponseresponseresponse')
      if (response.status === 200) {
        setIsFeaturedOn(isFeaturedOn); 
        onMCls()
        enqueueSnackbar("Featured Status Updated", { variant: "success" });
      } else {
        enqueueSnackbar("Fail to Update Featured", { variant: "error" });
      }
    } catch (error) {
      console.error("Error updating featured status:", error);
    }
  
  }
  

  const handleToggleFeatured = (event) => {
    // setIsFeaturedOn(event.target.value === isFeaturedOn);
    setFieldValue('featured',event.target.value);
    setIsFeatured(Number(event.target.value));
    console.log(event.target.value+'event.target.valueevent.target.valueevent.target.value')
  };



  return (


    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handlesubmit1}>
        
          <Box sx={{ display: "flex", alignItems: 'center' }}>
            {isfeatured ?
            <Typography sx={{ fontWeight: "500", fontSize: "16px", marginRight: '10px' }}>
                Do you want to make this listing not 'Featured'?
            </Typography>
            :  <Typography sx={{ fontWeight: "500", fontSize: "16px", marginRight: '10px' }}>
  Do you want to make this listing 'Featured'?

          </Typography>
          }
            {/* <br></br>
            <RadioGroup
              name="featured"
              value={isfeatured}
              onChange={handleToggleFeatured}
            >
              <FormControlLabel value={1} control={<Radio />} label="On" />
              <FormControlLabel value={0} control={<Radio />} label="Off" />
            </RadioGroup>
            <Button onClick={()=>{handlesubmit()}}>Submit</Button> */}
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {isfeatured ? 
                 <Typography sx={{ fontWeight: "500", fontSize: "16px", marginRight: '10px' }}>
                 OFF 
               </Typography>
                 :
                 <Typography sx={{ fontWeight: "500", fontSize: "16px", marginRight: '10px' }}>
            ON
          </Typography>
                }
               </LoadingButton>
             </Box>

      </Form>
    </FormikProvider>
  );
}
export default Featured;