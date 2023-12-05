import React, { useRef, useEffect,useState } from "react";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from '../../../routes/paths';
import { Container,Grid,Card,FormHelperText,Typography,Button } from "@mui/material";
import useSettings from '../../../hooks/useSettings';
import { Form, FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { UploadAvatar } from "../../../components/upload";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useTheme } from "@mui/material/styles";
import { Files } from "../../../_apis_/file";
import { useSnackbar } from "notistack";
import { Banner_Details } from "src/_apis_";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
const BannerDetails=()=>{
    const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
    const theme = useTheme();
    const tempFun = useRef();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { themeStretch } = useSettings();
    const isMountedRef = useIsMountedRef();
    const [multipleAuth,setMultipleAuth]=useState(false);
    const [bannerImg,setBannerImg]=useState([]);
    const [blog,setBlog] = useState([]);
    const [refrash,setRefrash]=useState(false);
    const bannerScheme = Yup.object().shape({
        photoURL: Yup.mixed().required("image is required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            photoURL1:bannerImg[0]?.img_url||"",
            photoURL2:bannerImg[1]?.img_url||"",
            photoURL3:bannerImg[2]?.img_url||"",
            photoURL1link:bannerImg[0]?.link||"",
            photoURL2link:bannerImg[1]?.link||"",
            photoURL3link:bannerImg[2]?.link||"",
            photoURL4:blog[0]?.img_url||"",
            photoURL5:blog[1]?.img_url||"",
            photoURL6:blog[2]?.img_url||"",
            photoURL4link:blog[0]?.link||"",
            photoURL5link:blog[1]?.link||"",
            photoURL6link:blog[2]?.link||""
        },
        validationSchema:bannerScheme,
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            try {
              const data = {
                  img_url: values.photoURL1,
                  img_url: values.photoURL2,
                  img_url: values.photoURL3,
              }
            const res = await Banner_Details.createBannerList(Token,data);
             if (res.status===200 && res?.data?.code === 200) {
                enqueueSnackbar("Update success", { variant: "success" });
                setRefrash(true);
               
              } else {
                enqueueSnackbar("Update Fail", { variant: "error" });
    
              }
              setRefrash(false);
            } catch (error) {
                if (isMountedRef.current) {
                  setErrors({ afterSubmit: error.code });
                  setSubmitting(false);

                }
              }
        
            },
          });
    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleSubmit,
        setFieldValue,
      } = formik;
      const handleDrop1 = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const ApiFileData = new FormData();
        ApiFileData.set("files", file);
        const res = await Files.FileUpload(ApiFileData);
        if (res?.status < 400) {
          let imageUrl = res?.data?.data[0];
          setFieldValue("photoURL1", imageUrl["path"]);
          enqueueSnackbar("Image Uploaded Successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Image Uploaded Failed", {
            variant: "error",
          });
        }
      };
      const handleDrop2 = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const ApiFileData = new FormData();
        ApiFileData.set("files", file);
        const res = await Files.FileUpload(ApiFileData);
        if (res?.status < 400) {
          let imageUrl = res?.data?.data[0];
          setFieldValue("photoURL2", imageUrl["path"]);
          enqueueSnackbar("Image Uploaded Successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Image Uploaded Failed", {
            variant: "error",
          });
        }
      };
      const handleDrop3 = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const ApiFileData = new FormData();
        ApiFileData.set("files", file);
        const res = await Files.FileUpload(ApiFileData);
        if (res?.status < 400) {
          let imageUrl = res?.data?.data[0];
          setFieldValue("photoURL3", imageUrl["path"]);
          enqueueSnackbar("Image Uploaded Successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Image Uploaded Failed", {
            variant: "error",
          });
        }
      };
      const handleDrop4 = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const ApiFileData = new FormData();
        ApiFileData.set("files", file);
        const res = await Files.FileUpload(ApiFileData);
        if (res?.status < 400) {
          let imageUrl = res?.data?.data[0];
          setFieldValue("photoURL4", imageUrl["path"]);
          enqueueSnackbar("Image Uploaded Successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Image Uploaded Failed", {
            variant: "error",
          });
        }
      };
      const handleDrop5 = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const ApiFileData = new FormData();
        ApiFileData.set("files", file);
        const res = await Files.FileUpload(ApiFileData);
        if (res?.status < 400) {
          let imageUrl = res?.data?.data[0];
          setFieldValue("photoURL5", imageUrl["path"]);
          enqueueSnackbar("Image Uploaded Successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Image Uploaded Failed", {
            variant: "error",
          });
        }
      };
      const handleDrop6 = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const ApiFileData = new FormData();
        ApiFileData.set("files", file);
        const res = await Files.FileUpload(ApiFileData);
        if (res?.status < 400) {
          let imageUrl = res?.data?.data[0];
          setFieldValue("photoURL6", imageUrl["path"]);
          enqueueSnackbar("Image Uploaded Successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Image Uploaded Failed", {
            variant: "error",
          });
        }
      };
      const submit = async(id,url,link)=> {
        try {
          const data = {
              id:id,
              img_url:url,
              link:link
          }
        const res = await Banner_Details.updateBanner(Token,data);
         if (res.status===200 && res?.data?.code === 200) {
            enqueueSnackbar("Update success", { variant: "success" });
            setRefrash(true);
           
          } else {
            enqueueSnackbar("Update Fail", { variant: "error" });

          }
          setRefrash(false);
        } catch (error) {
            console.log(error)
          }
      }




 
      


    const getBanners = async()=>{
    const res = await Banner_Details.bannerList(Token);     
    if(res.status===200&&res?.data?.code===200){
      const banner = res?.data?.data.filter((item)=>{if(item.type === 'herbalproduct'){return item}})
      const blog = res?.data?.data.filter((item)=>{if(item.type === 'blog'){return item}})
        setBlog(blog)
        setBannerImg(banner)
    }
    else if(res?.response?.status>=400&&res?.response?.statusText==="Unauthorized"){
      setMultipleAuth(true)
     }
    }
    tempFun.current = getBanners;
    const empty=()=>{
      setBannerImg([])
    }
    useEffect(
        ()=>{
          tempFun.current(); 
            return ()=>{
              empty()
              }
        },[refrash]
    )
      const removeImg = () => {
        setFieldValue("photoURL", "");
      };
      useEffect(
        ()=>{
          if(multipleAuth===true){
            navigate("/")
          }
        },[multipleAuth,navigate]
      )
    return(
    <Page title="Banner Management | Animeta">
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading="Banner Management"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: 'Banner Management',
          }
        ]}
      
      />
            
             <FormikProvider value={formik}>
          <Form autoComplete="off"  onSubmit={handleSubmit}>
          <div style={{marginBottom:'45px'}}>
            <h1>Banner Images</h1>
            </div>
          <Grid container style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
              {/* <Grid item xs={12} md={6} sx={{mx:"auto"}}> */}
              <Card sx={{ pt: 5, px: 3, textAlign: "center",margin:'20px' }}>
              <UploadAvatar
                    accept="image/*"
                    file={
                      values.photoURL1 === "removed" ? null : values.photoURL1
                    }
                    onDrop={handleDrop1}
                    error={Boolean(touched.photoURL1 && errors.photoURL1)}
                  />
                  <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                    {touched.photoURL1 && errors.photoURL1}
                  </FormHelperText>

                  {/* {values.photoURL1 === "" ? (
                    <Typography
                    sx={{
                      mt: 3,
                      fontSize: "15px",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Upload Banner Image
                  </Typography>
                  ) : (
                    <Button
                      onClick={removeImg}
                      sx={{ borderRadius: "5px", mt: 5 }}
                      variant="outlined"
                      startIcon={<PersonRemoveIcon />}
                    >
                      Remove Banner Image
                    </Button>
                  )} */}
                  <div style={{marginTop:'25px'}}>
                    <input onChange={(e)=>setFieldValue("photoURL1link",e.target.value)} value={values.photoURL1link} style={{fontSize:'13px',padding:'5px',borderWidth:'1px',borderRadius:'5px'}}  placeholder="Enter Link"/>
                  </div>
                   <LoadingButton
                   sx={{mt:6,mb:3,display:"block",mx:"auto"}}
                      variant="contained"
                      onClick={()=>submit(bannerImg[0].id,values.photoURL1,values.photoURL1link)}
                    >
                      Save Banner
                    </LoadingButton>
                </Card>
                <Card sx={{ pt: 5, px: 3, textAlign: "center" ,margin:'20px'}}>
              <UploadAvatar
                    accept="image/*"
                    file={
                      values.photoURL2 === "removed" ? null : values.photoURL2
                    }
                    onDrop={handleDrop2}
                    error={Boolean(touched.photoURL2 && errors.photoURL2)}
                  />

                  <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                    {touched.photoURL2 && errors.photoURL2}
                  </FormHelperText>

                  {/* {values.photoURL2 === "" ? (
                    <Typography
                    sx={{
                      mt: 3,
                      fontSize: "15px",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Upload Banner Image
                  </Typography>
                  ) : (
                    <Button
                      onClick={removeImg}
                      sx={{ borderRadius: "5px", mt: 5 }}
                      variant="outlined"
                      startIcon={<PersonRemoveIcon />}
                    >
                      Remove Banner Image
                    </Button>
                  )} */}
                  <div style={{marginTop:'25px'}}>
                    <input onChange={(e)=>setFieldValue("photoURL2link",e.target.value)} value={values.photoURL2link} style={{fontSize:'13px',padding:'5px',borderWidth:'1px',borderRadius:'5px'}}  placeholder="Enter Link"/>
                  </div>
                   <LoadingButton
                   sx={{mt:6,mb:3,display:"block",mx:"auto"}}
                      variant="contained"
                      onClick={()=>submit(bannerImg[1].id,values.photoURL2,values.photoURL2link)}
                    >
                      Save Banner
                    </LoadingButton>
                </Card>
                <Card sx={{ pt: 5, px: 3, textAlign: "center",margin:'20px' }}>
              <UploadAvatar
                    accept="image/*"
                    file={
                      values.photoURL3 === "removed" ? null : values.photoURL3
                    }
                    onDrop={handleDrop3}
                    error={Boolean(touched.photoURL3 && errors.photoURL3)}
                  />

                  <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                    {touched.photoURL3 && errors.photoURL3}
                  </FormHelperText>

                  {/* {values.photoURL3 === "" ? (
                    <Typography
                    sx={{
                      mt: 3,
                      fontSize: "15px",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Upload Banner Image
                  </Typography>
                  ) : (
                    <Button
                      onClick={removeImg}
                      sx={{ borderRadius: "5px", mt: 5 }}
                      variant="outlined"
                      startIcon={<PersonRemoveIcon />}
                    >
                      Remove Banner Image
                    </Button>
                  )} */}
                  <div style={{marginTop:'25px'}}>
                    <input onChange={(e)=>setFieldValue("photoURL3link",e.target.value)} value={values.photoURL3link} style={{fontSize:'13px',padding:'5px',borderWidth:'1px',borderRadius:'5px'}}  placeholder="Enter Link"/>
                  </div>
                   <LoadingButton
                   sx={{mt:6,mb:3,display:"block",mx:"auto"}}
                   
                      variant="contained"
                      onClick={()=>submit(bannerImg[2].id,values.photoURL3,values.photoURL3link)}
                    >
                      Save Banner
                    </LoadingButton>
                </Card>
                  {/* </Grid> */}
                  </Grid>
          <hr></hr>
                  <div style={{marginBottom:'45px',marginTop:'30px'}}>
            <h1>Blogs</h1>
            </div>
          <Grid container style={{display:'flex',justifyContent:'space-around'}}>
              <Card sx={{ pt: 5, px: 3, textAlign: "center",margin:'20px'}}>
              <UploadAvatar
                    accept="image/*"
                    file={
                      values.photoURL4 === "removed" ? null : values.photoURL4
                    }
                    onDrop={handleDrop4}
                    error={Boolean(touched.photoURL4 && errors.photoURL4)}
                  />

                  <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                    {touched.photoURL4 && errors.photoURL4}
                  </FormHelperText>

                  
                  <div style={{marginTop:'25px'}}>
                    <input value={values.photoURL4link} onChange={(e)=>setFieldValue("photoURL4link",e.target.value)} style={{fontSize:'13px',padding:'5px',borderWidth:'1px',borderRadius:'5px'}}  placeholder="Enter Link"/>
                  </div>
                   <LoadingButton
                   sx={{mt:6,mb:3,display:"block",mx:"auto"}}
                      variant="contained"
                      onClick={()=>submit(blog[0].id,values.photoURL4,values.photoURL4link)}
                    >
                      Save Banner
                    </LoadingButton>
                </Card>
                <Card sx={{ pt: 5, px: 3, textAlign: "center",margin:'20px' }}>
              <UploadAvatar
                    accept="image/*"
                    file={
                      values.photoURL5 === "removed" ? null : values.photoURL5
                    }
                    onDrop={handleDrop5}
                    error={Boolean(touched.photoURL5 && errors.photoURL5)}
                  />

                  <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                    {touched.photoURL5 && errors.photoURL5}
                  </FormHelperText>

                  
                   <div style={{marginTop:'25px'}}>
                    <input value={values.photoURL5link} onChange={(e)=>setFieldValue("photoURL5link",e.target.value)} style={{fontSize:'13px',padding:'5px',borderWidth:'1px',borderRadius:'5px'}}  placeholder="Enter Link"/>
                  </div>
                   <LoadingButton
                   sx={{mt:6,mb:3,display:"block",mx:"auto"}}
                      variant="contained"
                      onClick={()=>submit(blog[1].id,values.photoURL5,values.photoURL5link)}
                    >
                      Save Banner
                    </LoadingButton>
                </Card>
                <Card sx={{ pt: 5, px: 3, textAlign: "center" ,margin:'20px'}}>
              <UploadAvatar
                    accept="image/*"
                    file={
                      values.photoURL6 === "removed" ? null : values.photoURL6
                    }
                    onDrop={handleDrop6}
                    error={Boolean(touched.photoURL6 && errors.photoURL6)}
                  />

                  <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                    {touched.photoURL6 && errors.photoURL6}
                  </FormHelperText>

                  

                   <div style={{marginTop:'25px'}}>
                    <input value={values.photoURL6link} onChange={(e)=>setFieldValue("photoURL6link",e.target.value)} style={{fontSize:'13px',padding:'5px',borderWidth:'1px',borderRadius:'5px'}}  placeholder="Enter Link"/>
                  </div>
                   <LoadingButton
                   sx={{mt:6,mb:3,display:"block",mx:"auto"}}
                   
                      variant="contained"
                      onClick={()=>submit(blog[2].id,values.photoURL6,values.photoURL6link)}
                    >
                      Save Banner
                    </LoadingButton>
                </Card>
                  </Grid>
          </Form>
        </FormikProvider>
          </Container>
    </Page>
    )
}
export default BannerDetails;