
const grid=document.getElementById('grid')


let emoji=['🐷', '🐶', '🐸', '🐮', '🐭', '🐱', ]

let matrizSize;
let itemSize;

//DEVUELVE EMOJI SUELTO

const randomItems =() => {


    let emojiRandom=emoji[Math.floor(Math.random()*emoji.length)]

    return emojiRandom
    //console.log(emojiRandom)
}


//INTERCAMBIA ANIMALITOS

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
            
            selectedElement = null;
            clickedElement = null;

        } else {
            const aux=clickedElement;
            clickedElement=null;
            selectedElement=aux;
            //console.log('NO');
        }

        
    }
};

// ###### Función que genera la grilla
const generateGrid =(matrizSize, itemSize)=> {

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

            //para ver coordenadas
            //celda.innerText=`${row} ${column}`

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

//GENERA EL TAMAÑO DE LA GRILLA

const gridGenerator = () =>{

    //++++++COMENTÉ EL CODIGO PARA EVITAR EL PROMPT++++++//

        const difficulty= prompt('Select 1 for easy, 2 for medium or 3 for difficult');
        grid.setAttribute('data-type', difficulty);

        switch(difficulty){

            case '1':
                matrizSize=9
                itemSize=56
                generateGrid(matrizSize, itemSize);
                break;

            case '2':
                matrizSize=8
                itemSize=63
                generateGrid(matrizSize, itemSize);
                break;

            case '3':
                matrizSize=7
                itemSize=72
                generateGrid(matrizSize, itemSize);
                break;

        }

    }

    gridGenerator();

    // ######### TIMER
    //está en window por ahora. Cuando tengamos el sweet alert tenemos que cambiar y poner un evento de click en el boton de empezar.  Lo mismo con el if en duration <= 0, que debe saltar la ventana y no reiniciar
    let duration = 30;
    let timer = document.getElementById("timer");
    window.setInterval(function(){
    timer.innerHTML = duration;
    duration--; //aqui es solo para descir que debe decrementar. si ponemos ++ seria un contador de tiempo.
    duration = duration < 10 ? "0" + duration : duration; // eso es solo estético, para que quede con dos algarismo cuando los numeros sean menores que 10.
    if (duration <= 0){
        window.location.reload();
    }
    },1000); // esos 1000 son equivalentes a un segundo, ellos es que dicen que a cada segundo debe cambiar lo que vemos en pantalla.

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

const switchCell = (a,b) =>{

     //Almaceno en variable auxiliar el elemento clickeado
    const auxTop= b.style.top;
    const auxLeft=b.style.left;
    
    // Seteo como animalito del elemento clickeado el del elemento seleccionado la primera vez
    b.style.top=a.style.top;
    b.style.left=a.style.left;
   
    // // Seteo como el animalito del elemento seleccionado la primera vez como el del elemento clickeado la segunda vez
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
