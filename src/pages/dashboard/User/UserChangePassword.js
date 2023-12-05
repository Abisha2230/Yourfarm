
// material
import { Container} from '@mui/material';

// utils

import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import {AccountChangePassword} from "../../../components/_dashboard/user/account";
// ----------------------------------------------------------------------

 const UserChangePassword =()=>{
    const { themeStretch } = useSettings();
  return (
    <Page title="User: Change Password | Animeta">
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading="Profile"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'User', href: PATH_DASHBOARD.user.profile },
          { name: "Change Password" }
        ]}
      />
   <AccountChangePassword/>
    </Container>
    </Page>
  );
}
export default UserChangePassword;