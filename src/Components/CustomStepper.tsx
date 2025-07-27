const steps = [1, 2, 3, 4];

export default function CustomStepper({activeStep}:any) {
  return (
    // <div className="flex justify-center mb-6">
      <div className="flex items-center max-w-2xl px-10">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center w-full relative">
            {/* Step circle */}
            <div
              className={`z-10 w-8 h-8 rounded-full flex items-center justify-center text-lg font-semibold text-gray-300
                ${index <= activeStep ? 'bg-green-600 text-white' : 'border border-gray-300 text-gray-500 bg-white'}
              `}
            >
              {step}
            </div>

            {/* Progress line */}
             {index < steps.length - 1 && (
              <div className="flex-1 mx-2 relative">
                {/* Gray background line */}
                <div className="h-1.5 w-20 bg-gray-300 rounded-xl" />
                {/* Green progress line */}
                {index < activeStep && (
                  <div className="absolute top-0 left-0 h-1.5 w-20 bg-green-600 rounded-xl" />
                )}
                {/* Half green line for current active step */}
                {index === activeStep && (
                  <div className="absolute top-0 left-0 h-1.5 w-1/2 bg-green-600 rounded-xl" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    // </div>
  );
}