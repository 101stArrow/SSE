Router.configure({
	layoutTemplate:'layout'
});
Router.map(function(){
	this.route('Home',{path:'/'});
	this.route('About',{path:'/about'});
	this.route('AddHero',{path:'/addhero'});
});