import PropTypes from "prop-types";

/**
 * Composant KeyData
 * Affiche une donnée clé avec une icône, une valeur et une étiquette descriptive.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {string} props.icon - URL de l'icône à afficher.
 * @param {string} props.value - Valeur associée à la donnée clé.
 * @param {string} props.label - Étiquette descriptive de la donnée.
 * @returns {JSX.Element} Conteneur affichant une icône, une valeur, et une étiquette.
 */
function KeyData({ icon, value, unit, label }) {
  return (
    <div className="keydata-container">
      <div className="keydata-icon">
        <img src={icon} alt={`${label} icon`} />
      </div>
      <div className="keydata-info">
        <p className="keydata-value">
          {value.toLocaleString('en-US')}{unit} {/* Formatage qui utilise le séparateur virgule pour les milliers */}
        </p>
        <p className="keydata-label">{label}</p>
      </div>
    </div>
  );
}

KeyData.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired, 
  unit: PropTypes.string.isRequired, 
  label: PropTypes.string.isRequired,
};

export default KeyData;
