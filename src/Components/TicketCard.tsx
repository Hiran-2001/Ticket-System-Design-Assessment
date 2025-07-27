// import crowdImage from '../assets/crowd-party.jpg'
// export default function TicketCard() {


//     return (
//         <div className="relative w-[445px] h-[380px] rounded-[25px] overflow-hidden shadow-lg bg-violet-600 text-white">


//             {/* Semi-circle Left */}
//             <div className="absolute left-[-22px] top-[202px] transform -translate-y-1/2 w-11 h-11 bg-white rounded-full"></div>

//             {/* Semi-circle Right */}
//             <div className="absolute right-[-22px] top-[202px] transform -translate-y-1/2 w-11 h-11 bg-white rounded-full"></div>

//             {/* Diagonal Ribbon */}
//             <div className="absolute text-white text-lg font-bold transform -rotate-65 origin-center w-24 text-center">

//                 <div className="absolute top-0 left-0 w-0 h-0 z-20 border-t-8" style={{
//                     borderTop: '100px solid #10b981',
//                     borderRight: '100px solid transparent'
//                 }}></div>

//                 {/* Tag Text */}
//                 <div className="absolute top-2 left-2 text-white text-xs font-bold transform -rotate-45 origin-center z-30 w-16 text-center">
//                     <div className="transform translate-x-1 translate-y-3">
//                         <div>BEST</div>
//                         <div>SELLER</div>
//                     </div>
//                 </div>
//             </div >

//             {/* Top Bar */}
//             <div className="bg-gradient-to-r from-green-700 to-green-900 pl-28 py-3 pt-6">
//                 <h2 className="text-sm font-bold uppercase">VISITOR 3 DAY ACCESS TICKET</h2>
//                 <p className="text-xs text-yellow-300 mt-1 font-semibold">VIEW DETAILS →</p>
//             </div>

//             {/* Body */}
//             {/* <div className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/your-background.jpg')" }}>
//                 <div className="bg-black/60 px-4 pt-4 pb-6">
//                     <p className="text-sm mb-4">
//                         Visitor Passes provide <span className="text-green-400 font-semibold">3 DAYS ACCESS</span> to GITEX NIGERIA
//                         exhibition and all free conference
//                     </p>

//                     <ul className="space-y-2 text-sm">
//                         {[
//                             { text: 'Access to ConneXions & Investor Lounge', active: true },
//                             { text: 'Network Events', active: true },
//                             { text: 'All Conference Tracks', active: true },
//                             { text: 'All Masterclasses', active: true },
//                             { text: '3 Days Access to the Show', active: false },
//                             { text: 'Access to Dubai Internet City Lounge', active: false },
//                         ].map((item, idx) => (
//                             <li
//                                 key={idx}
//                                 className={`flex items-center gap-2 px-3 py-2 rounded-full ${item.active ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-500 line-through'
//                                     }`}
//                             >
//                                 <span className={item.active ? 'text-green-400' : 'text-gray-500'}>✅</span>
//                                 <span>{item.text}</span>
//                             </li>
//                         ))}
//                     </ul>

//                 </div>
//             </div> */}

//             <div className="bg-blue-700 px-4 pt-4 pb-6"
//                 // style={{ backgroundImage: `url(${crowdImage})`, height: "380px", width: "445px" }}
//             >
//                 <p className="text-sm mb-4">
//                     Visitor Passes provide <span className="text-green-400 font-semibold">3 DAYS ACCESS</span> to GITEX NIGERIA
//                     exhibition and all free conference
//                 </p>

//                 <ul className="space-y-2 text-sm">
//                     {[
//                         'Access to ConneXions & Investor Lounge',
//                         'Network Events',
//                         // 'All Conference Tracks',
//                         // 'All Masterclasses',
//                         // '3 Days Access to the Show',
//                         // 'Access to Dubai Internet City Lounge',
//                     ].map((text, idx) => (
//                         <li key={idx} className="flex items-center gap-2 bg-white bg-opacity-10 px-3 py-2 rounded-full">
//                             <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-2">
//                                 <span className="text-white text-xs">✓</span>
//                             </div>
//                             <span>{text}</span>
//                         </li>
//                     ))}
//                 </ul>


//             </div>

//             {/* Footer */}
//             <div className="flex justify-between items-center mt-16 px-4 py-3 bg-red-600 border-t border-gray-700">
//                 <div>
//                     <p className="text-lg font-bold">FREE</p>
//                     <p className="text-xs text-gray-400">INCL. 19% VAT</p>
//                 </div>
//                 <button className="bg-white text-black text-sm font-semibold px-4 py-2 rounded">
//                     BUY NOW
//                 </button>
//             </div>
//         </div>
//     );



// }

interface TicketCardProps {
    title: string;
    price: string;
    originalPrice?: string;
    backgroundColor: string;
    backroundImage: any,
    isExclusive: boolean,
    isBestSeller: boolean,
    features: string[];
    vatText?: string;
}

import { useNavigate } from 'react-router-dom';
import crowdImage from '../assets/crowd-party.jpg'
const TicketCard: React.FC<TicketCardProps> = ({
    title,
    price,
    originalPrice,
    backgroundColor,
    backroundImage,
    isExclusive,
    isBestSeller,
    features,
    vatText
}) => {

    const navigate = useNavigate()
    return (
        <div className="relative w-[445px] h-[380px] rounded-[25px] overflow-hidden shadow-lg text-white">
            {/* Blurred Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
                style={{ backgroundImage: `url(${backroundImage})`, zIndex: 0 }}
            ></div>

            {/* Overlay to darken image */}
            <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

            {/* Semi-circle Left */}
            <div className="absolute left-[-22px] top-1/2 transform -translate-y-1/2 w-11 h-11 bg-white rounded-full z-20"></div>

            {/* Semi-circle Right */}
            <div className="absolute right-[-22px] top-1/2 transform -translate-y-1/2 w-11 h-11 bg-white rounded-full z-20"></div>

            {/* BEST SELLER Ribbon */}
            {(isBestSeller || isExclusive) && <div className="absolute top-0 left-0 z-30">
                <div
                    className="w-0 h-0"
                    style={{
                        borderTop: '100px solid #10b981',
                        borderRight: '100px solid transparent',
                    }}
                ></div>
                {isBestSeller && <div className="absolute top-4 left-1 rotate-[-45deg] text-white text-[10px] font-bold leading-tight text-center w-20 z-40">
                    <div>BEST</div>
                    <div>SELLER</div>
                </div>}
                {isExclusive && <div className="absolute top-4 left-1 rotate-[-45deg] text-white text-[10px] font-bold leading-tight text-center w-20 z-40">
                    <div>EXCLUSIVE</div>
                </div>}
            </div>}

            {/* Top Bar */}
            <div className={`relative z-20 bg-gradient-to-r ${backgroundColor} px-24 py-4 pt-6`}>
                <h2 className="text-sm font-bold uppercase">VISITOR 3 DAY ACCESS TICKET</h2>
                <p className="text-xs text-yellow-300 mt-1 font-semibold">VIEW DETAILS →</p>
            </div>

            {/* Body */}
            <div className="relative z-20 px-4 pt-4 pb-6">
                <p className="text-sm mb-4">
                    Visitor Passes provide <span className="text-green-400 font-semibold">3 DAYS ACCESS</span> to GITEX NIGERIA
                    exhibition and all free conference
                </p>

                <ul className="space-y-2 text-sm">
                    {[
                        { text: 'Access to ConneXions & Investor Lounge', active: true },
                        { text: 'Network Events', active: true },
                        // { text: 'All Conference Tracks', active: true },
                        // { text: 'All Masterclasses', active: true },
                        // { text: '3 Days Access to the Show', active: true },
                        // { text: 'Access to Dubai Internet City Lounge', active: true },
                    ].map((item, idx) => (
                        <li
                            key={idx}
                            className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full"
                        >
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                                ✓
                            </div>
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer */}
            <div className="relative z-20 flex justify-between items-center px-4 py-3 mt-2">
                <div>
                    <p className="text-lg font-bold">FREE</p>
                    <p className="text-xs text-gray-300">INCL. 19% VAT</p>
                </div>
                <button onClick={() => navigate('/register')} className="bg-white text-black text-sm font-semibold px-4 py-2 rounded">
                    BUY NOW
                </button>
            </div>
        </div>
    );
}

export default TicketCard;
