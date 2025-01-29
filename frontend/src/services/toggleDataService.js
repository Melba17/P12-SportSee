import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from './mockData';
import { getUserMainData, getUserActivityData, getUserAverageSessionsData, getUserPerformanceData } from './apiService';
import { formatUserMainData, formatUserActivityData, formatUserAverageSessionsData, formatUserPerformanceData } from './dataFormatter'; // Appel au Formatter pour les données mockées


const useMock = false; // Bascule manuelle entre true = données mockées et false = calls API réels

/**
 * Récupère les données principales d'un utilisateur (mockées ou réelles)
 * En mode mock, les données sont extraites localement. En mode réel, elles proviennent de l'API.
 * 
 * @async
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise<Object>} Données formatées ou `null` en cas d'erreur
 */
export async function fetchUserMainData(userId) {
    if (useMock) {
        console.log("Utilisation des données mockées : USER_MAIN_DATA");
        try {
            const user = USER_MAIN_DATA.find(user => user.id === userId);
            if (!user) {
                throw new Error(`Utilisateur introuvable pour l'ID ${userId} dans les données mockées.`);
            }
            return formatUserMainData(user); // Formatage pour les données mockées 
        } catch {
            return null; 
        }
    } else {
        console.log("Appel à l'API réelle : getUserMainData");
        // Appel API réel avec gestion des erreurs et formatage dans getUserMainData
        return await getUserMainData(userId);
    }
}
/**
 * 
 * @async
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise<Array<Object>>} Données d'activité formatées ou `null` en cas d'erreur
 */
export async function fetchUserActivityData(userId) {
    if (useMock) {
        try {
            const user = USER_ACTIVITY.find(user => user.userId === userId);
            if (!user) {
                throw new Error(`Utilisateur introuvable pour l'ID ${userId} dans les données mockées.`);
            }
            return formatUserActivityData(user);
        } catch {
            return null; 
        }
    } else {
        return await getUserActivityData(userId);  
        
    }
}
/**
 * Récupère les données des sessions moyennes d'un utilisateur (mockées ou réelles)
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise<Array<Object>>} Données des sessions moyennes formatées ou `null` en cas d'erreur
 */
export async function fetchUserAverageSessionsData(userId) {
    if (useMock) {
        try {
            const user = USER_AVERAGE_SESSIONS.find(user => user.userId === userId);
            if (!user) {
                throw new Error(`Utilisateur introuvable pour l'ID ${userId} dans les données mockées.`);
            }
            return formatUserAverageSessionsData(user); 
        } catch {
            return null; 
        }
    } else {
        return await getUserAverageSessionsData(userId); 
    }
}
/**
 * Récupère les données de performance d'un utilisateur (mockées ou réelles)
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise<Array<Object>>} Données de performance formatées ou `null` en cas d'erreur
 */
export async function fetchUserPerformanceData(userId) {
    if (useMock) {
            try {
                const user = USER_PERFORMANCE.find(user => user.userId === userId);
            if (!user) {
                throw new Error(`Utilisateur introuvable pour l'ID ${userId} dans les données mockées.`);
            }
            return formatUserPerformanceData(user); 
        } catch {
            return null; 
        }
    } else {
        return await getUserPerformanceData(userId); 
    }
}