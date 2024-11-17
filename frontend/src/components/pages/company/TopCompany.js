import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../../styles/topcompany.css';

const companyData = [
    {
        id: 1,
        banner: 'https://via.placeholder.com/600x200',
        logo: 'https://via.placeholder.com/80',
        name: 'Jabil Vietnam Ltd',
        followers: '749 lượt theo dõi',
        jobs: [
            { title: 'Senior EHS Engineer', salary: 'Thương Lượng', location: 'Hồ Chí Minh' },
            { title: 'Supply Chain Project Manager', salary: 'Thương Lượng', location: 'Hồ Chí Minh' }
        ]
    },
    {
        id: 2,
        banner: 'https://via.placeholder.com/600x200',
        logo: 'https://via.placeholder.com/80',
        name: 'Kintetsu World Express',
        followers: '163 lượt theo dõi',
        jobs: [
            { title: 'Operation Intern', salary: 'Thương Lượng', location: 'Hồ Chí Minh, Hà Nội' },
            { title: 'Customer Service Supervisor', salary: 'Thương Lượng', location: 'Hà Nội' }
        ]
    },
    {
        id: 3,
        banner: 'https://via.placeholder.com/600x200',
        logo: 'https://via.placeholder.com/80',
        name: 'Home Credit Vietnam',
        followers: '455 lượt theo dõi',
        jobs: [
            { title: 'Process Analyst', salary: 'Thương Lượng', location: 'Hồ Chí Minh' },
            { title: 'Senior Business Legal Specialist', salary: 'Thương Lượng', location: 'Hồ Chí Minh' }
        ]
    },
];

// Tạo thêm dữ liệu mẫu
for (let i = 4; i <= 50; i++) {
    companyData.push({
        id: i,
        banner: 'https://via.placeholder.com/600x200',
        logo: 'https://via.placeholder.com/80',
        name: `Company ${i}`,
        followers: `${Math.floor(Math.random() * 1000) + 100} lượt theo dõi`,
        jobs: [
            {
                title: `Job Position ${i}-1`,
                salary: 'Thương Lượng',
                location: ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'][Math.floor(Math.random() * 3)]
            },
            {
                title: `Job Position ${i}-2`,
                salary: 'Thương Lượng',
                location: ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'][Math.floor(Math.random() * 3)]
            }
        ]
    });
}

export default function TopCompany() {
    // State để quản lý số lượng công ty hiển thị
    const [visibleCompanies, setVisibleCompanies] = useState(15);

    // Hàm để tăng số lượng công ty hiển thị
    const handleLoadMore = () => {
        setVisibleCompanies(prev => prev + 9);
    };

    return (
        <div className='unique-company'>
            <div className='unique-company-search-container'>
                <h2 className='unique-company-search-title'>
                    Khám phá 100.000+ công ty nổi bật
                </h2>
                <p className='unique-company-search-subtitle'>
                    Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành cho bạn
                </p>
                <div className='unique-company-search-bar'>
                    <input
                        type='text'
                        placeholder='Nhập tên công ty'
                        className='unique-company-search-input'
                    />
                    <button className='unique-company-search-button'>
                        Tìm kiếm
                    </button>
                </div>
            </div>
            <div className='unique-company-container'>
                <h2 className='unique-company-title'>Công ty nổi bật ({companyData.length})</h2>
                <div className='unique-company-grid'>
                    {companyData.slice(0, visibleCompanies).map(company => (
                        <div key={company.id} className='unique-company-card'>
                            <img src={company.banner} alt='Company Banner' className='unique-company-banner' />
                            <div className='unique-company-info'>
                                <img src={company.logo} alt='Company Logo' className='unique-company-logo' />
                                <div className='unique-company-details'>
                                    <Link to={`/companies/companydetail/${company.id}`} className="unique-company-name">
                                        <h3 className='unique-company-name'>{company.name}</h3>
                                    </Link>
                                    <p className='unique-company-followers'>{company.followers}</p>
                                    <button className='unique-company-follow-button'>+ Theo dõi</button>
                                </div>
                            </div>
                            <div className='unique-company-job-list'>
                                {company.jobs.map((job, index) => (
                                    <div key={index} className='unique-company-job-item'>
                                        <p className='unique-company-job-title'>{job.title}</p>
                                        <p className='unique-company-job-details'>
                                            {job.salary} | {job.location}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <button className='unique-company-view-button'>Xem công ty</button>
                        </div>
                    ))}
                </div>
                {/* Nút Xem thêm */}
                {visibleCompanies < companyData.length && (
                    <div className='unique-company-load-more'>
                        <button onClick={handleLoadMore} className='unique-company-load-more-button'>
                            Xem thêm
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
