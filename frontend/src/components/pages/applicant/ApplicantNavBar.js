import React, { useState, useEffect  } from 'react';
import '../../../styles/applicantnavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faBriefcase, faBell, faCogs, faSignOutAlt, faQuestionCircle, faComments } from '@fortawesome/free-solid-svg-icons';
import { logout } from "../../../libs/isAuth";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function ApplicantNavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null); // Lưu trữ dữ liệu người dùng
    const [error, setError] = useState(null); // Lưu trữ lỗi (nếu có)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage
    
            // Kiểm tra nếu không có token
            if (!token) {
              setError('Token is missing, please login again.');
              setLoading(false);
              return;
            }
    
            const response = await axios.get('http://localhost:5000/api/users/me', {
              headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
              },
            });
    
            setUser(response.data); // Lưu dữ liệu người dùng
            setLoading(false);
          } catch (err) {
            console.error('Error fetching user data:', err);
            setError('Failed to fetch user data.');
            setLoading(false);
          }
        };
    
        fetchUserProfile(); 
      }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="applicant-profile">
            {/* User Icon */}
            <div className="applicant-notification-buttons">
                <button className="applicant-notification-button">
                    <FontAwesomeIcon icon={faBell} />
                </button>
                <button className="applicant-notification-button">
                    <FontAwesomeIcon icon={faComments} />
                </button>
            </div>
            <div className="applicant-icon" onClick={toggleMenu}>
                <img src="https://via.placeholder.com/50" alt="User Icon" className="applicant-image" />
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div className="applicant-menu">
                    <div className="applicant-info">
                        <div className='applicant-info-detail'>
                            <h4 className="applicant-name">{user?.username}</h4>
                            <p className="applicant-email">{user?.email}</p>
                        </div>
                        <button className="applicant-update-button">Cập nhật hồ sơ</button>
                    </div>
                    <div className="applicant-menu-items">
                        <Link to='/applicant-dashboard'>
                            <button className="applicant-menu-item">
                                <FontAwesomeIcon icon={faUser} className="applicant-menu-icon" />
                                Tổng Quan
                            </button>
                        </Link>

                        <button className="applicant-menu-item">
                            <FontAwesomeIcon icon={faUser} className="applicant-menu-icon" />
                            Hồ Sơ Của Tôi
                        </button>
                        <button className="applicant-menu-item">
                            <FontAwesomeIcon icon={faBuilding} className="applicant-menu-icon" />
                            Công Ty Của Tôi
                        </button>
                        <button className="applicant-menu-item">
                            <FontAwesomeIcon icon={faBriefcase} className="applicant-menu-icon" />
                            Việc Làm Của Tôi
                        </button>
                        <button className="applicant-menu-item">
                            <FontAwesomeIcon icon={faBell} className="applicant-menu-icon" />
                            Thông Báo Việc Làm
                        </button>
                        <button className="applicant-menu-item">
                            <FontAwesomeIcon icon={faCogs} className="applicant-menu-icon" />
                            Quản Lý Tài Khoản
                        </button>
                        <button className="applicant-menu-item" type='button' onClick={handleLogoutClick}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="applicant-menu-icon" />
                            Thoát
                        </button>
                    </div>
                    <div className="applicant-help">
                        <a href="#" className="applicant-help-link">
                            <FontAwesomeIcon icon={faQuestionCircle} className="applicant-help-icon" />
                            Tham khảo những câu hỏi thường gặp
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
