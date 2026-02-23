export default function Navbar() {
    return (
      <div className="w-full border-4 border-[#0B1957] bg-[#F8F3EA] shadow-[6px_6px_0_#0B1957]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
  
          {/* LOGO */}
          <div className="font-black text-xl text-[#0B1957]">Yusron.dev</div>
  
          {/* MENU */}
          <div className="hidden md:flex gap-8 font-semibold text-[#0B1957]">
            <a className="hover:underline cursor-pointer">Features</a>
            <a className="hover:underline cursor-pointer">Projects</a>
            <a className="hover:underline cursor-pointer">About</a>
            <a className="hover:underline cursor-pointer">Contact</a>
          </div>
  
          {/* BUTTONS */}
          <div className="flex gap-3">
            <button className="border-4 border-[#0B1957] px-4 py-2 font-bold shadow-[3px_3px_0_#0B1957] bg-[#F8F3EA] text-[#0B1957]">
              Login
            </button>
  
            <button className="border-4 border-[#0B1957] px-4 py-2 font-bold shadow-[3px_3px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957]">
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }