$(document).ready(function(){
    // jQuery to look for nasa-api-form ID and create an event on submit that takes values for each date input with the respective IDs.
    $("#nasa-api-form").submit(function(event){
        event.preventDefault()
        var beginDate = $('#begin-date').val()
        var endDate = $('#end-date').val()
        console.log(beginDate)
        console.log(endDate)

        // jQuery GET request to ASTEROIDS endpoint.  GET request includes an object with dates as KEY-VALUE pairs.  Not sure what the ".then(function(data)..."" is doing.
        $.get('/asteroids', {
            begin_date: beginDate, 
            end_date: endDate
        }).then(function(data){

        data = JSON.parse(data)
        // create a variable for the dataset 
        var near = data.near_earth_objects
        
        // create an array to hold all the information about the asteroids that are considered potentially hazardous
        var tableArrayOrig = []

        // create a function to populate the tableArray array
        var ourFunction = function(obj){
            // loop over the obj OBJECT for each KEY representing the dates
            for (var dateArray in obj){
                // loop over the KEY for each asteroid OBJECT
                for (var i in obj[dateArray]){
                    // define variables for each characteristic of the asteroids so that they are easier to call
                    var asteroidName = obj[dateArray][i].name
                    var asteroidDate = '2017'
                    var asteroidVelocity = Math.round(obj[dateArray][i].close_approach_data["0"].miss_distance.miles)
                    var asteroidDiameter = Math.round(obj[dateArray][i].estimated_diameter.feet.estimated_diameter_max)
                    var asteroidDistance = Math.round(obj[dateArray][i].close_approach_data["0"].relative_velocity.miles_per_hour)
                    // filter out non-hazardous asteroids using if
                    if (obj[dateArray][i].is_potentially_hazardous_asteroid === true){
                        // push the variables (defined above) into the array
                        tableArrayOrig.push(asteroidName, asteroidDate, asteroidVelocity, asteroidDiameter, asteroidDistance)
                    }
                }
            }
        }
        ourFunction(near)
        console.log(tableArrayOrig)

        // variables for the writeTable function
        var count = 0
        var totalCells = 5

        // create a function to populate the table in the DOM
        function writeTable(array) {
            var tbody = $('#body')
            for (var i = 0; i < array.length / 5; i++) {
                var tr = $('<tr/>').appendTo(tbody);
                for (var j = 0; j < totalCells; j++) {
                    tr.append('<td>' + array[count] + '</td>')
                    count++;
                }
            }
        }
        writeTable(tableArrayOrig)
        })
    })    
})