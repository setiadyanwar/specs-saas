import React, { useState, useRef, useEffect } from 'react';
import { Mic, ChevronDown, Check, ArrowUp } from 'lucide-react';
import './PromptInput.css';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
        {value} <ChevronDown size={14} className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((opt) => (
            <div 
              key={opt} 
              className={`dropdown-item ${opt === value ? 'selected' : ''}`}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
              {opt === value && <Check size={14} className="check-icon" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface PromptInputProps {
  onSearch?: (query: string, model: string, type: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [model, setModel] = useState('Grok 4.1');
  const [type, setType] = useState('Learn');

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(query, model, type);
    }
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        className="search-input" 
        placeholder="Ask Something be creative..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit();
        }}
      />
      
      <div className="search-bottom-row">
        <div className="search-options">
          <CustomSelect 
            options={['Grok 4.1', 'GPT-4', 'Claude 3']} 
            value={model} 
            onChange={setModel} 
          />
          <CustomSelect 
            options={['Learn', 'Ask', 'Plan']} 
            value={type} 
            onChange={setType} 
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          {query.trim().length > 0 ? <ArrowUp size={18} /> : <Mic size={18} />}
        </button>
      </div>
    </div>
  );
};
