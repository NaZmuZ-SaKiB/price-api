"use client";

import { Button } from "@/components/ui/button";
import { useTokenGetAllQuery } from "@/lib/modules/token/token.query";
import { TToken } from "@/lib/modules/token/token.type";
import { Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ApiKeyDeleteButton from "./ApiKeyDeleteButton";
import DataPagination from "@/components/Shared/DataPagination";

const ApiKeyList = () => {
  const [viewToken, setViewToken] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const { data: apiKeyData, isLoading: apiKeyLoading } = useTokenGetAllQuery(
    searchParams.toString()
  );
  const apiKeys: TToken[] = apiKeyData?.data || [];

  if (apiKeyLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <table className="table table-auto primary-table">
        <thead>
          <tr>
            <th className="w-[200px]">Key</th>
            <th>Name</th>
            <th>Access</th>
            <th>Exp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((apiKey) => {
            const isExpired =
              new Date(apiKey.exp) < new Date() && apiKey.access !== "admin";
            return (
              <tr
                key={apiKey._id}
                className={isExpired ? "opacity-50 bg-slate-50" : ""}
              >
                <td className="w-[200px]">
                  <div className="flex items-center justify-between">
                    <span>{viewToken ? apiKey.token : "********"}</span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => setViewToken((prev) => !prev)}
                    >
                      {viewToken ? (
                        <EyeOff className="w-4" />
                      ) : (
                        <Eye className="w-4" />
                      )}
                    </Button>
                  </div>
                </td>
                <td>{apiKey.name}</td>
                <td>{apiKey.access}</td>
                <td>{new Date(apiKey.exp).toLocaleDateString()}</td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer rounded-none"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKey.token);
                        toast.message("Copied to clipboard.");
                      }}
                    >
                      <Copy className="w-4" />
                    </Button>

                    <ApiKeyDeleteButton id={apiKey._id?.toString()}>
                      <Button
                        className="rounded-none text-red-500 hover:text-red-500"
                        variant="outline"
                        size="icon"
                      >
                        <Trash2 />
                      </Button>
                    </ApiKeyDeleteButton>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <DataPagination
        className="mt-4"
        limit={apiKeyData?.meta?.limit}
        page={apiKeyData?.meta?.page}
        total={apiKeyData?.meta?.total}
      />
    </div>
  );
};

export default ApiKeyList;
