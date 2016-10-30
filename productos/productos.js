	$(function() {

		// this function triggers everything

	});// END DOC READY

	FBZ.view.productos = $(".products-container");
	FBZ.view.productosSidebar = $(".productos-sidebar");
	FBZ.model.prod_categorias = [];
	FBZ.view.currentSidebar; 
	FBZ.model.filterProducts = "none";


	FBZ.products = {

		init : function () {

			// console.log("init productos");
			FBZ.products.populate();
			FBZ.products.activateCategoryAccordeon();
			// determines if the url includes a # for special section or 
			FBZ.products.determineProductBehavior();

		},

		activateCategoryAccordeon : function () {
			/* Toggle between adding and removing the "active" and "show" classes when the user clicks on one of the "Section" buttons. The "active" class is used to add a background color to the current button when its belonging panel is open. The "show" class is used to open the specific accordion panel */
			var acc = document.getElementsByClassName("accordion");
			var i;

			for (i = 0; i < acc.length; i++) {
				acc[i].onclick = function(){
					this.classList.toggle("active");
					this.nextElementSibling.classList.toggle("show");
				}
			}
		},

		determineProductBehavior : function (section) {

			console.log("currentArticule :",FBZ.model.currentArticule);
			if (FBZ.model.currentArticule != "" ) {

				if (FBZ.model.currentArticule == "#nuevos" ) {

					FBZ.products.displayOnlyNewProducts();

				} else if (FBZ.model.currentArticule == "#ofertas") {

					FBZ.products.displayOnlyOfferProducts();

				}else {

					FBZ.products.displayProduct();

				}

			}

		}, 

		displayOnlyNewProducts : function () {
			console.log("new");
			FBZ.model.filterProducts = "new";

		},
		displayOnlyOfferProducts : function () {
			console.log("offers");
			FBZ.model.filterProducts = "offers";
		},
		displayProduct : function () {
			console.log("product");

		},

		populate : function () {

				// iterate to inject all the products defined
				$.each(FBZ.model.products, function(key,value) {
					// console.log(key, "dmidd ",value);

					if ( FBZ.model.currentArticule == "#ofertas") {

						if (value.prod_oferta.toString() == "true" ) {
							FBZ.products.injectProduct(value,key);
						}

					} else if ( FBZ.model.currentArticule == "#nuevos") {

						if (value.prod_nuevo.toString() == "true" ) {
							FBZ.products.injectProduct(value,key);
						}

					}else {

						FBZ.products.injectProduct(value,key);
					}

					FBZ.products.injectCategory(value);

				});

				FBZ.view.product = $(".product");
				FBZ.view.product.on("click",FBZ.products.createProductBox);

		},

		injectCategory : function (obj) {


			// console.log(FBZ.model.prod_categorias.indexOf(obj.prod_categoria));
			if ( FBZ.model.prod_categorias.indexOf(obj.prod_categoria) == -1 ) {

					// FBZ.model.prod_categorias.push(obj.prod_categoria);
					//returns -1 if element is not found, otherwise returns its index
					FBZ.view.currentSidebar = "<h2 class='sidebar-category-product accordion'>"+obj.prod_categoria+"</h2><ul class='panel " +obj.prod_categoria+"'></ul>";
					FBZ.view.productosSidebar.append(FBZ.view.currentSidebar); 
					// console.log("category");
			}

						// <ul class='panel' >
						// 	<li class='element-category-product'>product 1</li>
						// 	<li class='element-category-product'>product 2</li>
						// 	<li class='element-category-product'>product 3</li>
						// 	<li class='element-category-product'>product 4</li>
						// 	<li class='element-category-product'>product 5</li>
						// </ul>

			// console.log("category", obj.prod_categoria);
			FBZ.model.prod_categorias.push(obj.prod_categoria);
		},

		injectProduct : function (obj,key) {

			// add product to category 

				 	// 	<picture class="piramid-bg">
						// 	<source srcset='assets/img/bg_mision_small.png' media='(max-width: 320px)'/>
						// 	<source srcset='assets/img/bg_mision_med.png' media='(max-width: 650px)'/>
						// 	<source srcset='assets/img/bg_mision_big.png' media='(max-width: 900px)'/>
						// 	<img srcset='assets/img/bg_mision_med.png' alt='piramid-bg'/>
						// </picture>
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


			var currentProduct = 
								"<div class='product' productId='"+obj.prod_id+"' productKey='"+key+"'>"+
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
									"<div class='product-info'>"+
										"<p class='item-name'>"+obj.prod_nombre+"</p>"+
										"<p class='item-brand'>"+obj.prod_marca+"</p>"+
										"<p class='item-price"+lineThrough+"'>"+obj.prod_precio+ " CLP</p>"+
									"</div>"+
								"</div>";
			// console.log(currentProduct);
			FBZ.view.productos.append(currentProduct);
			
			var $currentCategory = $("."+ obj.prod_categoria);
			// console.log($currentCategory,"<li class='element-category-product'><a>"+obj.prod_nombre+"</a></li>");
		

			$currentCategory.append("<li class='element-category-product'><a>"+obj.prod_nombre+"</a></li>");
		},

		createProductBox : function (e) {
			console.log("createbox",e);


			var key  = e.currentTarget.attributes.productKey.nodeValue;

			var obj = FBZ.model.products[key];
			// console.dir(obj); 

			FBZ.model.lightbox =  "<div id='lightbox'><a class='close-button-lightbox'><img src='../assets/img/close.svg' alt='close'></a>"
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
				$('#lightbox').find(".close-button-lightbox").on("click",FBZ.products.closeLightbox); 

		},

			closeLightbox : function () {
				$('#lightbox').find(".close-button-lightbox").off("click",FBZ.products.closeLightbox);
				FBZ.control.fadeDivRemove( $('#lightbox'));

				// $( "div" ).remove( '#lightbox');
		}


	};


FBZ.products.init();
