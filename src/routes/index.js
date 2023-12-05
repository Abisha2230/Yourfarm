import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
import CouponManagementDetails from 'src/pages/dashboard/Couponmanagement/CouponDetails';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');
// const data = localStorage.getItem('Role');
  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes(
    [
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },  
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },

    // Dashboard Routes
    {
      path: '/',
      element: (
        <AuthGuard>
          {/* {localStorage.getItem('Role') === 'Dispatch' ?<OrderDetails /> :  */}
          <DashboardLayout /> 
          {/* } */}
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard" replace /> },
        { path: 'dashboard', element: <GeneralApp /> },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/user/profile" replace /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'changepassword', element: <UserChangePassword /> },
            { path: 'account', element: <UserAccount /> }
          ]
        },
        {
          path: 'item',
          children:[
         {element: <ItemManagementDetails />},
            {path:'create',element:<ItemManagementCreate/>},
            {path:'edit/:id/:di_id',element:<ItemManagementEdit/>},
            {path:'preview/:id/:di_id',element:<ItemManagementPreview/>},
          ]
        },
        {
          path: 'coupon',
          children:[
         {element: <CouponDetails />},
            {path:'create',element:<CouponManagementCreate/>},
            {path:'edit/:id',element:<CouponEdit/>},
            {path:'preview/:id',element:<ItemManagementPreview/>},
          ]
        },
        {
          path: 'dairy',
          children:[
         {element: <DairyDetails />},
            {path:'create',element:<DairyCreate/>},
            {path:'edit/:id',element:<DairyEdit/>},
            {path:'preview/:id',element:<ItemManagementPreview/>},
          ]
        },
        {
          path: 'chilling',
          children:[
         {element: <ChillingCenter />},
            {path:'create',element:<ChillingCreate/>},
            {path:'edit/:id',element:<ChillingEdit/>},
            // {path:'preview/:id',element:<ItemManagementPreview/>},
          ]
        },
        {
          path: 'BlogBanner',
          children:[
         {element: <BlogBanner />},
            {path:'create',element:<BlogCreate/>},
            {path:'edit/:id',element:<BlogEdit/>},
            // {path:'preview/:id',element:<ItemManagementPreview/>},
          ]
        },
        {path: 'service',
        children:[
          {element: <ServiceDetails />},
             {path:'create',element:<ServiceCreate/>},
             {path:'edit/:id',element:<ServiceEdit/>},
             {path:'preview/:id',element:<ServicePreview/>},
           ]
        },
        {path: 'shipping',
        children:[
          {element: <ShippingDetails />},
             {path:'create',element:<ShippingCreate/>},
             {path:'edit/:id',element:<ShippingEdit/>},
             {path:'preview/:id',element:<ShippingPreview/>},
           ]
        },
        {path: 'order',
        children:[
          {element: <OrderDetails />},
             {path:'preview/:id',element:<OrderPreview/>},
           ]
        },
        {path: 'listing',
        children:[
          {element: <ListingDetails />},
             {path:'preview/:id',element:<ListingPreview/>},
           ]
        },
        {path: 'category',
        children:[
          {element: <CategoryManagement />},
          {path:'create',element:<CategoryCreate/>},
          {path:'edit/:id',element:<CategoryEdit/>},
          {path:'preview/:id',element:<CategoryPreview/>},
           ]
        },
        {path: 'list',
        children:[
          { element: <Navigate to="/list/reports" replace /> },
          {path: 'reports', element: <ReportsDetails />},
          {path:'users',element:<UserList/>},
          {path:'preview/:id',element:<UserPreview/>},
           ]
        },
        {path: 'setting',
        children: [
          { element: <Navigate to="/setting/language" replace /> },
          { path: 'language', element: <LanguageSetting /> },
          { path: 'email', element: <EmailSetting /> },
        ]
        },
        {path: 'Documents',
        children:[
          { element: <Navigate to="/documents/terms" replace /> },
          { path: 'terms', element: <Terms /> },
          { path: 'helps', element: <Helps /> },
           ]
        },
        // {path: 'Banners',
        // children:[
        //   { element: <Navigate to="/banners/details" replace /> },
        //   { path: 'details', element: <BannersDetails /> },
        //    ]
        // },
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
      
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <Navigate to="/" />,
     
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const BlogBanner = Loadable(lazy(()=> import('src/pages/dashboard/Bannerandblog/BlogBanner')));
const BlogEdit = Loadable(lazy(()=>import('src/pages/dashboard/Bannerandblog/BlogEdit')));
const BlogCreate = Loadable(lazy(()=>import('src/pages/dashboard/Bannerandblog/BlogCreate')));
const ItemManagementDetails = Loadable(lazy(() => import('src/pages/dashboard/Item/ItemManagementDetails')));
const CouponDetails = Loadable(lazy(() => import('src/pages/dashboard/Couponmanagement/CouponDetails')));
const CouponManagementCreate = Loadable(lazy(() => import('src/pages/dashboard/Couponmanagement/CreateCoupon')));
const CouponEdit = Loadable(lazy(() => import('src/pages/dashboard/Couponmanagement/CouponEdit')));
const DairyDetails = Loadable(lazy(() => import('src/pages/dashboard/DiaryInstitute/DairyDetails')));
const DairyCreate = Loadable(lazy(() => import('src/pages/dashboard/DiaryInstitute/DairyCreate')));
const DairyEdit = Loadable(lazy(() => import('src/pages/dashboard/DiaryInstitute/DairyEdit')));
const ChillingCenter = Loadable(lazy(() => import('src/pages/dashboard/ChillingCenter/ChillingCenter')));
const ChillingCreate = Loadable(lazy(() => import('src/pages/dashboard/ChillingCenter/ChillingCreate')));
const ChillingEdit = Loadable(lazy(() => import('src/pages/dashboard/ChillingCenter/ChillingEdit')));
const ItemManagementCreate = Loadable(lazy(() => import('src/pages/dashboard/Item/ItemManagementCreate')));
const ItemManagementEdit = Loadable(lazy(() => import('src/pages/dashboard/Item/ItamManagementEdit')));
const ItemManagementPreview = Loadable(lazy(() => import('src/pages/dashboard/Item/ItemManagementPreview')));
const ServiceDetails = Loadable(lazy(() => import('src/pages/dashboard/Service/ServiceDetails')));
const ServiceCreate = Loadable(lazy(() => import('src/pages/dashboard/Service/ServiceCreate')));
const ServiceEdit = Loadable(lazy(() => import('src/pages/dashboard/Service/ServiceEdit')));
const ServicePreview = Loadable(lazy(() => import('src/pages/dashboard/Service/ServicePreview')));
const ShippingDetails = Loadable(lazy(() => import('src/pages/dashboard/Shipping/ShippingDetails')));
const ShippingCreate = Loadable(lazy(() => import('src/pages/dashboard/Shipping/ShippingCreate')));
const ShippingEdit = Loadable(lazy(() => import('src/pages/dashboard/Shipping/ShippingEdit')));
const ShippingPreview = Loadable(lazy(() => import('src/pages/dashboard/Shipping/ShippingPreview')));
const  OrderDetails = Loadable(lazy(() => import('src/pages/dashboard/ordermanagement/OrderDetails')));
const  OrderPreview = Loadable(lazy(() => import('src/pages/dashboard/ordermanagement/OrderPreview')));
const CategoryManagement=Loadable(lazy(() => import('src/pages/dashboard/Category/CategoryManagement')));
const CategoryCreate=Loadable(lazy(() => import('src/pages/dashboard/Category/CategoryCreate')));
const CategoryEdit=Loadable(lazy(() => import('src/pages/dashboard/Category/CategoryEdit')));
const CategoryPreview=Loadable(lazy(() => import('src/pages/dashboard/Category/CategoryPreview')));
const ReportsDetails=Loadable(lazy(() => import('src/pages/dashboard/Reports/ReportsDetails')));
const UserList=Loadable(lazy(() => import('src/pages/dashboard/Reports/UserList')));
const UserPreview=Loadable(lazy(() => import('src/pages/dashboard/Reports/UserPreview')));
const LanguageSetting=Loadable(lazy(() => import('src/pages/dashboard/Setting/LanguageSetting')));
const EmailSetting=Loadable(lazy(() => import('src/pages/dashboard/Setting/EmailSetting')));
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/User/UserProfile')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/User/UserAccount')));
const UserChangePassword = Loadable(lazy(() => import('../pages/dashboard/User/UserChangePassword')));
const Terms = Loadable(lazy(() => import('../pages/dashboard/Documents/Terms')));
const Helps = Loadable(lazy(() => import('../pages/dashboard/Documents/Helps')));
const BannersDetails = Loadable(lazy(() => import('../pages/dashboard/Banner/BannersDetails')));
const ListingDetails = Loadable(lazy(()=>import('src/pages/dashboard/ListingManagement/ListingDetails')));
const ListingPreview = Loadable(lazy(()=>import('src/pages/dashboard/ListingManagement/ListingPreview')));
// Main


const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));

const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

