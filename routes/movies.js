const express = require('express')
const axios = require('axios')
const router = express.Router();

router.post('/search',async (req,res)=>{
    var searchTerm = req.body.search;
        axios.get(
            `http://www.omdbapi.com/?apikey=a5de3980&s=${searchTerm}`
        )
        .then((response)=>{
            const data = response.data;
            res.send(data)
            // setMovies({ ...movies, data });
            // setLoading(true)
        })
        .catch((error)=>{
            console.error("Error fetching data:", error);
        })
    })

module.exports = router;