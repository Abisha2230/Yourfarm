import React,{useEffect, useState} from "react";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {Container,Card,Avatar,Box,IconButton,Button,CircularProgress,Dialog,DialogTitle,Divider,DialogContent,TextField,DialogActions} from "@mui/material";
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import ResponsiveTable from "src/components/_dashboard/ResponsiveTable";
import {GridRenderCellParams } from "@mui/x-data-grid";
import {useTheme} from "@mui/material/styles";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import LanguageEdit from "src/components/_dashboard/Setting/LanguageEdit";
import LanguageDelete from "src/components/_dashboard/Setting/LanguageDelete";
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { LanguageDetails } from "src/_apis_";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
const LanguageSetting=()=>{
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const Token  = JSON.parse(window.localStorage.getItem('Token')).useAuth;
  const theme=useTheme();
  const navigate = useNavigate();
  const [multipleAuth,setMultipleAuth]=useState(false);
  const [languageList,setLanguageList]=useState([]);
  const [languageEdit,setLanguageEdit]=useState(false);
  const [languageDelete,setLanguageDelete]=useState(false);
  const [languCreateModel,setLanguCreateModel] = useState(false);
  const[lanugageId,setLanguageId]=useState('');
  const[lanugageDelId,setLanguageDelId]=useState('');
  const [reloader,setReloader]=useState(false);
  const [startPage,setStartPage]=useState(1);
  const [startPageSize,setStartPageSize]=useState(25);
  const [totalItemCount,setTotalItemCount]=useState("");
  const SignupSchema = Yup.object().shape({
    languageName: Yup.string()
      .required('Required'),
      languageCode: Yup.string().test('Must be exactly 2 characters', val => val?.length === 2)
      .required('Required'),
  });
const formik = useFormik({
    initialValues: {
      languageName:'',
      languageCode:'',
    },
    validationSchema:SignupSchema,
    onSubmit:async(values,{resetForm}) => {
      const data={
        language_code:values.languageCode,
        language_name:values.languageName
      }
     const res= await LanguageDetails.CreateLanguage(data,Token)
     if(res?.data?.code===200 && res.status===200){
      enqueueSnackbar('Language Successfully Created!', { variant: 'success' });
      setReloader(true);
      setLanguCreateModel(false);
      resetForm();
     }
     else{
      enqueueSnackbar('Language creation Failed', { variant: 'error' });
     }
    },
  });
  const { resetForm, errors, touched, handleSubmit, getFieldProps } = formik;

  const tableHeaderData=[
    { field: 'status',headerName:"Status", width: 50,renderCell: (params: GridRenderCellParams<String>) => (<>{ params.value===1 ?<CheckCircleOutlineIcon sx={{color:theme.palette.success.main}}/>:""}</>)},
    { field: 'language_code',headerName:"Code", width: 150,renderCell: (params: GridRenderCellParams<String>) => (
      <Avatar sx={{ bgcolor:theme.palette.grey[500],color:theme.palette.secondary.contrastText,textTransform:"uppercase",fontSize:"13px"}}>{params.value}</Avatar>
    ),},
    { field: 'language_name',headerName:"Language", width: 150},
    { field: 'id',headerName:"Actions", flex:"1",renderCell:(params)=>(
<Box sx={{display:"flex"}}>
              
               <IconButton onClick={()=>{handelDialogEdit(params.value)}}
                > <EditIcon sx={{fontSize:"20px",marginRight:"4px"}}/></IconButton> 
               <IconButton  onClick={()=>{handelDialogDelete(params.value)}} > <DeleteOutlineIcon sx={{fontSize:"20px",marginRight:"4px"}}/></IconButton> 
            </Box>
    )},
  ];

  const handelDialogEdit=(id)=>{
    setLanguageId(id)
    setLanguageEdit(true);
  }
  const handelDialogEditClose=()=>{
    setLanguageEdit(false);
  }
  const handelDialogDelete=(id)=>{
    if(id!==1&&id!==6){
      setLanguageDelId(id);
      setLanguageDelete(true);
    }
    else{
      enqueueSnackbar('This is default languge', { variant: 'error' });
    }
  }
  const handelDialogDeleteClose=()=>{
    setLanguageDelete(false);
  }

  const langCreateOpen=()=>{
    setLanguCreateModel(true);
  }
  const langCreateClose=()=>{
    resetForm();
    setLanguCreateModel(false);
  }
  const getLanguages=React.useCallback(async()=>{
       const res = await LanguageDetails.getLanguageList(Token);
       if(res.status===200 && res?.data?.code===200){
        setTotalItemCount(res.data.data.length);
        if(isMountedRef.current){
          setLanguageList(res.data.data);
        } 
       }
       else if(res?.response?.status>=400&&res?.response?.statusText==="Unauthorized"){
        setMultipleAuth(true)
       }
  },[isMountedRef,Token]);

  useEffect(
    ()=>{
      getLanguages();
      setReloader(false);
      return()=>{
        setLanguageList([]);
      }
    },[getLanguages,reloader,startPage,startPageSize]
  );
  useEffect(
    ()=>{
      if(multipleAuth===true){
        navigate("/")
      }
    },[multipleAuth,navigate]
  )
    return(
<Page title="Language Setting | Animeta">
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading="Language Setting"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: 'Language Setting',
          },
        ]}
        action={
          <Button
            variant="contained"

            onClick={langCreateOpen}
            startIcon={<AddIcon sx={{ color: "#fff" }} />}
          >
            New Language
          </Button>
        }
      />
          <Card>
               {languageList.length>0 ? <ResponsiveTable  tableHeaderData={tableHeaderData} tabelBodyData={languageList} PageSizeCustom={startPageSize}
ChangePageSize={setStartPageSize}
StartPage={startPage}
ChangeStartPage={setStartPage}
TotalItem={totalItemCount}/> :<CircularProgress  sx={{margin:"50px auto",display:"flex",alignItems:"center",justifyContent:"center"}}/>} 
              
                <LanguageEdit reload={setReloader}  lanEdit={lanugageId} DialogEdit={languageEdit}    popUpEditOpen={handelDialogEdit}  popUpEditClose={handelDialogEditClose}/>
               <LanguageDelete reload={setReloader} lanDele={lanugageDelId}  Dialogopen={languageDelete} popUpOpen={handelDialogDelete} popUpClose={handelDialogDeleteClose}/>
            
          </Card>

          <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={languCreateModel}
        onClose={langCreateClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{padding:"12px 20px",fontSize:"14px"}}>{"Create New Language"}</DialogTitle>
        <Divider/>
        <DialogContent sx={{py:"15px"}}>
        <FormikProvider value={formik}>
      <Form autoComplete="off"  onSubmit={handleSubmit}>
        <TextField  fullWidth sx={{marginBottom:"15px"}} id="outlined-basic" label="Language Code" variant="outlined"
       {...getFieldProps('languageCode')}
       error={Boolean(touched.languageCode && errors.languageCode)}
                    helperText={touched.languageCode && errors.languageCode}
       />
       
        <TextField  fullWidth sx={{marginBottom:"15px"}} id="outlined-basic" label="Language Name" 
        variant="outlined" {...getFieldProps('languageName')} 
        error={Boolean(touched.languageName && errors.languageName)}
        helperText={touched.languageName && errors.languageName}
        />
          
            </Form>
            </FormikProvider>
        </DialogContent>
        <Divider/>
        <DialogActions sx={{padding:"12px 15px!important"}}>
          <Button onClick={langCreateClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

          </Container>
          </Page>
    )
}
export default LanguageSetting;