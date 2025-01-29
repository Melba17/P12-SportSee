import PropTypes from 'prop-types';

/**
 * Composant CustomTooltip
 * Affiche un tooltip personnalisé pour un graphique, basé sur le type de graphique et les données survolées.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {boolean} props.active - Indique si le tooltip est actif (l'utilisateur survole le graphique).
 * @param {Array<Object>} props.payload - Données associées au point survolé sur le graphique.
 * @param {string} props.type - Type de tooltip, "default" pour poids et calories ou "two" pour les minutes.
 * @returns {JSX.Element|null} Tooltip personnalisé ou `null` si inactif.
 */
function CustomTooltip({ active, payload, type = 'default' }) {
  if (active && payload && payload.length) {
    // Structure du tooltip basée sur le type/className
    return (
      <div className={`custom-tooltip ${type === 'two' ? 'custom-tooltip-two' : 'default'}`}>
        {type === 'two' ? (
          // Tooltip pour le deuxième graphique ("min")
          <p>{`${payload[0].value} min`}</p>
        ) : (
          // Tooltip pour le premier graphique ("kg" et "Kcal")
          <>
            <p>{`${payload[0].value}kg`}</p> {/* 1ère barre associée au dataKey="kilogram"*/}
            <p>{`${payload[1].value}Kcal`}</p> {/* 2ème barre associée au dataKey="calories"*/}
          </>
        )}
      </div>
    );
  }
  return null;
}

// PropTypes pour valider les props
CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  type: PropTypes.string, // "default" pour le premier type, "two" pour le second
};

export default CustomTooltip;
