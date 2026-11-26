import { Search } from 'lucide-react';

const SearchInput = ({ value, onChange, placeholder = 'Search detections...' }) => (
  <div className="relative w-full max-w-md">
    <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="input-base pl-11"
      placeholder={placeholder}
    />
  </div>
);

export default SearchInput;
