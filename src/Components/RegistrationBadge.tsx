import badgeImage from "../assets/badge-image.png";
import badgeBg from "../assets/green-bg.png";

const RegistrationBadge = () => {
  return (
    <div className="min-h-[24rem] sm:min-h-[26rem] lg:min-h-[28rem] rounded-lg flex justify-center p-4 sm:p-6">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl bg-white rounded-t-lg shadow-lg overflow-hidden">
        <div
          className="px-4 sm:px-5 bg-gradient-to-r from-green-500 to-green-800 h-20 sm:h-24 lg:h-[98.60px] text-white p-2 rounded-t-lg flex justify-center items-center"
          style={{ backgroundImage: `url(${badgeBg})`, backgroundSize: 'cover' }}
        >
          <img
            src={badgeImage}
            alt="GITEX Header"
            className="w-40 sm:w-48 lg:w-60 h-auto object-contain"
          />
        </div>
        <div className="bg-green-700 mx-auto rounded-b-md text-white text-center py-2 w-48 sm:w-56 lg:w-64">
          <h2 className="text-xs sm:text-sm font-semibold">Registration Information 1</h2>
        </div>
        <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 py-4">
          <div className="flex flex-col items-center space-y-3 sm:space-y-4">
            <div className="text-gray-500 text-sm sm:text-base lg:text-lg font-medium uppercase tracking-wider">
              FULL NAME
            </div>
            <div className="text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
              JOB TITLE
            </div>
            <div className="text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
              COMPANY NAME
            </div>
            <div className="text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
              COUNTRY OF RESIDENCE
            </div>
          </div>
          <div className="border border-gray-200">
            <div className="text-center py-2 sm:py-3">
              <h3 className="text-gray-400 text-sm sm:text-base lg:text-lg font-medium uppercase tracking-wider">
                BADGE CATEGORY
              </h3>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-black tracking-wider">
                VISITOR
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationBadge;