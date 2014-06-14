(function () {

    console.log("Initialising barchart...");
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var y = d3.scale.linear()
        .range([height, 0]);

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("/refresh", function(error, json) {
        x.domain(json.map(function(d) { return d.name; }));
        y.domain([0,d3.max(json, function(d) { return d.score; })]);
       
        chart.append("g")
             .attr("class", "x axis")
             .attr("transform", "translate(0," + height + ")")
             .call(xAxis);

        chart.append("g")
             .attr("class", "y axis")
             .call(yAxis); 
        
        var barWidth = width / json.length;

        var bar = chart.selectAll(".bar")
        .data(json)
        .enter().append("rect")
        .attr("class", function(d) { return "bar " + d.class; })
        .attr("transform", function(d, i) { return "translate(" + x(d.name) + ",0)"; })
        .attr("y", function(d) { return y(d.score) ; }) 
        .attr("height", function(d) { return height - y(d.score); })
        .attr("width", x.rangeBand());
    });

    function type(d) {
        d.score = +d.score; // coerce to number
        return d;
    }
    
    setInterval(function() {
        d3.json("/refresh", function(error,json) {
            y.domain([0,d3.max(json, function(d) { return d.score; })]);
            chart.selectAll("g.axis").filter(".y").call(yAxis);
            chart.selectAll(".bar")
            .data(json)
            .transition()
            .attr("y", function(d) { return y(d.score) ; }) 
            .attr("height", function(d) { return height - y(d.score); })
        });
    }, 1000);

})();


function houseAction(house, operator) {
    d3.xhr("/update")
        .header("Content-Type","application/json")
        .post(JSON.stringify({ 'house':house, 'operator':operator}), function(error, data) {
            if(error) {
                console.error(error);   
            } 
            if(data) {
                console.log(data);
            }
            location.reload();
        });
}
