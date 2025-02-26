"use client";

import { Button } from "@/components/ui/button";
import { useTokenGetAllQuery } from "@/lib/modules/token/token.query";
import { TToken } from "@/lib/modules/token/token.type";
import { Copy, Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
          {apiKeys.map((apiKey) => (
            <tr key={apiKey._id}>
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
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(apiKey.token);
                    toast.message("Copied to clipboard.");
                  }}
                >
                  <Copy className="w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiKeyList;
