const steps = [1, 2, 3, 4];

export default function CustomStepper({activeStep}:any) {
  return (
    <div className="flex items-center max-w-2xl px-10">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center w-full relative">
          <div
            className={`z-10 w-8 h-8 rounded-full flex items-center justify-center text-lg font-semibold
              ${index < activeStep ? 'bg-green-600 text-white' : ''}
              ${index === activeStep ? 'bg-green-600 text-white' : ''}
              ${index > activeStep ? 'border border-gray-300 text-gray-500 bg-white' : ''}
            `}
          >
            {index < activeStep ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            <div className="flex-1 mx-2 relative">
              <div className="h-1.5 w-20 bg-gray-300 rounded-xl" />
              {index < activeStep && (
                <div className="absolute top-0 left-0 h-1.5 w-20 bg-green-600 rounded-xl" />
              )}
              {index === activeStep && (
                <div className="absolute top-0 left-0 h-1.5 w-1/2 bg-green-600 rounded-xl" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}