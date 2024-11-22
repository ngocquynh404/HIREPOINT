import React, { useState, useRef, useEffect } from "react";
import '../../../styles/profile.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap, FaEdit, FaMedal, FaUniversity, FaBook, FaAward, FaBriefcase, FaCalendarAlt, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import UploadCV from './UploadCV';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { getId } from '../../../libs/isAuth';


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

  const idnd = getId();


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
    /*setProfile((prevProfile) => ({
      ...prevProfile,
      desired_work_location: location, 
    }));*/
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
    setIsDropdownOpen(false);
    setSelectedNationality(country); // Cập nhật quốc gia đã chọn
    setProfile((prevProfile) => ({
      ...prevProfile,
      location: country.name, // Lưu quốc gia vào profile
    }));
    setDropdownVisible(false);
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
    setProfile((prevProfile) => ({
      ...prevProfile,
      gender: selectedGender, // Cập nhật giá trị gender
    }));
  };

  const [selectedNationality, setSelectedNationality] = useState(null); // Quốc tịch được chọn
  const [dropdownVisible, setDropdownVisible] = useState(false); // Trạng thái mở/đóng dropdown
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm

  // Lọc danh sách quốc gia theo từ khóa
  const filteredCountries = countryList.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    phone: '',
    nationality: '',
    date_of_birth: '',
    location: '',
    specific_address: '',
    job_title: '',
    job_level: '',
    current_industry: '',
    current_field: '',
    years_of_experience: '',
    current_salary: '',
    desired_work_location: '',
    desired_salary: '',
    education: '',
    experience: [],
    skills: [],
    cv_files: []
  });

  const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading
  const [error, setError] = useState(null); // State để lưu lỗi (nếu có)
  const [user, setUser] = useState(null);


  const handleSave = async () => {
    try {
      const idnd = getId(); // Lấy user ID từ hàm getId
      const data = { ...profile, user_id: idnd }; // Gắn user ID vào profile
      const response = await axios.post('http://localhost:5000/api/profiles/profile', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Gửi token xác thực
        },
      });

      console.log('data', data);

      // Kiểm tra phản hồi từ server
      if (response.data.success) {
        alert('Profile saved successfully!');
      } else {
        alert(`Failed to save profile: ${response.data.message}`);
      }
    } catch (error) {
      if (error.response) {
        // Lỗi từ server
        console.error('Error response from server:', error.response.data);
        alert(`An error occurred: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // Không có phản hồi từ server
        console.error('Error request:', error.request);
        alert('No response from server. Please check your connection or server status.');
      } else {
        // Lỗi khác
        console.error('Error message:', error.message);
        alert(`An error occurred: ${error.message}`);
      }
    }
  };
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
  const [academic, setAcademic] = useState({
    user_id: '',
    industry: '',
    school_name: '',
    degree: '',
    start_date: '',
    end_date: '',
    achievements: '', // Đây là trường sẽ nhập thành tựu từ Editor
  });
  const handleInputChangeAcademic = (e) => {
    const { name, value } = e.target;
    setAcademic({ ...academic, [name]: value });
  };
  /*const getAchievementsText = () => {
    const currentContent = editorState.getCurrentContent();
    return draftToHtml(convertToRaw(currentContent)); // Chuyển đổi EditorState thành HTML
  };
  */
  const handleSaveAcademic = async () => {
    try {
      const userId = getId(); // Lấy user ID từ hàm getId
      const data = { ...academic, user_id: userId }; // Gắn user ID vào academic data

      const response = await axios.post('http://localhost:5000/api/academic/add', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Gửi token xác thực
        },
      });

      // Log phản hồi để kiểm tra
      console.log('Server response:', response.data);

      if (response.data.success) {
        alert('Thông tin học vấn đã được lưu!');
      } else {
        // Nếu success là false, hiển thị thông báo lỗi
        alert(`Lỗi khi lưu thông tin học vấn: ${response.data.message || 'Lỗi không xác định'}`);
      }
    } catch (error) {
      // Xử lý lỗi từ phía server
      if (error.response) {
        console.error('Error response from server:', error.response.data);
        alert(`Có lỗi xảy ra: ${error.response.data.message || 'Lỗi không xác định'}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('Không có phản hồi từ server. Vui lòng kiểm tra kết nối hoặc trạng thái server.');
      } else {
        // Lỗi khác
        console.error('Error message:', error.message);
        alert(`Có lỗi xảy ra: ${error.message}`);
      }
    }
  };



  ///////////////////////////////END FORM THÔNG TIN HỌC VẤN////////////////////////



  ///////////////////////////////FORM MỤC TIÊU NGHỀ NGHIỆP////////////////////////
  //const [isEditJobGoalOpen, setIsEditJobGoalOpen] = useState(false);

  // Hàm mở form
  //const handleJobGoalClick = () => {
  //   setIsEditJobGoalOpen(true);
  // };

  // Hàm đóng form và reset trạng thái
  // const handleCloseJobGoalEdit = () => {
  //   setIsEditJobGoalOpen(false);
  //   setEditorState(EditorState.createEmpty()); // Reset nội dung editor
  // };


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
  const [academicData, setAcademicData] = useState([]);

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

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Cập nhật ngày sinh trong profile
    setProfile({ ...profile, date_of_birth: date.toISOString() }); // Lưu ngày sinh dưới dạng ISO
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
  const [experienceList, setExperienceList] = useState([]); // Danh sách kinh nghiệm
  const [formDataexperience, setFormDataexperience] = useState({
    position: "",
    company: "",
    describe: "",
    startMonth: "",
    endMonth: "",
  });

  const [isEditExpOpenxperience, setIsEditExpOpenxperience] = useState(false); // Trạng thái mở form
  const [isCurrentJob, setIsCurrentJob] = useState(false);
  const handleAddExperience = () => {
    setIsEditExpOpen(true);
    setFormData({
      position: "",
      company: "",
      describe: "",
      startMonth: "",
      endMonth: "",
    });
    setIsCurrentJob(false); // Reset checkbox
  };
  const handleSaveExperience = async () => {
    try {
      const userId = getId(); // Lấy ID người dùng
      const data = { ...formDataexperience, userId };

      const response = await axios.post('http://localhost:5000/api/experience/add', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        alert('Kinh nghiệm làm việc đã được lưu!');
        fetchExperiences(); // Tải lại danh sách kinh nghiệm sau khi lưu
        handleCloseExperienceForm();
        
      } else {
        alert(`Thông báo : ${response.data.message || "Không xác định"}`);
      }
    } catch (error) {
      console.error(error);
      alert('Lỗi khi lưu kinh nghiệm. Vui lòng thử lại.');
    }
  };


  const handleCloseExperienceForm = () => {
    setIsEditExpOpen(false);
  };
  const handleInputChangeExperience = (e) => {
    const { name, value } = e.target;
    setFormDataexperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setFormDataexperience((prev) => ({
      ...prev,
      endMonth: !isChecked ? null : "",
    }));
  };

  ///////////////////////////////END FORM KINH NGHIỆM////////////////////////

  const fetchExperiences = async () => {
    try {
      const userId = getId();
      const response = await axios.get(`http://localhost:5000/api/experience/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setExperienceList(response.data.experiences || []);
    } catch (error) {
      console.log('chưa có king nghiệm nào!')
    }
  }
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profiles/${idnd}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Gửi token xác thực
          },
        });
        setProfile(response.data); // Gán dữ liệu profile vào state
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false); // Dừng trạng thái loading
      }
    };
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

    const fetchAcademicData = async () => {
      try {
        const userId = getId(); // Lấy userId từ frontend
        if (!userId) {
          throw new Error('User ID không tồn tại');
        }

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token không hợp lệ hoặc đã hết hạn');
        }

        const response = await axios.get(`http://localhost:5000/api/academic/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Token xác thực
          },
        });

        if (response.data.length === 0) {
          throw new Error('Không có thông tin học vấn cho người dùng này');
        }

        setAcademicData(response.data); // Lưu dữ liệu học vấn vào state
      } catch (err) {
        setError(err.message); // Ghi nhận lỗi nếu có
        console.error('Error fetching academic data:', err);
      } finally {
        setLoading(false); // Xong, không còn loading nữa
      }
    };
    const fetchSkills = async () => {
      try {
        const userId = getId();  
        const response = await axios.get(`http://localhost:5000/api/profiles/skills/${userId}`);
        setSkills(response.data.skills);  
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchExperiences();
    fetchProfile();
    fetchAcademicData();
    fetchUserProfile()
    fetchSkills();
  }, [idnd]);
  // form ky năng
  const [skills, setSkills] = useState([]);  // Lưu trữ danh sách kỹ năng
  const [skilluer, setSkillUser] = useState('');  // Lưu trữ giá trị nhập vào

  const handleSkillChange = (e) => {
    setSkillUser(e.target.value);  // Cập nhật giá trị nhập vào vào state skilluer
  };

  const handleSubmitSkill = async (e) => {
    e.preventDefault();
    console.log('Lưu kỹ năng đã được nhấn');

    const userId = getId();  // Lấy userId từ session hoặc context

    if (skilluer && !skills.includes(skilluer)) {
      const newSkills = [...skills, skilluer];  // Thêm kỹ năng mới vào danh sách
      setSkills(newSkills);  // Cập nhật state kỹ năng

      try {
        // Gửi yêu cầu API để cập nhật kỹ năng vào profile người dùng
        await axios.put('http://localhost:5000/api/profiles/update-skills', {
          userId: userId,
          skills: newSkills,
        });
        window.location.reload();
        // Reset giá trị skilluer sau khi lưu thành công
        setSkillUser('');
      } catch (error) {
        console.error("Error updating skills:", error);
      }
    } else {
      console.log("Kỹ năng trống hoặc đã có trong danh sách");
    }
  };

  return (
    <div className='my-profile'>
      {/* Form thông tin cơ bản *********************************************/}
      <div className="user-info-card">

        <button className="user-info-edit-btn" onClick={handleEditBasicInfoClick}>
          <FaEdit />
        </button>
        {profile && (
          <>
            <div className='user-info-name-position'>
              <div className="user-info-avatar">{<img src={user?.avatar} alt="Avatar" />}</div>

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
                      <span>Nơi làm việc: {profile.specific_address || 'No Desired Location'}</span>
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

          </>
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
                          name="first_name"
                          className="user-info-edit-input"
                          placeholder="Nhập họ"
                          value={profile.first_name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="user-info-edit-row">
                        <label htmlFor="firstName" className="user-info-edit-label">
                          Tên <span className="user-info-edit-required">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="last_name"
                          className="user-info-edit-input"
                          placeholder="Nhập tên"
                          value={profile.last_name}
                          onChange={handleInputChange}
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
                              className={`gender-option  ${profile.gender === option.value ? "selected" : ""}
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
                          name="email"
                          className="user-info-edit-input"
                          placeholder="Nhập email"
                          value={profile.email}
                          onChange={handleInputChange}
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
                            value={profile.phone}
                            name="phone"
                            onChange={handleInputChange}
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
                          {selectedNationality || profile.location ? (
                            <div className="selected-country">
                              <span className="country-flag">
                                {selectedNationality ? selectedNationality.flag : countryList.find(country => country.name === profile.location)?.flag}
                              </span>
                              <span className="country-name">
                                {selectedNationality ? selectedNationality.name : profile.location}
                              </span>
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
                    <label htmlFor="date_of_birth" className="user-info-edit-label">
                      Ngày sinh <span className="user-info-edit-required">*</span>
                    </label>

                    {/* Ô nhập ngày sinh */}
                    <div
                      className="date-picker-input"
                      name="date_of_birth"
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    >
                      {selectedDate || (profile.date_of_birth && !isNaN(new Date(profile.date_of_birth).getTime()))
                        ? new Date(profile.date_of_birth).toLocaleDateString()
                        : "Chọn ngày sinh"}
                    </div>

                    {/* Lịch chọn ngày */}
                    {isCalendarOpen && (
                      <div className="calendar-dropdown">
                        <div className="calendar-header">
                          <button onClick={() => changeMonth(-1)}>&lt;</button>
                          <span>
                            {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
                          </span>
                          <button onClick={() => changeMonth(1)}>&gt;</button>
                        </div>

                        <div className="calendar-grid">
                          {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                            <div key={day} className="calendar-day-name">
                              {day}
                            </div>
                          ))}
                          {getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear()).map((date) => (
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
                    name="specific_address"
                    className="user-info-edit-input"
                    placeholder="Nhập địa chỉ cụ thể"
                    value={profile.specific_address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="user-info-edit-row">
                  <label htmlFor="title" className="user-info-edit-label">
                    Chức danh <span className="user-info-edit-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="job_title"
                    name="job_title"
                    className="user-info-edit-input"
                    placeholder="Nhập chức danh"
                    value={profile.job_title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="user-info-edit-row">
                  <label htmlFor="level" className="user-info-edit-label">
                    Cấp bậc hiện tại <span className="user-info-edit-required">*</span>
                  </label>
                  <select id="level"
                    name="job_level"
                    value={profile.job_level || ''}
                    onChange={handleInputChange}
                    className="user-info-edit-select">
                    <option >Chọn cấp bậc</option>
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
                    <select id="industry"
                      name="current_industry"
                      value={profile.current_industry || ''}
                      onChange={handleInputChange}
                      className="user-info-edit-select">
                      <option >Chọn ngành nghề</option>
                      <option value="IT">IT</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Giáo dục">Giáo dục</option>
                    </select>
                  </div>
                  <div className="user-info-edit-row">
                    <label htmlFor="field" className="user-info-edit-label">
                      Lĩnh vực hiện tại <span className="user-info-edit-required">*</span>
                    </label>
                    <select id="field"
                      value={profile.current_field || ''}
                      name="current_field"
                      onChange={handleInputChange}
                      className="user-info-edit-select">
                      <option >Chọn lĩnh vực công ty</option>
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
                        name="years_of_experience"
                        className="user-info-edit-inputt"
                        placeholder="Nhập số năm kinh nghiệm"
                        value={profile.years_of_experience}
                        onChange={handleInputChange}
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
                        id="current_salary"
                        name="current_salary"
                        className="user-info-edit-inputt"
                        placeholder=""
                        value={profile.current_salary}
                        onChange={handleInputChange}
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
                          {/*<span>{breadcrumbs2.join(" / ") || "Chọn địa điểm"}</span>*/}
                          <span>{profile.desired_work_location || "Chọn địa điểm"}</span>
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
                        id="desired_salary"
                        name="desired_salary"
                        className="user-info-edit-inputt"
                        placeholder=""
                        value={profile.desired_salary}
                        onChange={handleInputChange}
                      />
                      <span className="user-info-edit-unit">USD/tháng</span>
                    </div>
                  </div>
                </div>

              </form>

              {/* Footer (Save/Cancel) */}
              <div className="user-info-edit-button-row">
                <button onClick={handleSave} className="user-info-edit-save-btn" type="submit">
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
          {academicData.length > 0 ? (
            academicData.map((academic, academic_id) => (
              <div key={academic_id} className='edu-info'>
                <div className="edu-card-header">
                  <h3 className="user-basic-info-header">Thông tin học vấn</h3>
                  <h3 className="edu-title">{academic?.school_name}</h3>
                  <p className="edu-subtitle">{academic?.industry}</p>
                </div>
                <div className="edu-card-body">
                  <ul className="edu-achievements">
                    <li>
                      <FaMedal className="edu-icon" />
                      <span>{academic?.start_date} - {academic?.end_date}</span>
                    </li>
                    <li>
                      <FaBook className="edu-icon" />
                      <span>{academic?.achievements}</span>
                    </li>
                    {/*
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
                */}
                  </ul>

                </div>
              </div>
            ))
          ) : (
            <p>Không có thông tin học vấn.</p>
          )}
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
                    id="industry"
                    name="industry"
                    value={academic.industry}
                    onChange={handleInputChangeAcademic}
                    className="user-info-edit-input"
                    placeholder="Nhập chuyên ngành"
                  />
                </div>
                <div className="user-info-edit-col">
                  <div className="user-info-edit-row">
                    <label htmlFor="school" className="user-info-edit-label">
                      Trường <span className="user-info-edit-required">*</span>
                    </label>
                    <input
                      type="text"
                      id="school_name"
                      name="school_name"
                      className="user-info-edit-input"
                      placeholder="Nhập trường"
                      value={academic.school_name}
                      onChange={handleInputChangeAcademic}
                    />
                  </div>
                  <div className="user-info-edit-row">
                    <label htmlFor="degree" className="user-info-edit-label">
                      Bằng cấp <span className="user-info-edit-required">*</span>
                    </label>
                    <select
                      id="degree"
                      className="user-info-edit-select"
                      name="degree"
                      value={academic.degree}
                      onChange={handleInputChangeAcademic}
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
                        name="start_date"
                        value={academic.start_date}
                        onChange={handleInputChangeAcademic}
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
                        name="end_date"
                        value={academic.end_date}
                        onChange={handleInputChangeAcademic}
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
                      <textarea
                        className="company-profile-des-textarea"
                        placeholder="Nhập..."
                        name="achievements"
                        value={academic.achievements}
                        onChange={handleInputChangeAcademic}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
              {/* Footer (Save/Cancel) */}
              <div className="user-info-edit-button-row">
                <button onClick={handleSaveAcademic} className="user-info-edit-save-btn" type="submit">
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
      {/*<div className="user-info-card">
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
      {/*{isEditJobGoalOpen && (
        <>
          <div className="user-info-edit-overlay">
            <div className="user-info-edit-container">
               Header */}
      {/*<div className="user-info-edit-header-form">
                <div className="user-info-edit-header">
                  <h2>Mục tiêu nghề nghiệp</h2>
                  <button className="user-info-edit-close-btn" onClick={handleCloseJobGoalEdit}>
                    &times;
                  </button>
                </div>
              </div>

              Nội dung Form */}
      {/*<form className="user-info-edit-form" onSubmit={(e) => e.preventDefault()}>
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

               Footer */}
      {/*<div className="user-info-edit-button-row">
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
        {experienceList.length > 0 ? (
          experienceList.map((exp) => (
            <div key={exp._id} className="user-info-3">

              <h3 className='user-basic-info-header'>Kinh nghiệm làm việc</h3>
              {/* Tiêu đề công việc và công ty */}
              <div className="card-header">
                <div>
                  <h3 className="card-title">{exp.position}</h3>
                  <p className="card-company"><FaBuilding className="company-icon" /> {exp.company}</p>
                </div>
              </div>

              {/* Thời gian làm việc */}
              <div className="card-period">
                <FaCalendarAlt className="calendar-icon" />
                <span className="card-company">Từ Tháng {exp.startMonth} đến Tháng {exp.endMonth}</span>
              </div>

              {/* Mô tả công việc */}
              <div className="card-description wrap-text">
                {exp.describe}
              </div>
            </div>
          ))
        ) : (
          <p>Chưa có kinh nghiệm làm việc nào.</p>
        )}
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
                      name="position"
                      className="user-info-edit-input"
                      placeholder="Nhập chức danh"
                      value={formDataexperience.position}
                      onChange={handleInputChangeExperience}
                    />
                  </div>
                  <div className="user-info-edit-row">
                    <label htmlFor="company" className="user-info-edit-label">
                      Công ty <span className="user-info-edit-required">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="user-info-edit-input"
                      placeholder="Nhập công ty"
                      value={formDataexperience.company}
                      onChange={handleInputChangeExperience}
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
                        name="startMonth"
                        className="form-input"
                        placeholder="MM/YYYY"
                        value={formDataexperience.startMonth}
                        onChange={handleInputChangeExperience}
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
                        name="endMonth"
                        id="endMonth"
                        className="form-input"
                        placeholder="MM/YYYY"
                        value={formDataexperience.endMonth}
                        onChange={handleInputChangeExperience}
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
                      onChange={handleCheckboxChange}
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
                    <div id="achievement" className="form-textarea">
                      <textarea
                        name="describe"
                        className="company-profile-des-textarea"
                        placeholder="Nhập mô tả..."
                        value={formDataexperience.describe}
                        onChange={handleInputChangeExperience}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
              {/* Footer */}
              <div className="user-info-edit-button-row">
                <button onClick={handleSaveExperience} className="user-info-edit-save-btn" type="submit">
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
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <li key={index} className="skill-item">
                  <FaCheckCircle className="skill-icon" />
                  {skill}
                </li>
              ))
            ) : (
              <li>Không có kỹ năng nào được thêm vào.</li>
            )}
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
                      id="skilluer"
                      name="skilluer"
                      className="user-info-edit-input"
                      placeholder="Nhập kỹ năng"
                      value={skilluer}  // Dùng state skilluer để điều khiển giá trị nhập vào
                      onChange={handleSkillChange}  // Cập nhật giá trị khi người dùng gõ
                    />
                    {/*<button className="user-info-edit-save-btn" type="submit">
                      Thêm
                    </button>*/}
                  </div>
                </div>

                {/* Hiển thị danh sách kỹ năng đã thêm */}
                {skills.length > 0 && (
                  <div className="skills-list-add">
                    <h3>Kỹ năng đã thêm:</h3>
                    <ul>
                      {skills.map((item, index) => (
                        <li key={index}>{item}</li>  // Hiển thị từng kỹ năng trong danh sách
                      ))}
                    </ul>
                  </div>
                )}
              </form>

              {/* Footer (Save/Cancel) */}
              <div className="user-info-edit-button-row">
                <button onClick={handleSubmitSkill} className="user-info-edit-save-btn" type="submit">
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

