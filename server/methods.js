Meteor.methods({
    upvote: function(website){
        var userId = Meteor.userId();
        var vote = Votes.findOne( {user_id: userId, website_id: website._id } );
        if (vote){
            return false;
        }else{
            Votes.insert({user_id: userId, website_id: website._id });
            Websites.update({_id: website._id}, { $inc: {votes: 1} } );
            return true;
        }

    },

    downvote: function(website){
        var userId = Meteor.userId();
        var vote = Votes.findOne({user_id: userId, website_id: website._id });
        if (vote){
            Votes.remove({_id: vote._id});
            Websites.update({_id: website._id}, { $inc: {votes: -1} } );
            return true;
        }else{
            return false;
        }
    },

    validUrl: function( url){
        var response = Meteor.http.get(url);
        var res = /<title[^>]*>([^<]+)</.exec(response.content);

        if (res.length > 0){
            console.log(res[1]);
            return res[1];
        }else{
            return null;
        }
    },

    'newWebsite': function(doc){
        doc.createdOn = new Date();
        doc.user_id = Meteor.userId();
        doc.votes = 0;

        Websites.insert(doc);
        //TODO check for error
        return true;
    },

    'addComment': function(doc){

        doc.createdOn = new Date();
        doc.user_id = Meteor.userId();

        Comments.insert(doc);
    }


});
