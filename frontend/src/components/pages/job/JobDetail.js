import React, { useState } from 'react';
import { Link } from "react-router-dom";
import SearchBar from '../../UI/SearchBar';
import ApplyJob from '../applicant/ApplyJob';
import '../../../styles/jobdetail.css'; // Create this CSS file to style the component


function JobDetail() {

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
    const jobsPerPage = 6;

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


    const companyJobData = [
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
        }
    ]

    /////apply job
    const [jobList, setJobList] = useState(jobData); // Dữ liệu danh sách công việc
    const [favoriteJobs, setFavoriteJobs] = useState([]); // Danh sách công việc yêu thích
    const [jobToApply, setJobToApply] = useState(null); // Công việc được chọn để ứng tuyển

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

    return (
        <div className='job-detail-body'>
            <div className='job-detail-search-bar'>
                <SearchBar></SearchBar>
            </div>
            <div className='job-detail-board'>
                <div className='job-detail-list-left'>
                    <div className="job-detail">
                        <div className="job-detail-header">
                            <h2 className="job-detail-title">Chuyên Viên Thiết Kế / Graphic Design</h2>
                            <div className="job-detail-info">
                                <div className="job-detail-info-item">
                                    <div className="job-detail-icon">&#x1F4B0;</div>
                                    <div>
                                        <span>Mức lương</span>
                                        <p>13 - 18 triệu</p>
                                    </div>
                                </div>
                                <div className="job-detail-info-item">
                                    <div className="job-detail-icon">&#x1F4CD;</div>
                                    <div>
                                        <span>Địa điểm</span>
                                        <p>Hà Nội</p>
                                    </div>
                                </div>
                                <div className="job-detail-info-item">
                                    <div className="job-detail-icon">&#x23F3;</div>
                                    <div>
                                        <span>Kinh nghiệm</span>
                                        <p>2 năm</p>
                                    </div>
                                </div>

                            </div>
                            <div className="job-detail-info-item">
                                <div className="job-detail-icon">&#x1F4C5;</div>
                                <div className='job-detail-date-info'>
                                    <span>Hạn nộp hồ sơ</span>
                                    <p>04/12/2024</p>
                                </div>
                            </div>
                            <div className="job-detail-buttons">
                                <button className="job-detail-apply-button" >Ứng tuyển ngay</button>
                                <button className="job-detail-save-button">Lưu tin</button>
                            </div>
                        </div>

                        <div className="job-detail-container">
                            <h2 className="job-detail-container-header">Chi tiết tin tuyển dụng</h2>

                            <div className="job-detail-categories">
                                <span className="job-detail-tag">Kinh doanh kênh MT</span>
                                <span className="job-detail-tag">Direct Sales</span>
                                <span className="job-detail-tag">Bán lẻ - Hàng tiêu dùng - FMCG</span>
                                <span className="job-detail-tag">Thực phẩm / Đồ uống</span>
                            </div>

                            <section className="job-detail-section">
                                <h3 className="job-detail-subheader">Mô tả công việc</h3>
                                <ul className="job-detail-list">
                                    <li>Khu vực phụ trách: Đà Nẵng, Quảng Ngãi, Quy Nhơn.</li>
                                    <li>
                                        Cửa hàng phụ trách: Hệ thống siêu thị (Go!, Coopmart, Vinmart, MegaMarket, Lotte) và các store Minimart/ CVS/ Premium chain.
                                    </li>
                                    <li>Chịu trách nhiệm về doanh số bán hàng hàng tháng/năm.</li>
                                    <li>Nắm rõ kiến thức sản phẩm. Triển khai các hoạt động và chương trình khuyến mãi.</li>
                                    <li>Hướng dẫn và hỗ trợ các cửa hàng trưng bày hàng hoá. Theo dõi tồn kho đảm bảo sản phẩm.</li>
                                    <li>Cập nhật tình hình thị trường và đề xuất các hoạt động hỗ trợ tại khu vực phụ trách.</li>
                                </ul>
                            </section>

                            <section className="job-detail-section">
                                <h3 className="job-detail-subheader">Yêu cầu ứng viên</h3>
                                <ul className="job-detail-list">
                                    <li>Có kinh nghiệm từ 2 năm trở lên ở vị trí Sales, ưu tiên đã có kinh nghiệm làm sales kênh MT.</li>
                                    <li>Có mối quan hệ tốt với các siêu thị trưng bày.</li>
                                    <li>Siêng năng, chịu khó, có tinh thần nhiệt huyết.</li>
                                </ul>
                            </section>

                            <section className="job-detail-section">
                                <h3 className="job-detail-subheader">Quyền lợi</h3>
                                <ul className="job-detail-list">
                                    <li>Lương cứng hấp dẫn + phụ cấp ăn 40.000/ngày + phụ cấp xăng xe 800.000/tháng + phụ cấp điện thoại 300.000/tháng + Incentives (hoa hồng).</li>
                                    <li>Thử việc 100% lương, tham gia BH full lương, gói BH Sức khỏe Bảo Việt, phép năm 14 - 17 ngày, thưởng tháng 13 - thưởng Tết - bonus năm.</li>
                                    <li>Thời gian làm việc: 8h - 17h (Thứ 2 - Thứ 6), Thứ 7 buổi sáng.</li>
                                </ul>
                            </section>

                            <section className="job-detail-section">
                                <h3 className="job-detail-subheader">Địa điểm làm việc</h3>
                                <p>
                                    Tòa nhà Đại Tân Việt, ngay tại vòng xoay Ngô Đức Thọ – Lê Thị Hiệu, Nại Hiên Đông, Sơn Trà, Đà Nẵng.
                                </p>
                            </section>

                            <section className="job-detail-section">
                                <h3 className="job-detail-subheader">Thời gian làm việc</h3>
                                <p>Thứ 2 - Thứ 6 (08:00 đến 17:00)</p>
                            </section>

                            <div className="job-detail-actions">
                                <button className="job-detail-button">Ứng tuyển ngay</button>
                                <button className="job-detail-button">Lưu tin</button>
                            </div>

                            <p className="job-detail-deadline">Hạn nộp hồ sơ: 11/12/2024</p>
                        </div>
                        <div className='related-job-board-list-left'>
                            <h2 className='related-job-board-list-left-header'>Việc làm liên quan</h2>
                            <div className='related-job-list'>
                                <div className='related-job-board-list-container'>
                                    {currentJobs.map((job, index) => (
                                        <div key={index} className='related-job-info-item-card'>
                                            <div className='related-job-board-company-logo'>
                                                <img src={job.logo} alt='Company Logo' />
                                            </div>
                                            <div className='related-job-info-sections'>
                                                <Link to={`/jobs/jobdetail/${job.id}`} className='related-job-info-position-title'>
                                                    <h2>{job.title}</h2>
                                                </Link>
                                                <p className='related-job-info-company-name'>{job.company}</p>
                                                <span className='related-salary-job-info'>{job.salary}</span>
                                                <div className='related-job-info-details'>
                                                    <span className='related-location-job-info'>📍 {job.location}</span>
                                                    <span className='related-remaining-days'>⏳ Còn {job.remainingDays} ngày để ứng tuyển</span>
                                                </div>
                                                <p className='related-job-update'>Cập nhật {job.updateTime} trước</p>
                                            </div>
                                            <div className='related-job-salary-apply'>
                                                <button className='related-apply-button' onClick={() => openApplyForm(job)}>Ứng tuyển</button>
                                                <div className='related-job-info-favorite-icon' onClick={() => toggleFavorite(job.title)}>
                                                    <span>{favorites.includes(job.title) ? '❤️' : '🤍'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='related-pagination-indicator'>
                                    <div className='related-nav-buttons'>
                                        <button className='related-nav-button' onClick={prevPage} disabled={currentPage === 0}>&#8249;</button>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <button
                                                key={index}
                                                className={`related-pagination-dot ${index === currentPage ? 'active' : ''}`}
                                                onClick={() => setCurrentPage(index)}
                                            />
                                        ))}
                                        <button className='related-nav-button' onClick={nextPage} disabled={currentPage === totalPages - 1}>&#8250;</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {jobToApply && (
                    <ApplyJob job={jobToApply} onClose={closeApplyForm} />

                )}

                <div className="job-detail-list-right">
                    <div className="job-detail-company-info">
                        <div className="job-detail-company-logo">
                            <img src="company-logo-url.jpg" alt="Mai Viet Land Logo" />
                            <h3>Công ty cổ phần địa ốc Mai Việt</h3>
                        </div>
                        <div className="job-detail-company-details">
                            <div className='company-detail-info'>
                                <p className='feature'>Quy mô: </p>
                                <p className='detail-info'>500-1000 nhân viên</p>
                            </div>
                            <div className='company-detail-info'>
                                <p className='feature'>Lĩnh vực: </p>
                                <p className='detail-info'>Bất động sản</p>
                            </div>
                            <div className='company-detail-info'>
                                <p className='feature'>Địa điểm: </p>
                                <p className='detail-info'>Tầng 11, Tháp C, số 219 Trung Kính, P. Yên Hòa, Cầu Giấy, Hà Nội</p>
                            </div>
                        </div>
                        <a href="#company-link" className="job-detail-company-link">Xem trang công ty</a>
                    </div>
                    <div className="job-detail-general-info">
                        <h4>Thông tin chung</h4>
                        <div className="job-detail-general-info-item">
                            <span>Cấp bậc</span>
                            <p>Nhân viên</p>
                        </div>
                        <div className="job-detail-general-info-item">
                            <span>Kinh nghiệm</span>
                            <p>2 năm</p>
                        </div>
                        <div className="job-detail-general-info-item">
                            <span>Số lượng tuyển</span>
                            <p>1 người</p>
                        </div>
                        <div className="job-detail-general-info-item">
                            <span>Hình thức làm việc</span>
                            <p>Toàn thời gian</p>
                        </div>
                    </div>
                    <div className='company-job'>
                        <h3>Công việc cùng công ty</h3>
                        <div className='company-jobs-list'>
                            <div className='company-jobs-container'>
                                {companyJobData.map((job, index) => (
                                    <div key={index} className='company-jobs-item-card'>
                                        <div className='company-jobs-logo'>
                                            <img src={job.logo} alt='Company Logo' />
                                        </div>
                                        <div className='company-jobs-info-section'>
                                            <h2 className='company-jobs-position-title'>{job.title}</h2>
                                            <p className='company-jobs-company-name'>{job.company}</p>
                                            <div className='company-jobs-info'>
                                                <span className='company-jobs-salary-info'>{job.salary}</span>
                                                <span className='company-jobs-location-info'>{job.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="poster">
                        <div className="poster-banner">
                            <div className="poster-banner-content">
                                <h1 className="poster-banner-heading">Special Offer on Renovation Services</h1>
                                <p className="poster-banner-description">Get the best quality renovation services at an affordable price. Limited time offer!</p>
                                <button className="poster-banner-button">Learn More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
