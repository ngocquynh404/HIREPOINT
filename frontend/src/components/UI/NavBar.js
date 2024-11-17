import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import Blog from "../pages/blog/Blog";
import Jobs from "../pages/job/Job";
import DropNavBar from "./DropNavBar";
import DropNavBarCenter from "./DropNavBarCenter";
import ApplicantNavBar from "../../components/pages/applicant/ApplicantNavBar"
import { isAuth, userType } from "../../libs/isAuth";
import '../../styles/navbar.css';

export default function Navbar() {
  const linkUrl = useLocation();

  return (
    <Disclosure as="nav" className="navbar blog-navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link className="logo" to="/">
            <img className="logo-image" src={logo} alt="logo" />
            <h1 className="logo-title">HirePoint</h1>
          </Link>
        </div>

        {isAuth() ? (
          <>
            <div className="nav-links">
              {linkUrl.pathname.startsWith("/blog-home") ? (
                <>
                  <Link className="nav-link" to="/">Home</Link>
                  <Link className="nav-link" to="/">Messages</Link>
                  <Link className="nav-link" to="/">Notifications</Link>
                </>
              ) : (
                <>
                  <Link className="nav-link" to="/howitworks">How it works</Link>
                  <Jobs className="nav-link">Jobs</Jobs>
                  <Link className="nav-link" to="/companies">Companies</Link>
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                  <Blog className="nav-link" to="/blog-home">Blog</Blog>
                </>
              )}
            </div>

            <Disclosure.Button className="hamburger-center">
              <DropNavBarCenter></DropNavBarCenter>
            </Disclosure.Button>

            {/* Mobile menu button (hamburger icon) */}
            <Disclosure.Button className="hamburger">
              <DropNavBar></DropNavBar>
            </Disclosure.Button>
            <ApplicantNavBar />
          </>
        ) : (
          <>
            {/* Desktop nav links */}
            <div className="nav-links">
              {linkUrl.pathname.startsWith("/blog-home") ? (
                <>
                  <Link className="nav-link" to="/">Home</Link>
                  <Link className="nav-link" to="/">Messages</Link>
                  <Link className="nav-link" to="/">Notifications</Link>
                </>
              ) : (
                <>
                  <Link className="nav-link" to="/howitworks">How it works</Link>
                  <Jobs className="nav-link">Jobs</Jobs>
                  <Link className="nav-link" to="/companies">Companies</Link>
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                  <Blog className="nav-link" to="/blog-home">Blog</Blog>
                </>
              )}
            </div>

            <Disclosure.Button className="hamburger-center">
              <DropNavBarCenter></DropNavBarCenter>
            </Disclosure.Button>

            {/* Sign-in / Sign-up links */}
            {!linkUrl.pathname.startsWith("/blog") && (
              <div className="flex">
                <Link className="sign-in-link" to="/sign-in">Sign in</Link>
                <Link className="sign-up-button" to="/sign-up">Sign up</Link>
              </div>
            )}

            {/* Mobile menu button (hamburger icon) */}
            <Disclosure.Button className="hamburger">
              <DropNavBar></DropNavBar>
            </Disclosure.Button>
          </>
        )}

      </div>
    </Disclosure>
  );
}
