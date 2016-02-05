    /////
	// template helpers
	/////

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({}, { sort: {votes: -1, createdOn: -1 }} );
		}
	});

    Template.comments_list.helpers({
       username: function(user_id){
           var user = Meteor.users.findOne({_id: user_id});
           if (user){
               return user.username;
           }else{
               return 'anonymous';
           }
       },

       comments:function(website_id){
		  return Comments.find({website_id: website_id}, { sort: {createdOn: -1}} );
       }
    });


	/////
	// template events
	/////

	Template.website_item.events({
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
            var user_id = Meteor.userId();
			console.log("Up voting website with id "+website_id);
			// put the code in here to add a vote to a website!

            Meteor.call('upvote', this );

			return false;// prevent the button from reloading the page
		},
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
            var user_id = Meteor.userId();
			console.log("Down voting website with id "+website_id);

            Meteor.call('downvote', this );

			return false;// prevent the button from reloading the page
		}
	});

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		},

        "click #checkUrl": function(event){

            Meteor.call('validUrl', $('#url').val(), function(error, title){
                if (!error){
                    $('#title').val(title);
                }
            });
        },

		"submit .js-save-website-form":function(event){

			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;
			console.log("The url they entered is: "+url);

			//  put your website saving code in here!
            var url = event.target.url.value;
            var title = event.target.title.value;
            var description = event.target.description.value;
            var user_id = Meteor.userId();

            Meteor.call('newWebsite', {url: url, title: title, description: description}, function(error, result){
                if (!error){
                    $("#website_form").toggle('hide');
                    event.target.url.value = '';
                    event.target.title.value = '';
                    event.target.description.value = '';
                }
            });

			return false;// stop the form submit from reloading the page

		}
	});

    Template.comments_form.events({
        "submit .js-save-comment-form": function(event){
            event.preventDefault();
            var value = $('#comment').val();

            Meteor.call("addComment",{text: value, website_id: this._id }, function(error, response){
                if (!error){
                    $('#comment').val('');
                }else{
                    console.log(error);
                }
            });
            return false;
        }
    })
