/* eslint-disable */

import { HiX } from "react-icons/hi";

import routes from "routes";
import Links from "./componentsrtl/Links";
import { MdNavigateBefore, MdNavigateNext, MdNextPlan } from "react-icons/md";

const adminRoutes = routes.filter(route => route.layout === "/admin");



const Sidebar = (props: {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  const { open, onClose } = props;
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? "translate-x-0" : "-translate-x-96"
        }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <MdNavigateBefore className="w-8 h-8"/>
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className=" text-blue-600 mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase dark:text-white">
          TechHeaven
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
