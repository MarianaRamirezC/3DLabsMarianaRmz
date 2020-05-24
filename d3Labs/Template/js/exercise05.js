var margin = {top: 10, right: 10, bottom: 170, left:100};
var width = 900;
var height = 600;

var svg = d3.select("#chart-area5").append("svg")
		.attr("width",  width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom);

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
						.domain([828 ,0])
						.range([0,height]);
	var color = d3.scaleOrdinal()
		.domain(data.map((d)=>{ return d.name }))
		.range(d3.schemeSet3);

	var yAxisCall = d3.axisLeft(y).ticks(5)

		.tickFormat((d) => { return d + "m"; });

	svg.append("g")
				.attr("class", "bottom axis")
				.attr("transform", "translate(350, " + height+ ")")
				.call(d3.axisBottom(x))
		.selectAll("text")
				.attr("y", "10")
				.attr("x", "-5")
				.attr("text-anchor", "end")
				.attr("transform", "rotate(-40)");
	svg.append("g")
				.attr("class", "left axis")
				.attr("transform", "translate(350,0)")
				.call(yAxisCall);
	svg.append("text")
				.attr("text-anchor", "end")
				.attr("x", width/2+200)
				.attr("y", height+130)
				.text("The word's tallest buildings");
	svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", margin.left+200)
    .attr("x", margin.top-350)
    .text("Height (m)");


	var rects = svg.selectAll("rect")

		.data(data)
		.enter()

		.append("rect")
		.attr("transform", "translate(350,0)")
		.attr("y", (d) => { return y(d.height); })
		.attr("x", (d) => { return x(d.name); })
		.attr("width", x.bandwidth)
		.attr("height", (d) => { return height - y(d.height); })
		.attr("fill", "grey");

});
