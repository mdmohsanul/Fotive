import { useAppSelector } from "@/app/store";
import type { Album } from "@/types/album";
import { useEffect, useState } from "react";

const useAlbumFilter = (albums: Album[]) => {
  const { albumFilter, sortOrder } = useAppSelector((state) => state.album);
  const { user } = useAppSelector((state) => state.auth);
  const [filteredList, setFilteredList] = useState<Album[]>([]);

  useEffect(() => {
    let filtered = albums;

    if (albumFilter === "myAlbums") {
      filtered = filtered.filter((album) => album.ownerId === user?.userId);
    } else if (albumFilter === "shared") {
      filtered = filtered.filter((album) => album.ownerId !== user?.userId);
    }

    if (sortOrder === "asc") {
      filtered = [...filtered].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (sortOrder === "desc") {
      filtered = [...filtered].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    setFilteredList(filtered);
  }, [albumFilter, albums, user?.userId, sortOrder]);

  return filteredList;
};

export default useAlbumFilter;
