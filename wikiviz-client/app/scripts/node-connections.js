visApp.directive('nodeConnections', function() {

	console.log(' from directive: data');
	return {
		// restrict : 'A',
		// scope: { dataInside : '=dataoutside' },  // isolate scope
		// //set dataInside & dataoutside with same variable name, then use {data : '='}
		// template : 'Data is {{ dataInside }}',
		link : link
	};

	function link (scope, element, attributes){
		console.log('scope is', scope );
		return element.text(scope.data);
	};

});

// visApp.directive('nodeConnections', function() {
// 	return function(scope, element, attributes){
// 		console.log('scope is', scope );
// 		element.text('stufffffff');
// 	};
// });






/*What we want to be able to do is separate the scope inside a 
directive from the scope outside, and then map the outer scope 
to a directive's inner scope. We can do this by creating what 
we call an isolate scope. To do this, we can use a directive's scope option: */

/* Bug in snake case to camel case from directive attribute!!!! */