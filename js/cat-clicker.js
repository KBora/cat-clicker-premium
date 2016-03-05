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

		// display the selected cat in the selected cat container
		// uses a closure
		showSelectedCat: function(iCopy) {
			return  function() { 
				console.log('viewSelectedCat.render' + iCopy);
				viewSelectedCat.render(iCopy);
			}
		},

		getCatName: function(i) {
			return model.cats[i].name;
		},

		getCatImgURL: function(i) {
			return model.cats[i].imgURL;
		},

		getCatCounter: function(i) {
			return model.cats[i].clickCounter;
		},

		incrementCounter: function(i) {
			return function() {
				model.cats[i].clickCounter = model.cats[i].clickCounter + 1;		
				viewSelectedCat.renderCounter(i);
				console.log('increment cat counter = ' + model.cats[i].clickCounter );
			}
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

				// create an element
				$( '<div/>', {
					class: 'cat-selector',
					text: octopus.getCatName(i),
					click: octopus.showSelectedCat(i) //  an onclick event that will display selected cat details in the container area
				})
				.appendTo($catSelectorContainer);

			}
		},

		selectCat: function() {

		}

	};

	var viewSelectedCat = {
		init: function() {

		},

		render: function(i) {
			// render the selected cat
			var $catSelectedContainer = $('#cat-selected-container');
			$catSelectedContainer.empty();

			var $img = $('<img/>', {
				src: '.' + octopus.getCatImgURL(i),
				alt: octopus.getCatName(i),
				click: octopus.incrementCounter(i)
			});

			//$img.click( octopus.incrementCounter(i) );
			
			var $container = $('<div/>').addClass('cat-container')
												.append($('<div/>').addClass('cat-heading').html(octopus.getCatName(i)))
												.append($('<div/>').addClass('cat-image')
													.append($img))
												.append($('<div/>').addClass('cat-counter'));

			$catSelectedContainer.append($container);

			viewSelectedCat.renderCounter(i);

		},

		renderCounter: function(i) {
			$('.cat-counter').html('You have clicked me ' + octopus.getCatCounter(i) + ' times!');
		}

	};

	octopus.init();

});





