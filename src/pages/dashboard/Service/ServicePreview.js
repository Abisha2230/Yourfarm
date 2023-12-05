import React from "react";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import { PATH_DASHBOARD } from '../../../routes/paths';
import { Container,Grid,Avatar,Card,Box,Typography,CircularProgress} from "@mui/material";
import useSettings from '../../../hooks/useSettings';
import { useParams } from "react-router";
import { Service_Details_Api } from "src/_apis_";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { useState,useEffect,useRef } from "react";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { GOOGLEMAPVIEWURL } from "src/_apis_";
import { GOOGLEMAPKEY } from "src/_apis_";
import { format } from "date-fns";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
const ServicePreview=()=>{
    const { themeStretch } = useSettings();
    const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
    const fileId = useParams();
    const tempFun = useRef();
    const [serviceData,setServiceData] = useState([]);
    const isMountedRef = useIsMountedRef();
    const getServiceList=async()=>{
        const res = await  Service_Details_Api.getServiceId(fileId.id,Token);
        if(res.data?.code===200 && res.status){
          res.data.data.forEach(t=>{
            t.created_at =  format(new Date(t.created_at),'dd MM yyyy').replace(/ /g, '/');
            t.updated_at =  format(new Date(t.updated_at),'dd MM yyyy').replace(/ /g, '/');
          })
          if(isMountedRef.current){
            setServiceData(res.data?.data[0])
          }
    
        }
    };
    tempFun.current = getServiceList;

useEffect(
  ()=>{
    tempFun.current();
  },[]
);

    return(
        <Page title="Service Management | Animeta">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Service Management"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'Service Management',
                href: PATH_DASHBOARD.service.root
              },
              {
                name: 'Service Details',
      
              },
            ]}
          
          />
           <Grid container spacing={2}>
           <Grid item xs={12} md={5}>
           {Object.keys(serviceData).length>0?
            <Card sx={{p:4}}>
                <Box sx={{width:"100%",height:"auto"}}>
                  
                   {serviceData.display_pic ==="string" || serviceData.display_pic ===""|| serviceData.display_pic ===" " ? (
                   <img
                   width="100%"
                   height="auto"
                   alt=""
                   src={`/static/mock-images/dashboardcover/empty_img.png`}
                 />
                  
                ) : (
                  <img
                  width="100%"
                  height="auto"
                  src={serviceData.display_pic}
                  alt=""
                />
                )}
          
           </Box>
            </Card>
            :
            <Card sx={{py:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <CircularProgress />
            </Card>
            }
        </Grid>
        <Grid item xs={12} md={7}>
        {Object.keys(serviceData).length>0?
            <Card sx={{display:"flex",p:4,flexDirection:"column",backgroundSize:"cover",backgroundImage:`url(/static/mock-images/covers/ItemDetail.png)`}}>
            <Box sx={{marginBottom:"10px",display:"flex",alignItems:"center"}}><ManageAccountsIcon sx={{marginRight:"5px"}}/> <Typography  sx={{fontWeight:"bold",fontSize:"16px"}}>Service Provider Details</Typography></Box>
            <Grid container spacing={2}>
            <Grid item md={6}>
            <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>Provider Name</Typography>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                    {serviceData.logo!=="string" && serviceData.logo!=="" ? <Avatar src={serviceData.logo} alt={serviceData.logo} sx={{marginRight:"10px"}}/>:
                       <Avatar sx={{marginRight:"10px"}}>
                       <PersonOutlineIcon />
                     </Avatar>}
                    <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData.provider_lang?.filter(t=>t.language_id===1)?.[0]?.provider_name?serviceData.provider_lang?.filter(t=>t.language_id===1)?.[0]?.provider_name:"---"}</Typography>
                    </Box>
               </Box>
            </Grid>
            <Grid item md={6}>
            <Box sx={{marginBottom:"10px"}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>Phone No</Typography>
                   <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData.mobile_no?serviceData.mobile_no:"---"}</Typography>
               </Box>
            </Grid>
            <Grid item md={6}>
            <Box sx={{marginBottom:"10px"}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>Email Id</Typography>
                   <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData.email?serviceData.email:"---"}</Typography>
               </Box>
            </Grid>
            <Grid item md={6}>
            <Box sx={{marginBottom:"10px"}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>Address 1</Typography>
                   <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData.address_line1?serviceData.address_line1:"---"}</Typography>
               </Box>
            </Grid>
            <Grid item md={6}>
            <Box sx={{marginBottom:"10px"}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>Address 2</Typography>
                   <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData.address_line2?serviceData.address_line2:"---"}</Typography>
               </Box>
            </Grid>
            <Grid item md={6}>
            <Box sx={{marginBottom:"10px"}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>Street </Typography>
                   <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData.address_line3?serviceData.address_line3:"---"}</Typography>
               </Box>
            </Grid>
            <Grid item md={6}>
            <Box sx={{marginBottom:"10px"}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>City </Typography>
                   <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData.city?serviceData.city:"---"}</Typography>
               </Box>
            </Grid>
            <Grid item md={6}>
            <Box sx={{marginBottom:"10px"}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>State </Typography>
                   <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData.state?serviceData.state:"---"}</Typography>
               </Box>
</Grid>
<Grid item md={6}>
<Box sx={{marginBottom:"10px"}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>Country </Typography>
                   <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData.country?serviceData.country:"---"}</Typography>
               </Box>
</Grid>

<Grid item md={6}>
          
               <Box sx={{marginBottom:"10px"}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>ZipCode </Typography>
                   <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData.other_address_details?serviceData.other_address_details:"---"}</Typography>
               </Box>
</Grid>
<Grid item md={12}>
<Box sx={{my:"15px",display:"flex",alignItems:"center"}}><LocationOnIcon sx={{marginRight:"5px"}}/> <Typography  sx={{fontWeight:"bold",fontSize:"16px"}}>Map View</Typography></Box>
<Box sx={{marginBottom:"10px"}}>
  {serviceData.length>0 && serviceData.latitude==="" && serviceData.longitude==="" ?  <Typography>latitude and longitude missing please reassing map loaction </Typography> :
 <iframe
 id={"myMap"}
  width="100%"
  height="200px"
  frameBorder="0" 
  referrerPolicy="no-referrer-when-downgrade"
  title={"service location"}
  src={`${GOOGLEMAPVIEWURL}?key=${GOOGLEMAPKEY}&q=${serviceData.address_line1}+${serviceData.address_line2}+${serviceData.address_line3}+${serviceData.city},${serviceData.state}+${serviceData.country}`}
  allowFullScreen>
</iframe>

 }
               </Box>
</Grid>
            </Grid>
            <Box sx={{my:"15px",display:"flex",alignItems:"center"}}><SettingsSuggestIcon sx={{marginRight:"5px"}}/> <Typography  sx={{fontWeight:"bold",fontSize:"16px"}}>Service Details</Typography></Box>
            <Grid container spacing={2}>
            <Grid item md={6}>
            <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>Service Category</Typography>
                    <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData.category?serviceData.category:"---"}</Typography>
               </Box>
            </Grid>
            <Grid item md={6}>
            <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>Service Visibility</Typography>
                    <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData.visibility===1?"on":"off"}</Typography>
               </Box>
            </Grid>
            <Grid item md={6}>
            <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>Service Created at</Typography>
                    <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData.created_at?serviceData.created_at:"---"}</Typography>
               </Box>
            </Grid>
            <Grid item md={6}>
            <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>Service Updaed at</Typography>
                    <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData.updated_at?serviceData.updated_at:"---"}</Typography>
               </Box>
            </Grid>
          
            <Grid item md={12}>
            <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>Service Disclaimer</Typography>
                    <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData?.service_lang?.filter(t=>t.language_id===1)[0]?.addl_info?serviceData?.service_lang?.filter(t=>t.language_id===1)[0]?.addl_info:"---"}</Typography>
               </Box>
            </Grid>
            <Grid item md={12}>
            <Box sx={{marginBottom:"10px",}}>
                   <Typography  sx={{fontWeight:"500",fontSize:"14px"}}>Service Description</Typography>
                   <Typography sx={{fontWeight:"100",fontSize:"14px"}}>{serviceData?.service_lang?.filter(t=>t.language_id===1)[0]?.description?serviceData?.service_lang?.filter(t=>t.language_id===1)[0]?.description:"---"}</Typography>
               </Box>
            </Grid>
              </Grid> 
            </Card>
            :
            <Card sx={{py:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <CircularProgress />
            </Card>
            }
        </Grid>
           </Grid>
          </Container>
          </Page>
    )
}
export default ServicePreview;