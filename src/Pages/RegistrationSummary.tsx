import { useEffect, useState } from "react";
import CustomStepper from "../Components/CustomStepper";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import backgroundImage from "../assets/register-page-bg.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTicketContext } from "../context/TicketContext";

interface RegistrationSummaryProps {
  activeStep?: number;
}

function RegistrationSummary({ activeStep = 3 }: RegistrationSummaryProps) {
  const { selectedTickets } = useTicketContext();
  const [promoCode, setPromoCode] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [applied, setApplied] = useState(false);
  const { totalEUR } = useTicketContext();

  const totalAttendees = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
const displayedTotal = applied ? totalEUR * 0.85 : totalEUR;

  const navigate = useNavigate();

  useEffect(() => {
    if (totalAttendees === 0) {
      alert('Please select at least one ticket');
      navigate('/');
      return;
    }
  },[])

  const handleApplyPromo = (action: string) => {
    action === "Apply" ? setApplied(true) : setApplied(false);
  };

  const handlePrevious = () => {
    navigate('/register');
  };

  const handleNext = () => {
    const isTermsAccepted = termsAccepted;
    const isConsentGiven = consentGiven;

    setTermsError(!isTermsAccepted);
    setConsentError(!isConsentGiven);

    if (!isTermsAccepted || !isConsentGiven) {
      return;
    }

    navigate('/thank-you');
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <NavBar />
      <div className="flex justify-center mt-4 sm:mt-6 lg:mt-7 mb-2 px-4 sm:px-6 lg:px-8">
        <CustomStepper activeStep={activeStep} totalSteps={totalAttendees + 1} />
      </div>
      <div className="flex justify-center items-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl sm:max-w-5xl lg:max-w-7xl">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="bg-gradient-to-r from-green-600 to-green-900 text-white px-4 sm:px-6 py-4 sm:py-5 rounded-lg">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Registration Summary</h2>
            </div>
            <div className="py-4 sm:py-6 space-y-4 sm:space-y-6">
              {applied ? (
                <div className="bg-green-50 py-2 sm:py-3 px-3 sm:px-4 border-l-4 border-l-green-600 flex justify-between">
                  <div className="w-full flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
                    <p className="font-semibold text-xs sm:text-sm text-gray-900">PREMIUM TICKET X 2</p>
                    <div className="text-right">
                      <p className="font-medium text-xs sm:text-sm text-gray-500">FREE 0.16</p>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        <p className="font-semibold text-green-600 text-xs sm:text-sm">FREE 0.16</p>
                        <p className="font-semibold text-xs h-4 sm:h-5 rounded-md px-1.5 sm:px-2 py-0.5 bg-green-700 text-white">
                          -15%
                        </p>
                        <p className="font-normal text-xs sm:text-sm text-gray-500">Incl. 19% VAT</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                    <p className="font-bold text-sm sm:text-base text-gray-900">PREMIUM TICKET x 2</p>
                    <p className="font-bold text-sm sm:text-base text-gray-900 text-right">EUR 40.19</p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                    <p className="text-gray-700 font-bold text-sm sm:text-base">Student Ticket Access On Day 3 Only</p>
                    <p className="text-gray-700 font-bold text-sm sm:text-base text-right">
                      EUR 30.40 SUBJECT TO APPROVAL Incl. 19%
                    </p>
                  </div>
                </div>
              )}
              <div className="bg-green-50 py-3 sm:py-4 px-3 sm:px-4 border border-dotted rounded-lg">
                <label className={`block text-sm sm:text-base font-medium ${applied ? 'text-black' : 'text-green-600'} mb-2`}>
                  Have a promo code?
                </label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={applied ? (promoCode || 'GITEX15') : "Enter promo code"}
                    className={`flex-1 px-3 py-1.5 sm:py-2 ${applied ? "bg-gray-200" : "bg-white"
                      } border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                  />
                  <button
                    onClick={() => handleApplyPromo("Apply")}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-800 to-red-950 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    APPLY
                  </button>
                </div>
                {applied && (
                  <div className="mt-3 sm:mt-4">
                    <p className="text-xs sm:text-sm font-medium text-green-600 mb-2">
                      Promo code {promoCode || "GITEX15"} applied successfully! Applied to 2 lowest-priced tickets!
                    </p>
                    <div className="bg-white py-3 sm:py-4 px-3 sm:px-4 border border-dotted rounded-lg flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
                      <div className="space-y-1">
                        <div className="flex text-xs sm:text-sm">
                          Promo code applied: <p className="text-green-600 ml-1">{promoCode || "GITEX15"}</p>
                        </div>
                        <div className="flex text-xs sm:text-sm">
                          Promo code applied: <p className="text-green-600 ml-1">15% (EUR {(totalEUR * 0.15).toFixed(2)} incl. VAT)</p>
                        </div>
                        <div className="flex text-xs sm:text-sm">
                          Applied to: <p className="text-green-600 ml-1">2 lowest-priced tickets</p>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 bg-white border-2 py-0.5 px-3 sm:px-4 rounded-lg border-solid border-red-600 h-fit">
                        <button
                          onClick={() => handleApplyPromo("Remove")}
                          className="text-xs sm:text-sm text-red-600 font-bold"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end items-center gap-1 sm:gap-2">
                <p className="text-base sm:text-lg font-semibold text-gray-900">Total:</p>
                <p className={`text-base sm:text-lg font-semibold ${applied ? 'text-green-600' : 'text-gray-900'}`}>
                  EUR {displayedTotal.toFixed(2)}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-gray-900">incl. 19% VAT</p>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      setTermsError(false);
                    }}
                    className="w-4 sm:w-6 lg:w-8 h-5 sm:h-8 lg:h-8 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
                  />
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    I have read and accept the{' '}
                    <a href="#" className="text-red-600 hover:text-red-700 underline">
                      terms and conditions
                    </a>
                    ,{' '}
                    <a href="#" className="text-red-600 hover:text-red-700 underline">
                      Privacy Policy
                    </a>
                    , and consent that attendees under the age of 21 will not be admitted, and admission to the
                    exhibition is restricted to trade and business professionals only, and students above 16 and below 18
                    can attend only if accompanied by school or faculty members{' '}
                    <span className="text-red-600">*</span>
                  </span>
                </label>
                {termsError && (
                  <p className="text-red-600 text-xs sm:text-sm ml-1">You must accept the terms and conditions.</p>
                )}
                <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => {
                      setConsentGiven(e.target.checked);
                      setConsentError(false);
                    }}
                    className="w-2 sm:w-6 lg:w-6 h-5 sm:h-6 lg:h-8 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
                  />
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    I hereby consent the use of my data by the organiser, exhibitors and sponsors of DWTC & KAOUN
                    international to delivering services and for marketing purposes. I am aware that I can object to the
                    sending of newsletters at any time. <span className="text-red-600">*</span>
                  </span>
                </label>
                {consentError && (
                  <p className="text-red-600 text-xs sm:text-sm ml-1">You must give consent to continue.</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 flex justify-center gap-2 sm:gap-3">
            {activeStep > 0 && (
              <Button
                variant="contained"
                onClick={handlePrevious}
                className="bg-gradient-to-r from-purple-950 to-gray-800 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
              >
                PREVIOUS
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              className="bg-gradient-to-r from-green-500 to-green-950 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
            >
              NEXT
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegistrationSummary;