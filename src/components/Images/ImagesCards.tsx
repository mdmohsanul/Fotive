import { useState } from "react";
import type { Image } from "@/features/image/imageSlice";
import {  useAppSelector } from "@/app/store";


const ImagesCards = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
      const { images } = useAppSelector((state) => state.image);
  return (
   <>
    <div className="flex flex-wrap gap-4 ">
              {images.map((image: Image, idx) => (
                <div
                  key={image.imageId}
                  className={`w-72 h-72 cursor-pointer ${
                    idx % 2 === 0 ? "h-72" : "h-96"
                  }`}
                  onClick={() => setSelectedImage(image.imageUrl)}
                >
                  <img
                    src={image.imageUrl}
                    alt=""
                    loading="lazy"
                    className="object-cover w-full h-full "
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
                  className="max-w-full max-h-full  shadow-xl"
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
   </>
  )
}

export default ImagesCards