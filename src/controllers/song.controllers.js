const catchError = require('../utils/catchError');
const Song = require('../models/Song');

const getAll = catchError(async (req, res) => {
  const songs = await Song.findAll()
  return res.json(songs)
});

const create = catchError(async (req, res) => {
  const song = req.body
  const createSong = await Song.create(song)
  return res.status(201).json(createSong)
})

const getOne = catchError(async (req, res) => {
  const { id } = req.params
  const oneSong = await Song.findByPk(id)
  if (!oneSong) return res.status(404).json({ message: "song not found" })
  return res.json(oneSong)
})

const remove = catchError(async (req, res) => {
  const { id } = req.params
  const removeSong = await Song.destroy({ where: { id } })
  if (!removeSong) return res.status(404).json({ message: "song not found" })
  return res.sendStatus(204)
})

const update = catchError(async (req, res) => {
  const { id } = req.params
  const songBody = req.body
  const songUpdate = await Song.update(songBody, { where: { id }, returning: true })
  if (songUpdate[0] === 0) return res.status(404).json({ message: "song not found" })

  return res.json(songUpdate[1][0])
})

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update

}