import { formatUserMainData } from './dataFormatter';

///// APPELS API AVEC UTILISATION DES ENDPOINTS MIS À DISPOSITION PAR LE BACKEND //////

/**
 * Effectue une requête fetch, vérifie la réponse, et applique un formateur si les données sont valides.
 * 
 * @param {string} url - URL de l'API à appeler.
 * @param {Function} formatter - Fonction de formatage des données.
 * @returns {Promise<Object|Array|null>} Données formatées ou `null` en cas d'erreur.
 */
async function fetchAndFormatData(url, formatter) {
    try {
        const response = await fetch(url);
        // Vérifie si la réponse est OK
        if (!response.ok) {
            if (response.status === 404) {
                return null; // Retourne null si l'utilisateur n'est pas trouvé
            }
            // Le throw est conçu pour gérer uniquement les réponses HTTP de l'API après l'exécution réussie de fetch qui a établit une connexion avec le serveur, et qu'une réponse HTTP a été renvoyée
            throw new Error(`Erreur HTTP ${response.status} lors de l'appel à ${url}`);
        }
        const data = await response.json();
        return formatter(data.data); // Applique le formateur aux données reçues
    } catch {
        // le catch reste nécessaire pour capturer les erreurs réseau (inaccessible => perte de connexion, serveur hors ligne, etc.) avant que la réponse HTTP ne soit reçue; ou une erreur dans response.json() si la réponse n'est pas un JSON valide; ou une URL mal formée; ou incorrecte ou toutes autres types d'erreurs
        // console.error(`Erreur lors de la requête vers ${url} :`, error);
        // Log désactivé pour garder la console silencieuse
        return null; // Retourne null en cas d'erreur
    }
}
/**
 * Récupère les données principales d'un utilisateur depuis l'API et les formate.
 * 
 * @param {number} userId - ID de l'utilisateur.
 * @returns {Promise<Object|null>} Données formatées ou `null` en cas d'erreur.
 */
export async function getUserMainData(userId) {
    const url = `http://localhost:3000/user/${userId}`;
    return fetchAndFormatData(url, formatUserMainData);
}
