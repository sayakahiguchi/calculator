/**
 * Entry point for the application.
*/
import './styles/style.scss'
import { Calculator } from './components/calculator';



document.addEventListener('DOMContentLoaded', () => {
  // get the root element
  const root = document.getElementById(Calculator.ID.ROOT);
  if (!root) {
    console.error('Calculator root element not found');
    return;
  }

  // Instantiates a new Calculator and attaches it to the root element.
  new Calculator();
});