/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// create svg and with proper viewbox 
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// find max y value (score)
let maxY1 = d3.max(data1, function(d) { return d.score; });

// Scale function that map data values to pixel values (linear y)
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// Scale function that map data values to pixel values, 
// in this case using the range of the length of data as base (linear x) 
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// TODO: What does each line of this code do?  
svg1.append("g") // add a placeholder svg inside svg1
   .attr("transform", `translate(${margin.left}, 0)`) 
    // ^ moves axis to left margin of svg
   .call(d3.axisLeft(yScale1))  // calls built in d3 function that
                                // builds y axis off scale
   .attr("font-size", '20px');  // set font size

// TODO: What does each line of this code do? 
svg1.append("g") // add a placeholder svg inside svg1
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    // ^ moves axis to bottom of svg
    .call(d3.axisBottom(xScale1)    // calls built in d3 func that builds
                                    // x axis off of scale
            .tickFormat(i => data1[i].name))  
            // ^ sets the name of the tick on axis? since its a string
    .attr("font-size", '20px'); // set font size

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
const tooltip1 = d3.select("#hard-coded-bar") // selects all svgs with id
                .append("div") // preps for adding to div
                .attr('id', "tooltip1") // adds id to svg called tooltip1
                .style("opacity", 0)  // sets style to opacity = 0
                .attr("class", "tooltip"); // sets clas to svg called tooltip

// TODO: What does each line of this code do?  
const mouseover1 = function(event, d) { // creates a function based off of event and data (mouseover)
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") // adds text to tooltip1
          .style("opacity", 1);  // sets opacity = 1 (can be seen)
}

// TODO: What does each line of this code do? 
const mousemove1 = function(event, d) { // creates a function based off of event and data (mouse moving)
  tooltip1.style("left", (event.x)+"px") //  UNSURE
          .style("top", (event.y + yTooltipOffset) +"px"); // UNSURE
}

// TODO: What does this code do? 
const mouseleave1 = function(event, d) { // creates a function based off of event and data (mouse leaving)
  tooltip1.style("opacity", 0); // set opacity of tooltip back to 0 (cant be seen)
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 

svg1.selectAll(".bar") // selects the bars
   .data(data1) // assigns the const data to the bars
   .enter()  // creates placeholder element for all of the data that arent yet associated with an element
   .append("rect") // add rect at each placeholder
     .attr("class", "bar") // add class = bar to these attributes
     .attr("x", (d,i) => xScale1(i)) // assign horizontal position of bar by scaling
     .attr("y", (d) => yScale1(d.score)) // assign vertical postiion of bar by scaling
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) // assign height of bar using score and scaling
     .attr("width", xScale1.bandwidth()) // assign width of bar using equal scaler
     .on("mouseover", mouseover1) // calls funct when event happens to the bar
     .on("mousemove", mousemove1) // calls funct when event happens to the bar
     .on("mouseleave", mouseleave1); // calls funct when event happens to the bar

// create new svg and with proper viewbox 
const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]); 

  d3.csv("data/barchart.csv").then((data) => {

  // find max y value (score)
  let maxY2 = d3.max(data, function(d) { return d.score; });

  // Scale function that map data values to pixel values (linear y)
  let yScale2 = d3.scaleLinear()
              .domain([0,maxY2])
              .range([height-margin.bottom,margin.top]); 

  // Scale function that map data values to pixel values, 
  // in this case using the range of the length of data as base (linear x) 
  let xScale2 = d3.scaleBand()
              .domain(d3.range(data.length))
              .range([margin.left, width - margin.right])
              .padding(0.1); 

  // TODO: What does each line of this code do?  
  svg2.append("g") // add a placeholder svg inside svg1
    .attr("transform", `translate(${margin.left}, 0)`) 
      // ^ moves axis to left margin of svg
    .call(d3.axisLeft(yScale2))  // calls built in d3 function that
                                  // builds y axis off scale
    .attr("font-size", '20px');  // set font size

  // TODO: What does each line of this code do? 
  svg2.append("g") // add a placeholder svg inside svg1
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      // ^ moves axis to bottom of svg
      .call(d3.axisBottom(xScale2)    // calls built in d3 func that builds
                                      // x axis off of scale
              .tickFormat(i => data[i].name))  
              // ^ sets the name of the tick on axis? since its a string
      .attr("font-size", '20px'); // set font size

  // create second tooltop
  const tooltip2 = d3.select("#csv-bar") // selects all svgs with id
                  .append("div") // preps for adding to div
                  .attr('id', "tooltip2") // adds id to svg called tooltip1
                  .style("opacity", 0)  // sets style to opacity = 0
                  .attr("class", "tooltip"); // sets class to svg called tooltip

  // SECOND EVENT WATCHERS 
  const mouseover2 = function(event, d) { // creates a function based off of event and data (mouseover)
    tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") // adds text to tooltip1
            .style("opacity", 1);  // sets opacity = 1 (can be seen)
  }

  // TODO: What does each line of this code do? 
  const mousemove2 = function(event, d) { // creates a function based off of event and data (mouse moving)
    tooltip2.style("left", (event.pageX)+"px") //  UNSURE
            .style("top", (event.pageY + yTooltipOffset) +"px"); // UNSURE
  }

  // TODO: What does this code do? 
  const mouseleave2 = function(event, d) { // creates a function based off of event and data (mouse leaving)
    tooltip2.style("opacity", 0); // set opacity of tooltip back to 0 (cant be seen)
  }

  console.log(data);
  svg2.selectAll(".bar") // Select all bars in SVG
  .data(data)        
  .enter()            
    .append("rect") // add rect at each placeholder
    .attr("class", "bar") // add class = bar to these attributes
    .attr("x", (d,i) => xScale2(i)) // assign horizontal position of bar by scaling
    .attr("y", (d) => yScale2(d.score)) // assign vertical postiion of bar by scaling
    .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) // assign height of bar using score and scaling
    .attr("width", xScale1.bandwidth()) // assign width of bar using equal scaler
    .on("mouseover", mouseover2) // calls funct when event happens to the bar
    .on("mousemove", mousemove2) // calls funct when event happens to the bar
    .on("mouseleave", mouseleave2); // calls funct when event happens to the bar

})