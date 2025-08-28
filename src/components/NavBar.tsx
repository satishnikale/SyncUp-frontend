import { MainContent } from "./MainContent"

export const Navbar = () => {
    return (
        <MainContent >
            <div className="w-full h-16 mx-auto rounded-full bg-lightGray my-4 border border-slate-400 font-inter">
                <div className="w-full h-full flex justify-between items-center px-10">
                    <div className="">SyncUp</div>
                    <div className="">
                        <ul className="flex gap-6">
                            <li>Join as Guest</li>
                            <li>Register</li>
                            <li>Login</li>
                        </ul>
                    </div>
                </div>
            </div>
        </MainContent>
    )
}