import './App.scss';
import { FormBuilder } from './components';

const inputs: FormInputDef = [
  {
    componentType: 'input',
    id: 'fullName',
    value: '',
    placeholder: 'Name',
    required: true,
  },
  {
    componentType: 'input',
    id: 'email',
    value: '',
    placeholder: 'Email',
    required: true,
  },
  {
    componentType: 'textarea',
    id: 'message',
    value: '',
    placeholder: 'Message',
    required: true,
  },
  
];

function App() {
  return (
    <div className="App">
      <FormBuilder data={inputs} onSubmit={() => null} />
    </div>
  );
}

export default App;
