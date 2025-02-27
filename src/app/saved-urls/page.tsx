import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import UrlList from "./_components/UrlList";
import DataSearchBox from "@/components/Shared/DataSearchBox";
import DataSortBySelect from "@/components/Shared/DataSortBySelect";
import DataSortOrderSelect from "@/components/Shared/DataSortOrderSelect";

const SavedUrlsPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-slate-700">Saved URLs</h1>
        <Link href="/saved-urls/add">
          <Button className="rounded-none">
            <Plus /> Add New
          </Button>
        </Link>
      </div>
      <DataSearchBox className="mb-4" />
      <div className="mb-4 flex gap-4">
        <DataSortBySelect options={["name", "createdAt", "updatedAt"]} />
        <DataSortOrderSelect />
      </div>
      <UrlList />
    </div>
  );
};

export default SavedUrlsPage;
