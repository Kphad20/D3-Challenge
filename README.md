# D3

The task is to analyze the current trends shaping people's lives with data on the health risks facing particular demographics, as well as creating charts, graphs, and interactive elements to help readers understand findings. Information is gathered from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System. The data set included with the assignment is based on 2014 [ACS](https://data.census.gov/cedsci/profile?g=0100000US) 1-year estimates. The current data set includes data on rates of income, obesity, poverty, etc. by state.

## Task - Core Assignment: D3 Dabbler
I will create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age. Using the D3 techniques, I will create a scatter plot that represents each state with circle elements. 

1. I will include state abbreviations in the circles.
2. Create and situate the axes and labels to the left and bottom of the chart.
3. Use "python -m http.server" to run the visualization and host the page at localhost:8000 in the web browser. 

## Dig Deeper: More Data
1. More Data, More Dynamics

Here, I will include more demographics and more risk factors. I will place additional labels in the scatter plot and give them click events so that users can decide which data to display. I will then animate the transitions for the circles' locations as well as the range of the axes. I will do this for three risk factors for each axis. 

2. Incorporate d3-tip

While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. To do this, I will add tooltips to the circles and display each tooltip with the data that the user has selected. 