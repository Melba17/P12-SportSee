import { useNavigate } from 'react-router-dom';

/**
 * Composant Error404
 * Ce composant affiche une page d'erreur 404 lorsque l'utilisateur tente d'accéder à une page inexistante.
 * Un lien permet de revenir au tableau de bord.
 *
 * @returns {JSX.Element} Composant représentant la page d'erreur 404
 */
function Error404() {
  const navigate = useNavigate(); // Hook permettant de naviguer entre les pages ou routes de manière programmatique (déclenché par le code)
  // Offre la possibilité d'aller en avant, en arrière ou de remplacer une entrée (chemin) dans l'historique du navigateur

  const handleGoBack = () => {
    navigate(-1); // Retourne à la page précédente dans l'historique (ici le Tableau de bord de l'utilisateur)
  };

  return (
    <div className="error404">
      <h1 className="error404__title">
        4<img src="public/group.svg" className="error404__group" alt="Group Icon" />4
      </h1>
      <p className="error404__message">Oups! La page que vous recherchez n&apos;existe pas.</p>
      <span onClick={handleGoBack} className="error404__link">
        Retourner à votre tableau de bord
      </span>
    </div>
  );
}

export default Error404;
