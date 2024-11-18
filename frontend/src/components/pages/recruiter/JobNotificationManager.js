import React, { useState } from "react";
import { FaRegEnvelope, FaEnvelopeOpenText, FaTrashAlt, FaFilter, FaSearch, FaMoon, FaSun } from "react-icons/fa";
import "../../../styles/jobnotificationmanager.css";

const JobNotificationManager = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Thông báo việc làm mới", content: "Công việc phù hợp vừa được đăng: Kỹ sư phần mềm", isRead: false, timestamp: "17/11/2024 10:30" },
    { id: 2, title: "Hướng dẫn nâng cấp tài khoản", content: "Tài khoản của bạn có thể nâng cấp để nhận nhiều ưu đãi hơn.", isRead: true, timestamp: "16/11/2024 14:00" },
    { id: 3, title: "Cập nhật chính sách bảo mật", content: "Chính sách bảo mật của chúng tôi vừa được cập nhật.", isRead: false, timestamp: "15/11/2024 08:45" },
    { id: 4, title: "Chương trình khuyến mãi mới", content: "Tham gia ngay để nhận ưu đãi hấp dẫn từ công ty!", isRead: true, timestamp: "14/11/2024 16:20" },
    // Thêm nhiều thông báo hơn để test phân trang
  ]);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  const notificationsPerPage = 3;

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      filter === "all" || (filter === "read" && notification.isRead) || (filter === "unread" && !notification.isRead);
    const matchesSearch =
      notification.title.toLowerCase().includes(search.toLowerCase()) ||
      notification.content.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredNotifications.length / notificationsPerPage);
  const displayedNotifications = filteredNotifications.slice(
    (currentPage - 1) * notificationsPerPage,
    currentPage * notificationsPerPage
  );

  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: !notification.isRead } : notification
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className={`modern-inbox-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="modern-inbox-header">
        <h2>Hộp Thư Thông Báo</h2>
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div className="modern-inbox-controls">
        <div className="modern-inbox-filters">
          <button className={`modern-inbox-filter ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
            <FaFilter /> Tất cả
          </button>
          <button className={`modern-inbox-filter ${filter === "unread" ? "active" : ""}`} onClick={() => setFilter("unread")}>
            <FaRegEnvelope /> Chưa đọc
          </button>
          <button className={`modern-inbox-filter ${filter === "read" ? "active" : ""}`} onClick={() => setFilter("read")}>
            <FaEnvelopeOpenText /> Đã đọc
          </button>
        </div>

        <div className="modern-inbox-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Tìm kiếm thông báo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="modern-inbox-list">
        {displayedNotifications.length > 0 ? (
          displayedNotifications.map((notification) => (
            <div key={notification.id} className={`modern-inbox-item ${notification.isRead ? "read" : "unread"}`}>
              <div className="modern-inbox-item-header">
                <h3 className="modern-inbox-title">{notification.title}</h3>
                <span className="modern-inbox-timestamp">{notification.timestamp}</span>
              </div>
              <p className="modern-inbox-content">{notification.content}</p>
              <div className="modern-inbox-actions">
                <button className="modern-inbox-action-button toggle-read" onClick={() => toggleReadStatus(notification.id)}>
                  {notification.isRead ? <FaRegEnvelope /> : <FaEnvelopeOpenText />}{" "}
                  {notification.isRead ? "Chưa đọc" : "Đã đọc"}
                </button>
                <button className="modern-inbox-action-button delete" onClick={() => handleDelete(notification.id)}>
                  <FaTrashAlt /> Xóa
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="modern-inbox-empty">Không tìm thấy thông báo nào.</p>
        )}
      </div>

      <div className="modern-inbox-pagination">
        <button onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
          Trước
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <button onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}>
          Sau
        </button>
      </div>
    </div>
  );
};

export default JobNotificationManager;
