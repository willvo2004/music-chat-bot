import Link from "next/link";

export const SideBarNav = () => {
    return (
        <div className="h-screen w-[260px] bg-stone-500 bg-opacity-70 flex-shrink-0">
            <div className="flex flex-col h-full min-h-0">
                <div className="relative h-full w-full items-start border-white/20">
                    <h2 className="position: absolute; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; overflow-wrap: normal;">
                        Chat history</h2>
                    <nav className="flex h-full w-full flex-col px-3 pb-3.5">
                        <div className="flex-col flex-1 transition-opacity duration-500 -mr-2 pr-2 overflow-y-auto">
                            
                        </div>
                        <div className="flex flex-col pt-2 empty:hidden dark:border-white/20">
                            <Link href="/api/login" className="group flex gap-2 p-2.5">Login with Spotify</Link>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}