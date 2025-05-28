import { RxCrossCircled } from "react-icons/rx";
import{ useState, type ChangeEvent } from "react";
import { useAppDispatch } from "@/app/store";
import { uploadImage } from "@/features/image/imageThunks";


type ImageProps = {
  setOpenImageForm: React.Dispatch<React.SetStateAction<boolean>>;
  albumId:string|undefined
};

const ImageForm:React.FC<ImageProps> = ({setOpenImageForm,albumId}) => {
    const [image,setImage] = useState<File | null>(null);
  const [message,setMessage] = useState("")
const dispatch = useAppDispatch()
    const handleClick = () => {
        setOpenImageForm(false)
    }
    const handleImageUpload = (e:ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
  if (selectedFile) {
    setImage(selectedFile); // 
  }
    }
  
    const handleUpload = async() => {  console.log(image)
         if(!image){
         setMessage("Please select an image to upload")
        return
        }

    const formData = new FormData();
    formData.append("image",image)
    console.log(formData)
     try {
       await dispatch(uploadImage({formData,albumId}))
    
     }catch(error){
      console.log(error)
      setMessage("Image upload failed")
     }
    }
  return (
     <div className="border-s-2 border-teal-900 p-5 min-w-xl bg-white">
         <div className="flex items-center justify-between pb-4">
           <h1 className="text-2xl text-gray-800">Upload Image</h1>
           <button onClick={handleClick} className="text-gray-700 cursor-pointer">
             <RxCrossCircled size={27} />
           </button>
         </div>
        <input type="file" name="" id="" onChange={handleImageUpload}/>
     <button onClick={handleUpload}>Upload</button>
     {message && <p>{message}</p>}
         </div>
  )
}

export default ImageForm