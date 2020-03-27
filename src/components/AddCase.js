import React from 'react';
import {Button} from 'react-bootstrap'

const AddCase = ({handleCase}) => {


    return ( 
        <div>
        <Button
         variant="danger" 
         size="lg" block
         onClick={handleCase}>
            Submit Case
        </Button>
        </div>
       
     );
}
 
export default AddCase;