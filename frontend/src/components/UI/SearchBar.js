import { Link, useLocation } from "react-router-dom";
import '../../styles/searchbar.css';

function SearchBar() {
    const linkUrl = useLocation();

    return (
        <div className='search-bar-body'>
            {!linkUrl.pathname.startsWith("/jobs/job-recommendation") ? (
                <>
                    <div class="search-bar-container">
                        <input type="text" class="search-input" placeholder="Vị trí tuyển dụng, tên công ty"></input>
                        <div class="location-dropdown">
                            <span class="location-icon">📍</span>
                            <span class="location-text">Tất cả tỉnh/thành phố</span>
                            <span class="dropdown-arrow">▼</span>
                        </div>
                        <Link className="search-button" to="/search-job">
                            <span class="search-icon">🔍</span>
                            Tìm kiếm
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <div className="search-bar-container" style={{ width: '100%' }}>
                        <input type="text" class="search-input" placeholder="Vị trí tuyển dụng, tên công ty"></input>
                        <div class="location-dropdown">
                            <span class="location-icon">📍</span>
                            <span class="location-text">Tất cả tỉnh/thành phố</span>
                            <span class="dropdown-arrow">▼</span>
                        </div>
                        <Link className="search-button" to="/search-job">
                            <span class="search-icon">🔍</span>
                            Tìm kiếm
                        </Link>
                    </div>
                </>
            )}
        </div>

    )
}

export default SearchBar;