	$(function() {

		// this function triggers everything

	});// END DOC READY

	FBZ.view.productos = $(".products-container");


	FBZ.products = {

		init : function () {

			// console.log("init productos");
			FBZ.products.populate();
			FBZ.products.activateCategoryAccordeon();

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

		populate : function () {

				// iterate to inject all the products defined
				$.each(FBZ.model.products, function(key,value) {
				    // console.log(key, "dmidd ",value);
				    FBZ.products.injectProduct(value,key);
				    FBZ.products.injectCategory(value);
				});

				FBZ.view.product = $(".product");
				FBZ.view.product.on("click",FBZ.products.createProductBox); 


		},

		injectCategory : function (obj) {

			// console.log("category", obj.prod_categoria);

		},

		injectProduct : function (obj,key) {

			// add product to category 

				 	// 	<picture class="piramid-bg">
						// 	<source srcset='assets/img/bg_mision_small.png' media='(max-width: 320px)'/>
						// 	<source srcset='assets/img/bg_mision_med.png' media='(max-width: 650px)'/>
						// 	<source srcset='assets/img/bg_mision_big.png' media='(max-width: 900px)'/>
						// 	<img srcset='assets/img/bg_mision_med.png' alt='piramid-bg'/>
						// </picture>
			var currentProduct = 

								"<div class='product' productId='"+obj.prod_id+"' productKey='"+key+"'>"+
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
										"<p class='item-price'>"+obj.prod_precio+"</p>"+
									"</div>"+
								"</div>";
			// console.log(currentProduct);
			FBZ.view.productos.append(currentProduct);
		},

		createProductBox : function (e) {

			var key  = e.currentTarget.attributes.productKey.nodeValue;

			var obj = FBZ.model.products[key];
			console.dir(obj); 

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
