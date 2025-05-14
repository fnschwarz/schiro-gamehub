import mongoose from 'mongoose';

export const Game = mongoose.model('Game', new mongoose.Schema({
    id: Number,
    name: String,
    steam_link: String,
    header_image: String
}), 'games');