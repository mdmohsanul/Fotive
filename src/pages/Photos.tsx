import { useAppDispatch, useAppSelector } from "@/app/store";
import type { Image } from "@/features/image/imageSlice";
import { fetchAllImages } from "@/features/image/imageThunks";
import { useEffect } from "react";

import PhotoCards from "@/components/Photos/PhotoCards";

const Photos = () => {
  const { allImages } = useAppSelector((state) => state.image);
  const dispatch = useAppDispatch();
  console.log(allImages);
  useEffect(() => {
    dispatch(fetchAllImages());
  }, [dispatch]);

  return (
    <main className="pl-[258px] pt-[75px]  ">
      <div className="bg-white rounded-lg mr-3 min-h-screen">
        <h1 className="text-4xl p-6">Photos</h1>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 px-5 space-y-4">
          {allImages.map((image: Image) => (
            <PhotoCards image={image} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Photos;
