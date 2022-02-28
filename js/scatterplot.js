/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

// create new svg and with proper viewbox 
const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]); 

  d3.csv("data/scatter.csv").then((data3) => {

    let maxX3 = d3.max(data3, (d) => { return d.x; });
    console.log("Max x: ", + maxX3)
    
    let maxY3 = d3.max(data3, (d) => { return d.y; });
    console.log("Max y: ", + maxY3)
    
    let xScale3 = d3.scaleLinear()
                .domain([0, maxX3])
                .range([margin.left, width - margin.right])
    
    let yScale3 = d3.scaleLinear()
                .domain([0, maxY3])
                .range([height - margin.bottom, margin.top])

  // TODO: What does each line of this code do?  
  svg3.append("g") // add a placeholder svg inside svg1
    .attr("transform", `translate(${margin.left}, 0)`) 
      // ^ moves axis to left margin of svg
    .call(d3.axisLeft(yScale3))  // calls built in d3 function that
                                  // builds y axis off scale
    .attr("font-size", '20px');  // set font size

  // TODO: What does each line of this code do? 
  svg3.append("g") // add a placeholder svg inside svg1
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      // ^ moves axis to bottom of svg
      .call(d3.axisBottom(xScale3)    // calls built in d3 func that builds
                                      // x axis off of scale
              .tickFormat(i => data3[i].name))  
              // ^ sets the name of the tick on axis? since its a string
      .attr("font-size", '20px'); // set font size

  // create third tooltop
  const tooltip3 = d3.select("#csv-scatter") // selects all svgs with id
                  .append("div") // preps for adding to div
                  .attr('id', "tooltip3") // adds id to svg called tooltip1
                  .style("opacity", 0)  // sets style to opacity = 0
                  .attr("class", "tooltip"); // sets class to svg called tooltip

  // THIRD EVENT WATCHERS 
  const mouseover3 = function(event, d) { // creates a function based off of event and data (mouseover)
    tooltip3.html("Name: " + d.name + "<br> Day: " + d.score + "<br>") // adds text to tooltip1
            .style("opacity", 1);  // sets opacity = 1 (can be seen)
  }

  // TODO: What does each line of this code do? 
  const mousemove3 = function(event, d) { // creates a function based off of event and data (mouse moving)
    tooltip3.style("left", (event.pageX)+"px") //  UNSURE
            .style("top", (event.pageY + yTooltipOffset) +"px"); // UNSURE
  }

  // TODO: What does this code do? 
  const mouseleave3 = function(event, d) { // creates a function based off of event and data (mouse leaving)
    tooltip3.style("opacity", 0); // set opacity of tooltip back to 0 (cant be seen)
  }

  console.log(data3);
  svg3.selectAll("circle") // Select all bars in SVG
    .data(data3)        
    .enter()            
      .append("circle")
      .attr("cx", (d) => { return d.x; })
      .attr("cy", (d) => { return d.y; })
      .attr("r", 5)
      .attr("fill", (d) => { return d.color; })
      .on("mouseover", mouseover3) // calls funct when event happens to the bar
      .on("mousemove", mousemove3) // calls funct when event happens to the bar
      .on("mouseleave", mouseleave3); // calls funct when event happens to the bar

})





