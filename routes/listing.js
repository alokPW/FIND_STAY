const express = require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudconfig.js");
const upload=multer({storage});

router
.route("/")
//index route
.get(
    wrapAsync(listingController.index)
  )
  // //create route
  .post(
    isLoggedIn,
    upload.single("listing[image][url]"),//new
    validateListing,
    wrapAsync(listingController.createListing));
 

  // New route 
  router.get("/new",isLoggedIn,listingController.renderNewForm);

  
  router.route("/:id")
  //show route
  .get( wrapAsync(listingController.showListing))
  // Update route 
  .put( 
    isLoggedIn,
    isOwner,
    upload.single("listing[image][url]"),//new
    validateListing,
    wrapAsync(listingController.updateListing))
  // Delete route 
  .delete(
    isLoggedIn,
    isOwner,
     wrapAsync(listingController.destroyListing));
  
  
// Edit route
router.get("/:id/edit",
   isLoggedIn, 
   isOwner,
   wrapAsync(listingController.renderEditForm));
  
  module.exports=router;