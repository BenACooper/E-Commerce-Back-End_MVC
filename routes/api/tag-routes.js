const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagData = await Tag.findAll({
      include: Product,
    });
    res.status(200).json(allTagData);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      err: "Oopsie woopsie! We lost all the tagData.",
    });
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
 try {
  const idTagData = await Tag.findByPk( req.params.id, {
    include: Product,
  });
  res.status(200).json(idTagData);
 } catch (err) {
  console.error(err);
  res.status(500).json({ err: "Oopsie woopsie! We didn't find the tagData you were looking for."})
 }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create(req.body);
    res.status(200).json(newTagData)
  } catch (err) {
    console.error(err);
    res.status(400).json({ err: "Oopsie woopsie! We failed to create that new tag." });
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!updateTagData[0]) {
      res.status(404).json({ message: "The specified tag does not exist."});
      return;
    }
    res.status(200).json(updateTagData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong."})
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTagData = await Tag.detroy({
      where: {
        id: req.params.id,
      }
    });
    if (!delTagData) {
      res.status(404).json({ message: "The specified tag does not exist."});
      return;
    }
    res.setMaxListeners(200).json(delTagData);
  } catch (err) {
    res.status(500).json({ err: "Something went wrong."})
  }
});

module.exports = router;
