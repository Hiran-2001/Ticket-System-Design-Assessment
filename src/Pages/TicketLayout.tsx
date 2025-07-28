
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
      isFree: false,
      backgroundColor: 'from-purple-700 to-purple-900',
      backroundImage: conference,
      isExclusive: false,
      isBestSeller: false,
      features: [
        {text:"Access to Conventions & Investor Lounge",isActive: true},
        {text:"Network Events", isActive:true},
        {text:"All Conference Tracks", isActive:true},
        {text: "All Masterclasses", isActive:true},
        {text:"3 Days Access to the Show", isActive:true},
        {text:"Access to Dubai Internet City Lounge", isActive:true},     
      ],
    },
    {
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "FREE",
      isFree: true,
      backgroundColor: 'from-orange-700 to-orange-900',
      backroundImage: crowdImage,
      isExclusive: false,
      isBestSeller: false,
      features: [
        {text:"Access to Conventions & Investor Lounge",isActive: true},
        {text:"Network Events", isActive:true},
        {text:"All Conference Tracks", isActive:true},
        {text: "All Masterclasses", isActive:true},
        {text:"3 Days Access to the Show", isActive:true},
        {text:"Access to Dubai Internet City Lounge", isActive:true},     
      ],
      vatText: "Incl. VAT"
    },
    {
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "FREE",
      isFree: true,
      backgroundColor: 'from-green-700 to-green-900',
      backroundImage: showImage,
      isExclusive: true,
      isBestSeller: false,
      features: [
        {text:"Access to Conventions & Investor Lounge",isActive: true},
        {text:"Network Events", isActive:true},
        {text:"All Conference Tracks", isActive:true},
        {text: "All Masterclasses", isActive:true},
        {text:"3 Days Access to the Show", isActive:false},
        {text:"Access to Dubai Internet City Lounge", isActive:false},     
      ],
      vatText: "Incl. VAT"
    },
    {
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "FREE",
      isFree: true,
      backgroundColor: 'from-red-700 to-red-900',
      backroundImage: crowdImage,
      isExclusive: false,
      isBestSeller: true,
     features: [
        {text:"Access to Conventions & Investor Lounge",isActive: true},
        {text:"Network Events", isActive:true},
        {text:"All Conference Tracks", isActive:true},
        {text: "All Masterclasses", isActive:true},
        {text:"3 Days Access to the Show", isActive:true},
        {text:"Access to Dubai Internet City Lounge", isActive:true},     
      ],
      vatText: "Incl. VAT"
    },
    {
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "FREE",
      isFree: true,
      backgroundColor: 'from-lime-600 to-green-700',
      backroundImage: crowdImage,
      isExclusive: false,
      isBestSeller: false,
      features: [
        {text:"Access to Conventions & Investor Lounge",isActive: true},
        {text:"Network Events", isActive:true},
        {text:"All Conference Tracks", isActive:true},
        {text: "All Masterclasses", isActive:true},
        {text:"3 Days Access to the Show", isActive:true},
        {text:"Access to Dubai Internet City Lounge", isActive:true},     
      ],
      vatText: "Incl. VAT"
    },
    {
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "FREE",
      isFree: true,
      backgroundColor: 'from-blue-700 to-blue-900',
      backroundImage: showImage,
      isExclusive: false,
      isBestSeller: false,
      features: [
        {text:"Access to Conventions & Investor Lounge",isActive: true},
        {text:"Network Events", isActive:true},
        {text:"All Conference Tracks", isActive:true},
        {text: "All Masterclasses", isActive:true},
        {text:"3 Days Access to the Show", isActive:false},
        {text:"Access to Dubai Internet City Lounge", isActive:false},     
      ],
      vatText: "Incl. VAT"
    }
  ];

  return (
    <div className="relative min-h-screen bg-red-800">
      <NavBar />

      <div className="relative bg-white max-w-full px-[88px] pt-[70px] pb-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-3">
          {tickets.map((ticket, index) => (
            <TicketCard key={index} {...ticket} />
          ))}
        </div>
      </div>

      <div className="mb-24">
        <Footer />
      </div>

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
