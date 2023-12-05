import React from "react";
import {Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Button} from "@mui/material";
import { LanguageDetails } from "src/_apis_";
import { useSnackbar } from 'notistack';
const LanguageDelete=({reload,lanDele,Dialogopen,popUpOpen,popUpClose})=>{
  const Token  = JSON.parse(window.localStorage.getItem('Token')).useAuth;
  const { enqueueSnackbar } = useSnackbar();
  const DeleteLan=async()=>{
    const res = await LanguageDetails.DeleteLanguageId(lanDele,Token);
    if(res?.status===200 && res?.data?.code===200){
      enqueueSnackbar('Language Deleted', { variant: 'success' });
      reload(true);
      popUpClose();
    }
    else{
      enqueueSnackbar('Language Not Deleted', { variant: 'error' });
    }
  }


    return(
        <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={Dialogopen}
        aria-describedby="alert-dialog-slide-description"
        onClose={popUpClose}
      >
        <DialogTitle>{"Are you sure delete this language?"}</DialogTitle>
        <DialogContent sx={{py:"8px",pt:"8px"}}>
          <DialogContentText id="alert-dialog-slide-description">
         This language deleted from language list in app
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{py:"10px!important"}}>
          <Button onClick={popUpClose}>Cancel</Button>
          <Button onClick={DeleteLan}>Delete</Button>
        </DialogActions>
      </Dialog>
    )
}
export default LanguageDelete;