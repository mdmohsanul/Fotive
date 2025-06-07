import type { Image } from "@/features/image/imageSlice";
import { Link } from "react-router-dom";

type PhotoDisplayProps = {
  image: Image;
  albumId: string | undefined;
};
const AlbumImageCards = ({ image, albumId }: PhotoDisplayProps) => {
  return (
    <Link
      to={`/dashboard/albums/${albumId}/image/${image.imageId}`}
      key={image.imageId}
      className="break-inside-avoid cursor-pointer"
    >
      <img
        src={image.imageUrl}
        alt=""
        loading="lazy"
        className="w-full mb-4 rounded object-cover"
      />
    </Link>
  );
};

export default AlbumImageCards