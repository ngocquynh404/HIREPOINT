import '../../../styles/signin.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiList from '../../../libs/apiList'
import { login } from '../../../libs/isAuth';

export default function SignUp() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(true); // Đặt mặc định là true để Sign Up hiển thị trước
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleOverlayClick = () => {
        setIsRightPanelActive(!isRightPanelActive);
    };

    const handleSignInClick = () => {
        navigate('/sign-in'); // Chuyển hướng đến trang sign-in
    };

    const handleSignUpClick = () => {
        navigate('/sign-up'); // Chuyển hướng đến trang sign-in
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Kiểm tra nếu mật khẩu và xác nhận mật khẩu khớp
        if (form.password !== form.confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: form.username,
                    password: form.password,
                    email: form.email,
                    role: 'applicant',
                    phone: '',
                    avatar: null
                }),
            });
    
            const data = await response.json();
            navigate("/sign-in");
            // Nếu response có lỗi, hiển thị lỗi
            if (!response.ok) {
                alert(data.message || "Đăng ký thất bại!");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi khi đăng ký:", error);
            alert("Đăng ký thất bại!");
        }
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
            <div className={`auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
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
                            <input className="infield-input" type="text" name="username" placeholder="Name" value={form.username}
                        onChange={handleChange}
                        required/>
                            <label className="infield-label"></label>
                        </div>
                        <div className="infield">
                            <input className="infield-input" type="email" placeholder="Email" name="email" value={form.email}
                        onChange={handleChange}
                        required/>
                            <label className="infield-label"></label>
                        </div>
                        <div className="infield">
                            <input className="infield-input" name="password" type="password" placeholder="Password" value={form.password}
                        onChange={handleChange}
                        required/>
                            <label className="infield-label"></label>
                        </div>
                        <div className="infield">
                            <input className="infield-input" type="password" name="confirmPassword" placeholder="Comfirm Password" value={form.confirmPassword}
                        onChange={handleChange}
                        required />
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Cập nhật state
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Cập nhật state
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
                    <button id="overlayBtn" onClick={handleOverlayClick} className="btnScaled"></button>
                </div>
            </div>
        </div>
    );
}
