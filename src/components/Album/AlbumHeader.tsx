import { FaRegSquarePlus } from "react-icons/fa6";
import { CgArrowsExchangeV } from "react-icons/cg";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useState } from "react";
import { setSortFilter } from "@/features/album/albumSlice";
import type { Album } from "@/types/album";

type AlbumProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdatedData: (data: Album | null) => void;
};
const AlbumHeader: React.FC<AlbumProps> = ({
  setOpenModal,
  setUpdatedData,
}) => {
  const dispatch = useAppDispatch();
  const { albums } = useAppSelector((state) => state.album);
  const [clickTrack, setClickTrack] = useState(true);
  const handleClick = () => {
    setOpenModal(true);
    setUpdatedData(null);
  };

  const sortHandler = () => {
    setClickTrack(!clickTrack);
    let sorted;
    if (clickTrack) {
      sorted = [...albums].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      sorted = [...albums].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
    dispatch(setSortFilter(sorted));
  };

  return (
    <div className=" border-b border-gray-300 px-5 py-3 text-gray-800 flex items-center  justify-between">
      <h1 className="text-3xl  ">Albums</h1>
      <div className="text-sm font-medium flex text-gray-700">
        <button
          className="pr-8 flex items-center gap-3 cursor-pointer"
          onClick={handleClick}
        >
          <FaRegSquarePlus size={20} /> Create album
        </button>
        <button
          className="flex items-center gap-1 cursor-pointer"
          onClick={sortHandler}
        >
          <CgArrowsExchangeV size={20} /> Most recent album
        </button>
      </div>
    </div>
  );
};

export default AlbumHeader