"use client";

import { useProductGetUpdateCountQuery } from "@/lib/modules/product/product.query";

const PriceUpdatesLink = () => {
  const { data, isLoading } = useProductGetUpdateCountQuery();

  if (isLoading) {
    return <span>Price Updates</span>;
  }
  return (
    <span>
      Price Updates
      {data?.data?.count ? ` (${data?.data?.count})` : ""}
    </span>
  );
};

export default PriceUpdatesLink;
