import { useAppDispatch, useAppSelector } from "@/app/store";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAlbum, fetchAlbums } from "@/features/album/albumThunk";
import type { Album } from "@/types/album";
import album from "/NoAlbum.webp";
import { useDate } from "@/hooks/useDate";
import SharedUserForm from "./SharedUserForm";

type AlbumProps = {
  setUpdatedData: (album: Album) => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AlbumCards: React.FC<AlbumProps> = ({ setUpdatedData, setOpenModal }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { albums, sortedAlbums } = useAppSelector((state) => state.album);
  const [err, setErr] = useState<string | undefined>();
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const [openSharedUserForm, setSharedUserForm] = useState<boolean>(false);

  const albumList = sortedAlbums.length === 0 ? albums : sortedAlbums;

  // custom hook to get formated date
  const getDate = useDate();
  const handleCardClick = (albumId: string) => {
    navigate(`/dashboard/albums/${albumId}`);
  };

  const optionHandler = (e: React.MouseEvent, albumId: string) => {
    e.stopPropagation();
    setActiveAlbumId((prev) => (prev === albumId ? null : albumId));
  };

  const remaneHandler = (data: Album) => {
    setOpenModal(true);
    setUpdatedData(data);
  };

  const deleteHandler = async (albumId: string) => {
    console.log(albumId);
    try {
      await dispatch(deleteAlbum(albumId)).unwrap();
      // refresh list or show success message
      dispatch(fetchAlbums());
    } catch (error) {
      setErr(error as string); // if using state for error
    }
  };
  return (
    <>
      {err && <p>{err}</p>}
      {albumList.length === 0 && (
        <div className="flex flex-col items-center justify-center pt-8">
          <img src={album} alt="no-album-found" />
          <p className="text-gray-800 pt-4">
            The albums you create are shown here
          </p>
        </div>
      )}
      <div className="flex flex-wrap mx-8 gap-10">
        {albumList?.map((item: Album, idx) => (
          <div
            key={item?._id}
            className="relative cursor-pointer"
            onClick={() => handleCardClick(item.albumId)}
          >
            <div>
              <div
                className={`${
                  idx % 2 === 0
                    ? "bg-gradient-to-b from-teal-200 to-teal-500"
                    : idx % 3 === 0
                    ? "bg-gradient-to-b from-teal-400 to-yellow-200"
                    : "bg-gradient-to-b from-sky-200 to-sky-500"
                } w-56 h-56 rounded-lg relative `}
              >
                <span className="absolute bottom-0 p-3">
                  {item?.description}
                </span>
              </div>
              <div className="p-2">
                <p className="text-gray-800 font-medium">{item?.name}</p>
                <p className="text-sm text-gray-600">
                  {getDate(item?.createdAt)}
                </p>
              </div>
            </div>
            <button
              className="absolute top-4 right-3 w-10 h-10 text-gray-600 flex items-center justify-center cursor-pointer"
              onClick={(e) => optionHandler(e, item.albumId)}
            >
              <PiDotsThreeOutlineVerticalFill size={25} />
            </button>
            {/* Dropdown Menu */}
            {activeAlbumId === item.albumId && (
              <div
                className="absolute top-14 right-7 bg-white shadow-lg p-2 rounded z-10 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="block w-full text-left px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={() => remaneHandler(item)}
                >
                  Rename
                </button>

                <button
                  className="block w-full text-left px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSharedUserForm(true)}
                >
                  Share
                </button>
                <button
                  className="block w-full text-left px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={() => deleteHandler(item?.albumId)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {openSharedUserForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/50 min-h-screen">
          <SharedUserForm setSharedUserForm={setSharedUserForm} />
        </div>
      )}
    </>
  );
};

export default AlbumCards;
