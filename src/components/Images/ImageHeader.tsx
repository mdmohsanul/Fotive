import { GoArrowLeft } from "react-icons/go";
import { LuImagePlus } from "react-icons/lu";
import { AiOutlineShareAlt } from "react-icons/ai";
import { Link } from "react-router-dom";

type ImageHeaderProps = {
  setOpenImageForm: React.Dispatch<React.SetStateAction<boolean>>;
};
const ImageHeader: React.FC<ImageHeaderProps> = ({ setOpenImageForm }) => {
  const openFormHandler = () => {
    setOpenImageForm(true);
  };
  return (
    <>
      <div className=" bg-gray-100 fixed top-0 w-full z-30">
        <div className="max-w-screen mx-auto h-16 backdrop-blur-2xl">
          <div className="px-10 py-4 flex items-center  justify-between ">
            <Link to={"/dashboard/albums"}>
              <GoArrowLeft size={25} className="cursor-pointer" />
            </Link>
            <div className="flex gap-6">
              <button className="cursor-pointer" onClick={openFormHandler}>
                <LuImagePlus size={25} />
              </button>
              <button className="cursor-pointer">
                <AiOutlineShareAlt size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageHeader;