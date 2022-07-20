import { Validator } from '../node_modules/@mikefesta/3dc-validator/dist/Validator';

function $(id: string) {
  return document.getElementById(id);
}

function reportError(message: string) {
  console.log('ERROR: ' + message);
}

async function loadModel(validator: Validator): Promise<void> {
  try {
    const input = $('modelInput') as HTMLInputElement;
    await validator.model.loadFromFileInput(input.files[0]);
    renderReport(validator);
  } catch (err) {
    reportError((err as Error).message);
  }
}

async function loadSchema(validator: Validator): Promise<void> {
  try {
    const input = $('schemaInput') as HTMLInputElement;
    await validator.schema.loadFromFileInput(input.files[0]);
    renderReport(validator);
  } catch (err) {
    reportError((err as Error).message);
  }
}

function renderReport(validator: Validator) {
  try {
    if (!validator.schema.loaded || !validator.model.loaded) {
      // the report requires both files to be loaded
      return;
    }
    // generate (or re-generate) the report
    validator.generateReport();

    // show the results
    const reportTable = $('report');
    while (reportTable.hasChildNodes()) {
      reportTable.removeChild(reportTable.firstChild);
    }
    validator.report.getItems().forEach(item => {
      const row = document.createElement('tr');

      const name = document.createElement('td');
      name.setAttribute('class', 'report-item-name');
      name.appendChild(document.createTextNode(item.name + ':'));
      row.appendChild(name);

      const result = document.createElement('td');
      result.setAttribute('class', 'report-item-value');
      result.setAttribute('class', !item.tested ? 'not-tested' : item.pass ? 'pass' : 'fail');
      const resultText = !item.tested ? 'NOT TESTED' : item.pass ? 'PASS' : 'FAIL';
      result.appendChild(document.createTextNode(resultText));
      row.appendChild(result);

      reportTable.appendChild(row);
    });
  } catch (err) {
    reportError((err as Error).message);
  }
}

document.body.onload = () => {
  // Global validator object
  var validator = new Validator();

  // Attach functions to html elements
  $('modelInput').addEventListener('change', ev => {
    loadModel(validator);
  });
  $('schemaInput').addEventListener('change', ev => {
    loadSchema(validator);
  });
};
