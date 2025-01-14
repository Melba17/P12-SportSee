import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Hello from "../components/hello";
import { fetchUserMainData } from "../services/toggleDataService";
import Error404 from "../pages/error404";

/**
 * Composant DashBoard
 * Ce composant affiche soit un message d'erreur (page 404) en cas de problème, 
 * soit un message personnalisé via le composant Hello en fonction des données utilisateur.
 * 
 * @returns {JSX.Element} Composant DashBoard contenant Hello ou Error404.
 */
function DashBoard() {

    ////// CONFIGURATION DE LA LOGIQUE DU COMPOSANT = "Back ou logique métier" ////// 
    const { userId } = useParams(); // Récupération de l'ID utilisateur depuis les paramètres de l'URL
    const [userData, setUserData] = useState(null); // État pour stocker les données utilisateur
    const [isError, setIsError] = useState(false); // État pour gérer les erreurs

    useEffect(() => {
        async function fetchData() {
            const data = await fetchUserMainData(parseInt(userId)); // Appel pour récupérer les données utilisateur
            if (!data) {
                setIsError(true); // Si aucune donnée n'est trouvée, activer l'état d'erreur
            } else {
                setUserData(data); // Assigner les données utilisateur si elles existent
            }
        }
        fetchData();
    }, [userId]); // Ce tableau indique à React de réexécuter le useEffect uniquement si la valeur de userId change
    

    ////// LOGIQUE DU RENDU VISUEL DU COMPOSANT = "Front" //////
    if (isError) {
        // Affichage du composant Error404 en cas d'erreur
        return <Error404 />;
    }

    return (
        // Affichage du composant Hello en fonction des données utilisateur
        <div>
            {userData && <Hello userInfos={userData} />} 
        </div>
    );
}

export default DashBoard;

