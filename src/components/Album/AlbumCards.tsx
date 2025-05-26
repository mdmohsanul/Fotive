import { useAppSelector } from "@/app/store"
import { Link } from "react-router-dom";


type Album = {
  albumId: string;
  name: string;
  createdAt: string;
};

const AlbumCards = () => {
  const {albums} = useAppSelector(state=>state.album)
  return <>
     <div className="flex flex-wrap mx-8 gap-10">
          {albums?.map((item:Album) => (
           <Link to={`/dashboard/albums/${item.albumId}`}> <div key={item?.albumId}>
                 <div>

                 </div>
                 <p>{item.name}</p>
                 <p>{item.createdAt}</p>
              </div></Link>
          ))}
     </div>
  </>
}

export default AlbumCards


