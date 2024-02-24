const allDogs = require('./Alldogs');


const getDogs = async (req, res) => {
  try {
    const dogs = await allDogs();

    res.json(dogs);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDogs;
