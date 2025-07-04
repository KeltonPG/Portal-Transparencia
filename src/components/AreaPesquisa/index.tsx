import type { ChangeEvent } from 'react';
import './AreaPesquisa.scss';
import { FiSearch } from 'react-icons/fi';

type Props = {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
};

export default function SearchInput({ placeholder, value, onChange }: Props) {
  return (
    <div className="search-input">
      <FiSearch />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </div>
  );
}