
// material
import { Container,Stack } from '@mui/material';

import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  AccountGeneral,
} from '../../../components/_dashboard/user/account';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();


 
  return (
    <Page title="User: Account Settings | Animeta">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Account"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.profile },
            { name: 'Account Settings' }
          ]}
        />

        <Stack spacing={5}>
        <AccountGeneral />
        </Stack>
      </Container>
    </Page>
  );
}
