const {commons, gengine, } = require('structor-commons');
const _ = require('lodash');
const templateFilePath = '../../../../src/gengine/scaffolds/redux-container/templates/index.tpl';

let templateData;

let imports = [];
let metadata = {
  'componentType': 'ES6 Class',
  'hasConstructor': true,
  'hasChildrenIncluded': true,
  'isPropertiesExample': true
};
const namespace = 'TestNamespace';
const componentName = 'TestComponent';
let model = {
    'type': 'AppBar',
    'variant': 'default',
    'namespace': 'MaterialUI',
    'props': {
      'title': 'Title',
      'style': {
        'width': '120px',
        'height': '120px',
        'zIndex': 20,
      },
      'dataSource': [
        {
          'name': 'First', 'number': '#1'
        },
        {
          'name': 'Second', 'number': '#2'
        },
        {
          'name': 'Third', 'number': '#3'
        },
      ],
      'dataObject': {
        'name': 'My Name',
        'nestedObject': {
          'nestedName': 'My Second Name'
        }
      },
    },
    'children': [
      {
        'type': 'AppBar',
        'variant': 'default',
        'namespace': 'MaterialUI',
        'props': {
          'title': 'Title',
          'innerComponent': {
            type: 'InnerComponent',
            props: {},
            children: [
              {
                type: 'span',
                text: 'eiuywriuwyeruiweyr wieuryew iruewriue r'
              }
            ]
          },
          'style': {
            'width': '120px',
            'height': '120px',
            'zIndex': 20,
          },
          'dataSource': [
            {
              'name': 'First', 'number': '#1',
              'testArray': [
                {'testArrayItemName': 'rweuywuieywieu'}
              ]
            },
            {
              'name': 'Second', 'number': '#2'
            },
            {
              'name': 'Third', 'number': '#3'
            },
          ],
          'dataObject': {
            'name': 'My Name',
            'nestedObject': {
              'nestedName': 'My Second Name'
            }
          },
          'children': [],
        }
      }
    ],
  }
;

commons.readFile(templateFilePath)
  .then(data => {
    templateData = data;
    // console.log('Template: ', templateData);
    const {model: newModel, foundObjects} = gengine.prepareModelWithObjects(model);
    console.log('Found objects: ', JSON.stringify(foundObjects, null, 4));
    const templateObject = {
      model: newModel, foundObjects, imports, namespace, componentName, metadata
    };
    return _.template(templateData)(templateObject);
  })
  .then(generated => {
    console.log(commons.formatJs(generated));
  })
  .catch(error => {
    console.error(error);
  });

