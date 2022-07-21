import { Validator } from '../node_modules/@mikefesta/3dc-validator/dist/Validator';

function $(id: string) {
  return document.getElementById(id);
}

function preventDefaults(e: Event) {
  e.preventDefault();
  e.stopPropagation();
}

function addHighlightClass(element: HTMLElement) {
  element.classList.add('highlight');
}

function removeHighlightClass(element: HTMLElement) {
  element.classList.remove('highlight');
}

function reportError(message: string) {
  console.log('ERROR: ' + message);
}

async function loadModel(validator: Validator): Promise<void> {
  try {
    const input = $('modelInput') as HTMLInputElement;
    await validator.model.loadFromFileInput(input.files[0]);
    if (validator.model.loaded) {
      $('modelIcon').classList.remove('fail');
      $('modelIcon').classList.add('pass');
    } else {
      $('modelIcon').classList.remove('pass');
      $('modelIcon').classList.add('fail');
    }
    renderReport(validator);
  } catch (err) {
    $('modelIcon').classList.remove('pass');
    $('modelIcon').classList.add('fail');
    reportError((err as Error).message);
  }
}

async function loadSchema(validator: Validator): Promise<void> {
  try {
    const input = $('schemaInput') as HTMLInputElement;
    await validator.schema.loadFromFileInput(input.files[0]);
    if (validator.schema.loaded) {
      $('schemaIcon').classList.remove('fail');
      $('schemaIcon').classList.add('pass');
    } else {
      $('schemaIcon').classList.remove('pass');
      $('schemaIcon').classList.add('fail');
    }
    renderReport(validator);
  } catch (err) {
    $('schemaIcon').classList.remove('pass');
    $('schemaIcon').classList.add('fail');
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

      const message = document.createElement('td');
      message.setAttribute('class', 'report-item-message');
      message.setAttribute('class', !item.tested ? 'not-tested' : item.pass ? 'not-tested' : 'fail');
      message.appendChild(document.createTextNode(item.message));
      row.appendChild(message);

      reportTable.appendChild(row);
    });
  } catch (err) {
    reportError((err as Error).message);
  }
}

document.body.onload = () => {
  // Global validator object
  var validator = new Validator();

  // Show the version
  $('version').appendChild(document.createTextNode('Version: ' + validator.version));

  // Drag and drop area highlighting
  ['modelDropArea', 'schemaDropArea'].forEach(elementName => {
    ['dragenter', 'dragover'].forEach(eventName => {
      $(elementName).addEventListener(eventName, ev => {
        preventDefaults(ev);
        addHighlightClass($(elementName));
      });
    });
    $(elementName).addEventListener('dragleave', ev => {
      preventDefaults(ev);
      removeHighlightClass($(elementName));
    });
  });

  // Drag and drop model load
  $('modelDropArea').addEventListener('drop', ev => {
    preventDefaults(ev);
    removeHighlightClass($('modelDropArea'));
    ($('modelInput') as HTMLInputElement).files = ev.dataTransfer.files;
    loadModel(validator);
  });

  // Drag and drop schema load
  $('schemaDropArea').addEventListener('drop', ev => {
    preventDefaults(ev);
    removeHighlightClass($('schemaDropArea'));
    ($('schemaInput') as HTMLInputElement).files = ev.dataTransfer.files;
    loadSchema(validator);
  });

  // Load from traditional file input elements
  $('modelInput').addEventListener('change', ev => {
    loadModel(validator);
  });
  $('schemaInput').addEventListener('change', ev => {
    loadSchema(validator);
  });
};
