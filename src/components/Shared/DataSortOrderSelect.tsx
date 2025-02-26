"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DataSortOrderSelect = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handleChange = (value: string) => {
    params.delete("sortOrder");
    params.delete("page");
    params.append("page", "1");
    params.append("sortOrder", value);

    router.replace(`${pathName}?${params}`);
  };
  return (
    <Select
      defaultValue={searchParams?.get("sortOrder") || "desc"}
      onValueChange={(value) => handleChange(value)}
    >
      <SelectTrigger className="rounded-none w-[90px] gap-2 border-slate-200">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={"asc"}>Asc</SelectItem>
        <SelectItem value={"desc"}>Desc</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DataSortOrderSelect;
