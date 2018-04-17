$( document ).ready(function() {

	// var mesa = getCookie('mesa') || 1;
	var tiempo_refresco = 1000;
	var nombreMesa;

	// $.notify.defaults({ globalPosition: "left bottom"} );

	// Agregar Boton para Crear Tickets
	$("#botonAgregarTicket").click(function () {
		// Agregar KOT
		$("#ticketsNuevos").append('<div class="box">KOT 500<div class="cerrarKot">X</div></div>');
		// Eliminar elemento al hacer Click en X
		activarBotonEliminar();
	});

	// Selector de mesas
	function cargarPuertas(){
		var i = 1;
		$("#botonesMesas").empty();
		$.getJSON('https://cloud.movilcrm.com/motel/backend/motel_rest.php?task=verPuertas&callback=?', function(data) {
		    $.each(data.verPuertas, function(i, verPuertas) {
		    	console.log(verPuertas);
					if (verPuertas == 'f' && i == 1  ) {
						$('#puerta_1').addClass('puerta_abierta');
						$('#puerta_1').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 1) {
						$('#puerta_1').addClass('puerta_cerrada');
						$('#puerta_1').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 2 ) {
						$('#puerta_2').addClass('puerta_abierta');
						$('#puerta_2').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 2) {
						$('#puerta_2').addClass('puerta_cerrada');
						$('#puerta_2').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 3 ) {
						$('#puerta_3').addClass('puerta_abierta');
						$('#puerta_3').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 3) {
						$('#puerta_3').addClass('puerta_cerrada');
						$('#puerta_3').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 4 ) {
						$('#puerta_4').addClass('puerta_abierta');
						$('#puerta_4').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 4) {
						$('#puerta_4').addClass('puerta_cerrada');
						$('#puerta_4').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 5 ) {
						$('#puerta_5').addClass('puerta_abierta');
						$('#puerta_5').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 5) {
						$('#puerta_5').addClass('puerta_cerrada');
						$('#puerta_5').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 6 ) {
						$('#puerta_6').addClass('puerta_abierta');
						$('#puerta_6').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 6) {
						$('#puerta_6').addClass('puerta_cerrada');
						$('#puerta_6').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 7 ) {
						$('#puerta_7').addClass('puerta_abierta');
						$('#puerta_7').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 7) {
						$('#puerta_7').addClass('puerta_cerrada');
						$('#puerta_7').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 8 ) {
						$('#puerta_8').addClass('puerta_abierta');
						$('#puerta_8').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 8) {
						$('#puerta_8').addClass('puerta_cerrada');
						$('#puerta_8').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 9 ) {
						$('#puerta_9').addClass('puerta_abierta');
						$('#puerta_9').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 9) {
						$('#puerta_9').addClass('puerta_cerrada');
						$('#puerta_9').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 10 ) {
						$('#puerta_10').addClass('puerta_abierta');
						$('#puerta_10').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 10) {
						$('#puerta_10').addClass('puerta_cerrada');
						$('#puerta_10').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 11 ) {
						$('#puerta_11').addClass('puerta_abierta');
						$('#puerta_11').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 11) {
						$('#puerta_11').addClass('puerta_cerrada');
						$('#puerta_11').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 12 ) {
						$('#puerta_12').addClass('puerta_abierta');
						$('#puerta_12').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 12) {
						$('#puerta_12').addClass('puerta_cerrada');
						$('#puerta_12').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 13 ) {
						$('#puerta_13').addClass('puerta_abierta');
						$('#puerta_13').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 13) {
						$('#puerta_13').addClass('puerta_cerrada');
						$('#puerta_13').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 14 ) {
						$('#puerta_14').addClass('puerta_abierta');
						$('#puerta_14').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 14) {
						$('#puerta_14').addClass('puerta_cerrada');
						$('#puerta_14').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 15 ) {
						$('#puerta_15').addClass('puerta_abierta');
						$('#puerta_15').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 15) {
						$('#puerta_15').addClass('puerta_cerrada');
						$('#puerta_15').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 16 ) {
						$('#puerta_16').addClass('puerta_abierta');
						$('#puerta_16').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 16) {
						$('#puerta_16').addClass('puerta_cerrada');
						$('#puerta_16').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 17 ) {
						$('#puerta_17').addClass('puerta_abierta');
						$('#puerta_17').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 17) {
						$('#puerta_17').addClass('puerta_cerrada');
						$('#puerta_17').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 18 ) {
						$('#puerta_18').addClass('puerta_abierta');
						$('#puerta_18').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 18) {
						$('#puerta_18').addClass('puerta_cerrada');
						$('#puerta_18').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 19 ) {
						$('#puerta_19').addClass('puerta_abierta');
						$('#puerta_19').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 19) {
						$('#puerta_19').addClass('puerta_cerrada');
						$('#puerta_19').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 20 ) {
						$('#puerta_20').addClass('puerta_abierta');
						$('#puerta_20').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 20) {
						$('#puerta_20').addClass('puerta_cerrada');
						$('#puerta_20').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 21 ) {
						$('#puerta_21').addClass('puerta_abierta');
						$('#puerta_21').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 21) {
						$('#puerta_21').addClass('puerta_cerrada');
						$('#puerta_21').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 22 ) {
						$('#puerta_22').addClass('puerta_abierta');
						$('#puerta_22').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 22) {
						$('#puerta_22').addClass('puerta_cerrada');
						$('#puerta_22').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 23 ) {
						$('#puerta_23').addClass('puerta_abierta');
						$('#puerta_23').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 23) {
						$('#puerta_23').addClass('puerta_cerrada');
						$('#puerta_23').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 24 ) {
						$('#puerta_24').addClass('puerta_abierta');
						$('#puerta_24').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 24) {
						$('#puerta_24').addClass('puerta_cerrada');
						$('#puerta_24').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 25 ) {
						$('#puerta_25').addClass('puerta_abierta');
						$('#puerta_25').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 25) {
						$('#puerta_25').addClass('puerta_cerrada');
						$('#puerta_25').removeClass('puerta_abierta');
					}
					if (verPuertas == 'f' && i == 26 ) {
						$('#puerta_26').addClass('puerta_abierta');
						$('#puerta_26').removeClass('puerta_cerrada');
					} else if (verPuertas == 't' && i == 26) {
						$('#puerta_26').addClass('puerta_cerrada');
						$('#puerta_26').removeClass('puerta_abierta');
					}

					i = i + 1;
		      console.log(i);
		    });
			// $("#botonesMesas").append(mesasbotones);
			//$('[mesaid]').button('refresh');
			// activarBotonesMesa ();
		});
	}

	// activar botones de mesa #botonesMesas > div > input:nth-child(2)
	function activarBotonesMesa () {
		$('#botonesMesas > div').click(function(e){
			mesa = $(e.target).attr('mesaId');
			setCookie('mesa', mesa, 30, '/');
			console.log("MESA de Cookie:" + getCookie('mesa'));
			$(e.target).addClass('active');
			// console.log(mesa);
			cargarAnterioresKots();
			cargarKots();
			cargarPuertas();
		});
	}

	// Recargar funciones de acuerdo al timer
	function funcionesAutomaticas(){

		cargarPuertas();
	}
	// Definir el intervalo de refreso de la lista de pedidos
	console.log('Tiempo de refreso:' + tiempo_refresco);
	setInterval(funcionesAutomaticas,tiempo_refresco);
	cargarPuertas();

	console.log( "ready!" );

});
