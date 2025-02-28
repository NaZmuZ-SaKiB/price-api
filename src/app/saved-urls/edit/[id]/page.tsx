"use client";

import { useUrlGetByIdQuery } from "@/lib/modules/url/url.query";
import { TUrl } from "@/lib/modules/url/url.type";
import { useParams } from "next/navigation";
import UrlUpdateForm from "../../_components/UrlUpdateForm";

const EditUrlPage = () => {
  const params = useParams();

  const { data: urlData, isLoading: urlLoading } = useUrlGetByIdQuery(
    params.id as string
  );
  const urlinfo: TUrl = urlData?.data;

  if (urlLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UrlUpdateForm defaultValues={{ name: urlinfo.name, url: urlinfo.url }} />
    </div>
  );
};

export default EditUrlPage;
