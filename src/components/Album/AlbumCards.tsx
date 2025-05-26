import { useAppSelector } from "@/app/store";

import { format } from "date-fns";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Album = {
  albumId: string;
  name: string;
  createdAt: string;
};

const AlbumCards = () => {
  const navigate = useNavigate();
  const { albums } = useAppSelector((state) => state.album);
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const getDate = (inputDate: string): string => {
    const dateFormat = format(inputDate, "dd-MM-yyyy");
    return dateFormat;
  };
  const handleCardClick = (albumId: string) => {
    navigate(`/dashboard/albums/${albumId}`);
  };
  const optionHandler = (e: React.MouseEvent, albumId: string) => {
    e.stopPropagation();
    setActiveAlbumId((prev) => (prev === albumId ? null : albumId));
  };
  return (
    <>
      <div className="flex flex-wrap mx-8 gap-10">
        {albums?.map((item: Album) => (
          <div
            key={item?.albumId}
            className="relative cursor-pointer"
            onClick={() => handleCardClick(item.albumId)}
          >
            <div>
              <div className="bg-gray-200 w-56 h-56 rounded-lg"></div>
              <div className="p-2">
                <p className="text-gray-800 font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {getDate(item.createdAt)}
                </p>
              </div>
            </div>
            <button
              className="absolute top-8 right-5 w-10 h-10  flex items-center justify-center cursor-pointer"
              onClick={(e) => optionHandler(e, item.albumId)}
            >
              <PiDotsThreeOutlineVerticalFill size={25} />
            </button>
            {/* Dropdown Menu */}
            {activeAlbumId === item.albumId && (
              <div
                className="absolute top-20 right-5 bg-white shadow-lg p-2 rounded z-10 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">
                  Rename
                </button>

                <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">
                  Share
                </button>
                <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AlbumCards;
