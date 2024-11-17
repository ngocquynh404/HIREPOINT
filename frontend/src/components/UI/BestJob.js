import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../../styles/bestjob.css';
import axios from 'axios';

export default function BestJob() {
    const [jobs, setJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Fetch danh sách công việc khi component được render
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/jobs');
                setJobs(response.data);
                setLoading(false);
                console.log(response.data);
            } catch (err) {
                setError('Không thể tải công việc. Vui lòng thử lại.');
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

   

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Địa điểm');
    const [currentPage, setCurrentPage] = useState(0);
    const dropdownRef = useRef(null);
    const jobsPerPage = 12;

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const selectFilter = (filter) => {
        setSelectedFilter(filter);
        setIsDropdownOpen(false);
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const filterJobs = (filter) => {
        switch (filter) {
            case 'Địa điểm':
                return jobs.filter((job) => job.location.includes('Hà Nội'));
            case 'Mức lương':
                return jobs.filter((job) => parseInt(job.salary.split(' ')[1]) > 15);
            default:
                return jobs;
        }
    };

    const currentJobs = filterJobs(selectedFilter).slice(currentPage * jobsPerPage, (currentPage + 1) * jobsPerPage);
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

    return (
        <div className="job-listing-container">
            <header className="job-list-header">
                <h1 className="header-title">Việc làm tốt nhất</h1>
            </header>

            <div className="job-filters">
                <div className="filters-left">
                    <div className="filter-dropdown" ref={dropdownRef}>
                        <button className="filter-dropdown-toggle" onClick={toggleDropdown}>
                            Lọc theo: <span className="selected-filter">{selectedFilter}</span>
                            <span className="dropdown-arrow-2">▼</span>
                        </button>
                        {isDropdownOpen && (
                            <div className="filter-dropdown-menu">
                                {['Địa điểm', 'Mức lương', 'Kinh nghiệm', 'Ngành nghề'].map((filter) => (
                                    <div
                                        key={filter}
                                        className={`filter-option ${selectedFilter === filter ? 'selected' : ''}`}
                                        onClick={() => selectFilter(filter)}
                                    >
                                        {filter}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="location-dropdown-2">
                        <span className="location-icon-2">📍</span>
                        <span className="location-text-2">Tất cả tỉnh/thành phố</span>
                    </div>
                </div>
                <div className="navigation-component">
                    <a href="#view-all" className="view-all">Xem tất cả</a>
                    <div className="nav-buttons">
                        <button className="nav-button" onClick={prevPage} disabled={currentPage === 0}>&#8249;</button>
                        <button className="nav-button" onClick={nextPage} disabled={currentPage === totalPages - 1}>&#8250;</button>
                    </div>
                </div>
            </div>

            <div className='job-list'>
                <div className="job-container">
                    {jobs.length >0? (
                    jobs.map((job, index) => (
                        <div key={index} className="job-item-card">
                            <div className="company-logo">
                                <img src={job.company_id? job.company_id.logo:'N/A'} alt="Company Logo" />
                            </div>
                            <div className="job-info-section">
                                <Link to={`/jobs/jobdetail/${job.id}`} className="position-title">
                                    <h2 className="position-title">{job.title}</h2>
                                </Link>
                                <p className="company-name">{job.company_id?job.company_id.name:'N/A'}</p>
                                <div className="job-info">
                                    <span className="salary-info">{job.salary}</span>
                                    <span className="location-info">{job.location}</span>
                                </div>
                            </div>
                            <div className="favorite-icon" onClick={() => toggleFavorite(job.title)}>
                                <span>{favorites.includes(job.title) ? '❤️' : '🤍'}</span>
                            </div>
                        </div>
                    ))
                ):(
                    <p></p>)}
                </div>
                <div className="pagination-indicator">
                    <div className="nav-buttons">
                        <button className="nav-button" onClick={prevPage} disabled={currentPage === 0}>&#8249;</button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`pagination-dot ${index === currentPage ? 'active' : ''}`}
                                onClick={() => setCurrentPage(index)}
                            />
                        ))}
                        <button className="nav-button" onClick={nextPage} disabled={currentPage === totalPages - 1}>&#8250;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
