import React, { useState } from 'react';
import '../../../styles/recruiternavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faBriefcase, faBell, faCogs, faSignOutAlt, faQuestionCircle, faComments } from '@fortawesome/free-solid-svg-icons';
import { logout } from "../../../libs/isAuth";
import { Link, useNavigate } from 'react-router-dom';

export default function RecruiterNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="recruiter-profile">
            {/* User Icon */}
            <div className="recruiter-notification-buttons">
                <button className="recruiter-notification-button">
                    <FontAwesomeIcon icon={faBell} />
                </button>
                <button className="recruiter-notification-button">
                    <FontAwesomeIcon icon={faComments} />
                </button>
            </div>
            <div className="recruiter-icon" onClick={toggleMenu}>
                <img src="https://via.placeholder.com/50" alt="User Icon" className="recruiter-image" />
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div className="recruiter-menu">
                    <div className="recruiter-info">
                        <div className='recruiter-info-detail'>
                            <h4 className="recruiter-name">Ma Thị Ngọc Quỳnh</h4>
                            <p className="recruiter-email">ngocquynh141@gmail.com</p>
                        </div>
                        <button className="recruiter-update-button">Cập nhật hồ sơ</button>
                    </div>
                    <div className="recruiter-menu-items">
                        <Link to='/recruiter-dashboard'>
                            <button className="recruiter-menu-item">
                                <FontAwesomeIcon icon={faUser} className="recruiter-menu-icon" />
                                Quản lý tuyển dụng
                            </button>
                        </Link>
                        <button className="recruiter-menu-item" type='button' onClick={handleLogoutClick}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="recruiter-menu-icon" />
                            Thoát
                        </button>
                    </div>
                    <div className="recruiter-help">
                        <a href="#" className="recruiter-help-link">
                            <FontAwesomeIcon icon={faQuestionCircle} className="recruiter-help-icon" />
                            Tham khảo những câu hỏi thường gặp
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
