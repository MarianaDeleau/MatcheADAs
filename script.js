const arrayTest=[];
const grid=document.getElementById('grid')
// const TAMAÑO_MATRIZ=9
// const TAMAÑO_ITEM=56

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

    // console.log(`Elemento seleccionado ${elemento_seleccionado.innerText}`);
    // console.log(`Posicion elemento seleccionado ${elemento_seleccionado.dataset.y}, ${elemento_seleccionado.dataset.x}`) 

    } else if (selectedElement != null) {

    // Si ya tengo un elemento seleccionado
    // Guardo el elemento clickeado

    // Falta chequear si el segundo elemento es adyacente horizontal o verticalmente al elemento seleccionado
    // <<<((( if (la coordenada del elemento seleccionado es + o - 1 que la del elemento clickeado) {
        // sigo con el flujo del juego    
    //} else if {
        //cambio de elemento seleccionado
    //} )))))))>>>>>

        clickedElement = e.target;

        //Almaceno en variable auxiliar el elemento clickeado
        //auxItem=clickedElement.innerText;
        const auxTop= clickedElement.style.top;
        const auxLeft=clickedElement.style.left;

        // Seteo como animalito del elemento clickeado el del elemento seleccionado la primera vez
        
        clickedElement.style.top=selectedElement.style.top;
        clickedElement.style.left=selectedElement.style.left;


        // Setteo como el animalito del elemento seleccionado la primera vez como el del elemento clickeado la segunda vez

        selectedElement.style.top=auxTop;
        selectedElement.style.left=auxLeft;
        
        // Reseteo todas las variables
        selectedElement = null;
        clickedElement = null;
       

    }
};

// ###### Función que genera la grilla
const generateGrid =(matrizSize, itemSize)=> {
    
    for(let row=0; row<matrizSize; row++){
    
        for(let column=0; column<matrizSize; column++){
            //arrayTest.push([row*TAMAÑO_ITEM,column*TAMAÑO_ITEM])
            const celda = document.createElement('div');
            celda.style.width = `${itemSize}px`;
            celda.style.height = `${itemSize}px`;
    
            celda.style.position = 'absolute';
            celda.style.left = `${column*itemSize}px`;
            celda.style.top = `${row*itemSize}px`;
            //celda.style.border = '1px solid #000';
            celda.classList.add('cell')
        
            //para ver coordenadas
            celda.innerText=`${column} ${row}`
            
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
    
    gridGenerator()


