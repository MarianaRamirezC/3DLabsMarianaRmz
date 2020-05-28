
var svg = d3.select("#chart-area4").append("svg")
		.attr("width", 500)
		.attr("height", 500);

d3.json("data/buildings.json").then((data) => {
	data.forEach((d)=>{
		d.height = +d.height;
	});
	var x = d3.scaleBand()
		.domain(data.map((d) => { return d.name }) )
		.range([0,400])
		.paddingInner(0.3)
		.paddingOuter(0.3);
	var y = d3.scaleLinear()
		.domain([0 ,828])
		.range([0,400]);
	var color = d3.scaleOrdinal()
		.domain(data.map((d)=>{ return d.name }))
		.range(d3.schemeSet3);
	var rects = svg.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		.attr("y", 0)
		.attr("x", (d)=>{
		return x(d.name);
		})
		.attr("width", x.bandwidth)
		.attr("height", (d)=>{
		return y(d.height);
		})
		.attr("fill", (d) => { return color(d.name) } );
});
