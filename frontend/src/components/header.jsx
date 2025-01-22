/**
 * Composant Header
 * Affiche l'en-tête de l'application avec un logo et un menu de navigation.
 *
 * @returns {JSX.Element} L'en-tête avec le logo et les liens de navigation.
 */
function Header() {
    return (
        <header className="header">
            <img src="/logo.svg" alt="logo SportSee"/>
            <nav>
                <div>Accueil</div>
                <div>Profil</div>
                <div>Réglage</div>
                <div>Communauté</div>
            </nav>
        </header>
    )
}

export default Header;