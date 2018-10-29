import React from 'react';
import { withLastLocation } from 'react-router-last-location';

const Logger = ({ lastLocation }) => (
    <div>
      <h2>Logger!</h2>
      <pre>
        {JSON.stringify(lastLocation)}
      </pre>
    </div>
  );
  
  export default withLastLocation(Logger);