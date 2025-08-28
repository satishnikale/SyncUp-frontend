import peopleCollage from "../assets/people-collage.png";
import { CalenderIcon } from "../icons/CalenderIcon";
import { NoiseIcon } from "../icons/NoiseIcon";
import { SecurityIcon } from "../icons/SecurityIcon";
import { VideoIcon } from "../icons/VideoIcon";
import { MainContent } from "./MainContent";

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const Feature = ({ icon, title, desc }: FeatureProps) => (
  <div className="flex flex-col items-start gap-3">
    <div className="text-xl border rounded-full p-2 text-blue-600 font-semibold">{icon}</div>
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base">{desc}</p>
    </div>
  </div>
);

export const WhyChooseClearLink = () => {
  const features = [
    {
      icon: <VideoIcon />,
      title: "Crystal-clear HD video",
      desc: "No more pixelation or blurriness – just stunning, lifelike clarity that brings your team closer in meetings."
    },
    {
      icon: <NoiseIcon />,
      title: "Noise-canceling audio",
      desc: "Say goodbye to distractions with our advanced audio tech for crisp, interruption-free conversations."
    },
    {
      icon: <CalenderIcon />,
      title: "Scheduling made easy",
      desc: "Streamline your agenda with ClearLink's intuitive scheduling. Set up meetings, send invitations, and receive reminders in one place."
    },
    {
      icon: <SecurityIcon />,
      title: "Bank-grade security",
      desc: "Your privacy is our priority with bank-grade security protocols safeguarding your meetings and data."
    }
  ];

  return (
    <MainContent>
      <section className="font-inter w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 lg:py-16">
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Features List */}
          <div className="flex flex-col gap-12">
            <div className="max-w-2xl my-10">
              <p className="text-blue-600 font-semibold text-sm sm:text-base">The ClearLink Advantage</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-gray-900">
                Why choose ClearLink?
              </h2>
              <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg">
                In a world where connection is everything, ClearLink takes the lead.
                Our cutting-edge video conferencing app offers:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((f, idx) => (
                <Feature key={idx} {...f} />
              ))}
            </div>
          </div>

          {/* People Image Grid */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-lg xl:max-w-xl mx-auto">
            <img
              src={peopleCollage}
              alt="People collage"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
    </MainContent>
  );
};
