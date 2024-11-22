import { Link } from "react-router-dom";
import React, { useState } from 'react';
import Dropdown from "./DropDown";
import '../../styles/searchjobbar.css';
import axios from 'axios';


function SearchJobBar() {
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [keyword, setKeyword] = useState('');

    // hàm trong DropDown 
    // options={fieldData} onSelect={(selected) => console.log(selected)
    //options={employmentTypeData} onSelect={(selected) => console.log(selected)}
    //options={experienceData} onSelect={(selected) => console.log(selected)}
    //options={salaryData} onSelect={(selected) => console.log(selected)}
    //options={salaryData} onSelect={(selected) => console.log(selected)} 
    const toggleAdvancedFilters = () => {
        setShowAdvancedFilters(!showAdvancedFilters);
    };
    const handleSalarySelect = (value) => {
        // Sử dụng regex để làm sạch khoảng trắng trước và sau dấu gạch
        const cleanedValue = value.replace(/\s+/g, '');  // Loại bỏ tất cả khoảng trắng
    
        // Kiểm tra định dạng số - số
        const regex = /^(\d+)-(\d+)$/;
    
        const match = cleanedValue.match(regex);
        if (match) {
            const min = match[1];  // Lương tối thiểu
            const max = match[2];  // Lương tối đa
            setMinSalary(min);
            setMaxSalary(max);
        } else {
            console.log("Vui lòng nhập lương theo định dạng đúng (VD: 10000-20000).");
        }
    };
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [industry, setIndustry] = useState('');
    const [skills, setSkills] = useState('');
    const [companyName, setCompanyName] = useState('');

    const [filteredJobs, setFilteredJobs] = useState([]);
    const [jobToApply, setJobToApply] = useState(null);
    const handleSearch = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/jobs/filter', {
            params: {
              keyword,
              job_type: jobType,
              location:location,
              min_salary: minSalary,
              max_salary: maxSalary,
              company_name: companyName,
              industry:industry,
              skills: skills,
            },
          });
          console.log('Filtered jobs:', response.data);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // Ngừng hành động mặc định của phím Enter
            handleSearch();  // Gọi hàm search khi nhấn Enter
        }
    };
    const handleIndustrySelect = (value) => {
        setIndustry(value);
    };

    const handleJobTypeSelect = (value) => {
        setJobType(value);
    };
    const handleJobSkillSelect = (value) => {
        setSkills(value);
    };
    const handleJobSelect = (value) => {
        setLocation(value); // vi tri
    };
    return (
        <div className='search-job-bar-body'>
            <div className='search-job-bar-search'>
                <div class="search-job-bar-container">
                    <input type="text" class="search-job-bar-input" placeholder="Vị trí tuyển dụng, tên công ty"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}></input>
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
                    <Dropdown label="Địa điểm" isInputField={true}
                        onSelect={handleJobSelect}/>
                    <Dropdown label="Lĩnh vực" isInputField={true}
                       onSelect={handleIndustrySelect}/>
                    <Dropdown label="Lương" isInputField={true}
                        onSelect={handleSalarySelect}/>
                    <Dropdown label="Kinh nghiệm" isInputField={true}
                        onSelect={handleJobSkillSelect}/>
                    <Dropdown label="Hình thức"  isInputField={true}
                        onSelect={handleJobTypeSelect}/>
                    
                </div>
                
            )}
            <button onClick={handleSearch}> Tim Kiem</button>
        </div>
        

    )
}

export default SearchJobBar;