console.log("productos 2");

//create HTML markup for lightbox window



	$(function() {

		// this function triggers everything

	});// END DOC READY

	FBZ.view.productos = $(".product");

	FBZ.products = {

		init : function () {

			console.log("init productos");
			FBZ.products.populate();
			FBZ.view.productos.on("click",FBZ.products.createProductBox); 
		},

		populate : function () {
			//do some more stuff in here
			console.log("FBZ.view.productos");
			// FBZ.view.products.on("productSpin",FBZ.products.productSpin); 
		},

		injectProduct : function () {

		},

		createProductBox : function (e) {

			FBZ.model.lightbox =  "<div id='lightbox'><a class='close-button-lightbox'><img src='../assets/img/close.svg' alt='close'></a>'" +
			'<div id="content">' + //insert clicked link's href into img src
			'<img src="" />' +
				+"<div class='feature-product'>"+
					+"<img class='product-image' alt='Feature product' src='/assets/img/chair_dummy.png'>"
							+"<div class='product-info'>"
								+"<p class='item-name'>SOFA BLU</p>"
								+"<p class='item-brand'>marca</p>"
								+"<p class='item-price'>230.000 CLP</p>"
								+"<button class='buy-button' name='comprar' type='comprar' value='comprar'>COMPRAR</button>"
							+"</div>"
					+"</div>"
		'</div>'+
	'</div>';

				//insert lightbox HTML into page
				$('body').append(FBZ.model.lightbox);
				$('#lightbox').addClass("is-fading-in"); 
				console.log($('#lightbox'));
				$('#lightbox').find(".close-button-lightbox").on("click",FBZ.products.closeLightbox); 

		},

			closeLightbox : function () {
				$('#lightbox').find(".close-button-lightbox").off("click",FBZ.products.closeLightbox);
				FBZ.control.fadeDivRemove( $('#lightbox'));

				// $( "div" ).remove( '#lightbox');
		}
	};


FBZ.products.init();
