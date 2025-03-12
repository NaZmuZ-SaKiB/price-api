import LoadingImage from "@/assets/images/loading.gif";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full h-[70svh] grid place-items-center">
      <div>
        <Image
          src={LoadingImage.src}
          alt="Loading"
          width={400}
          height={400}
          className="rounded-md"
        />
        <p className="text-center font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
