function NavToggle() {
    return ( 
        <div className="nav__toggle" id="nav-toggle" onClick={()=>{
            
            const toggle = document.getElementById("nav-toggle"),nav = document.getElementById("nav-menu")

            toggle.addEventListener('click', () =>{
                // Add show-menu class to nav menu
                nav.classList.toggle('show-menu')
    
                // Add show-icon to show and hide the menu icon
                toggle.classList.toggle('show-icon')
            })
        }}>
            <i className="ri-menu-line nav__burger"></i>
            <i className="ri-close-line nav__close"></i>
        </div>
    );
}

export default NavToggle;