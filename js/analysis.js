$(document).ready(function(){
    //dom is loaded
    //lets see if we can load in a Vue
    //variables
    var pastTransactions = document.getElementById('past-transactions'),
        personalElem = document.getElementById('personal'),
        homeElem = document.getElementById('home'),
        healthElem = document.getElementById('health'),
        giftsElem = document.getElementById('gifts'),
        travelElem = document.getElementById('travel'),
        transportationElem = document.getElementById('transportation'),
        utilitiesElem = document.getElementById('utilities'),
        foodElem = document.getElementById('food'),
        otherElem = document.getElementById('other'),
        personalPCT = document.getElementById('personalPCT'),
        homePCT = document.getElementById('homePCT'),
        healthPCT = document.getElementById('healthPCT'),
        giftsPCT = document.getElementById('giftsPCT'),
        travelPCT = document.getElementById('travelPCT'),
        utilitiesPCT = document.getElementById('utilitiesPCT'),
        transportationPCT = document.getElementById('transportationPCT'),
        foodPCT = document.getElementById('foodPCT'),
        localStore = [],
        otherPCT = document.getElementById('otherPCT');
    var amounts = {
        "food": 0,
        "other": 0,
        "personal": 0,
        "travel": 0,
        "transportation": 0,
        "utilities": 0,
        "gifts": 0,
        "health": 0,
        "home": 0
    };
    var totalAMT = 0;
    //handle loading in all current transactions
    var getSettings = {
        "async": true,
        "crossDomain": true,
        "method": "GET",
        "url": "https://api.airtable.com/v0/app3KwIBwNt7e6HsE/Credit%20Card?sortField=Transaction%20Date&sortDirection=desc",
        "headers": {
            "authorization": "Bearer keyIye3zskPSBMQ6Q"
        }
    };
    $.ajax(getSettings).done(function(resp){
        console.log("resp: ");
        console.log(resp);
        var records = resp.records;
        for(var i=0; i<records.length; i++){
            localStore.push(records[i]);
            var linkTD = document.createElement('td');
            linkTD.innerHTML = "Click for info!";
            linkTD.className = "expense-info";
            //render all transactions
            var divRow = document.createElement('tr');
            divRow.appendChild(linkTD);
            divRow.setAttribute('class', 'expense-row');
            var uniqueID = records[i].id;
            divRow.setAttribute('data-expense-id', uniqueID);
            var amountDiv = document.createElement('td');
            amountDiv.innerHTML = "$"+records[i].fields.Amount;
            var locationDiv = document.createElement('td');
            locationDiv.innerHTML = records[i].fields.Location;
            var timeDiv = document.createElement('td');
            //change time to date and hours
            var converted = moment(records[i].fields["Transaction Date"]);
            var readable = converted._d;
            timeDiv.innerHTML = readable;
            var categoryDiv = document.createElement('td');
            categoryDiv.innerHTML = records[i].fields.Category;
            divRow.appendChild(timeDiv);
            divRow.appendChild(amountDiv);
            divRow.appendChild(locationDiv);
            divRow.appendChild(categoryDiv);
            pastTransactions.appendChild(divRow);
            //analytics
            //totals
            totalAMT += records[i].fields.Amount;
            if(records[i].fields.Category === "Food"){
                //increment food totals
                var amtString = records[i].fields.Amount;
                var food = parseFloat(amtString).toFixed(2);
                amounts.food += parseFloat(food);
            } else if(records[i].fields.Category === "Utilities") {
                var amtString = records[i].fields.Amount;
                var food = parseFloat(amtString).toFixed(2);
                amounts.utilities += parseFloat(food);
            } else if(records[i].fields.Category === "Personal") {
                var amtString = records[i].fields.Amount;
                var food = parseFloat(amtString).toFixed(2);
                amounts.personal += parseFloat(food);
            } else if(records[i].fields.Category === "Home") {
                var amtString = records[i].fields.Amount;
                var food = parseFloat(amtString).toFixed(2);
                amounts.home += parseFloat(food);
            } else if(records[i].fields.Category === "Health") {
                var amtString = records[i].fields.Amount;
                var food = parseFloat(amtString).toFixed(2);
                amounts.health += parseFloat(food);
            } else if(records[i].fields.Category === "Gifts") {
                var amtString = records[i].fields.Amount;
                var food = parseFloat(amtString).toFixed(2);
                amounts.gifts += parseFloat(food);
            } else if(records[i].fields.Category === "Travel") {
                var amtString = records[i].fields.Amount;
                var food = parseFloat(amtString).toFixed(2);
                amounts.travel += parseFloat(food);
            } else if(records[i].fields.Category === "Transportation") {
                var amtString = records[i].fields.Amount;
                var food = parseFloat(amtString).toFixed(2);
                amounts.transportation += parseFloat(food);
            } else if(records[i].fields.Category === "Other") {
                var amtString = records[i].fields.Amount;
                var food = parseFloat(amtString).toFixed(2);
                amounts.other += parseFloat(food);
            } else {
                //error
            }

        };

        $('.expense-info').on('click', '', function() {
            var uniqueRowID = this.parentNode.getAttribute('data-expense-id');
            console.log(uniqueRowID);
            for(var k=0; k<localStore.length; k++){
                if(localStore[k].id === uniqueRowID){
                    var converted = moment(localStore[k].fields["Transaction Date"]);
                    var readable = converted._d;
                    vex.dialog.alert({
                        message: '<ul><li>Amount: </li><ul><li class=\'currency\'>$'+localStore[k].fields.Amount+'</li></ul><li>Location: </li><ul><li>'+localStore[k].fields.Location+'</li></ul><li>Time: </li><ul><li>'+readable+'</li></ul><li>Notes: </li><ul><li>'+localStore[k].fields.Notes+'</li></ul></ul>'
                    });
                }
            }
        });

        //now we want to render all of amounts
        console.log("Amounts: ");
        console.log(amounts);
        personalElem.innerHTML = "$" + amounts.personal.toFixed(2);
        homeElem.innerHTML = "$" + amounts.home.toFixed(2);
        healthElem.innerHTML = "$" + amounts.health.toFixed(2);
        giftsElem.innerHTML = "$" + amounts.gifts.toFixed(2);
        travelElem.innerHTML = "$" + amounts.travel.toFixed(2);
        transportationElem.innerHTML = "$" + amounts.transportation.toFixed(2);
        utilitiesElem.innerHTML = "$" + amounts.utilities.toFixed(2);
        foodElem.innerHTML = "$" + amounts.food.toFixed(2);
        otherElem.innerHTML = "$" + amounts.other.toFixed(2);

        personalPCT.innerHTML = (amounts.personal/totalAMT).toFixed(2) + "%";
        homePCT.innerHTML = (amounts.home/totalAMT).toFixed(2) + "%";
        healthPCT.innerHTML = (amounts.health/totalAMT).toFixed(2) + "%";
        giftsPCT.innerHTML = (amounts.gifts/totalAMT).toFixed(2) + "%";
        travelPCT.innerHTML = (amounts.travel/totalAMT).toFixed(2) + "%";
        transportationPCT.innerHTML = (amounts.transportation/totalAMT).toFixed(2) + "%";
        utilitiesPCT.innerHTML = (amounts.utilities/totalAMT).toFixed(2) + "%";
        foodPCT.innerHTML = (amounts.food/totalAMT).toFixed(2) + "%";
        otherPCT.innerHTML = (amounts.other/totalAMT).toFixed(2) + "%";
    });



});
