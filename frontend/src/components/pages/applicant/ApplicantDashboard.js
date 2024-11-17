import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserCircle,
    faTachometerAlt,
    faFileAlt,
    faBuilding,
    faBriefcase,
    faBell,
    faCog,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import '../../../styles/applicantdashboard.css';
import Profile from './Profile';
import MyCompany from './MyCompany';
import MyJob from './MyJob';
import JobNotificationManager from './JobNotificationManager';

const ApplicantDashboard = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard'); // Trạng thái theo dõi menu đang chọn

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const renderContent = () => {
        switch (activeMenu) {
            case 'profile':
                return <Profile />;
            case 'dashboard':
                return <h2>Tổng Quan</h2>;
            case 'company':
                return <MyCompany />;
            case 'jobs':
                return <MyJob />;
            case 'alerts':
                return <JobNotificationManager />
            case 'settings':
                return <h2>Quản Lý Tài Khoản</h2>;
            default:
                return <h2>Chọn một mục từ menu</h2>;
        }
    };

    return (
        <div className="applicant-dashboard-container">
            <aside className={`applicant-dashboard-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <div className='applicant-dashboard-profile-toggle'>
                    {!isCollapsed && (
                        <div className="applicant-dashboard-profile">
                            <div className="applicant-dashboard-user-info">
                                <FontAwesomeIcon icon={faUserCircle} className="applicant-dashboard-avatar-icon" />
                                <h3 className="applicant-dashboard-name">Ma Thị Ngọc Quỳnh</h3>
                                <p className="applicant-dashboard-role">IT Manager</p>
                            </div>
                        </div>
                    )}
                    <button
                        className="applicant-dashboard-toggle"
                        onClick={toggleSidebar}
                        style={{ width: isCollapsed ? '100%' : '20%' }}
                    >
                        {isCollapsed ? '>' : '<'}
                    </button>
                </div>
                <nav className="applicant-dashboard-menu">
                    <a
                        href="#"
                        className={`applicant-dashboard-menu-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('dashboard')}
                    >
                        <FontAwesomeIcon icon={faTachometerAlt} />
                        {!isCollapsed && <span>Tổng Quan</span>}
                    </a>
                    <a
                        href="#"
                        className={`applicant-dashboard-menu-item ${activeMenu === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('profile')}
                    >
                        <FontAwesomeIcon icon={faFileAlt} />
                        {!isCollapsed && <span>Hồ Sơ Của Tôi</span>}
                    </a>
                    <a
                        href="#"
                        className={`applicant-dashboard-menu-item ${activeMenu === 'company' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('company')}
                    >
                        <FontAwesomeIcon icon={faBuilding} />
                        {!isCollapsed && <span>Công Ty Của Tôi</span>}
                    </a>
                    <a
                        href="#"
                        className={`applicant-dashboard-menu-item ${activeMenu === 'jobs' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('jobs')}
                    >
                        <FontAwesomeIcon icon={faBriefcase} />
                        {!isCollapsed && <span>Việc Làm Của Tôi</span>}
                    </a>
                    <a
                        href="#"
                        className={`applicant-dashboard-menu-item ${activeMenu === 'alerts' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('alerts')}
                    >
                        <FontAwesomeIcon icon={faBell} />
                        {!isCollapsed && <span>Thông Báo Việc Làm</span>}
                    </a>
                    <a
                        href="#"
                        className={`applicant-dashboard-menu-item ${activeMenu === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('settings')}
                    >
                        <FontAwesomeIcon icon={faCog} />
                        {!isCollapsed && <span>Quản Lý Tài Khoản</span>}
                    </a>
                </nav>
                <a href="#" className="applicant-dashboard-create-job-alert">
                    <FontAwesomeIcon icon={faPlus} />
                    {!isCollapsed && <span>Tạo Thông Báo Việc Làm</span>}
                </a>
            </aside>
            <main className="applicant-dashboard-content">
                {renderContent()} {/* Hiển thị nội dung dựa trên menu */}
            </main>
        </div>
    );
};

export default ApplicantDashboard;
