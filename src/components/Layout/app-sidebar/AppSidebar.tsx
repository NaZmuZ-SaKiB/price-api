import {
  DollarSign,
  History,
  Key,
  LayoutDashboard,
  LinkIcon,
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
} from "../../ui/sidebar";
import Link from "next/link";
import PriceUpdatesLink from "./PriceUpdatesLink";
import { isTokenValidAction } from "@/lib/modules/auth/auth.action";

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
    text: () => <PriceUpdatesLink />,
  },
  {
    title: "Scrape",
    url: "/scrape",
    icon: () => <ScanText />,
  },
  {
    title: "Saved Urls",
    url: "/saved-urls",
    icon: () => <LinkIcon />,
  },
  {
    title: "History",
    url: "/history",
    icon: () => <History />,
  },
  {
    title: "Api Key",
    url: "/api-key",
    icon: () => <Key />,
    admin: true,
  },
];

const AppSidebar = async () => {
  const data = await isTokenValidAction();

  return (
    <Sidebar>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-900 text-xl font-bold uppercase mb-2">
            <Link href="/">Price Api</Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.admin && data?.access !== "admin") {
                  return null;
                }
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        {item.text ? <item.text /> : <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
