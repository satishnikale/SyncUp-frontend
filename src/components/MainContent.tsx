interface MainContentProps {
    children: React.ReactNode;
}
// lg:w-8/12
export const MainContent = ({ children }: MainContentProps) => {
    return (
        <div className="w-11/12 max-w-[1080px] h-auto mx-auto">
            {children}
        </div>
    );
};