const { log } = require('console');
const express = require('express')
const router = express.Router();
const fs = require('fs').promises;
const dataFilePath = './data/favorites.json';


fs.access(dataFilePath)
  .catch(() => fs.writeFile(dataFilePath, '[]'));

  router.post('/addfav', async (req, res) => {
    const { movieId } = req.body;
  
    // Load the current favorites from the JSON file
    const favorites = JSON.parse(await fs.readFile(dataFilePath));
  
    // Check if the movieId is already in the favorites
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
  
      // Save the updated favorites to the JSON file
      await fs.writeFile(dataFilePath, JSON.stringify(favorites));
  
      return res.json({ message: `Added movie ID ${movieId} to favorites.` });
    } else {
      return res.json({ message: `Movie ID ${movieId} is already in favorites.` });
    }
  });

  // API route to get favorite movie IDs
router.get('/favmovies', async (req, res) => {
    try {
      // Load the current favorites from the JSON file
      const favorites = JSON.parse(await fs.readFile(dataFilePath));
      return res.json({ favoriteMovies: favorites });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // API route to remove a favorite movie ID
router.delete('/removefav/:movieId', async (req, res) => {
    const { movieId } = req.params;
    console.log(movieId);
  
    // Load the current favorites from the JSON file
    const favorites = JSON.parse(await fs.readFile(dataFilePath));
  
    // Find the index of the movieId in the favorites array
    const index = favorites.indexOf(movieId);
  
    if (index !== -1) {
      // Remove the movieId from the favorites array
      favorites.splice(index, 1);
  
      // Save the updated favorites to the JSON file
      await fs.writeFile(dataFilePath, JSON.stringify(favorites));
  
      return res.json({ message: `Removed movie ID ${movieId} from favorites.` });
    } else {
      return res.json({ message: `Movie ID ${movieId} is not in favorites.` });
    }
  });
  

module.exports = router;