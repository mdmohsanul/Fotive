import { useAppDispatch, useAppSelector } from "@/app/store";
import AlbumCards from "@/components/Album/AlbumCards";
import AlbumFilter from "@/components/Album/AlbumFilter";
import AlbumForm from "@/components/Album/AlbumForm";
import AlbumHeader from "@/components/Album/AlbumHeader";
import { fetchAlbums } from "@/features/album/albumThunk";

import { useEffect, useState } from "react";

const Albums = () => {
  const dispatch = useAppDispatch();
  const { albums } = useAppSelector((state) => state.album);
  const { images } = useAppSelector((state) => state.image);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);
  console.log(albums);
  console.log(images);

  return (
    <main className="pl-[258px] pt-[75px]  ">
      <div className="bg-white rounded-lg mr-3 min-h-screen">
        <AlbumHeader setOpenModal={setOpenModal} />
        {/* Album Filters */}
        <AlbumFilter />
        {/* Albums */}
        <AlbumCards />
        {/* create albums */}
        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/50 min-h-screen">
            <AlbumForm setOpenModal={setOpenModal} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Albums;
