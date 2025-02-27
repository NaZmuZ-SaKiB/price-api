/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import UrlInputBox from "./_components/UrlInputBox";
import Image from "next/image";
import { TProduct } from "@/lib/modules/product/product.type";
import { formatCurrency } from "@/utils/currencyFormat";
import Link from "next/link";

const ScrapePage = () => {
  const [data, setData] = useState<Record<string, any> | null>(null);

  return (
    <div>
      <UrlInputBox setResult={setData} />

      {data && (
        <div className="mt-4">
          {/* Details  */}
          <div className="flex items-center gap-4 flex-wrap border py-3 px-4 text-sm">
            <div>
              <span className="font-semibold">Total Products: </span>
              <span>{data?.totalProducts},</span>
            </div>
            <div>
              <span className="font-semibold">Total Pages: </span>
              <span>{data?.totalPages},</span>
            </div>
            <div>
              <span className="font-semibold">New Products: </span>
              <span>{data?.newProducts},</span>
            </div>
            <div>
              <span className="font-semibold">Price Updates: </span>
              <span>{data?.updatedProducts}</span>
            </div>
          </div>

          {/* Products */}
          <table className="table table-auto primary-table mt-4">
            <thead>
              <tr>
                <th>Img</th>
                <th>Title</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {data?.products.map((product: TProduct) => (
                <tr key={product.url}>
                  <td>
                    <Image
                      height={50}
                      width={50}
                      className="object-contain object-center aspect-square"
                      src={product.image}
                      alt={product.title}
                    />
                  </td>
                  <td>
                    <Link href={product.url} className="hover:underline">
                      {product.title}
                    </Link>
                  </td>
                  <td>{formatCurrency(product.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ScrapePage;
