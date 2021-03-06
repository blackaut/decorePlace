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
		prod_categorias : [],
		filterProducts : "",
		specialCategory : false,
		totalFeaturedImages : 0,
		currentImage : 0,
		currentFavouritedProducts : 0,
		currentShoppedProducts : 0,
		featuredProducts: [],
		sliderCurrentImage : 0,
		sliderClock: {} ,
		sliderTime: 5000,
		sliderTotalImage:0,
		favouriteProductsCollection: [],
		purchasedProductsCollection: [],


	};

	FBZ.view = {

		// add dom elements here
		$stage 				:$(window),
		$header				:$('header'),
		$main				:$('.main'),
		$block				:$('.block'),
		$langBtn			:$('.lang-btn'),
		$footer				:$('footer'),
		$featureProducts	:$('.feature-products-slideshow'),
		$favouriteProducts	:$('.favourite-products-slideshow'),
		$offerProducts 		:$('.offer-products-text'),
		$iconBag 			:$('.login-box-icon .icon-bag'),
		$iconHeart 			:$('.login-box-icon .icon-heart'),
		$numberIconHeart	:$($('.small-number')[0]),
		$numberIconBag		:$($('.small-number')[1]),
		$offerProducts 		:$('.offer-products-text'),
		$arrowFavLeft		:$('.favoritos .arrow-left'),
		$arrowFavRight		:$('.favoritos .arrow-right'),
		$menuButton			:$('.icon-burger'),
		$siteMenu			:$('.site-menu'),
		$siteButton			:$('.menu-btn'),
		$burgerParts		:$('.burger-part'),

		// FBZ.view.sliderHomeControl
	};

	FBZ.control = {
		// add function here
		init : function () {
			console.debug('DecorePlace is running');
		// initial functions 
		FBZ.control.readProducts();
		FBZ.control.determineSection();
		FBZ.control.onResizeStage();
		FBZ.control.defineStage();
		FBZ.control.scrolltoTop();

		FBZ.control.resizeContentBlock();
		FBZ.control.multilingualEngine(); 
		// FBZ.control.formFunctionality();
		FBZ.control.headerTransform();

		//activate complementarySections
		 
		FBZ.control.activateSearchExpansion();
		FBZ.control.activateBurger();

		// this function add the top number of the login box, first favoirtes and the carrito
		FBZ.control.updateNumbersLoginBox(0,0);

		FBZ.control.activateFavouriteHearts();


		FBZ.control.removeLoadingCurtain();

		},

		scrolltoTop : function () {

			// just to avoid bug that overlaps the non collapsed logo
			$(this).scrollTop(0);
			console.log("scrool");
		},


		activateFavouriteHearts: function () {
			FBZ.view.hearts = $(".icon-heart");
			FBZ.view.hearts.append("<img class='login-box-heart-svg login-box-heart-svg-full' src='/assets/img/heart_full.svg' alt='heart'>");
			FBZ.view.hearts.on("mouseout",FBZ.control.onRollOutHeart);
			FBZ.view.hearts.on("mouseover",FBZ.control.onRollOverHeart);
			FBZ.view.hearts.on("click",FBZ.control.onClickHeart);
		
		},

		onRollOverHeart : function (e) {

			$(e.currentTarget).find(".login-box-heart-svg-full").css("opacity",1);
			console.log("over");
		},
		onRollOutHeart : function (e) {

			$(e.currentTarget).find(".login-box-heart-svg-full").css("opacity",0);

		},


		onClickHeart : function (e) {
			e.stopPropagation();
			console.log( $(e.currentTarget).parent()[0]);
			
			var key;
			var obj;
				// console.log("triggered CLICK lightbox");
				 key  = $(e.currentTarget).parent()[0].attributes.productKey.nodeValue;
				 obj = FBZ.model.products[key];


			 FBZ.control.addProductToFavourites(obj);
		},

		onClickPurchase : function (e) {
			e.stopPropagation();
			var key;
			var obj;
				// console.log("triggered CLICK lightbox");
				 key  = $(e.currentTarget).parent().parent().parent().parent()[0].attributes.productKey.nodeValue;
			console.log( $(e.currentTarget).parent().parent().parent().parent()[0], key);
				 obj = FBZ.model.products[key];

			 FBZ.control.addProductToPurchased(obj);
		},


		updateNumbersLoginBox: function (favoritos,comprados) {

			var heartIconToDisplay = FBZ.model.currentFavouritedProducts = favoritos;
			var bagIconToDisplay = FBZ.model.currentShoppedProducts  = comprados;

			// to max out the numbers
			if ( heartIconToDisplay > 99 ) {
				heartIconToDisplay = 99; 
			}

			if ( bagIconToDisplay >	 99 ) {
				bagIconToDisplay = 99; 
			}

			// $('.small-number')(0).hide();

			if ( heartIconToDisplay > 0 ) {
				FBZ.view.$numberIconHeart.html(heartIconToDisplay);	
				FBZ.control.fadeShow(FBZ.view.$numberIconHeart);

			}else {
				FBZ.control.fadeHide(FBZ.view.$numberIconHeart);
			}

			if ( bagIconToDisplay > 0 ) {
				FBZ.view.$numberIconBag.html(bagIconToDisplay);
				FBZ.control.fadeShow(FBZ.view.$numberIconBag);	

			} else {
				FBZ.control.fadeHide(FBZ.view.$numberIconBag);
			}
		},

/// comprar 

		addProductToFavourites : function (product) {

			FBZ.model.favouriteProductsCollection.push(product);
			console.dir(FBZ.model.favouriteProductsCollection);
			FBZ.control.updateNumbersLoginBox(parseInt(FBZ.model.currentFavouritedProducts)+1,FBZ.model.currentShoppedProducts);
		},

		addProductToPurchased : function (product) {
			console.log(product);
			FBZ.model.purchasedProductsCollection.push(product);
			console.dir(FBZ.model.purchasedProductsCollection);
			FBZ.control.updateNumbersLoginBox(FBZ.model.currentFavouritedProducts,FBZ.model.currentShoppedProducts+1);
		},


		// jumpTofavoritos: function () {
		// 	$offerProducts.on("click",)
		// 	$iconBag 		
		// 	$iconHeart 		
		// 	$offerProducts 
		// },

		// jumpToCarrito_de_compras: function () {
			
		// },

		// jumpToMarcas() :function{

		// },

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
			"prod_precio_oferta":"6000", // si el producto esta oferta
			"prod_destacado":"true",

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
			"prod_link":"lampara", // url especifica producto
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
			"prod_precio_oferta":"6000", // si el producto esta oferta
			"prod_destacado":"true",

			}
			FBZ.model.products.producto3 = {

			"prod_id":"003",  // numero de ingreso a la bd
			"prod_short_name":"Velador", // nombre corto del producto 
			"prod_nombre":"Velador Elegante", // nombre largo
			"prod_codigo":"000003", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"16",// imagen grande
			"prod_imagen_1000":"/assets/img/productos/Velador02/big_1000/velador01.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/Velador02/med_500/velador01.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/Velador02/small_200/velador01.png", // imagen chica
			"prod_link":"velador-elegante", // url especifica producto
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
			"prod_precio_oferta":"6000", // si el producto esta oferta
			"prod_destacado":"true",

			}

			FBZ.model.products.producto4 = {

			"prod_id":"004",  // numero de ingreso a la bd
			"prod_short_name":"Mesa", // nombre corto del producto 
			"prod_nombre":"Mesa", // nombre largo
			"prod_codigo":"000004", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"16",// imagen grande
			"prod_imagen_1000":"/assets/img/productos/Mesa01/big_1000/m01.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/Mesa01/med_500/m01.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/Mesa01/small_200/m01.png", // imagen chica
			"prod_link":"mesa-01", // url especifica producto
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
			"prod_precio_oferta":"6000", // si el producto esta oferta
			"prod_destacado":"true",

			}
			FBZ.model.products.producto5 = {

			"prod_id":"005",  // numero de ingreso a la bd
			"prod_short_name":"Mesa 02", // nombre corto del producto 
			"prod_nombre":"Mesa 02", // nombre largo
			"prod_codigo":"000005", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"16",// imagen grande
			"prod_imagen_1000":"/assets/img/productos/Mesa02/big_1000/m01.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/Mesa02/med_500/m01.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/Mesa02/small_200/m01.png", // 		"prod_link":"velador", // url especifica producto
			"prod_link":"mesa-02", // url especifica producto

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
			"prod_precio_oferta":"6000", // si el producto esta oferta
			"prod_destacado":"true",

			}
			FBZ.model.products.producto6 = {

			"prod_id":"006",  // numero de ingreso a la bd
			"prod_short_name":"Silla 1", // nombre corto del producto 
			"prod_nombre":"Silla 1", // nombre largo
			"prod_codigo":"000006", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"16",// imagen grande
			"prod_imagen_1000":"/assets/img/productos/Silla01/big_1000/silla01_01.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/Silla01/med_500/silla01_01.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/Silla01/small_200/silla01_01.png", // imagen chica
			"prod_link":"silla-01", // url especifica producto
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
			"prod_precio_oferta":"6000", // si el producto esta oferta
			"prod_destacado":"true",

			}
			FBZ.model.products.producto7 = {

			"prod_id":"007",  // numero de ingreso a la bd
			"prod_short_name":"Silla 02", // nombre corto del producto 
			"prod_nombre":"Silla 02", // nombre largo
			"prod_codigo":"000007", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"16",// imagen grande
			"prod_imagen_1000":"/assets/img/productos/Silla02/big_1000/silla02_01.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/Silla02/med_500/silla02_01.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/Silla02/small_200/silla02_01.png", // imagen chica
			"prod_link":"silla-02", // url especifica producto
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
			"prod_precio_oferta":"6000", // si el producto esta oferta
			"prod_destacado":"true",

			}
			FBZ.model.products.producto8 = {

			"prod_id":"007",  // numero de ingreso a la bd
			"prod_short_name":"Silla 03", // nombre corto del producto 
			"prod_nombre":"Silla 03", // nombre largo
			"prod_codigo":"000007", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"16",// imagen grande
			"prod_imagen_1000":"/assets/img/productos/Silla03/big_1000/Silla01.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/Silla03/med_500/Silla01.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/Silla03/small_200/Silla01.png", // imagen chica
			"prod_link":"silla-03", // url especifica producto
			"prod_publicado":"true", // si es publico o privado
			"prod_material":"madera de pino",
			"prod_en_existencia":"", // stock del producto
			"prod_ingreso":"", // fecha de ingreso al producto
			"prod_precio":"7000", // precio del producto 
			"prod_categoria":"living", // categoria
			"prod_meta_title":"", // para el search
			"prod_meta_description":"", // search
			"prod_destacado":"true",
			"prod_meta_keywords":"",  // search 
			"prod_estado":"true", // habilitado o no 
			"prod_nuevo":"true", // si el producto esta oferta
			"prod_oferta":"true", // si el producto esta oferta
			"prod_precio_oferta":"6000", // si el producto esta oferta
			"prod_destacado":"false"

			}

			FBZ.model.products.producto9 = {

			"prod_id":"008",  // numero de ingreso a la bd
			"prod_short_name":"Silla 04", // nombre corto del producto 
			"prod_nombre":"Silla 04", // nombre largo
			"prod_codigo":"000008", // codigo de 6 numeros
			"prod_descripcion":"Una de las principales cualidades de este mueble es que posee una estructura clásica, adaptable a cualquier lugar o tipo de ambientación. Su color madera hace que sea fácil de combinar con otros colores. Es un perfecto organizador con el cual ya no tendrás objetos desparramados por tu pieza. Podrás evitar perder tus cosas si sabes que siempre estarán guardadas en el cajón de tu velador. Esta mesa de luz es ideal para colocarla en tu dormitorio al lado de tu cama.", // descripcion del producto
			"prod_marca":"rematime",// marca del producto
			"cant_imagen":"16",// imagen grande
			"prod_imagen_1000":"/assets/img/productos/Silla04/big_1000/s01.png",// imagen grande
			"prod_imagen_500":"/assets/img/productos/Silla04/med_500/s01.png", // imagen mediana
			"prod_imagen_200":"/assets/img/productos/Silla04/smal_200/s01.png", // imagen chica
			"prod_link":"silla-04", // url especifica producto
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
			"prod_precio_oferta":"6000", // si el producto esta oferta
			"prod_destacado":"false"

			}

		},

		returnProductIndex: function (obj) {
			console.log("returnProductIndex : ",obj);
		},

		load360 : function (e) {

			 $(e.currentTarget).off("mouseover",FBZ.control.load360);

			 $(e.currentTarget).on("mouseout",FBZ.control.pause360);
			 $(e.currentTarget).on("mouseover",FBZ.control.play360);


			var key  = e.currentTarget.attributes.productKey.nodeValue;
			var obj = FBZ.model.products[key];
			obj.displayedImage = $( e.currentTarget ).find("picture").find("img");
			obj.displayedImageWidth = obj.displayedImage.width();
			obj.displayedImageName = obj.displayedImage.attr("srcset");

			// console.log(obj.displayedImage.attr("srcset"), obj.displayedImageWidth);

			// create an array of all the images available
			FBZ.control.create360Array(obj);
			// console.dir(obj);

			var options = obj.displayedImage.threesixty({images:obj.imagesToSpin, method:'auto',autoscrollspeed:'200' ,direction:'forward', object: obj,sensibility: 1}); 
			// console.dir(obj.autoInterval);
			obj.pause = false;

		},
		pause360 : function(e) {

			// console.dir(e);
			FBZ.control.getDataObjFromCurrentTarget(e.currentTarget).pause = true;
			// window.clearInterval(interval);
		},
		play360 : function(e) {

			// console.dir(e);
			FBZ.control.getDataObjFromCurrentTarget(e.currentTarget).pause = false;
			// window.clearInterval(interval);
		},

		getDataObjFromCurrentTarget: function (event) {
			var key  = event.attributes.productKey.nodeValue;
			var obj = FBZ.model.products[key];
			return obj;
		},

		create360Array : function (obj) {

			// grab the image url and replace the numbers then, iterate and put them in an array.
			var currentImage  = obj.displayedImageName;
			var imageURLLastBit = currentImage.substr(-4);
			var imageURL = currentImage.substring(0, currentImage.length - 6);
			var extraZero = 0;
			obj.imagesToSpin = [];
			for (var i = 1 ; obj.cant_imagen >= i ; i ++) {
 			
 				if(i > 9) { extraZero=""};
				obj.imagesToSpin.push(imageURL+extraZero+i+imageURLLastBit)
			}

		},

		// stop360Spin : function (e) {

		// 	if(e){
		// 		 window.clearInterval(e);
		// 		e = null;
		// 	}
		// },


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
				}
				FBZ.control.updateScrollPosition("down");

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
					FBZ.control.populateFeaturedProducts();

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

				// console.log("js :",jsname);
				$.getScript(jsname+".js");
		},

		sectionMonitor : function (index) { 

			FBZ.control.determineSection();
			FBZ.model.currentSectionIndex = index;
		},


		URLReplaceValue: function (nameSection,nameArticle) {

			// console.log("historyPushValue",nameSection,nameArticle);
			
			// console.log(FBZ.model.stateObj,"/"+nameSection+"/"+nameArticle); 
					
				if (nameArticle == "null" ) {
					// console.log("nameArticle null");
					history.replaceState(FBZ.control.stateObj,"", "/"+nameSection);
				}else {

					nameArticle = nameArticle.replace(/ /g,'-');

					// // nasty amend for Sendmeanemail bug
					// if( nameArticle == "Sendmeanemail" ) {

					// 	nameArticle = "";
					// }
					// console.log("nameArticle  not null");

					// console.log(FBZ.model.stateObj,"/"+nameSection+"/"+nameArticle); 
					history.replaceState(FBZ.model.stateObj,"", "/"+nameSection+"/"+nameArticle);
				}

		},

		isObject : function (val) {
			return (typeof val);
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
		},


/// ligthbox

		createProductBox : function (e) {
			// console.log("createbox :");
			// console.dir(e.key); 
			var key;
			var obj; 

			if(e.key != undefined) {
				// console.log("triggered URL lightbox");
				obj = e; 
				key = obj.key;

			}else {

				// console.log("triggered CLICK lightbox");
				key  = e.currentTarget.attributes.productKey.nodeValue;
				obj = FBZ.model.products[key];
					if ( FBZ.model.currentArticule == "#nuevos" || FBZ.model.currentArticule == "#ofertas") {
						FBZ.model.filterProducts = FBZ.model.currentArticule;
						// console.log("special category");

					}
				FBZ.control.URLReplaceValue(FBZ.model.currentSection,"#"+obj.prod_link);
			}
			// console.dir(obj); 

			FBZ.model.lightbox =  "<div id='lightbox' productId='"+obj.prod_id+"' productKey='"+key+"' ><a class='close-button-lightbox'><img src='../assets/img/close.svg' alt='close'></a>"
			+"<div id='lightbox-content'>" //insert clicked link's href into img src
				+"<div class='lightbox-sidebar'>"
					+"<picture class='product-view-01'>"
						+"<source srcset='"+obj.prod_imagen_200+"' media='(max-width: 320px)'/>"
						+"<source srcset='"+obj.prod_imagen_500+"' media='(max-width: 650px)'/>"
						+"<source srcset='"+obj.prod_imagen_1000+"' media='(max-width: 900px)'/>"
						+"<img srcset='"+obj.prod_imagen_1000+"' alt='"+obj.prod_nombre+"'/>"
					+"</picture>"
					+"<picture class='product-view-02'>"
						+"<source srcset='"+obj.prod_imagen_200+"' media='(max-width: 320px)'/>"
						+"<source srcset='"+obj.prod_imagen_500+"' media='(max-width: 650px)'/>"
						+"<source srcset='"+obj.prod_imagen_1000+"' media='(max-width: 900px)'/>"
						+"<img srcset='"+obj.prod_imagen_1000+"' alt='"+obj.prod_nombre+"'/>"
					+"</picture>"
					+"<picture class='product-view-02'>"
						+"<source srcset='"+obj.prod_imagen_200+"' media='(max-width: 320px)'/>"
						+"<source srcset='"+obj.prod_imagen_500+"' media='(max-width: 650px)'/>"
						+"<source srcset='"+obj.prod_imagen_1000+"' media='(max-width: 900px)'/>"
						+"<img srcset='"+obj.prod_imagen_1000+"' alt='"+obj.prod_nombre+"'/>"
					+"</picture>"
				+"</div>"
						+"<div class='lightbox-main'>"
							+"<picture class='product-main'>"
								+"<source srcset='"+obj.prod_imagen_200+"' media='(max-width: 320px)'/>"
								+"<source srcset='"+obj.prod_imagen_500+"' media='(max-width: 650px)'/>"
								+"<source srcset='"+obj.prod_imagen_1000+"' media='(max-width: 900px)'/>"
								+"<img srcset='"+obj.prod_imagen_1000+"' alt='"+obj.prod_nombre+"'/>"
							+"</picture>"
							+"<div class='product-info'>"
								+"<p class='item-name'>"+obj.prod_nombre+"</p>"
								+"<p class='item-brand'>"+obj.prod_marca+"</p>"
								+"<p class='item-price'>"+obj.prod_precio+" CLP</p>"
								+"<p class='item-material'>"+obj.prod_material+"</p>"
								+"<p class='item-description'>"+obj.prod_descripcion+"</p>"
								+"<button class='buy-button' name='comprar' type='comprar' value='comprar'>COMPRAR</button>"
							+"</div>"
				+"</div>"

				+"<div class='favoritos one-column'>"
						+"<h4>otros similares</h4>"
						+"<div class='favourite-products-slideshow'>"
							+"<a class='arrow arrow-left'>"
									+"<img src='../assets/img/arrow.svg' alt='arrow'>"
							+"</a>"
							+"<div class='favourite-slideshow-container'>"
								+"<div class='favourite-product'>"
									+"<div class='favourite-box-icon icon-heart'>"
										+"<img class='login-box-heart-svg' src='/assets/img/heart.svg' alt='heart'/>"
									+"</div>"
									+"<img class='product-image-favourite' alt='Favourite product' src='../assets/img/chair_dummy.png'>"
									+"<div class='product-info-favourite'>"
										+"<p class='item-name '>SOFA BLU</p>"
										+"<p class='item-brand'>marca</p>"
										+"<p class='item-price'>230.000 CLP</p>"
									+"</div>"
								+"</div>"
							+"</div>"
								+"<a class='arrow arrow-right'>"
									+"<img src='../assets/img/arrow.svg' alt='arrow'>"
								+"</a>"
							+"</div>"
				+'</div>';

				//insert lightbox HTML into page
				$('body').append(FBZ.model.lightbox);
				$('#lightbox').addClass("is-fading-in"); 
				// console.log($('#lightbox'));
				$('#lightbox').find(".close-button-lightbox").on("click",FBZ.control.closeLightbox); 
				$('#lightbox').find(".buy-button").on("click",FBZ.control.onClickPurchase); 


				// add the 360 rotation
			// var key  = e.currentTarget.attributes.productKey.nodeValue;
			// var obj = FBZ.model.products[key];
				obj.displayedImage = $('#lightbox').find("picture").find("img");
				obj.displayedImageWidth = obj.displayedImage.width();
				obj.displayedImageName = obj.displayedImage.attr("srcset");

				// create an array of all the images available
				FBZ.control.create360Array(obj);

				var options = obj.displayedImage.threesixty({images:obj.imagesToSpin, method:'click',autoscrollspeed:'200' ,direction:'forward', object: obj,sensibility: 1}); 

		},




		closeLightbox : function () {

				console.log("close");
				// console.log(FBZ.model.currentSection,FBZ.model.filterProducts);
				$('#lightbox').find(".close-button-lightbox").off("click",FBZ.control.closeLightbox);
				FBZ.control.fadeDivRemove( $('#lightbox'));
				FBZ.control.URLReplaceValue(FBZ.model.currentSection,FBZ.model.filterProducts);

				// $( "div" ).remove( '#lightbox');
		},
			activateSearchExpansion: function () {
				
				$(".search-box-icon").click( function() { $(".search-text").focus() });

			},

			// burger menu 
			activateBurger: function () {

				FBZ.view.$menuButton.on("click",FBZ.control.onClickBurger);

			},

			onClickBurger : function (e) {

				FBZ.view.$burgerParts.toggleClass("cross");
				FBZ.view.$siteMenu.toggleClass("active" );
				FBZ.view.$siteButton.toggleClass( "active");
				e.preventDefault();
				console.log("burger clicked");
			},

// arrows fav

		// activateFavouritesArrowControl: function () { 

		// 	console.log(FBZ.view.$favouriteProducts.width(),FBZ.view.$favouriteProducts.children().width());

		// 	// FBZ.view.$arrowFavLeft.on('click',moveFavouritesLeft); 	
		// 	// FBZ.view.$arrowFavRight.on('click',moveFavouritesRight);


		// },


// feature product sliders


		populateFeaturedProducts : function () {

			// console.log("feature-product :",FBZ.model.products,);
				FBZ.view.$featureProducts.append(
					"<div class='slider-control slider-home-control'></div>"
				);
				FBZ.view.sliderHomeControl = $(".slider-home-control");

				// iterate to inject all the products defined
				$.each(FBZ.model.products, function(key,value) {

					if (value.prod_destacado.toString() == "true") {
							FBZ.control.injectFeaturedProduct(value,key);
							FBZ.control.injectFavouriteProduct(value,key);
							
							// console.log(key, "prod destacado:",value);
							FBZ.view.sliderHomeControl.append("<div class='slider-dot'></div>")
							
						}
				});

				FBZ.control.activateFeaturedProducts();
				FBZ.control.activateFavouriteProducts();

				FBZ.model.sliderTotalImage  = FBZ.view.sliderHomeControl.children().length-1;

				FBZ.view.sliderHomeControl.children().on("click",FBZ.control.onDotClick);
				

				FBZ.control.changeImageToIndex(0);

				FBZ.control.playSlider();
				FBZ.control.createInterval();


				// FBZ.control.activateFavouritesArrowControl();
				// FBZ.view.product = $(".product");
				// FBZ.view.product.on("click",FBZ.control.createProductBox);
				// FBZ.view.product.on("mouseover",FBZ.control.load360);
			

				// FBZ.control.setupFeaturedSlider();

		},




		injectFavouriteProduct : function (obj,key) {

			var newTag = "";
			var offerTag = "";
			var lineThrough = "";

			if (obj.prod_nuevo.toString() == "true" ) {
				newTag = "<div class='product-new-tag'>nuevo</div>";
			}

			if (obj.prod_oferta.toString() == "true" ) {
				offerTag = "<div class='product-offer-tag'>"
								+"<div class='product-offer-text-wrapper'>"
									+"<h6 class='product-offer-text'>oferta</h6>"
									+"<p class='product-offer-price'>"
									+obj.prod_precio_oferta+"</p>"
							+"</div>"
						+"</div>";
				lineThrough = " line-through";
			}
			obj.key = key;

			var currentProduct = "<div class='favourite-product' productId='"+obj.prod_id+"' productKey='"+key+"'>"+
									newTag+offerTag+
									"<div class='box-icon icon-heart'>"+
										"<img class='login-box-heart-svg' src='/assets/img/heart.svg' alt='heart'/>"+
									"</div>"+
									// "<img class='product-image' alt='product' src='/assets/img/chair_dummy.png'>"+
									"<picture class='product-360'>"+
										"<source srcset='"+obj.prod_imagen_200+"' media='(max-width: 320px)'/>"+
										"<source srcset='"+obj.prod_imagen_500+"' media='(max-width: 650px)'/>"+
									"<source srcset='"+obj.prod_imagen_1000+"' media='(max-width: 900px)'/>"+
									"<img srcset='"+obj.prod_imagen_1000+"' alt='"+obj.prod_nombre+"'/>"+
									"</picture>"+
									"<div class='product-info-favourite'>"+
										"<p class='item-name'>"+obj.prod_nombre+"</p>"+
										"<p class='item-brand'>"+obj.prod_marca+"</p>"+
										"<p class='item-price"+lineThrough+"'>"+obj.prod_precio+ " CLP</p>"+
										// "<button class='buy-button' name='comprar' type='comprar' value='comprar'>COMPRAR</button>"+
									"</div>"+
								"</div>";
			// console.log(FBZ.view.$favouriteProducts,currentProduct);

			FBZ.view.$favouriteProducts.append(currentProduct);

		},



		activateFavouriteProducts : function () {
			
			FBZ.view.$favouriteProducts.children().on("click",FBZ.control.deleteInterval);
			FBZ.view.$favouriteProducts.children().on("click",FBZ.control.createProductBox);
			FBZ.view.$favouriteProducts.children().on("mouseover",FBZ.control.load360);
			FBZ.view.$favouriteProducts.children().find(".login-box-heart-svg").on("click",FBZ.control.addProductToFavourites);

		},

		injectFeaturedProduct : function (obj,key) {

			var newTag = "";
			var offerTag = "";
			var lineThrough = "";

			if (obj.prod_nuevo.toString() == "true" ) {
				newTag = "<div class='product-new-tag'>nuevo</div>";
			}

			if (obj.prod_oferta.toString() == "true" ) {
				offerTag = "<div class='product-offer-tag'>"
								+"<div class='product-offer-text-wrapper'>"
									+"<h6 class='product-offer-text'>oferta</h6>"
									+"<p class='product-offer-price'>"
									+obj.prod_precio_oferta+"</p>"
							+"</div>"
						+"</div>";
				lineThrough = " line-through";
			}

			//"prod_nuevo":"TRUE", // si el producto esta oferta
			//"prod_oferta":"TRUE", // si el producto esta oferta
			//"prod_precio_oferta":"6000" // si el producto esta oferta
			obj.key = key;

			var currentProduct = "<div class='feature-product' productId='"+obj.prod_id+"' productKey='"+key+"'>"+
									newTag+offerTag+
									// "<div class='box-icon icon-heart'>"+
										// "<img class='login-box-heart-svg' src='/assets/img/heart.svg' alt='heart'/>"+
									// "</div>"+
									// "<img class='product-image' alt='product' src='/assets/img/chair_dummy.png'>"+
									"<picture class='product-360'>"+
										"<source srcset='"+obj.prod_imagen_200+"' media='(max-width: 320px)'/>"+
										"<source srcset='"+obj.prod_imagen_500+"' media='(max-width: 650px)'/>"+
									"<source srcset='"+obj.prod_imagen_1000+"' media='(max-width: 900px)'/>"+
									"<img srcset='"+obj.prod_imagen_1000+"' alt='"+obj.prod_nombre+"'/>"+
									"</picture>"+
									"<div class='product-info'>"+
										"<p class='item-name'>"+obj.prod_nombre+"</p>"+
										"<p class='item-brand'>"+obj.prod_marca+"</p>"+
										"<p class='item-price"+lineThrough+"'>"+obj.prod_precio+ " CLP</p>"+
										"<button class='buy-button' name='comprar' type='comprar' value='comprar'>COMPRAR</button>"+
									"</div>"+
								"</div>";
			 // console.log(currentProduct, FBZ.view.$featureProducts);

			FBZ.model.featuredProducts.push(currentProduct);

			FBZ.view.$featureProducts.append(currentProduct);
			
			// var $currentCategory = $("."+ obj.prod_categoria);
			// console.log($currentCategory,"<li class='element-category-product'><a>"+obj.prod_nombre+"</a></li>");
			// FBZ.view.$featureProducts.append("<li class='element-category-product'><a>"+obj.prod_nombre+"</a></li>");
		},

		activateFeaturedProducts : function () {
			FBZ.view.$featureProducts.children().on("click",FBZ.control.createProductBox);
			FBZ.view.$featureProducts.children().on("click",FBZ.control.deleteInterval);
			FBZ.view.$featureProducts.children().on("mouseover",FBZ.control.load360);
			FBZ.view.$featureProducts.children().find(".buy-button").on("click",FBZ.control.addProductToBasket);
		}, 


		onDotClick : function (e) {

			console.log($(e.currentTarget).index());
			FBZ.control.changeImageToIndex($(e.currentTarget).index());
			FBZ.control.deleteInterval();
		},

		changeImageToIndex : function (index) {

			FBZ.view.$featureProducts.children().removeClass("active");
			FBZ.view.sliderHomeControl.children().removeClass('active');
			
			$(FBZ.view.$featureProducts.children().get(index+1)).addClass('active');
			$(FBZ.view.sliderHomeControl.children().get(index)).addClass('active');

		},
		createInterval : function () { 
			 FBZ.model.sliderClock = setInterval( function() 
		{
				// console.log("interval");
				FBZ.control.playSlider();
        }, FBZ.model.sliderTime);
		}, 

		deleteInterval : function () { 
			clearInterval(FBZ.model.sliderClock);
		},


		playSlider: function () { 

			FBZ.control.changeImageToIndex(FBZ.model.sliderCurrentImage);
			// console.log(FBZ.model.sliderCurrentImage, FBZ.model.sliderTotalImage);
			
			if(FBZ.model.sliderCurrentImage < FBZ.model.sliderTotalImage) { 
				FBZ.model.sliderCurrentImage ++;
			}else { 

				FBZ.model.sliderCurrentImage = 0;
			}

		}
	};
					// <div class="feature-product">
					// 		<img class="product-image" alt="Feature product" src="/assets/img/chair_dummy.png">
					// 		<div class="product-info">
					// 			<p class="item-name">SOFA BLU</p>
					// 			<p class="item-brand">marca</p>
					// 			<p class="item-price">230.000 CLP</p>
					// 			<button class="buy-button" name="comprar" type="comprar" value="comprar">COMPRAR</button>
					// 		</div>
					// 		</div>
					// 	</div>
					

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

