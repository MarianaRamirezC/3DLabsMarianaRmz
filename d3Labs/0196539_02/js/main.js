/*
*    main.js
*/


var svg = d3.select("#chart-area").append("svg")
		.attr("width", 400)
		.attr("height", 400)
		.attr("stroke", "green");
var circle = svg.append("circle")
		.attr("cx", 100)
		.attr("cy", 250)
		.attr("r", 30)
		.attr("fill", "blue");
var rect = svg.append("rect")
  	.attr("x", 50)
  	.attr("y", 50)
    .attr("rx", 10)
  	.attr("ry", 10)
  	.attr("width", 100)
  	.attr("height", 100)
  	.attr("fill","red");
var ellipse = svg.append("ellipse")
  	.attr("cx", 220)
  	.attr("cy", 100)
    .attr("rx", 40)
  	.attr("ry", 50)
  	.attr("fill","yellow");
