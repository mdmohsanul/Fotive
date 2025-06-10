import { sidebar } from "@/data/sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Hamburger button - visible only on mobile */}
      <div className="lg:hidden fixed top-[54px] left-0 w-full px-4 z-50 flex justify-between items-center h-14  ">
        <button onClick={toggleSidebar} aria-label="Toggle sidebar">
          {isOpen ? <RxCross2 size={28} /> : <RxHamburgerMenu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64  z-40  transform bg-white md:border-r-2 md:border-red-500
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0  lg:block
        `}
      >
        <ul className="pt-20 px-7 md:pt-24">
          {sidebar.map((item) => (
            <li key={item.id} className="pt-6 pb-1">
              <Link
                to={item.linkTo}
                onClick={() => setIsOpen(false)} // Close sidebar on mobile
                className="flex items-center gap-4 text-[16px] text-[#444746] font-medium"
              >
                <item.icon size={20} />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay - only shows on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
