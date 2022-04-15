const router = require("express").Router();

const animeValidation = require("../validation").animeValidation;

const Anime = require("../models").animeModel;

router.use((req, res, next) => {
  console.log("A request is coming in to anime.js");
  next();
});

router.get("/", (req, res) => {
  Anime.find({})
    .then((anime) => {
      res.send(anime);
    })
    .catch(() => {
      res.send("Error");
    });
});

router.post("/uploadEpisode", async (req, res) => {
  let { link, title } = req.body;
  if (req.user.isMember()) {
    return res.send("only Admin can upload an episode");
  }
  try {
    let anime = await Anime.findOne({ title });
    anime.episode.push(link);
    await anime.save();
    res.send("success");
  } catch (err) {
    res.send(err);
  }
});

router.get("/video/:one", (req, res) => {
  let { one } = req.params;
  Anime.find({ engName: one })
    .then((anime) => {
      res.send(anime);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/", async (req, res) => {
  const { error } = animeValidation(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }

  if (req.user.isMember()) {
    return res.send("only Admin can post an anime");
  }

  let { title, engName, img, year, genre, director, agent, producer, intro } =
    req.body;

  let newAnime = new Anime({
    title,
    engName,
    img,
    year,
    genre,
    director,
    agent,
    producer,
    intro,
  });

  try {
    const foundAnime = await Anime.findOne({ title });
    if (foundAnime) {
      res.send("已經存在");
    } else {
      const saveAnime = await newAnime.save();
      res.send("新增動畫");
    }
  } catch (error) {
    res.send(error);
  }
});

router.delete("/video/deleteOne", async (req, res) => {
  let { link } = req.query;
  if (req.user.isMember()) {
    return res.send("only Admin can delete an episode");
  }

  try {
    let anime = await Anime.findOne({ episode: link });
    anime.episode.pull(link);
    await anime.save();
    res.send("success");
  } catch (err) {
    res.send(err);
  }
});

router.post("/click", async (req, res) => {
  let { user_id, title } = req.body;
  try {
    if (req.user.id === user_id) {
      let anime = await Anime.findOne({ title });
      anime.view.addToSet(user_id);
      await anime.save();
    } else {
      res.send("資料遭到串改");
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
