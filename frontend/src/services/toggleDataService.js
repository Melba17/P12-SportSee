import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from './mockData';
import { getUserMainData, getUserActivityData, getUserAverageSessionsData, getUserPerformanceData } from './apiService';
import { formatUserMainData, formatUserActivityData, formatUserAverageSessionsData, formatUserPerformanceData } from './dataFormatter';

const useMock = false; // Bascule manuelle entre données mockées et API (données réelles)

/**
 * Récupère les données principales d'un utilisateur (mockées ou réelles).
 * 
 * @async
 * @param {number} userId - ID de l'utilisateur.
 * @returns {Promise<Object|null>} Données utilisateur formatées ou `null` si introuvable.
 */
async function fetchUserMainData(userId) {
    if (useMock) {
        const user = USER_MAIN_DATA.find(user => user.id === userId);
        return user ? formatUserMainData(user) : null;
    } else {
        return getUserMainData(userId); // API gère déjà les erreurs
    }
}

/**
 * Récupère les données d'activité d'un utilisateur (mockées ou réelles).
 * 
 * @async
 * @param {number} userId - ID de l'utilisateur.
 * @returns {Promise<Array<Object>|null>} Données d'activité formatées ou `null` si introuvable.
 */
async function fetchUserActivityData(userId) {
    if (useMock) {
        const user = USER_ACTIVITY.find(user => user.userId === userId);
        return user ? formatUserActivityData(user) : null;
    } else {
        return getUserActivityData(userId);
    }
}

/**
 * Récupère les données des sessions moyennes d'un utilisateur (mockées ou réelles).
 * 
 * @async
 * @param {number} userId - ID de l'utilisateur.
 * @returns {Promise<Array<Object>|null>} Données des sessions moyennes formatées ou `null` si introuvable.
 */
async function fetchUserAverageSessionsData(userId) {
    if (useMock) {
        const user = USER_AVERAGE_SESSIONS.find(user => user.userId === userId);
        return user ? formatUserAverageSessionsData(user) : null;
    } else {
        return getUserAverageSessionsData(userId);
    }
}

/**
 * Récupère les données de performance d'un utilisateur (mockées ou réelles).
 * 
 * @async
 * @param {number} userId - ID de l'utilisateur.
 * @returns {Promise<Array<Object>|null>} Données de performance formatées ou `null` si introuvable.
 */
async function fetchUserPerformanceData(userId) {
    if (useMock) {
        const user = USER_PERFORMANCE.find(user => user.userId === userId);
        return user ? formatUserPerformanceData(user) : null;
    } else {
        return getUserPerformanceData(userId);
    }
}



/**
 * Récupère les données utilisateur (mockées ou réelles).
 * 
 * @async
 * @param {string | number} userId - ID utilisateur.
 * @returns {Promise<Object>} Données utilisateur ou erreur ('404' ou 'server').
 */
export async function fetchData(userId) {
    console.log(`En mode données ${useMock ? "mockées" : "réelles"}.`);

    try {
        const [userData, activityData, averageData, performanceData] = await Promise.all([
            fetchUserMainData(parseInt(userId)),
            fetchUserActivityData(parseInt(userId)),
            fetchUserAverageSessionsData(parseInt(userId)),
            fetchUserPerformanceData(parseInt(userId)),
        ]);

        if (!userData && !activityData && !averageData && !performanceData) {
            throw new Error("404");
        }

        return { userData, activityData, averageData, performanceData, errorType: null };
        
    } catch (error) {
        return {
            userData: null,
            activityData: null,
            averageData: null,
            performanceData: null,
            errorType: error.message === "404" ? "404" : "server"
        };
    }
}
