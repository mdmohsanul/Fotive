import { useAppDispatch, useAppSelector } from "@/app/store";
import type { Image } from "@/features/image/imageSlice";
import { fetchImages } from "@/features/image/imageThunks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


const Album_Images = () => {
    const {albumId} =  useParams();
    const dispatch = useAppDispatch()
    const {images } = useAppSelector(state=>state.image)
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    console.log(albumId)
    useEffect(() => {
 dispatch(fetchImages(albumId))
    },[dispatch,albumId])
    console.log(images)
      return (
    <main className="pl-[258px] pt-[75px]  bg-white">
        <div className="px-7 py-4">
            <h1 className="text-2xl text-gray-800">Images</h1>
            <div className="flex flex-wrap gap-4">
  {images.map((image: Image) => (
    <div
      key={image.imageId}
      className="w-72 h-72 cursor-pointer"
      onClick={() => setSelectedImage(image.imageUrl)}
    >
      <img
        src={image.imageUrl}
        alt=""
        loading="lazy"
        className="object-cover w-full h-full rounded-md"
      />
    </div>
  ))}
</div>
{selectedImage && (
  <div
    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
    onClick={() => setSelectedImage(null)} // close on backdrop click
  >
    <img
      src={selectedImage}
      alt="Preview"
      className="max-w-full max-h-full rounded-lg shadow-xl"
      onClick={(e) => e.stopPropagation()} // prevent close when clicking image
    />
    <button
      className="absolute top-4 right-4 text-white text-3xl font-bold"
      onClick={() => setSelectedImage(null)}
    >
      &times;
    </button>
  </div>
)}

        </div>
        </main>
  )
}

export default Album_Images