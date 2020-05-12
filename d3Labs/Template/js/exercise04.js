var data = d3.json("/data/users.json")
var svg = d3.select("#chart-area4").append("svg")
		.attr("width", 400)
		.attr("height", 400);
var x = d3.scaleBand()
	.domain(data, (d) => { d.height; })
	.range([0,400])
	.paddingInner(0.3)
	.paddingOuter(0.3);
var y = d3.scaleLinear()
.domain([0 ,828])
.range([0,400]);
var color = d3.scaleOrdinal()
	.domain(["AZTECS", "MAYANS", "INCAS", "WIRRARIKA", "NAVAJO"])
	.range(["RED", "BLUE", "YELLOW", "ORANGE", "INDIGO"]);
