import React, { useState } from "react";
import PropTypes from "prop-types";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

/**
 * Affiche un tooltip (infobulle) personnalisé si actif et des données (minutes) sont disponibles.
 *
 * @param {boolean} active - Indique si le tooltip est actif.
 * @param {Array<Object>} payload - Données à afficher dans le tooltip.
 * @returns {JSX.Element|null} Tooltip ou `null` si inactif.
 */
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip-two">
        {`${payload[0].value} min`}
      </div>
    );
  }
  return null;
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
};

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
  const x = points[0].x; // Récupère la position horizontale (en pixels) du premier point actif/survolé sur la courbe. Cette position est ensuite utilisée pour placer graphiquement le curseur personnalisé au bon endroit avec x={x - cursorWidth / 2}
  const cursorWidth = 30; // Largeur personnalisée du curseur
  return (
    // Le curseur est un rectangle <rect>
    <rect
      x={x - cursorWidth / 2} // Centrer le curseur par rapport au point survolé (exemple : Si le point survolé a une position horizontale x = 150 pixels et que cursorWidth = 30 pixels alors curseur = 150 - 30 / 2 = 135 => Le rectangle <rect> commence à x = 135 et a une largeur de 30 pixels, le centrant ainsi autour du point)
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
  const [cursorX, setCursorX] = useState(null); // Pour suivre le point et donc le dégradé à appliquer

  // Ajout de données fictive pour prolongée la ligne sur les bords du graphique, ces données ne sont pas visibles sur le graphique
  const adjustedData = [
    { day: "", sessionLength: averageData[0].sessionLength },
    ...averageData,
    { day: "", sessionLength: averageData[averageData.length - 1].sessionLength },
  ];

// Cette fonction détermine le dégradé à appliqué à la ligne en fonction de la position actuelle du curseur (cursorX)
  const renderGradient = () => {
    if (cursorX === null) {
      // Si le curseur n'est pas sur le graphique, la ligne doit avoir une opacité uniforme (0.6 partout) => 0% étant le bord gauche du graphique et 100% étant le côté droit
      return (
        <> 
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
        </>
      );
    }
    // Calcule la position relative du curseur par rapport à la largeur totale du graphique (260 pixels ici). Cela donne un pourcentage de position pour le dégradé 
    const cursorPositionPercent = (cursorX / 260) * 100;
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
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          data={adjustedData}
          margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          // isTooltipActive : Indique si le curseur est sur le graphique 
          onMouseMove={({ isTooltipActive, activeCoordinate }) =>
            // activeCoordinate?.x : Donne la position x du curseur en pixels sur le graphique. Cette valeur est affectée à cursorX
            setCursorX(isTooltipActive ? activeCoordinate?.x : null)
          }
          // Réinitialise cursorX à null lorsque le curseur quitte le graphique. Cela rend la ligne entièrement opaque à 0.6
          onMouseLeave={() => setCursorX(null)}
        >
          {/* Définition du style du dégradé linéaire dynamique sur toute la largeur horizontale de la ligne => x1="0" y1="0" : le dégradé commence à gauche du graphique) et x2="1" y2="0" : le dégradé s’étend entièrement jusqu’à la droite du graphique. La valeur 1 de x2 correspond à 100% de la largeur horizontale */}
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
          <YAxis hide={true} domain={["dataMin - 15", "dataMax + 35"]} /> {/* Amplitude de la courbe */}
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
          <Area
            type="natural"
            dataKey="sessionLength"
            stroke="url(#dynamicLineGradient)" // Applique le dégradé
            strokeWidth={2}
            fill="none"
            activeDot={({ cx, cy }) => (
              <>
                {/* Point  / r = Définit le rayon du cercle (taille du point) */}
                <circle cx={cx} cy={cy} r={4.5} fill="#FFFFFF" />
                {/* Aura */}
                <circle cx={cx} cy={cy} r={10} fill="rgba(255, 255, 255, 0.2)" />
              </>
            )}
          />
        </AreaChart>
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
