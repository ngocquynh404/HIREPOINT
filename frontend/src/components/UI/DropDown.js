import React, { useState, useRef, useEffect } from 'react';
import '../../styles/dropdown.css';

function Dropdown({ label, options, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dropdownRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState(''); // Dùng để lưu trữ giá trị tìm kiếm
    const [inputValue, setInputValue] = useState(""); // Dùng để lưu trữ giá trị của input (nếu cần)

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        const isSelected = selectedOptions.some((selected) => selected.id === option.id);
        const newSelections = isSelected
            ? selectedOptions.filter((selected) => selected.id !== option.id)
            : [...selectedOptions, option];

        setSelectedOptions(newSelections);
        onSelect(newSelections); // Truyền lại các lựa chọn được chọn
    };

    // Đóng dropdown khi người dùng nhấp ra ngoài
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

    // Cập nhật giá trị khi người dùng thay đổi input
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onSelect(value); 
    };

    return (
        <div className="find-jobs-dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="find-jobs-dropdown-toggle">
                {label} <span className="find-jobs-dropdown-arrow">▼</span>
            </button>
            {isOpen && (
                <div className="find-jobs-dropdown-menu">
                    <div className="find-jobs-dropdown-search">
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm" 
                            value={inputValue}
                            onChange={handleInputChange}  // Xử lý sự kiện khi người dùng nhập
                        />
                    </div>
                    {/* Hiển thị danh sách các options nếu cần */}
                    {/*<ul>
                        {options.filter(option => 
                            option.name.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((option) => (
                            <li key={option.id} className="find-jobs-dropdown-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions.some((selected) => selected.id === option.id)}
                                        onChange={() => handleOptionClick(option)}
                                    />
                                    {option.name}
                                </label>
                            </li>
                        ))}
                    </ul>*/}
                </div>
            )}
        </div>
    );
}

export default Dropdown;
