import Link from "next/link";
import ApiKeyList from "./_components/ApiKeyList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
      <ApiKeyList />
    </div>
  );
};

export default ApiKeyPage;
