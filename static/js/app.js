


d3.json("samples.json").then(function(data) {

    console.log(data);
  });



//Loads the HTML dropdown 'selDataset with the the test subjects
d3.json("../samples.json").then(function(data) {
    var select = document.getElementById("selDataset");

    for(i=0; i<=data.samples.length; i++){
    option = document.createElement('option');
    option.text = option.value = data.samples[i].id;
    select.add(option, 0);  
    }
});


// //Creates default plots
d3.json("samples.json").then(function(data) {
    for(i=0; i<=data.samples.length; i++){
            if(data.samples[i].id==940){
                var values = Object.values(data.samples[i].sample_values);
                var labels = Object.values(data.samples[i].otu_ids);
                var hovertext = Object.values(data.samples[i].otu_labels);

                var top_ten_values =values.slice(0,10)
                var top_ten_labels =labels.slice(0,10);
                var top_ten_hovertext = hovertext.slice(0,10)
                var top_ten_labels_string = top_ten_labels.map(i => 'OTU '+ i)


                var ethnicity = data.metadata[i].ethnicity;
                var gender = data.metadata[i].gender;
                var age = data.metadata[i].age;
                var location = data.metadata[i].location;
                var bbtype = data.metadata[i].bbtype;
                var wfreq = data.metadata[i].wfreq;


                
        console.log(top_ten_values);
        console.log(top_ten_labels_string);
        console.log(top_ten_hovertext);

        //bar chart
        let trace1 = {
          x: top_ten_values,
          y: top_ten_labels_string,
          text: top_ten_hovertext,          
          orientation: 'h',
          type: 'bar'
          
        };
        
        let data1 = [trace1];
        
        
        Plotly.newPlot("bar", data1);

        //bubble chart
        let trace2 = {
            x: labels,
            y: values,
            text: hovertext,
            mode: 'markers',
            marker: {
                color:labels,
                size: values
            },
           
            
          };
          
          let data2 = [trace2];
        
          
          Plotly.newPlot("bubble", data2);

          document.getElementById("sample-metadata").innerHTML += 
              "<p>"+
              "Id: "+940+"</br>"+
              "Ethnicity: "+ethnicity+"</br>"+
              "Gender: "+gender+"</br>"+
              "Age: "+age+"</br>"+
              "Location: "+location+"</br>"+
              "BBtype: "+bbtype+"</br>"+
              "Wfreq: "+wfreq+"</br>"+
              "</p>";

                                

            }
        }
    });


// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);


// Function called by DOM changes
function getData() {
d3.json("samples.json").then(function(data) {
    console.log("test")

    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

    document.getElementById("sample-metadata").innerHTML = "";

    for(i=0; i<=data.samples.length; i++){
        if(data.samples[i].id==dataset){
            var values = Object.values(data.samples[i].sample_values);
            var labels = Object.values(data.samples[i].otu_ids);
            var hovertext = Object.values(data.samples[i].otu_labels);

            var top_ten_values =values.slice(0,10)
            var top_ten_labels =labels.slice(0,10);
            var top_ten_hovertext =hovertext.slice(0,10)
            var top_ten_labels_string = top_ten_labels.map(i => 'OTU '+ i)

            var ethnicity = data.metadata[i].ethnicity;
            var gender = data.metadata[i].gender;
            var age = data.metadata[i].age;
            var location = data.metadata[i].location;
            var bbtype = data.metadata[i].bbtype;
            var wfreq = data.metadata[i].wfreq;


    console.log(top_ten_values);
    console.log(top_ten_labels_string);
    console.log(top_ten_hovertext);


    updatePlotly(top_ten_values,top_ten_labels_string,top_ten_hovertext, values, labels, hovertext);

    document.getElementById("sample-metadata").innerHTML += 
              "<p>"+
              "Id: "+dataset+"</br>"+
              "Ethnicity: "+ethnicity+"</br>"+
              "Gender: "+gender+"</br>"+
              "Age: "+age+"</br>"+
              "Location: "+location+"</br>"+
              "BBtype: "+bbtype+"</br>"+
              "Wfreq: "+wfreq+"</br>"+
              "</p>";


}
    }

});
}
    



// Update the restyled plot's values
function updatePlotly(xdata,ydata,textdata, values, labels, hover) { 
    
  
    Plotly.restyle("bar", "x", [xdata]);
  Plotly.restyle("bar", "y", [ydata]);
  Plotly.restyle("bar", "text", [textdata]);

  Plotly.restyle("bubble", "x", [labels]);
  Plotly.restyle("bubble", "y", [values]);
  Plotly.restyle("bubble", "text", [hover]);



}


