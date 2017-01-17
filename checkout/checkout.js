console.log("checkout.js");


FBZ.checkout = {

		init : function () {
			FBZ.checkout.getValues();
			FBZ.checkout.populate();
			FBZ.checkout.activateElements();
			FBZ.checkout.displayStep(0);
		},


		getValues :function ( ) {

			FBZ.view.$checkoutStep = $(".step"); 
			FBZ.view.$checkoutContainers = $(".checkout-container");
			FBZ.view.$mainCheckoutButton = $(".main-checkout-button");
		},

		populate : function () {
			//do some more stuff in here
			console.log("checkout");
		},
		activateElements : function () {

			FBZ.view.$checkoutStep.on("click",FBZ.checkout.onClickStep);
		}, 
		onClickStep : function (e) {
			var num = FBZ.view.$checkoutStep.index(e.currentTarget);
			FBZ.checkout.displayStep(num);
			console.log(num ,  FBZ.view.$checkoutStep.length );
			if(num === FBZ.view.$checkoutStep.length-1 ) {
					console.log("sdsda");
					FBZ.view.$mainCheckoutButton.html("pagar");
			}
		}, 

		displayStep : function (num) {

			FBZ.view.$checkoutStep.removeClass("active");
			$(FBZ.view.$checkoutStep[num]).addClass("active");
			FBZ.view.$checkoutContainers.hide()
			$(FBZ.view.$checkoutContainers[num]).fadeIn();
		}
	};

FBZ.checkout.init();
