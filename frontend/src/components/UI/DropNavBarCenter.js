import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCode, faNewspaper, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import '../../styles/dropnavbar.css'; 
import Blog from "../pages/blog/Blog";

export default function DropNavBarCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Điều chỉnh độ trễ này nếu cần
  };

  const handlePanelMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handlePanelMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Độ trễ tương tự cho bảng
  };

  return (
    <div>
      <Popover className="popover-nav">
        <>
          <Popover.Button
            className="popover-nav-button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link className="nav-link">
              <span className="span-nav">
                <FontAwesomeIcon icon={faBars} size="lg" />
              </span>
            </Link>
            <FontAwesomeIcon
              className={`popover-nav-icon ${isOpen ? "transform rotate-180-nav" : ""}`}
              icon={faChevronDown}
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            show={isOpen}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={`popover-nav-panel ${isOpen ? "show" : ""}`}
              onMouseEnter={handlePanelMouseEnter}
              onMouseLeave={handlePanelMouseLeave}
            >
              <div className="popover-nav-inner">
                <Link to="/blog/news" className="link-nav">
                  <div className="icon-nav">
                    <FontAwesomeIcon icon={faNewspaper} />
                  </div>
                  <div className="text-nav">
                    <p className="text-md-nav">How it works</p>
                  </div>
                </Link>
                <Link to="/blog/news" className="link-nav">
                  <div className="icon-nav">
                    <FontAwesomeIcon icon={faCode} />
                  </div>
                  <div className="text-nav">
                    <p className="text-md-nav">Jobs</p>
                  </div>
                </Link>
                <Link to="/blog/news" className="link-nav">
                  <div className="icon-nav">
                    <FontAwesomeIcon icon={faCode} />
                  </div>
                  <div className="text-nav">
                    <p className="text-md-nav">Companies</p>
                  </div>
                </Link>
                <Link to="/blog/news" className="link-nav">
                  <div className="icon-nav">
                    <FontAwesomeIcon icon={faCode} />
                  </div>
                  <div className="text-nav">
                    <p className="text-md-nav">Leaderboard</p>
                  </div>
                </Link>
                <Blog to="/blog/news" className="link-nav">
                  <div className="icon-nav">
                    <FontAwesomeIcon icon={faCode} />
                  </div>
                  <div className="text-nav">
                    <p className="text-md-nav">Blog</p>
                  </div>
                </Blog>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      </Popover>
    </div>
  );
}
