var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 115
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold chart, and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "obesity";
var chosenYAxis = "income";

// Function used for updating x-scale var upon click on axis label
function xScale(censusData, chosenXAxis) {
  // Create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
      d3.max(censusData, d => d[chosenXAxis]) * 1.2])
    .range([0, width]);
  return xLinearScale;
}

// Function used for updating xAxis var upon click on axis label
function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
}

// Function used for updating y-scale var upon click on axis label
function yScale(censusData, chosenYAxis) {
    // Create scales
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(censusData, d => d[chosenYAxis]) * 0.8,
        d3.max(censusData, d => d[chosenYAxis]) * 1.2])
      .range([height, 0]);
    return yLinearScale;
}

// Function used for updating yAxis var upon click on axis label
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
    return yAxis;
}
  
// Function used for updating circles group with a transition to new circles.
function renderCircles(circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .attr("cy", d => newYScale(d[chosenYAxis]));
    return circlesGroup;
  }

// Function used for updating state abbreviation text group with transition to new circles
function stateAbbr(stateCircles, newXScale, newYScale, chosenXAxis, chosenYAxis) {
    stateCircles.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[chosenXAxis]))
        .attr("y", d => newYScale(d[chosenYAxis]));
    return stateCircles;
}

// Function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
    // For x-axis
    if (chosenXAxis === "obesity") {
      var xlabel = "%Obese: ";
    }
    else if (chosenXAxis === "smokes") {
        var xlabel = "%Smoker: ";
    }
    else {
      var xlabel = "%Uninsured: ";
    }

    // For y-axis
    if (chosenYAxis === "income") {
        var ylabel = "Income: $";
    }
    else if (chosenYAxis === "age") {
        var ylabel = "Average Age: ";
    }
    else {
        var ylabel = "%Poverty: ";
    }

    // Format tooltip display when moused over
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([100, 40])
      .html(function(d) {
        if (chosenXAxis === "obesity") {
            return (`${d.state}<br>${xlabel} ${d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}`);
        }
        else if (chosenXAxis !== "obesity" && chosenXAxis !== "healthcare") {
            return (`${d.state}<br>${xlabel} ${d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}`);
        }
        else {
            return (`${d.state}<br>${xlabel} ${d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}`);
        }
      });
  
    circlesGroup.call(toolTip);
    
    // On mouseover
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // On mouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
  
    return circlesGroup;
  }

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(function(censusData) {

    // Parse data
    censusData.forEach(function(data) {
      data.obesity = +data.obesity;
      data.income = +data.income;
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
      data.smokes = +data.smokes;
      data.age = +data.age;
    });
  
    // X- and YLinearScale function above csv import
    var xLinearScale = xScale(censusData, chosenXAxis);
    var yLinearScale = yScale(censusData, chosenYAxis);
  
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // Append x-axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    // Append y-axis
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);
  
    // Append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 16)
        .attr("fill", "green")
        .attr("opacity", ".5");
  
    // Append state abbreviation texts
    var stateCircles = chartGroup.selectAll()
        .data(censusData)
        .enter()
        .append("text")
        .text(d => (d.abbr))
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        .attr("y", d => yLinearScale(d[chosenYAxis]))
        .style("font-size", "10px")
        .style("font-weight", "lighter")
        .style("text-anchor", "middle");
     
    // Create group for axes labels
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);
  
    var obesityLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "obesity") // value to grab for event listener
        .classed("active", true)
        .text("Obesity Rate (%)");
  
    var healthcareLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "healthcare") // value to grab for event listener
        .classed("inactive", true)
        .text("Lacks Health Insurance (%)");

    var smokeLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "smokes") // value to grab for event listener
        .classed("inactive", true)
        .text("Smoker (%)");
  
    var incomeLabel = labelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", (margin.left/.5))
        .attr("y", 0 - (height + 110))
        .attr("value", "income") // value to grab for event listener
        .attr("dy", "1em")
        .classed("aText", true)
        .classed("active", true)
        .text("Median Household Income ($)");

   var povertyLabel = labelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", (margin.left/.5))
        .attr("y", 0 - (height + 90))
        .attr("value", "poverty") // value to grab for event listener
        .attr("dy", "1em")
        .classed("inactive", true)
        .text("Poverty Rate (%)");

    var ageLabel = labelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", (margin.left/.5))
        .attr("y", 0 - (height + 70))
        .attr("value", "age") // value to grab for event listener
        .attr("dy", "1em")
        .classed("inactive", true)
        .text("Age (Average)");
  
    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
  
    // Axes labels event listener
    labelsGroup.selectAll("text")
      .on("click", function() {
        // Get value of selection
        var value = d3.select(this).attr("value");
        // On x-axis selection
        if (true) {
            if (value === "obesity" || value === "healthcare" || value === "smokes") {
  
            // Replaces chosenXAxis with value
            chosenXAxis = value;
  
            // Functions here found above csv import
            // Updates x scale for new data
            xLinearScale = xScale(censusData, chosenXAxis);
  
            // Updates x-axis with transition
            xAxis = renderXAxes(xLinearScale, xAxis);
  
            // Updates circles with new x values
            circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);
  
            // Updates tooltips with new info
            circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

            // Updates state circles
            stateCircles = stateAbbr(stateCircles, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);
  
            // Changes classes to change bold text
            if (chosenXAxis === "obesity") {
                obesityLabel
                    .classed("active", true)
                    .classed("inactive", false);
                healthcareLabel
                    .classed("active", false)
                    .classed("inactive", true);
                smokeLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else if (chosenXAxis === "healthcare"){
                obesityLabel
                    .classed("active", false)
                    .classed("inactive", true);

                healthcareLabel
                    .classed("active", true)
                    .classed("inactive", false);

                smokeLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else {
                obesityLabel
                    .classed("active", false)
                    .classed("inactive", true);
                healthcareLabel
                    .classed("active", false)
                    .classed("inactive", true);
                smokeLabel
                    .classed("active", true)
                    .classed("inactive", false);
            }
        }

        // On y-axis selection
        else {
            chosenYAxis = value;

            yLinearScale = yScale(censusData, chosenYAxis);

            yAxis = renderYAxes(yLinearScale, yAxis);

            circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);

            circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

            stateCircles = stateAbbr(stateCircles, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);

            if (chosenYAxis === "income") {
                incomeLabel
                    .classed("active", true)
                    .classed("inactive", false);
                povertyLabel
                    .classed("active", false)
                    .classed("inactive", true);
                ageLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else if (chosenYAxis === "poverty"){
                incomeLabel
                    .classed("active", false)
                    .classed("inactive", true);

                povertyLabel
                    .classed("active", true)
                    .classed("inactive", false);

                ageLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else {
                incomeLabel
                    .classed("active", false)
                    .classed("inactive", true);
                povertyLabel
                    .classed("active", false)
                    .classed("inactive", true);
                ageLabel
                    .classed("active", true)
                    .classed("inactive", false);
            }
        }}
    });
  }).catch(function(error) {
    console.log(error);
});
  