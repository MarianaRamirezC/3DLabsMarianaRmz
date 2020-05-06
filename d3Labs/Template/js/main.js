/*
*    main.js
*/
var data2 = [25, 20, 15, 10, 5];
var data3 = [5, 10, 15, 10, 5];
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
var svg = d3.select("#chart-area3").append("svg")
		.attr("width", 400)
		.attr("height", 400);
var circles = svg.selectAll("circle")
  	.data(data3);
circles.enter()
	.append("circle")
		.attr("cx",(d,i)=>{
				return(i*50)+25;
		})
		.attr("cy",50)
		.attr("r",(d)=>{return d; })
		.attr("fill","yellow");
d3.json("data/ages.json").then((data) => {
data.forEach((d)=>{
	d.age = +d.age;
});
console.log(data);
}).catch((error)=> {
console.log(error);
});
