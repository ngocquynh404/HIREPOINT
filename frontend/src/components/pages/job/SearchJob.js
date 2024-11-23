import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../../../styles/searchjob.css';
import '../../../styles/searchjobbar.css';
import SearchJobBar from '../../UI/SearchJobBar';
import ApplyJob from '../applicant/ApplyJob';
import axios from 'axios';
import Dropdown from "../../UI/DropDown";


export default function Jobs() {
    {/* const jobData = [
        {
            id: 1,
            logo: 'logo1.png',
            title: 'Giáo Viên Văn Từ 1 Năm Kinh Nghi...',
            company: 'Công ty TNHH Tư vấn giải pháp Giáo dục Minh Hoàng',
            salary: 'Trên 10 triệu',
            location: 'Hà Nội',
            updateTime: '2 giờ',
            remainingDays: 10
        },
        {
            id: 2,
            logo: 'logo2.png',
            title: 'Chuyên Viên Đào Tạo Ngành F&B',
            company: 'Công ty Cổ phần Tầm Nhìn Quốc Tế Aladdin',
            salary: '15 - 20 triệu',
            location: 'Hà Nội',
            updateTime: '1 ngày',
            remainingDays: 5
        },
        {
            id: 3,
            logo: 'logo3.png',
            title: 'Trưởng Phòng QA Làm Việc Tại Hà Nội',
            company: 'Công ty CP Xây dựng Kết cấu thép IPC',
            salary: 'Tới 35 triệu',
            location: 'Hà Nội & 2 nơi khác',
            updateTime: '3 ngày',
            remainingDays: 7
        },
        {
            id: 4,
            logo: 'logo4.png',
            title: 'Nhân Viên Kinh Doanh Bất Động Sản',
            company: 'Công ty Bất Động Sản ABC',
            salary: '10 - 15 triệu',
            location: 'Hà Nội',
            updateTime: '5 ngày',
            remainingDays: 12
        },
        {
            id: 5,
            logo: 'logo5.png',
            title: 'Chuyên Viên Marketing Online',
            company: 'Công ty TNHH Digital Marketing',
            salary: '12 - 18 triệu',
            location: 'Hồ Chí Minh',
            updateTime: '1 tuần',
            remainingDays: 8
        },
        {
            id: 6,
            logo: 'logo6.png',
            title: 'Kỹ Sư Xây Dựng Dân Dụng',
            company: 'Công ty Xây Dựng XYZ',
            salary: '15 - 25 triệu',
            location: 'Đà Nẵng',
            updateTime: '2 tuần',
            remainingDays: 15
        },
        {
            id: 7,
            logo: 'logo7.png',
            title: 'Nhân Viên Hỗ Trợ Khách Hàng',
            company: 'Công ty TNHH Dịch Vụ Khách Hàng',
            salary: '8 - 12 triệu',
            location: 'Hà Nội',
            updateTime: '3 ngày',
            remainingDays: 9
        },
        {
            id: 8,
            logo: 'logo8.png',
            title: 'Nhà Phát Triển Phần Mềm',
            company: 'Công ty Công Nghệ ABC',
            salary: '20 - 30 triệu',
            location: 'Hồ Chí Minh',
            updateTime: '6 ngày',
            remainingDays: 14
        },
        {
            id: 9,
            logo: 'logo9.png',
            title: 'Quản Lý Dự Án IT',
            company: 'Công ty TNHH Công Nghệ Thông Tin',
            salary: '25 - 35 triệu',
            location: 'Hà Nội',
            updateTime: '2 ngày',
            remainingDays: 4
        },
        {
            id: 10,
            logo: 'logo10.png',
            title: 'Giáo Viên Tiếng Anh',
            company: 'Trường Quốc Tế XYZ',
            salary: '10 - 15 triệu',
            location: 'Hà Nội',
            updateTime: '1 ngày',
            remainingDays: 6
        },
        {
            id: 11,
            logo: 'logo11.png',
            title: 'Nhân Viên Telesales',
            company: 'Công ty TNHH Bán Hàng Trực Tuyến',
            salary: '8 - 12 triệu',
            location: 'Hồ Chí Minh',
            updateTime: '4 ngày',
            remainingDays: 10
        },
        {
            id: 12,
            logo: 'logo12.png',
            title: 'Kỹ Sư Điện',
            company: 'Công ty CP Kỹ Thuật Điện',
            salary: '15 - 20 triệu',
            location: 'Đà Nẵng',
            updateTime: '2 tuần',
            remainingDays: 20
        },
        {
            id: 13,
            logo: 'logo13.png',
            title: 'Chuyên Viên Phân Tích Dữ Liệu',
            company: 'Công ty TNHH Phân Tích Dữ Liệu',
            salary: '20 - 30 triệu',
            location: 'Hà Nội',
            updateTime: '1 tuần',
            remainingDays: 12
        },
        {
            id: 14,
            logo: 'logo14.png',
            title: 'Thiết Kế Đồ Họa',
            company: 'Công ty Thiết Kế ABC',
            salary: '12 - 18 triệu',
            location: 'Hồ Chí Minh',
            updateTime: '5 ngày',
            remainingDays: 9
        },
        {
            id: 15,
            logo: 'logo15.png',
            title: 'Nhân Viên Nhập Liệu',
            company: 'Công ty TNHH Dịch Vụ Văn Phòng',
            salary: '7 - 10 triệu',
            location: 'Hà Nội',
            updateTime: '3 ngày',
            remainingDays: 10
        },
        {
            id: 16,
            logo: 'logo16.png',
            title: 'Lập Trình Viên Web',
            company: 'Công ty Công Nghệ XYZ',
            salary: '15 - 25 triệu',
            location: 'Đà Nẵng',
            updateTime: '2 tuần',
            remainingDays: 18
        },
        {
            id: 17,
            logo: 'logo17.png',
            title: 'Chuyên Viên Tư Vấn Tài Chính',
            company: 'Công ty Tài Chính ABC',
            salary: '20 - 30 triệu',
            location: 'Hà Nội',
            updateTime: '4 ngày',
            remainingDays: 11
        },
        {
            id: 18,
            logo: 'logo18.png',
            title: 'Nhân Viên Kho Vận',
            company: 'Công ty Giao Nhận Vận Tải',
            salary: '10 - 15 triệu',
            location: 'Hồ Chí Minh',
            updateTime: '6 ngày',
            remainingDays: 15
        },
        {
            id: 19,
            logo: 'logo19.png',
            title: 'Quản Trị Hệ Thống',
            company: 'Công ty TNHH Công Nghệ',
            salary: '25 - 35 triệu',
            location: 'Hà Nội',
            updateTime: '1 tuần',
            remainingDays: 10
        },
        {
            id: 20,
            logo: 'logo20.png',
            title: 'Giáo Viên Mầm Non',
            company: 'Trường Mầm Non ABC',
            salary: '8 - 12 triệu',
            location: 'Đà Nẵng',
            updateTime: '5 ngày',
            remainingDays: 8
        },
        {
            id: 21,
            logo: 'logo21.png',
            title: 'Kỹ Sư Cơ Điện',
            company: 'Công ty CP Cơ Điện',
            salary: '20 - 30 triệu',
            location: 'Hà Nội',
            updateTime: '3 ngày',
            remainingDays: 5
        },
        {
            id: 22,
            logo: 'logo22.png',
            title: 'Nhân Viên Kế Toán',
            company: 'Công ty Kế Toán ABC',
            salary: '10 - 15 triệu',
            location: 'Hồ Chí Minh',
            updateTime: '4 ngày',
            remainingDays: 7
        },
        {
            id: 23,
            logo: 'logo23.png',
            title: 'Chuyên Viên Phát Triển Kinh Doanh',
            company: 'Công ty TNHH Phát Triển Kinh Doanh',
            salary: '15 - 25 triệu',
            location: 'Hà Nội',
            updateTime: '2 tuần',
            remainingDays: 14
        },
        {
            id: 24,
            logo: 'logo24.png',
            title: 'Chuyên Viên Quan Hệ Khách Hàng',
            company: 'Công ty TNHH Dịch Vụ Khách Hàng',
            salary: '10 - 15 triệu',
            location: 'Đà Nẵng',
            updateTime: '3 ngày',
            remainingDays: 6
        },
        {
            id: 25,
            logo: 'logo25.png',
            title: 'Trợ Lý Giám Đốc',
            company: 'Công ty Cổ phần Đầu tư ABC',
            salary: '15 - 20 triệu',
            location: 'Hà Nội',
            updateTime: '2 ngày',
            remainingDays: 9
        },
        {
            id: 26,
            logo: 'logo26.png',
            title: 'Nhân Viên Bán Hàng',
            company: 'Công ty TNHH Bán Lẻ',
            salary: '8 - 12 triệu',
            location: 'Hồ Chí Minh',
            updateTime: '5 ngày',
            remainingDays: 11
        },
        {
            id: 27,
            logo: 'logo27.png',
            title: 'Kỹ Sư Thương Mại',
            company: 'Công ty CP Kỹ Sư Thương Mại',
            salary: '20 - 30 triệu',
            location: 'Hà Nội',
            updateTime: '6 ngày',
            remainingDays: 13
        },
        {
            id: 28,
            logo: 'logo28.png',
            title: 'Nhân Viên Hành Chính Nhân Sự',
            company: 'Công ty TNHH Hành Chính',
            salary: '10 - 15 triệu',
            location: 'Hà Nội',
            updateTime: '4 ngày',
            remainingDays: 8
        },
        {
            id: 29,
            logo: 'logo29.png',
            title: 'Chuyên Viên SEO',
            company: 'Công ty TNHH SEO ABC',
            salary: '12 - 18 triệu',
            location: 'Hồ Chí Minh',
            updateTime: '1 tuần',
            remainingDays: 10
        },
        {
            id: 30,
            logo: 'logo30.png',
            title: 'Nhân Viên IT Helpdesk',
            company: 'Công ty TNHH Dịch Vụ IT',
            salary: '10 - 15 triệu',
            location: 'Hà Nội',
            updateTime: '5 ngày',
            remainingDays: 7
        },
        {
            id: 31,
            logo: 'logo31.png',
            title: 'Kỹ Sư Phần Mềm',
            company: 'Công ty Công Nghệ XYZ',
            salary: '20 - 30 triệu',
            location: 'Đà Nẵng',
            updateTime: '3 ngày',
            remainingDays: 9
        },
        {
            id: 32,
            logo: 'logo32.png',
            title: 'Nhân Viên Quản Lý Chất Lượng',
            company: 'Công ty TNHH Quản Lý Chất Lượng',
            salary: '15 - 25 triệu',
            location: 'Hồ Chí Minh',
            updateTime: '4 ngày',
            remainingDays: 8
        },
        {
            id: 33,
            logo: 'logo33.png',
            title: 'Chuyên Viên Nghiên Cứu Thị Trường',
            company: 'Công ty TNHH Nghiên Cứu Thị Trường',
            salary: '10 - 15 triệu',
            location: 'Hà Nội',
            updateTime: '2 tuần',
            remainingDays: 13
        },
        {
            id: 34,
            logo: 'logo34.png',
            title: 'Nhân Viên Thiết Kế Web',
            company: 'Công ty Thiết Kế ABC',
            salary: '15 - 20 triệu',
            location: 'Đà Nẵng',
            updateTime: '5 ngày',
            remainingDays: 9
        },
        {
            id: 35,
            logo: 'logo35.png',
            title: 'Quản Lý Nhân Sự',
            company: 'Công ty TNHH Quản Lý Nhân Sự',
            salary: '25 - 35 triệu',
            location: 'Hồ Chí Minh',
            updateTime: '2 ngày',
            remainingDays: 6
        }
    ];*/}

    const [jobList, setJobList] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const toggleFavorite = (jobTitle) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(jobTitle)) {
                return prevFavorites.filter((title) => title !== jobTitle); // Xóa yêu thích
            } else {
                return [...prevFavorites, jobTitle]; // Thêm vào yêu thích
            }
        });
    };
    const [currentPage, setCurrentPage] = useState(0);
    const jobsPerPage = 15;

    // Calculate total pages
    const totalPages = filteredJobs && Array.isArray(filteredJobs) ? Math.ceil(filteredJobs.length / jobsPerPage) : 0;


    // Get current jobs for the current page
    const currentJobs = Array.isArray(filteredJobs) ? filteredJobs.slice(currentPage * jobsPerPage, (currentPage + 1) * jobsPerPage) : [];

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        // Assuming this function fetches job data
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/jobs');
                setFilteredJobs(response.data.jobs);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, []);
    useEffect(() => {
        if (Array.isArray(jobList)) {
            setFilteredJobs(jobList);
        } else {
            setFilteredJobs([]);
        }
    }, [jobList]);

    /////apply job
    const [favoriteJobs, setFavoriteJobs] = useState([]); // Danh sách công việc yêu thích
    const handleFavoriteToggle = (jobTitle) => {
        setFavoriteJobs((prevFavorites) =>
            prevFavorites.includes(jobTitle)
                ? prevFavorites.filter((title) => title !== jobTitle)
                : [...prevFavorites, jobTitle]
        );
    };

    const openApplyForm = (job) => {
        setJobToApply(job); // Gán công việc được chọn
    };
    const closeApplyForm = () => {
        setJobToApply(null); // Đóng form ứng tuyển
    };
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        // Chạy khi `jobList` thay đổi
        if (searchQuery) {
            const filtered = jobList.filter((job) =>
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredJobs(filtered);
        } else {
            setFilteredJobs(jobList);
        }
    }, [searchQuery, jobList]); // Chỉ chạy khi `searchQuery` hoặc `jobList` thay đổi
    // Chạy lại khi `searchQuery` hoặc `jobList` thay đổi


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
        const cleanedValue = value.replace(/\s+/g, '');  // Loại bỏ tất cả khoảng trắng
        const regex = /^(\d+)-(\d+)$/;
        const match = cleanedValue.match(regex);
        if (match) {
            const min = match[1];
            const max = match[2];
            setMinSalary(min);
            setMaxSalary(max);
        } else {
            console.log("Vui lòng nhập lương theo định dạng đúng (VD: 10000-20000).");
        }
    };


    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [industry, setIndustry] = useState('');
    const [skills, setSkills] = useState('');
    const [companyName, setCompanyName] = useState('');


    const [jobToApply, setJobToApply] = useState(null);
    const [jobs, setJobs] = useState([]);
    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/jobs/filter', {
                params: {
                    keyword: keyword || '',
                    job_type: jobType || '',
                    location: location || '',
                    min_salary: minSalary || 0,
                    max_salary: maxSalary || 1000000,
                    company_name: companyName || '',
                    industry: industry || '',
                    skills: skills.length ? skills : []
                },
            });

            console.log('Filtered jobs:', response.data);
            setJobs(response.data); // Cập nhật state jobs
    
            // Reset các giá trị sau khi tìm kiếm
            setKeyword(''); // Reset giá trị keyword
            setJobType(''); // Reset giá trị jobType
            setLocation(''); // Reset giá trị location
            setMinSalary(0); // Reset giá trị minSalary
            setMaxSalary(1000000); // Reset giá trị maxSalary
            setCompanyName(''); // Reset giá trị companyName
            setIndustry(''); // Reset giá trị industry
            setSkills([]); // Reset giá trị skills
    
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
        <div className='search-job-board'>
            <div className='search-job-header'>
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
                            <Dropdown label="Ngành nghề" isInputField={true}
                                onSelect={handleJobSelect} />
                            <Dropdown label="Lĩnh vực" isInputField={true}
                                onSelect={handleIndustrySelect} />
                            <Dropdown label="Lương" isInputField={true} onSelect={handleSalarySelect} />
                            <Dropdown label="Kinh nghiệm" isInputField={true}
                                onSelect={handleJobSkillSelect} />
                            <Dropdown label="Hình thức" isInputField={true}
                                onSelect={handleJobTypeSelect} />

                        </div>

                    )}
                    <button onClick={handleSearch}> Tim Kiem</button>
                </div>
            </div>
            <div className="search-job-banner">
                <div className="search-job-skills">
                    <span className="search-job-skill">IT <span className="search-job-skill-count">200</span></span>
                    <span className="search-job-skill">Kinh doanh <span className="search-job-skill-count">181</span></span>
                    <span className="search-job-skill">Xây dựng <span className="search-job-skill-count">137</span></span>
                    <span className="search-job-skill">Giáo dục <span className="search-job-skill-count">125</span></span>
                    <span className="search-job-skill">Photoshop <span className="search-job-skill-count">122</span></span>
                    <span className="search-job-skill">Khác <span className="search-job-skill-count">3155</span></span>
                </div>

                <p className="search-job-result">Tìm thấy <span className="search-job-result-count">3,752</span> việc làm phù hợp với yêu cầu của bạn.</p>

                <div className="search-job-preferences">
                    <span>Ưu tiên hiển thị:</span>
                    <label><input type="radio" name="preference" /> Tất cả</label>
                    <label><input type="radio" name="preference" /> Tin mới nhất</label>
                    <label><input type="radio" name="preference" /> Cần tuyển gấp</label>
                    <label><input type="radio" name="preference" /> Lương (cao - thấp)</label>
                    <label><input type="radio" name="preference" /> Ngày đăng (mới nhất)</label>
                    <label><input type="radio" name="preference" /> Ngày đăng (cũ nhất)</label>
                </div>
            </div>
            <div className='search-job-board-list'>
                <div className='search-job-board-list-left'>
                    <div className='search-job-list'>
                        <div className="search-job-board-list-container">
                            {jobs.length > 0 ? (
                                jobs.map((job) => (
                                    <div key={job._id} className="search-job-info-item-card">
                                        <div className="search-job-board-company-logo">
                                            <img src={'defaultLogo.png'} alt="Company Logo" />
                                        </div>
                                        <div className="search-job-info-sections">
                                            <Link to={`/jobs/jobdetail/${job._id}`} className="search-job-info-position-title">
                                                <h2>{job.title}</h2>
                                            </Link>
                                            <p className="search-job-info-company-name">{job.companyName}</p>
                                            <span className="search-job-salary-info">{job.salary}</span>
                                            <div className="search-job-info-details">
                                                <span className="search-job-location-info">📍 {job.location}</span>
                                                <span className="search-job-remaining-days">⏳ Còn{' '}
                                                    {isNaN(
                                                        Math.max(
                                                            Math.ceil(
                                                                (new Date(job.application_deadline) - new Date()) /
                                                                (1000 * 60 * 60 * 24)
                                                            ),
                                                            0
                                                        )
                                                    )
                                                        ? 0 // If NaN, display 0
                                                        : Math.max(
                                                            Math.ceil(
                                                                (new Date(job.application_deadline) - new Date()) /
                                                                (1000 * 60 * 60 * 24)
                                                            ),
                                                            0
                                                        )}{' '}
                                                    ngày để ứng tuyển
                                                </span>
                                            </div>
                                            <p className="search-job-update">Cập nhật {job.updateTime} trước</p>
                                        </div>
                                        <div className="search-job-salary-apply">
                                            <button className="search-job-apply-button" onClick={() => openApplyForm(job)}>Ứng tuyển</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No jobs found</p>
                            )}
                        </div>
                        <div className="search-job-pagination-indicator">
                            <div className="search-job-nav-buttons">
                                <button className="search-job-nav-button" onClick={prevPage} disabled={currentPage === 0}>‹</button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        className={`search-job-pagination-dot ${index === currentPage ? 'active' : ''}`}
                                        onClick={() => setCurrentPage(index)}
                                    />
                                ))}
                                <button className="search-job-nav-button" onClick={nextPage} disabled={currentPage === totalPages - 1}>›</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {jobToApply && (
                <ApplyJob job={jobToApply} onClose={closeApplyForm} />

            )}
        </div>
    )
}