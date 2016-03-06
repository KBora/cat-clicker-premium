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
			viewCatSelector.init();
			viewSelectedCat.init();
			viewAdminArea.init();
		},

		// display the selected cat in the selected cat container
		selectCat: function(iCopy) {
			return  function() { 
				model.selectedCatIndex = iCopy;
				viewSelectedCat.render(iCopy);
				if (octopus.isAdminAreaDisplayed()) {
					viewAdminArea.render();
				}
			}
		},

		getSelectedCatIndex: function(i) {
			return model.selectedCatIndex;
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

		isAdminAreaDisplayed : function() {
			return model.showAdminArea == 1;
		},

		showAdminArea : function() {
			model.showAdminArea = 1;
			viewAdminArea.render();
		},

		hideAdminArea : function() {
			model.showAdminArea = 0;
			viewAdminArea.hide();
		},

		saveCatData: function() {
			var selectedCat = model.cats[model.selectedCatIndex];
			selectedCat.name =  $('#cat-name').val();
			selectedCat.imgURL = $('#cat-img').val();
			selectedCat.clickCounter = parseInt($('#cat-counter').val());
			// re-render everything since values may have changed
			octopus.init(); 
		}



};


	var viewCatSelector = {
		
		init: function() {
			$('#cat-selector-container').empty();
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
			octopus.hideAdminArea();

			// add onclick event to admin button that shows admin area
			$('#admin-button').click( function() {
					octopus.showAdminArea();
			});

			// add onclick event to cancel button that hides admin area
			$('#cancel-button').click( function() {
					octopus.hideAdminArea();
			});

			// add onclick event to save button that saves form data into model
			$('#save-button').click( function() {
					octopus.saveCatData();
			});

		}, 

		render: function() {
			$('#cat-admin-form').show();
			// populate admin input fields with selected cat details
			var catIndex = octopus.getSelectedCatIndex();
			$('#cat-name').val(octopus.getCatName(catIndex));
			$('#cat-img').val(octopus.getCatImgURL(catIndex));
			$('#cat-counter').val(octopus.getCatCounter(catIndex));
		},

		hide: function() {
			$('#cat-admin-form').hide();
		}

	};


	octopus.init();


});