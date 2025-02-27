import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

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
    </div>
  );
};

export default SavedUrlsPage;
