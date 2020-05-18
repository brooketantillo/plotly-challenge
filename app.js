
function init(i) {
    // Use D3 fetch to read the JSON file// Use D3 fetch to read the JSON file
    d3.json("data/samples.json").then((importedData) => {
        console.log(importedData)
        // Begin defining variables from data for horizontal bar chart
        var sampleValues = importedData.samples[0].sample_values;
            console.log(sampleValues);
        var otuIds = importedData.samples[0].otu_ids;
            console.log(otuIds);            
        var otuLabels = importedData.samples[0].otu_labels;
            console.log(otuLabels)
        // Slice data to get top 10 sampleValues
        var sampleTop = sampleValues.slice(0,10).reverse();
            console.log(sampleTop)
        // Slice data to get top 10 otu labels
        var otuLabelTop = otuLabels.slice(0,10).reverse();
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
            yaxis: { title: "OTU IDs"}
        }
        // Plot the bar chart
        Plotly.newPlot("bar", barData, layout);
//      // Bubble Chart
//      // Create the trace for bubble chart
        var bubble = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: otuIds,
                colorscale: "Portland"
            }
        };
        // Create data array for the plot
        var bubbleData = [bubble]
       // Define the plot layout for the bubble chart
       var layoutBubble = {
           title: "Bacteria Per Samples",
           xaxis: { title: "OTU ID"}
       }
        // Plot the bubble
        Plotly.newPlot("bubble", bubbleData, layoutBubble);

         // Dropdown menu
        // Define variable
        var metadata = importedData.metadata[i];
        var names = importedData.names;
        var dropDownMenu = d3.select("#selDataset")
        for (i in names ) {
            var newName = dropDownMenu.append("option")
            newName.text(names[i]);
        }

        
        // Select demographic
        var panel = d3.select("#sample-metadata");
        // Clear the info 
        panel.html("");
        Object.entries(metadata).forEach(function ([key, value]) {
            var row = panel.append("p")
            row.text(`${key}:${value}`)
            })     
    
    });
}
    function optionChanged(d) {
        d3.json("data/samples.json").then((importedData) => {
            console.log(importedData)
    
            var names = importedData.names;
            const isNumber = (element) => element === d;
            var indx = (names.findIndex(isNumber));
            d3.selectAll("td").remove();
            d3.selectAll("option").remove();
            var dropDownMenu = d3.select("#selDataset")
            dropDownMenu.append("option").text(d);
            init(indx);
        });
    }
init(0);