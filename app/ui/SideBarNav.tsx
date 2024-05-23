import UserProfile from "./UserProfile";

export const SideBarNav = () => {
  return (
    <div className="h-screen w-[260px] bg-stone-500 bg-opacity-70 flex-shrink-0">
      <div className="flex flex-col h-full min-h-0">
        <div className="relative h-full w-full items-start border-white/20">
          <h2 className="">Chat history</h2>
          <nav className="flex h-full w-full flex-col px-3 pb-3.5">
            <div className="flex-col flex-1 transition-opacity duration-500 -mr-2 pr-2 overflow-y-auto"></div>
            <div className="flex flex-col pt-2 empty:hidden dark:border-white/20">
              <UserProfile />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
