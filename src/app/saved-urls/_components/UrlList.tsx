"use client";

import { Button } from "@/components/ui/button";
import { useUrlGetAllQuery } from "@/lib/modules/url/url.query";
import { TUrl } from "@/lib/modules/url/url.type";
import { ScanText, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import UrlDeleteButton from "./UrlDeleteButton";

const UrlList = () => {
  const searchParams = useSearchParams();

  const { data: urlData, isLoading: urlsLoading } = useUrlGetAllQuery(
    searchParams.toString()
  );
  const urls: TUrl[] = urlData?.data || [];

  if (urlsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <table className="table table-auto primary-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Link</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id.toString()}>
              <td>{url.name}</td>
              <td>
                <Link href={url.url}>{url.url}</Link>
              </td>
              <td>
                <div className="flex items-center justify-center gap-2">
                  <Link href={`/scrape?url=${encodeURIComponent(url.url)}`}>
                    <Button
                      className="rounded-none"
                      variant="outline"
                      size="icon"
                    >
                      <ScanText />
                    </Button>
                  </Link>

                  <UrlDeleteButton id={url._id?.toString()}>
                    <Button
                      className="rounded-none text-red-500 hover:text-red-500"
                      variant="outline"
                      size="icon"
                    >
                      <Trash2 />
                    </Button>
                  </UrlDeleteButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlList;
