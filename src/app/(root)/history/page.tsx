import DataSearchBox from "@/components/Shared/DataSearchBox";
import DataSortBySelect from "@/components/Shared/DataSortBySelect";
import DataSortOrderSelect from "@/components/Shared/DataSortOrderSelect";
import HistoryList from "./_components/HistoryList";
import ClearHistoryButton from "./_components/ClearHistoryButton";
import { isTokenValidAction } from "@/lib/modules/auth/auth.action";

const HistoryPage = async () => {
  const data = await isTokenValidAction();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl uppercase font-bold text-slate-700">History</h1>
        {data?.access === "admin" && <ClearHistoryButton />}
      </div>

      <DataSearchBox className="mb-4" />
      <div className="mb-4 flex gap-4">
        <DataSortBySelect options={["createdAt", "updatedAt"]} />
        <DataSortOrderSelect />
      </div>
      <HistoryList />
    </div>
  );
};

export default HistoryPage;
