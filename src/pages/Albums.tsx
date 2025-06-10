import { useAppDispatch } from "@/app/store";
import AlbumCards from "@/components/Album/AlbumCards";
import AlbumFilter from "@/components/Album/AlbumFilter";
import AlbumForm from "@/components/Album/AlbumForm";
import AlbumHeader from "@/components/Album/AlbumHeader";
import { fetchAlbums } from "@/features/album/albumThunk";
import { type Album } from "@/types/album";

import { useEffect, useState } from "react";

const Albums = () => {
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [updateData, setUpdatedData] = useState<Album | null>();
  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  return (
    <main className="lg:pt-20 pt-[52px]  min-h-screen bg-white lg:ml-64  ">
      <div className="bg-white rounded-lg mr-3 min-h-screen">
        <AlbumHeader
          setOpenModal={setOpenModal}
          setUpdatedData={setUpdatedData}
        />

        {/* Album Filters */}
        <AlbumFilter />

        {/* Albums */}
        <AlbumCards
          setUpdatedData={setUpdatedData}
          setOpenModal={setOpenModal}
        />

        {/* create albums */}
        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/50 min-h-screen">
            <AlbumForm
              setOpenModal={setOpenModal}
              existingData={updateData ?? undefined}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Albums;
