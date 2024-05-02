document.addEventListener('input', function() {
    var montant = parseFloat(document.getElementById('montant').value);
    var deviseDe = document.getElementById('devises').value;
    var devises = document.getElementById('devises').options;
    var output = document.getElementById('output');

    if (!montant && isNaN(montant)) {
        output.innerHTML = '<p>Pas encore de montant saisi</p>';
        return;
    }

    output.innerHTML = '';
    for (var i = 0; i < devises.length; i++) {
        var deviseVers = devises[i].value;
        if (deviseVers !== deviseDe) {
            var tauxDeChange = getTauxDeChange(deviseDe, deviseVers);
            var montantConverti = convertir(montant, tauxDeChange);
            output.innerHTML += '<h2>' + devises[i].textContent + '</h2>';
            output.innerHTML += '<p>' + montant.toFixed(2) + ' ' + getDeviseSymbole(deviseDe) + ' = ' + montantConverti.toFixed(2) + ' ' + getDeviseSymbole(deviseVers) + '</p>';
        }
    }
});

function getTauxDeChange(deviseDe, deviseVers) {
    var taux = {
        USD: { USD: 1, GBP: 0.718191, EUR: 0.850319, FRF: 6.55957, JPY: 109.731, CNY: 6.46141 },
        GBP: { USD: 1.39117, GBP: 1, EUR: 1.18289, FRF: 9.17684, JPY: 153.554, CNY: 9.00475 },
        EUR: { USD: 1.17576, GBP: 0.845446, EUR: 1, FRF: 6.55957, JPY: 130.295, CNY: 7.64438 },
        FRF: { USD: 0.152347, GBP: 0.108933, EUR: 0.152347, FRF: 1, JPY: 17.7612, CNY: 1.04077 },
        JPY: { USD: 0.00911139, GBP: 0.00651534, EUR: 0.00767021, FRF: 0.0562421, JPY: 1, CNY: 0.05861 },
        CNY: { USD: 0.154915, GBP: 0.111064, EUR: 0.130634, FRF: 0.960724, JPY: 17.0549, CNY: 1 }
    };

    return taux[deviseDe][deviseVers];
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
