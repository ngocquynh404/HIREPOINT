import React, { useState, useRef, useEffect } from "react";
import '../../../styles/profile.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap, FaEdit, FaMedal, FaUniversity, FaBook, FaAward, FaBriefcase, FaCalendarAlt, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import UploadCV from './UploadCV';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';

const skills = [
  "Quản lý dự án phần mềm",
  "Lập trình JavaScript & ReactJS",
  "Phân tích và thiết kế hệ thống",
  "Phát triển ứng dụng di động (Flutter)",
  "Xử lý cơ sở dữ liệu (MySQL, MongoDB)",
  "Kỹ năng làm việc nhóm và lãnh đạo"
];

const countryList = [
  { name: "Việt Nam", flag: "🇻🇳" },
  { name: "United States", flag: "🇺🇸" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "France", flag: "🇫🇷" },
  { name: "India", flag: "🇮🇳" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "Brazil", flag: "🇧🇷" },
];

const countryData = [
  {
    name: "Việt Nam",
    code: "+84",
    flag: "https://flagcdn.com/w40/vn.png"
  },
  {
    name: "United States",
    code: "+1",
    flag: "https://flagcdn.com/w40/us.png"
  },
  {
    name: "United Kingdom",
    code: "+44",
    flag: "https://flagcdn.com/w40/gb.png"
  },
  {
    name: "France",
    code: "+33",
    flag: "https://flagcdn.com/w40/fr.png"
  },
  {
    name: "Germany",
    code: "+49",
    flag: "https://flagcdn.com/w40/de.png"
  },
  {
    name: "Japan",
    code: "+81",
    flag: "https://flagcdn.com/w40/jp.png"
  },
  {
    name: "Australia",
    code: "+61",
    flag: "https://flagcdn.com/w40/au.png"
  },
  {
    name: "India",
    code: "+91",
    flag: "https://flagcdn.com/w40/in.png"
  },
  {
    name: "Canada",
    code: "+1",
    flag: "https://flagcdn.com/w40/ca.png"
  },
  {
    name: "Brazil",
    code: "+55",
    flag: "https://flagcdn.com/w40/br.png"
  }
];

const locations = {
  "Việt Nam": {
    "Hà Nội": ["Quận Ba Đình", "Quận Hoàn Kiếm", "Quận Đống Đa", "Quận Cầu Giấy", "Quận Tây Hồ"],
    "Hồ Chí Minh": [
      "Huyện Bình Chánh",
      "Huyện Cần Giờ",
      "Huyện Củ Chi",
      "Huyện Hóc Môn",
      "Huyện Nhà Bè",
      "Quận 1",
      "Quận 2",
      "Quận 3",
      "Quận 7",
      "Quận 9"
    ],
    "Đà Nẵng": ["Quận Hải Châu", "Quận Cẩm Lệ", "Quận Liên Chiểu", "Quận Ngũ Hành Sơn", "Quận Sơn Trà"],
    "Cần Thơ": ["Quận Ninh Kiều", "Quận Bình Thủy", "Quận Cái Răng", "Huyện Phong Điền"]
  },
  "Afghanistan": {
    "Kabul": ["District 1", "District 2", "District 3", "District 4"],
    "Herat": ["Guzara", "Kohsan", "Obeh"],
    "Kandahar": ["Daman", "Panjwai", "Spin Boldak"]
  },
  "Albania": {
    "Tirana": ["Kashar", "Farkë", "Peza", "Zall-Herr"],
    "Durrës": ["Ishëm", "Rrashbull", "Sukth"]
  },
  "Algeria": {
    "Algiers": ["Bab El Oued", "El Madania", "Hussein Dey"],
    "Oran": ["El Kerma", "Es Senia", "Bir El Djir"],
    "Constantine": ["Beni Hamidane", "Didouche Mourad", "Hamma Bouziane"]
  },
  "American Samoa": {
    "Tutuila": ["Pago Pago", "Tafuna", "Nu'uuli"],
    "Manu'a Islands": ["Ta'u", "Ofu", "Olosega"]
  }
};

const Profile = () => {

  ///////////////////////////////FORM THÔNG TIN CƠ BẢN////////////////////////
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [currentJobTitle, setCurrentJobTitle] = useState("");
  const [isEditBasicInfoOpen, setIsEditBasicInfoOpen] = useState(false);

  // Hàm để mở form chỉnh sửa thông tin cơ bản
  const handleEditBasicInfoClick = () => {
    setIsEditBasicInfoOpen(true);
  };

  // Hàm để đóng form chỉnh sửa thông tin cơ bản
  const handleCloseBasicInfoEdit = () => {
    resetForm(); // Reset trạng thái
    setIsEditBasicInfoOpen(false); // Đóng form
  };

  const resetForm = () => {
    setLastName("");
    setFirstName("");
    setSelectedGender("");
    setEmail("");
    setPhoneNumber("");
    setSelectedCountry(countryData[0]); // Quốc gia mặc định
    setSelectedNationality(null);
    setSelectedDate("");
    setSelectedAddress("");
    setCurrentJobTitle("");
    setBreadcrumbs1([]);
    setCurrentLevel1(locations);
    setSelectedValue1("");
    setBreadcrumbs2([]);
    setCurrentLevel2(locations);
    setSelectedValue2("");
  };

  // Trạng thái cho ô địa chỉ 1
  const [currentLevel1, setCurrentLevel1] = useState(locations); // Cấp hiện tại
  const [breadcrumbs1, setBreadcrumbs1] = useState([]); // Lưu đường dẫn đã chọn
  const [selectedValue1, setSelectedValue1] = useState(""); // Giá trị đã chọn
  const [isMenuOpen1, setIsMenuOpen1] = useState(false); // Trạng thái mở menu

  // Trạng thái cho ô địa chỉ 2
  const [currentLevel2, setCurrentLevel2] = useState(locations); // Cấp hiện tại
  const [breadcrumbs2, setBreadcrumbs2] = useState([]); // Lưu đường dẫn đã chọn
  const [selectedValue2, setSelectedValue2] = useState(""); // Giá trị đã chọn
  const [isMenuOpen2, setIsMenuOpen2] = useState(false); // Trạng thái mở menu

  // Hàm xử lý cho ô địa chỉ 1
  const handleSelect1 = (key) => {
    if (typeof currentLevel1[key] === "object") {
      setBreadcrumbs1([...breadcrumbs1, key]); // Cập nhật breadcrumbs
      setCurrentLevel1(currentLevel1[key]); // Chuyển xuống cấp tiếp theo
    } else {
      setSelectedValue1([...breadcrumbs1, key].join(" / ")); // Lưu giá trị đã chọn
      setIsMenuOpen1(false); // Đóng menu
    }
  };

  const handleBack1 = () => {
    if (breadcrumbs1.length > 0) {
      const newBreadcrumbs = breadcrumbs1.slice(0, -1); // Loại bỏ cấp cuối
      const newLevel = newBreadcrumbs.reduce((acc, key) => acc[key], locations); // Lấy lại dữ liệu cấp trước
      setBreadcrumbs1(newBreadcrumbs);
      setCurrentLevel1(newLevel);
    }
  };

  const toggleMenu1 = () => {
    setIsMenuOpen1(!isMenuOpen1);
  };

  // Hàm xử lý cho ô địa chỉ 2
  const handleSelect2 = (key) => {
    if (typeof currentLevel2[key] === "object") {
      setBreadcrumbs2([...breadcrumbs2, key]); // Cập nhật breadcrumbs
      setCurrentLevel2(currentLevel2[key]); // Chuyển xuống cấp tiếp theo
    } else {
      setSelectedValue2([...breadcrumbs2, key].join(" / ")); // Lưu giá trị đã chọn
      setIsMenuOpen2(false); // Đóng menu
    }
  };

  const handleBack2 = () => {
    if (breadcrumbs2.length > 0) {
      const newBreadcrumbs = breadcrumbs2.slice(0, -1); // Loại bỏ cấp cuối
      const newLevel = newBreadcrumbs.reduce((acc, key) => acc[key], locations); // Lấy lại dữ liệu cấp trước
      setBreadcrumbs2(newBreadcrumbs);
      setCurrentLevel2(newLevel);
    }
  };

  const toggleMenu2 = () => {
    setIsMenuOpen2(!isMenuOpen2);
  };


  const [selectedCountry, setSelectedCountry] = useState(countryData[0]); // Quốc gia mặc định
  const [phoneNumber, setPhoneNumber] = useState(""); // Số điện thoại
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái dropdown

  // Xử lý khi chọn quốc gia
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false); // Đóng dropdown sau khi chọn
  };

  const [selectedDate, setSelectedDate] = useState(""); // Ngày được chọn
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Trạng thái mở/đóng lịch
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Tháng hiện tại

  // Lấy danh sách ngày trong tháng
  const getDaysInMonth = (month, year) => {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Chuyển đổi tháng
  const changeMonth = (direction) => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + direction,
      1
    );
    setCurrentMonth(newMonth);
  };

  // Xử lý khi chọn ngày
  const handleDateSelect = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Định dạng YYYY-MM-DD
    setSelectedDate(formattedDate);
    setIsCalendarOpen(false); // Đóng lịch
  };

  const [selectedGender, setSelectedGender] = useState(""); // Giới tính được chọn

  // Danh sách các lựa chọn giới tính
  const genderOptions = [
    { label: "Nam", value: "Male", icon: "👨" },
    { label: "Nữ", value: "Female", icon: "👩" },
    { label: "Khác", value: "Other", icon: "🌈" },
  ];

  // Xử lý khi chọn giới tính
  const handleGenderSelect = (value) => {
    setSelectedGender(value);
  };

  const [selectedNationality, setSelectedNationality] = useState(null); // Quốc tịch được chọn
  const [dropdownVisible, setDropdownVisible] = useState(false); // Trạng thái mở/đóng dropdown
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm

  // Lọc danh sách quốc gia theo từ khóa
  const filteredCountries = countryList.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  ///////////////////////////////END FORM THÔNG TIN CƠ BẢN////////////////////////




  ///////////////////////////////FORM THÔNG TIN HỌC VẤN////////////////////////
  // Trạng thái mở/đóng form
  const [isEditEduInfoOpen, setIsEditEduInfoOpen] = useState(false);

  // Trạng thái cho các trường dữ liệu trong form
  const [major, setMajor] = useState("");
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  // Hàm mở form
  const handleEduInfoClick = () => {
    setIsEditEduInfoOpen(true);
  };

  // Hàm đóng form và reset trạng thái
  const handleCloseEduInfoEdit = () => {
    setIsEditEduInfoOpen(false);
    setMajor(""); // Reset chuyên ngành
    setSchool(""); // Reset trường
    setDegree(""); // Reset bằng cấp
    setStartMonth(""); // Reset "Từ tháng"
    setEndMonth(""); // Reset "Đến tháng"
    setEditorState(EditorState.createEmpty()); // Reset trình chỉnh sửa thành tựu
  };
  ///////////////////////////////END FORM THÔNG TIN HỌC VẤN////////////////////////



  ///////////////////////////////FORM MỤC TIÊU NGHỀ NGHIỆP////////////////////////
  const [isEditJobGoalOpen, setIsEditJobGoalOpen] = useState(false);

  // Hàm mở form
  const handleJobGoalClick = () => {
    setIsEditJobGoalOpen(true);
  };

  // Hàm đóng form và reset trạng thái
  const handleCloseJobGoalEdit = () => {
    setIsEditJobGoalOpen(false);
    setEditorState(EditorState.createEmpty()); // Reset nội dung editor
  };

  // Hàm xử lý khi lưu
  const handleSave = () => {
    // Logic lưu trữ nội dung editorState (ví dụ: gửi lên API hoặc lưu localStorage)
    console.log("Lưu nội dung:", editorState.getCurrentContent().getPlainText());
    setIsEditJobGoalOpen(false);
  };
  ///////////////////////////////END FORM MỤC TIÊU NGHỀ NGHIỆP////////////////////////



  ///////////////////////////////FORM KỸ NĂNG////////////////////////
  const [skill, setSkill] = useState("");  // Lưu trữ kỹ năng nhập vào
  const [skillsList, setSkillsList] = useState([]);  // Lưu trữ danh sách kỹ năng đã thêm
  const [isEditSkillOpen, setIsEditSkillOpen] = useState(false);  // Trạng thái hiển thị form chỉnh sửa kỹ năng

  // Hàm để mở form chỉnh sửa kỹ năng
  const handleSkillClick = () => {
    setIsEditSkillOpen(true);
  };

  // Hàm để đóng form chỉnh sửa kỹ năng và reset lại trạng thái
  const handleCloseSkillEdit = () => {
    setIsEditSkillOpen(false);  // Đóng form
    setSkill("");  // Reset ô nhập liệu về rỗng
    setSkillsList([]);  // Xóa danh sách kỹ năng đã thêm (hoặc có thể giữ lại nếu muốn)
  };

  // Hàm để xử lý thay đổi giá trị trong ô nhập liệu
  const handleInputSkillChange = (e) => {
    setSkill(e.target.value);
  };

  // Hàm để xử lý khi nhấn "Thêm"
  const handleSubmit = (e) => {
    e.preventDefault();
    if (skill.trim()) {
      setSkillsList([...skillsList, skill]);  // Thêm kỹ năng vào danh sách
      setSkill("");  // Reset ô nhập liệu
    }
  };
  ///////////////////////////////END FORM KỸ NĂNG////////////////////////




  ///////////////////////////////FORM KINH NGHIỆM////////////////////////
  const [isEditExpOpen, setIsEditExpOpen] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Mô tả công việc
  const [isChecked, setIsChecked] = useState(false); // Trạng thái checkbox
  const [formData, setFormData] = useState({
    position: "", // Chức danh
    company: "", // Công ty
    startMonth: "", // Từ tháng
    endMonth: "", // Đến tháng
  });

  // Hàm mở form
  const handleExpClick = () => {
    setIsEditExpOpen(true);
  };

  // Hàm đóng form và reset trạng thái
  const handleCloseExpEdit = () => {
    setIsEditExpOpen(false);
    setEditorState(EditorState.createEmpty()); // Reset mô tả công việc
    setIsChecked(false); // Bỏ chọn checkbox
    setFormData({
      position: "",
      company: "",
      startMonth: "",
      endMonth: "",
    }); // Reset các trường input
  };

  // Hàm xử lý thay đổi input
  const handleInputExpChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Hàm xử lý checkbox
  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  ///////////////////////////////END FORM KINH NGHIỆM////////////////////////
  const [profiles, setProfiles] = useState([]);
  const [currentUserProfile, setCurrentUserProfile] = useState(null); // State to store the current user's profile
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // State for error handling
  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      setError('No token found!');
      setLoading(false);
      return;
    }
  
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profiles/list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfiles(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setError('Error fetching profiles');
      } finally {
        setLoading(false); // Make sure loading is set to false after the fetch operation
      }
    };
  
    fetchProfiles();
  }, []);
  
  return (
    <div className='my-profile'>
      {/* Form thông tin cơ bản *********************************************/}
      <div className="user-info-card">

        <button className="user-info-edit-btn" onClick={handleEditBasicInfoClick}>
          <FaEdit />
        </button>
        {loading ? (
        <p>Loading profiles...</p>
      ) : error ? (
        <p>{error}</p>
      ) : profiles.length > 0 ? (
        profiles.map((profile) => (
          <div key={profile._id}>
            <div className='user-info-name-position'>

              <div className="user-info-avatar"></div>
              {<img src={''} alt="Avatar" />}
              <h2 className="user-info-name"> {profile.first_name && profile.last_name
                    ? `${profile.first_name} ${profile.last_name}`
                    : 'No Name'}
              </h2>
              <p className="user-info-position">{profile.job_title ? profile.job_title : 'No Job Title'}
              </p>
              <p className="user-info-position">{profile.years_of_experience
                    ? `${profile.years_of_experience} years experience`
                    : 'No Experience'}
              </p>
            </div>
            <div className="user-info-details">
              <div className='user-info-1'>
                <h3 className='user-basic-info-header'>Thông tin cơ bản</h3>
                <div className='user-basic-info'>
                  <div className="user-info">
                    <div>
                      <FaEnvelope className="user-info-icon" />
                      <span>{profile.email || 'No Email'}</span>
                    </div>
                    <div>
                      <FaMapMarkerAlt className="user-info-icon" />
                      <span>{profile.location || 'No Location'}</span>
                    </div>
                    <div>
                      <FaPhone className="user-info-icon" />
                      <span>{profile.phone || 'No Phone'}</span>
                    </div>
                  </div>
                  <div className='user-info'>
                    <div>
                      <FaBriefcase className="user-info-icon" />
                      <span>{profile.job_level || 'No Job Level'}</span>
                    </div>
                    <div>
                      <FaGraduationCap className="user-info-icon" />
                      <span>{profile.education || 'No Education'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='user-info-2'>
                <h3 className='user-basic-info-header'>Công việc mong muốn </h3>
                <div className='user-basic-info'>
                  <div className="user-info">
                    <div>
                      <FaEnvelope className="user-info-icon" />
                      <span>Nơi làm việc: {profile.desired_work_location || 'No Desired Location'}</span>
                    </div>
                  </div>
                  <div className='user-info'>
                    <div>
                      <FaBriefcase className="user-info-icon" />
                      <span>Mức lương: {profile.desired_salary
                            ? `$${profile.desired_salary}/Tháng`
                            : 'No Desired Salary'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No profiles found.</p>
      )}
      </div>
      {/* Form chỉnh sửa thông tin cơ bản *********************************************/}
      {isEditBasicInfoOpen && (
        <>
          <div className="user-info-edit-overlay">
            <div className="user-info-edit-container">
              {/* Header */}
              <div className="user-info-edit-header-form">
                <div className="user-info-edit-header">
                  <h2>Thông Tin Cơ Bản</h2>
                  <button className="user-info-edit-close-btn" onClick={handleCloseBasicInfoEdit}>
                    &times;
                  </button>
                </div>
              </div>

              {/* Nội dung Form */}
              <form className="user-info-edit-form">
                <div className='user-info-edit-basic-info'>
                  <div className="user-info-avatar"></div>
                  <div className='user-info-edit-right'>
                    <div className="user-info-edit-col">
                      <div className="user-info-edit-row">
                        <label htmlFor="lastName" className="user-info-edit-label">
                          Họ <span className="user-info-edit-required">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="user-info-edit-input"
                          placeholder="Nhập họ"
                        />
                      </div>
                      <div className="user-info-edit-row">
                        <label htmlFor="firstName" className="user-info-edit-label">
                          Tên <span className="user-info-edit-required">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="user-info-edit-input"
                          placeholder="Nhập tên"
                        />
                      </div>
                    </div>
                    <div className="user-info-edit-col">
                      <div className="gender-select-container">
                        <label htmlFor="gender" className="user-info-edit-label">
                          Giới tính <span className="user-info-edit-required">*</span>
                        </label>
                        <div className="gender-options">
                          {genderOptions.map((option) => (
                            <div
                              key={option.value}
                              className={`gender-option ${selectedGender === option.value ? "selected" : ""
                                }`}
                              onClick={() => handleGenderSelect(option.value)}
                            >
                              <div>
                                <span className="gender-icon">{option.icon}</span>
                                <span className="gender-label">{option.label}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="user-info-edit-row">
                        <label htmlFor="email" className="user-info-edit-label">
                          Email <span className="user-info-edit-required">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="user-info-edit-input"
                          placeholder="Nhập email"
                        />
                      </div>
                    </div>
                    <div className="user-info-edit-col">
                      <div className="phone-input-container">
                        <label htmlFor="phone" className="user-info-edit-label">
                          Điện thoại <span className="user-info-edit-required">*</span>
                        </label>
                        {/* Ô nhập điện thoại */}
                        <div className="phone-input">
                          {/* Selectbox đầu số quốc gia */}
                          <div
                            className="country-select"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          >
                            <img src={selectedCountry.flag} alt={selectedCountry.name} />
                            <span>{selectedCountry.code}</span>
                            <span className="dropdown-arrow">&#9662;</span>
                          </div>

                          {/* Input số điện thoại */}
                          <input
                            type="text"
                            placeholder="Nhập số điện thoại"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>

                        {/* Dropdown danh sách quốc gia */}
                        {isDropdownOpen && (
                          <ul className="country-dropdown">
                            {countryData.map((country) => (
                              <li
                                key={country.code}
                                onClick={() => handleCountrySelect(country)}
                                className="country-item"
                              >
                                <img src={country.flag} alt={country.name} />
                                <span>{country.name}</span>
                                <span>{country.code}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="nationality-select-container">
                        <label htmlFor="nationality" className="user-info-edit-label">
                          Quốc tịch <span className="user-info-edit-required">*</span>
                        </label>
                        {/* Ô hiển thị quốc tịch */}
                        <div
                          className="nationality-select-input"
                          onClick={() => setDropdownVisible(!dropdownVisible)}
                        >
                          {selectedNationality ? (
                            <div className="selected-country">
                              <span className="country-flag">{selectedNationality.flag}</span>
                              <span className="country-name">{selectedNationality.name}</span>
                            </div>
                          ) : (
                            "Chọn quốc tịch"
                          )}
                        </div>

                        {/* Dropdown quốc tịch */}
                        {dropdownVisible && (
                          <div className="nationality-dropdown">
                            {/* Thanh tìm kiếm */}
                            <input
                              type="text"
                              placeholder="Tìm quốc gia..."
                              className="search-nationality-input"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            {/* Danh sách quốc gia */}
                            <div className="country-list">
                              {filteredCountries.map((country) => (
                                <div
                                  key={country.name}
                                  className="country-item"
                                  onClick={() => {
                                    setSelectedNationality(country);
                                    setDropdownVisible(false); // Đóng dropdown
                                  }}
                                >
                                  <span className="country-flag">{country.flag}</span>
                                  <span className="country-name">{country.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="user-info-edit-col-bigger">
                  <div className="date-picker-container">
                    <label htmlFor="email" className="user-info-edit-label">
                      Ngày sinh <span className="user-info-edit-required">*</span>
                    </label>
                    {/* Ô nhập ngày sinh */}
                    <div
                      className="date-picker-input"
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    >
                      {selectedDate || "Chọn ngày sinh"}
                    </div>

                    {/* Lịch chọn ngày */}
                    {isCalendarOpen && (
                      <div className="calendar-dropdown">
                        {/* Header lịch */}
                        <div className="calendar-header">
                          <button onClick={() => changeMonth(-1)}>&lt;</button>
                          <span>
                            {currentMonth.toLocaleString("default", {
                              month: "long",
                              year: "numeric"
                            })}
                          </span>
                          <button onClick={() => changeMonth(1)}>&gt;</button>
                        </div>

                        {/* Danh sách ngày */}
                        <div className="calendar-grid">
                          {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                            <div key={day} className="calendar-day-name">
                              {day}
                            </div>
                          ))}
                          {getDaysInMonth(
                            currentMonth.getMonth(),
                            currentMonth.getFullYear()
                          ).map((date) => (
                            <div
                              key={date}
                              className="calendar-day"
                              onClick={() => handleDateSelect(date)}
                            >
                              {date.getDate()}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="user-info-edit-selectbox">
                    <label htmlFor="address-selected" className="user-info-edit-label">
                      Địa chỉ <span className="user-info-edit-required">*</span>
                    </label>
                    <div className="user-info-edit-select-display" onClick={toggleMenu1}>
                      {selectedValue1 || "Chọn địa điểm"}
                    </div>
                    {isMenuOpen1 && (
                      <div className="user-info-edit-menu">
                        <div className="user-info-edit-breadcrumbs">
                          {breadcrumbs1.length > 0 && (
                            <button onClick={handleBack1}>&lt;</button>
                          )}
                          <span>{breadcrumbs1.join(" / ") || "Chọn địa điểm"}</span>
                        </div>
                        <ul className="user-info-edit-options">
                          {Object.keys(currentLevel1).map((key) => (
                            <li
                              key={key}
                              onClick={() => handleSelect1(key)}
                              className="user-info-edit-option"
                            >
                              {key}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="user-info-edit-row">
                  <label htmlFor="address" className="user-info-edit-label">
                    Địa chỉ cụ thể <span className="user-info-edit-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="user-info-edit-input"
                    placeholder="Nhập chức danh"
                  />
                </div>
                <div className="user-info-edit-row">
                  <label htmlFor="title" className="user-info-edit-label">
                    Chức danh <span className="user-info-edit-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="user-info-edit-input"
                    placeholder="Nhập chức danh"
                  />
                </div>

                <div className="user-info-edit-row">
                  <label htmlFor="level" className="user-info-edit-label">
                    Cấp bậc hiện tại <span className="user-info-edit-required">*</span>
                  </label>
                  <select id="level" className="user-info-edit-select">
                    <option value="">Chọn cấp bậc</option>
                    <option value="Trưởng phòng">Trưởng phòng</option>
                    <option value="Nhân viên">Nhân viên</option>
                    <option value="Thực tập sinh">Thực tập sinh</option>
                  </select>
                </div>

                <div className="user-info-edit-col">
                  <div className="user-info-edit-row">
                    <label htmlFor="industry" className="user-info-edit-label">
                      Ngành nghề hiện tại <span className="user-info-edit-required">*</span>
                    </label>
                    <select id="industry" className="user-info-edit-select">
                      <option value="">Chọn ngành nghề</option>
                      <option value="IT">IT</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Giáo dục">Giáo dục</option>
                    </select>
                  </div>
                  <div className="user-info-edit-row">
                    <label htmlFor="field" className="user-info-edit-label">
                      Lĩnh vực hiện tại <span className="user-info-edit-required">*</span>
                    </label>
                    <select id="field" className="user-info-edit-select">
                      <option value="">Chọn lĩnh vực công ty</option>
                      <option value="Công nghệ">Công nghệ</option>
                      <option value="Giáo dục">Giáo dục</option>
                      <option value="Kinh doanh">Kinh doanh</option>
                    </select>
                  </div>
                </div>

                <div className="user-info-edit-col">
                  <div className="user-info-edit-row">
                    <label htmlFor="experience" className="user-info-edit-label">
                      Số Năm Kinh Nghiệm <span className="user-info-edit-required">*</span>
                    </label>
                    <div className="user-info-edit-input-group">
                      <input
                        type="number"
                        id="experience"
                        className="user-info-edit-inputt"
                        placeholder="Nhập số năm kinh nghiệm"
                      />
                      <span className="user-info-edit-unit">Năm</span>
                    </div>
                  </div>

                  <div className="user-info-edit-row">
                    <label htmlFor="salary" className="user-info-edit-label">
                      Mức lương hiện tại
                    </label>
                    <div className="user-info-edit-input-group">
                      <input
                        type="text"
                        id="salary"
                        className="user-info-edit-inputt"
                        placeholder=""
                      />
                      <span className="user-info-edit-unit">USD/tháng</span>
                    </div>
                  </div>
                </div>

                <div className="user-info-edit-col">
                  <div className="user-info-edit-selectbox">
                    <label htmlFor="workaddress" className="user-info-edit-label">
                      Nơi làm việc mong muốn
                    </label>
                    <div className="user-info-edit-select-display" onClick={toggleMenu2}>
                      {selectedValue2 || "Chọn địa điểm"}
                    </div>
                    {isMenuOpen2 && (
                      <div className="user-info-edit-menu">
                        <div className="user-info-edit-breadcrumbs">
                          {breadcrumbs2.length > 0 && (
                            <button onClick={handleBack2}>&lt;</button>
                          )}
                          <span>{breadcrumbs2.join(" / ") || "Chọn địa điểm"}</span>
                        </div>
                        <ul className="user-info-edit-options">
                          {Object.keys(currentLevel2).map((key) => (
                            <li
                              key={key}
                              onClick={() => handleSelect2(key)}
                              className="user-info-edit-option"
                            >
                              {key}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="user-info-edit-row">
                    <label htmlFor="salary-expect" className="user-info-edit-label">
                      Mức lương mong muốn
                    </label>
                    <div className="user-info-edit-input-group">
                      <input
                        type="text"
                        id="salary"
                        className="user-info-edit-inputt"
                        placeholder=""
                      />
                      <span className="user-info-edit-unit">USD/tháng</span>
                    </div>
                  </div>
                </div>

              </form>

              {/* Footer (Save/Cancel) */}
              <div className="user-info-edit-button-row">
                <button className="user-info-edit-save-btn" type="submit">
                  Lưu
                </button>
                <button className="user-info-edit-cancel-btn" type="button" onClick={handleCloseBasicInfoEdit}>
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <UploadCV />

      {/* Form thông tin học vấn *********************************************/}
      <div className="user-info-card">
        <button className="user-info-edit-btn" onClick={handleEduInfoClick} >
          <FaEdit />
        </button>
        <div className="user-info-details">
          <div className='edu-info'>
            <div className="edu-card-header">
              <h3 className="user-basic-info-header">Thông tin học vấn</h3>
              <h3 className="edu-title">Đại học Bách khoa Hà Nội</h3>
              <p className="edu-subtitle">Viện Điện - Cử nhân</p>
            </div>
            <div className="edu-card-body">
              <ul className="edu-achievements">
                <li>
                  <FaMedal className="edu-icon" />
                  <span>Thủ khoa đầu vào Viện Điện (2017)</span>
                </li>
                <li>
                  <FaBook className="edu-icon" />
                  <span>Giải Ba cuộc thi Olympic Đại số cấp trường (2017 – 2018)</span>
                </li>
                <li>
                  <FaAward className="edu-icon" />
                  <span>Giải Nhì nghiên cứu khoa học bộ môn Điều khiển tự động (2020 – 2021)</span>
                </li>
                <li>
                  <FaUniversity className="edu-icon" />
                  <span>2 bài báo nghiên cứu công bố tại hội nghị quốc tế</span>
                </li>
                <li>
                  <FaMedal className="edu-icon" />
                  <span>Học bổng Khuyến khích Tài năng và loại A của trường</span>
                </li>
                <li>
                  <FaAward className="edu-icon" />
                  <span>Sinh viên 5 tốt cấp trường (2020 – 2021)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Form chỉnh sửa thông tin học vấn *********************************************/}
      {isEditEduInfoOpen && (
        <>
          <div className="user-info-edit-overlay">
            <div className="user-info-edit-container">
              {/* Header */}
              <div className="user-info-edit-header-form">
                <div className="user-info-edit-header">
                  <h2>Thông Tin Học Vấn</h2>
                  <button className="user-info-edit-close-btn" onClick={handleCloseEduInfoEdit}>
                    &times;
                  </button>
                </div>
              </div>
              {/* Nội dung Form */}
              <form className="user-info-edit-form">
                <div className="user-info-edit-row">
                  <label htmlFor="major" className="user-info-edit-label">
                    Chuyên ngành <span className="user-info-edit-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="major"
                    className="user-info-edit-input"
                    placeholder="Nhập chuyên ngành"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                  />
                </div>
                <div className="user-info-edit-col">
                  <div className="user-info-edit-row">
                    <label htmlFor="school" className="user-info-edit-label">
                      Trường <span className="user-info-edit-required">*</span>
                    </label>
                    <input
                      type="text"
                      id="school"
                      className="user-info-edit-input"
                      placeholder="Nhập trường"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                    />
                  </div>
                  <div className="user-info-edit-row">
                    <label htmlFor="degree" className="user-info-edit-label">
                      Bằng cấp <span className="user-info-edit-required">*</span>
                    </label>
                    <select
                      id="degree"
                      className="user-info-edit-select"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                    >
                      <option value="">Chọn bằng cấp</option>
                      <option value="highschool">Trung học</option>
                      <option value="vocational">Trung cấp</option>
                      <option value="college">Cao đẳng</option>
                      <option value="bachelor">Cử nhân</option>
                      <option value="master">Thạc sĩ</option>
                      <option value="doctor">Tiến sĩ</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>
                <div className="user-info-edit-col">
                  <div className="user-info-edit-row">
                    <label htmlFor="start-month" className="user-info-edit-label">
                      Từ tháng <span className="user-info-edit-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="start-month"
                        className="form-input"
                        placeholder="MM/YYYY"
                        value={startMonth}
                        onChange={(e) => setStartMonth(e.target.value)}
                      />
                      <span className="icon-calendar">📅</span>
                    </div>
                  </div>
                  <div className="user-info-edit-row">
                    <label htmlFor="end-month" className="user-info-edit-label">
                      Đến tháng <span className="user-info-edit-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="end-month"
                        className="form-input"
                        placeholder="MM/YYYY"
                        value={endMonth}
                        onChange={(e) => setEndMonth(e.target.value)}
                      />
                      <span className="icon-calendar">📅</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="achievement" className="user-info-edit-label">
                    Thành tựu <span className="user-info-edit-required">*</span>
                  </label>
                  <div className="textarea-wrapper">
                    <div id="achievement" className="form-textarea">
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        toolbarHidden={false}
                        placeholder="Nhập thành tựu của bạn..."
                      />
                    </div>
                  </div>
                </div>
              </form>
              {/* Footer (Save/Cancel) */}
              <div className="user-info-edit-button-row">
                <button className="user-info-edit-save-btn" type="submit">
                  Lưu
                </button>
                <button className="user-info-edit-cancel-btn" type="button" onClick={handleCloseEduInfoEdit}>
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Form mục tiêu nghề nghiệp *********************************************/}
      <div className="user-info-card">
        <button className="user-info-edit-btn" onClick={handleJobGoalClick}>
          <FaEdit />
        </button>
        <div className='user-info-3'>
          <h3 className='user-basic-info-header'>Mục tiêu nghề nghiệp</h3>
          <div>
            <p className='wrap-text'>Đảm nhận vai trò IT Manager tại một công ty uy tín, sử dụng kiến thức và kỹ năng về quản lý dự án và phát triển hệ thống để nâng cao hiệu suất và chất lượng công việc của đội ngũ IT.</p>
            <p className='wrap-text'>Mục tiêu là trở thành Giám đốc công nghệ (CTO) trong vòng 5-7 năm tới, tận dụng kinh nghiệm trong quản lý và phát triển hệ thống thông tin để dẫn dắt các dự án công nghệ chiến lược của công ty.</p>
          </div>
        </div>
      </div>
      {/* Form chỉnh sửa mục tiêu nghề nghiệp *********************************************/}
      {isEditJobGoalOpen && (
        <>
          <div className="user-info-edit-overlay">
            <div className="user-info-edit-container">
              {/* Header */}
              <div className="user-info-edit-header-form">
                <div className="user-info-edit-header">
                  <h2>Mục tiêu nghề nghiệp</h2>
                  <button className="user-info-edit-close-btn" onClick={handleCloseJobGoalEdit}>
                    &times;
                  </button>
                </div>
              </div>

              {/* Nội dung Form */}
              <form className="user-info-edit-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <div className="textarea-wrapper">
                    <div id="achievement" className="form-textarea">
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        toolbarHidden={false}
                        placeholder="Nhập mục tiêu của bạn..."
                      />
                    </div>
                  </div>
                </div>
              </form>

              {/* Footer */}
              <div className="user-info-edit-button-row">
                <button className="user-info-edit-save-btn" type="button" onClick={handleSave}>
                  Lưu
                </button>
                <button className="user-info-edit-cancel-btn" type="button" onClick={handleCloseJobGoalEdit}>
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Form kinh nghiệm làm việc *********************************************/}
      <div className="user-info-card">
        <button className="user-info-edit-btn" onClick={handleExpClick}>
          <FaEdit />
        </button>
        <div className="user-info-3">
          <h3 className='user-basic-info-header'>Kinh nghiệm làm việc</h3>
          {/* Tiêu đề công việc và công ty */}
          <div className="card-header">
            <div>
              <h3 className="card-title">IT Manager</h3>
              <p className="card-company"><FaBuilding className="company-icon" /> Công ty Công nghệ ABC</p>
            </div>
          </div>

          {/* Thời gian làm việc */}
          <div className="card-period">
            <FaCalendarAlt className="calendar-icon" />
            <span className="card-company">Từ Tháng 6/2020 đến Tháng 11/2024</span>
          </div>

          {/* Mô tả công việc */}
          <div className="card-description wrap-text">
            Quản lý đội ngũ phát triển phần mềm và đảm bảo tiến độ dự án. Lãnh đạo đội ngũ 15 nhân viên. Phối hợp với các phòng ban để tối ưu quy trình làm việc. Đạt được tăng trưởng doanh thu 20% cho dự án.
          </div>
        </div>
      </div>
      {/* Form chỉnh sửa kinh nghiệm làm việc *********************************************/}
      {isEditExpOpen && (
        <>
          <div className="user-info-edit-overlay">
            <div className="user-info-edit-container">
              {/* Header */}
              <div className="user-info-edit-header-form">
                <div className="user-info-edit-header">
                  <h2>Kinh nghiệm làm việc</h2>
                  <button className="user-info-edit-close-btn" onClick={handleCloseExpEdit}>
                    &times;
                  </button>
                </div>
              </div>

              {/* Nội dung Form */}
              <form className="user-info-edit-form">
                <div className="user-info-edit-col">
                  <div className="user-info-edit-row">
                    <label htmlFor="position" className="user-info-edit-label">
                      Chức danh <span className="user-info-edit-required">*</span>
                    </label>
                    <input
                      type="text"
                      id="position"
                      className="user-info-edit-input"
                      placeholder="Nhập chức danh"
                      value={formData.position}
                      onChange={handleInputExpChange}
                    />
                  </div>
                  <div className="user-info-edit-row">
                    <label htmlFor="company" className="user-info-edit-label">
                      Công ty <span className="user-info-edit-required">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="user-info-edit-input"
                      placeholder="Nhập công ty"
                      value={formData.company}
                      onChange={handleInputExpChange}
                    />
                  </div>
                </div>
                <div className="user-info-edit-col">
                  <div className="user-info-edit-row">
                    <label htmlFor="startMonth" className="user-info-edit-label">
                      Từ tháng <span className="user-info-edit-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="startMonth"
                        className="form-input"
                        placeholder="MM/YYYY"
                        value={formData.startMonth}
                        onChange={handleInputExpChange}
                      />
                      <span className="icon-calendar">📅</span>
                    </div>
                  </div>
                  <div className="user-info-edit-row">
                    <label htmlFor="endMonth" className="user-info-edit-label">
                      Đến tháng <span className="user-info-edit-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="endMonth"
                        className="form-input"
                        placeholder="MM/YYYY"
                        value={formData.endMonth}
                        onChange={handleInputExpChange}
                        disabled={isChecked}
                      />
                      <span className="icon-calendar">📅</span>
                    </div>
                  </div>
                </div>
                <div className="checkbox-container">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-custom"></span>
                    Công việc hiện tại
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="user-info-edit-label">
                    Mô tả <span className="user-info-edit-required">*</span>
                  </label>
                  <div className="textarea-wrapper">
                    <div id="description" className="form-textarea">
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        toolbarHidden={false}
                        placeholder="Nhập mô tả..."
                      />
                    </div>
                  </div>
                </div>
              </form>
              {/* Footer */}
              <div className="user-info-edit-button-row">
                <button className="user-info-edit-save-btn" type="submit">
                  Lưu
                </button>
                <button className="user-info-edit-cancel-btn" type="button" onClick={handleCloseExpEdit}>
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Form kỹ năng *********************************************/}
      <div className="user-info-card">
        <button className="user-info-edit-btn" onClick={handleSkillClick}>
          <FaEdit />
        </button>
        <div className="user-info-3">
          <h3 className='user-basic-info-header'>Kỹ năng</h3>
          <div>
            <ul className="skills-list">
              {skills.map((skill, index) => (
                <li key={index} className="skill-item">
                  <FaCheckCircle className="skill-icon" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Form chỉnh sửa kỹ năng *********************************************/}
      {isEditSkillOpen && (
        <>
          <div className="user-info-edit-overlay">
            <div className="user-info-edit-container">
              {/* Header */}
              <div className="user-info-edit-header-form">
                <div className="user-info-edit-header">
                  <h2>Kỹ năng</h2>
                  <button className="user-info-edit-close-btn" onClick={handleCloseSkillEdit}>
                    &times;
                  </button>
                </div>
              </div>

              {/* Nội dung Form */}
              <form className="user-info-edit-form" onSubmit={handleSubmit}>
                <div className="user-info-edit-row">
                  <label htmlFor="skill" className="user-info-edit-label">
                    Kỹ năng
                  </label>
                  <div className="user-info-edit-col-add">
                    <input
                      type="text"
                      id="skill"
                      className="user-info-edit-input"
                      placeholder="Nhập kỹ năng"
                      value={skill}  // Dùng state để điều khiển giá trị nhập vào
                      onChange={handleInputSkillChange}  // Cập nhật giá trị khi người dùng gõ
                    />
                    <button className="user-info-edit-save-btn" type="submit">
                      Thêm
                    </button>
                  </div>
                </div>

                {/* Hiển thị danh sách kỹ năng đã thêm */}
                {skillsList.length > 0 && (
                  <div className="skills-list-add">
                    <h3>Kỹ năng đã thêm:</h3>
                    <ul>
                      {skillsList.map((item, index) => (
                        <li key={index}>{item}</li>  // Hiển thị từng kỹ năng trong danh sách
                      ))}
                    </ul>
                  </div>
                )}
              </form>

              {/* Footer (Save/Cancel) */}
              <div className="user-info-edit-button-row">
                <button className="user-info-edit-save-btn" type="submit">
                  Lưu
                </button>
                <button className="user-info-edit-cancel-btn" type="button" onClick={handleCloseSkillEdit}>
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

