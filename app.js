var express= require("express");
var app= express();
var request= require("request");
var bodyParser= require("body-parser");
var mongoose=require("mongoose");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true});

//Schema Setup

var campgroundSchema=new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground= mongoose.model("Campground",campgroundSchema);

// Campground.create({
//     name: "Granite Hill",
//     image:"https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque doloremque laudantium qui esse quos veritatis non ipsa incidunt, consequatur ea quaerat excepturi suscipit, placeat labore corrupti rem porro. Quo, culpa?"
// },function(err,campground){
//     if (err) {
//         console.log(err);
//     }else{
//         console.log("YOU JUST CREATED A CAMPGROUND");
//         console.log(campground);
//     }
// });

// var campgrounds=[
//     {name:"Salmon Creek", image:"https://pixabay.com/get/57e0d6424954ac14f1dc84609620367d1c3ed9e04e50744075287ad49e4bcc_340.jpg"},
//     {name:"Granite Hill", image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e507440752973d7964ec2_340.jpg"},
//     {name:"Mountain Goat's Rest", image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507440752973d7964ec2_340.jpg"}
// ]



app.get("/", function (req, res) {
        res.render("landing") ;
 });


 app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
        console.log(err);
    }else{
        res.render("index",{campgrounds:campgrounds}) ;
    }
});
    
});

app.post("/campgrounds", function (req, res) {
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var newCampgrounds={name:name, image:image, description:desc};
    Campground.create(newCampgrounds,function(err,newlyCreated){
        if (err) {
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });    
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new") ;
});  

app.get("/campgrounds/:id", function (req, res) {
    var id=req.params.id;
    Campground.findById(id, function (err, campInfo) {
        if (err) {
        console.log(err);
    }else{
        res.render("show",{campgrounds:campInfo}) ;
    }
}); 
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
 console.log("The yelpCamp Server Has Started!");
});

