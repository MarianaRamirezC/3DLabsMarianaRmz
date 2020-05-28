var margin = {top: 30, right: 0, bottom: 170, left:100};
var width = 600;
var height = 400;
var formattedData;
var interval;
var time = 0;
var flag = true;

var g = d3.select("#chart-area").append("svg")
                                	.attr("width", width + margin.right + margin.left)
                                	.attr("height", height + margin.top + margin.bottom)
                                  .append("g")
                                  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var x = d3.scaleLog()
					.domain([142,150000])
					.range([0,width])
					.base(10);
var y = d3.scaleLinear()
					.domain([0,90])
          .range([0,height]);
var area = d3.scaleLinear()
					.domain( [2000, 1400000000])
					.range([25*Math.PI, 1500*Math.PI]);
var bottomAxis = d3.axisBottom(x)
										.tickValues([400,4000,40000])
										.tickFormat(d3.format("$"));
var t = d3.transition().duration(750);
var leftAxis = d3.axisLeft(y);

var legend = g.append("g")
 							.attr("transform", "translate(" + (width - 10) + "," + (height - 125) + ")");
	g.append("g")
	 	.attr("class", "x axis")
	 	.attr("transform", "translate(0, " + height + ")")
	 	.call(bottomAxis)
	 	.selectAll("text")
	 	.attr("y", 10)
	 	.attr("x", -5)
	 	.attr("text-anchor", "middle");
 	g.append("g")
	 	.attr("class", "left axis")
	 	.call(leftAxis);
 	// X Label
 	g.append("text")
	 	.attr("class", "x axis-label")
	 	.attr("x", width/2)
	 	.attr("y", height + 50)
	 	.attr("font-size", "20px")
	 	.attr("text-anchor", "middle")
	 	.text("GDP Per Capita ($)");
 	// Y Label
 	g.append("text")
	 	.attr("class", "y axis-label")
	 	.attr("x", - (height / 2))
	 	.attr("y", -60)
	 	.attr("font-size", "20px")
	 	.attr("text-anchor", "middle")
	 	.attr("transform", "rotate(-90)")
	 	.text("Life expectancy (Years)");
 	// Area Label
 	var areaLabel = g.append("text")
	 	.attr("class", "x axis-label")
	 	.attr("x", width-20)
	 	.attr("y", height-10)
	 	.attr("font-size", "20px")
	 	.attr("text-anchor", "middle")
	 	.text("Year");
$("#play-button").on("click", ( ) => {
	var button = $(this);
	if (button.text() == "Play"){
		button.text("Pause");
		interval = setInterval(step, 100);
	} else {
		button.text("Play");
		clearInterval(interval);
	}
});
var continent = $("#continent-select").val();
var data = data.filter((d) => {
	if (continent == "all") { return true; }
	else {
		return d.continent == continent;
	}
});


$("#continent-select").on("change", ( ) => {
	update(formattedData[time]);
});


var continents = new Array();
d3.json("data/data.json").then((data) => {data.forEach((d, i)=>{
			d.year = +d.year;
      });
			const formattedData = data.map((year) => {
				return year["countries"].filter((country) => {
				var dataExists = (country.income && country.life_exp);
				return dataExists
				}).map((country) => {
					country.income = +country.income;
					country.life_exp = +country.life_exp;
					return country;
				})
			});
			var years = data.map((d) => {return d.year;});

			var cont = formattedData[0].map((d) => {return d.continent;});
			var continents = [...new Set(cont)];

			var length = years.length;
			var index = 0;
			d3.setInterval( step(),interval )=>{
        if (index >= length){
          index = 0;
        }

        index++;

    }, 1000);
  }).catch((error)=>{console.log(error);
  });
function step(){
  	time = (time < 214) ? time+1 : 0;
  	update(years[index], formattedData[index], continents);

}

function update(year, data, continents){
	var label = year;
  areaLabel.text(label);
	colors = d3.schemePastel1;
	var color = d3.scaleOrdinal().domain(continents).range(colors);
	continents.forEach((c, i) => {
			var legendRow = legend.append("g")
						.attr("transform", "translate(0, " + (i * 20) + ")");
			legendRow.append("rect")
								.attr("width", 10)
								.attr("height", 10)
								.attr("fill", color(c));
	 		legendRow.append("text")
								.attr("x", -10)
								.attr("y", 10)
								.attr("text-anchor", "end")
								.style("text-transform", "capitalize")
								.text(c);
	 });
	var circles = g.selectAll("circle").data(data, (d) => { return d.country; });
	circles.exit().attr("fill", (d) => {return color(d.continent);})
			    .transition(t)
			    .attr("cy", (d) => {return y(d.life_exp);})
			    .attr("r", (d)=>{return Math.sqrt(area(d.population) / Math.PI);})
			    .remove();
	circles.transition(t)
			    .attr("cx", (d) => {return x(d.income);})
			    .attr("cy", (d) => {return y(d.life_exp);})
			    .attr("r", (d)=>{return Math.sqrt(area(d.population) / Math.PI);});
  circles.enter().append("circle")
			    .attr("fill", (d) => {return color(d.continent);})
			    .attr("cx", (d) => {return x(d.income);})
			    .attr("cy", (d) => {return y(d.life_exp);})
			    .attr("r", (d)=>{return Math.sqrt(area(d.population) / Math.PI);})
			    .merge(circles)
			    .transition(t)
						.attr("cx", (d) => {return x(d.income);})
				    .attr("cy", (d) => {return y(d.life_exp);})
				    .attr("r", (d)=>{return Math.sqrt(area(d.population) / Math.PI);});
}
