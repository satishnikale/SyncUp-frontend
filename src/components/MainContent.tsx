interface MainContentProps {
    children: React.ReactNode;
}
// lg:w-8/12
export const MainContent = ({ children }: MainContentProps) => {
    return (
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
            {children}
        </div>
    );
};