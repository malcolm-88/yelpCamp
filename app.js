var express= require("express");
var app= express();
var request= require("request");
var bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
var campgrounds=[
    {name:"Salmon Creek", image:"https://pixabay.com/get/57e0d6424954ac14f1dc84609620367d1c3ed9e04e50744075287ad49e4bcc_340.jpg"},
    {name:"Granite Hill", image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e507440752973d7964ec2_340.jpg"},
    {name:"Mountain Goat's Rest", image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507440752973d7964ec2_340.jpg"}
]



app.get("/", function (req, res) {
        res.render("landing") ;
 });


 app.get("/campgrounds", function (req, res) {
    res.render("campgrounds",{campgrounds:campgrounds}) ;
});

app.post("/campgrounds", function (req, res) {
    var name=req.body.name;
    var image=req.body.image;
    var newCampgrounds={name:name, image:image};
    campgrounds.push(newCampgrounds);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new") ;
});  

var port = process.env.PORT || 3000;
app.listen(port, function () {
 console.log("The yelpCamp Server Has Started!");
});

