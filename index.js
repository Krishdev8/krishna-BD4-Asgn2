const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

const app = express();
const port = 3000;
app.use(cors());

app.use(express.static('static'));

let db;

(async () => {
  db = await open({
    filename: './BD4_Asgn2/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Exercise 1: Get All Games
async function fetchAllGames() {
  let query = 'SELECT * FROM games';
  let response = await db.all(query, []);

  return { games: response };
}

app.get('/games', async (req, res) => {
  try {
    let results = await fetchAllGames();
    if (results.games.length === 0) {
      return res.status(404).json({ message: 'No games were found.' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Exercise 2: Get Game by ID
async function fetchAllGamesById(id) {
  let query = 'SELECT * FROM games WHERE id = ?';
  let response = await db.all(query, [id]);

  return { games: response };
}

app.get('/games/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await fetchAllGamesById(id);
    if (results.games.length === 0) {
      return res
        .status(404)
        .json({ message: 'No games were found for given id: ' + id });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Exercise 3: Get Games by Genre
async function fetchAllGamesByGenre(genre) {
  let query = 'SELECT * FROM games WHERE genre = ?';
  let response = await db.all(query, [genre]);

  return { games: response };
}

app.get('/games/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  try {
    let results = await fetchAllGamesByGenre(genre);
    if (results.games.length === 0) {
      return res
        .status(404)
        .json({ message: 'No games were found for given genre: ' + genre });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Exercise 4: Get Games by Platform
async function fetchAllGamesByPlatform(platform) {
  let query = 'SELECT * FROM games WHERE platform  = ?';
  let response = await db.all(query, [platform]);

  return { games: response };
}

app.get('/games/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let results = await fetchAllGamesByPlatform(platform);
    if (results.games.length === 0) {
      return res.status(404).json({
        message: 'No games were found for given platform : ' + platform,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//Exercise 5: Get Games Sorted by Rating
async function fetchAllSortedGamesByRating() {
  let query = 'SELECT * FROM games ORDER BY rating DESC';
  let response = await db.all(query, []);

  return { games: response };
}

app.get('/games/sort-by-rating', async (req, res) => {
  try {
    let results = await fetchAllSortedGamesByRating();
    if (results.games.length === 0) {
      return res.status(404).json({ message: 'No games were found.' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Exercise 6: Get All Players
async function fetchAllPlayers() {
  let query = 'SELECT * FROM players';
  let response = await db.all(query, []);

  return { players: response };
}

app.get('/players', async (req, res) => {
  try {
    let results = await fetchAllPlayers();
    if (results.players.length === 0) {
      return res.status(404).json({ message: 'No players were found.' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Exercise 7: Get Player by ID
async function fetchAllPlayersById(id) {
  let query = 'SELECT * FROM players WHERE id = ?';
  let response = await db.all(query, [id]);

  return { players: response };
}

app.get('/players/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let results = await fetchAllPlayersById(id);
    if (results.players.length === 0) {
      return res
        .status(404)
        .json({ message: 'No players found with this id: ' + id });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Exercise 8: Get Players by Platform
async function fetchAllPlayersByPlatform(platform) {
  let query = 'SELECT * FROM players WHERE platform = ?';
  let response = await db.all(query, [platform]);

  return { players: response };
}

app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let results = await fetchAllPlayersByPlatform(platform);
    if (results.players.length === 0) {
      return res
        .status(404)
        .json({ message: 'No players found with this platform: ' + platform });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Exercise 9: Get Players Sorted by Rating

async function sortPlayersByRating() {
  let query = 'SELECT * FROM players ORDER BY rating DESC';
  let response = await db.all(query, []);

  return { players: response };
}

app.get('/players/sort-by-rating', async (req, res) => {
  try {
    let results = await sortPlayersByRating();
    if (results.players.length === 0) {
      return res.status(404).json({ message: 'No players were found.' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Exercise 10: Get All Tournaments
async function fetchAllTournaments() {
  let query = 'SELECT * FROM tournaments';
  let response = await db.all(query, []);

  return { tournaments: response };
}

app.get('/tournaments', async (req, res) => {
  try {
    let results = await fetchAllTournaments();
    if (results.tournaments.length === 0) {
      return res.status(404).json({ message: 'No tournaments were found.' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Exercise 11: Get Tournament by ID
async function fetchTournamentsById(id) {
  let query = 'SELECT * FROM tournaments WHERE id = ?';
  let response = await db.all(query, [id]);

  return { tournaments: response };
}

app.get('/tournaments/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let results = await fetchTournamentsById(id);
    if (results.tournaments.length === 0) {
      return res
        .status(404)
        .json({ message: 'No tournaments were found for this id: ' + id });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Exercise 12: Get Tournaments by Game ID
async function fetchTournamentsByGameId(gameId) {
  let query = 'SELECT * FROM tournaments WHERE gameId = ?';
  let response = await db.all(query, [gameId]);

  return { tournaments: response };
}

app.get('/tournaments/game/:gameId', async (req, res) => {
  let gameId = req.params.gameId;
  try {
    let results = await fetchTournamentsByGameId(gameId);
    if (results.tournaments.length === 0) {
      return res.status(404).json({
        message: 'No tournaments were found for this gameId: ' + gameId,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Exercise 13: Get Tournaments Sorted by Prize Pool
async function sortTournamentsByPrizePool() {
  let query = 'SELECT * FROM tournaments ORDER BY prizePool DESC';
  let response = await db.all(query, []);

  return { tournaments: response };
}

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    let results = await sortTournamentsByPrizePool();
    if (results.tournaments.length === 0) {
      return res.status(404).json({ message: 'No tournaments were found.' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
