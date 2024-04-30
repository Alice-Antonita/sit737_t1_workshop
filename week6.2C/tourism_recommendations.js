const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // Sample data for tourism recommendations
  const destinations = [
    {
      name: 'Paris',
      country: 'France',
      attractions: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise'],
      climate: 'Temperate'
    },
    {
      name: 'Kyoto',
      country: 'Japan',
      attractions: ['Kinkaku-ji', 'Fushimi Inari Shrine', 'Arashiyama Bamboo Grove'],
      climate: 'Temperate'
    },
    {
      name: 'Rio de Janeiro',
      country: 'Brazil',
      attractions: ['Christ the Redeemer', 'Copacabana Beach', 'Sugarloaf Mountain'],
      climate: 'Tropical'
    },
    {
      name: 'Cape Town',
      country: 'South Africa',
      attractions: ['Table Mountain', 'Robben Island', 'Cape Winelands'],
      climate: 'Mediterranean'
    }
  ];

  // Function to recommend destinations based on user preferences
  function recommendDestinations(userPreferences) {
    // Filter destinations based on climate preference
    let filteredDestinations = destinations.filter(destination => destination.climate === userPreferences.climate);

    // Filter destinations based on attractions
    if (userPreferences.attractions.length > 0) {
      filteredDestinations = filteredDestinations.filter(destination => {
        return userPreferences.attractions.every(attraction => destination.attractions.includes(attraction));
      });
    }

    return filteredDestinations;
  }

  // Example user preferences
  const userPreferences = {
    climate: 'Temperate',
    attractions: ['Eiffel Tower', 'Louvre Museum']
  };

  // Get recommendations
  const recommendations = recommendDestinations(userPreferences);

  // Send recommendations as response
  res.json({ recommendations });
});

const port = 3040;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});

