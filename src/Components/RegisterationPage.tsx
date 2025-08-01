import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomStepper from './CustomStepper';
import RegistrationBadge from './RegistrationBadge';
import NavBar from './NavBar';
import Footer from './Footer';
import backgroundImage from '../assets/register-page-bg.png';
import badgeBg from '../assets/green-bg.png';
import { tickets, workshopOptions, serviceOptions } from '../constants/TicketDetails';
import { countriesOfResidenceAndCodes, nationalities, regions } from '../constants/locationData';
import { useTicketContext } from '../context/TicketContext';

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  countryOfResidence?: string;
  emailAddress?: string;
  confirmEmailAddress?: string;
  mobileNumber?: string;
  companyName?: string;
  jobTitle?: string;
  companyType?: string;
  industry?: string;
  selectedWorkshops?: string;
  selectedServices?: string;
  ticketType?: string;
}

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { selectedTickets, ticketAssignments, assignTicket, getTicketStatus, attendees, setAttendees, updateAttendee } = useTicketContext();
  const [validationErrors, setValidationErrors] = useState<any>({});
  const errorRefs = React.useRef<{ [key: string]: HTMLElement | null }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedServices, setTempSelectedServices] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [applied, setApplied] = useState(false);
  const [currentAttendeeIndex, setCurrentAttendeeIndex] = useState(0);

  const totalAttendees = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
  const ticketStatus = getTicketStatus(currentAttendeeIndex);
  const assignedTicketIndex = ticketAssignments[currentAttendeeIndex];
  const assignedTicket = assignedTicketIndex !== undefined ? tickets[assignedTicketIndex] : null;
  const ticketSpecificWorkshops = assignedTicket ? workshopOptions.filter(option => assignedTicket.workshops.includes(option.value)) : [];
  const ticketSpecificServices = assignedTicket ? serviceOptions.filter(option => assignedTicket.services.includes(option.value)) : [];

  const ticketSummary = tickets
    .map((ticket, index) => ({
      title: ticket.title,
      quantity: selectedTickets[index] || 0,
      price: ticket.isFree ? 0 : ticket.price * 0.91,
    }))
    .filter(item => item.quantity > 0);
  const totalCost = ticketSummary.reduce((sum, item) => sum + item.quantity * item.price, 0);

  useEffect(() => {
    if (totalAttendees === 0) {
      alert('Please select at least one ticket');
      navigate('/');
      return;
    }
  }, [totalAttendees, navigate]);



  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (number: string): boolean => {
    const mobileRegex = /^[0-9]+$/;
    return mobileRegex.test(number) && number.length >= 7 && number.length <= 15;
  };

  const validateForm = (attendeeIndex: number): boolean => {
    const errors: any = {};
    const attendee = attendees[attendeeIndex];
    const ticket = ticketAssignments[attendeeIndex] !== undefined ? tickets[ticketAssignments[attendeeIndex]] : null;

    if (!attendee.firstName.trim()) {
      errors[`attendee${attendeeIndex}`] = { ...errors[`attendee${attendeeIndex}`], firstName: 'First name is required' };
    }
    if (!attendee.lastName.trim()) {
      errors[`attendee${attendeeIndex}`] = { ...errors[`attendee${attendeeIndex}`], lastName: 'Last name is required' };
    }
    if (!attendee.countryOfResidence.trim()) {
      errors[`attendee${attendeeIndex}`] = { ...errors[`attendee${attendeeIndex}`], countryOfResidence: 'Country of residence is required' };
    }
    if (!attendee.emailAddress.trim()) {
      errors[`attendee${attendeeIndex}`] = { ...errors[`attendee${attendeeIndex}`], emailAddress: 'Email address is required' };
    } else if (!validateEmail(attendee.emailAddress)) {
      errors[`attendee${attendeeIndex}`] = { ...errors[`attendee${attendeeIndex}`], emailAddress: 'Please enter a valid email address' };
    }
    if (attendee.confirmEmailAddress && attendee.confirmEmailAddress !== attendee.emailAddress) {
      errors[`attendee${attendeeIndex}`] = { ...errors[`attendee${attendeeIndex}`], confirmEmailAddress: 'Email addresses do not match' };
    }
    if (!attendee.mobileNumber.trim()) {
      errors[`attendee${attendeeIndex}`] = { ...errors[`attendee${attendeeIndex}`], mobileNumber: 'Mobile number is required' };
    } else if (!validateMobileNumber(attendee.mobileNumber)) {
      errors[`attendee${attendeeIndex}`] = { ...errors[`attendee${attendeeIndex}`], mobileNumber: 'Mobile number must contain only numbers (7-15 digits)' };
    }
    if (!attendee.companyName.trim()) {
      errors[`attendee${attendeeIndex}`] = { ...errors[`attendee${attendeeIndex}`], companyName: 'Company name is required' };
    }
    if (!attendee.jobTitle.trim()) {
      errors[`attendee${attendeeIndex}`] = { ...errors[`attendee${attendeeIndex}`], jobTitle: 'Job title is required' };
    }
    if (!attendee.companyType.trim()) {
      errors[`attendee${attendeeIndex}`] = { ...errors[`attendee${attendeeIndex}`], companyType: 'Company type is required' };
    }
    if (!attendee.industry.trim()) {
      errors[`attendee${attendeeIndex}`] = { ...errors[`attendee${attendeeIndex}`], industry: 'Industry is required' };
    }
    if (ticket?.isWorkshopsRequired && attendee.selectedWorkshops.length === 0) {
      errors[`attendee${attendeeIndex}`] = { ...errors[`attendee${attendeeIndex}`], selectedWorkshops: 'Please select at least one workshop' };
    }
    if (ticket?.isServicesRequired && attendee.selectedServices.length === 0) {
      errors[`attendee${attendeeIndex}`] = { ...errors[`attendee${attendeeIndex}`], selectedServices: 'Please select at least one service' };
    }
    if (ticketAssignments[attendeeIndex] === undefined) {
      errors[`attendee${attendeeIndex}`] = { ...errors[`attendee${attendeeIndex}`], ticketType: 'Please select a ticket type' };
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = (action: string) => {
    if (action === 'next') {
      if (!validateForm(currentAttendeeIndex)) {
        const errorFields = Object.keys(validationErrors);
        if (errorFields.length > 0) {
          const firstErrorField = errorFields[0];
          const errorElement = errorRefs.current[`attendee${currentAttendeeIndex}_${firstErrorField}`];
          if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
        return;
      }
      if (currentAttendeeIndex < totalAttendees - 1) {
        setCurrentAttendeeIndex(prev => prev + 1);
      } else {
        navigate('/register-summary');
      }
    } else {
      if (currentAttendeeIndex > 0) {
        setCurrentAttendeeIndex(prev => prev - 1);
      } else {
        navigate('/');
      }
    }
  };

  const openModal = (attendeeIndex: number) => {
    setCurrentAttendeeIndex(attendeeIndex);
    setTempSelectedServices([...attendees[attendeeIndex].selectedServices]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchTerm('');
  };

  const applySelection = () => {
    updateAttendee(currentAttendeeIndex, { selectedServices: tempSelectedServices });
    setApplied(true);
    closeModal();
    if (tempSelectedServices.length > 0 && validationErrors[`attendee${currentAttendeeIndex}`]?.selectedServices) {
      setValidationErrors((prev: any) => ({
        ...prev,
        [`attendee${currentAttendeeIndex}`]: { ...prev[`attendee${currentAttendeeIndex}`], selectedServices: undefined },
      }));
    }
  };

  const filteredServices = ticketSpecificServices.filter(service =>
    service.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleModalCheckboxChange = (value: string) => {
    const isSelected = tempSelectedServices.includes(value);
    const updatedServices = isSelected
      ? tempSelectedServices.filter(service => service !== value)
      : [...tempSelectedServices, value];
    setTempSelectedServices(updatedServices);
  };

  const handleInputChange = (e: any, attendeeIndex: number) => {
    const { name, value } = e.target;
    if (name === 'mobileNumber') {
      const numericValue = value.replace(/[^0-9]/g, '');
      updateAttendee(attendeeIndex, { [name]: numericValue });
      if (validationErrors[`attendee${attendeeIndex}`]?.[name] && numericValue && validateMobileNumber(numericValue)) {
        setValidationErrors((prev: any) => ({
          ...prev,
          [`attendee${attendeeIndex}`]: { ...prev[`attendee${attendeeIndex}`], [name]: undefined },
        }));
      }
      return;
    }
    if (name === 'ticketType') {
      assignTicket(attendeeIndex, parseInt(value));
      setValidationErrors((prev: any) => ({
        ...prev,
        [`attendee${attendeeIndex}`]: { ...prev[`attendee${attendeeIndex}`], ticketType: undefined },
      }));
      updateAttendee(attendeeIndex, { selectedServices: [], selectedWorkshops: [] });
      return;
    }
    if (name === 'selectedWorkshops') {
      const updatedWorkshops = attendees[attendeeIndex].selectedWorkshops.includes(value)
        ? attendees[attendeeIndex].selectedWorkshops.filter(w => w !== value)
        : [...attendees[attendeeIndex].selectedWorkshops, value];
      if (updatedWorkshops.length > 5) {
        alert('Maximum 5 workshops can be selected');
        return;
      }
      updateAttendee(attendeeIndex, { selectedWorkshops: updatedWorkshops });
      if (updatedWorkshops.length > 0 && validationErrors[`attendee${attendeeIndex}`]?.selectedWorkshops) {
        setValidationErrors((prev: any) => ({
          ...prev,
          [`attendee${attendeeIndex}`]: { ...prev[`attendee${attendeeIndex}`], selectedWorkshops: undefined },
        }));
      }
      return;
    }
    updateAttendee(attendeeIndex, { [name]: value });
    if (validationErrors[`attendee${attendeeIndex}`]?.[name]) {
      if (name === 'emailAddress' && value && validateEmail(value)) {
        setValidationErrors((prev: any) => ({
          ...prev,
          [`attendee${attendeeIndex}`]: { ...prev[`attendee${attendeeIndex}`], [name]: undefined },
        }));
      } else if (name === 'confirmEmailAddress' && value === attendees[attendeeIndex].emailAddress) {
        setValidationErrors((prev: any) => ({
          ...prev,
          [`attendee${attendeeIndex}`]: { ...prev[`attendee${attendeeIndex}`], [name]: undefined },
        }));
      } else if (value.trim()) {
        setValidationErrors((prev: any) => ({
          ...prev,
          [`attendee${attendeeIndex}`]: { ...prev[`attendee${attendeeIndex}`], [name]: undefined },
        }));
      }
    }
  };

  const getFieldError = (fieldName: string, attendeeIndex: number): boolean => {
    return !!validationErrors[`attendee${attendeeIndex}`]?.[fieldName];
  };

  const getFieldHelperText = (fieldName: string, attendeeIndex: number): string => {
    return validationErrors[`attendee${attendeeIndex}`]?.[fieldName] || '';
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <NavBar loginBtn={true} />
      <div className="flex justify-center mt-4 mb-2 px-4 sm:px-6 lg:px-8">
        <CustomStepper activeStep={currentAttendeeIndex} totalSteps={totalAttendees + 1} />
      </div>
      <div className="flex justify-center items-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-green-950 flex flex-col lg:flex-row gap-4 sm:gap-6">
            <div className="w-full lg:w-2/3 border border-gray-400/15 rounded">
              <div className="px-4 sm:px-5 bg-gradient-to-r from-green-500 to-green-800 h-auto min-h-[80px] text-white p-2 sm:p-3 rounded-t-lg flex flex-col sm:flex-row justify-between items-center">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Registration Information</h2>
                <h5>Attendee {currentAttendeeIndex + 1}</h5>
                <span className="border bg-white/10 text-sm sm:text-lg lg:text-xl rounded-lg border-gray-400 px-3 sm:px-5 py-1 sm:py-2 mt-2 sm:mt-0">
                  {assignedTicket ? assignedTicket.title : 'Select Ticket'} -{' '}
                  {assignedTicket && assignedTicket.isFree ? 'FREE' : assignedTicket ? `EUR ${(assignedTicket.price * 0.91).toFixed(2)}` : 'N/A'} incl. 9% VAT
                </span>

              </div>
              <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white">
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div ref={(el: any) => (errorRefs.current[`attendee${currentAttendeeIndex}_ticketType`] = el)}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Ticket Type <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="ticketType"
                        value={ticketAssignments[currentAttendeeIndex] !== undefined ? ticketAssignments[currentAttendeeIndex] : ''}
                        onChange={(e) => handleInputChange(e, currentAttendeeIndex)}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                        error={getFieldError('ticketType', currentAttendeeIndex)}
                        helperText={getFieldHelperText('ticketType', currentAttendeeIndex)}
                      >
                        <option value="">Select Ticket Type</option>
                        {ticketStatus.map((ticket) => {
                          let displayText = ticket.title;
                          if (ticket.isCurrentlyAssigned) {
                            displayText += ' ✓ (Currently Selected)';
                          } else if (ticket.remaining > 0) {
                            displayText += ` (${ticket.remaining} remaining)`;
                          } else {
                            displayText += ' (Fully assigned)';
                          }
                          const isDisabled = ticket.remaining === 0 && !ticket.isCurrentlyAssigned;
                          return (
                            <option key={ticket.index} value={ticket.index} disabled={isDisabled}>
                              {displayText}
                            </option>
                          );
                        })}
                      </TextField>
                    </div>
                    <div></div>
                  </div>
                  {!assignedTicket && (
                    <div className="text-red-600 text-sm mt-4">
                      Please select a ticket type to view available services and workshops.
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div ref={(el: any) => (errorRefs.current[`attendee${currentAttendeeIndex}_firstName`] = el)}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        First name <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="firstName"
                        value={attendees[currentAttendeeIndex]?.firstName || ''}
                        onChange={(e) => handleInputChange(e, currentAttendeeIndex)}
                        variant="outlined"
                        fullWidth
                        required
                        className="w-full"
                        error={getFieldError('firstName', currentAttendeeIndex)}
                        helperText={getFieldHelperText('firstName', currentAttendeeIndex)}
                      />
                    </div>
                    <div ref={(el: any) => (errorRefs.current[`attendee${currentAttendeeIndex}_lastName`] = el)}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Last name <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="lastName"
                        value={attendees[currentAttendeeIndex]?.lastName || ''}
                        onChange={(e) => handleInputChange(e, currentAttendeeIndex)}
                        variant="outlined"
                        fullWidth
                        required
                        error={getFieldError('lastName', currentAttendeeIndex)}
                        helperText={getFieldHelperText('lastName', currentAttendeeIndex)}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div ref={(el: any) => (errorRefs.current['countryOfResidence'] = el)}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Country of residence <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="countryOfResidence"
                        value={attendees[currentAttendeeIndex]?.countryOfResidence || ''}
                        onChange={(e) => handleInputChange(e, currentAttendeeIndex)}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                        error={getFieldError('countryOfResidence', currentAttendeeIndex)}
                        helperText={getFieldHelperText('countryOfResidence', currentAttendeeIndex)}
                      >
                        <option value="">Select your residence</option>
                        {countriesOfResidenceAndCodes.map((country, idx) => (
                          <option key={idx} value={country.name}>{country.name}</option>
                        ))}
                      </TextField>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Region
                      </label>
                      <TextField
                        name="region"
                        value={attendees[currentAttendeeIndex]?.region || ''}
                        onChange={(e) => handleInputChange(e, currentAttendeeIndex)}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                      >
                        <option value="">Select your region</option>
                        {regions.map((region) => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div ref={(el: any) => (errorRefs.current['emailAddress'] = el)}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Email address <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="emailAddress"
                        value={attendees[currentAttendeeIndex]?.emailAddress || ''}
                        onChange={(e) => handleInputChange(e, currentAttendeeIndex)}
                        variant="outlined"
                        fullWidth
                        required
                        error={getFieldError('emailAddress', currentAttendeeIndex)}
                        helperText={getFieldHelperText('emailAddress', currentAttendeeIndex)}
                      />
                    </div>
                    <div ref={(el: any) => (errorRefs.current['confirmEmailAddress'] = el)}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Confirm Email address
                      </label>
                      <TextField
                        name="confirmEmailAddress"
                        value={attendees[currentAttendeeIndex]?.confirmEmailAddress || ''}
                        onChange={(e) => handleInputChange(e, currentAttendeeIndex)}
                        variant="outlined"
                        fullWidth
                        error={getFieldError('confirmEmailAddress', currentAttendeeIndex)}
                        helperText={getFieldHelperText('confirmEmailAddress', currentAttendeeIndex)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Nationality
                      </label>
                      <TextField
                        name="nationality"
                        value={attendees[currentAttendeeIndex]?.nationality || ''}
                        onChange={(e) => handleInputChange(e, currentAttendeeIndex)}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                      >
                        <option value="">Select your nationality</option>
                        {nationalities.map((nation) => (
                          <option key={nation} value={nation}>{nation}</option>
                        ))}
                      </TextField>
                    </div>
                    <div ref={(el: any) => (errorRefs.current['mobileNumber'] = el)}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Mobile number <span className="text-red-600">*</span>
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <TextField
                          name="countryCode"
                          value={attendees[currentAttendeeIndex]?.countryCode || ''}
                          onChange={(e) => handleInputChange(e, currentAttendeeIndex)}
                          variant="outlined"
                          select
                          SelectProps={{ native: true }}
                          className="w-full sm:w-32"
                        >
                          {countriesOfResidenceAndCodes.map((country, idx) => (
                            <option key={idx} value={country.code}>{country.code}</option>
                          ))}
                        </TextField>
                        <TextField
                          name="mobileNumber"
                          value={attendees[currentAttendeeIndex]?.mobileNumber || ''}
                          onChange={(e) => handleInputChange(e, currentAttendeeIndex)}
                          variant="outlined"
                          className="w-full"
                          required
                          placeholder="Enter numbers only"
                          error={getFieldError('mobileNumber', currentAttendeeIndex)}
                          helperText={getFieldHelperText('mobileNumber', currentAttendeeIndex)}
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div ref={(el: any) => (errorRefs.current['companyName'] = el)}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Company name <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="companyName"
                        value={attendees[currentAttendeeIndex]?.companyName || ''}
                        onChange={(e) => handleInputChange(e, currentAttendeeIndex)}
                        variant="outlined"
                        fullWidth
                        required
                        error={getFieldError('companyName', currentAttendeeIndex)}
                        helperText={getFieldHelperText('companyName', currentAttendeeIndex)}
                      />
                    </div>
                    <div ref={(el: any) => (errorRefs.current['jobTitle'] = el)}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Job title <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="jobTitle"
                        value={attendees[currentAttendeeIndex]?.jobTitle || ''}
                        onChange={(e) => handleInputChange(e, currentAttendeeIndex)}
                        variant="outlined"
                        fullWidth
                        required
                        error={getFieldError('jobTitle', currentAttendeeIndex)}
                        helperText={getFieldHelperText('jobTitle', currentAttendeeIndex)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div ref={(el: any) => (errorRefs.current['companyType'] = el)}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Company type <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="companyType"
                        value={attendees[currentAttendeeIndex]?.companyType || ''}
                        onChange={(e) => handleInputChange(e, currentAttendeeIndex)}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                        error={getFieldError('companyType', currentAttendeeIndex)}
                        helperText={getFieldHelperText('companyType', currentAttendeeIndex)}
                      >
                        <option value="">Please Select</option>
                        <option value="startup">Startup</option>
                        <option value="sme">Small & Medium Enterprise</option>
                        <option value="large-corporation">Large Corporation</option>
                        <option value="government">Government</option>
                        <option value="ngo">NGO/Non-Profit</option>
                        <option value="academic">Academic Institution</option>
                      </TextField>
                    </div>
                    <div ref={(el: any) => (errorRefs.current['industry'] = el)}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Industry <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="industry"
                        value={attendees[currentAttendeeIndex]?.industry || ''}
                        onChange={(e) => handleInputChange(e, currentAttendeeIndex)}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                        error={getFieldError('industry', currentAttendeeIndex)}
                        helperText={getFieldHelperText('industry', currentAttendeeIndex)}
                      >
                        <option value="">Please Select</option>
                        <option value="technology">Technology</option>
                        <option value="finance">Finance & Banking</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="retail">Retail & E-commerce</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="energy">Energy & Utilities</option>
                        <option value="telecommunications">Telecommunications</option>
                        <option value="transportation">Transportation & Logistics</option>
                      </TextField>
                    </div>
                  </div>
                  {assignedTicket && ticketSpecificServices.length > 0 ? (
                    <div className="mt-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                        <div className="flex flex-col" ref={(el: any) => (errorRefs.current[`attendee${currentAttendeeIndex}_selectedServices`] = el)}>
                          <p className="text-sm font-medium text-gray-700">
                            What products & services are you interested in? {assignedTicket?.isWorkshopsRequired && <span className="text-red-600">*</span>}
                          </p>
                          {validationErrors[`attendee${currentAttendeeIndex}`]?.selectedServices && (
                            <span className="text-red-600 text-sm mt-1">{validationErrors[`attendee${currentAttendeeIndex}`].selectedServices}</span>
                          )}
                        </div>
                        <button
                          onClick={() => openModal(currentAttendeeIndex)}
                          type="button"
                          className="px-4 py-2 text-white text-sm font-medium rounded-md bg-gradient-to-r from-red-500 to-red-950 mt-2 sm:mt-0"
                        >
                          SELECT SERVICES
                        </button>
                      </div>
                      {attendees[currentAttendeeIndex]?.selectedServices.length > 0 && (
                        <div className="mt-4">
                          <p className="text-base font-semibold">Selected Services</p>
                          <div className="flex flex-wrap gap-2 my-3">
                            {attendees[currentAttendeeIndex].selectedServices.map((service, idx) => (
                              <p key={idx} className="bg-gray-300 rounded-2xl px-3 py-1 text-gray-600 text-sm">
                                {serviceOptions.find(opt => opt.value === service)?.label || service}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : assignedTicket && ticketSpecificServices.length === 0 ? (
                    <div className="mt-4 text-sm text-gray-600">
                      No services available for this ticket.
                    </div>
                  ) : null}
                  {assignedTicket && ticketSpecificWorkshops.length > 0 ? (
                    <div className="mt-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                        <div className="flex flex-col" ref={(el: any) => (errorRefs.current[`attendee${currentAttendeeIndex}_selectedWorkshops`] = el)}>
                          <p className="text-sm font-medium text-gray-700">
                            Select Workshop (Maximum 5 can Select) {assignedTicket.isWorkshopsRequired && <span className="text-red-600">*</span>}
                          </p>
                          {validationErrors[`attendee${currentAttendeeIndex}`]?.selectedWorkshops && (
                            <span className="text-red-600 text-sm mt-1">{validationErrors[`attendee${currentAttendeeIndex}`].selectedWorkshops}</span>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                        <div className="space-y-3">
                          {ticketSpecificWorkshops.map((workshop) => (
                            <label key={workshop.value} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={attendees[currentAttendeeIndex]?.selectedWorkshops.includes(workshop.value)}
                                onChange={() => handleInputChange({ target: { name: 'selectedWorkshops', value: workshop.value } }, currentAttendeeIndex)}
                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                              />
                              <span className="text-sm text-gray-700">{workshop.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      {attendees[currentAttendeeIndex]?.selectedWorkshops.length > 0 && (
                        <div className="mt-4">
                          <p className="text-base font-semibold">Selected Workshops</p>
                          <div className="flex flex-wrap gap-2 my-3">
                            {attendees[currentAttendeeIndex].selectedWorkshops.map((workshop, idx) => (
                              <p key={idx} className="bg-gray-300 rounded-2xl px-3 py-1 text-gray-600 text-sm">
                                {workshopOptions.find(opt => opt.value === workshop)?.label || workshop}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : assignedTicket && ticketSpecificWorkshops.length === 0 ? (
                    <div className="mt-4 text-sm text-gray-600">
                      No workshops available for this ticket.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <div className="mb-4 bg-gradient-to-r from-green-500 to-green-800 text-white p-4 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold mb-3">Ticket Summary</h3>
                {ticketSummary.length > 0 ? (
                  <>
                    <div className="space-y-2">
                      {ticketSummary.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm sm:text-base">
                          <span>{item.title} (x{item.quantity})</span>
                          <span>{item.price === 0 ? 'FREE' : `EUR ${(item.quantity * item.price).toFixed(2)}`}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-white/30 mt-3 pt-2">
                      <div className="flex justify-between font-semibold text-sm sm:text-base">
                        <span>Total (incl. 9% VAT)</span>
                        <span>{totalCost === 0 ? 'FREE' : `EUR ${totalCost.toFixed(2)}`}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-white/80">No tickets selected.</p>
                )}
              </div>
              <RegistrationBadge formData={attendees[currentAttendeeIndex] || {}} />
            </div>
          </div>
          <div className="mt-4 sm:mt-6 flex justify-center gap-3">
            {totalAttendees > 1 && currentAttendeeIndex > 0 && (
              <Button
                variant="contained"
                onClick={() => handleNext('previous')}
                className="bg-gradient-to-r from-purple-950 to-gray-800 text-xs sm:text-sm"
              >
                PREVIOUS
              </Button>
            )}
            <Button
              variant="contained"
              onClick={() => handleNext('next')}
              className="bg-gradient-to-r from-green-500 to-green-950 text-xs sm:text-sm"
              disabled={!attendees[currentAttendeeIndex]}
            >
              {totalAttendees > 1 && currentAttendeeIndex < totalAttendees - 1 ? 'NEXT ATTENDEE' : 'NEXT'}
            </Button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 text-white p-4 relative"
              style={{ backgroundImage: `url(${badgeBg})`, backgroundSize: 'cover' }}
            >
              <h2 className="text-lg sm:text-xl font-semibold">SELECT SERVICES</h2>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-green-700 hover:bg-green-800 flex items-center justify-center text-white font-bold"
              >
                X
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search Services"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4 sm:mb-6">
                <p className="text-sm text-gray-700">
                  Select Services for {assignedTicket?.title || 'Selected Ticket'}.{' '}
                  {assignedTicket?.isServicesRequired && <span className="text-red-600">At least one service required.</span>}
                </p>
              </div>
              {filteredServices.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Services</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      {filteredServices.slice(0, Math.ceil(filteredServices.length / 2)).map((service) => (
                        <label key={service.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={tempSelectedServices.includes(service.value)}
                            onChange={() => handleModalCheckboxChange(service.value)}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                          />
                          <span className="text-sm text-gray-700">{service.label}</span>
                        </label>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {filteredServices.slice(Math.ceil(filteredServices.length / 2)).map((service) => (
                        <label key={service.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={tempSelectedServices.includes(service.value)}
                            onChange={() => handleModalCheckboxChange(service.value)}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                          />
                          <span className="text-sm text-gray-700">{service.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {filteredServices.length === 0 && (
                <p className="text-sm text-gray-600">No services available for this ticket or matching your search.</p>
              )}
            </div>
            <div className="border-t border-gray-200 p-4 sm:p-6 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border-[2px] border-gray-600 text-gray-700 rounded-md hover:bg-gray-50 text-xs sm:text-sm"
              >
                CANCEL
              </button>
              <button
                onClick={applySelection}
                className="px-4 sm:px-6 py-2 bg-gradient-to-r from-green-600 to-green-900 text-white rounded-md text-xs sm:text-sm"
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RegistrationPage;