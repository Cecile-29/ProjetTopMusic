const userRepo = require('../repositories/users.js')
const bcrypt = require('bcryptjs')

exports.get = (req, res) => {
    res.render('register')
}

exports.post = (req, res) => {
    const user = new userRepo();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    user.save();
    
    req.flash('notify', `Vous êtes inscrit !`)
    res.redirect('/');
}