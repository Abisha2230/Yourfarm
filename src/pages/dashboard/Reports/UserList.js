import React, { useEffect,useState } from "react";
import Page from "../../../components/Page";
import {Container,Card,CircularProgress,Chip,Typography,IconButton} from "@mui/material";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import useSettings from '../../../hooks/useSettings';
import { PATH_DASHBOARD } from '../../../routes/paths';
import ResponsiveTable from "src/components/_dashboard/ResponsiveTable";
import { User_lists } from "src/_apis_/users";
import {GridRenderCellParams } from "@mui/x-data-grid";
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link as RouterLink } from 'react-router-dom';
const UserList=()=>{
  const isMountedRef = useIsMountedRef();
    const { themeStretch } = useSettings();
    const theme=useTheme();
    const Tokens = JSON.parse(window.localStorage.getItem('Token')).useAuth;
    const [usersDetails,setUsersDetails] = useState([]);
    const [startPage,setStartPage]=useState(1);
    const [startPageSize,setStartPageSize]=useState(25);
    const navigate = useNavigate();
    const [multipleAuth,setMultipleAuth]=useState(false);
    const [totalItemCount,setTotalItemCount]=useState("");
    function getChipProps(params: GridRenderCellParams): ChipProps {
        if (params.value === "Disclaimer") {
          return {
            label: params.value,
            style: {
              color:theme.palette.error.dark,
              backgroundColor:theme.palette.error.light,
              height: "20px",
              borderRadius:"5px"
            }
          };
        }
        else if(params.value === ""){
            return {
                label: params.value,
                style: {
                  color:"transparent",
                  backgroundColor:"transparent",
                  height: "20px",
                  borderRadius:"5px"
                }
              };
        }
         else {
          return {
       
            label: params.value,
            style: {
              color:theme.palette.success.dark,
              backgroundColor:theme.palette.success.light,
              height: "20px",
              borderRadius:"5px"
            }
          };
        }
      }
    const tableHeaderData=[
        { field: 'name',headerName:"User Name", width: 150,renderCell:(params)=>(
          <Typography sx={{fontSize:"14px"}}>{params.value?params.value:"---"}</Typography>
        )},
        { field: 'email',headerName:"User Email", width: 250,renderCell:(params)=>(
          <Typography sx={{fontSize:"14px"}}>{params.value?params.value:"---"}</Typography>
        ) },
        { field: 'profession',headerName:"Profession", width: 150,renderCell:(params)=>(
          <Typography sx={{fontSize:"14px"}}>{params.value?params.value:"---"}</Typography>
        ) },
        { field: 'mobile_no',headerName:"User Phone", width: 150,renderCell:(params)=>(
          <Typography sx={{fontSize:"14px"}}>{params.value?params.value:"---"}</Typography>
        )},
       
        { field: 'created_at',headerName:"Created At",
        renderCell: (params) => (
          <Typography variant="subtitle2" sx={{fontWeight:"300"}} >
            {format(new Date(params.value),'dd MM yyyy').replace(/ /g, '/')}
          </Typography>
        ), width: 150,},
        { field: 'pincode_status',headerName:"Pincode Status",width:170,
        renderCell: (params) => (
            <Chip  {...getChipProps(params)} />
            
          ),},
          { field: 'id' ,headerName:"Actions" ,width:120,renderCell: (params) => (
            <IconButton component={RouterLink}
                to={`${PATH_DASHBOARD.list.preview}/${params.value}`}><RemoveRedEyeIcon /></IconButton> 
            ) },
    ];
    const getUserListsDetails=React.useCallback(async()=>{
      const params={
        skip:startPage,
        limit:startPageSize
       };
         const res = await User_lists.userListDetails(Tokens,params);
         
         if(res.status===200 && res.data.code===200){
          
           if(isMountedRef.current){
        
            setTotalItemCount(res.data.total_count);
            setUsersDetails(res.data.data);
           } 
         }
         else if(res?.response?.status>=400&&res?.response?.statusText==="Unauthorized"){
          setMultipleAuth(true)
         }
    },[isMountedRef,Tokens,startPageSize,startPage]);

    useEffect(
      ()=>{
        getUserListsDetails();
        return()=>{
          setUsersDetails([]);
        }
      },[getUserListsDetails,startPageSize,startPage]
    );
    useEffect(
      ()=>{
        if(multipleAuth===true){
          navigate("/")
        }
      },[multipleAuth,navigate]
    )
return(
    <Page title="User List | Animeta">
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading="User List"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: 'Users',
          },
        ]}
      />
          <Card sx={{position:"relative"}}>
              {usersDetails.length>0  ?
              <ResponsiveTable  tableHeaderData={tableHeaderData}
        tabelBodyData={usersDetails}
        PageSizeCustom={startPageSize}
ChangePageSize={setStartPageSize}
StartPage={startPage}
ChangeStartPage={setStartPage}
TotalItem={totalItemCount}
   />  : <CircularProgress sx={{height:"100%",margin:"100px auto",display:"flex",justifyContent:"center"}}/>
 
              }
       
              </Card>
              </Container>
              </Page>
)
}
export default UserList;