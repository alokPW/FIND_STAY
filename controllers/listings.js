const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient=mbxGeocoding({accessToken:mapToken});
 
module.exports.index=async (req, res,next) => {
      try {
        const allListings = await Listing.find({});
        res.render("./listings/index.ejs", { allListings });
      } catch (error) {
        next(error);
      }
    };


module.exports.renderNewForm= (req, res) => {
    res.render("./listings/new.ejs");
  }  
  
  

module.exports.showListing=async (req, res, next) => { 
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id)
        .populate({
          path:"reviews",
          populate:{
          path:"author",
         },
        })
        .populate("owner");
        if (!listing) {
          req.flash("error","Listings you requested for does not exist");
           return res.redirect("/listings");
          // return next(new ExpressError(404, "Listing not found"));
        }
        console.log(listing);
        res.render("./listings/show.ejs", { listing });
    } catch (err) {
        next(err);
    }
};  


module.exports.createListing=async (req, res) => {
   let response=await geocodingClient
   .forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
  })
    .send();
  

      let url=req.file.path;
      let filename=req.file.filename;
      const newListing = new Listing(req.body.listing);
      newListing.owner=req.user._id;
      newListing.image={url,filename};

      newListing.geometry=response.body.features[0].geometry;
      let saveListing= await newListing.save();
      console.log(saveListing);
      req.flash("success","New Listing Created!");
      res.redirect("/listings");
    };


module.exports.renderEditForm=async (req, res, next) => {
    try {
      let { id } = req.params;
      const listing = await Listing.findById(id).populate("owner"); // Populate owner if needed
      if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
      }
      let originalImageUrl= listing.image.url;
      originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
      res.render("./listings/edit.ejs", { listing ,originalImageUrl});
    } catch (err) {
      next(err); // Pass error to error handling middleware
    }
  };  
  
  
module.exports.updateListing=async (req, res, next) => {
    try {

        let { id } = req.params;
        let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });

        if(typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename}; 
        await listing.save();
        }

        req.flash("success","Listing Updated");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        next(err);
    }
};  


module.exports.destroyListing=async (req, res) => {
      let { id } = req.params;
      await Listing.findByIdAndDelete(id);
      req.flash("success","Lisitng Deleted");
      res.redirect("/listings");
  };
