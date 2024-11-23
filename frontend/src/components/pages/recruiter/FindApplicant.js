import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FaBuilding, FaEye, FaUsers, FaTimes, FaBriefcase, FaMoneyCheckAlt, FaPeriscope, FaBookmark, FaMapMarkerAlt, FaPaperPlane, FaUserTie } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import '../../../styles/companyprofile.css'
import { getId } from '../../../libs/isAuth';
import axios from 'axios';
import Dropdown from '../../UI/DropDown';

// Dữ liệu cho các dropdown
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
    { id: 1, name: 'Toàn thời gian' },
    { id: 2, name: 'Bán thời gian' },
    { id: 3, name: 'Thực tập' },
];


const FindApplicant = () => {
    const [allProfiles, setAllProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [specificAddress, setSpecificAddress] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobLevel, setJobLevel] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [skills, setSkills] = useState([]);

    const [filteredProfiles, setFilteredProfiles] = useState([]);

    useEffect(() => {
        const fetchAllProfiles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profiles/profile-user/alls');
                setAllProfiles(response.data.profiles);
                setLoading(false);
            } catch (error) {
                setError('Failed to load profile data.');
            } finally {
                setLoading(false);
            }
        };
        fetchAllProfiles();
    });

    //dropdown tìm kiếm
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [keyword, setKeyword] = useState('');

    const toggleAdvancedFilters = () => {
        setShowAdvancedFilters(!showAdvancedFilters);
    };

    const handleSearch = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/profiles/filter', {
            params: {
              specific_address: specificAddress || '',
              job_title: jobTitle || '',
              job_level: jobLevel || '',
              years_of_experience: yearsOfExperience || '',
              skills: skills.length > 0 ? skills.join(',') : '',
            },
          });
      
          console.log('Filtered profiles:', response.data);
          setFilteredProfiles(response.data);
        } catch (error) {
          console.error('Error fetching profiles:', error);
        }
      };
         

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // Ngừng hành động mặc định của phím Enter
            handleSearch();  // Gọi hàm search khi nhấn Enter
        }
    };
    const handleSpecificAddressChange = (value) => {
        setSpecificAddress(value); // Cập nhật giá trị specific_address
        console.log('Specific Address:', value); // In giá trị khi thay đổi
    };

    const handleJobTitleChange = (value) => {
        setJobTitle(value); // Cập nhật giá trị job_title
        console.log('Job Title:', value); // In giá trị khi thay đổi
    };

    const handleJobLevelChange = (value) => {
        setJobLevel(value); // Cập nhật giá trị job_level
        console.log('Job Level:', value); // In giá trị khi thay đổi
    };

    const handleYearsOfExperienceChange = (value) => {
        const numericValue = parseInt(value, 10);  // Chuyển giá trị thành số
        if (!isNaN(numericValue)) {
            setYearsOfExperience(numericValue);  // Cập nhật giá trị years_of_experience nếu là số hợp lệ
            console.log('Years of Experience:', numericValue);  // In ra giá trị sau khi chuyển thành số
        } else {
            alert('Vui lòng nhập số');// In thông báo nếu không phải số hợp lệ
        }
    };
    

    const handleSkillsChange = (selectedSkills) => {
        const skillsString = selectedSkills.join(','); // Gộp mảng thành chuỗi phân cách bằng dấu phẩy
        setSkills(skillsString); // Lưu giá trị chuỗi
        console.log('Skills:', skillsString); // In skills dưới dạng chuỗi
    };    


    // Chuyển đổi tab
    const [activeTab, setActiveTab] = useState('profileView');
    const handleTabClick = (tab) => setActiveTab(tab);

    //phân trang 
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const jobsPerPage = 3; // Số lượng job mỗi trang

    // Tính toán các job hiển thị
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = allProfiles.slice(indexOfFirstJob, indexOfLastJob); // Các job hiện tại
    const totalPages = Math.ceil(allProfiles.length / jobsPerPage); // Tổng số trang

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

    return (
        <div className='company-profile'>
            {/* Phần tiêu đề "Công ty của tôi" */}
            <div className="company-profile-header">
            <h2>Tìm kiếm ứng viên phù hợp với yêu cầu của công ty</h2>
                <button
                    className="search-job-btn-advanced"
                    onClick={toggleAdvancedFilters}
                >
                    {showAdvancedFilters ? 'Ẩn nâng cao' : 'Lọc nâng cao'}
                </button>
                {showAdvancedFilters && (
                    <div className="search-job-advanced-filters">
                        <Dropdown label="Địa điểm" isInputField={true}
                                onSelect={handleSpecificAddressChange} />
                        <Dropdown label="Chức danh" isInputField={true}
                                onSelect={handleJobTitleChange}/>
                        <Dropdown label="Cấp bậc" isInputField={true}
                                onSelect={handleJobLevelChange} />
                        <Dropdown label="Năm Kinh nghiệm" isInputField={true}
                                onSelect={handleYearsOfExperienceChange} />
                        <Dropdown label="Kỹ năng" isInputField={true}
                                onSelect={handleSkillsChange} />
                    </div>
                )}
                <button onClick={handleSearch}> Lọc</button>
            </div>
            <div className="company-profile-container">
                {/* Thanh điều hướng tab */}
                <div className="company-profile-tabs">
                    <button
                        className={`company-profile-tab ${activeTab === 'profileView' ? 'active' : ''}`}
                        onClick={() => handleTabClick('profileView')}
                    >
                        <FaEye /> Ứng viên
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
                        {currentJobs.map((follower_profile) => (
                            <div key={follower_profile._id} className="company-profile-item">
                                <div className='company-profile-info-left'>
                                    <img
                                        src={follower_profile.logo || 'https://via.placeholder.com/150'}
                                        className="company-profile-logo"
                                    />
                                    <div className="company-profile-info">
                                        <Link to={`/applicants/applicant-profile/${follower_profile._id}`}>
                                            <h4>{`${follower_profile.first_name} ${follower_profile.last_name}`}</h4>
                                        </Link>
                                        <span>{`${follower_profile.current_industry} - ${follower_profile.current_field}`}</span>
                                        <span><FaPaperPlane style={{ margin: "0 10px 0 0" }} /> {follower_profile.email}</span>
                                        <span>
                                            <FaUserTie style={{ margin: "0 10px 0 0" }} /> {follower_profile.job_level}
                                        </span>
                                        <span className='find-applicant-row'>
                                            <div><FaBriefcase style={{ margin: "0 10px 0 0" }} /> {`${follower_profile.years_of_experience} năm`} </div>
                                            <div><FaMoneyCheckAlt style={{ margin: "0 10px 0 0" }} /> {`$${follower_profile.desired_salary}`} </div>
                                            <div><FaMapMarkerAlt style={{ margin: "0 10px 0 0" }} /> {follower_profile.desired_work_location} </div>
                                        </span>
                                    </div>
                                </div>
                                <button className="company-profile-unfollow">
                                    <FaTimes /> Mời ứng tuyển
                                </button>
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

                {/* Nội dung tab "Theo dõi công ty" */}
                {activeTab === 'followCompany' && (
                    <div className="company-profile-content profile-view">

                    </div>
                )}
            </div>
        </div >
    )
}

export default FindApplicant;