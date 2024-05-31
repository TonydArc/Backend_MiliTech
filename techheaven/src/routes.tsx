import MainDashboard from "views/admin/default"
import ManagementProduct from "views/admin/products";
import ManagemntCustomer from "views/admin/customers";
import SignIn from "views/auth/SignIn";
import SignUp from "views/auth/SignUp";
import ManagementOrder from "views/admin/orders/Order";

// Icon Imports
import {
  MdAllInbox,
  MdLock,
  MdSupervisorAccount,
  MdShoppingCart,
  MdDashboard,
  MdFormatListBulletedAdd,
  MdAccountCircle,
} from "react-icons/md";
import ProfileOverview from "views/admin/profile";
import ManagementCatalog from "views/admin/catalogs";
import Marketplace from "views/admin/marketplace";


const routes = [
  //admin
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Management Products",
    layout: "/admin",
    path: "products",
    icon: <MdAllInbox className="h-6 w-6" />,
    component: <ManagementProduct />,

  },
  {
    name: "Management Catalogs",
    layout: "/admin",
    path: "catalogs",
    icon: <MdFormatListBulletedAdd  className="h-6 w-6" />,
    component: <ManagementCatalog />,

  },
  {
    name: "Management Customers",
    layout: "/admin",
    path: "customers",
    icon: <MdSupervisorAccount className="h-6 w-6" />,
    component: <ManagemntCustomer />,

  },
  {
    name: "Management Orders",
    layout: "/admin",
    path: "orders",
    icon: <MdShoppingCart className="h-6 w-6" />,
    component: <ManagementOrder />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdAccountCircle className="h-6 w-6" />,
    component: <ProfileOverview />,
  },

  //auth
  {
    name: "SignIn",
    layout: "/auth",
    path: "login",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "SignUp",
    layout: "/auth",
    path: "register",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignUp />,
  },
  // { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'auth/login' },
];
export default routes;
