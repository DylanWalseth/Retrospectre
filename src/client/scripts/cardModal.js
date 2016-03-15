"use strict";
/* global Cards:false SnackbarMethods:false */

Template.cardModal.helpers({
    cardModalInfo: function(_id) {
        return Cards.findOne({"_id": _id});
    }
});

Template.cardModal.events({
    "click #submitCommentButton": function(event){//eslint-disable-line
        event.preventDefault();
        var comment = event.target.form[0].value;
        var image = null;

        if(!comment || comment.length <= 4)
            SnackbarMethods.DisplayMessage("Enter a more valuable comment",500);
        else{
            var author;

            if(!Meteor.user())
                author = Session.get("author");
            else{
                author = Meteor.user().profile.name;
                image = UserMethods.getUserImage(Meteor.user()._id);//eslint-disable-line
            }
            var commentToAdd = new Comment().createdBy(author)
              .withText(comment).createdAtTime(new Date()).withProfile(image);

            Meteor.call("submitComment",this._id,commentToAdd);
            event.target.form[0].value = "";
            $("ul.collapsible li").show();
            $("i.fa-caret-right").addClass("fa-caret-down");
            $("i.fa-caret-right").removeClass("fa-caret-right");
        }
    },

    "submit #submitCommentButton": function(event){//eslint-disable-line
        event.preventDefault();
        var comment = event.target.form[0].value;
        var image = null;

        if(!comment || comment.length <= 4)
            SnackbarMethods.DisplayMessage("Enter a more valuable comment",500);
        else{
            var author;

            if(!Meteor.user())
                author = Session.get("author");
            else{
                author = Meteor.user().profile.name;
                image = UserMethods.getUserImage(Meteor.user()._id);//eslint-disable-line
            }
            var commentToAdd = new Comment().createdBy(author)
              .withText(comment).createdAtTime(new Date()).withProfile(image);

            Meteor.call("submitComment",this._id,commentToAdd);
            event.target.form[0].value = "";
            $("ul.collapsible li").show();
        }
    },

    "click span i.fa-caret-right": function(event){//eslint-disable-line
        event.toElement.className = "fa fa-caret-down";
        $("ul.collapsible li").show();
    },

    "click span i.fa-caret-down": function(event){//eslint-disable-line
        event.toElement.className = "fa fa-caret-right";
        $("ul.collapsible li").hide();
    }
});
