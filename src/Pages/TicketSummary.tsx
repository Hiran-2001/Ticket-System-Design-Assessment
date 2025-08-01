import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { tickets } from '../constants/TicketDetails';
import { useTicketContext } from '../context/TicketContext';
import backgroundImage from '../assets/register-page-bg.png';

const TicketSummary = () => {
  const { selectedTickets, totalEUR, attendee } = useTicketContext();
  const navigate = useNavigate();
  const totalAttendees = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);

  useEffect(() => {
    if (totalAttendees === 0) {
      alert('Please select at least one ticket');
      navigate('/');
      return;
    }
  }, [totalAttendees, navigate]);

  const ticketSummary = tickets
    .map((ticket, index) => ({
      index,
      title: ticket.title,
      quantity: selectedTickets[index] || 0,
      price: ticket.isFree ? 0 : ticket.price * 0.91,
    }))
    .filter(item => item.quantity > 0);

  const hasAttendeeDetails = (attendee: any) => {
    return attendee?.firstName?.trim() || attendee?.lastName?.trim() || attendee?.emailAddress?.trim();
  };

  const isAssigned = attendee && hasAttendeeDetails(attendee);

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavBar loginBtn={true} />
      <div className="flex justify-center items-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-green-950">
          <div className="bg-gradient-to-r from-green-500 to-green-800 text-white p-4 rounded-t-lg">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Ticket Summary</h2>
          </div>
          <div className="p-4 sm:p-6">
            {ticketSummary.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Selected Tickets</h3>
                  <div className="space-y-4">
                    {ticketSummary.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-lg font-semibold text-gray-700">{item.title}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <p className="text-lg font-semibold text-gray-700">
                            {item.price === 0 ? 'FREE' : `EUR ${(item.quantity * item.price).toFixed(2)}`}
                          </p>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              Assigned: {isAssigned ? item.quantity : 0} / {item.quantity}
                            </span>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                isAssigned ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {isAssigned ? 'Fully Assigned' : 'Not Assigned'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-6 pt-4">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold text-gray-700">Total (incl. 9% VAT)</p>
                      <p className="text-xl font-bold text-gray-700">
                        {totalEUR === 0 ? 'FREE' : `EUR ${totalEUR.toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Attendee Assignments</h3>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">All Tickets</h4>
                    <div className="border-b border-gray-100 pb-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">Attendee</span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            isAssigned ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {isAssigned ? 'Assigned' : 'Not Assigned'}
                        </span>
                      </div>
                      {attendee && hasAttendeeDetails(attendee) ? (
                        <div className="mt-1 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">Name:</span> {attendee.firstName} {attendee.lastName}
                          </p>
                          <p>
                            <span className="font-medium">Email:</span> {attendee.emailAddress || 'Not provided'}
                          </p>
                        </div>
                      ) : (
                        <p className="mt-1 text-sm text-gray-500 italic">Details pending</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Assignment Summary</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Total Attendees:</span>
                        <span>{totalAttendees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assigned:</span>
                        <span>{isAssigned ? totalAttendees : 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Unassigned:</span>
                        <span className={isAssigned ? '' : 'text-red-600 font-medium'}>
                          {isAssigned ? 0 : totalAttendees}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600">No tickets selected.</p>
            )}
            <div className="mt-8 flex justify-between gap-3">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 border-[2px] border-gray-600 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium"
              >
                Back to Tickets
              </button>
              <div className="flex gap-3">
                {!isAssigned && (
                  <div className="flex items-center text-sm text-red-600 mr-4">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {totalAttendees} attendee(s) unassigned
                  </div>
                )}
                <button
                  onClick={() => navigate('/register')}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-900 text-white rounded-md text-sm font-medium hover:from-green-700 hover:to-green-800"
                  disabled={ticketSummary.length === 0}
                >
                  Proceed to Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TicketSummary;