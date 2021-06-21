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