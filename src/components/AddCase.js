import React from 'react';
import {Button} from 'react-bootstrap'

const AddCase = ({handleCase}) => {


    return ( 
        <div>
        <Button
         variant="danger" 
         size="lg" block
         onClick={handleCase}>
           Registrar nuevo caso
        </Button>
        </div>
       
     );
}
 
export default AddCase;