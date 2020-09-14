//
// Live COVID-19 Tracker US
// ************************
//    
// Created by Kevin Thomas 04/11/20
// Modified by Kevin Thomas 04/11/20
//
// Copyright: (c) 2020, Kevin Thomas <kevin@mytechnotalent.com>
// Apache License, Version 2.0 (see COPYING or https://www.apache.org/licenses/LICENSE-2.0)
//                             
// Live COVID-19 Tracker is a simple web app that shows the latest COVID-19 
// statistics feed of individual US States of choice in real-time which
// refreshes every 60 seconds.
//
// Version 0.0.1 Alpha
//


// Global vars
var input;

// Load init data onload
$(document).ready(function() {
    us_data();
    setInterval("us_data()", 60000);
    init_state_data();
});

// Obtain initial state data from API
function init_state_data() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        
        var $input = $(this).find('input');
        input = $input.val();
        $('#text-output').text(input);

        $.get('https://corona.lmao.ninja/v2/states/' + input, function(data) {
            // console.log(data);

            if (input == '') {
                $("#state_cases").text('*** PLEASE ENTER A US STATE ***');
                $("#state_today_cases").text('');
                $("#state_deaths").text('');
                $("#state_today_deaths").text('');
                $("#state_active").text('');
                $("#state_tests").text('');
                $("#state_tests_per_one_million").text('');
            } else if (data == "Country not found or doesn't have any cases") {
                $("#state_cases").text('*** INVALID STATE ***');
                $("#state_today_cases").text('');
                $("#state_deaths").text('');
                $("#state_today_deaths").text('');
                $("#state_active").text('');
                $("#state_tests").text('');
                $("#state_tests_per_one_million").text('');
            } else {
                $("#state_cases").text(data.cases + ' Cases');
                $("#state_today_cases").text(data.todayCases + ' Cases Today');
                $("#state_deaths").text(data.deaths + ' Deaths');
                $("#state_today_deaths").text(data.todayDeaths + ' Deaths Today');
                $("#state_active").text(data.active + ' Active');
                $("#state_tests").text(data.tests + ' Tests');
                $("#state_tests_per_one_million").text(data.testsPerOneMillion + ' Tests Per One Million');
            }
        });

        // Check API every 60 seconds
        setInterval("state_data()", 60000);
    });	
}

// Obtain state data from API
function state_data() {
    $.get('https://corona.lmao.ninja/v2/states/' + input, function(data) {
        // console.log(data);

        $("#state_cases").text(data.cases + ' Cases');
        $("#state_today_cases").text(data.todayCases + ' Cases Today');
        $("#state_deaths").text(data.deaths + ' Deaths');
        $("#state_today_deaths").text(data.todayDeaths + ' Deaths Today');
        $("#state_active").text(data.active + ' Active');
        $("#state_tests").text(data.tests + ' Tests');
        $("#state_tests_per_one_million").text(data.testsPerOneMillion + ' Tests Per One Million');
    });
}

// Obtain US data from API
function us_data() {
    $.get('https://corona.lmao.ninja/v2/countries/usa', function(data) {
        // console.log(data);

        $("#us_cases").text(data.cases + ' Cases');
        $("#us_today_cases").text(data.todayCases + ' Today Cases');
        $("#us_deaths").text(data.deaths + ' Deaths');
        $("#us_recovered").text(data.recovered + ' Recovered');
        $("#us_active").text(data.active + ' Active');
        $("#us_critical").text(data.critical + ' Critical');
        $("#us_cases_per_one_million").text(data.casesPerOneMillion + ' Cases Per One Million');
        $("#us_deaths_per_one_million").text(data.deathsPerOneMillion + ' Deaths Per One Million');
        $("#us_tests").text(data.tests + ' Tests');
        $("#us_tests_per_one_million").text(data.testsPerOneMillion + ' Tests Per One Million');
    });
}
