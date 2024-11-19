import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/UI/NavBar";
import HomePage from "./components/pages/home-main/HomePage";
import BestJobBoard from "./components/pages/job/BestJobBoard";
import FindJobBoard from "./components/pages/job/FindJobBoard";
import JobRecommendation from "./components/pages/job/JobRecommendation";
import JobDetail from "./components/pages/job/JobDetail";
import Footer from "./components/UI/Footer";
import TopCompany from "./components/pages/company/TopCompany";
import CompanyDetail from "./components/pages/company/CompanyDetail";
import SignIn from "./components/pages/authentication/SignIn";
import SignUp from "./components/pages/authentication/SignUp";
import SearchJob from "./components/pages/job/SearchJob"
import BlogHome from "./components/pages/blog/BlogHome";
import RecruiterDashboard from "./components/pages/recruiter/RecruiterDashboard";
import ApplicantDashboard from "./components/pages/applicant/ApplicantDashboard";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import JobSaved from "./components/pages/job/JobSaved";
import RecruiterSignIn from "./components/pages/authentication/RecruiterSignIn";

function Layout() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/sign-in" || location.pathname === "/sign-up" || location.pathname === "/recruiter-sign-in";

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/applicant-page" element={<HomePage />} />
        <Route exact path="/jobs/bestjobs" element={<BestJobBoard />} />
        <Route exact path="/jobs/findjobs" element={<FindJobBoard />} />
        <Route exact path="/jobs/job-recommendation" element={<JobRecommendation />} />
        <Route exact path="/jobs/job-saved" element={<JobSaved />} />
        <Route exact path="/jobs/jobdetail/:id" element={<JobDetail />} />
        <Route exact path="/companies" element={<TopCompany />} />
        <Route exact path="/companies/companydetail/:companyId" element={<CompanyDetail />} />
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/search-job" element={<SearchJob />} />
        <Route exact path="/blog-home" element={<BlogHome />} />
        <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
        <Route exact path="/recruiter-page" element={<RecruiterDashboard />} />
        <Route exact path="/applicant-dashboard" element={<ApplicantDashboard />} />
        <Route exact path="/recruiter-sign-in" element={<RecruiterSignIn />} />

      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
