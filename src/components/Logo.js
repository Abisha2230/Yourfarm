import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';
import Logoimg from './logo/logo2.png';
import Logoimg2 from './logo/minilogo.png';
// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({cols, sx }) {

  return (
    <Box sx={{width:"100px"}}>
   {cols ? <Box sx={{pt:"13px",pb:"20px",px:"20px"}}><img alt={Logoimg2} src={Logoimg2} width="100px" height='auto'/></Box>:<img alt={Logoimg} src={Logoimg} width="100%" height="100%"/>} 
    </Box>
  );
}
