import React,{useState,useEffect,useRef} from 'react';
import * as Yup from 'yup';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import {Container,Card,Typography,FormHelperText,Alert,Tabs,Tab,Box,CircularProgress,Button} from "@mui/material";
import useSettings from '../../../hooks/useSettings';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { QuillEditor } from '../../../components/editor';
import { Form, FormikProvider, useFormik,FieldArray } from 'formik';
import { LanguageDetails } from "src/_apis_";
import { object, array } from "yup";
import { capitalCase } from 'change-case';
import { cmsDetails } from 'src/_apis_';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";
const Terms=()=>{
  const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState(0);
    const [languageList,setLanguageList]=useState([]);
    const [filteres,setFilteres]=useState([]);
    const [diologBox,setDiologBox]=useState(false);
    const [multipleAuth,setMultipleAuth]=useState(false);
    const [globalId,setGlobalId]=useState("");
    const tempFun=useRef();
    const tempFunTwo=useRef();
    const tempFunTh=useRef();
    const tempFunfor=useRef();
    const [clearId,setClearId]=useState("");
    const [cmsItem,setCmsItem]=useState([]);
    const [refrash,setRefrash]=useState(false);
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
    const NewProductSchema = Yup.object().shape({
        language: array()
        .of(
          object().shape({
            content: Yup.string().required('Terms and condition is required'),
          })
        ),
       
      });
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            language:cmsItem || [ {
              content:"",
            }]
        },
        validationSchema: NewProductSchema,
        onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
            try {
              const data = {
                type: "termsandcondition",
                language:values.language,
              }
              if(globalId!==""){
                const res = await cmsDetails.cmsContentCreate(Token,data,globalId);
                if(res.status<400){
                  resetForm();
                  enqueueSnackbar( 'Created successfully', { variant: 'success' });
                  setRefrash(true);
                 }
              }
            }
            catch (error) {
                setSubmitting(false);
                setErrors(error);
            }
        }
    });
    const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue,setFieldTouched ,setFieldError} = formik;
    const getLanguages=async()=>{
        const res = await LanguageDetails.getLanguageList(Token);
        if(res.status===200 && res?.data?.code===200){
          res.data.data.forEach(ele=>{
            ele.language_id = ele.id 
    delete ele.id 

          });

        setLanguageList(res.data.data.filter(u=>u.status===1));
        }
    };
    tempFunTh.current=getLanguages;
    const getCmsDetails=async()=>{
      const res = await cmsDetails.cmsContent(Token);
        if(res.status<400){
         setCmsItem(res.data.data.filter(t=>t.type==="termsandcondition")[0].language);
         setGlobalId(res.data.data.filter(t=>t.type==="termsandcondition")[0].id);
        }
        else if(res?.response?.status>=400&&res?.response?.statusText==="Unauthorized"){
          setMultipleAuth(true)
         }
};
tempFunfor.current=getCmsDetails;
    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue);
      };
      const  emptyFun=()=>{
        setLanguageList([]);
      }
      useEffect(
        ()=>{
          tempFunTh.current();
          return()=>{
            emptyFun()
          }
        },[]
      );
      useEffect(
        ()=>{
          tempFunfor.current();
          setRefrash(false);
        },[refrash]
      );
      useEffect(
        ()=>{
          const result = languageList.filter(o1 => !cmsItem?.some(o2 => o1.language_id === o2.language_id));
          result?.map(t=>{
            t['title'] =  "terms";
            t['content'] =  "";
            return(t);
          });
          result.forEach(t=>{
            cmsItem?.push(t);
           });
        },[currentTab,cmsItem,languageList]
      );
      const errorLanFun=()=>{

        if(errors.language?.filter(y=>y?.content==="Terms and condition is required").length>0 && touched.language?.filter(t=>t?.content===true).length>0 ){
          setDiologBox(true);
          const temp=[];
          const filters=[];
          errors.language?.map((t,index)=>{
            if(t?.content==="Terms and condition is required"){
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
    tempFun.current=errorLanFun;
      useEffect(
        ()=>{
          tempFun.current();
        },[isSubmitting]
      );
      const feildAlart=()=>{
        if(values.language?.[clearId]?.content==="<p><br></p>"){
          setFieldValue(`language[${clearId}].content`,"");
          setFieldTouched(`language[${clearId}].content`, true);
        setFieldError(`language[${clearId}].content`, errors.language?.[clearId]?.content);
        }
      }
      tempFunTwo.current=feildAlart;
      const languCon = values.language?.[clearId]?.content;
      useEffect(
        ()=>{
          tempFunTwo.current();
        },[languCon]
      );
      useEffect(
        ()=>{
          if(multipleAuth===true){
            navigate("/")
          }
        },[multipleAuth,navigate]
      )
    return(
        <Page title="Terms and Condition| Animeta">
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading="Terms and Condition"
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              {
                name: "Terms and Condition",
              },
            ]}
           
          />
  
          <Card sx={{my:2,p:"15px"}}>
          <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
            onChange={handleChangeTab}
           
          >
            {languageList.map((tab,index) => (
              <Tab variant="scrollable"
               disableRipple key={tab.language_id} label={capitalCase(tab.language_name)} value={index} />
            ))}
          </Tabs>
          {languageList.length>0 && values.language.length>0 ? 
          <FieldArray
            name="language"
            render={arrayHelpers => (
              <div>
              {
                 values.language?.map((lang,index) => (
                    <div key={index}>
                    {lang.language_id===languageList[currentTab].language_id ?  
                    (
      <Box sx={{marginTop:"20px",}}>
                  <QuillEditor
                    simple
                    id="product-description"
                    value={values.language[index]?.content==="<p></br></p>"?"":values.language[index]?.content}
                    onChange={(val) => setFieldValue(`language[${index}].content`, val!=="<p></br></p>"?val:"")}
                    onBlur={() => setFieldTouched(`language[${index}].content`, true)}
                    placeHolder={"Terms and Condtions"}
                    error={Boolean(touched.language?.[index]?.content && errors.language?.[index]?.content)}
                  />
<Button sx={{
mt:"7px"
}} 
startIcon={<ClearIcon/>}
variant="outlined" onClick={()=>{setFieldValue(`language[${index}].content`,"");setClearId(index)}}>
                {'Clear Data'}
              </Button>
                  {touched.language?.[index]?.content && errors.language?.[index]?.content && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.language?.[index]?.content && errors.language?.[index]?.content}
                    </FormHelperText>
                  )}
                    </Box>)
                   :""}
                    </div>
                  )) 
                 }
              
              </div>
            )}
          />:<Box sx={{py:3,px:3,display:"flex",justifyContent:"center",alignItems:"center"}}><CircularProgress /></Box>
          }
                <LoadingButton sx={{width:"fit-content",mt:"10px"}} type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                {'Create Trems and Condtion'}
              </LoadingButton>
                </Form>
    </FormikProvider>
              </Card>

              </Container>
              </Page>
    );
}
export default Terms;