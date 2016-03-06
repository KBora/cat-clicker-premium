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

		selectedCatIndex : 0,

		showAdminArea: 0

	};

	var octopus = {

		init: function() {
			model.selectedCatIndex = 0;
			viewCatSelector.init();
			viewSelectedCat.init();
			viewAdminArea.init();
		},

		// display the selected cat in the selected cat container
		selectCat: function(iCopy) {
			return  function() { 
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
				viewSelectedCat.displayClickCounter(i);
			}
		},

		isAdminAreaHidden : function() {
			return !model.showAdminArea;
		},

		showAdminArea : function(i) {
			model.showAdminArea = 1;
			viewAdminArea.render(i);
		},

		hideAdminArea : function() {
			model.showAdminArea = 0;
			viewAdminArea.hide();
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
					click: octopus.selectCat(i) //  an onclick event that will display selected cat details in the container area
				})
				.appendTo($catSelectorContainer);

			}
		},

	};

	var viewSelectedCat = {

		init: function() {
			viewSelectedCat.render(model.selectedCatIndex);
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
			
			var $container = $('<div/>').addClass('cat-container')
												.append($('<div/>').addClass('cat-heading').html(octopus.getCatName(i)))
												.append($('<div/>').addClass('cat-image')
													.append($img))
												.append($('<div/>').addClass('cat-counter'));

			$catSelectedContainer.append($container);

			viewSelectedCat.displayClickCounter(i);

		},

		displayClickCounter: function(i) {
			$('.cat-counter').html('You have clicked me ' + octopus.getCatCounter(i) + ' times!');
		}

	};

	var viewAdminArea = {

		init: function() {
			// hide admin area by default since no cat is showing
			octopus.hideAdminArea();

			// add onclick event to admin button
			$('#admin-button').click();

		}, 


		render: function(i) {
			// populate admin input fields with selected cat details
			$('#cat-name').val(model.cats[i].name);
			$('#cat-img').val(model.cats[i].imgURL);
			$('#cat-counter').val(model.cats[i].clickCounter);
		},

		hide: function() {
			$('#cat-admin-form').hide();
		}


	};


	octopus.init();


});