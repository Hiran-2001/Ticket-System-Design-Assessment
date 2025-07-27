// import React from 'react';
// import TicketCard from '../Components/TicketCard';
// import NavBar from '../Components/NavBar';
// import Footer from '../Components/Footer';

// const TicketLayout = () => {
//   const tickets = [
//     {
//       title: "VISITOR 3 DAY ACCESS TICKET",
//       price: "32.5",
//       backgroundColor: "bg-purple-600",
//       features: [
//         "Access to Conventions & Investor Lounge",
//         "Network Events",
//         "All Conference Tracks",
//         "All Masterclasses",
//         "3 Days Access to the Show",
//         "Access to Dubai Internet City Lounge"
//       ]
//     },
//     {
//       title: "VISITOR 3 DAY ACCESS TICKET",
//       price: "FREE",
//       originalPrice: "USD 32.5",
//       backgroundColor: "bg-orange-600",
//       features: [
//         "Access to Conventions & Investor Lounge",
//         "Network Events",
//         "All Conference Tracks",
//         "All Masterclasses",
//         "3 Days Access to the Show",
//         "Access to Dubai Internet City Lounge"
//       ],
//       vatText: "Incl. VAT"
//     },
//     {
//       title: "VISITOR 3 DAY ACCESS TICKET",
//       price: "FREE",
//       originalPrice: "USD 32.5",
//       backgroundColor: "bg-green-800",
//       isExclusive: true,
//       features: [
//         "Access to Conventions & Investor Lounge",
//         "Network Events",
//         "All Conference Tracks",
//         "All Masterclasses",
//         "3 Days Access to the Show",
//         "Access to Dubai Internet City Lounge"
//       ],
//       vatText: "Incl. VAT"
//     },
//     {
//       title: "VISITOR 3 DAY ACCESS TICKET",
//       price: "FREE",
//       originalPrice: "USD 32.5",
//       backgroundColor: "bg-red-600",
//       features: [
//         "Access to Conventions & Investor Lounge",
//         "Network Events",
//         "All Conference Tracks",
//         "All Masterclasses",
//         "3 Days Access to the Show",
//         "Access to Dubai Internet City Lounge"
//       ],
//       vatText: "Incl. VAT"
//     },
//     {
//       title: "VISITOR 3 DAY ACCESS TICKET",
//       price: "FREE",
//       originalPrice: "USD 32.5",
//       backgroundColor: "bg-green-600",
//       features: [
//         "Access to Conventions & Investor Lounge",
//         "Network Events",
//         "All Conference Tracks",
//         "All Masterclasses",
//         "3 Days Access to the Show",
//         "Access to Dubai Internet City Lounge"
//       ],
//       vatText: "Incl. VAT"
//     },
//     {
//       title: "VISITOR 3 DAY ACCESS TICKET",
//       price: "FREE",
//       originalPrice: "USD 32.5",
//       backgroundColor: "bg-blue-600",
//       features: [
//         "Access to Conventions & Investor Lounge",
//         "Network Events",
//         "All Conference Tracks",
//         "All Masterclasses",
//         "3 Days Access to the Show",
//         "Access to Dubai Internet City Lounge"
//       ],
//       vatText: "Incl. VAT"
//     }
//   ];

//       //  bg-gradient-to-br from-green-400 via-green-500 to-green-600


//   return (
//     <div className="relative min-h-screen bg-red-800">
//       <NavBar />
//       {/* Pixelated background pattern */}
//       {/* <div className="absolute inset-0 opacity-20">
//         <div className="w-full h-full" style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Crect x='0' y='0' width='20' height='20'/%3E%3Crect x='20' y='20' width='20' height='20'/%3E%3C/g%3E%3C/svg%3E")`,
//           backgroundSize: '40px 40px'
//         }}></div>
//       </div> */}



//       <div className="relative bg-white max-w-full px-[88px] py-[70px]">
//         {/* Ticket Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-3">
//           {tickets.map((ticket, index) => (
//             <TicketCard key={index} {...ticket} />
//           ))}
//         </div>

//       </div>
//       <div className='mb-24'>
//         <Footer />
//       </div>


//       <div className="fixed bottom-0 left-0 right-0 bg-green-700 p-6 flex items-center justify-between">
//         <div className="text-white">
//           <div className="text-sm opacity-90 mb-1">View Ticket Summary</div>
//           <div className="flex items-center">
//             <span className="text-sm mr-2">Total:</span>
//             <span className="text-3xl font-bold mr-2">EUR 0</span>
//             <span className="text-sm opacity-90">Incl. 19% VAT</span>
//           </div>
//         </div>

//         <button className="bg-white text-green-700 px-8 py-3 rounded font-bold hover:bg-gray-100 transition-colors">
//           Buy Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TicketLayout;

import React from 'react';
import TicketCard from '../Components/TicketCard';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import crowdImage from '../assets/crowd-party.jpg'
import conference from '../assets/conference.png'
import showImage from '../assets/show-image.jpg'

const TicketLayout = () => {
  const tickets = [
    {
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "32.5",
      originalPrice: "USD 32.5",
      backgroundColor: 'from-purple-700 to-purple-900',
      backroundImage: conference,
      isExclusive: false,
      isBestSeller: false,
      features: [
        "Access to Conventions & Investor Lounge",
        "Network Events",
        "All Conference Tracks",
        "All Masterclasses",
        "3 Days Access to the Show",
        "Access to Dubai Internet City Lounge"
      ]
    },
    {
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "FREE",
      originalPrice: "USD 32.5",
      backgroundColor: 'from-orange-700 to-orange-900',
      backroundImage: crowdImage,
      isExclusive: false,
      isBestSeller: false,
      features: [
        "Access to Conventions & Investor Lounge",
        "Network Events",
        "All Conference Tracks",
        "All Masterclasses",
        "3 Days Access to the Show",
        "Access to Dubai Internet City Lounge"
      ],
      vatText: "Incl. VAT"
    },
    {
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "FREE",
      originalPrice: "USD 32.5",
      backgroundColor: 'from-green-700 to-green-900',
      backroundImage: showImage,
      isExclusive: true,
      isBestSeller: false,
      features: [
        "Access to Conventions & Investor Lounge",
        "Network Events",
        "All Conference Tracks",
        "All Masterclasses",
        "3 Days Access to the Show",
        "Access to Dubai Internet City Lounge"
      ],
      vatText: "Incl. VAT"
    },
    {
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "FREE",
      originalPrice: "USD 32.5",
      backgroundColor: 'from-red-700 to-red-900',
      backroundImage: crowdImage,
      isExclusive: false,
      isBestSeller: true,
      features: [
        "Access to Conventions & Investor Lounge",
        "Network Events",
        "All Conference Tracks",
        "All Masterclasses",
        "3 Days Access to the Show",
        "Access to Dubai Internet City Lounge"
      ],
      vatText: "Incl. VAT"
    },
    {
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "FREE",
      originalPrice: "USD 32.5",
      backgroundColor: 'from-lime-600 to-green-700',
      backroundImage: crowdImage,
      isExclusive: false,
      isBestSeller: false,
      features: [
        "Access to Conventions & Investor Lounge",
        "Network Events",
        "All Conference Tracks",
        "All Masterclasses",
        "3 Days Access to the Show",
        "Access to Dubai Internet City Lounge"
      ],
      vatText: "Incl. VAT"
    },
    {
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "FREE",
      originalPrice: "USD 32.5",
      backgroundColor: 'from-blue-700 to-blue-900',
      backroundImage: showImage,
      isExclusive: false,
      isBestSeller: false,
      features: [
        "Access to Conventions & Investor Lounge",
        "Network Events",
        "All Conference Tracks",
        "All Masterclasses",
        "3 Days Access to the Show",
        "Access to Dubai Internet City Lounge"
      ],
      vatText: "Incl. VAT"
    }
  ];

  return (
    <div className="relative min-h-screen bg-red-800">
      <NavBar />

      {/* Main Content with Extra Padding for Fixed Footer */}
      <div className="relative bg-white max-w-full px-[88px] pt-[70px] pb-[120px]">
        {/* Ticket Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-3">
          {tickets.map((ticket, index) => (
            <TicketCard key={index} {...ticket} />
          ))}
        </div>
      </div>

      {/* Footer (Optional — move this outside if fixed bar replaces it) */}
      <div className="mb-24">
        <Footer />
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-700 p-6 flex items-center justify-between z-50">
        <div className="text-white">
          <div className="text-sm opacity-90 mb-1">View Ticket Summary</div>
          <div className="flex items-center">
            <span className="text-sm mr-2">Total:</span>
            <span className="text-3xl font-bold mr-2">EUR 0</span>
            <span className="text-sm opacity-90">Incl. 19% VAT</span>
          </div>
        </div>

        <button className="bg-white text-green-700 px-8 py-3 rounded font-bold hover:bg-gray-100 transition-colors">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default TicketLayout;
