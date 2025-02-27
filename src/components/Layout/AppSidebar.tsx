import {
  DollarSign,
  Key,
  LayoutDashboard,
  ScanText,
  ShoppingBag,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: () => <LayoutDashboard />,
  },

  {
    title: "Products",
    url: "/products?sortBy=lastModified&limit=50&sortOrder=desc",
    icon: () => <ShoppingBag />,
  },
  {
    title: "Price Updates",
    url: "/price-updates?sortBy=lastModified&limit=50&sortOrder=desc",
    icon: () => <DollarSign />,
  },
  {
    title: "Scrape",
    url: "/scrape",
    icon: () => <ScanText />,
  },
  {
    title: "Api Key",
    url: "/api-key",
    icon: () => <Key />,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-900 text-xl font-bold uppercase mb-2">
            Price Api
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
