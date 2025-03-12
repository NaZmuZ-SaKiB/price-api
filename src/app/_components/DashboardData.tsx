"use client";

import { useDashboardQuery } from "@/lib/modules/token/token.query";
import Link from "next/link";
import Loading from "../(root)/loading";

type TDashboardData = {
  totalTokens: number;
  totalExpiredTokens: number;
  totalProducts: number;
  priceUpdates: number;
  savedUrls: number;
  history: number;
};

const DashboardData = () => {
  const { data: dashboardData, isLoading: dashboardLoading } =
    useDashboardQuery();
  const dashboard: TDashboardData = dashboardData?.data;

  if (dashboardLoading) return <Loading />;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <Link
          href="/products?sortBy=lastModified&limit=50&sortOrder=desc"
          className="bg-white p-4 border hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold mb-4">Total Products</h2>
          <p className="text-4xl font-semibold">{dashboard.totalProducts}</p>
        </Link>
        <Link
          href="/price-updates?sortBy=lastModified&limit=50&sortOrder=desc"
          className="bg-white p-4 border hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold mb-4">Price Updates</h2>
          <p className="text-4xl font-semibold">{dashboard.priceUpdates}</p>
        </Link>
        <Link
          href="/saved-urls"
          className="bg-white p-4 border hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold mb-4">Saved URLs</h2>
          <p className="text-4xl font-semibold">{dashboard.savedUrls}</p>
        </Link>
        <Link href="/history" className="bg-white p-4 border hover:bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">History</h2>
          <p className="text-4xl font-semibold">{dashboard.history}</p>
        </Link>
        <Link href="/api-key" className="bg-white p-4 border hover:bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Api Keys</h2>
          <p className="text-4xl font-semibold">{dashboard.totalTokens}</p>
        </Link>
        <Link href="/api-key" className="bg-white p-4 border hover:bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Expired Tokens</h2>
          <p className="text-4xl font-semibold">
            {dashboard.totalExpiredTokens}
          </p>
        </Link>
      </div>
      <Link
        href="/scrape"
        className="bg-white text-center block p-7 border mt-4 hover:bg-gray-50"
      >
        <h2 className="text-lg font-semibold">Scrape</h2>
      </Link>
    </div>
  );
};

export default DashboardData;
