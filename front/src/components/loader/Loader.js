const Loader = () => {
    return (
        <div className="preloader preload">
            <div className="preloader-inner">
                <div id="wave1">
                </div>
                <div className="spinner">
                    <div className="dot1"></div>
                    <div className="dot2"></div>
                </div>
            </div>
        </div>
    );
}

export default Loader;