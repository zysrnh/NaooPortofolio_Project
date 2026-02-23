export default function Navbar() {
    return (
      <>
        <style>{`
          /* Nav link hover: underline slide dari kiri */
          .nav-link {
            position: relative;
            cursor: pointer;
            padding-bottom: 2px;
          }
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0%;
            height: 2px;
            background-color: #0B1957;
            transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .nav-link:hover::after {
            width: 100%;
          }
  
          /* Logo hover: shake effect */
          .logo-hover {
            transition: transform 0.15s ease;
            display: inline-block;
          }
          .logo-hover:hover {
            transform: translate(-2px, -2px);
          }
  
          /* Button brutal press */
          .btn-nav {
            transition: transform 0.08s ease, box-shadow 0.08s ease;
          }
          .btn-nav:hover {
            transform: translate(2px, 2px);
            box-shadow: 1px 1px 0 #0B1957 !important;
          }
          .btn-nav:active {
            transform: translate(3px, 3px);
            box-shadow: 0px 0px 0 #0B1957 !important;
          }
        `}</style>
  
        <div className="w-full border-4 border-[#0B1957] bg-[#F8F3EA] shadow-[6px_6px_0_#0B1957]">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
  
            {/* LOGO */}
            <div className="logo-hover font-black text-xl text-[#0B1957] cursor-pointer">
              Naoo
            </div>
  
            {/* MENU */}
            <div className="hidden md:flex gap-8 font-semibold text-[#0B1957]">
              <a className="nav-link">Features</a>
              <a className="nav-link">Projects</a>
              <a className="nav-link">About</a>
              <a className="nav-link">Contact</a>
            </div>
  
            {/* BUTTONS */}
            <div className="flex gap-3">
              <button className="btn-nav border-4 border-[#0B1957] px-4 py-2 font-bold shadow-[3px_3px_0_#0B1957] bg-[#F8F3EA] text-[#0B1957]">
                Login
              </button>
  
              <button className="btn-nav border-4 border-[#0B1957] px-4 py-2 font-bold shadow-[3px_3px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957]">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }