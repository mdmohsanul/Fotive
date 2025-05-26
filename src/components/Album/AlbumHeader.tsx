import { FaRegSquarePlus } from "react-icons/fa6";
import { CgArrowsExchangeV } from "react-icons/cg";

type AlbumProps = {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  }
const AlbumHeader:React.FC<AlbumProps> = ({setOpenModal}) => {
    const handleClick = () => {
        setOpenModal(true)
      };
      
  return (
    <div className=" border-b border-gray-300 px-5 py-3 text-gray-800 flex items-center  justify-between">
          <h1 className="text-3xl  ">Albums</h1>
          <div className="text-sm font-medium flex text-gray-700">
            <button className="pr-8 flex items-center gap-3" onClick={handleClick}>
              <FaRegSquarePlus size={20} /> Create album
            </button>
            <button className="flex items-center gap-1">
              <CgArrowsExchangeV size={20} /> Most recent album
            </button>
          </div>
        </div>
  )
}

export default AlbumHeader