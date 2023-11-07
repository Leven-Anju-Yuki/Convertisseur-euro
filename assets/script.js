// Écoutez le bouton de conversion
document.getElementById('convertir').addEventListener('click', function() {
    // Obtenez le montant en dollars saisi par l'utilisateur
    var montantUSD = parseFloat(document.getElementById('montantUSD').value);

    // Vérifiez si l'entrée est un nombre valide
    if (isNaN(montantUSD)) {
        alert('Veuillez saisir un montant en USD valide.');
        return;
    }

    // Définissez le taux de change (1 USD = 0.85 EUR)
    var tauxDeChange = 0.85;

    // Appelez la fonction de conversion de devises
    var montantEUR = convertirEnEUR(montantUSD, tauxDeChange);

    // Affichez le résultat sur la page
    document.getElementById('resultat').textContent = 'Montant en EUR : ' + montantEUR.toFixed(2) + ' €';
});

// Fonction de conversion de devises
function convertirEnEUR(montantUSD, tauxDeChange) {
    return montantUSD * tauxDeChange;
}
