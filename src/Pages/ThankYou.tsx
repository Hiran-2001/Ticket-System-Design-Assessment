import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Main Card */}
        <div className="bg-white rounded-t-3xl overflow-hidden shadow-lg">
          {/* Green Header */}
          <div className="h-8 bg-green-600 rounded-t-3xl"></div>
          
          {/* Content */}
          <div className="px-8 py-16 text-center">
            {/* Thank You Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">
              THANK YOU!
            </h1>
            
            {/* Success Message */}
            <p className="text-xl md:text-2xl text-gray-800 mb-6 font-medium">
              Your Registration Has Been Submitted Successfully
            </p>
            
            {/* Email Confirmation Message */}
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-12 max-w-2xl mx-auto">
              A Confirmation Email With Your Event Details Will Be Sent To<br />
              You Shortly. Please Check Your Inbox (And Spam Folder).
            </p>
            
            {/* Return Button */}
            <button
              onClick={()=>navigate("/")}
              className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 shadow-md"
            >
              Return To Homepage
            </button>
          </div>
        </div>
        
        {/* Bottom Green Border */}
        <div className="h-8 bg-green-600 rounded-b-3xl shadow-lg"></div>
      </div>
    </div>
  );
};

export default ThankYou;