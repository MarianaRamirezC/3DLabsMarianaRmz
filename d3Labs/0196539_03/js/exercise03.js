var data3 = [5, 10, 15, 10, 5];
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
		.attr("fill",(d)=>{if(d>10){
			return "yellow";
		}else return "red" });
d3.json("data/ages.json").then((data) => {
data.forEach((d)=>{
	d.age = +d.age;
});
console.log(data);
}).catch((error)=> {
console.log(error);
});
