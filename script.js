
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
        
            //para ver coordenadas
            celda.innerText=`${column} ${row}`
            
            celda.style.textAlign= 'center'
            celda.style.fontSize='30px';

            celda.setAttribute('data-x', column);
            celda.setAttribute('data-y', row);
        
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

