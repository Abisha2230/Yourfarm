import React,{useEffect, useState,useCallback} from "react";
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import { MHidden } from '../../components/@material-extend';
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import { Admin_login_Service } from "src/_apis_";
import useIsMountedRef from "src/hooks/useIsMountedRef";



// ----------------------------------------------------------------------

const DRAWER_WIDTH = 220;
const COLLAPSE_WIDTH = 102;

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 66;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const isMountedRef = useIsMountedRef();
  const userId = JSON.parse(window.localStorage.getItem('User'))?.userData?.id;
  const Tokens = JSON.parse(window.localStorage.getItem('Token'))?.useAuth;
  const { isCollapse } = useCollapseDrawer();
  const [adminProfile,setAdminProfile]=useState({});
 
 

 const adminProfileList=useCallback(async()=>{
  const res = await Admin_login_Service.adminDetails(Tokens,userId);
  if(res?.data?.code!==200){
    localStorage.setItem('Token', JSON.stringify({useAuth:null}));
  }
  else if(isMountedRef.current){
    setAdminProfile(res?.data?.data[0]);
  }
},[isMountedRef,Tokens,userId]);
useEffect(
  ()=>{
    adminProfileList();
  }
,[adminProfileList,Tokens]
);

  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          width: { lg: `calc(100% - ${COLLAPSE_WIDTH}px)` }
        })
      }}
    >
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          
        
          <AccountPopover Tokens={Tokens} resData={adminProfile}/>
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
