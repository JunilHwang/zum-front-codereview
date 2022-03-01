const { Board } = require("../../models");

module.exports = async (req, res) => {
  try {
    let board = await Board.findAll();

    let payload = board.map((el) => {
      return el.dataValues;
    });

    res.status(201).json({
      payload,
      message: "board is found",
    });
  } catch {
    res.status(400).json({ message: "error." });
  }
};
