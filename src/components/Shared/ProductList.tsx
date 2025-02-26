import { TProduct } from "@/lib/modules/product/product.type";
import { formatCurrency } from "@/utils/currencyFormat";
import Image from "next/image";
import Link from "next/link";
import ProductListDoneButton from "./ProductListDoneButton";
import { cn } from "@/lib/utils";

type TProps = {
  products: TProduct[];
  highlight?: boolean;
};

const ProductList = ({ products, highlight = false }: TProps) => {
  return (
    <div>
      <table className="table table-auto primary-table">
        <thead>
          <tr>
            <th className="w-[65px]">Image</th>
            <th className="max-w-xs">Title</th>
            <th>Price</th>
            <th>Status</th>
            <th className="w-[120px]">Last Checked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product._id.toString()}
              className={cn({
                "bg-green-100": highlight && !product.done,
              })}
            >
              <td className="w-[65px]">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={50}
                  height={50}
                  className="object-contain object-center aspect-square"
                />
              </td>
              <td className="max-w-xs">
                <Link href={product.url} className="hover:underline">
                  {product.title}
                </Link>
              </td>
              <td className="text-center">{formatCurrency(product.price)}</td>
              <td className="text-center">{product.status}</td>
              <td className="w-[120px] text-center">
                {new Date(product.lastChecked).toLocaleDateString()}
              </td>
              <td>
                <div className="flex justify-center">
                  <ProductListDoneButton
                    id={product?._id?.toString()}
                    defaultDone={product.done}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
