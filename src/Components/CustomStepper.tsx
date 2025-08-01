interface CustomStepperProps {
  activeStep: number;
  totalSteps: number;
}

export default function CustomStepper({ activeStep, totalSteps }: CustomStepperProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center w-full max-w-md sm:max-w-lg lg:max-w-2xl px-4 sm:px-6 lg:px-10">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-1 relative">
          <div
            className={`z-10 w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 rounded-full flex items-center justify-center text-sm sm:text-base lg:text-lg font-semibold
              ${index <= activeStep ? 'bg-green-600 text-white' : 'border border-gray-300 text-gray-500 bg-white'}
            `}
          >
            {index < activeStep ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 sm:h-5 w-4 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              step
            )}
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 mx-1 sm:mx-2 relative">
              <div className="h-1 sm:h-1.5 w-full bg-gray-300 rounded-xl" />
              {index < activeStep && (
                <div className="absolute top-0 left-0 h-1 sm:h-1.5 w-full bg-green-600 rounded-xl" />
              )}
              {index === activeStep && (
                <div className="absolute top-0 left-0 h-1 sm:h-1.5 w-1/2 bg-green-600 rounded-xl" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}