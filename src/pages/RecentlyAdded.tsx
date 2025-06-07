

const RecentlyAdded = () => {
  return (
    <main className="pl-[258px] pt-[75px]  ">
      <div className="bg-white rounded-lg mr-3 min-h-screen">
        <div className=" border-b border-gray-300 px-5 py-3 text-gray-800 flex items-center  justify-between">
          <h1 className="text-3xl  ">Recently Added</h1>
        </div>
        {/* {allImages.length === 0 && (
          <div className="flex items-center justify-center flex-col pt-8">
            <img src={NoImage} alt="" />
            <p className="text-gray-900">Image added will show here!</p>
          </div>
        )} */}
      </div>
    </main>
  );
}

export default RecentlyAdded