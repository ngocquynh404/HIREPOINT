import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import '../../../styles/companydetail.css';
import ApplyJob from '../applicant/ApplyJob';
import axios from 'axios';

const companyWall = {
    banner: 'https://example.com/600x200',
    logo: 'https://example.com/100',
    name: 'ABC Corporation',
    size: '500-1000 nhân viên',
    followers: '10,000'
};

const company = {
    name: 'Kohnan Vietnam',
    description: `Xin chào, chúng tôi là Kohnan Japan. Kohnan chúng tôi là doanh nghiệp hoạt động về lĩnh vực Home center với quy mô hơn 300 cửa hàng tại Nhật Bản. Home Center là cửa hàng bày bán những mặt hàng nhằm mục đích cải thiện sinh hoạt và đời sống. Từ bí quyết thành công ở Nhật Bản cùng những sản phẩm phục vụ sinh hoạt và đời sống, chúng tôi sẽ góp phần là cuộc sống người Việt Nam ngày càng phong phú hơn. Chúng tôi đang trong quá trình mở rộng quy mô. Vì thế, chúng tôi hân hạnh chào đón tất cả các ứng viên tiềm năng đến cộng tác cùng chúng tôi để phát triển một Kohnan Việt Nam lớn mạnh trong tương lai.`,
    address: 'Phòng 20-02, tầng 20F, cao ốc Báo Gia, 182 Lê Đại Hành, P.15, Q.11, TP.HCM',
    mapLink: 'https://www.google.com/maps',
    jobListings: [
        { title: 'Nhân Viên Bán Hàng', location: 'Hà Nội, Bình Dương, HCM', salary: '5 - 7 triệu', daysLeft: '24' },
        { title: 'Nhân Viên Vận Hành', location: 'HCM', salary: '6 - 8 triệu', daysLeft: '28' },
        { title: 'Nhân Viên Ngân Lưu', location: 'Hà Nội', salary: '5 - 7 triệu', daysLeft: '24' },
        { title: 'Nhân Viên Thời Vụ', location: 'HCM, Bình Dương', salary: 'Thỏa thuận', daysLeft: '24' }
    ]
};

export default function CompanyDetail() {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);  // Declare loading state
    const [error, setError] = useState(null);
    const [followedCompanies, setFollowedCompanies] = useState([]);
    /*const jobData = [
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
        }
    ];*/

    const { id } = useParams();
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/companies/${id}`);
                setCompany(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching company data');
                setLoading(false);
            }
        };

        fetchCompany();
    }, [id]);
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

    ///apply job
    // const [jobList, setJobList] = useState(jobData); // Dữ liệu danh sách công việc
    // const [favoriteJobs, setFavoriteJobs] = useState([]); // Danh sách công việc yêu thích
    const [jobToApply, setJobToApply] = useState(null); // Công việc được chọn để ứng tuyển

    /*const handleFavoriteToggle = (jobTitle) => {
        setFavoriteJobs((prevFavorites) =>
            prevFavorites.includes(jobTitle)
                ? prevFavorites.filter((title) => title !== jobTitle)
                : [...prevFavorites, jobTitle]
        );
    };
*/
    const openApplyForm = (job) => {
        setJobToApply(job); // Gán công việc được chọn
    };

    const closeApplyForm = () => {
        setJobToApply(null); // Đóng form ứng tuyển
    };
    const handleFollow = async (companyId) => {
        try {
            const token = localStorage.getItem('token');  // Lấy token từ localStorage

            if (!token) {
                alert('Bạn chưa đăng nhập. Vui lòng đăng nhập lại.');
                return;
            }

            const response = await axios.post(
                'http://localhost:5000/api/followedcompanies',
                { company_id: companyId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 201) {
                alert('Công ty đã được theo dõi!');
                window.location.reload();
                setFollowedCompanies((prevFollowedCompanies) => [
                    ...prevFollowedCompanies,
                    response.data.followedCompany,
                ]);
            }
        } catch (err) {
            if (err.response) {
                const { status, data } = err.response;

                if (status === 401) {
                    alert(data.message || 'Bạn chưa đăng nhập. Vui lòng đăng nhập lại.');
                }
                else {
                    alert(data.message || 'Không thể theo dõi công ty. Vui lòng thử lại.');
                }
            }
        }
    };

    return (
        <div className='company-detail'>
            <div className="company-detail-info-container">
                {/* Banner của công ty */}
                <div className="company-detail-info-banner">
                    <img src={company?.logo} alt="Company Banner" />
                </div>

                {/* Phần thông tin chính */}
                <div className="company-detail-info-content">
                    {/* Logo công ty */}
                    <div className="company-detail-info-logo">
                        <img src={company?.logo} alt="Company Logo" />
                    </div>

                    {/* Chi tiết công ty */}
                    <div className="company-detail-info-details">
                        <h2 className="company-detail-info-name">{company?.name}</h2>
                        <div className="company-detail-info-meta">
                            <span className="company-detail-info-size">
                                🏢 {company?.quymo}
                            </span>
                            <span className="company-detail-info-followers">
                                👥 {company?.industry} {/*người theo dõi*/}
                            </span>
                        </div>
                    </div>

                    {/* Nút theo dõi công ty */}
                    <button onClick={() => handleFollow(company._id)} className="company-detail-info-follow-button">
                        + Theo dõi công ty
                    </button>
                </div>
            </div>
            <div className="company-detail-info-wrapper">
                <div className="company-detail-info-main">
                    <div className="company-detail-info-intro">
                        <h2>Giới thiệu công ty</h2>
                        <p>{company?.description}</p>
                        <button className="company-detail-info-toggle">Thu gọn</button>
                    </div>

                    <div className="company-detail-info-jobs">
                        <h3 className='company-detail-info-jobs-header'>We Have Some Jobs For You</h3>
                        <div className='company-detail-info-list-left'>
                            <div className='company-detail-info-list'>
                                <div className="company-detail-info-board-list-container">
                                    {/*} {map((job, index) => (
                                        <div key={index} className="company-detail-info-item">
                                            <div className="company-detail-info-company-logo">
                                                <img src={job.logo} alt="Company Logo" />
                                            </div>
                                            <div className="company-detail-info-sections">
                                                <Link to={`/jobs/jobdetail/${job.id}`} className="company-detail-info-position-title">
                                                    <h2>{job.title}</h2>
                                                </Link>
                                                <p className="company-detail-info-company-name">{job.company}</p>
                                                <span className="company-detail-info-salary">{job.salary}</span>
                                                <div className="company-detail-info-details">
                                                    <span className="company-detail-info-location">📍 {job.location}</span>
                                                    <span className="company-detail-info-remaining-days">⏳ Còn {job.remainingDays} ngày để ứng tuyển</span>
                                                </div>
                                                <p className="company-detail-info-update">Cập nhật {job.updateTime} trước</p>
                                            </div>
                                            <div className="company-detail-info-apply-section">
                                                <button className="company-detail-info-apply-job-button" onClick={() => openApplyForm(job)}>Ứng tuyển</button>
                                                <div className="company-detail-info-favorite-icon" onClick={() => toggleFavorite(job.title)}>
                                                    <span>{favorites.includes(job.title) ? '❤️' : '🤍'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {jobToApply && (
                    <ApplyJob job={jobToApply} onClose={closeApplyForm} />

                )}

                <div className="company-detail-info-sidebar">
                    <div className="company-detail-info-contact">
                        <h3>Thông tin liên hệ</h3>
                        <p>📍 Địa chỉ công ty</p>
                        <p>🏢 {company?.location}</p>
                        <a href={""} target="_blank" rel="noopener noreferrer">
                            📍 Xem bản đồ
                        </a>
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=..."
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Company Location"
                            ></iframe>
                        </div>
                    </div>
                    <div className="company-detail-info-share">
                        <h3>Chia sẻ công ty tới bạn bè</h3>
                        <p>Sao chép đường dẫn công ty</p>
                        <div className="share-link">
                            <input type="text" value={company?.website} readOnly />
                            <button>📋</button>
                        </div>
                        <p>Chia sẻ qua mạng xã hội</p>
                        <div className="company-detail-info-social-links">
                            <a href="#" className="facebook" aria-label="Facebook"></a>
                            <a href="#" className="twitter" aria-label="Twitter"></a>
                            <a href="#" className="linkedin" aria-label="LinkedIn"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
