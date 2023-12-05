import React,{useEffect, useState} from "react";
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {Container,Button,Card,IconButton,Chip,Typography,CircularProgress,Avatar,Box,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from "notistack";
import { Link as RouterLink } from 'react-router-dom';
import useSettings from '../../../hooks/useSettings';
import ResponsiveTable from "src/components/_dashboard/ResponsiveTable";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Service_Details_Api,category_Details } from "src/_apis_";
import { useTheme } from '@mui/material/styles';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useNavigate } from "react-router-dom";
const ShippingDetails=()=>{
  const Token  = JSON.parse(window.localStorage.getItem('Token')).useAuth;
  const [serviceList,setServiceList] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [multipleAuth,setMultipleAuth]=useState(false);
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const fakeData = [
    {addl_info:"4",address_line1:"B12",address_line2:"KTVR appertment",address_line3:"tavasi nagar",category:"Service test",
      category_id:83,category_lang:(3) [{category :"Service test",language_code:"tm",language_id:6, remarks:"API Testing"}, 
      {category :"p",language_code:"ml",language_id:37, remarks:"p"}, {category :"service",language_code:"en",language_id:1, remarks:"API Testing"}],
      city:"coimbatore",country:"India",created_at:"2022-09-16T10:09:54.613Z",description:"4",
      display_pic:"https://animeta.duceapps.com/img1663322831603minilogo.png",email:"testing@gmail.com",
      id:91,latitude:"11.030118",logo:"https://animeta.duceapps.com/img1663323248135avatar-chinasa_neo.png",
      longitude:"76.9277951", mobile_no:"8896545999",other_address_details:"641025",provider_id:95,
      provider_lang:(2) [{language_code:"en",language_id:1,provider_name:"eng lish"}, {language_code:"tm",language_id:6,provider_name:"tamil"}],
      provider_name: {personImg: 'https://animeta.duceapps.com/img1663323248135avatar-chinasa_neo.png', personText: 'eng lish', personDes: '4'},
      rate:56,remarks:"API Testing",service_lang:(2) [{addl_info:"4",description:"4",language_code:"en",language_id:1},
       {addl_info:"6",description:"6",language_code:"tm",language_id:6}],state:"tamilnadu",type:1,updated_at:"2022-09-16T10:14:13.117Z",
      visibility:1}
  ]



    const tableHeaderData=[
        { field: 'display_pic',headerName:"Picture",filterable:false, width: 100, renderCell: (params) => (
       <Avatar src={params.value} alt={params.value}/>
        ),
     },
        { field: 'provider_name',headerName:"Provider Name", width: 200,sortable:true,filterable:false,renderCell: (params) => (
          <Box sx={{display:"flex",alignItems:"center"}}>
          {/* <Avatar sx={{marginRight:"10px"}} src={params.value?.personImg} alt={params.value?.personImg}/> */}
          <Box sx={{display:"flex",flexDirection:"column",height:"100%"}}>
            <Typography sx={{lineHeight:"normal",fontWeight:"600",marginBottom:"0px"}}>{params.value?.personText}</Typography>
          {/* <Typography sx={{fontweight:"100",fontSize:"12px"}}>{params.value?.personDes?.substring(0,12)+"..."}</Typography> */}
          </Box>
          </Box>
           ),
           sortComparator: (v1, v2) => v1.personText.localeCompare(v2.personText)
          },
        { field: 'email',headerName:"Email", width: 150,},
        { field: 'mobile_no',headerName:"Phone", width: 150 },
        { field: 'city',headerName:"City", width: 150 },
        { field: 'state',headerName:"State", width: 150 },
        { field: 'category',headerName:"Category", width: 150,renderCell:(params)=>(
         <Box>{categoryData?.filter(op=>op.category===params.value)?.[0]?.category?
            <Typography sx={{fontSize:"14px"}}>{categoryData?.filter(op=>op.category===params.value)?.[0]?.category}</Typography>
            : <Chip sx={{padding:"2px",height:"25px",borderRadius:"10px",background:theme.palette.info.light,color:theme.palette.info.dark}} label="Not Found" />
          }
          </Box> 
        ) },
        { field: 'latitude',headerName:"Latitude", width: 150, },
        { field: 'longitude',headerName:"Longitude", width: 150, },
        { field: 'rate',headerName:"Rate" ,width: 150,renderCell:(params)=>(
          <Typography sx={{fontSize:"14px"}}>
            {`Rs.${params.value}`}
          </Typography>
        ) },
        { field: 'visibility',headerName:"Visibility" ,width: 150,renderCell:(params)=>(
          <Box>
            {params.value===1?
 <Chip sx={{padding:"2px",height:"25px",borderRadius:"10px",background:theme.palette.success.light,color:theme.palette.success.dark}}  label={"On"} />
 : <Chip sx={{padding:"2px",height:"25px",borderRadius:"10px",background:theme.palette.error.light,color:theme.palette.error.dark}}  label="Off" />}
          </Box>
           
        ) },
        { field: 'id' ,headerName:"Actions",filterable:false ,width: 150,renderCell: (params) => (
            <Box sx={{display:"flex"}}>
               <IconButton component={RouterLink}
                to={`${PATH_DASHBOARD.service.preview}/${params.value}`}><RemoveRedEyeIcon sx={{fontSize:"20px",marginRight:"4px"}}/></IconButton> 
               <IconButton component={RouterLink}
                to={`${PATH_DASHBOARD.service.edit}/${params.value}`} > <EditIcon sx={{fontSize:"20px",marginRight:"4px"}}/></IconButton> 
               <IconButton onClick={()=>{openDeleteItem(params.value)}}> <DeleteOutlineIcon sx={{fontSize:"20px",marginRight:"4px"}}/></IconButton> 
            </Box>
        ) },
    ];
    const theme = useTheme();
    const { themeStretch } = useSettings();
    const [deleteTrue,setDeleteTrue]=useState(false);
    const [deleteOpen,setDeleteOpen]=useState(false);
    const [deleteId,setDeleteId]=useState();
    const [startPage,setStartPage]=useState(1);
    const [startPageSize,setStartPageSize]=useState(25);
    const [totalItemCount,setTotalItemCount]=useState("");

    const DeleteHandleClose=()=>{
      setDeleteOpen(false);
    }
    const openDeleteItem =(id)=>{
      setDeleteOpen(true);
      setDeleteId(id);

    }
    const getServiceList=React.useCallback( async()=>{
      try{
        const params={
          skip:startPage,
          limit:startPageSize
         };
        const res = await Service_Details_Api.getServiceDetails(Token,params);
        if(res?.data?.code===200 && res.status===200){
        
          setTotalItemCount(res.data.total_count);
          res.data.data.forEach(r=>{
           const providerName =  r.provider_lang?.filter(t=>t.language_id===1)[0]?.provider_name;
           const serviceDes= r.service_lang?.filter(y=>y.language_id===1)[0]?.description;
            r.provider_name={
            personImg:r.logo,
              personText:providerName,
              personDes:serviceDes===undefined ? "" :serviceDes,
            }
          });
 
          if(isMountedRef.current){
            setServiceList(res.data.data);
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

    const getCategory=React.useCallback(async()=>{
      const res = await category_Details.categoryList(Token);
      if(res?.data?.code===200){
        if(isMountedRef.current){
          setCategoryData(res?.data?.data.filter((re)=>re.type===1 && re.visibility===1));
        }
      }
      },[isMountedRef,Token]);

useEffect(
  ()=>{
    getCategory();
  },[getCategory]
);

    const DeleteItem=async()=>{
      const res = await Service_Details_Api.DeleteServiceId(deleteId,Token);
      if(res?.data?.code===200){
        setDeleteOpen(false);
        setDeleteTrue(true);
        enqueueSnackbar('Deleted  successfully', { variant: 'success' });
      }
      else{
      setDeleteOpen(false);
      enqueueSnackbar('Deleted  failed', { variant: 'success' });
      }
      setDeleteTrue(false);
    }

    useEffect(
      ()=>{
        getServiceList(); 
        return()=>{
          setServiceList([]);
        }
      },[getServiceList,deleteTrue,startPageSize,startPage]
    );
    useEffect(
      ()=>{
        if(multipleAuth===true){
          navigate("/")
        }
      },[multipleAuth,navigate]
    )
  return (
    <Page title="Shipping Management | Animeta">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Shipping Provider Management"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "Shipping Provider Management",
            },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.shipping.create}
              startIcon={<AddIcon sx={{ color: "#fff" }} />}
            >
              New Service
            </Button>
          }
        />

        <Card>
        
{serviceList.length>0
?<ResponsiveTable
tableHeaderData={tableHeaderData}
tabelBodyData={fakeData}
Filter={true}
PageSizeCustom={startPageSize}
ChangePageSize={setStartPageSize}
StartPage={startPage}
ChangeStartPage={setStartPage}
TotalItem={totalItemCount}
/>
:<CircularProgress  sx={{margin:"50px auto",display:"flex",alignItems:"center",justifyContent:"center"}}/>
}
          
          <Dialog
            open={deleteOpen}
            fullWidth={true}
            maxWidth="sm"
         
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Are you sure delete this service?"}</DialogTitle>
            <DialogContent sx={{ paddingBottom: "0px" }}>
              <DialogContentText id="alert-dialog-slide-description">
                you want to delete this service from service list
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={DeleteHandleClose}>cancel</Button>
              <Button onClick={DeleteItem}>Delete</Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Container>
    </Page>
  );
};
export default ShippingDetails;
