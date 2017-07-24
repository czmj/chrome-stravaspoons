'use strict';

function weatherspoonsApiRequest(options) {
    if (!options) {
        options = { 'region': null, 'paging': {'UsePagination': false}, 'facilities': [], 'searchType': 0 };
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'https://www.jdwetherspoon.com/api/advancedsearch', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(options));
    xhttp.onload = weatherspoonsApiRequestSuccess;
    xhttp.onerror = weatherspoonsApiRequestError;
}

function weatherspoonsApiRequestSuccess() { 
    var response = JSON.parse(this.responseText)
    console.log(collectPubs(response.regions));
}

function weatherspoonsApiRequestError() { 
    console.error(this.statusText); 
}

function collectPubs(regions) {
    var pubs = [];
    regions.forEach(region => {
        region.subRegions.forEach(subregion => {
            subregion.items.forEach(pub => {
                if (!(pub.PubIsTemporaryClosed || pub.PubIsClosed))
                    pubs.push(pub)
            })
        })
    })
    return pubs;
}

weatherspoonsApiRequest();