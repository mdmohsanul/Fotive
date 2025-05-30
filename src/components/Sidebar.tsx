import { sidebar } from "@/data/sidebar"
import { Link } from "react-router-dom"


const Sidebar = () => {
  return (
    <>
      <div className="hidden lg:block fixed top-18 left-0">
        <div className="min-h-screen w-64 bg-gray-100">
          <ul className="pt-8 px-7">
            {sidebar.map((item) => (
              <li key={item.id} className="pb-9">
                <Link
                  to={item.linkTo}
                  className="flex items-center gap-4 text-[16px] text-[#444746] font-medium"
                >
                  {<item.icon size={20} />} {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar