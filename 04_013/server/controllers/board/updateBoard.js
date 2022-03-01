const { Board } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { id, title, writer, content } = req.body;

    let board = await Board.findOne({
      where: {
        id: id,
      },
    });

    await Board.update(
      {
        id: id,
        title: title,
        writer: writer,
        content: content,
      },
      {
        where: { id: id },
      }
    );

    res.status(200).json({
      message: "board is updated",
    });
  } catch {
    res.status(400).json({ message: "error." });
  }
};
