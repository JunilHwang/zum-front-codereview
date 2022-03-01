const { Board } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { id, title, writer, content } = req.body;

    let board = await Board.findOne({
      where: {
        id: id,
        title: title,
        writer: writer,
        content: content,
      },
    });

    await Board.destroy({
      where: {
        id: id,
        title: title,
        writer: writer,
        content: content,
      },
    });

    res.status(200).json({
      message: "board is deleted",
    });
  } catch {
    res.status(400).json({ message: "error." });
  }
};
