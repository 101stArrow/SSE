Router.route('/', function () {
	// render the Home template with a custom data context
	this.render('Home');
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/heroes');

// when you navigate to "/two" automatically render the template named "Two".
Router.route('/addheroes');

Heroes = new Mongo.Collection("heroes");

if (Meteor.isClient) {
	Template.hero.helpers({
		heroes: function () {
			return Heroes.find({}, {sort:{name: 1}});
		}
	});
	Template.hero.helpers({
		heroCount: function() {
			return Heroes.count();
		}
	});
	Template.addheroes.events({
	"submit #new-hero": function (event) {
		// This function is called when the new task form is submitted

		var name = event.target.name.value;
		var alias = event.target.alias.value;
		var mainpower = event.target.mainpower.value;
		var alignment = event.target.alignment.value;
		var universe = event.target.universe.value;

		Heroes.insert({
			name: name,
			alias: alias,
			mainpower: mainpower,
			alignment: alignment,
			universe: universe,
			CreatedBy: Meteor.user().username,
			createdAt: new Date() // current time
		})

		// Clear form
		event.target.name.value = "";
		event.target.alias.value = "";
		event.target.mainpower.value = "";
		event.target.alignment.value = "";
		event.target.universe.value = "";

		// Prevent default form submit
		return false;
	}
});
	Template.hero.events({
	"click #delete": function () {
		Heroes.remove(this._id);
	}
});
	Accounts.config({
	forbidClientAccountCreation : false,
	sendVerificationEmail : true,
});
	Accounts.ui.config({
	passwordSignupFields : 'USERNAME_AND_EMAIL',
});
}
