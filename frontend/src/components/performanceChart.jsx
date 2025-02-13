import PropTypes from "prop-types";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

// Composant pour personnaliser les étiquettes des axes angulaires
function CustomTick(props) {
  const { payload, x, y, textAnchor } = props;
  const value = payload.value;

  // Ajustements spécifiques pour chaque type
  let dx = 0;
  let dy = 0;

  switch (value) {
    case "Intensité":
      dx = 1;
      dy = -6; 
      break;
      case "Endurance":
      dy = 13; 
      dx = 1;
      break; 
    case "Cardio":
     dy = 2;  
      break;
    case "Vitesse":
      dx = -3; 
      break;
    case "Énergie":
      dx = 6;
      dy = 12; 
      break;
    case "Force":
      dy = 10;
      dx = -3;
      break;
    default:
      break;
  }

  return (
    <text
      x={x + dx} // Applique le déplacement horizontal
      y={y + dy} // Applique le déplacement vertical
      textAnchor={textAnchor} // définit l'alignement horizontal du texte par rapport à son point d'ancrage (le point x spécifié dans le texte)
      fill="#fff"
      fontSize={12}
    >
      {value}
    </text>
  );
}

CustomTick.propTypes = {
  payload: PropTypes.shape({
    value: PropTypes.string.isRequired, // Nom de la catégorie
  }),
  x: PropTypes.number, 
  y: PropTypes.number, 
  textAnchor: PropTypes.string 
};


/**
 * Composant PerformanceChart
 * Affiche un graphique radar représentant les performances de l'utilisateur
 * avec des axes personnalisés et une forme radar.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {Array<Object>} props.performanceData - Données des performances, chaque élément contenant :
 *   - {string} type : Catégorie de performance.
 *   - {number} value : Valeur associée à la catégorie.
 * @returns {JSX.Element} Graphique radar des performances utilisateur.
 */
function PerformanceChart({ performanceData }) {
  return (
    <div className="performance-chart">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={performanceData}>
          {/* Grille concentrique sans lignes radiales */}
          <PolarGrid stroke="#fff" strokeOpacity={1} radialLines={false} />

          {/* Axes angulaires avec des étiquettes personnalisées */}
          <PolarAngleAxis
            dataKey="type"
            tick={<CustomTick />}
          />

          {/* Forme rouge */}
          <Radar
            name="Performance"
            dataKey="value"
            fill="#FF0101"
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

PerformanceChart.propTypes = {
  performanceData: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired, 
      value: PropTypes.number.isRequired,   
    })
  ).isRequired,
};

export default PerformanceChart;
