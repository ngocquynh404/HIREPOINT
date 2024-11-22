import '../../../styles/signin.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function RecruiterSignUp() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(true); // Đặt mặc định là true để Sign Up hiển thị trước
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        phone: '',
        company_name: '',
        industry: '',
        location: '',
    });

    const handleOverlayClick = () => {
        setIsRightPanelActive(!isRightPanelActive);
    };

    const handleSignInClick = () => {
        navigate('/recruiter-sign-in'); // Chuyển hướng đến trang sign-in
    };

    const handleSignUpClick = () => {
        navigate('/recruiter-sign-up'); // Chuyển hướng đến trang sign-in
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Form data:", form); // Debug toàn bộ dữ liệu form


        // Kiểm tra nếu mật khẩu và xác nhận mật khẩu khớp
        if (form.password !== form.confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/recruiters/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: form.username,
                    password: form.password,
                    email: form.email,
                    phone: form.phone,
                    first_name: form.first_name,
                    last_name: form.last_name,
                    company_name: form.company_name,
                    industry: form.industry,
                    location: form.location
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Đăng ký thất bại!");
            } else {
                alert(data.message);
                navigate('/recruiter-sign-in');
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi khi đăng ký:", error);
            //            alert("Đăng ký thất bại!");
        }
    };

    // Trạng thái cho ô địa chỉ 1
    const [currentLevel1, setCurrentLevel1] = useState(locations); // Cấp hiện tại
    const [breadcrumbs1, setBreadcrumbs1] = useState([]); // Lưu đường dẫn đã chọn
    const [selectedValue1, setSelectedValue1] = useState(""); // Giá trị đã chọn
    const [isMenuOpen1, setIsMenuOpen1] = useState(false); // Trạng thái mở menu

    // Hàm xử lý cho ô địa chỉ 1
    const handleSelect1 = (key) => {
        if (typeof currentLevel1[key] === "object") {
            setBreadcrumbs1([...breadcrumbs1, key]); // Cập nhật breadcrumbs
            setCurrentLevel1(currentLevel1[key]); // Chuyển xuống cấp tiếp theo
        } else {
            const locationValue = [...breadcrumbs1, key].join(", "); // Tính giá trị cuối cùng
            setSelectedValue1(locationValue); // Hiển thị giá trị đã chọn trong dropdown
            setIsMenuOpen1(false); // Đóng menu

            // Cập nhật giá trị location vào form
            setForm((prevForm) => ({
                ...prevForm,
                location: locationValue, // Lưu vào form
            }));
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };


    return (
        <div className='auth-body'>
            <div className={`auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container" style={{ height: "900px" }}>
                <div className="auth-form-container sign-up-container">
                    <form className='auth-form' action="#">
                        <h1 className='auth-form-header'>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span className='auth-form-span'>or use your email for registration</span>
                        <div className="infield">
                            <input className="infield-input" type="text" name='username' value={form.username} placeholder="Username"
                                onChange={handleChange}
                                required />
                            <label className="infield-label"></label>
                        </div>
                        <div className="infield">
                            <input className="infield-input" type="email" name='email' value={form.email} placeholder="Email"
                                onChange={handleChange}
                                required />
                            <label className="infield-label"></label>
                        </div>
                        <div className="infield">
                            <input className="infield-input" type="password" name='password' value={form.password} placeholder="Password"
                                onChange={handleChange}
                                required />
                            <label className="infield-label"></label>
                        </div>
                        <div className="infield">
                            <input className="infield-input" type="password" name='confirmPassword' value={form.confirmPassword} placeholder="Confirm Password"
                                onChange={handleChange}
                                required />
                            <label className="infield-label"></label>
                        </div>
                        <div className="infield">
                            <input className="infield-input" type="text" name='first_name' value={form.first_name} placeholder="First Name"
                                onChange={handleChange}
                                required />
                            <label className="infield-label"></label>
                        </div>
                        <div className="infield">
                            <input className="infield-input" type="text" name='last_name' value={form.last_name} placeholder="Last Name"
                                onChange={handleChange}
                                required />
                            <label className="infield-label"></label>
                        </div>
                        <div className="infield">
                            <input className="infield-input" type="text" name='phone' value={form.phone} placeholder="Phone Number"
                                onChange={handleChange}
                                required />
                            <label className="infield-label"></label>
                        </div>
                        <div className="infield">
                            <input className="infield-input" type="text" name='company_name' value={form.company_name} placeholder="Company Name"
                                onChange={handleChange}
                                required />
                            <label className="infield-label"></label>
                        </div>
                        <div className="infield">
                            <input className="infield-input" type="text" name='industry' value={form.industry} placeholder="Major"
                                onChange={handleChange}
                                required />
                            <label className="infield-label"></label>
                        </div>
                        <div className="infield">
                            <div className="infield-select-input" onClick={toggleMenu1}>
                                {selectedValue1 || "Location"}
                            </div>
                            {isMenuOpen1 && (
                                <div className="infield-select-input">
                                    <div className="infield-input-edit-breadcrumbs">
                                        {breadcrumbs1.length > 0 && (
                                            <button onClick={handleBack1}>&lt;</button>
                                        )}
                                        <span>{breadcrumbs1.join(", ") || "Location"}</span>
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
                            <label className="infield-label"></label>
                        </div>
                        <button onClick={handleSubmit} className='auth-button'>Sign Up</button>
                    </form>
                </div>
                <div className="auth-form-container sign-in-container">
                    <form className='auth-form' action="#">
                        <h1 className='auth-form-header'>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span className='auth-form-span'>or use your account</span>
                        <div className="infield">
                            <input
                                className="infield-input"
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={form.email}
                                required
                            />
                            <label className="infield-label"></label>
                        </div>
                        <div className="infield">
                            <input
                                className="infield-input"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={form.password}
                                required
                            />
                            <label className="infield-label"></label>
                        </div>
                        <a href="#" className="forgot">Forgot your password?</a>
                        <button className='auth-button' type='button' onClick={handleSubmit}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container" id="overlayCon">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className='overlay-panel-header'>Welcome back!</h1>
                            <p className='overlay-panel-p'>To keep connected with us please login with your personal info</p>
                            <button
                                className='overlay-panel-button'
                                onClick={() => { handleOverlayClick(); handleSignInClick(); }} >
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className='overlay-panel-header'>Hello, Friend!</h1>
                            <p className='overlay-panel-p'>Enter your personal details and start your journey with us</p>
                            <button
                                className='overlay-panel-button'
                                onClick={() => { handleOverlayClick(); handleSignUpClick(); }} >
                                Sign Up
                            </button>
                        </div>
                    </div>
                    <button id="overlayBtn" style={{ top: "502px" }} onClick={handleOverlayClick} className="btnScaled"></button>
                </div>
            </div>
        </div>
    );
}
