import React, { useEffect,useCallback,useState } from "react";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import { PATH_DASHBOARD } from '../../../routes/paths';
import {Container,Grid,Box,Card,Typography,CircularProgress} from "@mui/material";
import useSettings from '../../../hooks/useSettings';
import { category_Details } from "src/_apis_";
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useParams } from "react-router";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import DeviceHubOutlinedIcon from '@mui/icons-material/DeviceHubOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
const CategoryPreview=()=>{
    const { themeStretch } = useSettings();
    const isMountedRef = useIsMountedRef();
    const [categoryData,setCategoryDate] = useState([]);
    const Token  = JSON.parse(window.localStorage.getItem('Token')).useAuth;
    const fileId=useParams();
    const getCategory=useCallback(async()=>{

        const res = await category_Details.categoryGetSingleId(Token,fileId.id);
        if(res.status===200 && res.data.code===200){
          if(isMountedRef.current){
            setCategoryDate(res.data.data[0]);
          }
        }
},[isMountedRef,Token,fileId.id]);
  useEffect(
    ()=>{
      getCategory();
    },[getCategory]
  );
return(
    <Page title="Category Management | Animeta">
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading="Category Management"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: 'Category Management',
            href: PATH_DASHBOARD.category.root
          },
          {
            name: 'Category Preview',
  
          },
        ]}
      
      />
         <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            {Object.keys(categoryData).length>0 ?
            <Card sx={{ p: 4 }}>
              <Box sx={{ width: "100%", height: "auto" }}>
                {categoryData?.image_url==="string" ||categoryData?.image_url==="" || categoryData?.image_url===" " ? (
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
                  src={categoryData?.image_url}
                  alt=""
                />
                )}
              </Box>
            </Card>
            :<Card sx={{py:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <CircularProgress />
              </Card>}
          </Grid>
          <Grid item xs={12} md={7}>
          {Object.keys(categoryData).length>0 ?
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
           <AccountTreeIcon sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                Category Name
                </Typography>
                <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                  {categoryData.language?.filter(op=>op.language_id===1)[0]?.category?categoryData.language?.filter(op=>op.language_id===1)[0]?.category:"---"}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{display:"flex"}}>
           <BookmarkAddedOutlinedIcon sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                Category Remarks
                </Typography>
                <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                  {categoryData.language?.filter(t=>t.language_id===1)[0]?.remarks?categoryData.language?.filter(t=>t.language_id===1)[0]?.remarks:"---"}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{display:"flex"}}>
           <DeviceHubOutlinedIcon sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                Category Type
                </Typography>
                <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                  {categoryData.type===0?"Herbal Products":"Farm Inputs/Equipments"}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{display:"flex"}}>
           <RemoveRedEyeOutlinedIcon sx={{marginTop:"5px",marginRight:"5px",fontSize:"23px"}}/>
           <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                Category Visibility
                </Typography>
                <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
                  {categoryData.visibility===0?"Off":"On"}
                </Typography>
              </Box>
            </Box>
          </Grid>
          </Grid>
       </Card>
        :<Card sx={{py:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <CircularProgress />
        </Card>}
          </Grid>
        </Grid>
          </Container>
    </Page>
)
}
export default CategoryPreview;