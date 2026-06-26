var FRANKFURTER_API = 'https://api.frankfurter.dev/v1/latest?base=EUR';
var FRF_PAR_EUR = 6.55957;
var DUREE_CACHE_MS = 60 * 60 * 1000;
var CLE_CACHE = 'tauxChangeEUR';

var tauxEnEUR = null;
var dateMiseAJour = null;

document.addEventListener('DOMContentLoaded', function() {
    chargerTaux();
});

document.addEventListener('input', function() {
    afficherConversion();
});

function chargerTaux() {
    var output = document.getElementById('output');

    var cache = lireCache();
    if (cache) {
        tauxEnEUR = cache.taux;
        dateMiseAJour = new Date(cache.horodatage);
        afficherConversion();
        if (Date.now() - cache.horodatage < DUREE_CACHE_MS) {
            return;
        }
    } else {
        output.innerHTML = '<p>Chargement des taux de change en direct…</p>';
    }

    fetch(FRANKFURTER_API)
        .then(function(reponse) {
            if (!reponse.ok) { throw new Error('Réponse API invalide'); }
            return reponse.json();
        })
        .then(function(donnees) {
            var taux = donnees.rates;
            taux.EUR = 1;
            taux.FRF = FRF_PAR_EUR;
            tauxEnEUR = taux;
            dateMiseAJour = new Date();
            ecrireCache(taux, dateMiseAJour.getTime());
            afficherConversion();
        })
        .catch(function(erreur) {
            console.error('Impossible de récupérer les taux de change :', erreur);
            if (!tauxEnEUR) {
                output.innerHTML = '<p>Impossible de récupérer les taux de change en direct. Vérifiez votre connexion internet.</p>';
            }
        });
}

function lireCache() {
    try {
        var brut = localStorage.getItem(CLE_CACHE);
        if (!brut) { return null; }
        return JSON.parse(brut);
    } catch (e) {
        return null;
    }
}

function ecrireCache(taux, horodatage) {
    try {
        localStorage.setItem(CLE_CACHE, JSON.stringify({ taux: taux, horodatage: horodatage }));
    } catch (e) {
    }
}

function afficherConversion() {
    var montant = parseFloat(document.getElementById('montant').value);
    var deviseDe = document.getElementById('devises').value;
    var devises = document.getElementById('devises').options;
    var output = document.getElementById('output');

    if (!tauxEnEUR) {
        return;
    }

    if (!montant && isNaN(montant)) {
        output.innerHTML = '<p>Pas encore de montant saisi</p>';
        return;
    }

    var html = '';
    for (var i = 0; i < devises.length; i++) {
        var deviseVers = devises[i].value;
        if (deviseVers !== deviseDe) {
            var tauxDeChange = getTauxDeChange(deviseDe, deviseVers);
            var montantConverti = convertir(montant, tauxDeChange);
            html += '<div class="carte-devise">';
            html += '<p class="nom-devise">' + devises[i].textContent + '</p>';
            html += '<p class="valeur-devise">' + montantConverti.toFixed(2) + ' ' + getDeviseSymbole(deviseVers) + '</p>';
            html += '</div>';
        }
    }
    html += '<p class="maj-info">Taux mis à jour le ' + formaterDate(dateMiseAJour) + ' · source : BCE (Frankfurter API)</p>';
    output.innerHTML = html;
}

function formaterDate(date) {
    if (!date) { return '—'; }
    return date.toLocaleString('fr-FR');
}

function getTauxDeChange(deviseDe, deviseVers) {
    var deviseDeVersEUR = 1 / tauxEnEUR[deviseDe];
    var eurVersDeviseVers = tauxEnEUR[deviseVers];
    return deviseDeVersEUR * eurVersDeviseVers;
}

function convertir(montant, tauxDeChange) {
    return montant * tauxDeChange;
}

function getDeviseSymbole(devise) {
    var symboles = {
        USD: '$',
        GBP: '£',
        EUR: '€',
        FRF: '₣',
        JPY: '¥',
        CNY: '元'
    };

    return symboles[devise];
}
