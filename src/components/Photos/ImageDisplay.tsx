import { FaStar } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { LuInfo } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import {  useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useState } from "react";
import ImageInfo from "./ImageInfo";
import {
  deleteImage,
  fetchAllImages,
  updateFavoriteImage,
} from "@/features/image/imageThunks";

const ImageDisplay = () => {
  const navigate = useNavigate();
  const { imageId } = useParams();
  console.log("imageid", imageId);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { allImages } = useAppSelector((state) => state.image);

  const image = allImages.find((img) => img.imageId === imageId);

  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [favImg, setFavImg] = useState<boolean>(false);
  console.log(image);
  const favoriteHandler = async () => {
    const updatedFavoriteStatus = !favImg; // Toggle it manually
    setFavImg(updatedFavoriteStatus);
    const imageId = image?.imageId;
    const favorite = {
      isFavorite: updatedFavoriteStatus,
    };
    try {
      console.log(favorite.isFavorite);
      await dispatch(updateFavoriteImage({ imageId, favorite })).unwrap();
      dispatch(fetchAllImages(user?.userId));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async () => {
    const imageId = image?.imageId;
    const userId = user?.userId;

    try {
      dispatch(deleteImage({ imageId, userId })).unwrap();
      dispatch(fetchAllImages(user?.userId));
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="fixed inset-0 bg-black bg-opacity-80 min-h-screen flex items-center justify-center z-50">
          {/* HEADER */}
          <div className="absolute top-0 left-0 w-full h-16   text-white text-2xl font-semibold bg-black bg-opacity-60 backdrop-blur">
            <div className="flex items-center justify-between px-6 py-4 bg-black/30 backdrop-blur-md text-white shadow-md rounded-md">
              {/* Back Button */}
              {/* <Link
                to={`/dashboard/${backPath}`}
                className="p-2 rounded-full hover:bg-white/20 transition"
              >
                <FaArrowLeft size={20} />
              </Link> */}
              <button
                className="p-2 rounded-full hover:bg-white/20 transition"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft size={20} />
              </button>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  className="p-2 rounded-full hover:bg-white/20 transition cursor-pointer"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  <LuInfo size={20} />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-white/20 transition text-white"
                  onClick={favoriteHandler}
                >
                  {image?.isFavorite ? (
                    <FaStar size={20} />
                  ) : (
                    <FaRegStar size={20} color="white" />
                  )}
                </button>
                <button
                  className="p-2 rounded-full hover:bg-red-500/70 hover:text-white transition"
                  onClick={deleteHandler}
                >
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
          {showInfo && <ImageInfo image={image} />}
        </div>
      </div>
    </>
  );
};

export default ImageDisplay;
