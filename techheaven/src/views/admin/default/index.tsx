// import MiniCalendar from "components/calendar/MiniCalendar";
// import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
// import TotalSpent from "views/admin/default/components/TotalSpent";
// import PieChartCard from "views/admin/default/components/PieChartCard";
// import { MdDiversity3, MdDashboard } from "react-icons/md";
// import DailyTraffic from "views/admin/default/components/DailyTraffic";
// import TaskCard from "views/admin/default/components/TaskCard";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import tableDataCheck from "./variables/tableDataCheck";
import tableDataComplex from "./variables/tableDataComplex";
import { MdAllInbox, MdAssuredWorkload, MdOutlineSupervisorAccount } from "react-icons/md";

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdAllInbox className="h-7 w-7" />}
          title={"New Order"}
          subtitle={"3020"}
        />
        <Widget
          icon={<MdAssuredWorkload className="h-6 w-6" />}
          title={"Total Sale"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<MdOutlineSupervisorAccount className="h-7 w-7" />}
          title={"Users"}
          subtitle={"231"}
        />
      </div>

      {/* product selling */}

      <div className="mt-5">
        <CheckTable tableData={tableDataCheck} />
      </div>
    </div>
  );
};

export default Dashboard;
