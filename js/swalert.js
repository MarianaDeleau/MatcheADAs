//######### MENSAJE DE INICIO ········

    Swal.fire({
        title: '¡Bienvenida!',
        html: '<p class="modal">En MatcheADAs tu objetivo es juntar tres o más ítems del mismo tipo,ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar.<br>Si se forma un grupo, esos ítems se eliminarán y ganarás puntos.¡Sigue armando grupos de 3 o más antes de que se acabe el tiempo!</p><br><span class="modal">CONTROLES</span><p class="modal">Click izquierdo: selección</p><p class="modal">Enter o Espacio: selección</p><p class="modal">Flechas o WASD: movimiento e intercambio</p>',
        confirmButtonText: 'JUGAR',
        padding:'1rem',
        backdrop:true,
        customClass: {
            confirmButton: 'btn-play'
        },
        showConfirmButton: true,
        confirmButtonColor: '#f87372',
        confirmButtonAriaLabel: 'Iniciar el juego',

    });
