/**
 * Composant `Error404`
 * Affiche une page d'erreur 404 lorsque l'utilisateur tente d'accéder à une page inexistante.
 *
 * @component
 * @returns {JSX.Element} La page d'erreur 404.
 */
function Error404() {
  return (
    <div className="error404">
      <h1 className="error404__title">
        4<img src="public/group.svg" className="error404__group" alt="Group Icon" />4
      </h1>
      <p className="error404__message">Oups! La page que vous recherchez n'existe pas.</p>
    </div>
  );
}

export default Error404;
