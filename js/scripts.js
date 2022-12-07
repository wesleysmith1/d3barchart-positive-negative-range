var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var data = [
    {
        "Label": "Label",
        "Value": 10,
    }
]

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Label; }))
  .padding(0.2);

// Add Y axis
var y = d3.scaleLinear()
    .domain([-30, 30])
    .range([ height, 0]);

svg.append("g")
  .attr("transform", "translate(0," + y(0) + ")")
  .attr("class", "x")
  .call(d3.axisBottom(x));
  
svg.append("g")
  .call(d3.axisLeft(y));

var bar = svg.selectAll("mybar.bar").data(data).enter().append("g")

bar.append("rect")
      .attr("x", function(d) { return x(d.Label); })
      .attr("y", function(d) { return y(Math.max(0, d.Value)); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.Value) - y(0)); })
      .attr("fill", function(d) { return (d.Value < 0 ? 'green' : 'red')})
      .attr("class", "bar")

function buildBars() {
    // Bars
    bar.selectAll("rect")
      .attr("x", function(d) { return x(d.Label); })
      .attr("y", function(d) { return y(Math.max(0, d.Value)); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.Value) - y(0)); })
      .attr("fill", function(d) { return (d.Value < 0 ? 'green' : 'red')})
      .attr("class", "bar")

    // flip labels
    if (data[0].Value < 0) {
      svg.selectAll(".x .tick text").attr("transform", "translate(0, -25)")
      svg.selectAll(".x .tick line").attr("transform", "translate(0, -5)")
    } else {
      svg.selectAll(".x .tick text").attr("transform", "translate(0, 0)")
      svg.selectAll(".x .tick line").attr("transform", "translate(0, 0)")
    }
}

buildBars()

document.getElementById("myRange").addEventListener("input", function() {
    data[0].Value = this.value
    buildBars()
});