import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gitex from '../assets/GITEX.png';

const TicketCard = ({
  title,
  price,
  isFree,
  backgroundColor,
  backroundImage,
  isExclusive,
  isBestSeller,
  features,
}: any) => {
  const [tickets, setTickets] = useState(25);
  const navigate = useNavigate();

  const handleIncrement = () => setTickets((prev) => prev + 1);
  const handleDecrement = () => setTickets((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="relative w-full max-w-[445px] mx-auto h-auto min-h-[340px] sm:min-h-[360px] lg:min-h-[380px] rounded-3xl overflow-hidden shadow-lg text-white flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
        style={{ backgroundImage: `url(${backroundImage})`, zIndex: 0 }}
      ></div>
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="absolute left-[-12px] sm:left-[-16px] top-1/2 transform -translate-y-1/2 w-6 sm:w-8 h-6 sm:h-8 bg-white rounded-full z-20"></div>
      <div className="absolute right-[-12px] sm:right-[-16px] top-1/2 transform -translate-y-1/2 w-6 sm:w-8 h-6 sm:h-8 bg-white rounded-full z-20"></div>

      {(isBestSeller || isExclusive) && (
        <div className="absolute top-0 left-0 z-30">
          <div
            className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-green-300 to-green-700"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            }}
          ></div>
          {isBestSeller && (
            <div className="absolute top-2 sm:top-3 left-1 sm:left-2 right-2 sm:right-3 bottom-3 sm:bottom-4 rotate-[-45deg] text-white text-xs sm:text-sm font-bold leading-tight text-center w-16 sm:w-20 z-40">
              <div>BEST</div>
              <div>SELLER</div>
            </div>
          )}
          {isExclusive && (
            <div className="absolute top-4 sm:top-5 left-4 sm:left-5 right-2 sm:right-3 bottom-3 sm:bottom-4 rotate-[-45deg] text-white text-xs sm:text-sm font-bold leading-tight text-center w-16 sm:w-20 z-40">
              <div>EXCLUSIVE</div>
            </div>
          )}
        </div>
      )}

      <div
        className={`relative z-20 bg-gradient-to-r ${backgroundColor} ${
          isBestSeller || isExclusive ? 'px-12 sm:px-20 lg:px-24 py-3 sm:py-4 pt-4 sm:pt-6' : 'px-4 sm:px-6 lg:px-8 py-3 sm:py-4 pt-4 sm:pt-6'
        }`}
      >
        <h2 className="text-xs sm:text-sm font-bold uppercase">{title}</h2>
        <p className="text-[10px] sm:text-xs text-yellow-300 mt-1 font-semibold">VIEW DETAILS →</p>
      </div>

      <div className="relative z-20 px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3">
        <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${!isFree ? 'mt-8 sm:mt-10' : ''}`}>
          Visitor Passes provide <span className="text-green-400 font-semibold">3 DAYS ACCESS</span> to GITEX NIGERIA
          exhibition and all free conference
        </p>
        {isFree ? (
          <ul className="flex flex-wrap text-[10px] sm:text-xs gap-2 sm:gap-3">
            {features.map((item: any, idx: number) => (
              <li
                key={idx}
                className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap w-fit max-w-full mr-2 mb-2"
              >
                <div
                  className={`w-3 sm:w-4 h-3 sm:h-4 rounded-full flex items-center justify-center text-[8px] sm:text-xs ${
                    item?.isActive ? 'bg-green-600 text-black' : 'bg-green-500/20 text-white/10'
                  }`}
                >
                  ✓
                </div>
                <span className={`${item?.isActive ? 'text-white' : 'text-white/10'}`}>{item.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-20 sm:h-24 lg:h-[100px]">
            <img className="w-28 sm:w-32 lg:w-36 object-contain" src={gitex} alt="GITEX Logo" />
          </div>
        )}
      </div>

      <div className="relative z-20 flex justify-between items-center py-2 sm:py-3 mt-2 sm:mt-3 mx-4 sm:mx-6 lg:mx-8">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white to-transparent"></div>
        {isFree ? (
          <div className="flex w-full justify-between py-2 items-center">
            <div>
              <p className="text-xs sm:text-sm font-bold">FREE</p>
              <p className="text-[10px] sm:text-xs font-thin text-gray-400">INCL. 19% VAT</p>
            </div>
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-black text-xs sm:text-sm font-semibold px-3 sm:px-4 h-7 sm:h-8 rounded"
            >
              BUY NOW
            </button>
          </div>
        ) : (
          <div className="flex w-full justify-between py-2 items-center">
            <div className="flex items-center space-x-2 relative">
              <div className="relative inline-flex items-center">
                <p className="text-xs sm:text-sm font-bold text-white mr-1">USD</p>
                <p className="text-xs sm:text-sm font-bold text-gray-400">43</p>
                <div className="absolute left-5 sm:left-6 top-1/2 w-8 sm:w-10 h-[2px] bg-red-500 rotate-[-25deg] -translate-y-1/2 pointer-events-none"></div>
              </div>
              <p className="text-xs sm:text-sm font-bold bg-black px-2 py-0.5 rounded border border-white text-white">
                {price}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-300 ml-1">Incl. 20% VAT</p>
            </div>
            <div className="bg-white rounded-md h-7 sm:h-8 border border-white flex items-center">
              <button
                onClick={handleDecrement}
                className="bg-black text-white text-xs sm:text-sm font-semibold px-2 h-full rounded-l-md"
              >
                -
              </button>
              <span className="px-2 sm:px-3 text-black text-xs sm:text-sm font-bold">{tickets}</span>
              <button
                onClick={handleIncrement}
                className="bg-black text-white text-xs sm:text-sm font-semibold px-2 h-full rounded-r-md"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
