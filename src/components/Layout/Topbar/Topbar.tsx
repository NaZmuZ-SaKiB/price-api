import { SidebarTrigger } from "../../ui/sidebar";
import Account from "./Account";

const Topbar = () => {
  return (
    <div className="border-b bg-transparent">
      <div className="max-w-screen-2xl mx-auto py-1 flex justify-between items-center">
        <SidebarTrigger className="size-8" />
        <Account />
      </div>
    </div>
  );
};

export default Topbar;
