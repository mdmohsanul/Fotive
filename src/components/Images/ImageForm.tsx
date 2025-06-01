import { RxCrossCircled } from "react-icons/rx";
import { useState, type ChangeEvent } from "react";
import { useAppDispatch } from "@/app/store";
import { uploadImage } from "@/features/image/imageThunks";
import { imageTags } from "@/data/tags";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

type ImageProps = {
  setOpenImageForm: React.Dispatch<React.SetStateAction<boolean>>;
  albumId: string | undefined;
};

const ImageForm: React.FC<ImageProps> = ({ setOpenImageForm, albumId }) => {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const handleClick = () => {
    setOpenImageForm(false);
  };
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
    }
  };

  const selectHandler = (tags: string) => {
    setSelectedTags((prev) => [...prev, tags]);
  };
  const deleteTagHandler = (id: number) => {
    setSelectedTags((prev) => prev.filter((tag) => prev.indexOf(tag) !== id));
  };

  const handleUpload = async () => {
    setIsSubmitting(true);
    if (!image) {
      setMessage("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("isFavorite", isFavorite.toString());
    selectedTags.forEach((tag) => {
      formData.append("tags[]", tag); // or just "tags"
    });

    console.log(formData);
    try {
      await dispatch(uploadImage({ formData, albumId })).unwrap();
      setOpenImageForm(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setMessage("Image upload failed");
    }
  };
  return (
    <div className="border-s-2 border-teal-900 p-5 min-w-xl bg-white">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl text-gray-700 font-medium">Upload Image</h1>
        <button onClick={handleClick} className="text-gray-700 cursor-pointer">
          <RxCrossCircled size={27} />
        </button>
      </div>

      <div className="flex flex-col gap-4 py-5 px-6">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
          />
        </div>
        <div>
          <label className="flex items-center space-x-2 text-gray-600">
            <input
              type="checkbox"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
              className="h-4 w-4 text-blue-600"
            />
            <span>Mark as favorite</span>
          </label>
        </div>
        <div>
          <div
            className="w-3/4 h-auto rounded-md p-2 bg-gray-200"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            {selectedTags.length === 0 ? (
              <span>Select Tags ...</span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag, idx) => (
                  <span
                    key={tag}
                    className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm "
                  >
                    <button
                      className="flex items-center justify-between gap-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTagHandler(idx);
                      }}
                    >
                      {tag} <RxCross2 />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          {openDropdown && (
            <div>
              <ul className="w-3/4 h-48 overflow-y-scroll bg-gray-100 pt-3 my-3">
                {imageTags.map((tag) => (
                  <li
                    key={tag.id}
                    className={`px-3 py-1 cursor-pointer hover:bg-gray-300 ${
                      selectedTags.includes(tag.name)
                        ? "bg-blue-500 text-white hover:bg-blue-500"
                        : ""
                    }`}
                    onClick={() => selectHandler(tag.name)}
                  >
                    <span className="flex items-center  justify-between">
                      {tag.name}{" "}
                      {selectedTags.includes(tag.name) ? <TiTick /> : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleUpload}
        className={`px-3 cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
          isSubmitting ? "disabled:opacity-50 disabled:cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Uploading..." : "Upload"}
      </button>

      {message && <p className="text-green-600 font-medium">{message}</p>}
    </div>
  );
};

export default ImageForm;
