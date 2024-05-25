import React from 'react';
import './App.css';

function App() {
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
    <div className="App">
      <button onClick={callFunction}>Call Firebase Function</button>
    </div>
  );
}

export default App;
