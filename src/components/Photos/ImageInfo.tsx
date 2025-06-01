import type { Image } from "@/features/image/imageSlice";

type ImageInfoProps = {
  image?:Image 
}

const ImageInfo:React.FC<ImageInfoProps> = ({ image }) => {
  if (!image) return <p className="text-gray-500">No image selected</p>;
  const { name, createdAt, size, tags } = image;

  return (
    <div className="absolute top-14 right-20 max-w-md p-4 rounded-xl shadow-md bg-white space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">Image Info</h2>

      <div className="text-sm text-gray-600">
        <p><span className="font-medium">Name:</span> {name.charAt(0).toUpperCase()+name.slice(1)}</p>
        <p className="py-2"><span className="font-medium py-3">Uploaded:</span> {new Date(createdAt).toLocaleString()}</p>
        <p><span className="font-medium">Size:</span> {size.toFixed(2)} MB</p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Tags:</p>
        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500">No tags</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default ImageInfo