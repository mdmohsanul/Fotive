import { useAppDispatch } from '@/app/store';
import { setAlbumFilter } from '@/features/album/albumSlice';
import {useState} from 'react'

const AlbumFilter = () => {
  const dispatch = useAppDispatch()
    const btn =
      "text-sm text-gray-800 py-1 px-3 rounded-md cursor-pointer border border-gray-600 mr-4 font-medium";
    const [selectedItems, setSelectedItems] = useState(["all"]);

    const selectHandler = (item: "all" | "shared" | "myAlbums") => {
      if (item === "all") {
        setSelectedItems(["all", "shared", "myAlbums"]);
      } else {
        setSelectedItems([item]);
      }
      dispatch(setAlbumFilter(item));
    };
    return (
      <div className="px-5 py-7">
        <button
          className={`${btn} ${
            selectedItems.includes("all") ? "border-none bg-gray-200" : ""
          }`}
          onClick={() => selectHandler("all")}
        >
          All
        </button>
        <button
          className={`${btn} ${
            selectedItems[0] === "myAlbums" ? "border-none bg-gray-200" : ""
          }`}
          onClick={() => selectHandler("myAlbums")}
        >
          My albums
        </button>
        <button
          className={`${btn} ${
            selectedItems[0] === "shared" ? "border-none bg-gray-200" : ""
          }`}
          onClick={() => selectHandler("shared")}
        >
          Shared with me
        </button>

        {/* <p>{JSON.stringify(selectedItems)}</p> */}
      </div>
    );
}

export default AlbumFilter