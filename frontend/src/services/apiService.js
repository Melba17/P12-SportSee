import { formatUserMainData, formatUserActivityData, formatUserAverageSessionsData, formatUserPerformanceData } from './dataFormatter';

///// APPELS API AVEC UTILISATION DES ENDPOINTS MIS À DISPOSITION PAR LE BACKEND //////

/**
 * Effectue une requête `fetch` pour récupérer des données depuis une URL, vérifie le statut HTTP
 * de la réponse, et applique un formateur si les données sont valides.
 *
 * Gestion des erreurs :
 * - Si le statut HTTP est 404, la fonction retourne `null` pour signaler que les données sont introuvables.
 * - Si le statut HTTP est autre que 404 (ex. : 500, 403), une erreur est levée via `throw new Error`.
 * - En cas d'erreur réseau ou d'autres exceptions (ex. : problème de connexion, réponse mal formée),
 *   l'erreur est capturée dans le bloc `catch`, loguée pour le débogage, et re-propagée avec `throw error`.
 *
 * @async
 * @param {string} url - L'URL de l'API à appeler.
 * @param {Function} formatter - Une fonction pour formater les données reçues.
 * @returns {Promise<Object|Array|null>} - Données formatées ou `null` en cas de 404.
 * @throws {Error} - Une erreur est levée pour les erreurs serveur (500, etc.) ou réseau.
 */
async function fetchAndFormatData(url, formatter) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                return null; 
            }
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        return formatter(data.data); // Formate les données reçues
    } catch (error) {
        console.error(`Erreur capturée lors de la requête vers ${url} :`, error);
        throw error; 
    }
}
/**
 * Récupère les données principales d'un utilisateur depuis l'API et les formate.
 * 
 * @async
 * @param {number} userId - ID de l'utilisateur.
 * @returns {Promise<Object|null>} Données formatées.
 */
export async function getUserMainData(userId) {
    const url = `http://localhost:3000/user/${userId}`;
    return fetchAndFormatData(url, formatUserMainData);
}
/**
 * Récupère les données d'activité d'un utilisateur depuis l'API et les formate.
 * 
 * @async
 * @param {number} userId - ID de l'utilisateur.
 * @returns {Promise<Array<Object>|null>} Données formatées.
 */
export async function getUserActivityData(userId) {
    const url = `http://localhost:3000/user/${userId}/activity`;
    return fetchAndFormatData(url, formatUserActivityData);
}
/**
 * Récupère les données des sessions moyennes d'un utilisateur depuis l'API et les formate.
 * 
 * @param {number} userId - ID de l'utilisateur.
 * @returns {Promise<Array<Object>|null>} Données formatées ou `null` en cas d'erreur.
 */
export async function getUserAverageSessionsData(userId) {
    const url = `http://localhost:3000/user/${userId}/average-sessions`;
    return fetchAndFormatData(url, formatUserAverageSessionsData);
}
/**
 * Récupère les données de performance d'un utilisateur depuis l'API et les formate.
 * 
 * @param {number} userId - ID de l'utilisateur.
 * @returns {Promise<Array<Object>|null>} Données formatées ou `null` en cas d'erreur.
 */
export async function getUserPerformanceData(userId) {
    const url = `http://localhost:3000/user/${userId}/performance`;
    return fetchAndFormatData(url, formatUserPerformanceData);
}
