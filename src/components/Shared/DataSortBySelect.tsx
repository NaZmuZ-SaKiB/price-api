"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TProps = {
  options: string[];
};

const DataSortBySelect = ({ options }: TProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handleChange = (value: string) => {
    params.delete("sortBy");
    params.delete("page");
    params.append("page", "1");
    params.append("sortBy", value);

    router.replace(`${pathName}?${params}`);
  };

  return (
    <Select
      defaultValue={searchParams.get("sortBy") || "createdAt"}
      onValueChange={(value) => handleChange(value)}
    >
      <SelectTrigger className="rounded-none w-[150px] gap-2 border-slate-200">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={`data-sort-by-${option}`}
            value={option}
            className="capitalize"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DataSortBySelect;
