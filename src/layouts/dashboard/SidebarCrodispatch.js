// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components

import SpeedIcon from '@mui/icons-material/Speed';
import InboxIcon from '@mui/icons-material/Inbox';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
// ----------------------------------------------------------------------




const sidebarCro = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'general',
  //   items: [
  //     {
  //       title: 'Dashboard',
  //       path: PATH_DASHBOARD.general.app,
  //       icon: <SpeedIcon/>
  //     },
      
   
  //   ]
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : USER

    //   { title: 'Item Management', path: PATH_DASHBOARD.item.root, icon: <InboxIcon/> },
    //   { title: 'Service Management', path: PATH_DASHBOARD.service.root, icon: <WorkOutlineIcon/> },
      // { title: 'Shipping Provider Management', path: PATH_DASHBOARD.shipping.root, icon: <WorkOutlineIcon/> },
      {title:'Order Management',path: PATH_DASHBOARD.order.root,icon: <ShoppingBasketOutlinedIcon/> },
    //   {title:'Category Management',path: PATH_DASHBOARD.category.root,icon: <AccountTreeOutlinedIcon/> },
      // {title:'Banner Management',path: PATH_DASHBOARD.banners.root,icon: <WallpaperIcon/> },
    //   {title:'Online Resource Management',path: PATH_DASHBOARD.BlogBanner.root,icon: <WallpaperIcon/> },

     

    
    ]
  },
// ++++Reports ++++ //
{
    subheader: 'Reports',
    items: [ 
       { title: 'Reports List', path: PATH_DASHBOARD.list.reports, icon: <ListAltIcon/> },
       { title: 'Users List', path: PATH_DASHBOARD.list.users, icon: <GroupIcon/> },
      ],
},
 // ++++Setting ++++ //
// {
//   subheader: 'Setting',
//   items: [ 
   
//      { title: 'Language Setting', path: PATH_DASHBOARD.setting.language, icon: <TranslateOutlinedIcon/> },
//      { title: 'Email Setting', path: PATH_DASHBOARD.setting.email, icon: <ForwardToInboxIcon/> },
//     ],
// },
// {
//   subheader: 'Documents',
//   items: [ 
   
//      { title: 'Terms and Condition', path: PATH_DASHBOARD.documents.terms, icon: <TextSnippetOutlinedIcon/> },
//      { title: 'Helps', path: PATH_DASHBOARD.documents.helps, icon: <PanToolOutlinedIcon/> },
//     ],
// }
];
export default sidebarCro;
