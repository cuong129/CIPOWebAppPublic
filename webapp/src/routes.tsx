// import
import Dashboard from 'views/Dashboard/Dashboard';
// import Tables from 'views/Dashboard/Tables';
// import Billing from 'views/Dashboard/Billing';
// import Profile from 'views/Dashboard/Profile';
import { SignIn, SignUp } from 'views/Auth';

//import LossGainFirm from 'views/Dashboard/LossGainFirm';

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from 'components/Icons/Icons';

var dashRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: '/admin',
  },
  //   {
  //     path: '/tables',
  //     name: 'Tables',
  //     icon: <StatsIcon color='inherit' />,
  //     component: Tables,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/billing',
  //     name: 'Billing',
  //     icon: <CreditIcon color='inherit' />,
  //     component: Billing,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/ls_firm',
  //     name: 'Loss/Gain Firm',
  //     icon: <HomeIcon color='inherit' />,
  //     component: LossGainFirm,
  //     layout: '/admin',
  //   },
  {
    name: 'ACCOUNT PAGES',
    category: 'account',
    state: 'pageCollapse',
    views: [
      //   {
      //     path: '/profile',
      //     name: 'Profile',
      //     icon: <PersonIcon color='inherit' />,
      //     secondaryNavbar: true,
      //     component: Profile,
      //     layout: '/admin',
      //   },
      {
        path: '/signin',
        name: 'Sign In',
        icon: <DocumentIcon color='inherit' />,
        component: SignIn,
        layout: '/auth',
      },
      {
        path: '/signup',
        name: 'Sign Up',
        icon: <RocketIcon color='inherit' />,
        secondaryNavbar: true,
        component: SignUp,
        layout: '/auth',
      },
    ],
  },
];
export default dashRoutes;
