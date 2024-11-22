import React, { useState, useRef, useEffect } from 'react';
import '../../styles/dropdown.css';

function Dropdown({ label, options, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        const isSelected = selectedOptions.some((selected) => selected.id === option.id);
        const newSelections = isSelected
            ? selectedOptions.filter((selected) => selected.id !== option.id)
            : [...selectedOptions, option];

        setSelectedOptions(newSelections);
        onSelect(newSelections);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="find-jobs-dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="find-jobs-dropdown-toggle">
                {label} <span className="find-jobs-dropdown-arrow">▼</span>
            </button>
            {isOpen && (
                <div className="find-jobs-dropdown-menu">
                    <div className="find-jobs-dropdown-search">
                        <input type="text" placeholder="Tìm kiếm" />
                    </div>
                    <ul>
                        {options.map((option) => (
                            <li key={option.id} className="find-jobs-dropdown-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions.some((selected) => selected.id === option.id)}
                                        onChange={() => handleOptionClick(option)}
                                    />
                                    {option.name} {/* Đảm bảo rằng `option.name` được đặt ở đây */}
                                    <span>({option.count})</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Dropdown;
