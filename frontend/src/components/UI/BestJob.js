import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../../styles/bestjob.css';

export default function BestJob() {
    const jobData = [
        {
            logo: 'logo1.png',
            title: 'Giáo Viên Văn Từ 1 Năm Kinh Nghi...',
            company: 'Công ty TNHH Tư vấn giải pháp Giáo dục Minh Hoàng',
            salary: 'Trên 10 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo2.png',
            title: 'Chuyên Viên Đào Tạo Ngành F&B',
            company: 'Công ty Cổ phần Tầm Nhìn Quốc Tế Aladdin',
            salary: '15 - 20 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo3.png',
            title: 'Trưởng Phòng QA Làm Việc Tại Hà Nội',
            company: 'Công ty CP Xây dựng Kết cấu thép IPC',
            salary: 'Tới 35 triệu',
            location: 'Hà Nội & 2 nơi khác'
        },
        {
            logo: 'logo4.png',
            title: 'Nhân Viên Kinh Doanh Bất Động Sản',
            company: 'Công ty Bất Động Sản ABC',
            salary: '10 - 15 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo5.png',
            title: 'Chuyên Viên Marketing Online',
            company: 'Công ty TNHH Digital Marketing',
            salary: '12 - 18 triệu',
            location: 'Hồ Chí Minh'
        },
        {
            logo: 'logo6.png',
            title: 'Kỹ Sư Xây Dựng Dân Dụng',
            company: 'Công ty Xây Dựng XYZ',
            salary: '15 - 25 triệu',
            location: 'Đà Nẵng'
        },
        {
            logo: 'logo7.png',
            title: 'Nhân Viên Hỗ Trợ Khách Hàng',
            company: 'Công ty TNHH Dịch Vụ Khách Hàng',
            salary: '8 - 12 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo8.png',
            title: 'Nhà Phát Triển Phần Mềm',
            company: 'Công ty Công Nghệ ABC',
            salary: '20 - 30 triệu',
            location: 'Hồ Chí Minh'
        },
        {
            logo: 'logo9.png',
            title: 'Quản Lý Dự Án IT',
            company: 'Công ty TNHH Công Nghệ Thông Tin',
            salary: '25 - 35 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo10.png',
            title: 'Giáo Viên Tiếng Anh',
            company: 'Trường Quốc Tế XYZ',
            salary: '10 - 15 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo11.png',
            title: 'Nhân Viên Telesales',
            company: 'Công ty TNHH Bán Hàng Trực Tuyến',
            salary: '8 - 12 triệu',
            location: 'Hồ Chí Minh'
        },
        {
            logo: 'logo12.png',
            title: 'Kỹ Sư Điện',
            company: 'Công ty CP Kỹ Thuật Điện',
            salary: '15 - 20 triệu',
            location: 'Đà Nẵng'
        },
        {
            logo: 'logo13.png',
            title: 'Chuyên Viên Phân Tích Dữ Liệu',
            company: 'Công ty TNHH Phân Tích Dữ Liệu',
            salary: '20 - 30 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo14.png',
            title: 'Thiết Kế Đồ Họa',
            company: 'Công ty Thiết Kế ABC',
            salary: '12 - 18 triệu',
            location: 'Hồ Chí Minh'
        },
        {
            logo: 'logo15.png',
            title: 'Nhân Viên Nhập Liệu',
            company: 'Công ty TNHH Dịch Vụ Văn Phòng',
            salary: '7 - 10 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo16.png',
            title: 'Lập Trình Viên Web',
            company: 'Công ty Công Nghệ XYZ',
            salary: '15 - 25 triệu',
            location: 'Đà Nẵng'
        },
        {
            logo: 'logo17.png',
            title: 'Chuyên Viên Tư Vấn Tài Chính',
            company: 'Công ty Tài Chính ABC',
            salary: '20 - 30 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo18.png',
            title: 'Nhân Viên Kho Vận',
            company: 'Công ty Giao Nhận Vận Tải',
            salary: '10 - 15 triệu',
            location: 'Hồ Chí Minh'
        },
        {
            logo: 'logo19.png',
            title: 'Quản Trị Hệ Thống',
            company: 'Công ty TNHH Công Nghệ',
            salary: '25 - 35 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo20.png',
            title: 'Giáo Viên Mầm Non',
            company: 'Trường Mầm Non ABC',
            salary: '8 - 12 triệu',
            location: 'Đà Nẵng'
        },
        {
            logo: 'logo21.png',
            title: 'Kỹ Sư Cơ Điện',
            company: 'Công ty CP Cơ Điện',
            salary: '20 - 30 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo22.png',
            title: 'Nhân Viên Kế Toán',
            company: 'Công ty Kế Toán ABC',
            salary: '10 - 15 triệu',
            location: 'Hồ Chí Minh'
        },
        {
            logo: 'logo23.png',
            title: 'Chuyên Viên Phát Triển Kinh Doanh',
            company: 'Công ty TNHH Phát Triển Kinh Doanh',
            salary: '15 - 25 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo24.png',
            title: 'Chuyên Viên Quan Hệ Khách Hàng',
            company: 'Công ty TNHH Dịch Vụ Khách Hàng',
            salary: '10 - 15 triệu',
            location: 'Đà Nẵng'
        },
        {
            logo: 'logo25.png',
            title: 'Trợ Lý Giám Đốc',
            company: 'Công ty Cổ phần Đầu tư ABC',
            salary: '15 - 20 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo26.png',
            title: 'Nhân Viên Bán Hàng',
            company: 'Công ty TNHH Bán Lẻ',
            salary: '8 - 12 triệu',
            location: 'Hồ Chí Minh'
        },
        {
            logo: 'logo27.png',
            title: 'Kỹ Sư Thương Mại',
            company: 'Công ty CP Kỹ Sư Thương Mại',
            salary: '20 - 30 triệu',
            location: 'Đà Nẵng'
        },
        {
            logo: 'logo28.png',
            title: 'Nhân Viên Hành Chính Nhân Sự',
            company: 'Công ty TNHH Hành Chính',
            salary: '10 - 15 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo29.png',
            title: 'Chuyên Viên SEO',
            company: 'Công ty TNHH SEO ABC',
            salary: '12 - 18 triệu',
            location: 'Hồ Chí Minh'
        },
        {
            logo: 'logo30.png',
            title: 'Nhân Viên IT Helpdesk',
            company: 'Công ty TNHH Dịch Vụ IT',
            salary: '10 - 15 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo31.png',
            title: 'Kỹ Sư Phần Mềm',
            company: 'Công ty Công Nghệ XYZ',
            salary: '20 - 30 triệu',
            location: 'Đà Nẵng'
        },
        {
            logo: 'logo32.png',
            title: 'Nhân Viên Quản Lý Chất Lượng',
            company: 'Công ty TNHH Quản Lý Chất Lượng',
            salary: '15 - 25 triệu',
            location: 'Hồ Chí Minh'
        },
        {
            logo: 'logo33.png',
            title: 'Chuyên Viên Nghiên Cứu Thị Trường',
            company: 'Công ty TNHH Nghiên Cứu Thị Trường',
            salary: '10 - 15 triệu',
            location: 'Hà Nội'
        },
        {
            logo: 'logo34.png',
            title: 'Nhân Viên Thiết Kế Web',
            company: 'Công ty Thiết Kế ABC',
            salary: '15 - 20 triệu',
            location: 'Đà Nẵng'
        },
        {
            logo: 'logo35.png',
            title: 'Quản Lý Nhân Sự',
            company: 'Công ty TNHH Quản Lý Nhân Sự',
            salary: '25 - 35 triệu',
            location: 'Hồ Chí Minh'
        }

    ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Địa điểm');
    const [currentPage, setCurrentPage] = useState(0);
    const dropdownRef = useRef(null);
    const jobsPerPage = 12;

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const selectFilter = (filter) => {
        setSelectedFilter(filter);
        setIsDropdownOpen(false);
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const filterJobs = (filter) => {
        switch (filter) {
            case 'Địa điểm':
                return jobData.filter((job) => job.location.includes('Hà Nội'));
            case 'Mức lương':
                return jobData.filter((job) => parseInt(job.salary.split(' ')[1]) > 15);
            default:
                return jobData;
        }
    };

    const currentJobs = filterJobs(selectedFilter).slice(currentPage * jobsPerPage, (currentPage + 1) * jobsPerPage);
    const totalPages = Math.ceil(jobData.length / jobsPerPage);

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

    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (jobTitle) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(jobTitle)) {
                return prevFavorites.filter((title) => title !== jobTitle);
            } else {
                return [...prevFavorites, jobTitle];
            }
        });
    };

    return (
        <div className="job-listing-container">
            <header className="job-list-header">
                <h1 className="header-title">Việc làm tốt nhất</h1>
            </header>

            <div className="job-filters">
                <div className="filters-left">
                    <div className="filter-dropdown" ref={dropdownRef}>
                        <button className="filter-dropdown-toggle" onClick={toggleDropdown}>
                            Lọc theo: <span className="selected-filter">{selectedFilter}</span>
                            <span className="dropdown-arrow-2">▼</span>
                        </button>
                        {isDropdownOpen && (
                            <div className="filter-dropdown-menu">
                                {['Địa điểm', 'Mức lương', 'Kinh nghiệm', 'Ngành nghề'].map((filter) => (
                                    <div
                                        key={filter}
                                        className={`filter-option ${selectedFilter === filter ? 'selected' : ''}`}
                                        onClick={() => selectFilter(filter)}
                                    >
                                        {filter}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="location-dropdown-2">
                        <span className="location-icon-2">📍</span>
                        <span className="location-text-2">Tất cả tỉnh/thành phố</span>
                    </div>
                </div>
                <div className="navigation-component">
                    <a href="#view-all" className="view-all">Xem tất cả</a>
                    <div className="nav-buttons">
                        <button className="nav-button" onClick={prevPage} disabled={currentPage === 0}>&#8249;</button>
                        <button className="nav-button" onClick={nextPage} disabled={currentPage === totalPages - 1}>&#8250;</button>
                    </div>
                </div>
            </div>

            <div className='job-list'>
                <div className="job-container">
                    {currentJobs.map((job, index) => (
                        <div key={index} className="job-item-card">
                            <div className="company-logo">
                                <img src={job.logo} alt="Company Logo" />
                            </div>
                            <div className="job-info-section">
                                <Link to={`/jobs/jobdetail/${job.id}`} className="position-title">
                                    <h2 className="position-title">{job.title}</h2>
                                </Link>
                                <p className="company-name">{job.company}</p>
                                <div className="job-info">
                                    <span className="salary-info">{job.salary}</span>
                                    <span className="location-info">{job.location}</span>
                                </div>
                            </div>
                            <div className="favorite-icon" onClick={() => toggleFavorite(job.title)}>
                                <span>{favorites.includes(job.title) ? '❤️' : '🤍'}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination-indicator">
                    <div className="nav-buttons">
                        <button className="nav-button" onClick={prevPage} disabled={currentPage === 0}>&#8249;</button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`pagination-dot ${index === currentPage ? 'active' : ''}`}
                                onClick={() => setCurrentPage(index)}
                            />
                        ))}
                        <button className="nav-button" onClick={nextPage} disabled={currentPage === totalPages - 1}>&#8250;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
