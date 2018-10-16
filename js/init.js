$(function () {

	$('.sidenav').sidenav().on('click tap', 'li a', () => {
		$('.sidenav').sidenav('close');
	});
	$(window).load(function () {
		if ($(window).width() <= 600) {
			$('.social').addClass('btn-small');
		} else {
			$('.social').removeClass('btn-small');
		}
		$(window).resize(function () {
			if ($(window).width() <= 600) {
				$('.social').addClass('btn-small');
			} else {
				$('.social').removeClass('btn-small');
			}
		});
	});
	$('.scrollspy').scrollSpy();
	$('.collapsible').collapsible();
	$('.tooltipped').tooltip();
	$('.tap-target').tapTarget();

	// Vertical Timeline - by CodyHouse.co
	function VerticalTimeline(element) {
		this.element = element;
		this.blocks = this.element.getElementsByClassName("js-cd-block");
		this.images = this.element.getElementsByClassName("js-cd-img");
		this.contents = this.element.getElementsByClassName("js-cd-content");
		this.offset = 0.8;
		this.hideBlocks();
	};

	VerticalTimeline.prototype.hideBlocks = function () {
		//hide timeline blocks which are outside the viewport
		if (!"classList" in document.documentElement) {
			return;
		}
		var self = this;
		for (var i = 0; i < this.blocks.length; i++) {
			(function (i) {
				if (self.blocks[i].getBoundingClientRect().top > window.innerHeight * self.offset) {
					self.images[i].classList.add("cd-is-hidden");
					self.contents[i].classList.add("cd-is-hidden");
				}
			})(i);
		}
	};

	VerticalTimeline.prototype.showBlocks = function () {
		if (! "classList" in document.documentElement) {
			return;
		}
		var self = this;
		for (var i = 0; i < this.blocks.length; i++) {
			(function (i) {
				if (self.contents[i].classList.contains("cd-is-hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight * self.offset) {
					// add bounce-in animation
					self.images[i].classList.add("cd-timeline__img--bounce-in");
					self.contents[i].classList.add("cd-timeline__content--bounce-in");
					self.images[i].classList.remove("cd-is-hidden");
					self.contents[i].classList.remove("cd-is-hidden");
				}
			})(i);
		}
	};

	var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
		verticalTimelinesArray = [],
		scrolling = false;
	if (verticalTimelines.length > 0) {
		for (var i = 0; i < verticalTimelines.length; i++) {
			(function (i) {
				verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
			})(i);
		}

		//show timeline blocks on scrolling
		window.addEventListener("scroll", function (event) {
			if (!scrolling) {
				scrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
			}
		});
	}

	function checkTimelineScroll() {
		verticalTimelinesArray.forEach(function (timeline) {
			timeline.showBlocks();
		});
		scrolling = false;
	};

	const scriptURL = 'https://script.google.com/macros/s/AKfycbyl0ET2gt1_5PsaeHdOO_ILgZxK5g11JQOmv-s3JesQbejq9wk/exec'
	const form = document.forms['submit-to-google-sheet']

	form.addEventListener('submit', e => {
		e.preventDefault()
		fetch(scriptURL, { method: 'POST', body: new FormData(form) })
			.then(response => console.log('Success!', response))
			.catch(error => console.error('Error!', error.message))
		form.className = 'close';
		formComplete();
	})


	function formComplete() {
		const h1 = document.createElement('h1');
		h1.classList.add('end');
		var element = document.getElementById("zafokus");

		h1.appendChild(document.createTextNode(`Vaša prijava je zabeležena. Uskoro ćemo vas kontaktirati o daljem procesu selekcije!`));
		setTimeout(() => {
			form.parentElement.appendChild(h1);
			setTimeout(() => h1.style.opacity = 1, 50);
		}, 1000);
		element.scrollIntoView(true);
	}

	const scriptURL2 = 'https://script.google.com/macros/s/AKfycbyVzu53rrwwEqxdTiOYcZw4ia5acwaINCdq5lDPqHm16e7uENw/exec'
	const form2 = document.forms['email-newsletter']

	form2.addEventListener('submit', e => {
		e.preventDefault()
		fetch(scriptURL2, { method: 'POST', body: new FormData(form2) })
			.then(response => console.log('Uspesno (newsletter)!', response))
			.catch(error => console.error('Neuspesno (newsletter)!', error.message))
		const element = document.getElementById("email-label").innerHTML = "Uspešna prijava na newsletter!"
		document.getElementById("news").reset();

	})


});

// end of document ready


