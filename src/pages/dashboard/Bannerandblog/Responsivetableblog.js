import React,{useEffect, useState} from "react";
import { DataGrid,GridToolbarContainer,GridToolbarFilterButton,GridToolbarExport} from '@mui/x-data-grid';
import {Typography,Box,IconButton,TextField,MenuItem} from "@mui/material";
import { styled } from '@mui/material/styles';
import Scrollbar from "../../../components/Scrollbar";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';






const Responsivetableblog=(props)=>{
const [isNxtActive,setIsNxtActive]=useState(false);
const [isPreActive,setIsPreActive]=useState(false);
    const {
        tableHeaderData,
        tabelBodyData,
        PageSizeCustom,
        ChangePageSize,
        StartPage,
        ChangeStartPage,
        Filter,
        TotalItem,
        selectCheckBox,
        Export,
      } = props;
      const RootStyle = styled('div')(({ theme }) => ({
        '& .MuiDataGrid-root':{
          margin:"10px",
          '&  .MuiDataGrid-columnSeparator': {
            visibility: 'hidden',
        },
        
        "& .MuiDataGrid-columnHeader":{
          background:theme.palette.background.neutral,
          '& .MuiDataGrid-menuIcon':{
            display: 'none',
        },
        "& .MuiDataGrid-columnHeaderTitleContainer":{
          padding:"0px",
        },
        },
        '& .MuiDataGrid-window':{
          overflowX: "scroll",
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
}

        },
        '& .MuiDataGrid-toolbarContainer':{
         justifyContent:"flex-end",
          '& button[aria-label="Density"]':{
           // display:"none"
          },
          '& button[aria-label="Export"]':{
           // display:"none"
          }
        }
        }
       
    }));
    const nextPage=()=>{
      if(TotalItem/PageSizeCustom>=StartPage){
        ChangeStartPage(StartPage+1);
      }
      else{
        ChangeStartPage(StartPage);
      }
  };
  const prePage=()=>{
      if(StartPage===1){
        ChangeStartPage(StartPage);
      }
      else{
        ChangeStartPage(StartPage-1);
      }
  }
  const onPage=(event)=>{
    ChangeStartPage(1);
    ChangePageSize(event.target.value);
  }
useEffect(
  ()=>{
    if(StartPage!==1){
      setIsPreActive(true)
    }
    else if (StartPage===1){
      setIsPreActive(false)
    }
   
  },[PageSizeCustom,StartPage]
);
useEffect(
  ()=>{
   if(TotalItem/PageSizeCustom>StartPage){
      setIsNxtActive(true)
    }
    else{
      setIsNxtActive(false)
    }
  },[PageSizeCustom,StartPage,TotalItem]
);

  const CustomPagination=()=>{
    return(
        <Box sx={{pb:"10px",px:"17px",alignItems:"center",display:"flex",justifyContent:"space-between"}}>
          <Box sx={{marginRight:"20px",display:"flex",alignItems:"center","& .MuiSelect-root":{
              "& ::hover":{
                 "& .MuiOutlinedInput-notchedOutline":{
                     border:"none"
                 }
              },
              "& .MuiOutlinedInput-notchedOutline":{
                 border:"none"
              }
          }}}>
          <Typography sx={{fontSize:"14px",marginRight:"5px"}}>{"Rows per page:"}</Typography>
                 <TextField
                 sx={{"& .MuiSelect-select":{py:"5px",px:"10px",fontSize:"13px",border:"none","& .MuiOutlinedInput-notchedOutline":{border:"none"}}}}
                     onChange={(event)=>onPage(event)}
                     select
                   value={PageSizeCustom}
                    name="pageperrow"
                   >
                     {[50,100].map((option,index) => (
                       <MenuItem key={index} value={option}>
                        {option}
                       </MenuItem>
                     ))}
                     </TextField>
            </Box>
          
            <Typography sx={{fontSize:"13px"}}>{`${StartPage}-${PageSizeCustom} of ${TotalItem}`}</Typography>
            <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",marginLeft:"15px"}}>
            <IconButton onClick={prePage} sx={{padding:"0px"}}>
                {isPreActive?<ArrowBackIosIcon sx={{fontSize:"14px",color:"#000"}}/>  :<ArrowBackIosIcon sx={{fontSize:"14px"}}/>} 
            </IconButton>
       <IconButton onClick={nextPage}  sx={{padding:"0px",marginLeft:"15px"}}>
       {isNxtActive  ? <ArrowForwardIosIcon sx={{fontSize:"14px",color:"#000"}}/> : <ArrowForwardIosIcon sx={{fontSize:"14px"}}/>}
            </IconButton>
  
            </Box>
            
        </Box>
    )
  }
  function CustomToolbar() {
    const ContainerStyle = styled('div')(({ theme }) => ({  
       "& .filterContainer":{
         marginBottom:"0px",
         padding:"0px",
         "& .MuiButton-sizeSmall":{
          marginBottom:"15px",
         }
       }
     }));
  
    return (
      <ContainerStyle>
      <GridToolbarContainer className="filterContainer">
      {Filter ?<GridToolbarFilterButton /> : ""}   
      {Export ?  <GridToolbarExport  /> :""} 
      </GridToolbarContainer>
      </ContainerStyle>
    );
  }
    return(
        <RootStyle>
               <Scrollbar>
        <Box sx={{height:"700px",width:"100%"}}>
   <DataGrid
  disableColumnSelector={true}
 rows={tabelBodyData}
 columns={tableHeaderData}
 pageSize={PageSizeCustom}
 checkboxSelection={selectCheckBox?selectCheckBox:false}
 disableExtendRowFullWidth={true}
 components={{
  Toolbar: CustomToolbar,
  Pagination: CustomPagination,
}}


/>
    </Box>
    </Scrollbar>
    </RootStyle>
    )
}
export default Responsivetableblog;