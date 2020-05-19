
function buildChart(sample) {
    // Use D3 fetch to read the JSON file// Use D3 fetch to read the JSON file
    d3.json("data/samples.json").then((importedData) => {
        console.log(importedData)
        // Begin defining variables from data for horizontal bar chart
        var sampleValues = importedData.samples;
            console.log(sampleValues);
        var filterSample = sampleValues.filter(sampleNum => sampleNum.id == sample)
        var filterNum = filterSample[0]

        var otuIds = filterNum.otu_ids;
            console.log(otuIds);            
        var otuLabels = filterNum.otu_labels;
            console.log(otuLabels)
        // Slice data to get top 10 sampleValues
        var sampleTop = filterNum.sample_values;
            console.log(sampleTop)
        // Slice data to get top 10 otu labels
        var otuLabelTop = otuIds.slice(0,10).reverse();
            console.log(otuLabelTop)
        // Slice data to get top otu ids
        var otuIdTop = otuIds.slice(0,10).reverse();
            console.log(otuIdTop)
        // Add "OTU" to otu_ids for bar chart
        var otuFinal = otuIdTop.map(d => "OTU " + d);
            console.log(otuFinal);
        // Create the trace for bar chart
        var trace1 = {
            x: sampleTop,
            y: otuFinal,
            text: otuLabelTop,
            orientation: "h",
            type: "bar"
        }
        // Create data array for the plot
        var barData = [trace1]
        // Define the plot layout for bar chart
        var layout = {
            title: "Top 10 OTUs",
            xaxis: { title: "Sample Values"},
            yaxis: { title: "OTU IDs"},
            margin: {t: 35, l: 100}
        }
        // Plot the bar chart
        Plotly.newPlot("bar", barData, layout);
//      // Bubble Chart
//      // Create the trace for bubble chart
        var bubble = {
            x: otuIds,
            y: sampleTop,
            text: otuLabels,
            mode: 'markers',
            marker: {
                size: sampleTop,
                color: otuIds,
                colorscale: "Portland"
            }
        };
        // Create data array for the plot
        var bubbleData = [bubble]
       // Define the plot layout for the bubble chart
       var layoutBubble = {
           title: "Bacteria Per Samples",
           xaxis: { title: "OTU ID"},
           margin: {t: 50},
           hovermode: "closest"

       }
        // Plot the bubble
        Plotly.newPlot("bubble", bubbleData, layoutBubble);
    }

    )};

function buildMetadata(sample) {
    d3.json("data/samples.json").then((importedData) => {    
    var metadata = importedData.metadata
        var filteredData = metadata.filter(sampleNum => sampleNum.id == sample);
        var filteredNum = filteredData[0]
        // Select demographic
        var PANEL = d3.select("#sample-metadata");
        // Clear the info 
        PANEL.html("");
        Object.entries(filteredNum).forEach(function ([key, value]) {
            var row = PANEL.append("h5");
            row.text(`${key}:${value}`);
            })     
        })
    };


function init() {
    var selector = d3.select("#selDataset");
    
    d3.json("data/samples.json").then((importedData) => {
        var dataNames = importedData.names
        dataNames.forEach((dataName) => selector.append("option")
            .text(dataName)
            .property("value", dataName))
        var firstValue = dataNames[0]
        buildChart(firstValue);
        buildMetadata(firstValue);
    });

        
};

    function optionChanged(valueChange) {
        buildChart(valueChange);
        buildMetadata(valueChange);
    }
    
  

init();
