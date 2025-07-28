import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import backgroundImage from "../assets/register-page-bg.png"
import Footer from "../Components/Footer";


const ThankYou = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100 flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100%', // Zoom in slightly
      }}
    >
      <NavBar />

      <div className=" w-full flex justify-center items-center py-32">
        <div className="bg-white rounded-lg w-[824px] h-[360px] overflow-hidden">
          <div className="h-2 bg-green-600 rounded-t-3xl"></div>

          <div className="px-8 py-14 text-center">
            <h1 className="text-xl md:text-3xl font-bold text-black mb-4">
              THANK YOU!
            </h1>

            <p className="text-xl md:text-2xl text-gray-800 mb-6 font-normal">
              Your Registration Has Been Submitted Successfully
            </p>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
              A Confirmation Email With Your Event Details Will Be Sent To<br />
              You Shortly. Please Check Your Inbox (And Spam Folder).
            </p>

            <button
              onClick={() => navigate("/")}
              className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 shadow-md"
            >
              Return To Homepage
            </button>
          </div>
        </div>


      </div>
      <Footer/>
    </div>
  );
};

export default ThankYou;