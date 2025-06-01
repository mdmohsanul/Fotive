import { useAppDispatch, useAppSelector } from "@/app/store";
import ImageForm from "@/components/Images/ImageForm";
import ImageHeader from "@/components/Images/ImageHeader";
import ImageCards from "@/components/Photos/ImageCards";
import type { Image } from "@/features/image/imageSlice";
import { fetchImages } from "@/features/image/imageThunks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Album_Images = () => {
  const { albumId } = useParams();
  const dispatch = useAppDispatch();
  const { albums } = useAppSelector((state) => state.album);
  const { images } = useAppSelector((state) => state.image);

  const [openImageForm, setOpenImageForm] = useState(false);
  const findAlbum = albums.find((album) => album.albumId === albumId);

  useEffect(() => {
    dispatch(fetchImages(albumId));
  }, [dispatch, albumId]);

  return (
    <main className="relative">
      <ImageHeader setOpenImageForm={setOpenImageForm} />
      <div className="max-w-5xl mx-auto pt-20">
        <h1 className="text-4xl text-gray-800 py-6">{findAlbum?.name}</h1>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 px-5 space-y-4 pt-8">
          {images?.map((image: Image) => (
            <ImageCards image={image} key={image.imageId} />
          ))}
        </div>
      </div>
      {openImageForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/50 min-h-screen ">
          <ImageForm
            setOpenImageForm={setOpenImageForm}
            albumId={findAlbum?.albumId}
          />
        </div>
      )}
    </main>
  );
};

export default Album_Images;
