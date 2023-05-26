import React, { useState } from 'react';

function App() {
  const [selectedValue, setSelectedValue] = useState('True');
  const [args, setArgs] = useState([{ value: 'Task', selected: 'True' }]);
  const [constantOption, setConstantOption] = useState('');
  const [result, setResult] = useState('undefined');

  const handleAddArgument = () => {
    setArgs([...args, { value: 'Task', selected: 'True' }]);
  };

  const handleArgumentChange = (event, index) => {
    const updatedArgs = [...args];
    updatedArgs[index].value = event.target.value;
    setArgs(updatedArgs);
  };

  const handleArgumentSelectChange = (event, index) => {
    const updatedArgs = [...args];
    updatedArgs[index].selected = event.target.value;
    setArgs(updatedArgs);
  };

  const handleConstantOptionChange = (event) => {
    setConstantOption(event.target.value);
  };

  const handleCalculateResult = () => {
    if (constantOption === 'And') {
      const firstArg = selectedValue === 'True';
      const secondArg = args.length > 0 ? args.every((arg) => arg.selected === 'True') : true;
      const andResult = firstArg && secondArg;
      setResult(andResult.toString());
    } else if (constantOption === 'Or') {
      const firstArg = selectedValue === 'True';
      const secondArg = args.length > 0 ? args.some((arg) => arg.selected === 'True') : false;
    
      // Additional check to handle all arguments set to 'False'
      if (!firstArg && !secondArg) {
        setResult('False');
      } else {
        setResult('True');
      }
    }
  };
  
  const handleRemoveArgument = (index) => {
    const updatedArgs = [...args];
    updatedArgs.splice(index, 1);
    setArgs(updatedArgs);
  };

  return (
    <>
      <h1>Task</h1>
      <br />
      {args.map((argument, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Argument"
            value={argument.value}
            onChange={(event) => handleArgumentChange(event, index)}
          />
          <select
            style={{ margin: '0 5px' }}
            value={argument.selected}
            onChange={(event) => handleArgumentSelectChange(event, index)}
          >
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
          {index > 0 && <button onClick={() => handleRemoveArgument(index)}>Remove</button>}
        </div>
      ))}
      <button style={{ margin: '10px 0 30px 0' }} onClick={handleAddArgument}>
        + add arg
      </button>
      <br />
      <select onChange={handleConstantOptionChange}>
        <option value="">Select Option</option>
        <option value="Constant">Constant</option>
        <option value="Argument">Argument</option>
        <option value="And">And</option>
        <option value="Or">Or</option>
      </select>
      {constantOption === 'Constant' && (
        <select
          style={{ margin: '0 5px' }}
          value={selectedValue}
          onChange={(event) => setSelectedValue(event.target.value)}
        >
          <option value="True">True</option>
          <option value="False">False</option>
        </select>
      )}
      {constantOption === 'Argument' && (
        <select style={{ margin: '0 5px' }}>
          <option value={selectedValue}>{selectedValue}</option>
          <option value="True">True</option>
          <option value="False">False</option>
        </select>
      )}
      {constantOption === 'And' && args.length > 0 && (
        <div>
          <span>Choose arguments:</span>
          {args.map((arg, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`arg${index}`}
                checked={arg.selected === 'True'}
                onChange={(event) => handleArgumentSelectChange(event, index)}
              />
              <label htmlFor={`arg${index}`}>{arg.value}</label>
            </div>
          ))}
          {args.length > 1 && <button onClick={handleRemoveArgument}>Remove</button>}
        </div>
      )}
      {constantOption === 'Or' && args.length > 0 && (
        <div>
          <span>Choose arguments:</span>
          {args.map((arg, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`arg${index}`}
                checked={arg.selected === 'True'}
                onChange={(event) => handleArgumentSelectChange(event, index)}
              />
              <label htmlFor={`arg${index}`}>{arg.value}</label>
            </div>
          ))}
          {args.length > 1 && <button onClick={handleRemoveArgument}>Remove</button>}
        </div>
      )}
      <button style={{ margin: '0 5px' }} onClick={handleCalculateResult}>
        Calculate
      </button>
      <h4>
        Result: <span>{result}</span>
      </h4>
    </>
  );
}

export default App;
