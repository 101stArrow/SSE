Router.route('/', function () {
	this.render('Home');
});

Router.route('/heroes');
Router.route('/addheroes');
Router.route('/chat')

Heroes = new Mongo.Collection("heroes");
Messages = new Mongo.Collection("messages")

if (Meteor.isClient) {
	Template.hero.helpers({
		heroes: function () {
			return Heroes.find({}, {sort:{name: 1}});
		}
	});
	Template.chat.helpers({
		messages: function () {
			return Messages.find({}, {sort:{time: 1}});
		}
	})
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
	forbidClientAccountCreation : true,
	sendVerificationEmail : true,
});
	Accounts.ui.config({
	passwordSignupFields : 'USERNAME_AND_EMAIL',
});
}
