import React from 'react';
import {Button} from 'react-bootstrap'

const AddCase = ({handleCase,posicion}) => {


    return ( 
        <div>
          {posicion.posicionactual ? 
          <Button
          variant="danger" 
          size="lg" block
          onClick={handleCase}>
            Add New Case
         </Button>
        
          :
          null
          }
        
        
        </div>
       
     );
}
 
export default AddCase;