

import React,{useCallback, useEffect, useState} from "react";
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {Container,Button,Card,Typography,IconButton,Avatar,Switch,Box,Dialog,DialogTitle,DialogContent,CircularProgress,DialogContentText,DialogActions} from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';
import useSettings from '../../../hooks/useSettings';
import ResponsiveTable from "src/components/_dashboard/ResponsiveTable";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { category_Details } from "src/_apis_";
import useIsMountedRef from "../../../hooks/useIsMountedRef"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from "react-router-dom";
const CategoryManagement=()=>{
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();
  const Token  = JSON.parse(window.localStorage.getItem('Token')).useAuth;
  const [categoryData,setCategoryData] =useState([]);
     const [categoryModel,setCategoryModel] = useState(false);
   const [categoryDeleteId,setCategoryDeleteId]=useState();
const [deletrue,setdeletrue]=useState(false);
const [startPage,setStartPage]=useState(1);
const [startPageSize,setStartPageSize]=useState(25);
const [multipleAuth,setMultipleAuth]=useState(false);
const [totalItemCount,setTotalItemCount]=useState("");
const [user,setuser] = useState(localStorage.getItem('Role'));

    const tableHeaderData=[
      { field: 'image_url',headerName:"Category Image", width: 170,
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.value}></Avatar>
      ) },
        { field: 'categoryName',headerName:"Category Name", width: 170 },
        { field: 'categoryRemarks',headerName:"Remarks", width: 170 },
        { field: 'visibility',headerName:"Category visibility",sortable:false, width:200,
        renderCell:(params) => (
       <Box>
         {params.value===1 ? <Switch  checked={true} /> : <Switch disabled />}
       </Box>
        ),
      },
    { field: 'type',headerName:"Category Type", flex:1,renderCell: (params) => (
      <Typography sx={{fontSize:"14px"}}>{params.value}</Typography>
    ) },
        { field: 'id' ,headerName:"Actions" ,width: 150,renderCell: (params) => (
            <Box sx={{display:"flex"}}>
        {(user === 'DM' || user === 'Admin') &&
               <IconButton component={RouterLink}
                to={`${PATH_DASHBOARD.category.edit}/${params.value}`} > <EditIcon sx={{fontSize:"20px",marginRight:"4px"}}/></IconButton> }
                <IconButton component={RouterLink}
                to={`${PATH_DASHBOARD.category.preview}/${params.value}`} > <RemoveRedEyeIcon sx={{fontSize:"20px",marginRight:"4px"}}/></IconButton> 
                {(user === 'DM' || user === 'Admin') &&
               <IconButton onClick={()=>{DeletePop(params.value)}} > 
               <DeleteOutlineIcon sx={{fontSize:"20px",marginRight:"4px"}}/>
               </IconButton> }
             
            </Box>
        ) },
    ];
  
    const { themeStretch } = useSettings();

   const getCategorylist =useCallback(async()=>{
     try{
       const params={
        skip:startPage,
        limit:startPageSize
       };
      const res = await category_Details.categoryList(Token,params);
      if(res.status===200&&res.data.code===200){
        setTotalItemCount(res.data.total_count);
        res.data.data.forEach(
          ele=>{
            ele.categoryName=ele.language?.filter(t=>t?.language_id===1)[0]?.category;
             ele.categoryRemarks=ele.language?.filter(t=>t?.language_id===1)[0]?.remarks;
          }
        )
        if(isMountedRef.current){
          setCategoryData(res.data.data);
        }
      }
      else if(res?.response?.status>=400&&res?.response?.statusText==="Unauthorized"){
        setMultipleAuth(true)
       }
     }
     catch (err) {
      console.error(err);
    }
   },[isMountedRef,Token,startPage,startPageSize]);
   useEffect(
     ()=>{
      getCategorylist();
      return()=>{
        setCategoryData([]);
      }
     },[getCategorylist,deletrue,startPageSize,startPage]
   );
const DeletePop=(id)=>{
  setCategoryModel(true);
  setCategoryDeleteId(id);
}
  const DeleteCategory=async()=>{
 
      const res = await category_Details.category_Delete(Token,categoryDeleteId);
      if(res.data.code===200){
        setCategoryModel(false);
        setdeletrue(true);
      }
      else{
        setCategoryModel(true);
      }
      setdeletrue(false);
  } 
  useEffect(
    ()=>{
      if(multipleAuth===true){
        navigate("/")
      }
    },[multipleAuth,navigate]
  )
    return(
        <Page title="Category Management | Animeta">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Category Management"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'Category Management',
      
              },
             
            ]}
            action={
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={(user === 'DM' || user === 'Admin')&& PATH_DASHBOARD.category.create}
                  startIcon={
  <AddIcon sx={{color:"#fff"}}/>
                  }
                >
                  New Category
                </Button>
              }
          />
  
          <Card>
                {categoryData.length>0 ? <ResponsiveTable  tableHeaderData={tableHeaderData}
        tabelBodyData={categoryData}
PageSizeCustom={startPageSize}
ChangePageSize={setStartPageSize}
StartPage={startPage}
ChangeStartPage={setStartPage}
TotalItem={totalItemCount}
   />: <CircularProgress  sx={{margin:"50px auto",display:"flex",alignItems:"center",justifyContent:"center"}}/>}
                </Card>
                <Dialog
        open={categoryModel}
        maxWidth={"sm"}
        fullWidth={true}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are sure delete this category?"}</DialogTitle>
        <DialogContent sx={{paddingBottom:"0px"}}>
          <DialogContentText id="alert-dialog-slide-description">
            Delete this category
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setCategoryModel(false)}>Cancel</Button>
          <Button onClick={()=>DeleteCategory()}>Delete</Button>
        </DialogActions>
      </Dialog>
                </Container>
                </Page>
    )
}
export default CategoryManagement;