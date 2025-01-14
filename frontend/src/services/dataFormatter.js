/**
 * Formatte les données principales d'un utilisateur
 * @param {Object} userData - Données de l'utilisateur provenant de l'API
 * @returns {Object} Données formatées
 */
export function formatUserMainData(userData) {
    return {
        id: userData.id,
        firstName: userData.userInfos.firstName,
        lastName: userData.userInfos.lastName,
        age: userData.userInfos.age,
        score: userData.todayScore || userData.score, // Gestion des deux noms possibles
        keyData: userData.keyData,
    };
}

/**
 * Formatte les données d'activité d'un utilisateur
 * @param {Object} activityData - Données d'activité provenant de l'API
 * @returns {Array<Object>} Données formatées
 */
export function formatUserActivityData(activityData) {
    return activityData.sessions.map(session => ({
        date: session.day,
        weight: session.kilogram,
        caloriesBurned: session.calories,
    }));
}

/**
 * Formatte les données de sessions moyennes
 * @param {Object} averageData - Données des sessions moyennes provenant de l'API
 * @returns {Array<Object>} Données formatées
 */
export function formatUserAverageSessionsData(averageData) {
    const daysMapping = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    return averageData.sessions.map(session => ({
        // Puisque daysMapping utilise un index basé sur 0, et que session.day commence à 1, on soustrait 1 à session.day pour obtenir le bon index dans le tableau daysMapping
        day: daysMapping[session.day - 1], // Convertir les jours en noms
        sessionLength: session.sessionLength,
    }));
}

/**
 * Formatte les données de performance d'un utilisateur
 * @param {Object} performanceData - Données de performance provenant de l'API
 * @returns {Object} Données formatées
 */
export function formatUserPerformanceData(performanceData) {
    const kindMapping = performanceData.kind;

    return performanceData.data.map(perf => ({
        type: kindMapping[perf.kind], // Associe la description à chaque type
        value: perf.value,
    }));
}
