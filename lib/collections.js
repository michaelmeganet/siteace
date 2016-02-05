///
/// WEBSITES
///

Websites = new Mongo.Collection("websites");

Websites.allow({
    update: function(user_id, doc, modifier){
        return true;
    },

    insert: function(user_id, doc){
        console.log(doc);
        if (!doc.url){
            return false;
        }
        if (!doc.title){
            return false;
        }
        if (!doc.description){
            return false;
        }

        return doc.user_id == user_id;
    },

    remove: function(user_id, doc){
        return user_id == doc.user_id;
    }

});

///
/// VOTES
///

Votes = new Mongo.Collection("votes");

Votes.allow({
    insert: function(user_id, doc){
        var vote = Votes.findOne({user_id: user_id, website_id: doc.website_id});
        return !vote;
    },

    remove: function(user_id, doc){
        return user_id == doc.user_id;
    }
});



///
/// Comments
///

Comments = new Mongo.Collection("comments");

Comments.allow({
    insert: function(user_id, doc){
        return (user_id == doc.user_id) && doc.text && doc.text.trim().length > 0;
    }
});
