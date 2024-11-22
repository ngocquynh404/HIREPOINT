import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../../../styles/searchjob.css'
import SearchJobBar from '../../UI/SearchJobBar';
import ApplyJob from '../applicant/ApplyJob';
import axios from 'axios';

export default function Jobs() {
    const jobData = [
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
    ];
    const [currentPage, setCurrentPage] = useState(0);
    const jobsPerPage = 15;

    const currentJobs = jobData.slice(currentPage * jobsPerPage, (currentPage + 1) * jobsPerPage);
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

    /////apply job
    const [jobList, setJobList] = useState(jobData); // Dữ liệu danh sách công việc
    const [favoriteJobs, setFavoriteJobs] = useState([]); // Danh sách công việc yêu thích
    const [jobToApply, setJobToApply] = useState(null); // Công việc được chọn để ứng tuyển
    const [searchQuery, setSearchQuery] = useState('');
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
    const [filteredJobs, setFilteredJobs] = useState([]);
    const closeApplyForm = () => {
        setJobToApply(null); // Đóng form ứng tuyển
    };
    useEffect(() => {
        if (searchQuery) {
            const filtered = jobData.filter(job =>
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                job.company.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredJobs(filtered);
        } else {
            setFilteredJobs(jobData); // Reset to all jobs if searchQuery is empty
        }
    }, [searchQuery]);
    
    return (
        <div className='search-job-board'>
            <div className='search-job-header'>
                <SearchJobBar />
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
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <div key={job._id} job={job} className="search-job-info-item-card">
                                        <div className="search-job-board-company-logo">
                                            <img src={'defaultLogo.png'} alt="Company Logo" />
                                        </div>
                                        <div className="search-job-info-sections">
                                            <Link to={`/jobs/jobdetail/${job._id}`} className="search-job-info-position-title">
                                                <h2>{job.title}</h2>
                                            </Link>
                                            <p className="search-job-info-company-name">{'comayname'}</p>
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
                                                    ? 0 // Nếu NaN, hiển thị 0
                                                    : Math.max(
                                                        Math.ceil(
                                                            (new Date(job.application_deadline) - new Date()) /
                                                            (1000 * 60 * 60 * 24)
                                                        ),
                                                        0
                                                    )}{' '}
                                                ngày để ứng tuyển</span>
                                            </div>
                                            <p className="search-job-update">Cập nhật {job.updateTime} trước</p>
                                        </div>
                                        <div className="search-job-salary-apply">
                                            <button className="search-job-apply-button" onClick={() => openApplyForm(job)}>Ứng tuyển</button>
                                            <div className="search-job-info-favorite-icon" onClick={() => toggleFavorite(job.title)}>
                                                <span>{favorites.includes(job.title) ? '❤️' : '🤍'}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No jobs found</p>
                            )}
                        </div>
                        <div className="search-job-pagination-indicator">
                            <div className="search-job-nav-buttons">
                                <button className="search-job-nav-button" onClick={prevPage} disabled={currentPage === 0}>&#8249;</button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        className={`search-job-pagination-dot ${index === currentPage ? 'active' : ''}`}
                                        onClick={() => setCurrentPage(index)}
                                    />
                                ))}
                                <button className="search-job-nav-button" onClick={nextPage} disabled={currentPage === totalPages - 1}>&#8250;</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="search-job-ads">
                    <div className="search-job-ads-banner">
                        <div className="search-job-ads-banner-content">
                            <h1 className="search-job-ads-banner-heading">Special Offer on Renovation Services</h1>
                            <p className="search-job-ads-banner-description">Get the best quality renovation services at an affordable price. Limited time offer!</p>
                            <button className="search-job-ads-banner-button">Learn More</button>
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