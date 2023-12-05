import React,{useEffect,useRef,useState} from "react";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import {Grid,Container,Card,Box,Typography,Table,TableHead,CircularProgress,TableCell,TableRow,TableBody} from "@mui/material";
import { User_lists } from "src/_apis_/users";
import { useParams } from "react-router";
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { styled} from '@mui/material/styles';
const UserPreview=()=>{
    const fileId = useParams();
    const { themeStretch } = useSettings();
    const temFun=useRef();
    const [listUserData,setListUserData]=useState([]);
    const Tokens = JSON.parse(window.localStorage.getItem('Token')).useAuth;
    const getUserViewDetails = async()=>{
            const res = await User_lists.userListPreview(Tokens,fileId.id);

            if(res?.status<400){
                setListUserData(res.data.data);
            }
    }
    temFun.current=getUserViewDetails;
    useEffect(
        ()=>{
            temFun.current();
        },[]
    )
    const TableStyle = styled('div')(({ theme }) => ({
        "& .MuiTable-root":{
          maxWidth:"100%",
          display:"block",
          overflow:"scroll",
          '&::-webkit-scrollbar':
  {
    height: '6px',
    width:"6px",
      borderRadius: "10px",
      backgroundColor:theme.palette.background.neutral,
  },
  
  '&::-webkit-scrollbar-track': 
  {
      width:" 6px",
  },
  
  '&::-webkit-scrollbar-thumb':
  {
      borderRadius: '10px',
  
      backgroundColor: theme.palette.grey[400],
  },
      "& .MuiTableRow-head":{
        backgroundColor:theme.palette.grey[200],
  
        "& .MuiTableCell-head":{
          padding:"10px",
          whiteSpace:"nowrap",
          fontSize:"11px",
          boxShadow:"none",
          backgroundColor:"transparent",
          fontWeight:"bold"
        }
      },
       "& .MuiTableBody-root":{
             "& .MuiTableCell-root":{
              padding:"10px",
              fontSize:"11px",
              borderBottom:`1px solid ${theme.palette.grey[300]}`,
             }
       }
        }
    }));
    return(
        <Page title="User Management | Animeta">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="User Management"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'User Management',
                href: PATH_DASHBOARD.list.users
              },
              {
                name: 'User Details',
      
              },
            ]}
          
          />
           <Grid container spacing={2}>
           <Grid item xs={12} md={5}>
               {listUserData.length>0?
           <Card sx={{ p:1 }}>
           <Box sx={{marginBottom:"10px",display:"flex",alignItems:"center",padding:"20px 10px 0px"}}>
               <AgricultureIcon sx={{marginRight:"5px"}}/> 
               <Typography  sx={{fontWeight:"bold",fontSize:"16px"}}>User's Farm_details</Typography></Box>
                    <TableStyle>
                    <Table sx={{ width:"100%" }} aria-label="simple table">
                    <TableHead>
                       <TableRow>
                         <TableCell align="left">Farm Id</TableCell>
                         <TableCell align="left">Name</TableCell>
                         <TableCell align="left">Total Land Size</TableCell>
                         <TableCell align="left">Addess id</TableCell>
                         <TableCell align="left">Buffalo</TableCell>
                         <TableCell align="left">Cows</TableCell>
                         <TableCell align="left">Goats</TableCell>
                         <TableCell align="left">Pets</TableCell>  
                         <TableCell align="left">Poultry</TableCell>
                         <TableCell align="left">Sheeps</TableCell>
                       </TableRow>
                       </TableHead>
                       {listUserData?.[0]?.farm_details.length>0 ?
                       <TableBody>
                       {listUserData?.[0]?.farm_details?.map((row,index) => (
                         <TableRow key={index}>
                            <TableCell align="left">{`#${row.id?row.id:"---"}`}</TableCell>
                            <TableCell align="left">{row.name?row.name:"---"}</TableCell>
                            <TableCell align="left">{row.total_land_size?row.total_land_size:"---"}</TableCell>
                            <TableCell align="left">{row.addess_id?row.addess_id:"---"}</TableCell>
                            <TableCell align="left">{row.buffalo?row.buffalo:"---"}</TableCell>
                            <TableCell align="left">{row.cows?row.cows:"---"}</TableCell>
                            <TableCell align="left">{row.goats?row.goats:"---"}</TableCell>
                            <TableCell align="left">{row.pets?row.pets:"---"}</TableCell>
                            <TableCell align="left">{row.poultry?row.poultry:"---"}</TableCell>
                            <TableCell align="left">{row.sheeps?row.sheeps:"---"}</TableCell>
                         </TableRow>
                       ))}
                         </TableBody>:
                          <TableBody>
                           <TableRow>
                           <TableCell colSpan={10}>
                          <Typography sx={{fontSize:"15px",textAlign:"center"}}>{'No data'}</Typography>
                           </TableCell>
                             </TableRow> 
                          </TableBody>
                         }
                    </Table>
                    </TableStyle>
                  </Card>:
                  <Card sx={{p:4,justifyContent:"center",alignItems:"center",display:"flex"}}>
                   <CircularProgress sx={{width:"25px!important",height:"25px!important"}} />
                  </Card>
                  }
           </Grid>
        <Grid item xs={12} md={7}>
        {listUserData.length>0?
        <Card
              sx={{
                display: "flex",
                p: 4,
                flexDirection: "column",
                backgroundSize: "cover",
                backgroundImage: `url(/static/mock-images/covers/ItemDetail.png)`,
              }}
            >
                 <Box sx={{marginBottom:"10px",display:"flex",alignItems:"center"}}>
               <PersonOutlineOutlinedIcon sx={{marginRight:"5px"}}/> 
               <Typography  sx={{fontWeight:"bold",fontSize:"16px"}}>User's Farm_details</Typography></Box>
               <Grid container spacing={2}>
            <Grid item md={6}>
            <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>User Name</Typography>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                    <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{listUserData?.[0]?.name?listUserData?.[0]?.name:"---"}</Typography>
                    </Box>
               </Box>
               </Grid>
               <Grid item md={6}>
               <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>User Mobile</Typography>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                    <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{listUserData?.[0]?.mobile_no?listUserData?.[0]?.mobile_no:"---"}</Typography>
                    </Box>
               </Box>
            </Grid>
            <Grid item md={6}>
               <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>User Email</Typography>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                    <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{listUserData?.[0]?.email?listUserData?.[0]?.email:"---"}</Typography>
                    </Box>
               </Box>
            </Grid>
            <Grid item md={6}>
               <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>User Profession</Typography>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                    <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{listUserData?.[0]?.profession?listUserData?.[0]?.profession:"---"}</Typography>
                    </Box>
               </Box>
            </Grid>
            <Grid item md={6}>
               <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>User Pincode</Typography>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                    <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{listUserData?.[0]?.pincode?listUserData?.[0]?.pincode:"---"}</Typography>
                    </Box>
               </Box>
            </Grid>
            <Grid item md={6}>
               <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>User Pincode Status</Typography>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                    <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{listUserData?.[0]?.pincode_status?listUserData?.[0]?.pincode_status:"---"}</Typography>
                    </Box>
               </Box>
            </Grid>
            <Grid item md={6}>
               <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>User Subscription Id</Typography>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                    <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{listUserData?.[0]?.dt_eng_subscription_id?listUserData?.[0]?.dt_eng_subscription_id:"---"}</Typography>
                    </Box>
               </Box>
            </Grid>
            <Grid item md={6}>
               <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>User Treatment Id</Typography>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                    <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{listUserData?.[0]?.treatment_subscription_id?listUserData?.[0]?.treatment_subscription_id:"---"}</Typography>
                    </Box>
               </Box>
            </Grid>
            <Grid item md={6}>
               <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>Last Conversation Id</Typography>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                    <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{listUserData?.[0]?.last_conversation_id?listUserData?.[0]?.last_conversation_id:"---"}</Typography>
                    </Box>
               </Box>
            </Grid>
            </Grid>
                 </Card>:
                   <Card sx={{p:4,justifyContent:"center",alignItems:"center",display:"flex"}}>
                   <CircularProgress  />
                  </Card>
}
        </Grid>
           </Grid>
          </Container>
          </Page>
    )
}
export default UserPreview;