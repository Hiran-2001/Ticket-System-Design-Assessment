import TicketCard from '../Components/TicketCard';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import { tickets } from '../constants/TicketDetails';
import { useTicketContext } from '../context/TicketContext';


const TicketLayout = () => {
    const { totalEUR ,selectedTickets} = useTicketContext();
    const navigate = useNavigate()
    
    const totalAttendees = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);

    const buyNow=()=>{
      if(totalAttendees === 0) {
       alert('Please select at least one ticket');
       return
      }
      navigate('register')
    }

    
  
  return (
    <div className="relative min-h-screen">
      <NavBar />
      <div className="relative bg-white w-full px-4 sm:px-6 lg:px-16 pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-4 sm:gap-y-6">
          {tickets.map((ticket, index) => (
            <TicketCard
              key={index}
              index={index}
              {...ticket}
            />
          ))}
        </div>
      </div>
      <div className="pb-16 sm:pb-20 lg:pb-24">
        <Footer />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-green-700 p-4 sm:p-6  flex flex-col sm:flex-row items-center justify-end z-50">
        <div className="text-white mb-3 sm:mb-0 sp  flex space-x-16 mr-10">
          <div className="flex-col items-center">
            <div>
              <span className="text-lg font-semibold sm:text-lg mr-2">Total:</span>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold mr-2">
                EUR {totalEUR}
              </span>
              <span className="text-lg font-semibold sm:text-lg opacity-90">Incl. 19% VAT</span>
            </div>

            <div onClick={() => navigate('/ticket-summary')}  className="text-xs sm:text-sm opacity-90 mb-1 cursor-pointer">
              <p>View Ticket Summary</p>
            </div>
          </div>
          <button onClick={buyNow} className="bg-white text-green-700 sm:px-8  rounded font-bold hover:bg-gray-100 transition-colors text-lg sm:text-lg">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketLayout;