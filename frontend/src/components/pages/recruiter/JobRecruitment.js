import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FaBuilding, FaEye, FaUsers, FaTimes } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import '../../../styles/companyprofile.css'
import { getId } from '../../../libs/isAuth';
import axios from 'axios';



const JobRecruitment = () => {
    const idnd = getId();
    const [companyId, setCompanyId] = useState(null); // Lưu companyId trong state
    const [companyName, setCompanyName] = useState(null); // Lưu companyId trong state
    const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading
    const [error, setError] = useState(null); // State để lưu lỗi (nếu có)  

    const [allJobData, setAllJobData] = useState([]); // Lưu danh sách công việc
    const [loadingJobs, setLoadingJobs] = useState(true); // Trạng thái loading
    const [errorJobs, setErrorJobs] = useState(null); // Lưu lỗi nếu có
    const [isEditMode, setIsEditMode] = useState(false); // false = create, true = update
    const [jobIdEdit, setJobIdEdit] = useState(null); // false = create, true = update

    //phân trang 
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const jobsPerPage = 3; // Số lượng job mỗi trang

    // Tính toán các job hiển thị
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = allJobData.slice(indexOfFirstJob, indexOfLastJob); // Các job hiện tại
    const totalPages = Math.ceil(allJobData.length / jobsPerPage); // Tổng số trang

    // Điều hướng tới trang trước
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Điều hướng tới trang tiếp theo
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const [jobData, setJobData] = useState({
        employer_id: '',
        company_id: '',
        title: '',
        description: '',
        requirements: '',
        skills: [],
        qualifications: [],
        salary: '',
        job_type: 'full_time', // Giá trị mặc định
        vacancy: '',
        location: '',
        interview_location: '',
        note: '',
        application_deadline: '',
        benefits: []
    });

    useEffect(() => {
        const fetchCompanyId = async () => {
            try {
                console.log('Fetching data for user_id:', idnd);  // Kiểm tra giá trị của idnd
                const responseCompany = await axios.get(`http://localhost:5000/api/companies/${idnd}`);
                setCompanyId(responseCompany.data._id);
                setCompanyName(responseCompany.data.company_name);
            } catch (error) {
                setError('Failed to load profile data.');
            } finally {
                setLoading(false);
            }
        };

        if (idnd) {
            fetchCompanyId();
        } else {
            console.log('idnd is not valid:', idnd); // Khi idnd không hợp lệ
        }
    }, [idnd]);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                setLoadingJobs(true);
                console.log("company id: ", companyId);
                const responseAllJob = await axios.get(`http://localhost:5000/api/jobs/jobs-by-company/${companyId}`);
                setAllJobData(responseAllJob.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setErrorJobs('Lỗi khi tải danh sách công việc.');
            } finally {
                setLoadingJobs(false); // Dừng trạng thái loading
            }
        };

        if (companyId) {
            fetchAllJobs();
        } else {
            console.log('idnd is not valid:', companyId); // Khi idnd không hợp lệ
        }
    }, [companyId]);

    // Chuyển đổi tab
    const [activeTab, setActiveTab] = useState('profileView');
    const handleTabClick = (tab) => setActiveTab(tab);

    // Hàm xử lý thay đổi input chung cho tất cả các trường
    const handleInputJobChange = (e) => {
        const { name, value } = e.target;
        setJobData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Hàm xử lý thay đổi cho kỹ năng (skills)
    const handleSkillsChange = (e) => {
        const { value } = e.target;
        const skillsArray = value.split(',').map((skill) => skill.trim()); // Chuyển chuỗi thành mảng
        setJobData((prevData) => ({
            ...prevData,
            skills: skillsArray
        }));
    };

    // Hàm xử lý thay đổi cho bằng cấp (qualifications)
    const handleQualificationsChange = (e) => {
        const { value } = e.target;
        const qualificationsArray = value.split(',').map((qualification) => qualification.trim());
        setJobData((prevData) => ({
            ...prevData,
            qualifications: qualificationsArray
        }));
    };

    // Hàm xử lý thay đổi cho quyền lợi (benefits)
    const handleBenefitsChange = (e) => {
        const { value } = e.target;
        const benefitsArray = value.split(',').map((benefit) => benefit.trim());
        setJobData((prevData) => ({
            ...prevData,
            benefits: benefitsArray
        }));
    };

    const calculateRemainingDays = (deadline) => {
        if (!deadline) return 'không xác định';
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 'đã hết hạn';
    };

    const formatUpdateTime = (updateTime) => {
        if (!updateTime) return 'không rõ';
        const now = new Date();
        const updatedDate = new Date(updateTime);
        const diffTime = now - updatedDate;
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);
        return diffDays > 0
            ? `${diffDays} ngày`
            : diffHours > 0
                ? `${diffHours} giờ`
                : '0 giây';
    };

    /// menu xóa của dấu ba chấm
    const [menuIndex, setMenuIndex] = useState(null); // Track which menu is open

    const toggleMenu = (index) => {
        if (menuIndex === index) {
            setMenuIndex(null); // Close menu if already open
        } else {
            setMenuIndex(index); // Open menu for the clicked card
        }
    };

    const handleDeleteJob = async (jobId) => {
        try {
            // Xác nhận trước khi xóa
            if (window.confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
                // Gửi yêu cầu DELETE tới API
                await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);

                // Cập nhật lại danh sách công việc sau khi xóa
                setAllJobData(allJobData.filter(job => job._id !== jobId));
                alert('Công việc đã được xóa!');
            }
        } catch (error) {
            console.error('Error deleting job:', error);
            alert('Có lỗi xảy ra khi xóa công việc!');
        }
    };

    const handleUpdateJob = async (jobId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
            const date = new Date(response.data.application_deadline); // Chuyển đổi chuỗi thành đối tượng Date
            const formattedDate = date.toISOString().split('T')[0]; // Lấy phần ngày (yyyy-mm-dd)
            setJobData(response.data);
            setJobData((prevData) => ({
                ...prevData,
                application_deadline: formattedDate
            }));
            setIsEditMode(true);
            setJobIdEdit(jobId);
            handleTabClick('followCompany');
        } catch (error) {
            console.error('Error loading job:', error);
            alert('Có lỗi xảy ra khi cập nhật công việc!');
        }
    };

    // Hàm xử lý khi nhấn nút "Lưu"
    const handleSubmitJob = (e) => {
        if (isEditMode) {
            updateJob(e);
        } else {
            createJob(e);
        }
    };

    // Hàm cập nhật công việc
    const updateJob = async (e) => {
        e.preventDefault(); // Ngừng sự kiện mặc định của form

        if (loading) {
            console.log('Data is still loading...');
            return; // Ngừng gửi yêu cầu nếu dữ liệu vẫn đang được tải
        }

        if (!companyId) {
            console.log('Company ID is not available');
            alert('Chưa có thông tin công ty. Vui lòng thử lại sau.');
            return; // Kiểm tra nếu companyId chưa có
        }

        // Thực hiện kiểm tra hợp lệ nếu cần, ví dụ: kiểm tra trường yêu cầu đã điền đầy đủ hay chưa
        if (!jobData.title || !jobData.skills.length || !jobData.qualifications.length || !jobData.benefits.length) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        try {
            // Gửi yêu cầu POST đến server để tạo công việc mới
            const response = await axios.put(`http://localhost:5000/api/jobs/${jobIdEdit}`, jobData);

            // Xử lý phản hồi từ server (thành công)
            console.log('Công việc đã được cập nhật thành công:', response.data);
            alert('Công việc đã được cập nhật thành công!');
            // Có thể reset form hoặc điều hướng người dùng về một trang khác

            setJobData({
                employer_id: '',
                company_id: '',
                title: '',
                description: '',
                requirements: '',
                skills: [],
                qualifications: [],
                salary: '',
                job_type: 'full_time',
                vacancy: '',
                location: '',
                interview_location: '',
                note: '',
                application_deadline: '',
                benefits: []
            });

        } catch (error) {
            console.error('Lỗi khi cập nhật công việc:', error);
            alert('Có lỗi xảy ra khi cập nhật công việc. Vui lòng thử lại!');
        }
    };

    const createJob = async (e) => {
        e.preventDefault(); // Ngừng sự kiện mặc định của form

        if (loading) {
            console.log('Data is still loading...');
            return; // Ngừng gửi yêu cầu nếu dữ liệu vẫn đang được tải
        }

        if (!companyId) {
            console.log('Company ID is not available');
            alert('Chưa có thông tin công ty. Vui lòng thử lại sau.');
            return; // Kiểm tra nếu companyId chưa có
        }

        // Thực hiện kiểm tra hợp lệ nếu cần, ví dụ: kiểm tra trường yêu cầu đã điền đầy đủ hay chưa
        if (!jobData.title || !jobData.skills.length || !jobData.qualifications.length || !jobData.benefits.length) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        try {
            // Gán companyId vào jobData
            const jobDataToSend = {
                ...jobData,
                company_id: companyId,  // Gán companyId đã có vào jobData
                employer_id: idnd,
            };

            // Gửi yêu cầu POST đến server để tạo công việc mới
            const response = await axios.post('http://localhost:5000/api/jobs', jobDataToSend);

            // Xử lý phản hồi từ server (thành công)
            console.log('Công việc đã được tạo thành công:', response.data);
            alert('Công việc đã được đăng tuyển thành công!');
            // Có thể reset form hoặc điều hướng người dùng về một trang khác

            setJobData({
                employer_id: '',
                company_id: '',
                title: '',
                description: '',
                requirements: '',
                skills: [],
                qualifications: [],
                salary: '',
                job_type: 'full_time',
                vacancy: '',
                location: '',
                interview_location: '',
                note: '',
                application_deadline: '',
                benefits: []
            });

        } catch (error) {
            console.error('Lỗi khi tạo công việc:', error);
            alert('Có lỗi xảy ra khi đăng công việc. Vui lòng thử lại!');
        }
    };

    return (
        <div className='company-profile'>
            {/* Phần tiêu đề "Công ty của tôi" */}
            <div className="company-profile-header">
                <h2>Công việc đang tuyển dụng</h2>
            </div>
            <div className="company-profile-container">
                {/* Thanh điều hướng tab */}
                <div className="company-profile-tabs">
                    <button
                        className={`company-profile-tab ${activeTab === 'profileView' ? 'active' : ''}`}
                        onClick={() => handleTabClick('profileView')}
                    >
                        <FaEye /> Danh sách công việc
                    </button>
                    <button
                        className={`company-profile-tab ${activeTab === 'followCompany' ? 'active' : ''}`}
                        onClick={() => handleTabClick('followCompany')}
                    >
                        <FaUsers /> Đăng tuyển việc làm mới
                    </button>
                </div>

                {/* Nội dung tab "Nhà tuyển dụng xem hồ sơ" */}
                {activeTab === 'profileView' && (
                    <div className="company-profile-content followed-companies">
                        {loadingJobs ? (
                            <p>Đang tải danh sách công việc...</p>
                        ) : errorJobs ? (
                            <p>{errorJobs}</p>
                        ) : (
                            <div className="my-job-list">
                                {currentJobs.map((job, index) => (
                                    <div key={index} className="company-detail-info-item">
                                        <div className="company-detail-info-company-logo">
                                            {/* Hiển thị logo công ty nếu có */}
                                            <img
                                                src={job.company_id?.logo || '/default-logo.png'}
                                                alt="Company Logo"
                                            />
                                        </div>
                                        <div className="company-detail-info-sections">
                                            {/* Tên công việc */}
                                            <Link to={`/jobs/jobdetail/${job._id}`} className="company-detail-info-position-title">
                                                <h2>{job.title}</h2>
                                            </Link>
                                            {/* Tên công ty */}
                                            <p className="company-detail-info-company-name">{companyName || 'Không rõ'}</p>
                                            {/* Mức lương */}
                                            <span className="company-detail-info-salary">
                                                {job.salary || 'Thỏa thuận'}
                                            </span>
                                            <div className="company-detail-info-details">
                                                {/* Địa điểm */}
                                                <span className="company-detail-info-location">📍 {job.location || 'Không rõ'}</span>
                                                {/* Ngày còn lại */}
                                                <span className="company-detail-info-remaining-days">
                                                    ⏳ Còn {calculateRemainingDays(job.application_deadline)} ngày để ứng tuyển
                                                </span>
                                            </div>
                                            <p className="company-detail-info-update">
                                                Cập nhật {formatUpdateTime(job.updated_at)} trước
                                            </p>
                                        </div>
                                        <div className="company-detail-info-apply-section">
                                            <div className="my-job-info-menu">
                                                <FontAwesomeIcon
                                                    icon={faEllipsisV}
                                                    className="my-ellipsis-icon"
                                                    onClick={() => toggleMenu(index)}
                                                />
                                                {menuIndex === index && (
                                                    <div className="my-menu-dropdown">
                                                        <button onClick={() => handleDeleteJob(job._id)}>Xóa</button>
                                                        <button onClick={() => handleUpdateJob(job._id)}>Cập nhật</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* Pagination */}
                                <div className="custom-pagination">
                                    <button
                                        className="pagination-button"
                                        onClick={goToPreviousPage}
                                        disabled={currentPage === 1}
                                    >
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                    </button>
                                    <span className="pagination-info">
                                        {currentPage}/{totalPages}
                                    </span>
                                    <button
                                        className="pagination-button"
                                        onClick={goToNextPage}
                                        disabled={currentPage === totalPages}
                                    >
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Nội dung tab "Theo dõi công ty" */}
                {activeTab === 'followCompany' && (
                    <div className="company-profile-content profile-view">
                        <div className="company-profile-empty-state">
                            <div className="company-profile-edit-basic-info">
                                <div className="company-profile-edit-row">
                                    <label htmlFor="title" className="company-profile-edit-label">
                                        Tiêu đề công việc <span className="company-profile-edit-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={jobData?.title}
                                        onChange={handleInputJobChange}
                                        className="company-profile-edit-input"
                                        placeholder="Nhập tiêu đề công việc"
                                    />
                                </div>
                                <div className="company-profile-edit-row">
                                    <label htmlFor="description" className="company-profile-edit-label">
                                        Mô tả công việc
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        value={jobData?.description}
                                        onChange={handleInputJobChange}
                                        className="company-profile-des-textarea"
                                        placeholder="Nhập mô tả công việc"
                                    ></textarea>
                                </div>


                                <div className="company-profile-edit-row">
                                    <label htmlFor="requirements" className="company-profile-edit-label">
                                        Yêu cầu công việc
                                    </label>
                                    <textarea
                                        name="requirements"
                                        id="requirements"
                                        value={jobData?.requirements}
                                        onChange={handleInputJobChange}
                                        className="company-profile-des-textarea"
                                        placeholder="Nhập yêu cầu công việc"
                                    ></textarea>
                                </div>

                                <div className="company-profile-edit-row">
                                    <label htmlFor="skills" className="company-profile-edit-label">
                                        Kỹ năng cần thiết <span className="company-profile-edit-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="skills"
                                        name="skills"
                                        value={jobData?.skills.join(', ')} // Hiển thị danh sách kỹ năng dưới dạng chuỗi
                                        onChange={(e) => handleSkillsChange(e)}
                                        className="company-profile-edit-input"
                                        placeholder="Nhập các kỹ năng cần thiết, cách nhau bằng dấu phẩy"
                                    />
                                </div>

                                <div className="company-profile-edit-row">
                                    <label htmlFor="qualifications" className="company-profile-edit-label">
                                        Bằng cấp yêu cầu <span className="company-profile-edit-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="qualifications"
                                        name="qualifications"
                                        value={jobData?.qualifications.join(', ')} // Hiển thị danh sách bằng cấp dưới dạng chuỗi
                                        onChange={(e) => handleQualificationsChange(e)}
                                        className="company-profile-edit-input"
                                        placeholder="Nhập các bằng cấp yêu cầu, cách nhau bằng dấu phẩy"
                                    />
                                </div>
                                <div className="company-profile-edit-col">
                                    <div className="company-profile-edit-row">
                                        <label htmlFor="salary" className="company-profile-edit-label">
                                            Mức lương
                                        </label>
                                        <input
                                            type="text"
                                            id="salary"
                                            name="salary"
                                            value={jobData?.salary}
                                            onChange={handleInputJobChange}
                                            className="company-profile-edit-input"
                                            placeholder="Nhập mức lương"
                                        />
                                    </div>
                                    <div className="company-profile-edit-row">
                                        <label htmlFor="job_type" className="company-profile-edit-label">
                                            Loại công việc <span className="company-profile-edit-required">*</span>
                                        </label>
                                        <select
                                            id="job_type"
                                            name="job_type"
                                            value={jobData?.job_type}
                                            onChange={handleInputJobChange}
                                            className="company-profile-select"
                                        >
                                            <option value="full_time">Toàn thời gian</option>
                                            <option value="part_time">Bán thời gian</option>
                                            <option value="internship">Thực tập</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="company-profile-edit-col">
                                    <div className="company-profile-edit-row">
                                        <label htmlFor="interview_location" className="company-profile-edit-label">
                                            Vị trí phỏng vấn
                                        </label>
                                        <input
                                            type="text"
                                            id="interview_location"
                                            name="interview_location"
                                            value={jobData?.interview_location}
                                            onChange={handleInputJobChange}
                                            className="company-profile-edit-input"
                                            placeholder="Nhập vị trí phỏng vấn"
                                        />
                                    </div>
                                    <div className="company-profile-edit-row">
                                        <label htmlFor="vacancy" className="company-profile-edit-label">
                                            Số lượng tuyển dụng
                                        </label>
                                        <input
                                            type="number"
                                            id="vacancy"
                                            name="vacancy"
                                            value={jobData?.vacancy}
                                            onChange={handleInputJobChange}
                                            className="company-profile-edit-input"
                                            placeholder="Nhập số lượng tuyển dụng"
                                        />
                                    </div>
                                </div>
                                <div className="company-profile-edit-row">
                                    <label htmlFor="location" className="company-profile-edit-label">
                                        Địa điểm công việc <span className="company-profile-edit-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={jobData?.location}
                                        onChange={handleInputJobChange}
                                        className="company-profile-edit-input"
                                        placeholder="Nhập địa điểm công việc"
                                    />
                                </div>
                                <div className="company-profile-edit-row">
                                    <label htmlFor="note" className="company-profile-edit-label">
                                        Ghi chú thêm
                                    </label>
                                    <textarea
                                        name="note"
                                        id="note"
                                        value={jobData?.note}
                                        onChange={handleInputJobChange}
                                        className="company-profile-des-textarea"
                                        placeholder="Nhập ghi chú thêm"
                                    ></textarea>
                                </div>
                                <div className="company-profile-edit-row">
                                    <label htmlFor="application_deadline" className="company-profile-edit-label">
                                        Hạn nộp đơn
                                    </label>
                                    <input
                                        type="date"
                                        id="application_deadline"
                                        name="application_deadline"
                                        value={jobData?.application_deadline}
                                        onChange={handleInputJobChange}
                                        className="company-profile-edit-input"
                                    />
                                </div>
                                <div className="company-profile-edit-row">
                                    <label htmlFor="benefits" className="company-profile-edit-label">
                                        Các quyền lợi công việc <span className="company-profile-edit-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="benefits"
                                        name="benefits"
                                        value={jobData?.benefits.join(', ')}
                                        onChange={(e) => handleBenefitsChange(e)}
                                        className="company-profile-edit-input"
                                        placeholder="Nhập các quyền lợi công việc, cách nhau bằng dấu phẩy"
                                    />
                                </div>
                                <div className="company-profile-edit-row">
                                    <label htmlFor="status" className="company-profile-edit-label">
                                        Trạng thái công việc
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={jobData?.status}
                                        onChange={handleInputJobChange}
                                        className="company-profile-select"
                                    >
                                        <option value="open">Mở</option>
                                        <option value="closed">Đóng</option>
                                        <option value="pending">Chờ xử lý</option>
                                    </select>
                                </div>


                            </div>
                            <button className="user-info-edit-save-btn" type="submit" onClick={(e) => handleSubmitJob(e)}>
                                Lưu
                            </button>

                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default JobRecruitment;