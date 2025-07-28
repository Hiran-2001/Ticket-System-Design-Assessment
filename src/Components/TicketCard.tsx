

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gitex from "../assets/GITEX.png"
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
    const [tickets, setTickets] = useState(25)

    const navigate = useNavigate()
    return (
        <div className="relative w-[445px] h-[380px] rounded-[25px] overflow-hidden shadow-lg text-white flex flex-col">
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
                style={{ backgroundImage: `url(${backroundImage})`, zIndex: 0 }}
            ></div>

            <div className="absolute inset-0 bg-black/50 z-10"></div>

            <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

            <div className="absolute left-[-22px] top-1/2 transform -translate-y-1/2 w-11 h-11 bg-white rounded-full z-20"></div>

            <div className="absolute right-[-22px] top-1/2 transform -translate-y-1/2 w-11 h-11 bg-white rounded-full z-20"></div>

            {(isBestSeller || isExclusive) && <div className="absolute top-0 left-0 z-30">
                <div
                    className="w-[100px] h-[100px] bg-gradient-to-br from-green-300 to-green-700"
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                    }}
                ></div>
                {isBestSeller && <div className="absolute top-2 left-1 right-2 bottom-3 rotate-[-45deg] text-white text-[16px] font-bold leading-tight text-center w-20 z-40">
                    <div>BEST</div>
                    <div>SELLER</div>
                </div>}
                {isExclusive && <div className="absolute top-5 left-5 right-2 bottom-3 rotate-[-45deg] text-white text-[16px] font-bold leading-tight text-center w-20 z-40">
                    <div>EXCLUSIVE</div>
                </div>}
            </div>}

            <div className={`relative z-20 bg-gradient-to-r ${backgroundColor} ${(isBestSeller || isExclusive) ? 'px-24 py-4 pt-6' : 'px-8 py-4 pt-6'} `}>
                <h2 className="text-sm font-bold uppercase">{title}</h2>
                <p className="text-xs text-yellow-300 mt-1 font-semibold">VIEW DETAILS →</p>
            </div>

            <div className="relative z-20 px-8 pt-2">
                <p className={`text-sm mb-4 ${!isFree ? 'mt-11' : ''} `}>
                    Visitor Passes provide <span className="text-green-400 font-semibold">3 DAYS ACCESS</span> to GITEX NIGERIA
                    exhibition and all free conference
                </p>
                {
                    isFree ?
                        <ul className="flex flex-wrap text-sm">
                            {features.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full whitespace-nowrap w-fit max-w-full mr-2 mb-2"
                                >
                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${item?.isActive
                                        ? 'bg-green-600 text-black'
                                        : 'bg-green-500/20 text-white/10'
                                        }`}>
                                        ✓
                                    </div>
                                    <span className={`${item?.isActive ? 'text-white' : 'text-white/10'}`}>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                        :
                        <div className="h-[100px]">
                            <img
                                className="w-36 object-contain"
                                src={gitex}
                                alt=""
                            />
                        </div>
                }



            </div>

            <div className="relative z-20 flex justify-between items-center py-3 mt-3 mx-8">

                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white to-transparent"></div>

                {isFree ? <div className=' flex w-full justify-between py-2'>
                    <div>
                        <p className="text-sm font-bold">FREE</p>
                        <p className="text-xs font-thin text-gray-400">INCL. 19% VAT</p>
                    </div>
                    <button onClick={() => navigate('/register')} className="bg-white text-black text-sm font-semibold px-4 h-8 rounded">
                        BUY NOW
                    </button>
                </div>
                    :
                    <div className='flex w-full justify-between py-2 items-center'>
                        <div className="flex items-center space-x-2 relative">
                            <div className="relative inline-flex items-center">
                                <p className="text-sm font-bold text-white mr-1">USD</p>
                                <p className="text-sm font-bold text-gray-400">43</p>

                                <div className="absolute left-5 top-1/2 w-[40px] h-[2px] bg-red-500 rotate-[-25deg] -translate-y-1/2 pointer-events-none"></div>
                            </div>

                            <p className="text-sm font-bold bg-black px-2 py-0.5 rounded border border-white text-white">{price}</p>
                            <p className="text-xs text-gray-300 ml-1">Incl. 20% VAT</p>
                        </div>

                        <div className='bg-white rounded-md h-full border border-white'>
                            <button onClick={() => navigate('/register')} className="bg-black text-white text-sm font-semibold px-2 h-7 rounded-l-md">
                                -
                            </button>

                            <span className='px-3 text-black text-sm font-bold'>{tickets}</span>

                            <button onClick={() => navigate('/register')} className="bg-black text-white text-sm font-semibold px-2 h-7 rounded-r-md">
                                +
                            </button>
                        </div>

                    </div>}


            </div>
        </div>
    );
}

export default TicketCard;
