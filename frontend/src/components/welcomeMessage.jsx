import PropTypes from "prop-types";

/**
 * Composant WelcomeMessage
 * 
 * Affiche un message de bienvenue et propose à l'utilisateur de choisir un ID.
 * 
 * @param {Function} handleUserSelection - Fonction permettant de sélectionner un utilisateur.
 * @returns {JSX.Element} Composant affichant un message d'accueil avec des boutons de sélection d'utilisateur.
 */
function WelcomeMessage({ handleUserSelection }) {
    return (
        <div className="welcome-message">
            <h2>Bienvenue sur le tableau de bord</h2>
            <p>Veuillez choisir un utilisateur :</p>
            <div className="user-selection">
                <button className="user-link" onClick={() => handleUserSelection(12)}>Utilisateur 12</button>
                <button className="user-link" onClick={() => handleUserSelection(18)}>Utilisateur 18</button>
            </div>
        </div>
    );
}

WelcomeMessage.propTypes = {
    handleUserSelection: PropTypes.func.isRequired,
};

export default WelcomeMessage;
