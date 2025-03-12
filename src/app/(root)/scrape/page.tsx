/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import UrlInputBox from "./_components/UrlInputBox";
import Image from "next/image";
import { TProduct } from "@/lib/modules/product/product.type";
import { formatCurrency } from "@/utils/currencyFormat";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { toast } from "sonner";

const ScrapePage = () => {
  const [data, setData] = useState<Record<string, any> | null>(null);

  const allRef = useRef<HTMLTableElement>(null);
  const newRef = useRef<HTMLTableElement>(null);
  const updateRef = useRef<HTMLTableElement>(null);

  const printTable = (table: HTMLTableElement, heading: string) => {
    // Open a new window
    const printWindow = window.open("", "", "height=600,width=600");
    if (!printWindow) {
      console.error("Failed to open print window.");
      toast.error("Failed to open print window.");
      return;
    }

    // Create a new document structure
    const doc = printWindow.document;
    doc.open();
    doc.write(`
        <html>
            <head>
                <title>Print Table</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #000;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    img {
                        max-width: 50px;
                        height: 50px;
                    }
                    h1 {
                        text-align: center;
                        font-size: 24px;
                        margin-bottom: 2rem;
                    }
                </style>
            </head>
            <body>
                <h1>${heading}</h1>
                ${table.outerHTML}
            </body>
        </html>
    `);
    doc.close();

    // Wait for all images to load before printing
    const images = printWindow.document.querySelectorAll("img");
    let imagesToLoad = images.length;

    if (imagesToLoad === 0) {
      // If there are no images, print immediately
      printWindow.print();
    } else {
      // Wait for all images to load
      images.forEach((img) => {
        img.onload = () => {
          imagesToLoad--;
          if (imagesToLoad === 0) {
            // All images are loaded, print the document
            printWindow.print();
          }
        };
        img.onerror = () => {
          imagesToLoad--;
          if (imagesToLoad === 0) {
            // All images are loaded (or failed), print the document
            printWindow.print();
          }
        };
      });
    }
  };

  return (
    <div>
      <UrlInputBox setResult={setData} />

      {data && (
        <>
          <Tabs defaultValue="all" className="mt-4">
            <TabsList className="bg-transparent !h-auto rounded-none px-0 py-0">
              <TabsTrigger
                disabled
                value="total"
                className="disabled:opacity-100 bg-slate-100 data-[state=active]:shadow-none data-[state=active]:bg-slate-300 rounded-none py-1.5"
              >
                Total Pages : {data?.totalPages}
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="bg-slate-100 data-[state=active]:shadow-none data-[state=active]:bg-slate-300 rounded-none py-1.5"
              >
                Total Found : {data?.products?.length}
              </TabsTrigger>
              <TabsTrigger
                value="new"
                className="bg-slate-100 data-[state=active]:shadow-none data-[state=active]:bg-slate-300 rounded-none py-1.5"
              >
                New Added : {data?.newProducts}
              </TabsTrigger>
              <TabsTrigger
                value="update"
                className="bg-slate-100 data-[state=active]:shadow-none data-[state=active]:bg-slate-300 rounded-none py-1.5"
              >
                Price Updates : {data?.updatedProducts}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="mt-4">
                <Button
                  type="button"
                  size="sm"
                  disabled={!data?.products?.length}
                  className="rounded-none bg-sky-500 hover:bg-sky-600"
                  onClick={() =>
                    printTable(
                      allRef.current!,
                      `${
                        data?.products.length
                      } All Products - ${new Date().toLocaleDateString()}`
                    )
                  }
                >
                  <Printer /> Print All Products
                </Button>
              </div>
              <table
                className="table table-auto primary-table mt-4"
                ref={allRef}
              >
                <thead>
                  <tr>
                    <th>Img</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products.map(
                    (product: TProduct & { scrapeStatus: string }) => (
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
                        <td>{product?.scrapeStatus}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="new">
              <div className="mt-4">
                <Button
                  type="button"
                  size="sm"
                  disabled={!data?.newProducts}
                  className="rounded-none bg-sky-500 hover:bg-sky-600"
                  onClick={() =>
                    printTable(
                      newRef.current!,
                      `${
                        data?.newProducts
                      } New Products - ${new Date().toLocaleDateString()}`
                    )
                  }
                >
                  <Printer /> Print New Products
                </Button>
              </div>
              <table
                className="table table-auto primary-table mt-4"
                ref={newRef}
              >
                <thead>
                  <tr>
                    <th>Img</th>
                    <th>Title</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products
                    .filter(
                      (product: TProduct & { scrapeStatus: string }) =>
                        product.scrapeStatus === "new"
                    )
                    .map((product: TProduct) => (
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
            </TabsContent>

            <TabsContent value="update">
              <div className="mt-4">
                <Button
                  type="button"
                  size="sm"
                  disabled={!data?.updatedProducts}
                  className="rounded-none bg-sky-500 hover:bg-sky-600"
                  onClick={() =>
                    printTable(
                      updateRef.current!,
                      `${
                        data?.updatedProducts
                      } Updated Products - ${new Date().toLocaleDateString()}`
                    )
                  }
                >
                  <Printer /> Print Updated Products
                </Button>
              </div>
              <table
                className="table table-auto primary-table mt-4"
                ref={updateRef}
              >
                <thead>
                  <tr>
                    <th>Img</th>
                    <th>Title</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products
                    .filter(
                      (product: TProduct & { scrapeStatus: string }) =>
                        product.scrapeStatus === "updated"
                    )
                    .map((product: TProduct) => (
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
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default ScrapePage;
