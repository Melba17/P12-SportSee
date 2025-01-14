import PropTypes from "prop-types";

/**
 * Composant Hello
 * Affiche un message d'encouragement adapté à l'utilisateur.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.userInfos - Données utilisateur, incluant le prénom.
 * @returns {JSX.Element} Composant d'accueil perso ou redirection 404.
 */
function Hello({ userInfos }) {
  return (
    <div className="hello">
      <h1>
        Bonjour <span className="name">{userInfos.firstName}</span>
      </h1>
      <p>
        {userInfos.firstName === "Karl"
          ? "Félicitation ! Vous avez explosé vos objectifs hier 👏"
          : "Courage ! Vous êtes sur la bonne voie 💪"}
      </p>
    </div>
  );
}


Hello.propTypes = {
    userInfos: PropTypes.shape({
    firstName: PropTypes.string, // Valide uniquement le prénom
  }).isRequired,
};

export default Hello;
