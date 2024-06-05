import React, { useState } from 'react';
import '../pages/styles/HelloWorld.css';
const HelloWorld = () => {
const [response, setResponse] = useState(null);
    const callFunction = async () => {
        try {
        const response = await fetch('https://us-central1-cosmochat-ui-7b128.cloudfunctions.net/helloWorld')
        if(!response.ok){
          throw new Error('Failed to call Firebase function');
        }
        const data = await response.text(); // or response.json() if your function returns JSON
        console.log(data);
      } catch(error){
        console.error("Error calling Firebase function:", error)
      }
      };

      return (
        <div className="HelloWorld">
          <button onClick={callFunction}>Call Firebase Function</button>
          {response &&
          <div >
            <h3> Response from Firebase function: </h3>
            <pre>{JSON.stringify(response,null,2)}</pre> {/* Display the response as a JSON string */}
          </div>
          }
        </div>
      );
};


export default HelloWorld;