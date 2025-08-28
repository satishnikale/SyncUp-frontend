import { MainContent } from "./MainContent";
import heroImage from "../assets/vdo-img.png";

export const Hero = () => {
    return (
        <MainContent>
            <div className="w-full h-auto justify-between my-20 items-center gap-10 font-inter">
                <div className="w-full h-auto flex-col space-y-6">
                    <h1 className="text-5xl font-semibold">Uniting the world, <br />
                        one video call at a time
                    </h1>
                    <p className="text-darkGray">Experience the future of communication with ClearLink - <br />
                        where crystal-clear video conferencing meets <br />
                        unparalleled simplicity.
                    </p>
                    <div>
                        <button>Start your free trial</button>
                        <button>Discover Al assistant</button>
                    </div>
                    <div>

                    </div>
                </div>
                <div className="">
                    <img className="w-[400px] max-w-[400px] border border-blue-300 rounded shadow-2xl shadow-slate-400" src={heroImage} alt="hero-image" />
                </div>
            </div>
        </MainContent>
    )
}