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
        keyData: {
            Calories: userData.keyData.calorieCount,
            Protéines: userData.keyData.proteinCount,
            Glucides: userData.keyData.carbohydrateCount,
            Lipides: userData.keyData.lipidCount,
        },
    };
}

/**
 * Formatte les données d'activité d'un utilisateur
 * @param {Object} activityData - Données d'activité provenant de l'API
 * @returns {Array<Object>} Données formatées
 */
export function formatUserActivityData(activityData) {
    return activityData.sessions.map((session, index) => ({
        day: (index + 1).toString(), // L'index de la méthode map() commence à 0. En ajoutant + 1, on obtient un affichage basé sur 1, 2, 3 etc..
        kilogram: session.kilogram,
        calories: session.calories,
    }));
}

/**
 * Formatte les données de sessions moyennes
 * @param {Object} averageData - Données des sessions moyennes provenant de l'API
 * @returns {Array<Object>} Données formatées
 */
export function formatUserAverageSessionsData(averageData) {
    const daysMapping = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

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
    // Mappage des types en anglais vers leurs équivalents en français
    const kindMapping = performanceData.kind;
    const frenchTranslation = {
        cardio: 'Cardio',
        energy: 'Énergie',
        endurance: 'Endurance',
        strength: 'Force',
        speed: 'Vitesse',
        intensity: 'Intensité',
    };

    // Formate et traduit les données
    return performanceData.data.map(perf => ({
        type: frenchTranslation[kindMapping[perf.kind]] || kindMapping[perf.kind], // Traduction en français ou valeur par défaut
        value: perf.value,
    }));
}
