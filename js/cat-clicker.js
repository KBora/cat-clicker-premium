$(function() {

	var model = {
		cats: [	{
							name: 'Kitty',
							imgURL : '/img/kitten1.jpg',
							clickCounter: 0
						}	,
						{
							name: 'Peanut',
							imgURL : '/img/kitten2.jpg',
							clickCounter : 0
						},
						{
							name: 'Tiger and Lilly',
							imgURL : '/img/kitten3.jpg',
							clickCounter : 0
						},
						{
							name: 'Bennie',
							imgURL : '/img/kitten4.jpg',
							clickCounter : 0
						},
						{
							name: 'Rasputin',
							imgURL : '/img/kitten5.jpg',
							clickCounter : 0
						}
					],

		selectedCatIndex : 0

	};

	var octopus = {
/*
initialise model (no need in this case)
tells views to render themselves 
setup on click events
1 on click of cat name changes current cat and tells view to render cat
2 on click of image increases counter in model and view
*/

		init: function() {
			viewCatSelector.init();
			viewSelectedCat.init();
		},

		implementCatSelector: function() {
			// when cat selector is clicked, display the cat in the selected cat container
			$('.cat-selector').each( function(i, el) {

			});
		}
	};


	var viewCatSelector = {
		
		init: function() {
			viewCatSelector.render();
		},

		render: function() {
			// render the cat selector
			var $catSelectorContainer = $('#cat-selector-container');
			for (var i=0; i<model.cats.length; i++) {
				$catSelectorContainer.append('<div class="cat-selector">' + model.cats[i].name + '</div>');
			}
		},

		selectCat: function() {

		}

	};

	var viewSelectedCat = {
		init: function() {

		},
		render: function() {

		},
		incrementCounter: function() {
			
		}

	};

	octopus.init();

});




