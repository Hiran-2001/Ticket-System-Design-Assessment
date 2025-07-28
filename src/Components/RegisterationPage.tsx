import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomStepper from './CustomStepper';
import RegistrationBadge from './RegistrationBadge';
import NavBar from './NavBar';
import Footer from './Footer';
import backgroundImage from "../assets/register-page-bg.png";
import badgeBg from "../assets/green-bg.png";

const RegistrationPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();

  const handleNext = (action: string) => {
    if (action === 'next') {
      if (activeStep === 3) {
        navigate('/register-summary');
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

    const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryOfResidence: '',
    region: '',
    emailAddress: '',
    confirmEmailAddress: '',
    nationality: '',
    mobileNumber: '',
    countryCode: '+234',
    companyName: '',
    jobTitle: '',
    companyType: '',
    industry: '',
    selectedWorkshops: []
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedWorkshops, setTempSelectedWorkshops] = useState<String[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [applied, setApplied] = useState(false);

  const openModal = () => {
    setTempSelectedWorkshops([...formData.selectedWorkshops]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchTerm('');
  };

  const applySelection = () => {
    // setFormData((prev) => ({ ...prev, selectedWorkshops: tempSelectedWorkshops }));
    setApplied(true);
    closeModal();
  };

  const workshopOptions = [
    { value: 'global-leaders-forum', label: 'Global Leaders Forum !NEW (3 Days)' },
    { value: 'gitex-main-stage', label: 'GITEX Main Stage' },
    { value: 'ai-robotics', label: 'Artificial Intelligence & Robotics (15)' },
    { value: 'ai-everything', label: 'AI Everything (4 Days)' },
    { value: 'cybersecurity', label: 'Cybersecurity (4 Days)' },
    { value: 'future-health', label: 'Future Health !NEW (2 Days)' },
    { value: 'digital-cities', label: 'Digital Cities (1 Day)' },
    { value: 'edtech', label: 'Edtech (1 Day)' },
    { value: 'energy-transition', label: 'Energy Transition (1 Day)' },
    { value: 'intelligent-connectivity', label: 'Intelligent Connectivity (1 Day)' },
    { value: 'digital-finance', label: 'Digital Finance (1 Day)' },
    { value: 'future-mobility', label: 'Future Mobility (1 Day)' }
  ];

  const filteredWorkshops = workshopOptions.filter(workshop =>
    workshop.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleModalCheckboxChange = (workshopValue: string) => {
    const isSelected = tempSelectedWorkshops.includes(workshopValue);
    if (!isSelected && tempSelectedWorkshops.length >= 5) {
      alert('Maximum 5 workshops can be selected');
      return;
    }
    const updatedWorkshops = isSelected
      ? tempSelectedWorkshops.filter(workshop => workshop !== workshopValue)
      : [...tempSelectedWorkshops, workshopValue];
    setTempSelectedWorkshops(updatedWorkshops);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <NavBar loginBtn={true} />
      <div className="flex justify-center mt-4 mb-2 px-4 sm:px-6 lg:px-8">
        <CustomStepper activeStep={activeStep} />
      </div>
      <div className="flex justify-center items-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-green-950 flex flex-col lg:flex-row gap-4 sm:gap-6">
            <div className="w-full lg:w-2/3 border border-gray-400/15 rounded">
              <div className="px-4 sm:px-5 bg-gradient-to-r from-green-500 to-green-800 h-auto min-h-[80px] text-white p-2 sm:p-3 rounded-t-lg flex flex-col sm:flex-row justify-between items-center">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Registration Information</h2>
                <span className="border bg-white/10 text-sm sm:text-lg lg:text-xl rounded-lg border-gray-400 px-3 sm:px-5 py-1 sm:py-2 mt-2 sm:mt-0">
                  PREMIUM TICKET - FREE incl. 9% VAT
                </span>
              </div>
              <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white">
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        First name <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Last name <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Country of residence <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="countryOfResidence"
                        value={formData.countryOfResidence}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                      >
                        <option value="">Select your residence</option>
                        {/* Add more options as needed */}
                      </TextField>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Region
                      </label>
                      <TextField
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                      >
                        <option value="">Select your region</option>
                        {/* Add more options as needed */}
                      </TextField>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Email address <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Confirm Email address
                      </label>
                      <TextField
                        name="confirmEmailAddress"
                        value={formData.confirmEmailAddress}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
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
                        value={formData.nationality}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                      >
                        <option value="">Select your nationality</option>
                        {/* Add more options as needed */}
                      </TextField>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Mobile number <span className="text-red-600">*</span>
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <TextField
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleInputChange}
                          variant="outlined"
                          select
                          SelectProps={{ native: true }}
                          className="w-full sm:w-32"
                        >
                          <option value="+234">🇳🇬 +234</option>
                          <option value="+233">🇬🇭 +233</option>
                          <option value="+254">🇰🇪 +254</option>
                          <option value="+27">🇿🇦 +27</option>
                          <option value="+20">🇪🇬 +20</option>
                        </TextField>
                        <TextField
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          variant="outlined"
                          className="w-full"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Company name <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Job title <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Company type <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="companyType"
                        value={formData.companyType}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                      >
                        <option value="">Please Select</option>
                        {/* Add more options as needed */}
                      </TextField>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Industry <span className="text-red-600">*</span>
                      </label>
                      <TextField
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                      >
                        <option value="">Please Select</option>
                        {/* Add more options as needed */}
                      </TextField>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                      <p className="text-sm font-medium text-gray-700">
                        What products & services are you interested in? <span className="text-red-600">*</span>
                      </p>
                      <button
                        onClick={openModal}
                        type="button"
                        className="px-4 py-2 text-white text-sm font-medium rounded-md bg-gradient-to-r from-red-500 to-red-950 mt-2 sm:mt-0"
                      >
                        SELECT SOLUTIONS/PRODUCTS
                      </button>
                    </div>
                    {applied && (
                      <div>
                        <div>
                          <p className="text-base font-semibold">Main Categories</p>
                          <div className="flex flex-wrap gap-2 my-3">
                            <p className='bg-purple-800 rounded-2xl px-3 py-1 text-white'>Artificial Intelligence & Robotics</p>
                            <p className='bg-purple-800 rounded-2xl px-3 py-1 text-white'>Artificial Intelligence & Robotics</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-base font-semibold">Sub Categories</p>
                          <div className="flex flex-wrap gap-2 my-3">
                            <p className="bg-gray-300 rounded-2xl px-3 py-1 text-gray-600 text-sm">Edge Computing</p>
                            <p className="bg-gray-300 rounded-2xl px-3 py-1 text-gray-600 text-sm">Cloud Computing</p>
                            <p className="bg-gray-300 rounded-2xl px-3 py-1 text-gray-600 text-sm">Cognitive Computing</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mb-2 mt-4">
                      <p className="text-sm text-gray-600">Select Workshop (Maximum 5 can Select)</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                      <div className="space-y-3">
                        {workshopOptions.slice(0, 6).map((workshop) => (
                          <label key={workshop.value} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={tempSelectedWorkshops.includes(workshop.value)}
                              onChange={() => handleModalCheckboxChange(workshop.value)}
                              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700">{workshop.label}</span>
                          </label>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {workshopOptions.slice(6).map((workshop) => (
                          <label key={workshop.value} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={tempSelectedWorkshops.includes(workshop.value)}
                              onChange={() => handleModalCheckboxChange(workshop.value)}
                              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700">{workshop.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <RegistrationBadge />
            </div>
          </div>
          <div className="mt-4 sm:mt-6 flex justify-center gap-3">
            {activeStep > 0 && (
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
              <h2 className="text-lg sm:text-xl font-semibold">SELECT SOLUTIONS/PRODUCTS</h2>
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
                  placeholder="Try Product/Service"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4 sm:mb-6">
                <p className="text-sm text-gray-700">
                  I Am Interested In Sourcing The Following Solutions/Products? (Select Top 5) • Please Ensure You Have Chosen At Least One Category In Each Section
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {filteredWorkshops.slice(0, Math.ceil(filteredWorkshops.length / 2)).map((workshop) => (
                    <label key={workshop.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSelectedWorkshops.includes(workshop.value)}
                        onChange={() => handleModalCheckboxChange(workshop.value)}
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                      />
                      <span className="text-sm text-gray-700">{workshop.label}</span>
                    </label>
                  ))}
                </div>
                <div className="space-y-3">
                  {filteredWorkshops.slice(Math.ceil(filteredWorkshops.length / 2)).map((workshop) => (
                    <label key={workshop.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSelectedWorkshops.includes(workshop.value)}
                        onChange={() => handleModalCheckboxChange(workshop.value)}
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                      />
                      <span className="text-sm text-gray-700">{workshop.label}</span>
                    </label>
                  ))}
                </div>
              </div>
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