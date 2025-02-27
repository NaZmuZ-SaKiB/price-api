"use client";

import { Button } from "@/components/ui/button";
import { useUrlGetAllQuery } from "@/lib/modules/url/url.query";
import { TUrl } from "@/lib/modules/url/url.type";
import { ScanText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
                <Link href={`/scrape?url=${url.url}`}>
                  <Button
                    className="rounded-none"
                    variant="outline"
                    size="icon"
                  >
                    <ScanText />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlList;
