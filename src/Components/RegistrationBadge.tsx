import badgeImage from "../assets/badge-image.png"
import badgeBg from "../assets/green-bg.png"
const RegistrationBadge = () => {



  return (
    <div className=" min-h-96 rounded-lg bg-red-900 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-t-lg shadow-lg overflow-hidden">
        <div
        className='px-5 bg-green-800 bg-linear-to-r from-green-500 to-green-800 h-[98.60px] text-white p-2 rounded-t-lg flex justify-between items-center'
          style={{ backgroundImage: `url(${badgeBg})`, objectFit: 'fill' }}
        >
          <img
            src={badgeImage}
            alt="GITEX Header"
            className="w-60 h-auto object-cover"
          />
        </div>


        <div className="bg-green-700 mx-24 rounded-b-md text-white text-center py-2 w-64">
          <h2 className="text-sm font-semibold">Registration Information 1</h2>
        </div>

        <div className=" space-y-8">
          <div className="flex flex-col items-center space-y-4 mt-4">
            <div className="text-gray-500 text-lg font-medium uppercase tracking-wider">
              FULL NAME
            </div>

            <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">
              JOB TITLE
            </div>

            <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">
              COMPANY NAME
            </div>

            <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">
              COUNTRY OF RESIDENCE
            </div>
          </div>

          <div className="border border-gray-200">
            <div className="text-center py-3">
              <h3 className="text-gray-400 text-lg font-medium uppercase tracking-wider">
                BADGE CATEGORY
              </h3>
              <div className="text-2xl font-bold text-black tracking-wider">
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