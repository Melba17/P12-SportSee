import { USER_MAIN_DATA } from './mockData';
import { getUserMainData } from './apiService';
import { formatUserMainData } from './dataFormatter'; // Appel au Formatter pour les données mockées

// Possibilité de changement manuel de la valeur de cette constante pour basculer entre données Mockées ou calls API réels
const useMock = true; // true = données mockées, false = API réelle

/**
 * Récupère les données principales d'un utilisateur (mockées ou réelles)
 * En mode mock, les données sont extraites localement sinon, elles proviennent de l'API
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise<Object>} Données formatées ou `null` en cas d'erreur
 */
export async function fetchUserMainData(userId) {
    if (useMock) {
        console.log("Utilisation des données mockées : USER_MAIN_DATA");
        try {
            // Trouver l'utilisateur dans les données mockées
            const user = USER_MAIN_DATA.find(user => user.id === userId);
            // Vérifier si l'utilisateur existe
            if (!user) {
                throw new Error(`Utilisateur introuvable pour l'ID ${userId} dans les données mockées.`);
            }
            return formatUserMainData(user); // Applique le formatage et retourne les données
        } catch {
            // console.error("Erreur dans fetchUserMainData (mock) :", error.message);
            // Log désactivé pour éviter tout affichage en console
            return null; 
        }
    } else {
        console.log("Appel à l'API réelle : getUserMainData");
        // Appel API réel avec gestion des erreurs dans getUserMainData
        return await getUserMainData(userId);
    }
}
