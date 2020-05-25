var margin = {top: 30, right: 0, bottom: 170, left:100};
var width = 450;
var height = 500;
var svg = d3.select("#chart-area").append("svg")
		.attr("width",  width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom);

d3.json("data/revenues.json").then((data) => {
	data.forEach((d)=>{
		d.revenue = +d.revenue;
	});

	var x = d3.scaleBand()
		.domain(data.map((d) => { return d.month }) )
		.range([0,400])
		.paddingInner(0.3)
		.paddingOuter(0.3);
	var y = d3.scaleLinear()
						.domain([d3.max(data,(d)=>{return d.revenue;}) ,0])
						.range([0,height]);
	var color = d3.scaleOrdinal()
		.domain(data.map((d)=>{ return d.month}))
		.range(d3.schemeSet3);

	var yAxisCall = d3.axisLeft(y).ticks(12)

		.tickFormat((d) => { return "$" +d/1000+ "k"; });

	svg.append("g")
				.attr("class", "bottom axis")
				.attr("transform", "translate(100, " + height+ ")")
				.call(d3.axisBottom(x))
		.selectAll("text")
				.attr("y", "10")
				.attr("x", "-5")
				.attr("text-anchor", "end")
				.attr("transform", "rotate(-40)");
	svg.append("g")
				.attr("class", "left axis")
				.attr("transform", "translate(100,0)")
				.call(yAxisCall);
	svg.append("text")
				.attr("text-anchor", "end")
				.attr("x", width/2+60)
				.attr("y", height+60)
				.text("Month");
	svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left-70)
        .attr("x", margin.top-200)
        .text("Revenues (dlls)");
	var rects = svg.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		.attr("transform", "translate(100,0)")
		.attr("y", (d) => { return y(d.revenue); })
		.attr("x", (d) => { return x(d.month); })
		.attr("width", x.bandwidth)
		.attr("height", (d) => { return height - y(d.revenue); })
		.attr("fill", "yellow");


});
