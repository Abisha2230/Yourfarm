import React, { useState, useEffect,useRef } from "react";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { Container, Grid, Card, Box, Typography,CircularProgress } from "@mui/material";
import useSettings from "../../../hooks/useSettings";
import { Item_Details,category_Details } from "src/_apis_";
import { useParams } from "react-router";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LabelOffOutlinedIcon from '@mui/icons-material/LabelOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { format } from "date-fns";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
const ItemManagementPreview = () => {
  const fileId = useParams();
  const tempFun=useRef();
  const tempFunTwo=useRef();
  const { themeStretch } = useSettings();
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const [getItemSignle, setGetItemSignle] = useState([]);
  const [categryData,setCategoryData]= useState([]);
  const isMountedRef = useIsMountedRef();
  const [related,setRelated] = useState([]);
  // console.log(related[0]?.medicine_name)
  const getdata = async(item)=>{
    const res = await Item_Details.ItemsGetId(item, Token);
    if(res?.data?.code === 200){
      setRelated((related) => [...related,res.data.data[0]] );     
    }
  }
  
  const querystring = {
    di_id:Number(fileId.di_id)
  }
  const getItemsingle = async () => {
    const res = await Item_Details.ItemsGetId(fileId.id, Token,querystring);
    if (res?.data?.code === 200) {
      if(isMountedRef.current){
        // console.log(JSON.stringify(res.data.data))
        // res.data.data[0]?.related_products.map((item)=>{
        //   getdata(item).then((res)=>{  
        //    })
           
        // })
        res.data.data.forEach(t=>{
          t.created_at= format(new Date(t.created_at),'dd MM yyyy').replace(/ /g, '/');
          t.updated_at= format(new Date(t.updated_at),'dd MM yyyy').replace(/ /g, '/');
        });
        setGetItemSignle(res.data.data[0]);
      }

    }
  };
  tempFun.current=getItemsingle;


  const getCategory =async () => {
    const res = await category_Details.categoryList(Token);
    console.log(res);
    if (res?.data?.code === 200) {
      res?.data?.data?.forEach(ele=>{
        ele.cattle_type?.toLowerCase();
      })
      setCategoryData(
        res?.data?.data.filter(
          (re) => re.type === 0 && re.visibility ===1 
        )
      );
     
    }
  };
  tempFunTwo.current=getCategory;


  useEffect(
    ()=>{
      tempFun.current();
      return()=>{
        setGetItemSignle([]);
      }
    },[]
  );
  useEffect(
    ()=>{
      tempFunTwo.current();
      return()=>{
        setCategoryData([]);
      }
    },[]
  )
  const data=getItemSignle.language?.filter(t=>t.language_id===1)[0]?.cattle_type;
 return (
    <Page title="Item Management | Animeta">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Item Management"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "Item Management",
              href: PATH_DASHBOARD.item.root,
            },
            {
              name: "Item Details",
            },
          ]}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            {Object.keys(getItemSignle).length>0?
            <Card sx={{ p: 4 }}>
              <Box sx={{ width: "100%", height: "auto" }}>
                {getItemSignle?.image_url==="string" || getItemSignle?.image_url===""||getItemSignle?.image_url===" " ? (
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
                  src={getItemSignle?.image_url}
                  alt=""
                />
                )}
              </Box>
            </Card>:<Card sx={{py:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <CircularProgress />
              </Card>
            }
          </Grid>
          <Grid item xs={12} md={7}>
          {Object.keys(getItemSignle).length>0?
            <Card
              sx={{
                display: "flex",
                p: 4,
                flexDirection: "column",
                backgroundSize: "cover",
                backgroundImage: `url(/static/mock-images/covers/ItemDetail.png)`,
              }}
            >
                  <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{display:"flex"}}>
           <ShoppingCartOutlinedIcon sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                  Product Name
                </Typography>
                <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                  {getItemSignle.language?.filter(t=>t.language_id===1)[0]?.medicine_name?getItemSignle.language?.filter(t=>t.language_id===1)[0]?.medicine_name:"---"}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
          <Box sx={{display:"flex"}}>
           <MedicalServicesOutlinedIcon  sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                Medicine Type
                </Typography>
                <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                  {getItemSignle.language?.filter(t=>t.language_id===1)[0]?.medicine_type?getItemSignle.language?.filter(t=>t.language_id===1)[0]?.medicine_type:"---"}
                </Typography>
              </Box>
              </Box>
          </Grid>
          <Grid item xs={12} md={6}>
          <Box sx={{display:"flex"}}>
           <AccountTreeOutlinedIcon  sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                Cattle Type
                </Typography>
                <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                {categryData.filter(opo=>opo.language.some(poi=>poi.category.toLowerCase()===`${data}`?.toLowerCase()))?.[0]?.language?.filter(po=>po.language_id===1)?.[0]?.category ? categryData.filter(opo=>opo.language.some(poi=>poi.category.toLowerCase()===`${data}`?.toLowerCase()))?.[0]?.language?.filter(po=>po.language_id===1)?.[0]?.category  :"---"}
                </Typography>
              </Box>
           </Box>
          </Grid>
          <Grid item xs={12} md={6}>
          <Box sx={{display:"flex"}}>
           <ShoppingBasketOutlinedIcon  sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                  Prodcut Weight (grm)
                </Typography>
                <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                  {getItemSignle.package_weight_in_gram?getItemSignle.package_weight_in_gram:"---"}
                </Typography>
              </Box>
           </Box>
          </Grid>
          <Grid item xs={12} md={6}>
          <Box sx={{display:"flex"}}>
           <LocalOfferOutlinedIcon  sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                  Price
                </Typography>
                <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                  {`Rs.${getItemSignle.amount?getItemSignle.amount:"---"}`}
                </Typography>
              </Box>
           </Box>
          </Grid>
          <Grid item xs={12} md={6}>
          <Box sx={{display:"flex"}}>
           <LabelOffOutlinedIcon  sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                  Discount Info
                </Typography>
                <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                  {getItemSignle.discount_status === 1
                    ? `Discount Available ${
                        getItemSignle.discount_type === 1 ? "offer" : "flat"
                      } ${getItemSignle.discount_amount}`
                    : "Discount Not Available"}
                </Typography>
              </Box>
           </Box>
          </Grid>
          <Grid item xs={12} md={6}>
          <Box sx={{display:"flex"}}>
           <BookmarkAddOutlinedIcon  sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                Maximum Cattle
                </Typography>
                <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                  {getItemSignle?.maximum_cattle !== 0
                    ? "Available"
                    : "not Avilable"}
                </Typography>
              </Box>
           </Box>
          </Grid>
          <Grid item xs={12} md={6}>
          <Box sx={{display:"flex"}}>
           <RemoveRedEyeOutlinedIcon  sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
               Item visibility
                </Typography>
                <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                  {getItemSignle?.visibility === 1
                    ? "On"
                    : "Off"}
                </Typography>
              </Box>
           </Box>
           </Grid>
           <Grid item xs={12} md={6}>
          <Box sx={{display:"flex"}}>
           <DateRangeOutlinedIcon  sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                  Created At
                </Typography>
                <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                  {getItemSignle?.created_at?getItemSignle?.created_at:"---"}
                </Typography>
              </Box>
           </Box>
           </Grid>
           <Grid item xs={12} md={6}>
          <Box sx={{display:"flex"}}>
           <DateRangeOutlinedIcon  sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                  Updated At
                </Typography>
                <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                  {getItemSignle?.updated_at?getItemSignle?.updated_at:"---"}
                </Typography>
              </Box>
           </Box>
           </Grid>
           <Grid item xs={12} md={6}>
          <Box sx={{display:"flex"}}>
           <LocalOfferOutlinedIcon  sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                  GST
                </Typography>
                <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                  {`${getItemSignle.gst?getItemSignle.gst:"---"}% `}
                </Typography>
              </Box>
           </Box>
          </Grid>

           
           {/* <Grid item xs={12} md={12} >
          <Box sx={{display:"flex"}}>
           <FeedOutlinedIcon  sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px",marginBottom:'15px' }}>
                  Related Products
                </Typography>
                {related?.length && related?.map((item)=>{
                  return <div style={{display:'flex',flexDirection:'row',alignItems:'center',paddingBottom:15,width:'600px'}}>
                   <img style={{height:40,width:'8%',objectFit:'cover'}}  src={item.image_url} alt="My Image" />
                  <h5 style={{width:'44%',marginLeft:'15px',fontWeight:'normal'}}>{item.medicine_name}</h5>
                  <h5  style={{width:'44%',fontWeight:'normal'}}>{item.cattle_type}</h5>
                  </div>
                })}
                
                      </Box>
           </Box>
           </Grid> */}
          </Grid>
            </Card>
            :<Card sx={{py:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <CircularProgress />
            </Card>
          }
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
export default ItemManagementPreview;
