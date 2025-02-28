import { TUrl } from "@/lib/modules/url/url.type";
import UrlUpdateForm from "../../_components/UrlUpdateForm";
import { urlGetByIdAction } from "@/lib/modules/url/url.action";

type TProps = {
  params: Promise<{ id: string }>;
};

const EditUrlPage = async ({ params }: TProps) => {
  const id = (await params).id;

  const urlData = await urlGetByIdAction(id);
  const urlinfo = urlData?.data as TUrl;

  return (
    <div>
      <UrlUpdateForm defaultValues={{ name: urlinfo.name, url: urlinfo.url }} />
    </div>
  );
};

export default EditUrlPage;
