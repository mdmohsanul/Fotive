import { useAppDispatch, useAppSelector } from "@/app/store";
import type { Image } from "@/features/image/imageSlice";
import { fetchAllImages } from "@/features/image/imageThunks";
import { useEffect } from "react";
import ImageCards from "@/components/Photos/ImageCards";
import NoImage from "/NoImages.png";

const Photos = () => {
  const { allImages } = useAppSelector((state) => state.image);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllImages(user?.userId));
  }, [dispatch, user?.userId]);

  return (
    <main className="pl-[258px] pt-[75px]  ">
      <div className="bg-white rounded-lg mr-3 min-h-screen">
        <div className=" border-b border-gray-300 px-5 py-3 text-gray-800 flex items-center  justify-between">
          <h1 className="text-3xl  ">Photos</h1>
        </div>
        {allImages.length === 0 && (
          <div className="flex items-center justify-center flex-col pt-8">
            <img src={NoImage} alt="" />
            <p className="text-gray-900">Image added will show here!</p>
          </div>
        )}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 px-5 space-y-4 pt-8">
          {allImages.map((image: Image) => (
            <ImageCards image={image} key={image.imageId} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Photos;
