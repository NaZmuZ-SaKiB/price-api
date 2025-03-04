import Link from "next/link";
import ApiKeyList from "./_components/ApiKeyList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DataSearchBox from "@/components/Shared/DataSearchBox";
import DataSortBySelect from "@/components/Shared/DataSortBySelect";
import DataSortOrderSelect from "@/components/Shared/DataSortOrderSelect";
import DeleteExpiredKeysButton from "./_components/DeleteExpiredKeysButton";

const ApiKeyPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl uppercase font-bold text-slate-700">Api Keys</h1>
        <Link href="/api-key/add">
          <Button className="rounded-none">
            <Plus /> Add New
          </Button>
        </Link>
      </div>
      <DataSearchBox className="mb-4" />
      <div className="mb-4 flex gap-4">
        <DataSortBySelect options={["name", "createdAt", "updatedAt"]} />
        <DataSortOrderSelect />
        <DeleteExpiredKeysButton />
      </div>
      <ApiKeyList />
    </div>
  );
};

export default ApiKeyPage;
