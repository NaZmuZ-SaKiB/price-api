// "use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import QueryProvider from "./QueryProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <SidebarProvider>{children}</SidebarProvider>;
    </QueryProvider>
  );
};

export default Providers;
