import mongoose, { Document, Schema, Model } from 'mongoose';

// Define an interface representing a document in MongoDB.
interface ISong extends Document {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

// Create a Schema corresponding to the document interface.
const songSchema: Schema<ISong> = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  genre: { type: String, required: true },
});

// Create a Model.
const Song: Model<ISong> = mongoose.model<ISong>('Song', songSchema);

export default Song;
