import { Link } from "react-router-dom";
import React, { useState } from 'react';
import Dropdown from "./DropDown";
import '../../styles/searchjobbar.css';

const industryData = [
    { id: 1, name: 'Bán Lẻ/Tiêu Dùng', count: 83 },
    { id: 2, name: 'Bảo Hiểm', count: 26 },
    { id: 3, name: 'Bất Động Sản', count: 92 },
    { id: 4, name: 'CEO & General Management', count: 73 },
    { id: 5, name: 'Chính Phủ/Phi Lợi Nhuận', count: 19 },
    { id: 6, name: 'Công Nghệ Thông Tin/Viễn Thông', count: 648 },
];

const fieldData = [
    { id: 1, name: 'Kinh doanh', count: 120 },
    { id: 2, name: 'Marketing', count: 85 },
    { id: 3, name: 'Giáo dục', count: 60 },
    { id: 4, name: 'Y tế', count: 45 },
    { id: 5, name: 'Công nghệ', count: 100 },
    { id: 6, name: 'Nông nghiệp', count: 30 },
];

const salaryData = [
    { id: 1, name: 'Dưới 10 triệu', count: 50 },
    { id: 2, name: '10 - 20 triệu', count: 80 },
    { id: 3, name: '20 - 30 triệu', count: 60 },
    { id: 4, name: '30 - 40 triệu', count: 40 },
    { id: 5, name: 'Trên 40 triệu', count: 20 },
];

const experienceData = [
    { id: 1, name: 'Mới tốt nghiệp', count: 30 },
    { id: 2, name: '1-2 năm', count: 70 },
    { id: 3, name: '3-5 năm', count: 50 },
    { id: 4, name: 'Trên 5 năm', count: 20 },
];

const employmentTypeData = [
    { id: 1, type: 'Toàn thời gian'},
    { id: 2, type: 'Bán thời gian'},
    { id: 3, type: 'Thực tập'},
];

function SearchJobBar() {
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    const toggleAdvancedFilters = () => {
        setShowAdvancedFilters(!showAdvancedFilters);
    };

    return (
        <div className='search-job-bar-body'>
            <div className='search-job-bar-search'>
                <div class="search-job-bar-container">
                    <input type="text" class="search-job-bar-input" placeholder="Vị trí tuyển dụng, tên công ty"></input>
                    <div class="search-job-bar-location-dropdown">
                        <span class="search-job-bar-location-icon">📍</span>
                        <span class="search-job-bar-location-text">Tất cả tỉnh/thành phố</span>
                        <span class="search-job-bar-dropdown-arrow">▼</span>
                    </div>
                    <Link className="search-job-bar-search-button" to="/search-job">
                        <span class="search-job-bar-search-icon">🔍</span>
                        Tìm kiếm
                    </Link>
                </div>
                <button
                    className="search-job-btn-advanced"
                    onClick={toggleAdvancedFilters}
                >
                    {showAdvancedFilters ? 'Ẩn nâng cao' : 'Lọc nâng cao'}
                </button>
            </div>
            {showAdvancedFilters && (
                <div className="search-job-advanced-filters">
                    <Dropdown label="Ngành nghề" options={industryData} onSelect={(selected) => console.log(selected)} />
                    <Dropdown label="Lĩnh vực" options={fieldData} onSelect={(selected) => console.log(selected)} />
                    <Dropdown label="Lương" options={salaryData} onSelect={(selected) => console.log(selected)} />
                    <Dropdown label="Kinh nghiệm" options={experienceData} onSelect={(selected) => console.log(selected)} />
                    <Dropdown label="Hình thức" options={employmentTypeData} onSelect={(selected) => console.log(selected)} />
                </div>
            )}
        </div>

    )
}

export default SearchJobBar;