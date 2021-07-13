
const grid=document.getElementById('grid')
const MatchPoints = 100;

let emoji=['🐷', '🐶', '🐸', '🐮', '🐭', '🐱', ]

let matrizSize;
let itemSize;
let score = 0


const addScore = document.getElementById('score')
addScore.innerHTML = score


//######DEVUELVE EMOJI SUELTO

const randomItems =() => {


    let emojiRandom=emoji[Math.floor(Math.random()*emoji.length)]

    return emojiRandom
    //console.log(emojiRandom)
}


//######INTERCAMBIA ANIMALITOS

let selectedElement = null;
let clickedElement = null;

const clickItem = (e) => {

    if (selectedElement == null) {
    // Si no hay elemento seleccionado, almaceno el target del evento como elemento seleccionado.
        selectedElement = e.target;

    } else if (selectedElement != null) {

    // Si ya tengo un elemento seleccionado
    // Guardo el elemento clickeado
        clickedElement = e.target;

       
        if(isAdjacentItem(selectedElement, clickedElement)){

            switchCell(selectedElement,clickedElement)
            
            
            if(hasMatch()){

                searchMatches()
                selectedElement = null;
                clickedElement = null;

            } else{

                setTimeout(() => {
                switchCell(selectedElement,clickedElement)
                selectedElement = null;
                clickedElement = null;
                }, 500)

            }

                        

        } else {
            const aux=clickedElement;
            clickedElement=null;
            selectedElement=aux;
            //console.log('NO');
        }

        
    }
};

//###### GENERA LA GRILLA
const generateGrid =(matrizSize, itemSize)=> {
    grid.innerHTML = "";
    for(let row=0; row<matrizSize; row++){

        for(let column=0; column<matrizSize; column++){
            
            const celda = document.createElement('div');

            celda.style.width = `${itemSize}px`;
            celda.style.height = `${itemSize}px`;

            celda.style.position = 'absolute';
            celda.style.left = `${column*itemSize}px`;
            celda.style.top = `${row*itemSize}px`;
            //celda.style.border = '1px solid #000';
            celda.classList.add('cell')

            celda.style.textAlign= 'center'
            celda.style.verticalAlign='center'
            celda.style.fontSize='30px';

            celda.innerText=randomItems()

            celda.setAttribute('data-x', column);
            celda.setAttribute('data-y', row);

            celda.addEventListener("click", clickItem);

            grid.appendChild(celda);
    }
}
}

//######GENERA EL TAMAÑO DE LA GRILLA
//######### ELEGIR DIFICULTAD DE JUEGO ######

const selectLevel = () => {    
    swal({
        title: 'Nuevo Juego',
        buttons: {
            facil: {
                text: 'Fácil',
                value: 'facil',
                className: 'btn-play',
            },
            medio: {
                text: 'Medio',
                value: 'medio',
                className: 'btn-play',
            },
            dificil: {
                text: 'Difícil',
                value: 'dificil',
                className: 'btn-play',
            },
        },
    }).then((value) => {
    switch(value) {

        case 'facil':
            matrizSize=9
            itemSize=56
            score = 0;
            addScore.innerHTML = score;
            generateGrid(matrizSize, itemSize);
            callTimer();
            searchMatches();
            

            break;
            
        case 'medio':
            matrizSize=8
            itemSize=63
            generateGrid(matrizSize, itemSize);
            callTimer();
            searchMatches();
            score = 0;
            addScore.innerHTML = score;
            break;
            
        case 'dificil':
            matrizSize=7
            itemSize=72
            generateGrid(matrizSize, itemSize);
            callTimer();
            searchMatches();
            score= 0;
            addScore.innerHTML = score;
            break;

        default:
            swal({icon:'error'});
            selectLevel();
      }
            
    });
            
};

//######### MENSAJE DE INICIO ######
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

    }).then(() => {
        selectLevel();
    });


// ######### MENSAJE DE INFORMACION ######
const info = document.getElementById('info');

const infoBtn = () => {
    window.location.reload(); 
}
info.addEventListener('click', infoBtn);


// ######### MENSAJE DE REINICIAR JUEGO ######

const restartBtn = document.getElementById('restart')
 let duration = 0
const restarted = () => {
    swal({
        title: '¿Reiniciar Juego?',
        text: 'Perderás el puntaje acumulado', 
        buttons: {
            aceptar: {
                text:'Nuevo',
                className: 'btn-play',
            },
            cancelar: {
                text:'Cancelar',
                className: 'btn-play',
            },
        }
    }).then((value) => {
        if (value === 'aceptar') {
            selectLevel();
            
        } else {
            // window.location.reload();
            //cancelar
        }
    });
}
restartBtn.addEventListener('click', restarted)

const reset= () => {
    swal({
        title: 'Juego terminado',
        text : 'Puntaje: ' + score, 
        buttons: {
            aceptar: {
                text:'Reiniciar',
                className: 'btn-play',
            },
            cancelar: {
                text:'Cancelar',
                className: 'btn-play',
            },
        }
    }).then((value) => {
        if (value === 'aceptar') {
            selectLevel()
            
            
        } else {
            window.location.reload();
        }
    });
}


    let selectedItem = null;

    const isAdjacentItem = (a, b) => {

        const aX= Number(a.dataset.x);
        const aY= Number(a.dataset.y);
        const bX= Number(b.dataset.x);
        const bY= Number(b.dataset.y);


        if(aX === bX){

           return (aY === bY - 1) || (aY === bY + 1);

        } else if (aY === bY){

            return (aX === bX -1) || (aX === bX +1);

        }

        return false;

    }
    

    const callTimer = () =>{
        let duration = 30;
        let timer = document.getElementById("timer");
        const interval = setInterval(function(){
        timer.innerHTML = duration;
        duration--; 
        if (duration === -1){
        reset();
        clearInterval(interval);
        }
        },1000);
    }
    


// ######### INTERCAMBIA CELDAS ######

const switchCell = (a,b) =>{

     //Almaceno en variable auxiliar el elemento clickeado
    const auxTop= b.style.top;
    const auxLeft=b.style.left;
    
    // Seteo como animalito del elemento clickeado el del elemento seleccionado la primera vez
    b.style.top=a.style.top;
    b.style.left=a.style.left;
   
    // Seteo como el animalito del elemento seleccionado la primera vez como el del elemento clickeado la segunda vez
    a.style.top=auxTop;
    a.style.left=auxLeft;

    //Actualizo coordenadas
    let aux1DataX=a.getAttribute('data-x');
    let aux1DataY=a.getAttribute('data-y');
    let aux2DataX=b.getAttribute('data-x');
    let aux2DataY=b.getAttribute('data-y');

    a.setAttribute('data-x', aux2DataX)
    b.setAttribute('data-x', aux1DataX)
    a.setAttribute('data-y', aux2DataY)
    b.setAttribute('data-y', aux1DataY)
   
    
   

}


// ######### BUSCA MATCHES VERTICAL#########

const searchVerticalMatch = () => {

    for(let i = 0; i < matrizSize; i++) {

        const column = [];
        for (let aux = 0; aux < matrizSize; aux++) {

            column.push(
                document.querySelector(`[data-x="${aux}"][data-y='${i}']`)
                );
        }
              
        for(let j = 0; j < column.length-2; j++) {
            
          
            if(
                column[j].innerText === column[j + 1].innerText && 
                column[j].innerText === column[j + 2].innerText
                ) {
                
               const itemFound=column[j].innerText;

                for(let k = j ; k<column.length; k++) {

                    if(itemFound === column[k].innerText){

                        column[k].classList.add('remove');

                    } else{
                        j = k - 1;
                        break; 

                    }
                }
            }  
        }
    }
};

// ######### BUSCA MATCHES HORIZONTAL #########

const searchHorizontalMatch = () => {

    for(let i = 0; i < matrizSize; i++) {

        const row = [];
		for (let aux = 0; aux < matrizSize; aux++) {
			row.push(
				document.querySelector(`[data-x="${i}"][data-y='${aux}']`)
			);
		}

        for(let j = 0; j < row.length-2; j++) {
            
            if(
                row[j].innerText === row[j+1].innerText &&
                row[j].innerText === row[j+2].innerText
                ) {
                    
            const itemFound=row[j].innerText
    
                for(let k = j ; k<row.length; k++) {
    
                    if(itemFound===row[k].innerText){
    
                    row[k].classList.add('remove')
    
                    } else{
                        j = k - 1;
                        break; 
    
                    }
                }
            }        
        }
    }
};


// ######### BUSCA MATCHES GENERAL #########


 const searchMatches = () => {

   
   // setTimeout(() => {
    remove();
   // }, 3000)

    //setTimeout(() => {
        descend()
    //}, 3000)

   // setTimeout(() => {
        refill()
   // }, 5000)

    //setTimeout(() => {
 if(hasMatch()) {
     searchMatches()
 }
//}, 5000)

}


// ######### REMUEVE MATCHES #########

const remove = () => {
let matchCount = 0;

    for(let y = 0; y < matrizSize; y++) {

        for(let x = 0; x < matrizSize; x++) {

            const item = document.querySelector(
                `[data-x="${x}"][data-y="${y}"]`
                );
    
            if(item.classList.contains('remove')) {

                item.innerText=null;
                item.classList.remove('remove')
                matchCount += 1;

            }
        }
    }
    scoreAdd(matchCount);
    // console.log('++++ score +++ ', score)
    addScore.innerHTML = score
};

   

// ######### RELLENA #########

const refill = () => {

    let toRefill = document.getElementsByClassName('cell');

    for(let i=0; i<toRefill.length; i++) {
    
        if(toRefill[i].innerText==="") {

            toRefill[i].innerText=randomItems()

        }
    }
};

// ######### DESCIENDE ######### 
const descend = () => {

    for(let x = matrizSize-1; x >=0; x--) {
 
        for(let y = matrizSize-1; y >=1 ; y--) {
     
            const item = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
            
            
                                       
                if(item.innerText==="") {
                    
                        emptyItem=item   
                         
                    for(let w = y; w > 0; w--){

                        const topItem = document.querySelector(`[data-y="${w-1}"][data-x="${x}"]`)
                       
                        if(topItem.innerText !== ""){
                            switchCell(emptyItem, topItem)
                            // emptyItem.innerText=topItem.innerText;
                            // topItem.innerText="";
                            break;
                        }

                    }
            
                }

        }
      
    }

}

// ######### SUMA PUNTOS #########


const scoreAdd = (matchQuantity) => {
  score = score + matchQuantity * MatchPoints;
 
}


const hasMatch= () => {
    
    searchVerticalMatch();
    searchHorizontalMatch()

    
    return document.querySelectorAll(".remove").length >0;

}
