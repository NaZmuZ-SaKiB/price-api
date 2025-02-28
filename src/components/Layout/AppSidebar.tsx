"use client";

import {
  DollarSign,
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
} from "../ui/sidebar";
import Link from "next/link";
import { useProductGetUpdateCountQuery } from "@/lib/modules/product/product.query";

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
    title: "Saved Urls",
    url: "/saved-urls",
    icon: () => <LinkIcon />,
  },
  {
    title: "Api Key",
    url: "/api-key",
    icon: () => <Key />,
  },
];

const AppSidebar = () => {
  const { data, isLoading } = useProductGetUpdateCountQuery();

  if (isLoading) {
    return null;
  }

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
                const count = data?.data?.count;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>
                          {item.title}{" "}
                          {item.title === "Price Updates"
                            ? count > 0 && `(${count})`
                            : ""}
                        </span>
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
