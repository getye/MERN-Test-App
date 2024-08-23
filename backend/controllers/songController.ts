// controllers/songController.ts

import { Request, Response } from 'express';
import Song from '../models/songModel';

// Create a song
export const createSong = async (req: Request, res: Response) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.send(song);
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).send({ error: 'Failed to create song' });
  }
};

// Read all songs
export const viewSongs = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find();
    res.send(songs);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch songs' });
  }
};

// Update a song
export const updateSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!song) {
      return res.status(404).send({ error: 'Song not found' });
    }
    res.send(song);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update song' });
  }
};

// Delete a song
export const deleteSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).send({ error: 'Song not found' });
    }
    res.send({ message: 'Song deleted' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete song' });
  }
};
