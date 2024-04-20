interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function SearchInput({ onChange, value }: SearchInputProps) {
  return (
    <input
      className="outline-[1px] focus-visible:outline-[2px] outline-[#CFCECC] bg-transparent focus-visible:right-0 outline-none h-9 rounded-2xl indent-4"
      type="text"
      onChange={onChange}
      value={value}
      placeholder="buscar..."
    />
  );
}
