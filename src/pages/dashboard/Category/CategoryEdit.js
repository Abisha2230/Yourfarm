import React, { useEffect,useState,useRef} from "react"
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik,FieldArray} from 'formik';
// material
import { Box, Grid,Button,Alert, Card,Tab,Tabs,MenuItem, TextField, Container,Typography, FormHelperText,FormControl,RadioGroup,FormLabel,FormControlLabel,Radio } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { UploadAvatar } from '../../../components/upload';
// utils
import { capitalCase } from 'change-case';
//
import { useParams } from "react-router";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import { category_Details } from "src/_apis_";
import { useNavigate } from "react-router-dom";
import { Files } from "src/_apis_";
import { useTheme } from "@mui/material/styles";
import { LanguageDetails } from "src/_apis_";
import { object, array, string } from "yup";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// ----------------------------------------------------------------------

const CategoryEdit=()=>{
  const theme= useTheme();
  const tempFun=useRef();
  const tempFunTwo=useRef();
  const tempFunT=useRef();
  const tempFunF=useRef();
  const [categoryData,setCategoryDate] = useState({});
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const fileId=useParams();
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState(1);
  const [languageList,setLanguageList]=useState([]);
  const [filteres,setFilteres]=useState([]);
  const [diologBox,setDiologBox]=useState(false);
  const UpdateUserSchema = Yup.object().shape({
    language: array()
    .of(
      object().shape({
        category:string().required('Category Name is required'),
        remarks:string().required('Category Remarks is required'),
        language_id:Yup.string(),
        language_code:Yup.string(),
      })
    ),
    categoryType:Yup.string().required('Category type is required'),
    categoryVisibility:Yup.string().required('Category Visibility is required'),
    cetegoryPhotURL:Yup.mixed().required('Category image is required'),
  });
  const navigate = useNavigate();
  const Token  = JSON.parse(window.localStorage.getItem('Token')).useAuth;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      language:categoryData.language || [{language_id:'',
      language_code:'',}], 
      categoryVisibility:JSON.stringify(categoryData.visibility) || " ",
      categoryType:JSON.stringify(categoryData.type)|| '',
      cetegoryPhotURL:categoryData.image_url|| '',
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const data={
          language:values.language,    

          image_url:values.cetegoryPhotURL,
          visibility:Number(values.categoryVisibility),
          type:Number(values.categoryType)
        }
        const res = await category_Details.categoryEdit(Token,fileId.id,data);
        if(res.data.code===200){
          enqueueSnackbar('Update success', { variant: 'success' });
          setTimeout(() => {
            navigate("/category");
          }, 2000);
        }
        else{
          enqueueSnackbar('Update Failed', { variant: 'error' });
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleDrop = useCallback(
    async(acceptedFiles) => {
      const file = acceptedFiles[0];
     
      const ApiFileData = new FormData();
      ApiFileData.set('files', file);
      const res = await Files.FileUpload(ApiFileData);
      if (res.status===200&& res?.data?.code===200) {
        setFieldValue('cetegoryPhotURL',res.data.data[0].path );
        enqueueSnackbar('Image uploaded', { variant: 'success' });
      }
      else{
        enqueueSnackbar('Image Not Uploaded', { variant: 'error' });
      }
    },
    [setFieldValue,enqueueSnackbar]
  );

  const getCategory=async()=>{

          const res = await category_Details.categoryGetSingleId(Token,fileId.id);
          if(res.status===200 && res.data.code===200){
            setCategoryDate(res.data.data[0]);
          }
  };
 tempFunT.current=getCategory;

  const addvalueLangu=()=>{
    const result = languageList.filter(o1 => !categoryData.language?.some(o2 => o1.language_id === o2.language_id));
    result?.map(t=>{
      t['category'] =  "";
      t['remarks'] =  "";
      return(t);
    })
  result.forEach(t=>{
  categoryData.language?.push(t);
 });
 if(categoryData.language?.length===0 || categoryData.language===null ){
  categoryData.language=[];
  languageList.forEach(t=>{
    categoryData.language?.push(t);
   });
   categoryData.language?.map(
     y=>{
      y['category'] =  "";
      y['remarks'] =  "";
      return(y)
     }
   )
 }
  }
  tempFunTwo.current=addvalueLangu;
  useEffect(
    ()=>{
      tempFunTwo.current();
  },[currentTab,categoryData.language]
  );
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const getLanguages=async()=>{
    const res = await LanguageDetails.getLanguageList(Token);
    if(res.status===200 && res?.data?.code===200){
      res.data.data.forEach(ele=>{
        ele.language_id = ele.id 
delete ele.id 
      });
  
     setLanguageList(res.data.data.filter(u=>u.status===1));
     setCurrentTab(0);
    }
};
tempFunF.current = getLanguages;
const removeImg = () => {
  setFieldValue("cetegoryPhotURL", "");
};

useEffect(
  ()=>{
    tempFunT.current();
    return()=>{
      setCategoryDate([]);
    }
  },[]
);
useEffect(
  ()=>{
    tempFunF.current();
  },[]
);
const errorLanguFun=()=>{
  if(errors.language?.filter(y=>y?.category==="Category Name is required" ||y?.remarks==="Category Remarks is required").length>0 && touched.language?.filter(t=>t?.category===true || t?.remarks===true).length>0 ){
    setDiologBox(true);
    const temp=[];
    const filters=[];
    errors.language?.map((t,index)=>{
      if(t?.category==="Category Name is required" || t?.remarks==="Category Remarks is required"){
      const t = values.language?.[index].language_id;
      temp?.push(t);
      }
      return(temp);
      });
      temp.map(t=>{
    languageList.filter(y=>y.language_id===t).forEach(y=>{
      filters.push(y);
        });
        return(filters)
      });
      setFilteres([...new Set(filters)]);
  
  }
 else{
    setDiologBox(false);
  }
}
tempFun.current = errorLanguFun;
useEffect(
  ()=>{
    tempFun.current()  
  },[isSubmitting]
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
            name: 'Category Edit',
  
          },
        ]}
      
      />
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
        <Grid item xs={12} md={5} >
        <Card sx={{ py:4, px: 3, textAlign: 'center' }}>
            <UploadAvatar
                accept="image/*"
                file={values.cetegoryPhotURL === "removed" ? null : values.cetegoryPhotURL }
                onDrop={handleDrop}
                error={Boolean(touched.cetegoryPhotURL && errors.cetegoryPhotURL)}
                
              />

              <FormHelperText error sx={{ px: 2,mb:3, textAlign: 'center' }}>
                {touched.cetegoryPhotURL && errors.cetegoryPhotURL}
              </FormHelperText>
   

     {values.cetegoryPhotURL === "" ? (
                    <Typography
                    sx={{
                      mt: 3,
                      fontSize: "15px",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Upload Category Image
                  </Typography>
                  ) : (
                    <Button
                      onClick={removeImg}
                      sx={{ borderRadius: "5px", mt: 5 }}
                      variant="outlined"
                      startIcon={<PersonRemoveIcon />}
                    >
                      Remove Category Image
                    </Button>
                  )}
              </Card>
        </Grid>
          <Grid item xs={12} md={7} sx={{margin:"auto"}}>
          <Card sx={{ pb:5, px: 3, textAlign: 'center',}}>
     {diologBox ? <Alert sx={{display:"flex",alignItems:"center",justifyContent:"flex-start"}} severity="error">
       {filteres.map((t)=>(
         <Typography key={t.language_id} sx={{fontSize:"13px"}}>
           {`Fill the Details for ${t.language_name} language`}
         </Typography>
       ))}
     </Alert> :""}
          <Tabs
           sx={{mb:"10px"}}
           value={currentTab}
           scrollbuttons="auto"
           variant="scrollable"
          // allowScrollButtonsMobile
           onChange={handleChangeTab}
          
         >
           {languageList.map((tab,index) => (
             <Tab variant="scrollable"
              disableRipple key={index} label={capitalCase(tab.language_name)} value={index} />
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
                   <div>
<TextField sx={{mb:"10px",mt:"20px" }} fullWidth label="Category Name" 
                  {...getFieldProps(`language[${index}].category`)} 
                  error={Boolean(touched.language?.[index]?.category && errors.language?.[index]?.category)}
                  helpertext={touched.language?.[index]?.category &&  errors.language?.[index]?.category}/>
<TextField sx={{mb:"10px"}} fullWidth label="Category Remarks" 
                  {...getFieldProps(`language[${index}].remarks`)} 
                  error={Boolean(touched.language?.[index]?.remarks && errors.language?.[index]?.remarks)}
                  helpertext={touched.language?.[index]?.remarks &&  errors.language?.[index]?.remarks}/>
                          </div>
                          :""}
                    </div>
                  )) 
                 }
              
              </div>
            )}
          />


<TextField
                    select
                    fullWidth
                    sx={{my:"10px",textAlign:"left"}}
                    label="Category Type"
                    placeholder="Category type"
                    {...getFieldProps('categoryType')}
                    error={Boolean(touched.categoryType && errors.categoryType)}
                    helpertext={touched.categoryType && errors.categoryType}
                  >
                    

                    <MenuItem   value={0}>
                      Herbal Products
                      </MenuItem>
                      <MenuItem  value={1}>
                     Farm Inputs/Equipments
                      </MenuItem>
                      <MenuItem  value={2}>
                         Blog
                      </MenuItem>
                      <MenuItem  value={3}>
                        Banner
                      </MenuItem>
                      <MenuItem  value={4}>
                     Videos
                      </MenuItem>
                      <MenuItem  value={5}>
                     Feeds|Feed Supplements
                      </MenuItem>
                
                  </TextField> 


<FormControl sx={{my:"10px",display:"flex",padding:"0px 14px"}}>
      <FormLabel sx={{textAlign:"left",fontSize:"13px"}} id="demo-row-radio-buttons-group-label">Category Visibility</FormLabel>
      <RadioGroup
      {...getFieldProps('categoryVisibility')} 
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
      >
        <FormControlLabel value='0' control={<Radio  name="categoryVisibility"
        id="radioOption1" />} label="Off" />
        <FormControlLabel value='1' control={<Radio   name="categoryVisibility"
        id="radioOption2"/>} label="On" />
      </RadioGroup>
    </FormControl>
    <FormHelperText error sx={{ px: 2,mb:3, textAlign: 'center' }}>
                {touched.categoryVisibility && errors.categoryVisibility}
              </FormHelperText>
   
             

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
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
}
export default CategoryEdit;