export const PromptText = ({ userPrompt }: { userPrompt: { user: string; ai: string; }[] }) => {
    return (
        <div className="px-4 py-2 justify-center text-base md:gap-6 m-auto">
            <div className="flex flex-col flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] group">
                {userPrompt.map((item, index) => {
                    return (
                        <div key={index} className="flex flex-col gap-1">
                            <p className="text-left text-black">{item.user}</p>
                            <p className="text-left text-gray-500">{item.ai}</p>
                        </div>
                )})}
            </div>
        </div>
    );
};
