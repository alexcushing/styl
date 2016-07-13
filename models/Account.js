import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Account = new Schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);

export default mongoose.model('Account', Account);
