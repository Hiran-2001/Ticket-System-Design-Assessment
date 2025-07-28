import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import backgroundImage from "../assets/register-page-bg.png";
import Footer from "../Components/Footer";

interface ThankYouProps {}

const ThankYou = ({}: ThankYouProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <NavBar />
      <div className="w-full flex justify-center items-center py-12 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-3xl h-auto min-h-[16rem] sm:min-h-[18rem] lg:min-h-[22.5rem] overflow-hidden shadow-lg">
          <div className="h-1 sm:h-1.5 lg:h-2 bg-green-600 rounded-t-3xl"></div>
          <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-14 text-center">
            <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-black mb-3 sm:mb-4">
              THANK YOU!
            </h1>
            <p className="text-base sm:text-lg lg:text-2xl text-gray-800 mb-4 sm:mb-6 font-normal">
              Your Registration Has Been Submitted Successfully
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 max-w-xs sm:max-w-md lg:max-w-2xl mx-auto">
              A Confirmation Email With Your Event Details Will Be Sent To<br />
              You Shortly. Please Check Your Inbox (And Spam Folder).
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-block px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 shadow-md text-xs sm:text-sm lg:text-base"
            >
              Return To Homepage
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ThankYou;