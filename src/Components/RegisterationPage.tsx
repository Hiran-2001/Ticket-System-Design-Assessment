import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import CustomStepper from './CustomStepper';
import backgroundImage from '../assets/register-page-bg.png';
import badgeBg from '../assets/green-bg.png';
import { tickets, workshopOptions, serviceOptions } from '../constants/TicketDetails';
import { countriesOfResidenceAndCodes, nationalities, regions } from '../constants/locationData';
import { useTicketContext } from '../context/TicketContext';
import RegistrationBadge from './RegistrationBadge';

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
}

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { selectedTickets, totalEUR, attendee, setAttendee, updateAttendee } = useTicketContext();
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedServices, setTempSelectedServices] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [applied, setApplied] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

    const totalAttendees = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);


  useEffect(() => {
    if (totalAttendees === 0) {
      alert('Please select at least one ticket');
      navigate('/');
      return;
    }
  }, [totalAttendees, navigate]);


  const selectedTicketIndices = Object.keys(selectedTickets).filter(i => selectedTickets[Number(i)] > 0).map(Number);
  const ticketSpecificWorkshops = Array.from(new Set(
    selectedTicketIndices.flatMap(index => tickets[index].workshops)
  )).map(value => workshopOptions.find(opt => opt.value === value)!).filter(Boolean);
  const ticketSpecificServices = Array.from(new Set(
    selectedTicketIndices.flatMap(index => tickets[index].services)
  )).map(value => serviceOptions.find(opt => opt.value === value)!).filter(Boolean);

  const ticketSummary = tickets
    .map((ticket, index) => ({
      title: ticket.title,
      quantity: selectedTickets[index] || 0,
      price: ticket.isFree ? 0 : ticket.price * 0.91,
    }))
    .filter(item => item.quantity > 0);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (number: string): boolean => {
    const mobileRegex = /^[0-9]+$/;
    return mobileRegex.test(number) && number.length >= 7 && number.length <= 15;
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!attendee?.firstName.trim()) errors.firstName = 'First name is required';
    if (!attendee?.lastName.trim()) errors.lastName = 'Last name is required';
    if (!attendee?.countryOfResidence.trim()) errors.countryOfResidence = 'Country of residence is required';
    if (!attendee?.emailAddress.trim()) {
      errors.emailAddress = 'Email address is required';
    } else if (!validateEmail(attendee.emailAddress)) {
      errors.emailAddress = 'Please enter a valid email address';
    }
    if (attendee?.confirmEmailAddress && attendee.confirmEmailAddress !== attendee.emailAddress) {
      errors.confirmEmailAddress = 'Email addresses do not match';
    }
    if (!attendee?.mobileNumber.trim()) {
      errors.mobileNumber = 'Mobile number is required';
    } else if (!validateMobileNumber(attendee.mobileNumber)) {
      errors.mobileNumber = 'Mobile number must contain only numbers (7-15 digits)';
    }
    if (!attendee?.companyName.trim()) errors.companyName = 'Company name is required';
    if (!attendee?.jobTitle.trim()) errors.jobTitle = 'Job title is required';
    if (!attendee?.companyType.trim()) errors.companyType = 'Company type is required';
    if (!attendee?.industry.trim()) errors.industry = 'Industry is required';
    if (selectedTicketIndices.some(i => tickets[i].isWorkshopsRequired) && attendee?.selectedWorkshops.length === 0) {
      errors.selectedWorkshops = 'Please select at least one workshop';
    }
    if (selectedTicketIndices.some(i => tickets[i].isServicesRequired) && attendee?.selectedServices.length === 0) {
      errors.selectedServices = 'Please select at least one service';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) {
      const errorFields = Object.keys(validationErrors);
      if (errorFields.length > 0) {
        const errorElement = document.getElementById(`field-${errorFields[0]}`);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }
    navigate('/register-summary');
  };

  const handlePrevious = () => {
    navigate('/ticket-summary');
  };

  const openModal = () => {
    setTempSelectedServices([...(attendee?.selectedServices || [])]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchTerm('');
  };

  const applySelection = () => {
    updateAttendee({ selectedServices: tempSelectedServices });
    setApplied(true);
    closeModal();
    if (tempSelectedServices.length > 0 && validationErrors.selectedServices) {
      setValidationErrors(prev => ({ ...prev, selectedServices: undefined }));
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

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'mobileNumber') {
      const numericValue = value.replace(/[^0-9]/g, '');
      updateAttendee({ [name]: numericValue });
      if (validationErrors.mobileNumber && numericValue && validateMobileNumber(numericValue)) {
        setValidationErrors(prev => ({ ...prev, mobileNumber: undefined }));
      }
      return;
    }
    if (name === 'selectedWorkshops') {
      const updatedWorkshops = attendee?.selectedWorkshops.includes(value)
        ? attendee.selectedWorkshops.filter(w => w !== value)
        : [...(attendee?.selectedWorkshops || []), value];
      if (updatedWorkshops.length > 5) {
        alert('Maximum 5 workshops can be selected');
        return;
      }
      updateAttendee({ selectedWorkshops: updatedWorkshops });
      if (updatedWorkshops.length > 0 && validationErrors.selectedWorkshops) {
        setValidationErrors(prev => ({ ...prev, selectedWorkshops: undefined }));
      }
      return;
    }
    updateAttendee({ [name]: value });
    if (validationErrors[name as keyof ValidationErrors] && value.trim()) {
      if (name === 'emailAddress' && validateEmail(value)) {
        setValidationErrors(prev => ({ ...prev, emailAddress: undefined }));
      } else if (name === 'confirmEmailAddress' && value === attendee?.emailAddress) {
        setValidationErrors(prev => ({ ...prev, confirmEmailAddress: undefined }));
      } else {
        setValidationErrors(prev => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const getFieldError = (fieldName: keyof ValidationErrors): boolean => {
    return !!validationErrors[fieldName];
  };

  const getFieldHelperText = (fieldName: keyof ValidationErrors): string => {
    return validationErrors[fieldName] || '';
    
  };


  const openTicketModal = () => {
    setIsTicketModalOpen(true);
  };

  const closeTicketModal = () => {
    setIsTicketModalOpen(false);
  };
  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavBar loginBtn={true} />
      <div className="flex justify-center mt-4 mb-2 px-4 sm:px-6 lg:px-8">
        <CustomStepper activeStep={0} totalSteps={2} />
      </div>
      <div className="flex justify-center items-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-green-950 flex flex-col lg:flex-row gap-4 sm:gap-6">
            <div className="w-full lg:w-2/3 border border-gray-400/15 rounded">
              <div className="px-4 sm:px-5 bg-gradient-to-r from-green-500 to-green-800 text-white p-2 sm:p-3 rounded-t-lg flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Registration Information</h2>
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="border bg-white/10 text-sm sm:text-lg lg:text-xl rounded-lg border-gray-400 px-3 sm:px-5 py-1 sm:py-2">
                    {ticketSummary.length > 0
                      ? `${ticketSummary[0].title} - ${ticketSummary[0].price === 0 ? 'FREE' : `EUR ${(ticketSummary[0].price * ticketSummary[0].quantity).toFixed(2)}`} incl. 9% VAT`
                      : 'No Tickets Selected - N/A'}
                  </span>
                  {ticketSummary.length > 1 && (
                    <button
                      onClick={openTicketModal}
                      className="whitespace-nowrap px-3 sm:px-4 py-3 sm:py-2 bg-gradient-to-r from-green-600 to-green-900 text-white rounded-md text-xs sm:text-sm font-medium hover:from-green-700 hover:to-green-800"
                    >
                      View all
                    </button>
                  )}
                </div>
              </div>
              <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white">
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div id="field-firstName">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        First name <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="firstName"
                        value={attendee?.firstName || ''}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                        error={getFieldError('firstName')}
                        helperText={getFieldHelperText('firstName')}
                      />
                    </div>
                    <div id="field-lastName">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Last name <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="lastName"
                        value={attendee?.lastName || ''}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                        error={getFieldError('lastName')}
                        helperText={getFieldHelperText('lastName')}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div id="field-countryOfResidence">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Country of residence <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="countryOfResidence"
                        value={attendee?.countryOfResidence || ''}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                        error={getFieldError('countryOfResidence')}
                        helperText={getFieldHelperText('countryOfResidence')}
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
                        value={attendee?.region || ''}
                        onChange={handleInputChange}
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
                    <div id="field-emailAddress">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Email address <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="emailAddress"
                        value={attendee?.emailAddress || ''}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                        error={getFieldError('emailAddress')}
                        helperText={getFieldHelperText('emailAddress')}
                      />
                    </div>
                    <div id="field-confirmEmailAddress">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Confirm Email address
                      </label>
                      <TextField
                        name="confirmEmailAddress"
                        value={attendee?.confirmEmailAddress || ''}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        error={getFieldError('confirmEmailAddress')}
                        helperText={getFieldHelperText('confirmEmailAddress')}
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
                        value={attendee?.nationality || ''}
                        onChange={handleInputChange}
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
                    <div id="field-mobileNumber">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Mobile number <span className="text-red-600">*</span>
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <TextField
                          name="countryCode"
                          value={attendee?.countryCode || ''}
                          onChange={handleInputChange}
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
                          value={attendee?.mobileNumber || ''}
                          onChange={handleInputChange}
                          variant="outlined"
                          className="w-full"
                          required
                          placeholder="Enter numbers only"
                          error={getFieldError('mobileNumber')}
                          helperText={getFieldHelperText('mobileNumber')}
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div id="field-companyName">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Company name <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="companyName"
                        value={attendee?.companyName || ''}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                        error={getFieldError('companyName')}
                        helperText={getFieldHelperText('companyName')}
                      />
                    </div>
                    <div id="field-jobTitle">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Job title <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="jobTitle"
                        value={attendee?.jobTitle || ''}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                        error={getFieldError('jobTitle')}
                        helperText={getFieldHelperText('jobTitle')}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div id="field-companyType">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Company type <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="companyType"
                        value={attendee?.companyType || ''}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                        error={getFieldError('companyType')}
                        helperText={getFieldHelperText('companyType')}
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
                    <div id="field-industry">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Industry <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="industry"
                        value={attendee?.industry || ''}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                        error={getFieldError('industry')}
                        helperText={getFieldHelperText('industry')}
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
                  {ticketSpecificServices.length > 0 && (
                    <div className="mt-4" id="field-selectedServices">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                        <div className="flex flex-col">
                          <p className="text-sm font-medium text-gray-700">
                            What products & services are you interested in?{' '}
                            {selectedTicketIndices.some(i => tickets[i].isServicesRequired) && <span className="text-red-600">*</span>}
                          </p>
                          {validationErrors.selectedServices && (
                            <span className="text-red-600 text-sm mt-1">{validationErrors.selectedServices}</span>
                          )}
                        </div>
                        <button
                          onClick={openModal}
                          type="button"
                          className="px-4 py-2 text-white text-sm font-medium rounded-md bg-gradient-to-r from-red-500 to-red-950 mt-2 sm:mt-0"
                        >
                          SELECT SERVICES
                        </button>
                      </div>
                      {attendee && attendee?.selectedServices.length > 0 && (
                        <div className="mt-4">
                          <p className="text-base font-semibold">Selected Services</p>
                          <div className="flex flex-wrap gap-2 my-3">
                            {attendee?.selectedServices.map((service, idx) => (
                              <p key={idx} className="bg-gray-300 rounded-2xl px-3 py-1 text-gray-600 text-sm">
                                {serviceOptions.find(opt => opt.value === service)?.label || service}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {ticketSpecificWorkshops.length > 0 && (
                    <div className="mt-4" id="field-selectedWorkshops">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                        <div className="flex flex-col">
                          <p className="text-sm font-medium text-gray-700">
                            Select Workshop (Maximum 5 can Select){' '}
                            {selectedTicketIndices.some(i => tickets[i].isWorkshopsRequired) && <span className="text-red-600">*</span>}
                          </p>
                          {validationErrors.selectedWorkshops && (
                            <span className="text-red-600 text-sm mt-1">{validationErrors.selectedWorkshops}</span>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                        <div className="space-y-3">
                          {ticketSpecificWorkshops.map((workshop) => (
                            <label key={workshop.value} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={attendee?.selectedWorkshops.includes(workshop.value)}
                                onChange={() => handleInputChange({ target: { name: 'selectedWorkshops', value: workshop.value } })}
                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                              />
                              <span className="text-sm text-gray-700">{workshop.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      {attendee && attendee?.selectedWorkshops?.length > 0 && (
                        <div className="mt-4">
                          <p className="text-base font-semibold">Selected Workshops</p>
                          <div className="flex flex-wrap gap-2 my-3">
                            {attendee?.selectedWorkshops.map((workshop, idx) => (
                              <p key={idx} className="bg-gray-300 rounded-2xl px-3 py-1 text-gray-600 text-sm">
                                {workshopOptions.find(opt => opt.value === workshop)?.label || workshop}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
                        <span>{totalEUR === 0 ? 'FREE' : `EUR ${totalEUR.toFixed(2)}`}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-white/80">No tickets selected.</p>
                )}
              </div>
              <RegistrationBadge formData={attendee || {}} />
            </div>
          </div>
          <div className="mt-4 sm:mt-6 flex justify-center gap-3">
            <Button
              variant="contained"
              onClick={handlePrevious}
              className="bg-gradient-to-r from-purple-950 to-gray-800 text-xs sm:text-sm"
            >
              PREVIOUS
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              className="bg-gradient-to-r from-green-500 to-green-950 text-xs sm:text-sm"
              disabled={!attendee}
            >
              NEXT
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
                  Select Services for all tickets.{' '}
                  {selectedTicketIndices.some(i => tickets[i].isServicesRequired) && (
                    <span className="text-red-600">At least one service required.</span>
                  )}
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

      {isTicketModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 text-white p-4 relative"
              style={{ backgroundImage: `url(${badgeBg})`, backgroundSize: 'cover' }}
            >
              <h2 className="text-lg sm:text-xl font-semibold">Selected Tickets</h2>
              <button
                onClick={closeTicketModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-green-700 hover:bg-green-800 flex items-center justify-center text-white font-bold"
              >
                X
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <div className="space-y-3">
                {ticketSummary.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm text-gray-700">
                    <span>{item.title}</span>
                    <span>Quantity: {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 p-4 sm:p-6 flex justify-end">
              <button
                onClick={closeTicketModal}
                className="px-4 py-2 border-[2px] border-gray-600 text-gray-700 rounded-md hover:bg-gray-50 text-xs sm:text-sm"
              >
                CLOSE
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