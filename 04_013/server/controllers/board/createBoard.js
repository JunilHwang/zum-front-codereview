const { Board } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { title, writer, content } = req.body;

    if (!title || !writer) {
      return res
        .status(422)
        .json({ message: "insufficient parameters supplied" });
    }

    await Board.create({
      title: title,
      writer: writer,
      content: content,
    });

    res.status(200).json({ message: "board is created" });
  } catch {
    res.status(400).json({ message: "error." });
  }
};
