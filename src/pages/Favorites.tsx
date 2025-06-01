import { useEffect } from "react";
import favorites from "/favorites.webp";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { fetchfavoritesByUser } from "@/features/image/imageThunks";
import PhotoCards from "@/components/Photos/PhotoCards";
import type { Image } from "@/features/image/imageSlice";

const Favorites = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { favImages } = useAppSelector((state) => state.image);
  console.log(favImages);
  useEffect(() => {
    if (user) {
      dispatch(fetchfavoritesByUser(user?.userId));
    }
  }, [dispatch, user]);
  return (
    <main className="pl-[258px] pt-[75px]  ">
      <div className="bg-white rounded-lg mr-3 min-h-screen">
        <div className=" border-b border-gray-300 px-5 py-3 text-gray-800 flex items-center  justify-between">
          <h1 className="text-3xl  ">Favorites</h1>
        </div>
        {favImages.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-8">
            <img src={favorites} alt="no-album-found" />
            <p className="text-gray-800 pt-4">
              The albums you create are shown here
            </p>
          </div>
        )}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 px-5 space-y-4 pt-8">
          {favImages?.map((image: Image) => (
            <PhotoCards image={image} key={image.imageId} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Favorites;
