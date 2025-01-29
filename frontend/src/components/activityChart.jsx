import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"; 
import CustomTooltip from "../components/customToolTip";

/**
 * Calcule la plage de poids (minimum et maximum) à partir des données fournies,
 * avec une marge ajoutée autour des valeurs extrêmes.
 *
 * @param {Array<Object>} data - Tableau d'objets contenant une propriété `kilogram` représentant le poids.
 * @returns {Object} Objet contenant le poids minimum (`minWeight`) et maximum (`maxWeight`) ajustés.
 */
function getWeightRange(data) {
  const weights = data.map((item) => item.kilogram);
  let minWeight = Math.min(...weights); // retourne la valeur minimum
  let maxWeight = Math.max(...weights); // retourne la valeur maximum

  // Ajoute une marge de 1 pour que tous les barres poids s'affichent
  const margin = 1; 
  minWeight = Math.floor(minWeight - margin); // Arrondi vers le bas
  maxWeight = Math.ceil(maxWeight + margin); // Arrondi vers le haut

  return { minWeight, maxWeight };
}

/**
 * Générer des ticks dynamiques pour afficher 3 lignes horizontales.
 */
function generateTicks(min, max, step = 1) {
  // Condition qui vérifie si l'écart (max - min) entre deux valeurs est plus petit que step...
  if (max - min < step) {
    max = min + step; // ... si c'est le cas, force un écart minimal
  }
  const mid = Math.round((min + max) / 2); // Calcul de la valeur centrale
  return [min, mid, max];
}

/**
 * Composant ActivityChart
 * Affiche un graphique en barres représentant l'activité quotidienne d'un utilisateur,
 * incluant le poids (kg) et les calories brûlées (kCal).
 *
 * @param {Object} props - Propriétés du composant.
 * @param {Array<Object>} props.activityData - Données d'activité, chaque élément contenant :
 *   - {string} day : Jour de l'activité.
 *   - {number} kilogram : Poids en kilogrammes.
 *   - {number} calories : Calories brûlées.
 * @returns {JSX.Element} Graphique interactif représentant l'activité quotidienne.
 */
function ActivityChart({ activityData }) {
  const { minWeight, maxWeight } = getWeightRange(activityData); // Barres poids noires
  const ticks = generateTicks(minWeight, maxWeight, 1); // Lignes en pointillés horizontales

  return (
    // Entête //
    <div className="activity-chart">
      <div className="chart-header">
        <h2>Activité quotidienne</h2>
        <div className="legend">
          <div className="legend-item">
            <span className="dot black"></span>Poids (kg)
          </div>
          <div className="legend-item">
            <span className="dot red"></span>Calories brûlées (kCal)
          </div>
        </div>
      </div>
      {/** Graphique **/}
      <ResponsiveContainer width="100%" height={230}>
        <BarChart
          data={activityData}
          barGap={15}
          margin={{ top: 10, right: 10, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="2 2" horizontal vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 14, fill: "#9B9EAC", dy: 15 }}
            padding={{ left: -38  , right: -38 }}
          />
          <YAxis
            dataKey="kilogram"
            orientation="right"
            domain={[minWeight, maxWeight]} // Détermine la plage de valeurs 
            ticks={ticks} // Génération dynamique des ticks
            axisLine={false}  
            tickLine={false}
            tick={{ fontSize: 14, fill: "#9B9EAC", dx: 30 }} // Repères visuels affichés le long de l'axe Y
          />
          <YAxis
            yAxisId="calories" // Créer un axe Y supplémentaire pour associer les barres des calories à une échelle différente de celle des kilogrammes, même si elle est visuellement cachée
            hide={true} 
            domain={["dataMin - 50", "dataMax + 50"]} // Ajuste l'échelle des calories avec des marges de ±50 kcal sur l'échelle de l'axe Y
          />
          <Tooltip content={<CustomTooltip type="default" />
          } cursor={{ fill: "#C4C4C4", opacity: 0.3 }} /> 
          <Bar
            dataKey="kilogram"
            fill="#282D30"
            radius={[10, 10, 0, 0]}
            name="Poids (kg)"
            barSize={9}
          />
          <Bar
            yAxisId="calories"
            dataKey="calories"
            fill="#E60000"
            radius={[10, 10, 0, 0]}
            name="Calories brûlées (kCal)"
            barSize={9}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

ActivityChart.propTypes = {
  activityData: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired, 
      kilogram: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ActivityChart;
