import React,{useEffect, useState,useRef} from "react";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {Container,Button,Card,Avatar,Chip,CircularProgress,Typography,Box,IconButton,Dialog,DialogTitle,Switch,DialogContent,DialogContentText,DialogActions} from "@mui/material";
import ResponsiveTable from "../../../components/_dashboard/ResponsiveTable";
import { PATH_DASHBOARD } from '../../../routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import useSettings from '../../../hooks/useSettings';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { useTheme, styled } from '@mui/material/styles';
import { Item_Details,category_Details } from "src/_apis_";
import { format } from 'date-fns';
import { useSnackbar } from "notistack";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { useNavigate } from "react-router-dom";
const SwitchStyle = styled(Box)({
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
});

const CouponDetails=()=>{
  const theme = useTheme();
  const tempFunTwo=useRef();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();
    const { themeStretch } = useSettings();
    const [deleteOpen,setDeleteOpen]=useState(false);
    const [items,SetItems]=useState([]);
    const [categryData,setCategoryData]= useState([]);
    const [deleteId,setDeleteId]=useState();
    const [deleteTrue,setDeleteTrue]=useState(false);
    const [startPage,setStartPage]=useState(1);
    const [startPageSize,setStartPageSize]=useState(25);
    const [totalItemCount,setTotalItemCount]=useState("");
    const [multiAuth,setMultiAuth]=useState(false);
    const [user,setuser] = useState(localStorage.getItem('Role'));
    const DeleteHandleClose=()=>{
      setDeleteOpen(false);
    }
    const openDeleteItem =(id)=>{
      setDeleteOpen(true);
      setDeleteId(id);
    }

    const Token  = JSON.parse(window.localStorage.getItem('Token')).useAuth;
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const tableHeaderData=[
      { field: 'code',headerName:"Code",filterable:false, width: 130
      },
        { field: 'description',headerName:"Description", width:280,
     },
        { field: 'discount_type',headerName:"Discount Type", width: 100 },
        { field: 'discount',headerName:"Discount Amount", width: 190 },
        
    //   { field: 'expires_at',headerName:"Expires at", width: 190 },
      { field: 'expires_at',headerName:"Expires At" ,width: 150,
        renderCell: (params) => {
            const {row} = params;
            return(
                <>
          <Typography variant="subtitle2" sx={{fontWeight:"300"}} >
            {row.date}
          {/* {format(new Date(params.value),'dd MM yyyy').replace(/ /g, '/')} */}
        </Typography>
        <Typography variant="subtitle2" sx={{fontWeight:"300"}} >
        {row.time}
      {/* {format(new Date(params.value),'dd MM yyyy').replace(/ /g, '/')} */}
    </Typography>
    </>
            )
       } },
//       { field: 'discount_amount',headerName:"Discount Amount", width: 190 },
//         { field: 'productCategory',headerName:"Category", width: 150,renderCell:(params)=>(
//               <Box>
//                 {categryData.filter(opo=>opo.language.some(pop=>pop.category?.toLowerCase()===params.value?.toLowerCase()))?.[0]?.language?.filter(io=>io.language_id===1)?.[0].category?
//   <Typography sx={{fontSize:"15px"}}>{categryData.filter(opo=>opo.language.some(pop=>pop.category?.toLowerCase()===params.value?.toLowerCase()))?.[0]?.language?.filter(io=>io.language_id===1)?.[0].category}</Typography> :
// <Chip sx={{padding:"2px",height:"25px",borderRadius:"10px",background:theme.palette.info.light,color:theme.palette.info.dark}} label="Not Found" />
//  } </Box>
        
//         ) },
        // { field: 'visibility',headerName:"Item Visibility", width: 200,renderCell:(params)=>(
        //   <Box>
        //     {params.value === "True"?
        //      <Chip sx={{padding:"2px",height:"25px",borderRadius:"10px",background:theme.palette.success.light,color:theme.palette.success.dark}}  label={"On"} />
        //     : <Chip sx={{padding:"2px",height:"25px",borderRadius:"10px",background:theme.palette.error.light,color:theme.palette.error.dark}}  label="Off" />}
        //   </Box>
         
         
        // ) },
        // { field: 'amount',headerName:"Price(₹)" ,width: 120,renderCell:(params)=>(
        //   <Typography variant="subtitle2" sx={{fontWeight:"300"}} >
        // {params.value}
        // </Typography>
        // )},
        // { field: 'sell_price',headerName:"Sell Price(₹)" ,width: 140,renderCell:(params)=>(
        //   <Typography variant="subtitle2" sx={{fontWeight:"300"}} >
        //   {params.value}
        // </Typography>
        // )},
        // { field: 'created_at',headerName:"Created At" ,width: 150,
        // renderCell: (params) => (
        //   <Typography variant="subtitle2" sx={{fontWeight:"300"}} >
        //   {format(new Date(params.value),'dd MM yyyy').replace(/ /g, '/')}
        // </Typography>
        // ) },
        // { field: 'updated_at',headerName:"Updated At" ,width: 150,
        // renderCell: (params) => (
        //   <Typography variant="subtitle2" sx={{fontWeight:"300"}} >
        //   {format(new Date(params.value),'dd MM yyyy').replace(/ /g, '/')}
        // </Typography>
        // )  },
        { field: 'id' ,headerName:"Actions" ,width: 150,renderCell: (params) => (
            <Box sx={{display:"flex"}}>
               {/* <IconButton component={RouterLink}
                to={`${PATH_DASHBOARD.item.preview}/${params.value}`}><RemoveRedEyeIcon sx={{fontSize:"20px",marginRight:"4px"}}/></IconButton>  */}
                {(user === 'DM' || user === 'Admin') &&
               <IconButton component={RouterLink}
                to={`${PATH_DASHBOARD.coupon.edit}/${params.value}`}> <EditIcon sx={{fontSize:"20px",marginRight:"4px"}}/></IconButton> }
                {/* {(user === 'DM' || user === 'Admin') &&
               <IconButton onClick={()=>{openDeleteItem(params.value)}}> <DeleteOutlineIcon sx={{fontSize:"20px",marginRight:"4px"}}/></IconButton> } */}
        
            </Box>
        ) },
    ];

    //api calling
const getitemsList=React.useCallback(async()=>{
  try{
    const params={
      skip:startPage,
      limit:startPageSize
     };
    const res = await category_Details.couponList(Token,params);
    if(res?.data?.code===200 && res.status===200){
      setTotalItemCount(res.data.total_count);
     res.data.data.forEach(element => {
        element.discount_type = element.discount_type === 0 ? 'Flat' : 'Offer';
        element.date = format(new Date(element.expires_at),"yyyy-MM-dd");
        element.time = format(new Date(element.expires_at),"hh:mm aaaaa'm'");
      //  element.discount_status={
      //    status:element.discount_status,
      //    type:element.discount_type,
      //    value:element.discount_amount,
      //  }
    //   element.sell_price = element.discount_status === 1 ? element.discount_type === 0 ?  element.amount-element.discount_amount :(element.amount-( element.amount * element.discount_amount/100 )).toFixed(0): element.amount ;
    //   element.visibility = element.visibility === 1 ? "True" : "False" ;
    //   element.discount_status = element.discount_status === 1 ? "True" : "False" ;
    //   element.discount_type = element.discount_type === 1 ? "Offer" : "Flat";
    //    element.productName = element?.language?.filter(t=>t.language_id===1)?.[0]?.medicine_name;
    //    element.productType = element?.language?.filter(t=>t.language_id===1)?.[0]?.medicine_type;
    //    element.productCategory = element?.language?.filter(t=>t.language_id===1)?.[0]?.cattle_type;
     });
     if(isMountedRef.current){
       SetItems(res.data.data);
     }
    
    }
    else if (res?.response?.status>=400&&res?.response?.statusText==="Unauthorized"){
      setMultiAuth(true)
    }
  }
  catch (err) {
    console.error(err);
  }  
},[isMountedRef,Token,startPageSize,startPage]);
const DeleteItem=async()=>{
  const res = await Item_Details.ItemsDeletes(deleteId,Token);
  if(res.data.code===200){
    setDeleteOpen(false);
    setDeleteTrue(true);
    enqueueSnackbar("Item Deleted", { variant: "success" });
    setDeleteTrue(false);
  }
  else{
  setDeleteOpen(false);
  enqueueSnackbar("Item Not Delete", { variant: "error" });
  }
}
const getCategory =async () => {
  const res = await category_Details.couponList(Token);
  console.log(JSON.stringify(res)+'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
//   if (res?.data?.code === 200) {
//     res?.data?.data?.forEach(ele=>{
//       ele.cattle_type?.toLowerCase();
//     })
//     setCategoryData(
//       res?.data?.data.filter(
//         (re) => re.type === 0 || re.type === 5 && re.visibility ===1 
//       )
//     );
   
//   }
};
tempFunTwo.current=getCategory;
useEffect(
  ()=>{
    getitemsList();
   return ()=>{
    SetItems([]);
    }
  },[getitemsList,deleteTrue,startPageSize,startPage]
);
useEffect(
  ()=>{
    tempFunTwo.current();
  },[]
)
useEffect(
  ()=>{
    if(multiAuth===true){
      navigate("/")
    }
  },[multiAuth,navigate]
)
const onClickCreate = ()=>{
navigate("/item/create");
}
//console.log(multiAuth,"dgg");
    return(

        <Page title="Coupon Management | Animeta">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Coupon Management"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'Coupon Management',
      
              },
             
            ]}
            action={
              <Button
                variant="contained"
                component={RouterLink}
                // onClick={()=>onClickCreate()}
                to={(user === 'DM' || user === 'Admin') && PATH_DASHBOARD.coupon.create}
                startIcon={
<AddIcon sx={{color:"#fff"}}/>
                }
              >
               Create New Item
              </Button>
            }
          />
  
          <Card>
            {items.length > 0 ?

<ResponsiveTable  
Export={true}
tableHeaderData={tableHeaderData}
tabelBodyData={items}
PageSizeCustom={startPageSize}
ChangePageSize={setStartPageSize}
StartPage={startPage}
ChangeStartPage={setStartPage}
TotalItem={totalItemCount}
/>

: 
<CircularProgress  sx={{margin:"50px auto",display:"flex",alignItems:"center",justifyContent:"center"}}/>
            }
                </Card>
                <Dialog
        open={deleteOpen}
        fullWidth={true}
        maxWidth='sm'
        onClose={DeleteHandleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure delete this item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText  id="alert-dialog-slide-description">
           you want to delete this item in items list 
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{paddingTop:"0px!important"}}>
          <Button  onClick={DeleteHandleClose}>Cancel</Button>
          <Button  onClick={DeleteItem}>Delete</Button>
        </DialogActions>
      </Dialog>
                </Container>
                </Page>
    )
}
export default CouponDetails;