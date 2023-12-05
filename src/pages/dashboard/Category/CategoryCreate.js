import React, { useEffect,useState,useRef, useCallback } from "react"
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik,FieldArray} from 'formik';
// material
import { Box, Grid, Card,Alert,Tab,Tabs,Button,MenuItem,TextField, Container,Typography,FormControl,RadioGroup,FormLabel,FormControlLabel,Radio, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { UploadAvatar } from '../../../components/upload';
// utils
import { capitalCase } from 'change-case';
import { useTheme } from "@mui/material/styles";
import { object, array, string, } from "yup";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import { category_Details } from "src/_apis_";
import { useNavigate } from "react-router-dom";
import { Files } from "src/_apis_";
import { LanguageDetails } from "src/_apis_";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// ----------------------------------------------------------------------

const CategoryCreate=()=>{
  const theme= useTheme();
  const tempFun = useRef();
  const tempFunth = useRef();
  const tempFunfor = useRef();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState(0);
  const [languageList,setLanguageList]=useState([]);
  const [filteres,setFilteres]=useState([]);
  const [diologBox,setDiologBox]=useState(false);
  const navigate = useNavigate();
  const Token  = JSON.parse(window.localStorage.getItem('Token')).useAuth;
  const UpdateUserSchema = Yup.object().shape({

    language: array()
    .of(
      object().shape({
        category:string().required('Category Name is required'),
        remarks:string().required('Category Remarks is required'),
      })
    ),
    categoryType:Yup.string().required('Category Type is required'),
    categoryValidity:Yup.string().required('Category Visibility is required'),
    cetegoryPhotURL:Yup.mixed().required('Category image is required'),
  });

  const formik = useFormik({
    initialValues: {
      language:[{category:'',remarks:''}],
        categoryType: '',
        cetegoryPhotURL:'',
        categoryValidity:'',
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const data={
          image_url:values.cetegoryPhotURL,
          language:values.language,
          visibility: values.categoryValidity === "off" ? 0 : 1 ,
          type:Number(values.categoryType),
        }
        const res = await category_Details.categoryCreate(Token,data);
        if(res.data.code===200){
          enqueueSnackbar(' Successfully created', { variant: 'success' });
          setTimeout(() => {
            navigate("/category");
          }, 2000);
        }
        else{
          enqueueSnackbar('Not created', { variant: 'error' });
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
      const file = acceptedFiles?.[0];
      const ApiFileData = new FormData();
      ApiFileData.set('files', file);
      const res = await Files.FileUpload(ApiFileData);
    
   
       if(res.status === 200)
      {
        console.log(res.data.data[0].path)
        setFieldValue('cetegoryPhotURL',res.data.data[0].path );
        enqueueSnackbar('Image uploaded', { variant: 'success' });
      }
      else{
        enqueueSnackbar('Image not uploaded', { variant: 'error' });
      }
    },[setFieldValue,enqueueSnackbar]);
 
  const getLanguages=async()=>{
    const res = await LanguageDetails.getLanguageList(Token);
    if(res.status===200 && res?.data?.code===200){
      res.data.data.forEach(ele=>{
        ele.language_id = ele.id 
delete ele.id 
ele.category="";
ele.remarks="";
      });
  
     setLanguageList(res.data.data.filter(u=>u.status===1));
 
     setFieldValue("language",res.data.data.filter(u=>u.status===1) );
    }
};
tempFunth.current = getLanguages;
const handleChangeTab = (event, newValue) => {
  setCurrentTab(newValue);
};

const emptyFun=()=>{
  setLanguageList([]);
 
  setFieldValue("language",'' );
}
tempFunfor.current=emptyFun;
useEffect(
  ()=>{
    tempFunth.current();
    return()=>{
      tempFunfor.current();
    }
  },[Token]
);



const errorLanguageFun=()=>{
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
      temp.map(t=>
    languageList.filter(y=>y.language_id===t).forEach(y=>{
      filters.push(y);
        })
      );
      setFilteres([...new Set(filters)]);
  
  }
 else{
    setDiologBox(false);
  }
}
tempFun.current = errorLanguageFun;
useEffect(
  ()=>{
    tempFun.current()
  },[isSubmitting]
);
const removeImg = () => {
  setFieldValue("cetegoryPhotURL", "");
};
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
            name: 'Category Create',
  
          },
        ]}
      
      />
   <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
        <Grid item xs={12} md={5} >
        <Card sx={{ py:5, px: 3, textAlign: 'center' }}>
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
            <Card sx={{ pb:5, px: 3, textAlign: 'center' }}>
            {diologBox ? <Alert sx={{display:"flex",alignItems:"center",justifyContent:"flex-start"}} severity="error">
       {filteres.map((t)=>(
         <Typography key={t.language_id} sx={{fontSize:"13px"}}>
           {`Fill the Details for ${t.language_name} language`}
         </Typography>
       ))}
     </Alert> :""}
            <Tabs
            sx={{pb:"10px"}}
            value={currentTab}
            scrollbuttons="auto"
            variant="scrollable"
           
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
                  languageList.map((lang,index) => (
                    <div key={index}>
                    {index===currentTab ?  
                    (<div>
<TextField sx={{mb:"10px"}} fullWidth label="Category Name" 
                  {...getFieldProps(`language[${index}].category`)} 
                  error={Boolean(touched?.language?.[index]?.category && errors?.language?.[index]?.category)}
                  helpertext={touched?.language?.[index]?.category &&  errors?.language?.[index]?.category}/>
<TextField sx={{mb:"10px"}} fullWidth label="Category Remarks" 
                  {...getFieldProps(`language[${index}].remarks`)} 
                  error={Boolean(touched?.language?.[index]?.remarks && errors?.language?.[index]?.remarks)}
                  helpertext={touched?.language?.[index]?.remarks &&  errors?.language?.[index]?.remarks}/>
                          </div>)
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
                      <MenuItem  value={6}>
                      Testimonials
                      </MenuItem>
                      <MenuItem  value={7}>
                      Doctors
                      </MenuItem>
                      <MenuItem  value={8}>
                      Partners
                      </MenuItem>
                      <MenuItem  value={9}>
                      Stats
                      </MenuItem>
                  </TextField> 


<FormControl sx={{my:"10px",display:"flex",padding:"0px 14px"}}>
      <FormLabel sx={{textAlign:"left",fontSize:"13px"}} id="demo-row-radio-buttons-group-label">Category Visibility</FormLabel>
      <RadioGroup
      {...getFieldProps('categoryValidity')} 
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
      >
        <FormControlLabel value="off" control={<Radio  name="categoryValidity"
        id="radioOption1" />} label="Off" />
        <FormControlLabel value="on" control={<Radio   name="categoryValidity"
        id="radioOption2"/>} label="On" />
      </RadioGroup>
    </FormControl>
    
             
    <FormHelperText error sx={{ px: 2,mb:3, textAlign: 'left' }}>
                {touched.categoryValidity && errors.categoryValidity}
              </FormHelperText>
             

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Create Category
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
export default CategoryCreate;