/* globals Rooms:false RoomMethods:false SnackbarMethods:false Room:false DEFAULT_SNACKBAR_TIMEOUT:false*/
"use strict";

Template.categoriesSelector.created = function() {
    this.currentCategories = this.data.currentCategories;
    this.categoriesDep = this.data.tracker;
};

Template.categoriesSelector.helpers({
    colorPicker: function(color) {
        return {
            id: "cardBackgroundColor",
            type: "color",
            value: color
        };
    },
    getCategories: function() {
        Template.instance().categoriesDep.depend();
        return Template.instance().currentCategories;
    }
});

Template.categoriesSelector.events({
    "submit .customCategory": function(eve) {// eslint-disable-line
        eve.preventDefault();
        var tmpl = Template.instance();
        var customCategory = eve.target.addCustomCategory.value;
        if(isDuplicate(tmpl, customCategory)){
            SnackbarMethods.DisplayMessage("A category with that name exists",
                DEFAULT_SNACKBAR_TIMEOUT);
            return;
        }
        var nullStr = 0;
        if(customCategory !== undefined && customCategory.length > nullStr) {
            var colorValue = genRandomColor();

            if(tmpl.data.onCategoryCreated !== undefined
                && !tmpl.data.onCategoryCreated(tmpl.currentCategories, customCategory, colorValue))
                return;
            tmpl.currentCategories.push({category:customCategory,
                color:colorValue});
            tmpl.categoriesDep.changed();
            eve.target.addCustomCategory.value = "";
        }
    },

    "click #removeCategory": function() {
        var tmpl = Template.instance();
        if(tmpl.data.onCategoryRemoved !== undefined){
            tmpl.data.onCategoryRemoved(tmpl.currentCategories, this.category, function(allowUpdate){
                if(allowUpdate){
                    var numToRemove = 1;
                    tmpl.currentCategories.splice(tmpl.currentCategories.indexOf(this), numToRemove);
                    tmpl.categoriesDep.changed();
                }
            });
        }
    },

    "change #cardBackgroundColor": function(eve) {
        var tmpl = Template.instance();
        if(tmpl.data.onColorChanged !== undefined
            && !tmpl.data.onColorChanged(tmpl.currentCategories, this.category, eve.target.value)){
            eve.target.value = this.color;
            return;
        }
        this.color = eve.target.value;
        tmpl.categoriesDep.changed();
    }
});

function genRandomColor(){
    // Get a random number between 0 and 255
    var range = 256;
    var r = Math.floor(Math.random() * (range));
    var g = Math.floor(Math.random() * (range));
    var b = Math.floor(Math.random() * (range));

    var base = 16;// hex
    var hexDigits = 2; // 2 digits long, required format for HTML e.g. '0F' instead of just 'F'

    // Make sure each base color (r, g, b) is 2 digits
    r = ("00" + r.toString(base)).substr(-hexDigits);
    g = ("00" + g.toString(base)).substr(-hexDigits);
    b = ("00" + b.toString(base)).substr(-hexDigits);
    return "#" + r + g + b; // Combine them into a single hex color string
}

function isDuplicate(tmpl, customCategory){
    for(var i = 0; i < tmpl.currentCategories.length; i++) {
        if(tmpl.currentCategories[i].category === customCategory){
            SnackbarMethods.DisplayMessage(
                "Please enter a unique category", DEFAULT_SNACKBAR_TIMEOUT);
            return true;
        }
    }
    return false;
}
