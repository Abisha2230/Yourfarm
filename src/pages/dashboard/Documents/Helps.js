import React,{useState,useEffect,useRef} from 'react';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
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
const Helps=()=>{
  const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState(0);
    const [languageList,setLanguageList]=useState([]);
    const [filteres,setFilteres]=useState([]);
    const [cmsItem,setCmsItem]=useState([]);
    const [refrash,setRefrash]=useState(false);
    const [clearId,setClearId]=useState("");
    const [globalId,setGlobalId]=useState("");
    const [multipleAuth,setMultipleAuth]=useState(false);
    const [diologBox,setDiologBox]=useState(false);
    const { themeStretch } = useSettings();
    const themFun=useRef();
    const themFunTwo=useRef();
    const tempFun=useRef();
    const tempTw=useRef();
    const { enqueueSnackbar } = useSnackbar();
    const Token = JSON.parse(window.localStorage.getItem("Token")).useAuth;
    const NewProductSchema = Yup.object().shape({
        language: array()
        .of(
          object().shape({
            content: Yup.string().required('Helps is required'),
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
                type: "help",
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
    const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue,setFieldTouched,setFieldError } = formik;
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
    tempFun.current = getLanguages;
    const getCmsDetails=async()=>{
            const res = await cmsDetails.cmsContent(Token);

              if(res.status<400){
                setCmsItem(res.data.data.filter(t=>t.type==="help")[0].language);
                setGlobalId(res.data.data.filter(t=>t.type==="help")[0].id)
              }
              else if(res?.response?.status>=400&&res?.response?.statusText==="Unauthorized"){
                setMultipleAuth(true)
               }
    };
    tempTw.current = getCmsDetails;
    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue);
      };
      const emptyFun=()=>{
        setLanguageList([]);
      }
      useEffect(
        ()=>{
          tempFun.current();
          return()=>{
            emptyFun();
          }
        },[]
      );
      useEffect(
        ()=>{
          tempTw.current();
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
      const errorLangFun=()=>{
        if(errors.language?.filter(y=>y?.content==="Helps is required").length>0 && touched.language?.filter(t=>t?.content===true).length>0 ){
          setDiologBox(true);
          const temp=[];
          const filters=[];
          errors.language?.map((t,index)=>{
            if(t?.content==="Helps is required"){
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
      themFun.current=errorLangFun;
      useEffect(
        ()=>{
          themFun.current();
        },[isSubmitting]
      );
  const spContent = values.language?.[clearId]?.content;
  const fielsEmptyAlert=()=>{
    if(values.language?.[clearId]?.content==="<p><br></p>"){
      setFieldValue(`language[${clearId}].content`,"");
      setFieldTouched(`language[${clearId}].content`, true);
    setFieldError(`language[${clearId}].content`, errors.language?.[clearId]?.content);
    }
  }
  themFunTwo.current=fielsEmptyAlert;
      useEffect(
        ()=>{
          themFunTwo.current();
        },[spContent]
      );
      useEffect(
        ()=>{
          if(multipleAuth===true){
            navigate("/")
          }
        },[multipleAuth,navigate]
      )

    return(
        <Page title="Helps | Animeta">
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading="Helps"
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              {
                name: "Helps",
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
          {languageList.length>0 && values.language.length>0? 
          <FieldArray
            name="language"
            render={arrayHelpers => (
              <div>
              {
                   values.language.map((lang,index) => (
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
                    placeHolder={"Helps"}
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
          />:<Box sx={{py:3,px:3,display:"flex",justifyContent:"center",alignItems:"center"}}><CircularProgress /></Box>}
                <LoadingButton sx={{width:"fit-content",mt:"10px"}} type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                {'Create Help'}
              </LoadingButton>
              
                </Form>
    </FormikProvider>
              </Card>

              </Container>
              </Page>
    );
}
export default Helps;