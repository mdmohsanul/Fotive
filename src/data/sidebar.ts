import type { IconType } from "react-icons/lib";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { MdOutlinePhotoAlbum } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
type SidebarItem = {
    id:number;
    title:string;
    linkTo:string;
    icon:IconType
}

export const sidebar: SidebarItem[] = [
    {
     id:1,
     title:"Photos",
     linkTo:"/photos",
     icon:MdOutlinePhotoSizeSelectActual
    },
    {
        id:2,
        title:"Albums",
        linkTo:"/albums",
        icon:MdOutlinePhotoAlbum
       },
       {
        id:3,
        title:"Recently Added",
        linkTo:"/recentlyAdded",
        icon:FaRegClock
       }
]