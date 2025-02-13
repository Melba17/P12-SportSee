import PropTypes from "prop-types";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

/**
 * Composant ScoreChart
 * Affiche un graphique radial représentant un score sous forme de pourcentage,
 * avec un texte central indiquant le score et une description.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {number} props.score - Score de l'utilisateur, une valeur entre 0 et 1.
 * @returns {JSX.Element} Graphique radial interactif avec le score.
 */
function ScoreChart({ score }) {
  const data = [{ value: score * 100 }]; // Convertir le score en pourcentage

  return (
    <div className="score-chart">
      <h3 className="score-title">Score</h3>
      <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
          cx="50%" 
          cy="50%" 
          innerRadius="70%" 
          outerRadius="80%" 
          barSize={12} 
          data={data}
          startAngle={90} // Commence en haut
          endAngle={90 + 360 * score} // Fin basé sur le score
        >
          {/* Cercle blanc plein pour le fond / SVG (ici format graphique vectoriel interactif) manuel ajouté explicitement pour les besoin de ce graphique tout en profitant des capacités dynamiques du <ResponsiveContainer> */}
          <svg
            x="0"
            y="0"
            viewBox="0 0 100 100" // Permet au graphique SVG de rester proportionnel et en place lorsque la taille de l'écran change => "position min-x ; position min-y et width height (coordonnées virtuelles internes au svg)"
            style={{
              position: "absolute"
            }}
          >
            <circle
              cx="50" // Centre horizontal (50% du SVG ou 50 unités virtuelles)
              cy="50" // Centre vertical (50% du SVG)
              r="32" // Rayon ajusté (32% du SVG pour correspondre à innerRadius)
              fill="#FFFFFF" 
            />
          </svg>
          {/* Arc de progression rouge */}
          <RadialBar
            dataKey="value"
            cornerRadius={50} 
            fill="#FF0000" 
          />
        </RadialBarChart>
      </ResponsiveContainer>
      {/* Texte central */}
      <div className="score-center-text">
        <p className="score-percentage">{score * 100}%</p>
        <p className="score-description">
          <span>de votre</span>
          <br />
          <span>objectif</span>
        </p>
      </div>
    </div>
  );
}

ScoreChart.propTypes = {
  score: PropTypes.number.isRequired, // Valeur entre 0 et 1 représentant le score
};

export default ScoreChart;
