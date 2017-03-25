	// external js: isotope.pkgd.js

						// init Isotope
						var iso = $('.grid').isotope( {
						  itemSelector: '.element-item',
						  layoutMode: 'masonry',
							masonry: {
  
							},
						  hiddenStyle: {
							opacity: 0
						  },
						  visibleStyle: {
							opacity: 1
						  },
						  transitionDuration: 0,
						  stagger: 0,
						  getSortData: {
							name: '.name',
							company: '.company',
							catrating: '.catrating',
							price: '.price parseInt',
							category: '[data-category]',
						  }
						});
						// bind filter button click
						$('#filters').on( 'click', 'button', function() {
						  var filterValue = $( this ).attr('data-filter');
						  // use filterFn if matches value
						  //filterValue = filterFns[ filterValue ] || filterValue;
						  iso.isotope({ filter: filterValue });
						});

						// bind sort button click
						var sortByGroup = document.querySelector('.sort-by-button-group');
						sortByGroup.addEventListener( 'click', function( event ) {
						  // only button clicks
						  if ( !matchesSelector( event.target, '.button' ) ) {
							return;
						  }
						  var sortValue = event.target.getAttribute('data-sort-value');
						  iso.isotope({ sortBy: sortValue });
						});

						// change is-checked class on buttons
						var buttonGroups = document.querySelectorAll('.button-group');
						for ( var i=0; i < buttonGroups.length; i++ ) {
						  buttonGroups[i].addEventListener( 'click', onButtonGroupClick );
						}

						function onButtonGroupClick( event ) {
						  // only button clicks
						  if ( !matchesSelector( event.target, '.button' ) ) {
							return;
						  }
						  var button = event.target;
						  button.parentNode.querySelector('.is-checked').classList.remove('is-checked');
						  button.classList.add('is-checked');
						}

