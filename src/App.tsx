import './App.scss';
import { FormBuilder } from './components';

const inputs: FormInputDef = [
  {
    type: 'input',
    id: 'fullName',
    value: '',
    placeholder: 'Name',
    required: true,
  },
  {
    type: 'input',
    id: 'email',
    value: '',
    placeholder: 'Email',
    required: true,
  },
  {
    type: 'textarea',
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
