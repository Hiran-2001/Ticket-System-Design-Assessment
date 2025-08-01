import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { tickets } from "../constants/TicketDetails";

interface Ticket {
  price: number;
  isFree: boolean;
  title: string;
  workshops: string[];
  services: string[];
  isWorkshopsRequired: boolean;
  isServicesRequired: boolean;
}

interface AttendeeData {
  firstName: string;
  lastName: string;
  countryOfResidence: string;
  region: string;
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
  attendee: AttendeeData | null;
  setAttendee: (attendee: AttendeeData | null) => void;
  updateAttendee: (data: Partial<AttendeeData>) => void;
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
  const [attendee, setAttendee] = useState<AttendeeData | null>(null);

  const updateTicket = (index: number, quantity: number) => {
    setSelectedTickets(prev => ({ ...prev, [index]: quantity }));
  };

  const updateAttendee = (data: Partial<AttendeeData>) => {
    setAttendee(prev => ({
      ...prev,
      ...data,
    } as AttendeeData));
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
    if (totalAttendees > 0 && !attendee) {
      setAttendee({
        firstName: '',
        lastName: '',
        countryOfResidence: '',
        region: '',
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
    } else if (totalAttendees === 0) {
      setAttendee(null);
    }
  }, [selectedTickets, attendee]);

  return (
    <TicketContext.Provider
      value={{
        selectedTickets,
        setSelectedTickets,
        updateTicket,
        totalEUR,
        attendee,
        setAttendee,
        updateAttendee,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};