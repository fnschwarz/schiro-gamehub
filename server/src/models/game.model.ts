import mongoose from 'mongoose';

export const Game = mongoose.model('App', new mongoose.Schema({
    id: Number,
    name: String
}), 'apps');