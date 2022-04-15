const router = require("express").Router();
const Comment = require("../models").commentModel;

router.use((req, res, next) => {
  console.log("A request is coming in to comment.js");
  next();
});

router.get("/getComment", (req, res) => {
  let { episode } = req.query;
  Comment.find({ episode })
    .populate("user", ["username", "picture"])
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/getReply", (req, res) => {
  let { episode } = req.query;
  Comment.find({ episode, type: ["reply", "delete"] })
    .populate("user", ["username", "picture"])
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/comment", async (req, res) => {
  let { comment, episode, type } = req.body;
  let newComment = new Comment({
    user: req.user._id,
    comment,
    episode,
    type,
  });
  try {
    const saveComment = await newComment.save();
    res.send("新增留言");
  } catch (error) {
    res.send(error);
  }
});

router.post("/reply", async (req, res) => {
  let { comment, replyTo } = req.body;

  let newComment = {
    user: {
      _id: req.user._id,
      username: req.user.username,
      picture: req.user.picture,
    },
    comment,
    like: [],
    dislike: [],
    date: Date.now(),
  };

  try {
    let findComment = await Comment.findOne({ _id: replyTo });
    findComment.reply.push(newComment);
    await findComment.save();
    res.send(findComment);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/thumbs", async (req, res) => {
  let { _id, thumb, user_id, type } = req.body;
  try {
    let comment = await Comment.findOne({ _id });
    if (type === "comment") {
      if (req.user.id !== user_id) {
        res.send("資料遭到串改");
      }
      if (thumb === "like") {
        comment.like.addToSet(req.user.id);
        comment.dislike.pull(req.user.id);
        await comment.save();
        res.send("成功");
      } else {
        comment.dislike.addToSet(req.user.id);
        comment.like.pull(req.user.id);
        await comment.save();
        res.send("成功");
      }
    } else {
      if (thumb === "like") {
        if (!comment.reply[type].like.includes(req.user.id)) {
          comment.reply[type].like.push(req.user.id);
          let dislikeArr = comment.reply[type].dislike;
          for (let i = 0; i < dislikeArr.length; i++) {
            if (dislikeArr[i] === req.user.id) {
              dislikeArr.splice(i, 1);
              break;
            }
          }
          comment.markModified("reply");
          await comment.save();
          res.send("成功");
        }
      } else {
        if (!comment.reply[type].dislike.includes(req.user.id)) {
          comment.reply[type].dislike.push(req.user.id);
          let likeArr = comment.reply[type].like;
          for (let i = 0; i < likeArr.length; i++) {
            if (likeArr[i] === req.user.id) {
              likeArr.splice(i, 1);
              break;
            }
          }
          comment.markModified("reply");
          await comment.save();
          res.send("成功");
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.patch("/cancelthumb", async (req, res) => {
  let { _id, thumb, user_id, type } = req.body;
  try {
    if (req.user.id !== user_id) {
      res.send("資料遭到串改");
    }
    let comment = await Comment.findOne({ _id });

    if (type === "comment") {
      if (thumb === "like") {
        comment.like.pull(req.user.id);
        await comment.save();
        res.send("成功");
      } else {
        comment.dislike.pull(req.user.id);
        await comment.save();
        res.send("成功");
      }
    } else {
      if (thumb === "like") {
        let likeArr = comment.reply[type].like;
        for (let i = 0; i < likeArr.length; i++) {
          if (likeArr[i] === req.user.id) {
            likeArr.splice(i, 1);
            break;
          }
        }
        comment.markModified("reply");
        await comment.save();
        res.send("成功");
      } else {
        let dislikeArr = comment.reply[type].dilike;
        for (let i = 0; i < dislikeArr.length; i++) {
          if (dislikeArr[i] === req.user.id) {
            dislikeArr.splice(i, 1);
            break;
          }
        }
        comment.markModified("reply");
        await comment.save();
        res.send("成功");
      }
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.delete("/comment", async (req, res) => {
  let { _id, user_id, type } = req.query;
  if (req.user.id !== user_id) {
    res.send("資料遭到串改");
  }
  try {
    let comment = await Comment.findOne({ _id });
    if (type === "comment") {
      Comment.deleteOne({ _id })
        .then((res) => {
          res.send("成功");
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      comment.reply[type].comment = null;
      comment.markModified("reply");
      comment.save();
      res.send("成功");
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
