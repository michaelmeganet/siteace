Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
    this.render('welcome',{
      to: 'content'
    });
});

Router.route('/websites', function () {
    this.render('websites',{
        to: 'content'
    });

    this.render('navbar',{
        to: 'navbar'
    });
});

Router.route('/websites/:_id', function () {
    this.render('website_detail',{
        to: 'content',
        data: function(){ return Websites.findOne({_id: this.params._id});}
    });

    this.render('navbar',{
        to: 'navbar'
    });
});
