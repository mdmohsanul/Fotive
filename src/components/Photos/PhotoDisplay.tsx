import { FaStar } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { LuInfo } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "@/app/store";


const PhotoDisplay = () => {
    const {imageId} = useParams()
    const {allImages} = useAppSelector(state => state.image)
     const image = allImages?.find(img => img.imageId === imageId)
   
  return (
   <>
  <div>
     <div className="fixed inset-0 bg-black bg-opacity-80 min-h-screen flex items-center justify-center z-50">
            {/* HEADER */}
            <div className="absolute top-0 left-0 w-full h-16   text-white text-2xl font-semibold bg-black bg-opacity-60 backdrop-blur">
              <div className="flex items-center justify-between px-6 py-4 bg-black/30 backdrop-blur-md text-white shadow-md rounded-md">
                {/* Back Button */}
                <Link to='/dashboard' className="p-2 rounded-full hover:bg-white/20 transition">
                  <FaArrowLeft size={20} />
                </Link>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="p-2 rounded-full hover:bg-white/20 transition">
                    <LuInfo size={20} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-white/20 transition text-white">
                  {image?.isFavorite ? <FaStar/> :<FaRegStar size={20} color="white"/>}  
                  </button>
                  <button className="p-2 rounded-full hover:bg-red-500/70 hover:text-white transition">
                    <RiDeleteBin6Line size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* IMAGE PREVIEW */}
            <img
              src={image?.imageUrl}
              alt="Preview"
              className="max-w-[90%] max-h-[80%] mt-16 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            />

          </div>
       
  </div>
       
   </>
  )
}

export default PhotoDisplay