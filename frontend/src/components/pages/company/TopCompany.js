import React, { useState, useEffect } from 'react';
import { Link ,useParams} from "react-router-dom";
import '../../../styles/topcompany.css';
import axios from 'axios';


export default function TopCompany() {
    const { companyId } = useParams();
    const [visibleCompanies, setVisibleCompanies] = useState(15);
    const [companies, setCompanies] = useState([]); // Danh sách công ty
    const [jobs, setJobs] = useState([]);
    const [followedCompanies, setFollowedCompanies] = useState([]); // Danh sách công ty đã theo dõi
    const [error, setError] = useState(null);  // State cho thông báo lỗi
    const [successMessage, setSuccessMessage] = useState(null);  // State cho thông báo thành công

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

    // Hàm để tăng số lượng công ty hiển thị
    const handleLoadMore = () => {
        setVisibleCompanies(prev => prev + 9);
    };

    useEffect(() => {
        // Lấy tất cả các công ty
        const fetchAllCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/companies');
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching all companies:', error);
                setError('Không thể tải danh sách công ty.');
            }
        };
        fetchAllCompanies();        
    }, []);

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
                <h2 className='unique-company-title'>Công ty nổi bật ({companies.length})</h2>
                <div className='unique-company-grid'>
                    {companies.length > 0 ? (
                        companies.map((company) => (
                            <div key={company?._id} className='unique-company-card'>
                                <img src={company?.banner} alt='Company Banner' className='unique-company-banner' />
                                <div className='unique-company-info'>
                                    <img src={company?.logo} alt='Company Logo' className='unique-company-logo' />
                                    <div className='unique-company-details'>
                                        <Link to={`/companies/companydetail/${company._id}`} className="unique-company-name">
                                            <h3 className='unique-company-name'>{company.company_name}</h3>
                                        </Link>
                                        <p className='unique-company-followers'>{company?.industry}</p>
                                        <button onClick={() => handleFollow(company._id)} className='unique-company-follow-button'>+ Theo dõi</button>
                                    </div>
                                </div>

                                <button className='unique-company-view-button'>Xem công ty</button>
                            </div>
                        ))
                    ) : (
                        <p>Không có công ty nào.</p>
                    )}
                </div>
                {/* Nút Xem thêm */}
                {visibleCompanies < companies.length && (
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
