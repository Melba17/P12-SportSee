/**
 * Formatte les données principales d'un utilisateur
 * @param {Object} userData - Données de l'utilisateur 
 * @returns {Object} Données formatées
 */
export function formatUserMainData(userData) {
    return {
        id: userData.id,
        firstName: userData.userInfos.firstName,
        lastName: userData.userInfos.lastName,
        age: userData.userInfos.age,
        score: userData.todayScore || userData.score, // Gestion des deux noms possibles
        // Résumé nutritionnel
        keyData: { 
            Calories: { 
                value: userData.keyData.calorieCount,
                icon: "../keyDataIcons/calories.svg",
                label: "Calories",
                unit: "kCal"
            },
            Protéines: { 
                value: userData.keyData.proteinCount,
                icon: "../keyDataIcons/proteines.svg",
                label: "Protéines",
                unit: "g"
            },
            Glucides: { 
                value: userData.keyData.carbohydrateCount,
                icon: "../keyDataIcons/glucides.svg",
                label: "Glucides",
                unit: "g"
            },
            Lipides: { 
                value: userData.keyData.lipidCount,
                icon: "../keyDataIcons/lipides.svg",
                label: "Lipides",
                unit: "g"
            },
        },
    };
}

/**
 * Formatte les données d'activité d'un utilisateur
 * @param {Object} activityData - Données d'activité 
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
 * @param {Object} averageData - Données des sessions moyennes 
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
 * @param {Object} performanceData - Données de performance 
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
        type: frenchTranslation[kindMapping[perf.kind]], // Traduction en français 
        value: perf.value,
    }))
    .reverse(); // Inverse simplement l'ordre des éléments à afficher
}
