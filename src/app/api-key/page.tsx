import Link from "next/link";
import ApiKeyList from "./_components/ApiKeyList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ApiKeyPage = () => {
  return (
    <div>
      <div className="flex justify-end mb-4">
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
