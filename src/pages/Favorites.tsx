import favorites from "../../public/favorites.webp";

const Favorites = () => {
  return (
    <main className="pl-[258px] pt-[75px]  ">
      <div className="bg-white rounded-lg mr-3 min-h-screen">
        <div className=" border-b border-gray-300 px-5 py-3 text-gray-800 flex items-center  justify-between">
          <h1 className="text-3xl  ">Favorites</h1>
        </div>
        {/* {albumList.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-8">
            <img src={favorites} alt="no-album-found" />
            <p className="text-gray-800 pt-4">
              The albums you create are shown here
            </p>
          </div>
        )} */}
      </div>
    </main>
  );
};

export default Favorites;
