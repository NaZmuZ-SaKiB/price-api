"use client";

import DataPagination from "@/components/Shared/DataPagination";
import { useHistoryGetAllQuery } from "@/lib/modules/history/history.query";
import { THistory } from "@/lib/modules/history/history.type";
import formatDate from "@/utils/formatDate";
import formatTime12HrFormat from "@/utils/formatTime12Hr";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Loading from "../../loading";

const HistoryList = () => {
  const searchParams = useSearchParams();
  const { data: historyData, isLoading } = useHistoryGetAllQuery(
    searchParams.toString()
  );
  const history: THistory[] = historyData?.data || [];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <table className="table table-auto primary-table">
        <thead>
          <tr>
            <th>URL</th>
            <th>Time</th>
            <th>Total</th>
            <th>New</th>
            <th>Updates</th>
            <th>Scraped By</th>
          </tr>
        </thead>
        <tbody>
          {history.map((history) => (
            <tr key={history._id.toString()}>
              <td>
                <Link
                  className="text-sky-600 hover:underline"
                  href={history.url}
                >
                  {history.url}
                </Link>
              </td>
              <td className="text-center">
                {formatDate(history.createdAt)} at{" "}
                {formatTime12HrFormat(history.createdAt)}
              </td>
              <td className="text-center">
                {history.totalProducts} items in {history.totalPages} pages
              </td>
              <th className="text-center">{history.newProducts}</th>
              <th className="text-center">{history.updatedProducts}</th>
              <td className="text-center">{history.scrapedBy.name}</td>
            </tr>
          ))}
          {history.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center text-2xl !py-5 font-semibold"
              >
                No History
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <DataPagination
        className="mt-4"
        limit={historyData?.meta?.limit}
        page={historyData?.meta?.page}
        total={historyData?.meta?.total}
      />
    </div>
  );
};

export default HistoryList;
