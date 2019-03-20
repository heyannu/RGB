var express = require('express');
var mongo = require('mongo');
var mongoose = require("mongoose");
var User = require('./models/user');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport");
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.connect("mongodb+srv://heyannu:heyannu@cluster0-kbfja.mongodb.net/Authorization", () => {
    console.log('connected to mongodb');
});

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// app.post("/login", passport.authenticate("local", {
//     successRedirect: '/secret',
//     failureRedirect: "/oops"
// }, function (req, res) {
//     console.log("hey")
// }));


app.post('/login',
    passport.authenticate('local', { session: false }),
    function (req, res) {
        res.json({ redirect: true, username: req.user.username, highscore: req.user.highscore, user: req.user });
    });

app.post('/updatescore', function (req, res) {
    var username = req.body.username;
    var highscore = req.body.highscore;
    var change = 0;
    User.findOne({ username: username }, function (err, user) {

        if (err) {
            console.log(err);
        }
        else {
            if (user.highscore < highscore) {
                change = 1
                console.log(user.highscore, highscore, change)
            }
            else {
                change = 0
            }
        }
        if (change == 1) {
            User.findOneAndUpdate({ username: username }, {
                $set: {
                    highscore: highscore
                }
            }, function (err, user) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("score is " + user.highscore)
                }
            })
        }
        else {
            console.log('cant be updated')
        }
    })

});
app.post('/highscore', function (req, res) {
    User.find({},function (err, user) {
        if (err) {
            console.log(err)
        } else {
            res.json({ users: user })
            
        }
    })
});
app.post('/register', function (req, res) {
    try {
        User.find({ name: req.body.username }, function (err, user) {
            if (err) {
                console.log(err)
            }
            else {
                User.register(new User({ username: req.body.username, highscore: 0 }), req.body.password, function (err, User) {
                    if (err) {
                        res.json({ message: 'User exists, try another name...' })
                        console.log('user exists already')
                    }
                    else {
                        passport.authenticate("local")(req, res, function () {
                            res.json({ message: 'User acreated', redirect: true })
                            console.log('user created')
                        })
                    }
                });
            }
        })
    }
    catch (e) {
        console.log("user exists")
    }
})


app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect("/login");
    }
}
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('Client/build'));
    app.get('*', function(req, res){
         res.sendFile(path.resolve(__dirname, 'Client', 'build', 'index.html'));
    })
}
app.listen(8080, function (req, res) {
    console.log('connected');
})