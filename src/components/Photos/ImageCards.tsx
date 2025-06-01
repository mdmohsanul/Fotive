import type { Image } from "@/features/image/imageSlice";
import { Link } from "react-router-dom";

type PhotoDisplayProps = {
  image: Image;
};
const ImageCards: React.FC<PhotoDisplayProps> = ({ image }) => {
  return (
    <Link
      to={`/dashboard/photos/${image.imageId}`}
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

export default ImageCards;
