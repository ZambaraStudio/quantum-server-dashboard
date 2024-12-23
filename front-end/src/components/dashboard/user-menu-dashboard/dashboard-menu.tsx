import UserDashboardMenuItem from "./dashboard-menu-item";

import { useContext } from "react";
import { AuthContext } from "../../../context/authentication-context";


interface DashboardMenuProps {}


export default function DashboardMenu({}: DashboardMenuProps): JSX.Element {

  const { user, login, logout, sessionCheckStatus } = useContext(AuthContext);








  return (
    <div className="flex min-h-screen bg-gray-100 font-sans w-max" >
    {/* Sidebar / Menu */}
    <aside style={{backgroundColor:"#15549A"}} className="w-64 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <nav className="mt-10">
        {/* <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Home
        </a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Analytics
        </a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Users
        </a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Settings
        </a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Logout
        </a> */}
        {/* <UserDashboardMenuItem
          // iconClassName={classes.pinIcon}
          // selectedIconClassName={classes.selectedPinIcon}
          link="/dashboard"
          tranlsationKey="test1"
        /> */}
        {/* <UserDashboardMenuItem
          // iconClassName={classes.pinIcon}
          // selectedIconClassName={classes.selectedPinIcon}
          link="/dashboard/instance"
          tranlsationKey="instance"
        /> */}
        <UserDashboardMenuItem
          // iconClassName={classes.pinIcon}
          // selectedIconClassName={classes.selectedPinIcon}
          link="/dashboard/file-upload"
          tranlsationKey="File"
        />
        <UserDashboardMenuItem
          // iconClassName={classes.pinIcon}
          // selectedIconClassName={classes.selectedPinIcon}
          link="/dashboard/game-instance"
          tranlsationKey="Game Instance"
        />
      </nav>
    </aside>

    {/* Main Content */}
    {/* <main className="flex-1 p-10 text-gray-900">
      <h2 className="text-3xl font-bold mb-6">Dashboard Content</h2>
      
    </main> */}
  </div>
  );
}




// <div style={{ marginTop: "10px" }}>
//         <UserDashboardMenuItem
//           // iconClassName={classes.pinIcon}
//           // selectedIconClassName={classes.selectedPinIcon}
//           link="/dashboard"
//           tranlsationKey="adminMenu.main"
//         />
//         <UserDashboardMenuItem
//           // iconClassName={classes.pinIcon}
//           // selectedIconClassName={classes.selectedPinIcon}
//           link="/dashboard/categories"
//           tranlsationKey="adminMenu.categories"
//         />
//         <UserDashboardMenuItem
//           // iconClassName={classes.pinIcon}
//           // selectedIconClassName={classes.selectedPinIcon}
//           link="/dashboard/posts"
//           tranlsationKey="adminMenu.posts"
//         />
//         <UserDashboardMenuItem
//           // iconClassName={classes.pinIcon}
//           // selectedIconClassName={classes.selectedPinIcon}
//           link="/dashboard/contact-forms"
//           tranlsationKey="adminMenu.contactForms"
//         />

//         <div
//           onClick={logout}
//         >
//           {/* <div
// 					 className={classes.logoutIcon} 
// 					 /> */}
//           <div >
//             Sign Out
//           </div>
//         </div>
//       </div>
