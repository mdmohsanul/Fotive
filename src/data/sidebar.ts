import type { IconType } from "react-icons/lib";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { MdOutlinePhotoAlbum } from "react-icons/md";
// import { FaRegClock } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
type SidebarItem = {
  id: number;
  title: string;
  linkTo: string;
  icon: IconType;
};

export const sidebar: SidebarItem[] = [
  {
    id: 1,
    title: "Photos",
    linkTo: "/dashboard",
    icon: MdOutlinePhotoSizeSelectActual,
  },
  {
    id: 2,
    title: "Albums",
    linkTo: "/dashboard/albums",
    icon: MdOutlinePhotoAlbum,
  },
  // {
  //   id: 3,
  //   title: "Recently Added",
  //   linkTo: "/dashboard/recentlyAdded",
  //   icon: FaRegClock,
  // },
  {
    id: 4,
    title: "Favorites",
    linkTo: "/dashboard/favorites",
    icon: FaStar,
  },
];