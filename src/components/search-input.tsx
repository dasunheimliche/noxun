interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function SearchInput({ onChange, value }: SearchInputProps) {
  return (
    <input
      className="outline-[1px] transition-all focus-visible:outline-[2px]  text-[#808080] outline-[#b3b3b3] bg-transparent focus-visible:right-0 outline-none h-9 rounded-2xl indent-4"
      type="text"
      onChange={onChange}
      value={value}
      placeholder="buscar..."
    />
  );
}
