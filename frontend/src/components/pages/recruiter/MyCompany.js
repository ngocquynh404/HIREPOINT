import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../../styles/mycompany.css';
import { FaBuilding, FaEye, FaUsers, FaTimes } from 'react-icons/fa';

const MyCompany = () => {
    const [activeTab, setActiveTab] = useState('profileView');

    // Dữ liệu mẫu cho các công ty
    const companies = [
        {
            id: 1,
            name: 'CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ CỬU LONG MEKO',
            industry: 'Bán lẻ/Bán sỉ',
            followers: 10,
            jobs: 2,
            logo: 'https://via.placeholder.com/50',
        },
        {
            id: 2,
            name: 'Daikin Air Conditioning (Vietnam) Joint Stock Company',
            industry: 'Sản xuất',
            followers: 588,
            jobs: 6,
            logo: 'https://via.placeholder.com/50',
        },
    ];

    // Chuyển đổi tab
    const handleTabClick = (tab) => setActiveTab(tab);

    return (
        <div className='my-company'>
            {/* Phần tiêu đề "Công ty của tôi" */}
            <div className="my-company-header">
                <h2>Công Ty Của Tôi</h2>
            </div>
            <div className="my-company-container">


                {/* Thanh điều hướng tab */}
                <div className="my-company-tabs">
                    <button
                        className={`my-company-tab ${activeTab === 'profileView' ? 'active' : ''}`}
                        onClick={() => handleTabClick('profileView')}
                    >
                        <FaEye /> Nhà tuyển dụng xem hồ sơ
                    </button>
                    <button
                        className={`my-company-tab ${activeTab === 'followCompany' ? 'active' : ''}`}
                        onClick={() => handleTabClick('followCompany')}
                    >
                        <FaUsers /> Theo dõi công ty
                    </button>
                </div>

                {/* Nội dung tab "Nhà tuyển dụng xem hồ sơ" */}
                {activeTab === 'profileView' && (
                    <div className="my-company-content profile-view">
                        <div className="my-company-empty-state">
                            <p>Nhà tuyển dụng không thể xem hồ sơ của bạn</p>
                            <a href="#" className="my-company-enable-view">
                                Bật chế độ cho phép nhà tuyển dụng xem hồ sơ
                            </a>
                        </div>
                    </div>
                )} 

                {/* Nội dung tab "Theo dõi công ty" */}
                {activeTab === 'followCompany' && (
                    <div className="my-company-content followed-companies">
                        {companies.map((company) => (
                            <div key={company.id} className="my-company-item">
                                <div className='my-company-info-left'>
                                    <img src={company.logo} alt={company.name} className="my-company-logo" />
                                    <div className="my-company-info">
                                        <Link to={`/companies/companydetail/${company.id}`}>
                                            <h4>{company.name}</h4>
                                        </Link>
                                        <span>
                                            <FaBuilding /> {company.industry}
                                        </span>
                                        <span>
                                            <FaUsers /> {company.followers} lượt theo dõi | 📄 {company.jobs} việc làm
                                        </span>
                                    </div>
                                </div>
                                <button className="my-company-unfollow">
                                    <FaTimes /> Huỷ theo dõi
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCompany;
