import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import SearchBar from '../../UI/SearchBar';
import ApplyJob from '../applicant/ApplyJob';
import '../../../styles/jobdetail.css'; // Create this CSS file to style the component
import axios from 'axios';


function JobDetail() {
    const { id } = useParams();  // Get the job ID from URL
    const [job, setJob] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        const fetchJobDetail = async () => {
            try {
                setLoading(true);  // Start loading before fetching data
                const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
                setJob(response.data);  // Set the fetched job data to state
                setLoading(false);  // Stop loading after fetching
            } catch (err) {
                setError('Không thể tải chi tiết công việc. Vui lòng thử lại.');
                setLoading(false);  // Stop loading even if there was an error
            }
        };

        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/jobs');
                setJobs(response.data);  // Set all jobs data to state
            } catch (err) {
                setError('Không thể tải công việc. Vui lòng thử lại.');
            }
        };
        
        const fetchData = async () => {
            setLoading(true);
            if (id) {
                await Promise.all([fetchJobDetail(), fetchJobs()]);
            }
            setLoading(false);
        };

        fetchData();  // Trigger both fetch calls
    }, [id]);

    const [currentPage, setCurrentPage] = useState(0);
    const jobsPerPage = 6;

    const currentJobs = jobs.slice(currentPage * jobsPerPage, (currentPage + 1) * jobsPerPage);
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

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
    const [jobList, setJobList] = useState(jobs); // Dữ liệu danh sách công việc
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

    const handleSave = async (jobId) => {
        try {
            // Lấy token từ localStorage
            const token = localStorage.getItem('token');

             if (token==null) {
                alert('Bạn chưa đăng nhập. Vui lòng đăng nhập lại.');
                return;
            }
            // Gửi yêu cầu POST để lưu công việc
            const response = await axios.post(
                'http://localhost:5000/api/savedjobs/save-job',
                { job_id: jobId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
           
            // Kiểm tra nếu lưu thành công
            if (response.status === 201) {
                alert('Lưu tin ứng tuyển thành công!');
                setTimeout(() => setSuccessMessage(null), 3000); // Ẩn thông báo thành công sau 3 giây

                // Cập nhật danh sách công việc đã lưu
                setSavedJobs((prevSavedJobs) => [...prevSavedJobs, response.data.savedJob]);
            }

        } catch (err) {
            if (err.response) {
                // Xử lý các mã trạng thái cụ thể
                if (err.response.status === 409) {
                    alert('Bạn đã lưu công việc này trước đó.');
                } else {
                    setError(err.response.data.message || 'Không thể lưu công việc. Vui lòng thử lại.');
                }
                if (err.response.status === 401) {
                    alert('Bạn cần đăng nhập để ứng tuyển');
                }
            } else {
                console.error('Error saving job:', err.message);
                setError('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        }
    };

    const handleApply = async (jobId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/applications',
                { job_id: jobId }, // Chỉ gửi job_id
                { headers: { Authorization: `Bearer ${token}` } } // Authorization header với token
            );

            if (response.status === 201) {
                alert('Đã nộp đơn ứng tuyển thành công!');
            }
            if (response.status === 401) {
                alert('Bạn cần đăng nhập để ứng tuyển');
            }
        } catch (err) {
            console.error('Error applying for job:', err); // Log error details
            
            // Nếu có lỗi từ phản hồi, lấy message từ response và hiển thị thông báo
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message); // Hiển thị thông báo lỗi từ response
            } else {
                alert('Đã có lỗi xảy ra, vui lòng thử lại.'); // Lỗi không xác định
            }
        }
    };

    return (
        <div className='job-detail-body'>
            <div className='job-detail-search-bar'>
                <SearchBar></SearchBar>
            </div>
            <div className='job-detail-board'>
                <div className='job-detail-list-left'>
                    <div className="job-detail">
                        {job && (
                            <div className="job-detail-header">
                                <h2 className="job-detail-title">{job.title}</h2>
                                <div className="job-detail-info">
                                    <div className="job-detail-info-item">
                                        <div className="job-detail-icon">&#x1F4B0;</div>
                                        <div>
                                            <span>Mức lương</span>
                                            <p>{job.salary} triệu</p>
                                        </div>
                                    </div>
                                    <div className="job-detail-info-item">
                                        <div className="job-detail-icon">&#x1F4CD;</div>
                                        <div>
                                            <span>Địa điểm</span>
                                            <p>{job.location}</p>
                                        </div>
                                    </div>
                                    <div className="job-detail-info-item">
                                        <div className="job-detail-icon">&#x23F3;</div>
                                        <div>
                                            <span>Yêu cầu</span>
                                            <p>{job.requirements}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="job-detail-info-item">
                                    <div className="job-detail-icon">&#x1F4C5;</div>
                                    <div className='job-detail-date-info'>
                                        <span>Hạn nộp hồ sơ</span>
                                        <p>{job.application_deadline}</p>
                                    </div>
                                </div>
                                <div className="job-detail-buttons">
                                    <button onClick={() => handleApply(job._id)} className="job-detail-apply-button" >Ứng tuyển ngay</button>
                                    <button onClick={() => handleSave(job._id)} className="job-detail-save-button">Lưu tin</button>
                                </div>
                            </div>)}

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
                                    {job && job.description ? (
                                        <li>{job.description}</li> // Hiển thị mô tả công việc từ job.description
                                    ) : (
                                        <p>Chưa có mô tả công việc.</p> // Nếu không có mô tả công việc
                                    )}
                                </ul>
                            </section>

                            <section className="job-detail-section">
                                <h3 className="job-detail-subheader">Yêu cầu ứng viên</h3>
                                <ul className="job-detail-list">

                                    {job && job.skills && job.skills.length > 0 ? (
                                        job.skills.map((skill, index) => (
                                            <li key={index}>{skill}</li> // Hiển thị từng yêu cầu trong mảng skills
                                        ))
                                    ) : (
                                        <p>Không có yêu cầu ứng viên.</p> // Nếu mảng skills rỗng hoặc không có dữ liệu
                                    )}
                                </ul>
                            </section>

                            <section className="job-detail-section">
                                <h3 className="job-detail-subheader">Quyền lợi</h3>
                                <ul className="job-detail-list">
                                    {job && job.benefits && Array.isArray(job.benefits) ? (
                                        job.benefits.map((benefit, index) => (
                                            <li key={index}>{benefit}</li>
                                        ))
                                    ) : (
                                        <li>Chưa có quyền lợi được cung cấp</li> // Hiển thị khi không có quyền lợi
                                    )}
                                </ul>
                            </section>

                            <section className="job-detail-section">
                                <h3 className="job-detail-subheader">Địa điểm làm việc</h3>
                                <p>{job ? job.location : 'Chưa có thông tin'}</p>
                            </section>

                            <section className="job-detail-section">
                                <h3 className="job-detail-subheader">Thời gian làm việc</h3>
                                <p>{job ? job.job_type : 'Chưa có thông tin'}</p>
                            </section>

                            <div className="job-detail-actions">
                                <button onClick={() => handleApply(job._id)} className="job-detail-button">Ứng tuyển ngay</button>
                                <button onClick={() => handleApply(job._id)} className="job-detail-button">Lưu tin</button>
                            </div>

                            <p className="job-detail-deadline">Hạn nộp hồ sơ: {job ? job.application_deadline:'Không có thời hạn'}</p>
                        </div>
                        <div className='related-job-board-list-left'>
                            <h2 className='related-job-board-list-left-header'>Việc làm liên quan</h2>
                            <div className='related-job-list'>
                                <div className='related-job-board-list-container'>
                                    {jobs.length > 0 ? (
                                        jobs.map((job, index) => (
                                            <div key={job._id} className='related-job-info-item-card'>
                                                <div className='related-job-board-company-logo'>
                                                    <img src={job.company_id ? job.company_id.logo : 'N/A'} alt='Company Logo' />
                                                </div>
                                                <div className='related-job-info-sections'>
                                                    <Link to={`/jobs/jobdetail/${job._id}`} className='related-job-info-position-title'>
                                                        <h2>{job.title}</h2>
                                                    </Link>
                                                    <p className='related-job-info-company-name'>{job.company_id.name}</p>
                                                    <span className='related-salary-job-info'>{job.salary}</span>
                                                    <div className='related-job-info-details'>
                                                        <span className='related-location-job-info'>📍 {job.location}</span>
                                                        <span className='related-remaining-days'>⏳ Còn {Math.floor((new Date(job.application_deadline) - new Date()) / (1000 * 3600 * 24))} ngày để ứng tuyển</span>
                                                    </div>
                                                    <p className='related-job-update'>Cập nhật {job.updated_at} trước</p>
                                                </div>
                                                <div className='related-job-salary-apply'>
                                                    <button className='related-apply-button' onClick={() => openApplyForm(job)}>Ứng tuyển</button>
                                                    <div className='related-job-info-favorite-icon' onClick={() => toggleFavorite(job.title)}>
                                                        <span>{favorites.includes(job.title) ? '❤️' : '🤍'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p></p>
                                    )}
                                </div>
                                <div className='related-pagination-indicator'>
                                    <div className='related-nav-buttons'>
                                        <button className='related-nav-button' onClick={prevPage} disabled={currentPage === 0}>&#8249;</button>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <button
                                                key={job._id}
                                                className={`related-pagination-dot ${index === currentPage ? 'active' : ''}`}
                                                onClick={() => setCurrentPage(job._id)}
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
                {job && (
                    <div className="job-detail-list-right">
                        <div className="job-detail-company-info">
                            <div className="job-detail-company-logo">
                                <img src={job.company_id.logo} alt="Mai Viet Land Logo" />
                                <h3>{job.company_id.name}</h3>
                            </div>
                            <div className="job-detail-company-details">
                                <div className='company-detail-info'>
                                    <p className='feature'>Quy mô: </p>
                                    <p className='detail-info'>{job.company_id.quymo} nhân viên</p>
                                </div>
                                <div className='company-detail-info'>
                                    <p className='feature'>Lĩnh vực: </p>
                                    <p className='detail-info'>{job.company_id.industry}</p>
                                </div>
                                <div className='company-detail-info'>
                                    <p className='feature'>Địa điểm: </p>
                                    <p className='detail-info'>{job.company_id.location}</p>
                                </div>
                            </div>
                            <a href={job.company_id.website} className="job-detail-company-link">Xem trang công ty</a>
                        </div>

                        <div className="job-detail-general-info">
                            <h4>Thông tin chung</h4>
                            <div className="job-detail-general-info-item">
                                <span>Cấp bậc</span>
                                <p>Nhân viên</p>
                            </div>
                            <div className="job-detail-general-info-item">
                                <span>Kinh nghiệm</span>
                                <p>{job.requirements}</p>
                            </div>
                            <div className="job-detail-general-info-item">
                                <span>Số lượng tuyển</span>
                                <p>{job.vacancy}</p>
                            </div>
                            <div className="job-detail-general-info-item">
                                <span>Hình thức làm việc</span>
                                <p>{job.job_type}</p>
                            </div>
                        </div>
                        <div className='company-job'>
                            <h3>Công việc cùng công ty</h3>
                            <div className='company-jobs-list'>
                                <div className='company-jobs-container'>
                                    {jobs.length > 0 ? (
                                        jobs.map((job, index) => (
                                            <div key={job._id} className='company-jobs-item-card'>
                                                <div className='company-jobs-logo'>
                                                    <img src={job.company_id.logo} alt='Company Logo' />
                                                </div>
                                                <div className='company-jobs-info-section'>
                                                    <h2 className='company-jobs-position-title'>{job.title}</h2>
                                                    <p className='company-jobs-company-name'>{job.company_id.name}</p>
                                                    <div className='company-jobs-info'>
                                                        <span className='company-jobs-salary-info'>{job.salary}</span>
                                                        <span className='company-jobs-location-info'>{job.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p></p>
                                    )}
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
                )}
            </div>
        </div>
    );
};

export default JobDetail;
