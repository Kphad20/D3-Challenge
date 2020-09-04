# D3-Challenge

The task is to analyze the current trends shaping people's lives with data on the health risks facing particular demographics, as well as creating charts, graphs, and interactive elements to help readers understand findings. Information is gathered from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System. The data set included with the assignment is based on 2014 ACS 1-year estimates: https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml. The current data set includes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

## Task - Core Assignment: D3 Dabbler
Create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age.
Using the D3 techniques, create a scatter plot that represents each state with circle elements. Code this graphic in the app.js file of the homework directory—make sure to pull in the data from data.csv by using the d3.csv function. 

-Include state abbreviations in the circles.
<br/>-Create and situate the axes and labels to the left and bottom of the chart.
<br/>-Use python -m http.server to run the visualization.

## Impress the Boss (Bonus)
1. More Data, More Dynamics
Include more demographics and more risk factors. Place additional labels in the scatter plot and give them click events so that users can decide which data to display. Animate the transitions for the circles' locations as well as the range of the axes. Do this for two risk factors for each axis. Or, for an extreme challenge, create three for each axis.

2. Incorporate d3-tip
While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. Add tooltips to the circles and display each tooltip with the data that the user has selected. Use the d3-tip.js plugin developed by Justin Palmer—this plugin is included in the assignment directory.