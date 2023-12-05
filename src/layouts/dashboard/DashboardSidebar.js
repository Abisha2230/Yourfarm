import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Drawer, Tooltip, CardActionArea } from '@mui/material';
// hooks

import useCollapseDrawer from '../../hooks/useCollapseDrawer';

// components
import Logo from '../../components/Logo';

import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import sidebarCrm from './SidebarCrm';
import sidebarCro from './SidebarCrodispatch';
import sidebarOnlyCro from './SidebarCro';
import sidebarVerifier from './SidebarVerifier'
import sidebarDm from './SidebarDm';
import sidebarUser from './SidebarUser'
import sidebarCroListing from './SidebarCroListing'
import { Icon } from '@iconify/react';


// ----------------------------------------------------------------------

const DRAWER_WIDTH = 220;
const COLLAPSE_WIDTH = 102;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex
    })
  }
}));



// ----------------------------------------------------------------------

IconCollapse.propTypes = {
  onToggleCollapse: PropTypes.func,
  collapseClick: PropTypes.bool
};

function IconCollapse({ onToggleCollapse, collapseClick }) {
  return (
    <Tooltip title="Mini Menu">
      <CardActionArea
        // onClick={onToggleCollapse}
        sx={{
          width: 18,
          height: 18,
          display: 'flex',
          cursor: 'pointer',
          borderRadius: '50%',
          alignItems: 'center',
          color: 'text.primary',
          justifyContent: 'center',
          border: 'solid 1px currentColor',
          ...(collapseClick && {
            borderWidth: 2
          })
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'currentColor',
            transition: (theme) => theme.transitions.create('all'),
            ...(collapseClick && {
              width: 0,
              height: 0
            })
          }}
        />
      </CardActionArea>
    </Tooltip>
  );
}

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  // console.log(localStorage.getItem('Role'))

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >

   
      <Stack
        spacing={3}
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2,
          ...(isCollapse && {
            alignItems: 'center'
          })
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            {
              isCollapse && <Icon  onClick={onToggleCollapse} icon="ion:menu" fontSize='20px' color='grey'/>
            }
            {
              !isCollapse && <Icon  onClick={onToggleCollapse} icon="ion:menu" fontSize='20px' color='black'/>
            }
         {/* <Logo cols={isCollapse} /> */}
          </Box>

          {/* <MHidden width="lgDown">
            {!isCollapse && <IconCollapse onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />}
          </MHidden> */}
        </Stack>

        
      </Stack>
      {localStorage.getItem('Role') === 'Cro' &&
      <NavSection navConfig={sidebarOnlyCro} isShow={!isCollapse} />}
      {(localStorage.getItem('Role') === 'Dispatch') &&
      <NavSection navConfig={sidebarCro} isShow={!isCollapse} />}
      {localStorage.getItem('Role') === 'Admin' && <NavSection navConfig={sidebarConfig} isShow={!isCollapse} />
      }
      {localStorage.getItem('Role') === 'Verifier' && <NavSection navConfig={sidebarVerifier} isShow={!isCollapse} />
      }
      {localStorage.getItem('Role') === 'CRM' && <NavSection navConfig={sidebarCrm} isShow={!isCollapse} />
      }
      {localStorage.getItem('Role') === 'DM' && <NavSection navConfig={sidebarDm} isShow={!isCollapse} />
      }
      {localStorage.getItem('Role') === 'User' && <NavSection navConfig={sidebarUser} isShow={!isCollapse} />
      }
       {localStorage.getItem('Role') === 'Cro Listing' && <NavSection navConfig={sidebarCroListing} isShow={!isCollapse} />
      }

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH
        },
        ...(collapseClick && {
          position: 'absolute'
        }),
        "& .MuiListItemButton-root":{
          padding:"0px 10px",
          paddingLeft:"15px",
          "& .MuiListItemIcon-root":{
            marginRight: "8px",
            "& .MuiSvgIcon-root ":{
              width: "19px",
              height: "19px",
             },
             "& .MuiListItemText-root ":{
              fontSize: "13px",
             }
          }
         
        },
        "& .MuiListSubheader-root":{
          paddingLeft:"16px",
          marginBottom:"15px",
          marginTop: "11px"
        },
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          // onMouseEnter={onHoverEnter}
          // onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: COLLAPSE_WIDTH
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.88)
              })
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
