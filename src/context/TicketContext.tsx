import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { tickets } from "../constants/TicketDetails";

interface Ticket {
  price: number;
  isFree: boolean;
  title: string;
}

interface AttendeeData {
  firstName: string;
  lastName: string;
  countryOfResidence: string;
  region:string;
  emailAddress: string;
  confirmEmailAddress: string;
  nationality: string;
  mobileNumber: string;
  countryCode: string;
  companyName: string;
  jobTitle: string;
  companyType: string;
  industry: string;
  selectedWorkshops: string[];
  selectedServices: string[];
}

interface TicketState {
  selectedTickets: { [index: number]: number };
  setSelectedTickets: (tickets: { [index: number]: number }) => void;
  updateTicket: (index: number, quantity: number) => void;
  totalEUR: number;
  ticketAssignments: { [attendeeIndex: number]: number };
  assignTicket: (attendeeIndex: number, ticketIndex: number) => void;
  getRemainingTickets: (currentAttendeeIndex?: number) => Array<{ index: number; title: string; remaining: number }>;
  getTicketStatus: (currentAttendeeIndex?: number) => Array<{
    index: number;
    title: string;
    totalSelected: number;
    assigned: number;
    remaining: number;
    isCurrentlyAssigned: boolean;
    isAvailable: boolean;
  }>;
  attendees: AttendeeData[];
  setAttendees: (attendees: AttendeeData[]) => void;
  updateAttendee: (attendeeIndex: number, data: Partial<AttendeeData>) => void;
}

const USD_TO_EUR = 0.91;

const TicketContext = createContext<TicketState | undefined>(undefined);

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicketContext must be used within TicketProvider');
  }
  return context;
};

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTickets, setSelectedTickets] = useState<{ [index: number]: number }>({});
  const [totalEUR, setTotalEUR] = useState<number>(0);
  const [ticketAssignments, setTicketAssignments] = useState<{ [attendeeIndex: number]: number }>({});
  const [attendees, setAttendees] = useState<AttendeeData[]>([]);

  const updateTicket = (index: number, quantity: number) => {
    setSelectedTickets(prev => ({ ...prev, [index]: quantity }));
  };

  const assignTicket = (attendeeIndex: number, ticketIndex: number) => {
    setTicketAssignments(prev => ({ ...prev, [attendeeIndex]: ticketIndex }));
  };

  const updateAttendee = (attendeeIndex: number, data: Partial<AttendeeData>) => {
    
    setAttendees(prev => {
      const newAttendees = [...prev];
      newAttendees[attendeeIndex] = { ...newAttendees[attendeeIndex], ...data };
      return newAttendees;
    });
  };


  const getTicketStatus = (currentAttendeeIndex?: number) => {
    const assignedCounts: { [ticketIndex: number]: number } = {};

    Object.entries(ticketAssignments).forEach(([attendeeIndex, ticketIndex]) => {
      if (currentAttendeeIndex !== undefined && parseInt(attendeeIndex) === currentAttendeeIndex) {
        return;
      }
      assignedCounts[ticketIndex] = (assignedCounts[ticketIndex] || 0) + 1;
    });

    const ticketStatus = tickets.map((ticket, index) => {
      const totalSelected = selectedTickets[index] || 0;
      const assigned = assignedCounts[index] || 0;
      const remaining = totalSelected - assigned;
      const isCurrentlyAssigned = currentAttendeeIndex !== undefined && ticketAssignments[currentAttendeeIndex] === index;

      return {
        index,
        title: ticket.title,
        totalSelected,
        assigned,
        remaining: Math.max(0, remaining),
        isCurrentlyAssigned,
        isAvailable: remaining > 0 || isCurrentlyAssigned,
      };
    }).filter(ticket => ticket.totalSelected > 0);

    return ticketStatus;
  };

  const getRemainingTickets = (currentAttendeeIndex?: number) => {
    return getTicketStatus(currentAttendeeIndex).filter(ticket => ticket.remaining > 0);
  };

  useEffect(() => {
    const totalUSD = tickets.reduce((total, ticket, index) => {
      const quantity = selectedTickets[index] || 0;
      const price = ticket.price;
      if (!ticket.isFree && !isNaN(price)) {
        return total + quantity * price;
      }
      return total;
    }, 0);
    setTotalEUR(parseFloat((totalUSD * USD_TO_EUR).toFixed(2)));
  }, [selectedTickets]);

  useEffect(() => {
    const totalAttendees = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
    setAttendees(prev => {
      const newAttendees = [...prev];
      while (newAttendees.length < totalAttendees) {
        newAttendees.push({
          firstName: '',
          lastName: '',
          countryOfResidence: '',
          region:'',
          emailAddress: '',
          confirmEmailAddress: '',
          nationality: '',
          mobileNumber: '',
          countryCode: '',
          companyName: '',
          jobTitle: '',
          companyType: '',
          industry: '',
          selectedWorkshops: [],
          selectedServices: [],
        });
      }
      return newAttendees.slice(0, totalAttendees);
    });
  }, [selectedTickets]);

  return (
    <TicketContext.Provider
      value={{
        selectedTickets,
        setSelectedTickets,
        updateTicket,
        totalEUR,
        ticketAssignments,
        assignTicket,
        getRemainingTickets,
        getTicketStatus,
        attendees,
        setAttendees,
        updateAttendee,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};