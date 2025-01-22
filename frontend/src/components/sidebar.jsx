/**
 * Composant SideBar
 * Affiche une barre latérale contenant des icônes d'activités sportives et un message de copyright.
 *
 * @returns {JSX.Element} La barre latérale avec les icônes et le texte de copyright.
 */
function SideBar() {
    return (
        <div className="sidebar">
          <div className="icons"> 
            <img src="/sideBarIcons/yoga.svg" alt="icone yoga" />
            <img src="/sideBarIcons/swimming.svg" alt="icone natation" />
            <img src="/sideBarIcons/bike.svg" alt="icone cyclisme" />
            <img src="/sideBarIcons/weight.svg" alt="icone haltère" />
          </div>
          <p>Copyright, SportSee 2025</p>
        </div>
    )
}

export default SideBar;