// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,

  settings: {
    appconfig: path(ROOTS_DASHBOARD, '/settings/app-config')
  },
  general: {
    app: path(ROOTS_DASHBOARD, '/dashboard'),

  },
  item: {
    root: path(ROOTS_DASHBOARD, '/item'),
    create: path(ROOTS_DASHBOARD, '/item/create'),
    edit: path(ROOTS_DASHBOARD, '/item/edit'),
    preview: path(ROOTS_DASHBOARD, '/item/preview'),
  },
  coupon:{
  root:path(ROOTS_DASHBOARD, '/coupon'),
  create:path(ROOTS_DASHBOARD, '/coupon/create'),
  edit: path(ROOTS_DASHBOARD, '/coupon/edit'),
  },
  chilling:{
    root:path(ROOTS_DASHBOARD, '/chilling'),
    create:path(ROOTS_DASHBOARD, '/chilling/create'),
    edit: path(ROOTS_DASHBOARD, '/chilling/edit'),
    },
  dairy:{
    root:path(ROOTS_DASHBOARD, '/dairy'),
    create:path(ROOTS_DASHBOARD, '/dairy/create'),
    edit: path(ROOTS_DASHBOARD, '/dairy/edit'),
  },
  BlogBanner: {
    root: path(ROOTS_DASHBOARD, '/BlogBanner'),
    create: path(ROOTS_DASHBOARD, '/BlogBanner/create'),
    edit: path(ROOTS_DASHBOARD, '/BlogBanner/edit'),
    // preview: path(ROOTS_DASHBOARD, '/item/preview'),
  },
  service: {
    root: path(ROOTS_DASHBOARD, '/service'),
    create: path(ROOTS_DASHBOARD, '/service/create'),
    edit: path(ROOTS_DASHBOARD, '/service/edit'),
    preview:path(ROOTS_DASHBOARD,'/service/preview'),
  },
  shipping: {
    root: path(ROOTS_DASHBOARD, '/Shipping'),
    create: path(ROOTS_DASHBOARD, '/Shipping/create'),
    edit: path(ROOTS_DASHBOARD, '/Shipping/edit'),
    preview:path(ROOTS_DASHBOARD,'/Shipping/preview'),
  },
  order: {
    root: path(ROOTS_DASHBOARD, '/order'),
    preview:path(ROOTS_DASHBOARD,'/order/preview'),
   // edit:path(ROOTS_DASHBOARD,'/order/edit'),
  },
  listing:{
    root: path(ROOTS_DASHBOARD,'/listing'),
    preview:path(ROOTS_DASHBOARD,'/listing/preview'),
  },
  category: {
    root: path(ROOTS_DASHBOARD, '/category'),
    create: path(ROOTS_DASHBOARD, '/category/create'),
    edit: path(ROOTS_DASHBOARD, '/category/edit'),
    preview: path(ROOTS_DASHBOARD, '/category/preview'),
  },
  list:{
    root: path(ROOTS_DASHBOARD, '/list'),
    reports : path(ROOTS_DASHBOARD, '/list/reports'),
    users: path(ROOTS_DASHBOARD, '/list/users'),
    preview: path(ROOTS_DASHBOARD, '/list/preview'),
  },
  setting:{
    root: path(ROOTS_DASHBOARD, '/setting'),
    language: path(ROOTS_DASHBOARD, '/setting/language'),
    email: path(ROOTS_DASHBOARD, '/setting/email'),
  },
  // documents:{
  //   root: path(ROOTS_DASHBOARD, '/documents'),
  //   terms: path(ROOTS_DASHBOARD, '/documents/terms'),
  //   helps:path(ROOTS_DASHBOARD, '/documents/helps'),
  // },
  // banners:{
  //   root: path(ROOTS_DASHBOARD, '/banners'),
  //   details: path(ROOTS_DASHBOARD, '/banners/details'),
  // },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    changepassword: path(ROOTS_DASHBOARD, '/user/changepassword'),
    //account: path(ROOTS_DASHBOARD, '/user/account')
  },
 
};

//export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
