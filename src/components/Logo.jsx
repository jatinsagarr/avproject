import logo from '../assets/logo.svg';
function Logo({siteName}) {
    return (
        <>
            <div className="nav__logo">
                {/* <i className="ri-planet-line"></i>  */}
                <img src={logo} width={"30%"} height={"30%"}></img>
                <p>{siteName}</p>
            </div>
        </>
    );
}

export default Logo;