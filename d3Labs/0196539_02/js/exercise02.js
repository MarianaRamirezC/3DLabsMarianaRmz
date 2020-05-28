var data2 = [25, 20, 15, 10, 5];
var svg = d3.select("#chart-area2").append("svg")
		.attr("width", 400)
		.attr("height", 400);
var rectangles = svg.selectAll("rect")
  	.data(data2);
rectangles.enter()
	.append("rect")
		.attr("x",(d,i)=>{
				return(i*50);
		})
		.attr("y",50)
		.attr("height",(d)=>{return d; })
		.attr("width", 40)
		.attr("fill","green");
