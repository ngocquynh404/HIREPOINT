import React, { useState, useRef } from "react";
import UploadCV from "./UploadCV";


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


const ApplyJob = ({ job, onClose }) => {
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
        { label: "Nam", value: "male", icon: "👨" },
        { label: "Nữ", value: "female", icon: "👩" },
        { label: "Khác", value: "other", icon: "🌈" },
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

    return (
        <div className="user-info-edit-overlay">
            <div className="user-info-edit-container">
                {/* Header */}
                <div className="user-info-edit-header-form">
                    <div className="user-info-edit-header">
                        <h2>Thông Tin Cơ Bản</h2>
                        <button className="user-info-edit-close-btn" onClick={() => { handleCloseBasicInfoEdit(); onClose(); }}>
                            &times;
                        </button>
                    </div>
                </div>

                {/* Nội dung Form */}
                <form className="user-info-edit-form">
                    <div className='user-info-edit-basic-info'>
                        <div className="user-info-avatar"></div>
                        <div className='user-info-edit-right'>
                            <UploadCV />
                            <div className="user-info-edit-row" style={{ margin: "16px 0px 16px;" }} >
                                <label htmlFor="lastName" className="user-info-edit-label">
                                    Họ và tên <span className="user-info-edit-required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="user-info-edit-input"
                                    placeholder="Nhập họ"
                                />
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
                    <button className="user-info-edit-cancel-btn" type="button" onClick={() => { handleCloseBasicInfoEdit(); onClose(); }}>
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ApplyJob;
