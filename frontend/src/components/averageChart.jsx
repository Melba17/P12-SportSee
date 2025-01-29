import { useState } from "react";
import PropTypes from "prop-types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "../components/customToolTip";

/**
 * Affiche un curseur personnalisé sur le graphique, centré autour du point survolé.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {Array<Object>} props.points - Points correspondant à la position survolée sur le graphique.
 * @returns {JSX.Element|null} Curseur personnalisé ou `null` si aucun point n'est défini.
 */
function CustomCursor({ points }) {
  if (!points || points.length === 0) {
    return null; // Si aucun point n'est défini, ne rien afficher
  }
  const x = points[0].x; // Récupère la position horizontale (en px) du premier point actif/survolé sur la courbe. 
  const cursorWidth = 30; // Largeur personnalisée du curseur grisé (px)
  return (
    // Forme rectangle du curseur
    <rect
      x={x - cursorWidth / 2} // Centrer le curseur par rapport au point survolé 
      y={0} // Partir du haut du graphique
      width="100%" 
      height="100%" 
      fill="#000000"
      fillOpacity={0.1}
    />
  );
}

CustomCursor.propTypes = {
  points: PropTypes.array,
};

/**
 * Composant AverageChart
 * Affiche un graphique en courbe représentant la durée moyenne des sessions en minutes,
 * avec un dégradé dynamique en fonction de la position du curseur.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {Array<Object>} props.averageData - Données des sessions, chaque élément contenant :
 *   - {string} day : Jour de la session.
 *   - {number} sessionLength : Durée moyenne de la session en minutes.
 * @returns {JSX.Element} Graphique interactif avec effet de dégradé dynamique.
 */
function AverageChart({ averageData }) {
  const [cursorX, setCursorX] = useState(null); // State du curseur 

  //Données fictives
  const adjustedData = [
    { day: "", sessionLength: averageData[0].sessionLength },
    ...averageData,
    { day: "", sessionLength: averageData[averageData.length - 1].sessionLength },
  ];
  // Dégradé à appliqué à la Courbe
  const renderGradient = () => {
    if (cursorX === null) {
      return (
        <>
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
        </>
      );
    }
    // Calcule de la position du curseur 
    const cursorPositionPercent = (cursorX / 250) * 100;
    return (
      <>
        {/* offset = décalage => La couleur commence à devenir plus claire à 5% à gauche de la position du curseur, avec une opacité de 0.6. */}
        <stop offset={`${cursorPositionPercent - 5}%`} stopColor="rgba(255, 255, 255, 0.6)" />
        {/* La couleur est complètement blanche (opacité de 1) au niveau exact du curseur. */}
        <stop offset={`${cursorPositionPercent}%`} stopColor="rgba(255, 255, 255, 1)" />
      </>
    );
  };

  return (
    <div className="average-chart">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={adjustedData}
          margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          
          onMouseMove={({ isTooltipActive, activeCoordinate }) =>
            setCursorX(isTooltipActive ? activeCoordinate?.x : null)
          }
          
          onMouseLeave={() => setCursorX(null)}
        >
          {/* Style utilisant le dégradé à appliquer sur la courbe*/}
          <defs>
            <linearGradient id="dynamicLineGradient" x1="0" y1="0" x2="1" y2="0">
              {renderGradient()}
            </linearGradient>
          </defs>

          <text y="30" fill="#FFFFFF" fontSize="15" opacity={0.6}>
            <tspan x="10%" dy="8">
              Durée moyenne des
            </tspan>
            <tspan x="10%" dy="25">
              sessions
            </tspan>
          </text>
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#FFFFFF", fontSize: 12 }}
            padding={{ left: -35, right: -35 }}
            opacity={0.6}
          />
          <YAxis hide={true} domain={["dataMin - 15", "dataMax + 40"]} /> {/* Amplitude de la courbe */}
          <Tooltip content={<CustomTooltip type="two" />} cursor={<CustomCursor />} />
          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="url(#dynamicLineGradient)" // Applique le dégradé
            strokeWidth={2}
            dot={false}
            activeDot={({ cx, cy }) => (
              <>
                {/* Point */}
                <circle cx={cx} cy={cy} r={4.5} fill="#FFFFFF" />
                {/* Aura */}
                <circle cx={cx} cy={cy} r={10} fill="rgba(255, 255, 255, 0.2)" />
              </>
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

AverageChart.propTypes = {
  averageData: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      sessionLength: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default AverageChart;
