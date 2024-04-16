class Start extends Scene {
    create() {

        // Access a string
        console.log(this.engine.storyData);
        const key1 = "Credits";
        console.log(this.engine.storyData[key1]);
        console.log(this.engine.storyData.Credits);

        // Variable Keys
        //const key2 = "Beyond";
        //console.log(this.engine.storyData.Locations[key2].Body);

        // Variable Array
        //console.log(this.engine.storyData.Locations.Kresge.Choices[0]["Text"]);

        this.engine.setTitle(this.engine.storyData["Title"]); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.show(this.engine.storyData["Start"]);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData["InitialLocation"]); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = key; // TODO: use `key` to get the data object for the current story location
        if(this.engine.storyData.GameWorldItem[2].Value == 1 && locationData == "Fancy Restaurant"){
            this.engine.show(this.engine.storyData.Locations[locationData].Body2 + "<br><br>"); // TODO: replace this text by the Body of the location data
        }else if(this.engine.storyData.GameWorldItem[1].Value == 1 && locationData == "Hotel"){
            this.engine.show(this.engine.storyData.Locations[locationData].Body2 + "<br><br>"); // TODO: replace this text by the Body of the location data
        }
        else{
            this.engine.show(this.engine.storyData.Locations[locationData].Body + "<br><br>"); // TODO: replace this text by the Body of the location data
        }
        if(!(this.engine.storyData.Locations[locationData].Choices === undefined)) { // TODO: check if the location has any Choices
            let len = (this.engine.storyData.Locations[locationData].Choices).length;
            for(let x = 0; x < len; x++) { // TODO: loop over the location's Choices
                const locData = this.engine.storyData.Locations[locationData].Choices[x];
                //if(locData.Value != 0){
                    this.engine.addChoice(locData.Text, locData); // TODO: use the Text of the choice
                //}
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
            let len1 = (this.engine.storyData.GameWorldItem).length;
            for(let y = 0; y < len1; y++) { // TODO: loop over the location's Choices
                const locData = this.engine.storyData.GameWorldItem[y];
                console.log(locData.InitailItemLocation);
                if(locData.Value != 0 || locData.InitailItemLocation == locationData){
                    locData.Target = locationData;
                    if(locData.Value == 0){
                        this.engine.addChoice(locData.TextPre, locData);
                    }else if(!(locData.Value > 0 && locData.Usage == 1)){
                        this.engine.addChoice(locData.Text, locData);
                    }
                }
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }

            
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        this.engine.show("&gt; "+choice.Text);
        //if choice is an item and not equiped, equipt for future reference
        if(choice.Value == 0 | choice.Value == 1){
            choice.Value = 1;
            this.engine.show(choice.Use);
        }
        if(choice) {
            this.engine.gotoScene(Location, choice.Target);
        }
        else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');