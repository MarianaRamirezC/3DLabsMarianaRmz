var margin = {top: 10, right: 10, bottom: 100, left:100};
var width = 900;
var height = 600;
var bottomAxis = d3.axisBottom(x);
var svg = d3.select("#chart-area5").append("svg")
		.attr("width",  width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("class", "bottom axis")
			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
			.call(bottomAxis);;



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
