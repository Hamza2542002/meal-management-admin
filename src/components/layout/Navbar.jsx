import { Bell, Info, Search } from "lucide-react";

function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-8 py-6.5">
      <div className="flex items-center gap-2 rounded-md bg-background border border-outline-variant px-3 py-1 text-sm text-outline-variant w-1/3 md:w-125 ">
        <Search size={18} strokeWidth={2} className="inline text-outline " />
        <input placeholder="Search meals, orders..." className=" py-1 text-sm text-outline placeholder:text-outline-variant focus:outline-none" />
      </div>
      <div className="flex items-center gap-6">
        <div className="relative hover:cursor-pointer">
          <Bell size={20} strokeWidth={2} className="inline text-outline " />
          <span className="sr-dot bg-secondary"></span>
        </div>
        <p className="text-md text-outline hover:cursor-pointer">
          <Info size={20} strokeWidth={2} className="mr-1 inline" />
          Support
        </p>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary">
          A
        </div>
        <div className="hidden sm:block">
        </div>
      </div>
    </header>
  );
}

export default Navbar;