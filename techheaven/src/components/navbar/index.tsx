import Dropdown from "components/dropdown";
import { Link, useNavigate } from "react-router-dom";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import avatar from "assets/img/avatars/avatar4.png";
import { logout } from "services/authService";
import { isLoggedIn } from "services/untils";



const Navbar = (props: {
    onOpenSidenav: () => void;
    brandText: string;
    secondary?: boolean | string;
  },
) => {
  const { onOpenSidenav, brandText } = props;

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (!isLoggedIn) {
      navigate("/auth");
    }
    alert('Logged out successfully');
  };

  return (
    <nav className="sticky top-0 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-3xl">
      {/* brandText */}
      <div className="ml-[6px] flex flex-grow items-center">
        <span
          className="flex mr-2 cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-8 w-8" />
        </span>
        <p className="shrink text-[24px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>
      {/* Profile & Dropdown */}
      <div className="relative mt-[3px] flex items-center justify-end gap-4">
        <div className="flex h-[61px] w-[110px] items-center justify-around gap-2 rounded-full py-2 shadow-shadow-300 dark:!bg-navy-800 dark:shadow-none md:w-[60px] md:flex-grow-0 md:gap-1 xl:w-[70px] xl:gap-2">
          <Dropdown
            button={
              <img
                className="h-10 w-10 rounded-full"
                src={avatar}
                alt="Account"
              />
            }
            children={
              <div className="flex h-24 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                <div className="mt-3 ml-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      {/* Hey, {profile} */}
                    </p>
                  </div>
                </div>
                <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
                <div className="mt-3 ml-4 flex flex-col">
                  <a
                    onClick={handleLogout}
                    href=""
                    className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                  >
                    Log Out
                  </a>
                </div>
              </div>
            }
            classNames={"py-2 top-8 -left-[180px] w-max"}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
