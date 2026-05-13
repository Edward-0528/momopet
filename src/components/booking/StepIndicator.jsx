import { Check } from 'lucide-react';

const STEPS = [
  { id: 1, key: 'datetime', label: 'Date & Time' },
  { id: 2, key: 'catinfo',  label: 'Cat Info' },
  { id: 3, key: 'confirm',  label: 'Confirm' },
];

export default function StepIndicator({ currentStep }) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center justify-center gap-0" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {STEPS.map((step, i) => {
        const isDone    = i < currentIndex;
        const isActive  = step.key === currentStep;

        return (
          <div key={step.key} className="flex items-center">
            {/* Circle */}
            <div className="flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-all duration-300"
                style={{
                  backgroundColor: isDone ? '#C4603A' : isActive ? '#C4603A' : '#EAD9C5',
                  color: isDone || isActive ? '#fff' : '#7A4F35',
                  boxShadow: isActive ? '0 0 0 3px rgba(196,96,58,0.25)' : 'none',
                }}
              >
                {isDone ? <Check size={14} strokeWidth={3} /> : step.id}
              </div>
              <span
                className="text-xs font-bold mt-1 whitespace-nowrap"
                style={{ color: isActive ? '#C4603A' : '#7A4F35' }}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className="w-12 sm:w-16 h-0.5 mb-5 mx-1 transition-colors duration-300"
                style={{ backgroundColor: i < currentIndex ? '#C4603A' : '#EAD9C5' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
