import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}

export function CustomSelect({ options, value, onChange, placeholder }: CustomSelectProps) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-12 px-4 rounded-xl glass bg-dark-900/50 border border-white/10 appearance-none focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors cursor-pointer ${value ? 'text-white' : 'text-gray-500'}`}
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-dark-900 text-white">
            {opt}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <ChevronDown size={18} />
      </div>
    </div>
  );
}
