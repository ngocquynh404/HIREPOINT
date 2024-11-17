import React, { useState } from 'react';
import { FaPlus, FaEllipsisV, FaPaperclip } from 'react-icons/fa';
import '../../../styles/uploadcv.css';

const UploadCV = () => {
  const [showForm, setShowForm] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileName, setFileName] = useState('');

  // Hàm xử lý khi tải file
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFile = {
        name: file.name,
        date: new Date().toLocaleDateString('vi-VN'),
      };
      setUploadedFiles([...uploadedFiles, newFile]);
      setFileName('');
    }
  };

  // Hàm mở/đóng form
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="upload-card">
      {/* Tiêu đề và nút mở form */}
      <div className="upload-header">
        <h3>Hồ sơ đã tải lên</h3>
        <FaPlus className="upload-toggle" onClick={toggleForm} />
      </div>

      {/* Form tải file */}
      {showForm && (
        <div className="upload-form">
          <label htmlFor="file-upload" className="custom-file-upload">
          <FaPlus className="upload-plus"/>
            Chọn Hồ Sơ
          </label>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileUpload}
            accept=".doc,.docx,.pdf"
          />
          <p>Hỗ trợ định dạng .doc, .docx, .pdf có kích thước dưới 5120KB</p>
        </div>
      )}

      {/* Danh sách hồ sơ đã tải */}
      <div className="uploaded-files">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="uploaded-file-item">
            <FaPaperclip className="file-icon" />
            <div className="file-info">
              <span className="file-name">{file.name}</span>
              <span className="file-date">Cập nhật lần cuối: {file.date}</span>
              <a href="/" className="file-link">Xem như nhà tuyển dụng</a>
            </div>
            <FaEllipsisV className="file-menu-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadCV;
