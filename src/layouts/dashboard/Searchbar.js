import React,{useState,useEffect,useMemo} from "react";
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled, alpha } from '@mui/material/styles';
import { Autocomplete,TextField, Slide, Button, ClickAwayListener,Card } from '@mui/material';
// components
import { MIconButton } from '../../components/@material-extend';
import { PATH_DASHBOARD } from '../../routes/paths';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 66;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  },
  "& .MuiAutocomplete-endAdornment":{
      display:"none",
  },
  "& .MuiOutlinedInput-notchedOutline":{
    border:'none',
  },
  "& .MuiInputLabel-root.Mui-focused":{
    display:"none"
  },
  "& .MuiAutocomplete-popper":{
    display:"none!important"
  }
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const theme = useTheme();
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
const [optionHeader,setOptionHeader]=useState([]);
const [opens,setOpens]=useState(true);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };
const searchList = useMemo(() => {
  return [];
}, []);

Object.entries(PATH_DASHBOARD).map(t=>searchList.push(t));

useEffect(
  ()=>{
  searchList.forEach(u=>{u.title=u?.[0];u.paths=u?.[1];delete u?.[0];delete u?.[1]});
    setOptionHeader(searchList?.filter(t=>t.title!=="root"&&t.title!=="settings"));
    
  },[searchList]
);

const options = optionHeader.map((option) => {
   
  const firstLetter = option?.title.toUpperCase();
  const optionList = Object.entries(option.paths).map(item => item);
  const OptionsLabel=[];
optionList.forEach(y=>{
  if(y?.[0]==="edit"|| y?.[0]==="preview"){
    delete y?.[0];
    delete y?.[0];
   }
 y.pathName=y?.[0];
 y.path=y?.[1];
 delete y[0];
 delete y[1];
 
 OptionsLabel.push(Object.assign({},y));
});

  return {
    firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    OptionsLabel:OptionsLabel,
    ...option,
  };
});
const CustomPaper = (props) => {
  return <Card  sx={{margin:"5px",top:"5px",padding:"10px",left:"0px",right:"0px",
  
  "& .MuiAutocomplete-listbox":{
    height:"270px",
    padding:"0px",
    "& .MuiListSubheader-root":{
      fontSize: "11px",
      background:theme.palette.grey[200],
    },
    "& .MuiAutocomplete-groupUl":{
        "& .MuiAutocomplete-option":{
          borderBottom:`1px dashed ${theme.palette.grey[300]}`,
          fontSize:"13px",
        },
        "& .MuiAutocomplete-option.Mui-focused":{
          backgroundColor:"transparent",
        }
    },
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
  }
  }} {...props}>
     
  </Card>;
};


options.forEach(y=>{delete y.title; delete y.paths});
const opts=options.flatMap(poo=>poo.OptionsLabel).filter(t=>t?.pathName!==undefined).map((ui)=>{
  const firstLetter = ui.path?.replace("//", "")?.split("/")[0].toUpperCase();
  return {
    firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    ...ui,
  };
})
const getVal=(value)=>{
 navigate(`//${value.target.innerText}`);
}
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <MIconButton onClick={handleOpen}>
            <Icon icon={searchFill} width={20} height={20} />
          </MIconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
          {
            <Autocomplete
          open={opens}
          onOpen={() => setOpens(true)}
          onClose={() => setOpens(false)}
         PaperComponent={CustomPaper}
      id="grouped-demo"
      options={opts.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(opts) => opts.firstLetter}
      getOptionLabel={(opts) =>opts?.path?.replace("//", "")}
      onChange={(value) => getVal(value)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      sx={{ width: "100%" }}
     renderInput={(params) =><TextField {...params}  label="Search Links" />}
     
    />}
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
