import { RxCrossCircled } from "react-icons/rx";
import { useForm } from "react-hook-form"
import type{  SubmitHandler } from "react-hook-form"
import { BiError } from "react-icons/bi";
import { useAppDispatch } from "@/app/store";
import { createAlbum, fetchAlbums } from "@/features/album/albumThunk";
import { useState } from "react";

type AlbumProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface IFormInput {
  name: string;
  description: string;
}
const AlbumForm: React.FC<AlbumProps> = ({ setOpenModal }) => {
  const dispatch = useAppDispatch();
  const [err, setErr] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await dispatch(createAlbum(data)).unwrap();
      dispatch(fetchAlbums());

      setOpenModal(false); // close modal on success
    } catch (error) {
      console.log(error);
      setErr(error as string);
    }
  };
  const handleClick = () => {
    setOpenModal(false);
  };

  return (
    <div className="border-s-2 border-teal-900 p-5 min-w-xl bg-white">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl text-gray-800">Create Album</h1>
        <button onClick={handleClick} className="text-gray-700 cursor-pointer">
          <RxCrossCircled size={27} />
        </button>
      </div>
      {err && <p className="text-white bg-red-400 px-3 inline">{err}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
        <div>
          <label htmlFor="" className="block text-gray-800 py-2 text-lg">
            Name
          </label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must have more than 3 characters",
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name?.type === "required" && (
            <p className="text-red-700 flex items-center gap-2">
              <BiError />
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="" className="block text-gray-800 py-2 text-lg">
            Description
          </label>
          <input
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 3,
                message: "Description must have more than 3 characters",
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            aria-invalid={errors.description ? "true" : "false"}
          />
          {errors.description && (
            <p role="alert" className="text-red-700 flex items-center gap-2">
              <BiError />
              {errors.description.message}
            </p>
          )}
        </div>

        <input
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "Creating..." : "Create Album"}
          className="bg-gray-600 text-white py-2 px-3 rounded-md cursor-pointer mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </form>
    </div>
  );
};

export default AlbumForm