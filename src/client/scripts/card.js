"use strict";
/* global Cards:false */
Template.card.helpers({
    cardInfo: function(_id) {
        return Cards.findOne({
            "_id": _id
        });
    }
});

Template.card.events({
    "click .card-panel": function() {
      // This code is used to toggle modal on a mobile/small screen resolution
        var maxwidth = 768;
        if ($(window).width() < maxwidth) {
            $("div.modal#" + this._id).modal("toggle");
        }
    },
    "click .disable-editmode": function() {
        Session.set("editCardMode", false);
    },
    "click #likeButton": function(eve) {
        eve.stopPropagation();
        eve.target.disabled = true;
        Meteor.call("incrementLikes", this._id);
    },
    "click #likeButtonIcon": function(eve) {
        eve.stopPropagation();
        eve.target.disabled = true;
        if (eve.target.parentElement.disabled === false) {
            eve.target.parentElement.disabled = true;
            Meteor.call("incrementLikes", this._id);
        }
    }
});
