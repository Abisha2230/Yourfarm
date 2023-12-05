import React, { useState, useEffect,useRef } from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Form, FormikProvider, useFormik,FieldArray} from "formik";
import { capitalCase } from 'change-case';
import { useTheme } from "@mui/material/styles";
// material
import {
  Box,
  Grid,
  Button,
  Card,
  Typography,
  Stack,
  TextField,
  Container,
  FormHelperText,
  MenuItem,
  Tabs,
  Tab,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { UploadAvatar } from "../../../components/upload";
// utils
//

import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import { PATH_DASHBOARD } from "../../../routes/paths";
import useSettings from "../../../hooks/useSettings";
import { useParams } from "react-router";
import { Item_Details } from "src/_apis_";
import { category_Details } from "src/_apis_";
import { useNavigate } from "react-router-dom";
import { Files } from "../../../_apis_/file";
import { LanguageDetails } from "src/_apis_";
import { object, array, string, } from "yup";


// ----------------------------------------------------------------------

const BlogEdit = () => {
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [categoryData, setCategoryData] = useState([]);
  const theme = useTheme();
  const tempFun=useRef();
  const tempFunOne=useRef();
  const tempFunTwo=useRef();
  const tempFunFour=useRef();
  const [object1, setObject1] = useState({});
  const { themeStretch } = useSettings();
  const [discounttpyes, setDiscountTypes] = useState(0);
  const [discountType,setDiscountType] =useState("");
  const [Price,serPrice] = useState("");
  const [productlist,setProductlist] = useState();
  const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
  const fileId = useParams();
  const [getItemSignle, setGetItemSignle] = useState([]);
  const [currentTab, setCurrentTab] = useState(1);
  const [languageList,setLanguageList]=useState([]);
  const [filteres,setFilteres]=useState([]);
  const [diologBox,setDiologBox]=useState(false);
  const relate = useRef([])
  const [user,setuser] = useState(localStorage.getItem('Role'));

  
  const UpdateUserSchema = Yup.object().shape({
    language: array()
    .of(
      object().shape({
        title: string().required("Title is required"),
        // contents: Yup.string().required("Contents is required"),
        // medicine_type: Yup.string().required("Medicine Type is required"),
        // cattle_type: Yup.string().required("Category is required"),
       language_id:Yup.string(),
       language_code:Yup.string(),
      })
    ),
    // dosageInfo: Yup.number().min(1,"greater than 0").required("Product Net Weight is required"),
    // price: Yup.number().min(1,"greater than 0").required("price is required"),
    photoURL: Yup.mixed().required("image is required"),
    type: Yup.string().required("Type is required"),
    featured: Yup.string().required("Featured is required"),
    link:Yup.string().required("Link is required"),
    youtube_video_id:Yup.string().required("Youtube id is required"),
    visibility:Yup.string().required("Visibility is required"),
  });
  const discountScheme = Yup.object().shape({
    language: array()
    .of(
      object().shape({
        medicine_name: string().required("Productname is required"),
        discription: Yup.string().required("Description is required"),
        medicine_type: Yup.string().required("Medicine Type is required"),
        cattle_type: Yup.string().required("Category is required"),
        language_id:Yup.string(),
        language_code:Yup.string(),
      })
    ),
    dosageInfo: Yup.number().min(1,"greater than 0").required("Product net weight is required"),
    price: Yup.number().min(1,"greater than 0").required("price is required"),
    photoURL: Yup.mixed().required("image is required"),
    discountstatus: Yup.string().required("discount status is required"),
    discounttype: Yup.string(),
    discountvalue: Yup.string(),
    maxcat: Yup.string().required("Maximum Cattle is required"),
    visibility:Yup.string().required("Visibility is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      language:getItemSignle.language ||[{language_id:'',
        language_code:'',}],
      photoURL: getItemSignle.img_url || "",
      type:getItemSignle.type || "",
      link:getItemSignle.link || "",
      // title:getItemSignle.title || "",
      featured:getItemSignle.featured || "",
      youtube_video_id:getItemSignle.youtube_video_id || "",
      // dosageInfo: getItemSignle.package_weight_in_gram || "",
      // price: getItemSignle.amount || "",
      // discountstatus: JSON.stringify(getItemSignle.discount_status)|| "",
      // discounttype:JSON.stringify( getItemSignle.discount_type) || "",
      // discountvalue: getItemSignle.discount_amount || "",
      // maxcat: getItemSignle.maximum_cattle || "",
      visibility:getItemSignle.visibility===1 ? "on":"off" || "",
      // kitdetails:getItemSignle.kit_details || "",
    },
    // validationSchema: UpdateUserSchema ,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {

        const data = {
          type:values.type,
          title:"",
          contents:[],
          link:values.link,
          featured:values.featured,
          visibility:Number(values.visibility==="on"?1:0),
          youtube_video_id:values.youtube_video_id,
          img_url: values.photoURL,
          language:values.language,
        };
     
        console.log(JSON.stringify(data)+'fddddddddddddddddd')
          const res = await Item_Details.BannerblogEdit(data,Token, fileId.id);
          console.log(JSON.stringify(res))
          if (res.data.code === 200) {
            enqueueSnackbar("Update success", { variant: "success" });
            setTimeout(() => {
              navigate("/BlogBanner");
            });
          } else {
            enqueueSnackbar("Update Fail", { variant: "error" });
          }
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
    getFieldProps,
    setFieldValue,
  } = formik;

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const ApiFileData = new FormData();
    ApiFileData.set("files", file);
    const res = await Files.FileUpload(ApiFileData);
    if (res?.status < 400) {
      let imageUrl = res?.data?.data[0];
      setFieldValue("photoURL", imageUrl["path"]);
      enqueueSnackbar("Image Uploaded Successfully", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Image Uploaded Failed", {
        variant: "error",
      });
    }
  };

  const removeImg = () => {
    setFieldValue("photoURL", "");
  };
  const getLanguages=async()=>{
    const res = await LanguageDetails.getLanguageList(Token);
    if(res.status===200 && res?.data?.code===200){
      res.data.data.forEach(ele=>{
        ele.language_id = ele.id 
delete ele.id 
      });

     setLanguageList(res.data.data.filter(u=>u.status===1));
    //  setCurrentTab(0);
    }
};
tempFunOne.current = getLanguages;

useEffect(
  ()=>{
  const result = languageList.filter(o1 => !getItemSignle.language?.some(o2 => o1.language_id === o2.language_id));
  result.map((y)=>{
    y['title']="";
    y['contents']="";
    // y['cattle_type']="";
    // y['discription']="";
    return(y);
  } )
  result.forEach(t=>{
    if(typeof(t) == object){
      getItemSignle.language?.push(JSON.stringify(t));
    }else{
  getItemSignle.language?.push(t);}
 });
 if(getItemSignle.language===null){
  getItemSignle.language=[];
  languageList.forEach(t=>{
    if(typeof(t) == object){
      getItemSignle.language?.push(JSON.stringify(t));
    }else{
      getItemSignle.language?.push(t);
    }
   });
 }
 return ()=>{
  const result = languageList.filter(o1 => !getItemSignle.language?.some(o2 => o1.language_id === o2.language_id));
  result.map(y=>{
    y['title']="";
    y['contents']="";
    // y['cattle_type']="";
    // y['discription']="";
    return(y);
  })
  result.forEach(t=>{
    if(typeof(t) == object){
      getItemSignle.language?.push(JSON.stringify(t));
    }else{
      getItemSignle.language?.push(t);
    }
 });
 if(getItemSignle.language===null){
  getItemSignle.language=[];
  languageList.forEach(t=>{
    if(typeof(t) == object){
      getItemSignle.language?.push(JSON.stringify(t));
    }else{
      getItemSignle.language?.push(t);
    }
   });
 }
 }
},[values.language,currentTab,getItemSignle,languageList]
);





  useEffect(() => {
    if (values.discountstatus === '1') {
      setDiscountTypes("on");
    } else {
      setDiscountTypes("off");
    }
    return ()=>{
      if (values.discountstatus === '1') {
        setDiscountTypes("on");
      } else {
        setDiscountTypes("off");
      }
    }
  }, [values.discountstatus]);

  const getCategory =async () => {
    const res = await category_Details.categoryList(Token);
    if (res?.data?.code === 200) {
      res?.data?.data?.forEach(ele=>{
        // ele.cattle_type?.toLowerCase();
      })
      setCategoryData(
        res?.data?.data.filter(
          (re) => re.type === 0 || re.type === 5 && re.visibility ===1 
        )
      );
     
    }
  };
  tempFunTwo.current=getCategory;
  const getItemsingle = async () => {
    const res = await Item_Details.Getbannerblogbyid(fileId.id, Token);
    // console.log(JSON.stringify(res)+'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
    if (res?.data?.code === 200) {
      // relate.current = res.data.data[0].related_products

      res.data.data.forEach(ele=>{
        // ele.cattle_type=ele.cattle_type?.toLowerCase();
        // ele.language.forEach(polo=>{
          // polo.cattle_type =  polo.cattle_type.toLowerCase();
        // },
        // )
        ele.language = ele.language.filter(t=> languageList.some(y=>y.language_id===t.language_id));
    });
      if (isMountedRef.current) {
      setGetItemSignle(res.data.data[0]);
      }
    }
  }
  tempFunFour.current = getItemsingle;
useEffect(
  ()=>{
    tempFunTwo.current();
  },[]
);
const emptyFun=()=>{
  setLanguageList([]);
}
useEffect(
  ()=>{
    tempFunOne.current();
    return()=>{
      emptyFun();
    }
  },[]
);
useEffect(
()=>{
  tempFunFour.current();
},[ languageList]
);
 
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
 
  const alertLangu=()=>{
    if(errors.language?.filter(y=>y?.cattle_type==="Category is required"||y?.medicine_type==="Medicine Type is required"||
    y?.medicine_name==="Productname is required" ||y?.discription==="Description is required").length>0 && touched.language?.filter(t=>t?.cattle_type===true || t?.discription===true || t?.medicine_name===true||t?.medicine_type===true).length>0 ){
      setDiologBox(true);
      const temp=[];
      const filters=[];
      errors.language?.map((t,index)=>{
        if(t?.cattle_type==="Category is required"||t?.medicine_type==="Medicine Type is required"||
        t?.medicine_name==="Productname is required" ||t?.discription==="Description is required"){
        const t = values.language?.[index].language_id;
        temp?.push(t);
        }
        return(temp);
        });
        temp.map(t=>{
      languageList.filter(y=>y.language_id===t).forEach(y=>{
        filters.push(y);
          });
          return(filters);
        });
        setFilteres([...new Set(filters)]);
    
    }
   else{
      setDiologBox(false);
    }
  }
  // tempFun.current=alertLangu;
  // useEffect(
  //   ()=>{
  //     tempFun.current()
  //   },[isSubmitting]
  // );
  useEffect(
    ()=> {serPrice(values.price);},[values.price]
   );
   useEffect(
     ()=> {setDiscountType(Number(values.discounttype));},[values.discounttype]
    );

useEffect(
  ()=>{
    const com=[];
    const indexing=[];
    const yupd =[];
    categoryData.map(yy=>{
  // yupd.push(getItemSignle.language?.filter(y=>yy.language?.some(op=>op.category.toLowerCase()===y.cattle_type)));
return(yupd);  
})
  //   getItemSignle.language?.forEach((ii,index)=>{
  //     indexing.push(index);
  //     categoryData.forEach(t=>{
  //       t.language?.forEach(pos=>{
  //         if(pos.category.toLowerCase()===ii.cattle_type?.toLowerCase()){
       
  //          const g=getItemSignle.language.findIndex(ip=>ip.language_id===ii.language_id);
  //         com.push(g);
  //          indexing.filter(rrr=>!com.some(e=>e===rrr))?.map(ri=>{
  //          getItemSignle.language[ri].cattle_type=""
  //          return(ri);
  //          })
  //        }
  //       })
       

  //  if(yupd?.flatMap(p=>p).length===0){
  //         indexing.map(ri=>{
  //         getItemSignle.language[ri].cattle_type="";
  //           return(ri);
  //         })
  //       }
  //     })
  //   })
  },[getItemSignle.language,categoryData]
)



const getProduct = async() => {
  const res = await Item_Details.ItemsList(Token);
  setProductlist(res.data.data);
}
useEffect(
  ()=>{
    tempFunOne.current();
    getProduct()
  },[currentTab]
);


const addRelated = (event) => {
  if (event.target.checked) {
    relate.current = [...relate.current, parseInt(event.target.value)]
  } else {
    relate.current = relate.current.filter((item) => item !== parseInt(event.target.value))
  }
}

const handleChangecontents = (key,value,index) => {
  const data0 = values.language
  if(index === 0){
  data0.forEach((ele)=>{
    ele.contents = ele.language_id === 1 ? [{...ele.contents[0],[key]:value}] : ele.contents

  })
  setFieldValue('language',data0)
}else{
  data0.forEach((ele)=>{
    ele.contents = ele.language_id === 6 ? [{...ele.contents[0],[key]:value}] : ele.contents

  })
  setFieldValue('language',data0)

}
  // const data = {...data0[index].contents[0],[key]:value}
}

  return (
    <Page title="Online Resource Management | Animeta">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Online Resource Management"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "Online Resource Management",
              href: PATH_DASHBOARD.BlogBanner.root,
            },
            {
              name: "Item Edit",
            },
          ]}
        />
              
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
                  <UploadAvatar
                    accept="image/*"
                    file={
                      values.photoURL === "removed" ? null : values.photoURL
                    }
                    onDrop={handleDrop}
                    error={Boolean(touched.photoURL && errors.photoURL)}
                  />

                  <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                    {touched.photoURL && errors.photoURL}
                  </FormHelperText>

                  {values.photoURL === "" ? (
                    <Typography
                    sx={{
                      mt: 3,
                      fontSize: "15px",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Upload Product Image
                  </Typography>
                  ) : (
                    <Button
                      onClick={removeImg}
                      sx={{ borderRadius: "5px", mt: 5 }}
                      variant="outlined"
                      startIcon={<PersonRemoveIcon />}
                    >
                      Remove Profile Image
                    </Button>
                  )}
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={{ xs: 2, md: 3 }}>
                  {diologBox ? <Alert sx={{display:"flex",alignItems:"center",justifyContent:"flex-start"}} severity="error">
       {filteres.map((t)=>(
         <Typography key={t.language_id} sx={{fontSize:"13px"}}>
           {`Fill the Details for ${t.language_name} language`}
         </Typography>
       ))}
     </Alert> :""}
                  <Tabs
            value={currentTab}
            scrollbuttons="auto"
            variant="scrollable"
            //allowScrollButtonsMobile
            onChange={handleChangeTab}
           
          >
            {languageList.map((tab,index) => (
              <Tab variant="scrollable"
               disableRipple key={tab.language_id} label={capitalCase(tab.language_name)} value={index} />
            ))}
          </Tabs>
          <FieldArray
            name="language"
            render={arrayHelpers => (
              <div>
              {
                 values.language.map((lang,index) => (
                    <div key={index}>
                    {lang.language_id === languageList[currentTab]?.language_id?  
                    (<div>
                       <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                     <TextField
                        fullWidth
                        label={"Title"}
                        {...getFieldProps(`language[${index}].title`)}
                    error={Boolean(touched.language?.[index]?.title && errors.language?.[index]?.title)}
                    helperText={touched.language?.[index]?.title && errors.language?.[index]?.title}
                      />
                    <TextField
                        fullWidth
                        label="Contents"
                        // value={values.language[index].contents}
                        {...getFieldProps(`language[${index}].contents`)}
                        error={Boolean(touched.language?.[index]?.contents && errors.language?.[index]?.contents)}
                                            helperText={touched.language?.[index]?.contents && errors.language?.[index]?.contents}
                      />
                       </Stack>
                       {values?.language[index]?.contents[0] && Object.entries(values?.language[index]?.contents[0]).map(([key,value])=>{
                        return(
                          <Stack>
                          <TextField
                          fullWidth
                          label={key}
                          value={value}
                          onChange={(e) => handleChangecontents(key, e.target.value,index)}

                          // {...getFieldProps(`language[${index}].contents`)}
                          // error={Boolean(touched.language?.[index]?.contents && errors.language?.[index]?.contents)}
                          //                     helperText={touched.language?.[index]?.contents && errors.language?.[index]?.contents}
                        />
                         </Stack>
                        )
                       })}
                       {/* {values?.language[index]?.contents[0]?.keys(values?.language[index]?.contents[0]).map((item)=>{
                        // const data = values?.language[index]?.contents[0];
                        return(
                        <Stack>
                          <TextField
                          fullWidth
                          label={item}
                          value={values?.language[index]?.contents[0][item] || ''}
                          // {...getFieldProps(`language[${index}].contents`)}
                          // error={Boolean(touched.language?.[index]?.contents && errors.language?.[index]?.contents)}
                          //                     helperText={touched.language?.[index]?.contents && errors.language?.[index]?.contents}
                        />
                         </Stack>)
                       })} */}

                          {/* <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                       <TextField
                       {...getFieldProps(`language[${index}].discription`)}
                      fullWidth
                      multiline
                      minRows={4}
                      maxRows={4}
                      label="Description"
                      error={Boolean(touched.language?.[index]?.discription && errors.language?.[index]?.discription)}
                      helperText={touched.language?.[index]?.discription && errors.language?.[index]?.discription}
                    />
                    </Stack> */}
</div>)
                   :""}
                    </div>
                  )) 
                 }
              
              </div>
            )}
            />
                   
                   <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                      {categoryData.length>0? <TextField
select
                        fullWidth
                        label="Category"
                        placeholder="Category"
                        {...getFieldProps(`type`)}
                        // error={Boolean(touched.language?.[index]?.cattle_type && errors.language?.[index]?.cattle_type)}
                        // helperText={touched.language?.[index]?.cattle_type && errors.language?.[index]?.cattle_type}
                     >
                        <MenuItem value={"நாட்டு மாடு"}>
                          நாட்டு மாடு
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"கறவை மாடு"}>
                          கறவை மாடு
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"வெள்ளாடு"}>
                          வெள்ளாடு
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"நாட்டு கோழி"}>
                          நாட்டு கோழி
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"செம்மறியாடு"}>
                          செம்மறியாடு
                                                     {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"banner"}>
                          banner
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem><MenuItem  value={"blog"}>
                          blog
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"doctor"}>
                          doctor
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"menu"}>
                          menu
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem value={"partner"}>
                          partner
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"statistics"}>
                          statistics
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                          <MenuItem  value={"testimonial"}>
                          testimonial
                           {/* {option.language?.filter(t=>t.language_id===languageList[currentTab].language_id).length>0 ? option.language?.filter(t=>t.language_id===languageList[currentTab].language_id)[0]?.category:""} */}
                          </MenuItem>
                       
                      </TextField>:""}
                    </Stack>
                    <Stack sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                        fullWidth
                        label="Link"
                        {...getFieldProps("link")}
                        error={Boolean(touched.link && errors.link)}
                        helperText={touched.link && errors.link}
                      />

                     <TextField
                        fullWidth
                        label="Featured"
                        {...getFieldProps("featured")}
                        error={Boolean(touched.featured && errors.featured)}
                        helperText={touched.featured && errors.featured}
                      />

                    </Stack>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                        fullWidth
                        label="youtube_video_id"
                        {...getFieldProps("youtube_video_id")}
                        error={Boolean(touched.youtube_video_id && errors.youtube_video_id)}
                        helperText={touched.youtube_video_id && errors.youtube_video_id}
                      />
                      {/* <TextField
                        fullWidth
                        label="Product Net Weight"
                        {...getFieldProps("dosageInfo")}
                        error={Boolean(touched.dosageInfo && errors.dosageInfo)}
                        helperText={touched.dosageInfo && errors.dosageInfo}
                      /> */}
                    
                    </Stack>
                    <FormControl>
                    <FormLabel sx={{textAlign:"left",fontSize:"13px"}} id="demo-row-radio-buttons-group-label">Item Visibility</FormLabel>
      <RadioGroup
      {...getFieldProps('visibility')} 
     
    
      
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
      >
        <FormControlLabel value={"off"} control={<Radio  name="visibility"
        id="radioOption1" />} label="Off" />
         {(values.type === 'menu' && user === 'Admin') &&
        <FormControlLabel value={"on"} control={<Radio   name="visibility"
        id="radioOption2"/>} label="On" />
        }
        {values.type !== 'menu' &&
        <FormControlLabel value={"on"} control={<Radio   name="visibility"
        id="radioOption2"/>} label="On" />}
      </RadioGroup>
    </FormControl>
    
             
    {/* <FormHelperText error sx={{ px: 2,mb:3,mt:"0px!important", textAlign: 'left' }}>
                {touched.visibility && errors.visibility}
              </FormHelperText> */}
                   
                    {/* <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                      <TextField
                        select
                        fullWidth
                        label="Discount Status"
                        placeholder="Discount Status"
                        {...getFieldProps("discountstatus")}
                        error={Boolean(
                          touched.discountstatus && errors.discountstatus
                        )}
                        helperText={
                          touched.discountstatus && errors.discountstatus
                        }
                      >
                        <MenuItem value={'1'}>On</MenuItem>
                        <MenuItem value={'0'}>Off</MenuItem>
                      </TextField>
                  
                    </Stack> */}
                    {/* {values.discountstatus === '1' && (
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                      >
                        <TextField
                          select
                          fullWidth
                          label="Discount Type"
                          placeholder="Discount Type"
                          {...getFieldProps("discounttype")}
                          error={Boolean(
                            touched.discounttype && errors.discounttype
                          )}
                          helperText={
                            touched.discounttype && errors.discounttype
                          }
                        >
                          <MenuItem value={1}>Offer</MenuItem>
                          <MenuItem value={0}>Flat</MenuItem>
                        </TextField>
                        <TextField
                          fullWidth
                          label="Discount Value"
                          {...getFieldProps("discountvalue")}
                          error={Boolean(
                            touched.discountvalue && errors.discountvalue
                          )}
                          helperText={
                            touched.discountvalue && errors.discountvalue
                          }
                        />
                      </Stack>
                    )} */}

{/* <FormLabel sx={{textAlign:"left",fontSize:"13px",marginTop:5}}>Related Products</FormLabel> */}

{/* {productlist?.map((item)=>{
  return(
  <Stack key={item.id} sx={{my:"10px"}} direction={{ xs: "column", md: "row" }} spacing={2}>
                      <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'600px'}}>
                      <img style={{height:40,width:'8%',objectFit:'cover'}}  src={item.image_url} alt="My Image" />
                      <h5 style={{width:'44%',marginLeft:'15px',fontWeight:'normal'}}>{item.medicine_name}</h5>
                      <h5  style={{width:'44%',fontWeight:'normal'}}>{item.cattle_type}</h5>
                      </div>
                   
                      <input
          type="checkbox"
          value={item.id}
          defaultChecked={relate.current.includes(item.id)}
          // checked={relate.current.includes(item.id) && true}
          onChange={addRelated}
        />
                      </Stack>
  );
})} */}

                    
                  </Stack>

                  <Box
                    sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                    >
                      Save Changes
                    </LoadingButton>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
};
export default BlogEdit;
