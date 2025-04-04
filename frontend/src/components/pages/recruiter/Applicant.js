import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FaBuilding, FaEye, FaUsers, FaTimes, FaEdit } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import '../../../styles/companyprofile.css';
import '../../../styles/jobrecruiment.css';
import { getId } from '../../../libs/isAuth';
import axios from 'axios';
import { FaBriefcase, FaMoneyCheckAlt, FaPeriscope, FaBookmark, FaMapMarkerAlt, FaPaperPlane, FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Application = ({ jobId }) => {  // Destructure jobId từ props
    const [appliedProfiles, setAppliedProfile] = useState([]);
    const [job, setJob] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const interviewer_id = getId();
    const [isOpen, setIsOpen] = useState(false);

    const fetchJobData = async () => {
        console.log('jobId is  valid:', jobId)
        console.log('interview', interviewer_id)
        if (!jobId) {
            console.log('jobId is not valid:', jobId); // Khi jobId không hợp lệ
            return;
        }

        try {
            setLoading(true);

            // Thực hiện đồng thời cả hai yêu cầu
            const [jobResponse, appliedProfileResponse] = await Promise.all([
                axios.get(`http://localhost:5000/api/jobs/${jobId}`),
                axios.get(`http://localhost:5000/api/profiles/applications/applied-profiles/${jobId}`, {
                    params: {
                        interviewer_id: interviewer_id
                    }
                })
            ]);

            // Cập nhật dữ liệu
            setJob(jobResponse.data);
            console.log('thong tin cong viec', jobResponse.data);

            setAppliedProfile(appliedProfileResponse.data.data); // Chỉnh đúng key theo dữ liệu trả về từ API
            console.log('thong tin CV', appliedProfileResponse.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            console.error('Lỗi khi lấy dữ liệu:', error.response ? error.response.data : error.message);
            setError('Chưa có ứng viên nào ứng tuyển công việc này.'); // Thông báo lỗi
        } finally {
            setLoading(false); // Dừng trạng thái loading
        }
    };

    useEffect(() => {
        fetchJobData();
    }, [jobId]);

    const handleViewProfile = (profileId) => {
        navigate(`/applicants/applicant-profile/${profileId}?jobId=${job._id}`)
    }

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

    const on = () => {
        console.log("profile", appliedProfiles);
    }

    //////////////////////////////////////////////////////// 
    const [isEditing, setIsEditing] = useState(false); // Hiển thị form
    const [editingData, setEditingData] = useState(null); // Dữ liệu đang được chỉnh sửa
    const handleEditClick = (profileId, time) => {
        console.log("time", time);
        setEditingData({
            profileId: profileId,
            idtime: time?.idTime,
            schedule: time?.time || '',
            location: time?.location || '',
            status: time?.status || '',
            notes: time?.note || '',
        });
        setIsEditing(true);

        console.log("time", editingData);

    };
    const handleCloseForm = () => {
        console.log(editingData.schedule, editingData.location, editingData.status, editingData.notes);
        setIsEditing(false);
        setEditingData(null);
    };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEditingData((prev) => ({ ...prev, [id]: value }));
    };

    const formatDateTimeLocal = (isoString) => {
        if (!isoString) return ''; // Trả về chuỗi rỗng nếu không có giá trị
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm 0 nếu tháng < 10
        const day = String(date.getDate()).padStart(2, '0'); // Thêm 0 nếu ngày < 10
        const hours = String(date.getHours()).padStart(2, '0'); // Thêm 0 nếu giờ < 10
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Thêm 0 nếu phút < 10

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleSave = async (e) => {
        e.preventDefault(); // Ngăn chặn form submit mặc định
        setLoading(true); // Hiển thị trạng thái loading
        setError(''); // Xóa thông báo lỗi trước đó

        const id = editingData.idtime;

        const payload = {
            start_time: editingData.schedule,
            location: editingData.location,
            status: editingData.status,
            notes: editingData.notes,
            jobId, // Gửi jobId qua payload
        };

        try {
            // Gửi yêu cầu PUT đến API
            const response = await axios.put(
                `http://localhost:5000/api/interviewschedule/update-schedule/${id}`,
                payload
            );

            // Xử lý khi cập nhật thành công
            console.log('Update successful:', response.data);
            alert('Lịch phỏng vấn đã được cập nhật!');
            setEditingData(null);
            // Thực hiện các thao tác sau khi cập nhật thành công
            setIsEditing(false); // Đóng form chỉnh sửa
            await fetchJobData();
        } catch (error) {
            // Xử lý lỗi nếu yêu cầu thất bại
            console.error('Error updating schedule:', error);
            setError(error.response?.data?.message || 'Đã xảy ra lỗi khi cập nhật lịch phỏng vấn.');
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className='company-profile'>
            <div className='company-profile'>
                {/* Phần tiêu đề "Công ty của tôi" */}
                <div className="company-profile-header">
                    <div className='column-application'>
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
                            <p className="company-detail-info-company-name">{job.company_id?.company_name || 'Không rõ'}</p>
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
                    </div>
                </div>
                <div className="company-profile-container">
                    <div className="user-management-table-container" style={{ margin: '0' }}>
                        <table className="user-management-table">
                            <thead>
                                <tr>
                                    <th onClick={on}>
                                        Ứng viên ứng tuyển
                                    </th>
                                    <th>
                                        Thời gian phỏng vấn
                                    </th>
                                    <th>
                                        Địa điểm
                                    </th>
                                    <th>
                                        Trạng thái
                                    </th>
                                    <th>
                                        Ghi chú
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {appliedProfiles.length > 0 ? (
                                    <>
                                        {appliedProfiles.map((follower_profile, index) => (
                                            <tr key={index} className="user-management-row">
                                                <td style={{ width: '35%' }}>
                                                    <div className='company-profile-info-left'>
                                                        <img
                                                            src={follower_profile.user?.avatar || 'https://via.placeholder.com/150'}
                                                            className="company-profile-logo"
                                                        />
                                                        <div className="company-profile-info">
                                                            <Link to={`/applicants/applicant-profile/${follower_profile.profile?._id}?jobId=${job._id}`} target="_blank" rel="noopener noreferrer">
                                                                <h4>{`${follower_profile.profile?.first_name} ${follower_profile.profile?.last_name}`}</h4>
                                                            </Link>
                                                            <span>{`${follower_profile.profile?.current_industry} - ${follower_profile.profile?.current_field}`}</span>
                                                            <span>
                                                                <FaUserTie style={{ margin: "0 10px 0 0" }} /> {follower_profile.profile?.job_level}
                                                            </span>
                                                            <span className='find-applicant-row'>
                                                                <div><FaBriefcase style={{ margin: "0 10px 0 0" }} /> {`${follower_profile.profile?.years_of_experience} năm`} </div>
                                                                <div><FaMoneyCheckAlt style={{ margin: "0 10px 0 0" }} /> {`$${follower_profile.profile?.desired_salary}`} </div>
                                                            </span>
                                                            <span className='find-applicant-row'>
                                                                <div><FaMapMarkerAlt style={{ margin: "0 10px 0 0" }} /> {follower_profile.profile?.desired_work_location} </div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                {follower_profile.availableTimes.length === 1 ? (
                                                    follower_profile.availableTimes.map((time, timeIndex) => (
                                                        <>
                                                            <td style={{ width: '20%' }}>
                                                                <div key={timeIndex} className="my-appointment-row-calender" style={{ 'grid-template-columns': '100%' }}>
                                                                    {new Date(time.time).toLocaleString()}{" "}
                                                                </div>
                                                            </td>
                                                            <td style={{ width: '20%' }}>
                                                                {time.location || ""}
                                                            </td>
                                                            <td style={{ width: '15%' }}>
                                                                {time.status === "available" ? (
                                                                    <p>Đã gửi lịch phỏng vấn</p>
                                                                ) : (
                                                                    <>{time.status}</>
                                                                )}
                                                            </td>
                                                            <td style={{ width: '10%' }}>{time.note}
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="user-info-edit-btn"
                                                                    style={{ position: 'static' }}
                                                                    onClick={() => handleEditClick(follower_profile.profile?._id, time)}
                                                                >
                                                                    <FaEdit />
                                                                </button>
                                                            </td>
                                                        </>
                                                    ))
                                                ) : (
                                                    <>
                                                        <td style={{ width: '20%' }}>
                                                            {follower_profile.availableTimes.map((time, timeIndex) => (
                                                                <div key={timeIndex} className="my-appointment-row-calender" style={{ 'grid-template-columns': '100%' }}>
                                                                    {new Date(time.time).toLocaleString()}{" "}
                                                                </div>
                                                            ))}
                                                        </td>
                                                        <td style={{ width: '20%' }}>
                                                        </td>
                                                        <td style={{ width: '15%' }}>
                                                           Chưa hẹn lịch phỏng vấn
                                                        </td>
                                                        <td style={{ width: '10%' }}>
                                                        </td>
                                                        <td>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <p>Chưa có ứng viên nào ứng tuyển.</p>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
            {isEditing && (
                <>
                    <div className="user-info-edit-overlay">
                        <div className="user-info-edit-container" style={{ height: '45%' }}>
                            {/* Nội dung Form */}
                            <form className="user-info-edit-form">
                                <div className="user-info-edit-col">
                                    <div className="user-info-edit-row">
                                        <label htmlFor="schedule" className="user-info-edit-label">
                                            Lịch phỏng vấn
                                        </label>
                                        <input
                                            id="schedule"
                                            type="datetime-local"
                                            value={formatDateTimeLocal(editingData?.schedule) || ''} // Chuyển đổi định dạng
                                            className="create-appointment-input"
                                            onChange={(e) => setEditingData((prev) => ({ ...prev, schedule: e.target.value }))}
                                        />

                                    </div>
                                    <div className="user-info-edit-row">
                                        <label htmlFor="location" className="user-info-edit-label">
                                            Địa điểm phỏng vấn <span className="user-info-edit-required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            value={editingData?.location}
                                            className="user-info-edit-input"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="user-info-edit-col">
                                    <div className="user-info-edit-row">
                                        <label htmlFor="status" className="user-info-edit-label">
                                            Trạng thái <span className="user-info-edit-required">*</span>
                                        </label>
                                        <select
                                            id="status"
                                            value={editingData?.status || ''}
                                            className="user-info-edit-select"
                                            onChange={handleInputChange}
                                        >
                                            <option>Trạng thái</option>
                                            <option value="available">Đang xem xét</option>
                                            <option value="Chờ phê duyệt">Chờ phê duyệt</option>
                                            <option value="Đang đợi phỏng vấn">Chờ phỏng vấn</option>
                                            <option value="Đã phỏng vấn">Đã phỏng vấn</option>
                                            <option value="Hủy">Hủy</option>
                                        </select>
                                    </div>
                                    <div className="user-info-edit-row">
                                        <label htmlFor="notes" className="user-info-edit-label">
                                            Ghi chú <span className="user-info-edit-required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="notes"
                                            value={editingData?.notes}
                                            onChange={handleInputChange}
                                            className="user-info-edit-input"
                                        />
                                    </div>
                                </div>
                            </form>
                            {/* Footer (Save/Cancel) */}
                            <div className="user-info-edit-button-row">
                                <button onClick={(event) => handleSave(event)} className="user-info-edit-save-btn" type="submit">
                                    Lưu
                                </button>
                                <button className="user-info-edit-cancel-btn" type="button" onClick={handleCloseForm}>
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div >
    )
}

export default Application;