/**
 * Author:
 * Fabz
 */

// require("./libs/skrollr");
// require("./libs/picturefill");

// Create a closure to maintain scope of the '$' and FBZ
;(function(FBZ, $) {

		$(window).load(function() {

		});


	$(function() {

		// this function triggers everything
		FBZ.control.init();

	});// END DOC READY
	
	FBZ.model = {
		// add your data here 

		windowH	: 0, //browser screen 
		windowW	: 0,
		stageH	: window.innerHeight, //total document size
		stageW	: window.innerWidth,
		stateObj : {},
		currentSection : "home",
		currentArticule : "",
		currentSectionIndex : 0,
		i18n : null,
		noBrain : {},
		currentLang:"es",
		$selectedform : {},
		// js detection
		mobileMode:false,
		tabletMode:false,
		desktopMode:false,
		// value holders
		swapToMobileBreakpoint:420,
		swapToTabletBreakpoint:1024,
		products : {},

	};

	FBZ.view = {

		// add dom elements here
		$stage 				:$(window),
		$header				:$('header'),
		$main				:$('.main'),
		$block				:$('.block'),
		$langBtn			:$('.lang-btn'),
		$footer				:$('footer')
	};

	FBZ.control = {
		// add function here
		init : function () {
			console.debug('DecorePlace is running');


		// initial functions 
		FBZ.control.determineSection();
		FBZ.control.onResizeStage();
		FBZ.control.defineStage();
		FBZ.control.readProducts();

		FBZ.control.resizeContentBlock();
		FBZ.control.multilingualEngine(); 
		FBZ.control.removeLoadingCurtain();
		// FBZ.control.formFunctionality();
		FBZ.control.headerTransform();

		},




		readProducts : function () {

			FBZ.model.products.producto1 = {

			"prod_id":"001",  // numero de ingreso a la bd
			"prod_short_name":"Velador", // nombre corto del producto 
			"prod_nombre":"Velador Retro", // nombre largo
			"prod_codigo":"000001", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"16",
			"prod_imagen_1000":"/assets/img/productos/Velador01/big_1000/velador15.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/Velador01/med_500/velador15.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/Velador01/small_200/velador15.png", // imagen chica
			"prod_link":"velador", // url especifica producto
			"prod_publicado":"true", // si es publico o privado
			"prod_material":"madera de pino",
			"prod_en_existencia":"", // stock del producto
			"prod_ingreso":"", // fecha de ingreso al producto
			"prod_precio":"7000", // precio del producto 
			"prod_categoria":"dormitorio niños", // categoria
			"prod_meta_title":"", // para el search
			"prod_meta_description":"", // search
			"prod_meta_keywords":"",  // search 
			"prod_estado":"true", // habilitado o no 
			"prod_nuevo":"false", // si el producto esta oferta
			"prod_oferta":"false", // si el producto esta oferta
			"prod_precio_oferta":"6000" // si el producto esta oferta

			}

			FBZ.model.products.producto2 = {

			"prod_id":"002",  // numero de ingreso a la bd
			"prod_short_name":"Lampara", // nombre corto del producto 
			"prod_nombre":"Lampara Retro", // nombre largo
			"prod_codigo":"000002", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"1",// imagen grande
			"prod_imagen_1000":"/assets/img/productos/lampara/big_1000/lampara01.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/lampara/med_500/lampara01.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/lampara/small_200/lampara01.png", // imagen chica
			"prod_link":"velador", // url especifica producto
			"prod_publicado":"true", // si es publico o privado
			"prod_material":"madera de pino",
			"prod_en_existencia":"", // stock del producto
			"prod_ingreso":"", // fecha de ingreso al producto
			"prod_precio":"7000", // precio del producto 
			"prod_categoria":"living", // categoria
			"prod_meta_title":"", // para el search
			"prod_meta_description":"", // search
			"prod_meta_keywords":"",  // search 
			"prod_estado":"true", // habilitado o no 
			"prod_nuevo":"true", // si el producto esta oferta
			"prod_oferta":"false", // si el producto esta oferta
			"prod_precio_oferta":"6000" // si el producto esta oferta

			}
			FBZ.model.products.producto3 = {

			"prod_id":"003",  // numero de ingreso a la bd
			"prod_short_name":"Velador", // nombre corto del producto 
			"prod_nombre":"Velador Elegante", // nombre largo
			"prod_codigo":"000003", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"16",// imagen grande
			"prod_imagen_1000":"/assets/img/productos/Velador02/big_1000/velador15.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/Velador02/med_500/velador15.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/Velador02/small_200/velador15.png", // imagen chica
			"prod_link":"velador", // url especifica producto
			"prod_publicado":"true", // si es publico o privado
			"prod_material":"madera de pino",
			"prod_en_existencia":"", // stock del producto
			"prod_ingreso":"", // fecha de ingreso al producto
			"prod_precio":"7000", // precio del producto 
			"prod_categoria":"living", // categoria
			"prod_meta_title":"", // para el search
			"prod_meta_description":"", // search
			"prod_meta_keywords":"",  // search 
			"prod_estado":"true", // habilitado o no 
			"prod_nuevo":"false", // si el producto esta oferta
			"prod_oferta":"true", // si el producto esta oferta
			"prod_precio_oferta":"6000" // si el producto esta oferta
			}

			FBZ.model.products.producto4 = {

			"prod_id":"004",  // numero de ingreso a la bd
			"prod_short_name":"Mesa", // nombre corto del producto 
			"prod_nombre":"Mesa", // nombre largo
			"prod_codigo":"000004", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"16",// imagen grande
			"prod_imagen_1000":"/assets/img/productos/Mesa01/big_1000/m15.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/Mesa01/med_500/m15.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/Mesa01/small_200/m15.png", // imagen chica
			"prod_link":"mesa 02 ", // url especifica producto
			"prod_publicado":"true", // si es publico o privado
			"prod_material":"madera de pino",
			"prod_en_existencia":"", // stock del producto
			"prod_ingreso":"", // fecha de ingreso al producto
			"prod_precio":"7000", // precio del producto 
			"prod_categoria":"comedor", // categoria
			"prod_meta_title":"", // para el search
			"prod_meta_description":"", // search
			"prod_meta_keywords":"",  // search 
			"prod_estado":"true", // habilitado o no 
			"prod_nuevo":"true", // si el producto esta oferta
			"prod_oferta":"true", // si el producto esta oferta
			"prod_precio_oferta":"6000" // si el producto esta oferta

			}
			FBZ.model.products.producto5 = {

			"prod_id":"005",  // numero de ingreso a la bd
			"prod_short_name":"Mesa 02", // nombre corto del producto 
			"prod_nombre":"Mesa 02", // nombre largo
			"prod_codigo":"000005", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"16",// imagen grande
			"prod_imagen_1000":"/assets/img/productos/Mesa02/big_1000/m15.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/Mesa02/med_500/m15.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/Mesa02/small_200/m15.png", // 		"prod_link":"velador", // url especifica producto
			"prod_publicado":"true", // si es publico o privado
			"prod_material":"madera de pino",
			"prod_en_existencia":"", // stock del producto
			"prod_ingreso":"", // fecha de ingreso al producto
			"prod_precio":"7000", // precio del producto 
			"prod_categoria":"living", // categoria
			"prod_meta_title":"", // para el search
			"prod_meta_description":"", // search
			"prod_meta_keywords":"",  // search 
			"prod_estado":"true", // habilitado o no 
			"prod_nuevo":"true", // si el producto esta oferta
			"prod_oferta":"true", // si el producto esta oferta
			"prod_precio_oferta":"6000" // si el producto esta oferta

			}
			FBZ.model.products.producto6 = {

			"prod_id":"006",  // numero de ingreso a la bd
			"prod_short_name":"Silla 1", // nombre corto del producto 
			"prod_nombre":"Silla 1", // nombre largo
			"prod_codigo":"000006", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"16",// imagen grande
			"prod_imagen_1000":"/assets/img/productos/Silla01/big_1000/silla01_16.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/Silla01/med_500/silla01_16.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/Silla01/small_200/silla01_16.png", // imagen chica
			"prod_link":"velador", // url especifica producto
			"prod_publicado":"true", // si es publico o privado
			"prod_material":"madera de pino",
			"prod_en_existencia":"", // stock del producto
			"prod_ingreso":"", // fecha de ingreso al producto
			"prod_precio":"7000", // precio del producto 
			"prod_categoria":"living", // categoria
			"prod_meta_title":"", // para el search
			"prod_meta_description":"", // search
			"prod_meta_keywords":"",  // search 
			"prod_estado":"true", // habilitado o no 
			"prod_nuevo":"true", // si el producto esta oferta
			"prod_oferta":"true", // si el producto esta oferta
			"prod_precio_oferta":"6000" // si el producto esta oferta

			}
			FBZ.model.products.producto7 = {

			"prod_id":"007",  // numero de ingreso a la bd
			"prod_short_name":"Silla 02", // nombre corto del producto 
			"prod_nombre":"Silla 02", // nombre largo
			"prod_codigo":"000007", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"16",// imagen grande
			"prod_imagen_1000":"/assets/img/productos/Silla02/big_1000/silla02_16.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/Silla02/med_500/silla02_16.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/Silla02/small_200/silla02_16.png", // imagen chica
			"prod_link":"#silla02", // url especifica producto
			"prod_publicado":"true", // si es publico o privado
			"prod_material":"madera de pino",
			"prod_en_existencia":"", // stock del producto
			"prod_ingreso":"", // fecha de ingreso al producto
			"prod_precio":"7000", // precio del producto 
			"prod_categoria":"dormitorio ", // categoria
			"prod_meta_title":"", // para el search
			"prod_meta_description":"", // search
			"prod_meta_keywords":"",  // search 
			"prod_estado":"true", // habilitado o no 
			"prod_nuevo":"true", // si el producto esta oferta
			"prod_oferta":"true", // si el producto esta oferta
			"prod_precio_oferta":"6000" // si el producto esta oferta

			}
			FBZ.model.products.producto8 = {

			"prod_id":"007",  // numero de ingreso a la bd
			"prod_short_name":"Silla 03", // nombre corto del producto 
			"prod_nombre":"Silla 03", // nombre largo
			"prod_codigo":"000007", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"16",// imagen grande
			"prod_imagen_1000":"/assets/img/productos/Silla03/big_1000/Silla12.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/Silla03/med_500/Silla12.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/Silla03/small_200/Silla12.png", // imagen chica
			"prod_link":"#silla02", // url especifica producto
			"prod_publicado":"true", // si es publico o privado
			"prod_material":"madera de pino",
			"prod_en_existencia":"", // stock del producto
			"prod_ingreso":"", // fecha de ingreso al producto
			"prod_precio":"7000", // precio del producto 
			"prod_categoria":"living", // categoria
			"prod_meta_title":"", // para el search
			"prod_meta_description":"", // search
			"prod_meta_keywords":"",  // search 
			"prod_estado":"true", // habilitado o no 
			"prod_nuevo":"true", // si el producto esta oferta
			"prod_oferta":"true", // si el producto esta oferta
			"prod_precio_oferta":"6000" // si el producto esta oferta

			}

			FBZ.model.products.producto9 = {

			"prod_id":"008",  // numero de ingreso a la bd
			"prod_short_name":"Silla 04", // nombre corto del producto 
			"prod_nombre":"Silla 04", // nombre largo
			"prod_codigo":"000008", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"16",// imagen grande
			"prod_imagen_1000":"/assets/img/productos/Silla04/big_1000/s12.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/Silla04/med_500/s12.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/Silla04/smal_200/s12.png", // imagen chica
			"prod_link":"#silla02", // url especifica producto
			"prod_publicado":"true", // si es publico o privado
			"prod_material":"madera de pino",
			"prod_en_existencia":"", // stock del producto
			"prod_ingreso":"", // fecha de ingreso al producto
			"prod_precio":"7000", // precio del producto 
			"prod_categoria":"comedor", // categoria
			"prod_meta_title":"", // para el search
			"prod_meta_description":"", // search
			"prod_meta_keywords":"",  // search 
			"prod_estado":"true", // habilitado o no 
			"prod_nuevo":"true", // si el producto esta oferta
			"prod_oferta":"true", // si el producto esta oferta
			"prod_precio_oferta":"6000" // si el producto esta oferta

			}


		},


		headerTransform : function () {
			$(window).on('wheel', FBZ.control.collapseHeader );
		},

		collapseHeader : function(e) {


		
			var delta = e.originalEvent.deltaY;

				if (delta > 0) {
						// function() { FBZ.control.updateScrollPosition("up") }.debounce(150);
						// FBZ.control.updateScrollPosition("up")
				}else { 
						// function() { FBZ.control.updateScrollPosition("down") }.debounce(150);
					FBZ.control.updateScrollPosition("down");
				}
		},

		updateScrollPosition : function (direction) {

			// console.log(direction);
			// console.log( $(document).scrollTop() );
				$(window).off('wheel', FBZ.control.collapseHeader );

			 $(".logo-header-shield").addClass("active"); 
			 $(".search-box").addClass("active"); 
			 $(".login-box").addClass("active"); 
			 $(".masthead").addClass("active"); 
			 $("section").addClass("active"); 

		},

		compactHeader : function () {


		},

			// process the form
		formFunctionality:function(event) {

				console.log("formFunctionality running");
				// stop the form from submitting the normal way 
				// event.preventDefault();

			
				// get the form data
				var formData = {
					'comments'					: "comunicacion"
				};

				//console.dir(formData);

				// process the form
				$.ajax({
					type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
					url 		: 'http://192.168.1.215/json/', // the url where we want to POST
					data 		: formData, // our data object
					dataType 	: 'json', // what type of data do we expect back from the server
					encode 		: true
				})

				// using the done promise callback
				.always(function(data) {
						// log data to the console so we can see
						//console.dir(data);
						FBZ.control.clearFormAndDisplayThankYouMessage(data.responseText);
						}
					)
		},


		clearFormAndDisplayThankYouMessage:function(data) { 

	
			console.log("clearFormAndDisplayThankYouMessage");
				// 		// clean the fields
				// $('input[name=first_name]').val('');
				// $('input[name=last_name]').val('');
				// $('input[name=email]').val('');
				// $('#comments').val('');
				// // hide the form
				// $(".form").hide();
				// // create the answer
				// KO.Config.$overlayerContact.prepend("<div class='email-sent'>"+data+"<div class='form-actions text_centre'><input value='< go back' class='show-form-btn btn btn--primary form_el'/></div></div>");
				// KO.Config.$wrapper.find(".email-sent").find(".show-form-btn").click(KO.Config.showFormAgain);

		},




		detectPlatform : function () {

			// console.log("js platform detection : ");
			if(FBZ.model.stageW < FBZ.model.swapToMobileBreakpoint) {

				// console.log("mobile");
				// boolean to control the vertical positioning
				FBZ.model.mobileMode = true;
				FBZ.model.tabletMode = false;
				FBZ.model.desktopMode = false;

			// if this brakpoint condition is met display the tablet mode	
			} else if (FBZ.model.stageW < FBZ.model.swapToTabletBreakpoint) { 

				// console.log("tablet");

				FBZ.model.mobileMode = false;
				FBZ.model.tabletMode = true;
				FBZ.model.desktopMode = false;

			} else {

				FBZ.model.mobileMode = false;
				FBZ.model.tabletMode = false;
				FBZ.model.desktopMode = true;

				// console.log("desktop");

			}

		},

		removeLoadingCurtain : function() { 
			FBZ.control.fadeHide($(".curtain"));
		},

		determineSection : function () { 
			// this function determines the current page and assign it to a string

			var section = window.location.href.split("/");

			// console.log("section length :",section.length);

			if ( section.length <= 4 ) {

					FBZ.model.currentSection = "home";

			} else {
					FBZ.model.currentSection  = section[section.length-2];
				FBZ.control.injectSectionScript(FBZ.model.currentSection);
			}

			FBZ.model.currentArticule  = section[section.length-1];
			// console.log(FBZ.model.currentSection);

			// if(FBZ.model.currentSection == "productos"){

			// 	FBZ.control.determineProductBehavior(section); 
			// }
		},

		// determineProductBehavior : function (section) {
		// 	console.dir(section);
		// 	console.log("currentArticule :",FBZ.model.currentArticule);
		// 	FBZ.model("lala");
		// }, 

		injectSectionScript : function (jsname){

				console.log("js :",jsname);
				$.getScript(jsname+".js");
		},

		sectionMonitor : function (index) { 

			FBZ.control.determineSection();
			FBZ.model.currentSectionIndex = index;
		},

		animate : function (element,animClass) {

				if(element.hasClass("is-hidden")) {
					element.removeClass("is-hidden");
				}
				if(element.hasClass(animClass) )  {
					element.removeClass(animClass);
					element.css("offsetWidth" , element.get(0).offsetWidth);
				}
				element.addClass(animClass);
		},

		animateAndHide : function (element,animClass,time) {

				if(element.hasClass(animClass) )  {
					element.removeClass(animClass);
					element.css("offsetWidth" , element.get(0).offsetWidth);
				}
				element.addClass(animClass);

				setTimeout(function(){ 
					element.addClass("is-hidden");
				}, time);
		},


		fadeHide : function (el) { 

			el.addClass("is-fading-out");

			setTimeout(function(){ 
				el.addClass("is-hidden");
				el.removeClass("is-fading-out");
			}, 701);
		},

		fadeDivRemove : function (el) { 

			if(el.hasClass("is-fading-in") )  {
					el.removeClass("is-fading-in");
					el.css("offsetWidth" , el.get(0).offsetWidth);
				}
			el.addClass("is-fading-out");

			setTimeout(function() {
				
				el.removeClass("is-fading-out");
				$( "div" ).remove( el.selector );

			}, 501);
		},

		fadeShow : function (el) { 

			el.addClass("is-fading-in");
			el.removeClass("is-hidden");

			setTimeout(function(){ 

				el.removeClass("is-fading-in");
			}, 701);
		},

		multilingualEngine : function () {

			// multilingual plugin config . 

			i18n = window.domI18n({
				selector: '[data-translatable]',
				separator: ' // ',
				languages: ['es', 'en'],
				defaultLanguage: 'es'
			});
			
			FBZ.view.$langBtn.click(function(){
				
				var languageSelected = $(this).attr('lang');
				FBZ.control.changeLanguage(languageSelected);
			//	console.log("change language to :",languageSelected);
				
				var buttons = $.find(".lang-btn");
				for(var i = 0 ; i < buttons.length ; i ++ ) { 
					$(buttons[i]).removeClass("active");
					// console.dir(buttons[i],buttons[i]);
				//	if (buttons[i].hasClass("active")) {
				//	}
				}
			//	console.log($.find(".lang-btn").hasClass("active").removeClass("active" ));	
				$(this).addClass("active" );
			});

			FBZ.control.updateLanguage();
		},
		
		updateLanguage : function () {

			FBZ.control.changeLanguage(FBZ.model.currentLang);
		},

		changeLanguage : function (language) { 

			i18n.changeLanguage(language);
		//	console.log("changeLanguage");
			FBZ.model.currentLang = language;
		},

		getHeight : function (obj) {

			var value = obj.height();
			return value;
		},

		getWidth : function(obj) {

			var value = obj.width();
			return value;
		},
		defineStage : function ( ) { 

			FBZ.model.stageH = FBZ.control.getHeight(FBZ.view.$stage);
			FBZ.model.stageW = FBZ.control.getWidth(FBZ.view.$stage);
			FBZ.control.detectPlatform();

		//	console.log("def stage", FBZ.model.stageH, FBZ.model.stageW );

		},

		// function to trigger when you resize stage
		onResizeStage : function ()  { 

			$(window).resize(function() {
				// to re - resize the layout . 
				FBZ.control.defineStage();
				FBZ.control.resizeContentBlock();

			}.debounce(150));

		},

		resizeContentBlock : function () { 
			FBZ.view.$block.css("width",FBZ.model.stageW);
			FBZ.view.$block.css("height",FBZ.model.stageH);
		},

		toCamelCase: function (str){
			return str.toLowerCase().replace(/(\-[a-z])/g, function($1){
				return $1.toUpperCase().replace('-','');
			});
		},

		setCss3Style: function (el,prop,val){

			var vendors = ['-moz-','-webkit-','-o-','-ms-','-khtml-',''];

			for(var i=0,l=vendors.length;i<l;i++)
				{
					var p = FBZ.control.toCamelCase(vendors[i] + prop);
					if(p in el.style)
						el.style[p] = val;
				}
		}
	};
	// Example module
	/*
	FBZ.MyExampleModule = {
		init : function () {
			FBZ.MyExampleModule.setupEvents();
		},

		setupEvents : function () {
			//do some more stuff in here
		}
	};
	*/

})(window.FBZ = window.FBZ || {}, jQuery);

// multilingual support obj
var i18n;

// debounce prototype
Function.prototype.debounce = function (milliseconds) {
    var baseFunction = this,
        timer = null,
        wait = milliseconds;

    return function () {
        var self = this,
            args = arguments;

        function complete() {
            baseFunction.apply(self, args);
            timer = null;
        }

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(complete, wait);
    };
};

