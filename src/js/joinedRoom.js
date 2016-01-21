/**
*@author TreJon House
*@date 1/18/16
*@verion 1.0
*@edited 1/18/16
*@purpose Once the room page is rendered, need to connect to
*the cards in current room and display them
**/

"use strict";

var Cards = new Mongo.Collection("cards");

if(Meteor.isClient){
    Template.room.helpers({
        cards : function(){
        //return all cards in db sort by newest
        //    return Cards.find({roomID: roomId},{sort: {createdAt: -1}});
        }
    });
    //will handle the events of the page
    Template.room.events({
    });
}
