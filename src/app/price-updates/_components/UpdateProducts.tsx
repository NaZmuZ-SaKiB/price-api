"use client";

import DataPagination from "@/components/Shared/DataPagination";
import DataSearchBox from "@/components/Shared/DataSearchBox";
import DataSortBySelect from "@/components/Shared/DataSortBySelect";
import DataSortOrderSelect from "@/components/Shared/DataSortOrderSelect";
import ProductList from "@/components/Shared/ProductList";
import { useProductGetAllQuery } from "@/lib/modules/product/product.query";
import { TProduct } from "@/lib/modules/product/product.type";
import { useSearchParams } from "next/navigation";

const UpdateProducts = () => {
  const searchParams = useSearchParams();

  const { data: productData, isLoading: productLoading } =
    useProductGetAllQuery(`${searchParams.toString()}&done=false`);
  const products: TProduct[] = productData?.data || [];

  if (productLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DataSearchBox className="mb-4" />
      <div className="mb-4 flex gap-4">
        <DataSortBySelect options={["lastModified", "createdAt", "price"]} />
        <DataSortOrderSelect />
      </div>
      <ProductList products={products} />
      <DataPagination
        className="mt-4"
        limit={productData?.meta?.limit}
        page={productData?.meta?.page}
        total={productData?.meta?.total}
      />
    </div>
  );
};

export default UpdateProducts;
