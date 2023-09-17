const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategoryData = await Category.findAll({
      include: Product,
    });
    res.status(200).json(allCategoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      err: "Oopsie woopsie! We lost all the categoryData.",
    });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const idCategoryData =  await Category.findByPk( req.params.id, {
      include: Product,
    });
    res.status(200).json(idCategoryData);
   } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Oopsie woopsie! We didn't find the categoryData you were looking for."})
   }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData)
  } catch (err) {
    console.error(err);
    res.status(400).json({ err: "Oopsie woopsie! We failed to create that new category." });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!updateCategoryData[0]) {
      res.status(404).json({ message: "The specified category does not exist."});
      return;
    }
    res.status(200).json(updateCategoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong."})
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const delCategoryData = await Category.detroy({
      where: {
        id: req.params.id,
      }
    });
    if (!delCategoryData) {
      res.status(404).json({ message: "The specified category does not exist."});
      return;
    }
    res.setMaxListeners(200).json(delCategoryData);
  } catch (err) {
    res.status(500).json({ err: "Something went wrong."})
  }
});

module.exports = router;
