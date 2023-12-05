
// material

import {Container } from '@mui/material';


// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { AccountProfile } from 'src/components/_dashboard/user/account';
// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function UserProfile() {
  const { themeStretch } = useSettings();
  
  return (
    <Page title="User: Profile | Animeta">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User Profile' },

          ]}
        />
       <AccountProfile/>

      </Container>
    </Page>
  );
}
