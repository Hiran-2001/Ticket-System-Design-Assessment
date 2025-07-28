import { useState } from "react";
import CustomStepper from "../Components/CustomStepper"
import Footer from "../Components/Footer"
import NavBar from "../Components/NavBar"
import backgroundImage from "../assets/register-page-bg.png"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


function RegistrationSummery() {
    const [promoCode, setPromoCode] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [consentGiven, setConsentGiven] = useState(false);
    const [applied, setApplied] = useState(false)

    const navigate = useNavigate()

    const handleApplyPromo = (action: string) => {
        console.log('Applying promo code:', promoCode);
        // Handle promo code application
        action === "Apply" ? setApplied(true) : setApplied(false)
    };

    const handlePrevious = () => {
        navigate('/register')
    };

    const handleNext = () => {
        if (!termsAccepted || !consentGiven) {
            alert('Please accept the terms and conditions and consent to proceed');
            return;
        }
        // Handle next step navigation
        navigate('/thank-you')
    };
    const activeStep = 3
    return (
        <div className="min-h-screen flex flex-col"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: '100%', 
            }}    >

            <NavBar />

            <div className="flex justify-center mt-7 mb-2">
                <CustomStepper activeStep={activeStep} />
            </div>

            <div className="flex justify-center item-center p-6">
                <div className="w-11/12">
                    <div className="bg-white rounded-lg w-full shadow-lg p-4 ">
                        <div className="bg-gradient-to-r from-green-600 to-green-900 text-white px-6 py-5 rounded-lg">
                            <h2 className="text-2xl font-bold">Registration Summary</h2>
                        </div>

                        <div className="py-6 space-y-6">
                            {
                                applied ?

                                    <div className="bg-green-50 py-1 px-[6px] border-l-[3px] border-l-green-600 flex justify-between">
                                        <div className=" w-full flex justify-between ">
                                            <div>
                                                <p className="font-semibold text-xs text-gray-900">PREMIUM TICKET X 2</p>
                                            </div>
                                            <div className="">
                                                <p className="font-medium text-sm text-gray-500">FREE 0.16</p>
                                                <div className="flex space-x-1">
                                                    <p className="font-semibold text-green-600">FREE 0.16</p>
                                                    <p className="font-semibold text-xs h-4  rounded-md px-1.5 mt-1 bg-green-700 text-white">-15%</p>
                                                    <p className="font-normal text-xs mt-1 text-gray-500">Incl. 19% VAT</p>
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                    :

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-gray-900">PREMIUM TICKET x 2</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">EUR 40.19</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-gray-700 font-bold">Student Ticket Access On Day 3 Only</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-gray-700 font-bold">EUR 30.40 SUBJECT TO APPROVAL Incl. 19%</p>
                                            </div>
                                        </div>
                                    </div>}

                            <div className="bg-green-50 py-4 px-2 border border-dotted rounded-lg">
                                <label className={`block text-base font-medium ${applied ? 'text-black' : 'text-green-600'}  mb-2`}>
                                    Have a promo code?
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        placeholder={applied ? promoCode  ? promoCode : 'GITEX15' : "Enter promo code"}
                                        className={`flex-1 px-3 py-1 ${applied ? "bg-gray-200" : "bg-white"}  border border-none rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                                    />
                                    <button
                                        onClick={() => handleApplyPromo("Apply")}
                                        className="px-4 py-2 bg-gradient-to-r from-red-800 to-red-950 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    >
                                        APPLY
                                    </button>
                                </div>

                                {applied && <div>
                                    <p className="block text-sm mt-2 font-medium text-green-600 mb-2">Promo code {promoCode ? promoCode : "GITEX15"} applied successfully! Applied to 2 lowes-priced tickets!</p>

                                    <div className="bg-white py-4 px-4 border border-dotted rounded-lg flex justify-between">
                                        <div>
                                            <div className="flex">Promo code applied: <p className="text-green-600 ml-1">{promoCode ? promoCode : "GITEX15"}</p> </div>
                                            <div className="flex">Promo code applied: <p className="text-green-600 ml-1">15% (EUR 0.06 incl. VAT)</p> </div>
                                            <div className="flex">Applied to:: <p className="text-green-600 ml-1">2 lowest-priced tickets</p> </div>
                                        </div>

                                        <div className="mt-6 bg-white border-2 py-0.5 px-4 rounded-lg border-solid border-red-600 h-full">
                                            <button onClick={() => handleApplyPromo("Remove")} className="text-xs text-red-600 font-bold">REMOVE</button>
                                        </div>

                                    </div>
                                </div>}


                            </div>

                            <div className="">
                                <div className="flex justify-end items-center space-x-2">
                                    <p className="text-lg font-semibold text-gray-900">Total:</p>
                                    <p className="text-lg font-semibold text-gray-900">EUR 300</p>
                                    <p className="text-xs font-semibold text-gray-900">incl. 19% VAT</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-start space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        className="w-8 h-8 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                    />
                                    <span className="text-lg text-gray-700 leading-relaxed">
                                        I have read and accept the{' '}
                                        <a href="#" className="text-red-600 hover:text-red-700 underline">
                                            terms and conditions
                                        </a>
                                        ,{' '}
                                        <a href="#" className="text-red-600 hover:text-red-700 underline">
                                            Privacy Policy
                                        </a>
                                        , and consent that attendees under the age of 21 will not be admitted, and admission to the
                                        exhibition is restricted to trade and business professionals only, and students above 16 and below 18 can attend only if accompanied by school or faculty
                                        members <span className="text-red-600">*</span>
                                    </span>
                                </label>

                                <label className="flex items-start space-x-3 cursor-pointer mt-2">
                                    <input
                                        type="checkbox"
                                        checked={consentGiven}
                                        onChange={(e) => setConsentGiven(e.target.checked)}
                                        className="w-6 h-6 text-green-600 border-black-800 rounded focus:ring-green-500 mt-1"
                                    />
                                    <span className="text-lg text-gray-700 leading-relaxed">
                                        I hereby consent the use of my data by the organiser, exhibitors and sponsors of DWTC & KAOUN international to delivering services and for marketing
                                        purposes. I am aware that I can object to the sending of newsletters at any time. <span className="text-red-600">*</span>
                                    </span>
                                </label>
                            </div>


                        </div>
                    </div>

                    <div className="mt-6 space-x-3 flex justify-center">
                        {activeStep > 0 && <Button
                            variant="contained"
                            color="success"
                            onClick={() => handlePrevious()}
                            className='bg-gradient-to-r from-purple-950 to-gray-800'
                        >
                            PREVIOUS
                        </Button>}
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleNext}
                            className='bg-gradient-to-r from-green-500 to-green-950'
                        >
                            NEXT
                        </Button>
                    </div>

                </div>


            </div>



            <Footer />
        </div>
    )
}

export default RegistrationSummery