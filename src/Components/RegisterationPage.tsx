import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, FormGroup, Modal, Box } from '@mui/material';
import backgroundImage from "../assets/register-page-bg.png"
import CustomStepper from './CustomStepper';
import RegistrationBadge from './RegistrationBadge';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const RegistrationPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate()
  const handleNext = (action: string) => {
    if (action === 'next') {
      if(activeStep === 3){
        navigate('/register-summary')
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
  const [tempSelectedWorkshops, setTempSelectedWorkshops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = () => {
    setTempSelectedWorkshops([...formData.selectedWorkshops]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchTerm('');
  };

  const applySelection = () => {
    setFormData(prev => ({
      ...prev,
      selectedWorkshops: [...tempSelectedWorkshops]
    }));
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

  const handleCheckboxChange = (workshopValue: string) => {
    setFormData(prev => {
      const currentWorkshops = prev.selectedWorkshops;
      const isSelected = currentWorkshops.includes(workshopValue);

      // Maximum 6 selections allowed
      if (!isSelected && currentWorkshops.length >= 6) {
        alert('Maximum 6 workshops can be selected');
        return prev;
      }

      const updatedWorkshops = isSelected
        ? currentWorkshops.filter(workshop => workshop !== workshopValue)
        : [...currentWorkshops, workshopValue];

      return {
        ...prev,
        selectedWorkshops: updatedWorkshops
      };
    });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100%', // Zoom in slightly
      }}    >
      {/* Top Bar */}
      <NavBar loginBtn={true}/>

      {/* Stepper */}
      <div className="flex justify-center mt-7 mb-2">
        <CustomStepper activeStep={activeStep} />
      </div>

      {/* Main Content */}
      <div className="flex justify-center item-center p-6">
        <div className="w-11/12">
          {/* Form and Badge Container */}
          <div className="bg-white rounded-lg w-full shadow-lg p-4 border border-green-950 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <div className="px-5 bg-green-800 bg-linear-to-r from-green-500 to-green-800 h-[98.60px] text-white p-2 rounded-t-lg flex justify-between items-center">
                <h2 className="text-3xl font-bold">Registration Information 1</h2>
                <span className='border text-xl rounded-lg border-gray-400 px-5 py-2'>PREMIUM TICKET - FREE incl. 9% VAT</span>
              </div>

              <div className="max-w-4xl mx-auto p-6 bg-white">
                <div className="space-y-6">
                  {/* First Row - First Name and Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First name <span className='text-red-600'>*</span>
                      </label>
                      <TextField className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.firstName} onChange={handleInputChange}
                        variant="outlined" fullWidth required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last name <span className='text-red-600'>*</span>
                      </label>
                      <TextField className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.lastName} onChange={handleInputChange}
                        variant="outlined" fullWidth required />
                    </div>
                  </div>

                  {/* Second Row - Country and Region */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country of residence <span className='text-red-600'>*</span>
                      </label>
                      <TextField
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                      >
                        <option value="">Please Select</option>
                        <option value="">Please Select</option>
                        <option value="">Please Select</option>
                        <option value="">Please Select</option>
                      </TextField>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Region
                      </label>
                      <TextField
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                      >
                        <option value="">Please Select</option>
                      </TextField>
                    </div>
                  </div>

                  {/* Third Row - Email Addresses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email address <span className='text-red-600'>*</span>
                      </label>
                      <TextField variant="outlined" fullWidth />

                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Email address
                      </label>
                      <TextField variant="outlined" fullWidth />

                    </div>
                  </div>

                  {/* Fourth Row - Nationality and Mobile Number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nationality
                      </label>
                      <TextField
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                      >
                        <option value="">Please Select</option>
                      </TextField>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile number <span className='text-red-600'>*</span>
                      </label>
                      <div className="flex">
                        <TextField
                          variant="outlined"
                          fullWidth
                          select
                          SelectProps={{ native: true }}
                          className="px-3 py-2 w-1/3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                        >
                          <option value="+234">🇳🇬 +234</option>
                          <option value="+233">🇬🇭 +233</option>
                          <option value="+254">🇰🇪 +254</option>
                          <option value="+27">🇿🇦 +27</option>
                          <option value="+20">🇪🇬 +20</option>
                        </TextField>
                        <TextField
                          variant="outlined"
                          className='w-2/3'
                          fullWidth
                          InputProps={{ readOnly: true }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fifth Row - Company Name and Job Title */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company name <span className='text-red-600'>*</span>
                      </label>
                      <TextField variant="outlined" fullWidth />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job title <span className='text-red-600'>*</span>
                      </label>
                      <TextField variant="outlined" fullWidth />
                    </div>
                  </div>

                  {/* Sixth Row - Company Type and Industry */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company type <span className='text-red-600'>*</span>
                      </label>
                      <TextField
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                      >
                        <option value="">Please Select</option>
                      </TextField>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry <span className='text-red-600'>*</span>
                      </label>
                      <TextField
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                      >
                        <option value="">Please Select</option>
                      </TextField>
                    </div>
                  </div>



                  <div className="mt-6">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-sm font-medium text-gray-700">
                        What products & services are you interested in? <span className="text-red-600">*</span>
                      </p>
                      <button
                        onClick={openModal}
                        type="button"
                        className="px-4 py-2 text-white text-sm font-medium rounded-md bg-gradient-to-r from-red-500 to-red-950"
                      >
                        SELECT SOLUTIONS/PRODUCTS
                      </button>
                    </div>

                    <div className="mb-2">
                      <p className="text-sm text-gray-600">Select Workshop (Maximum 6 can Select)</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={formData.selectedWorkshops.includes('global-leaders-forum')}
                            // onChange={() => handleCheckboxChange('global-leaders-forum')}
                            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">Global Leaders Forum !NEW (3 Days)</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={formData.selectedWorkshops.includes('gitex-main-stage')}
                            // onChange={() => handleCheckboxChange('gitex-main-stage')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">GITEX Main Stage</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={formData.selectedWorkshops.includes('ai-robotics')}
                            // onChange={() => handleCheckboxChange('ai-robotics')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Artificial Intelligence & Robotics (15)</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={formData.selectedWorkshops.includes('future-health')}
                            // onChange={() => handleCheckboxChange('future-health')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Future Health !NEW (2 Days)</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={formData.selectedWorkshops.includes('cybersecurity')}
                            // onChange={() => handleCheckboxChange('cybersecurity')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Cybersecurity (4 Days)</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={formData.selectedWorkshops.includes('future-health-2')}
                            // onChange={() => handleCheckboxChange('future-health-2')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Future Health !NEW (2 Days)</span>
                        </label>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={formData.selectedWorkshops.includes('digital-cities')}
                            // onChange={() => handleCheckboxChange('digital-cities')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Digital Cities (1 Day)</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={formData.selectedWorkshops.includes('edtech')}
                            // onChange={() => handleCheckboxChange('edtech')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Edtech (1 Day)</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={formData.selectedWorkshops.includes('energy-transition')}
                            // onChange={() => handleCheckboxChange('energy-transition')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Energy Transition (1 Day)</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={formData.selectedWorkshops.includes('intelligent-connectivity')}
                            // onChange={() => handleCheckboxChange('intelligent-connectivity')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Intelligent Connectivity (1 Day)</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={formData.selectedWorkshops.includes('digital-finance')}
                            // onChange={() => handleCheckboxChange('digital-finance')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Digital Finance (1 Day)</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={formData.selectedWorkshops.includes('future-mobility')}
                            // onChange={() => handleCheckboxChange('future-mobility')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Future Mobility (1 Day)</span>
                        </label>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <RegistrationBadge />
            </div>
          </div>

          {/* Next Button */}
          <div className="mt-6 space-x-3 flex justify-center">
            {activeStep > 0 && <Button
              variant="contained"
              color="success"
              onClick={() => handleNext('previous')}
              className='bg-gradient-to-r from-purple-950 to-gray-800'
            >
              PREVIOUS
            </Button>}
            <Button
              variant="contained"
              color="success"
              onClick={() => handleNext('next')}
              className='bg-gradient-to-r from-green-500 to-green-950'
            >
              NEXT
            </Button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-4 relative" 
            
            >
              <h2 className="text-lg font-semibold">SELECT SOLUTIONS/PRODUCTS</h2>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-green-700 hover:bg-green-800 flex items-center justify-center text-white font-bold"
              >
                X
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
              {/* Search Input */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Try Product/Service"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Instructions */}
              <div className="mb-6">
                <p className="text-sm text-gray-700">
                  I Am Interested In Sourcing The Following Solutions/Products? (Select Top 5) • Please Ensure You Have Chosen At Least One Category In Each Section
                </p>
              </div>

              {/* Workshop Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
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

                {/* Right Column */}
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

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-4 flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                CANCEL
              </button>
              <button
                onClick={applySelection}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <Footer/>
    </div>
  );
};

export default RegistrationPage;