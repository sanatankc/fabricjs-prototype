import React, { useEffect } from 'react'
import { fabric } from 'fabric'
import ObjectProperties from './ObjectProperties'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import './App.css'
import objectsA from './objectsA'


function uuid() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}


const smartObjects = [
  {
    type: 'Name',
    id: 'smart-object-name',
    top: 103,
    left: 88,
  },
  {
    type: 'Maths SA-1',
    subject: 'Maths',
    id: 'smart-object-maths-sa-1',
    top: 183,
    left: 122,
    students: [
      { name: 'Nikita', marks: 19, },
      { name: 'Abhay', marks: 20, },
      { name: 'Rohan', marks: 16, },
    ]
  },
  {
    type: 'Maths SA-2',
    subject: 'Maths',
    id: 'smart-object-maths-sa-2',
    top: 183,
    left: 319,
    students: [
      { name: 'Nikita', marks: 18, },
      { name: 'Abhay', marks: 19, },
      { name: 'Rohan', marks: 18, },
    ]
  },
  {
    type: 'English SA-1',
    subject: 'English',
    id: 'smart-object-english-sa-1',
    top: 215,
    left: 121,
    students: [
      { name: 'Nikita', marks: 17, },
      { name: 'Abhay', marks: 20, },
      { name: 'Rohan', marks: 16, },
    ]
  },
  {
    type: 'English SA-2',
    subject: 'English',
    id: 'smart-object-english-sa-2',
    top: 215,
    left: 316,
    students: [
      { name: 'Nikita', marks: 18, },
      { name: 'Abhay', marks: 19, },
      { name: 'Rohan', marks: 18, },
    ]
  },
  {
    type: 'Physics SA-1',
    subject: 'Physics',
    id: 'smart-object-physics-sa-1',
    top: 275,
    left: 121,
    students: [
      { name: 'Nikita', marks: 14, },
      { name: 'Abhay', marks: 20, },
      { name: 'Rohan', marks: 16, },
    ],
  },
  {
    type: 'Physics SA-2',
    subject: 'Physics',
    top: 275,
    left: 316,
    id: 'smart-object-physics-sa-2',
    students: [
      { name: 'Nikita', marks: 12, },
      { name: 'Abhay', marks: 19, },
      { name: 'Rohan', marks: 18, },
    ],
  },
  {
    type: 'S. Sci SA-1',
    subject: 'Social Science',
    id: 'smart-object-social-science-sa-1',
    top: 245,
    left: 121,
    students: [
      { name: 'Nikita', marks: 16, },
      { name: 'Abhay', marks: 20, },
      { name: 'Rohan', marks: 16, },
    ],
  },
  {
    type: 'S. Sci SA-2',
    subject: 'Social Science',
    id: 'smart-object-social-science-sa-2',
    top: 245,
    left: 316,
    students: [
      { name: 'Nikita', marks: 18, },
      { name: 'Abhay', marks: 19, },
      { name: 'Rohan', marks: 18, },
    ],
  },
  {
    type: 'Chemistry SA-1',
    subject: 'Chemistry',
    id: 'smart-object-chemistry-sa-1',
    top: 305,
    left: 120,
    students: [
      { name: 'Nikita', marks: 19, },
      { name: 'Abhay', marks: 20, },
      { name: 'Rohan', marks: 16, },
    ],
  },
  {
    type: 'Chemistry SA-2',
    subject: 'Chemistry',
    id: 'smart-object-chemistry-sa-2',
    top: 305,
    left: 316,
    students: [
      { name: 'Nikita', marks: 18, },
      { name: 'Abhay', marks: 19, },
      { name: 'Rohan', marks: 18, },
    ],
  },
]


const students = [
  'Nikita',
  'Abhay',
  'Rohan',
]
const StudentView = props => {

  return (
    <div style={{
      height: '100vh',
      borderLeft: '1px solid #eee',
      width: 150
    }}>
      {students.map(student => (
        <div style={{
          padding: 10,
          borderBottom: '1px solid #eee',
          cursor: 'pointer',
          textAlign: 'center',
          background: props.selectedStudent === student ? '#eee' : 'white'
        }} onClick={() => {
          props.setSelectedStudent(student)
        }}>
          {student}
        </div>
      ))}
      {props.selectedStudent && (
        <button 
          onClick={() => props.setSelectedStudent(null)}
          style={{
            marginTop: 15,
            marginLeft: 50
        }}>Edit</button>
      )}

    </div>
  )
}

// also add total for each subject
// const total = []
// for (const smartObject of smartObjects) {
//   const thisSubjectIndexInTotal = total.findIndex((totalObject) => totalObject.subject === smartObject.subject)
//   if (thisSubjectIndexInTotal || thisSubjectIndexInTotal === 0) {
//     console.log('hitttt1111')
//     total.push({
//       type: 'Total ' + smartObject.subject,
//       subject: smartObject.subject,
//       id: 'smart-object-total-' + smartObject.subject,
//       students: smartObject.students.map(student => ({
//         name: student.name,
//         marks: 0,
//       })),
//     })
//   } else {
//     total[thisSubjectIndexInTotal].students = smartObject.students.map((student, index) => ({
//       name: student.name,
//       marks: student.marks + total[thisSubjectIndexInTotal].students[index].marks,
//     }))
//   }
// }

  
// console.log('smartObjects -->',smartObjects, total)


const Toolbar = ({ editor, addRectangleNoStretch }) => {
  return (
    <div style={{  background: 'white', width: 80, boxSizing: 'border-box', fontSize: 36 }} >
      <div 
        style={{ width: '100%', height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        className="toolbar"
        onClick={() => {
          editor?.addText('Write Text...z')
        }}
      >
        T
      </div>
      <div
        style={{ width: '100%', height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        className="toolbar"
        onClick={() => {
          addRectangleNoStretch()
        }}
      >
        <div style={{ width: 30, height: 30, borderWidth: 2, borderColor: '#999', borderStyle: 'solid' }}></div>
      </div>
    </div>
  )
}

const ToolBarOptions = ({ editor, type }) => {
  if (type === 'students') {
    return (
      <div style={{  background: 'white', width: 80, boxSizing: 'border-box', fontSize: 36 }} >

      </div>
    )
  }
}


const Canvas = props => {
  
  const a4_width = 2480
  const a4_height = 3508
  const a4_ratio = a4_width / a4_height
  // const canvas_height = window.innerHeight - 100
  // const canvas_width = canvas_height * a4_ratio
  const canvas_height = 688
  const canvas_width = 480

  const { editor, onReady } = useFabricJSEditor()
  const [selectedObjects, setSelectedObjects] = React.useState()
  const hasEditorRendered = React.useRef(false)

  let [originalObjects, setOriginalObjects] = React.useState(null)

  const currentStudent = React.useState(null)

  let [studentView, setStudentView] = React.useState(false)
  const [selectedStudent, setSelectedStudent] = React.useState(null)

  window.editor = editor

  useEffect(() => {
    if (!hasEditorRendered.current && editor && editor.canvas) {
      editor?.canvas.loadFromJSON(JSON.stringify(objectsA),() => {
        editor?.canvas.renderAll()
        addSmartObjects()
      } ,console.log)
      keepObjectsInCanvas()
      deleteSelectedObject()
      trackSelectedObjects()
      hasEditorRendered.current = true
    }
  }, [editor])

  const addSmartObjects = () => {
    const groups = []
    for (const smartObject of smartObjects) {
      let rect = new fabric.Rect({
        height: 25,
        width: 110,
        fill: '#eef',
        originX: 'center',
        originY: 'center'
      });
      
      var text = new fabric.Text(smartObject.type, {
        fontSize: 14,
        originX: 'center',
        originY: 'center'
      });
      // Position should be random anywher in the bottom half of the canvas
      let top = smartObject.top
        ? smartObject.top
        : Math.floor(Math.random() * (canvas_height / 2)) + (canvas_height / 2)
      let left = smartObject.left
        ? smartObject.left
        : Math.floor(Math.random() * canvas_width)
      
      var group = new fabric.Group([ rect, text ], {
        id: smartObject.id,
        top,
        left
      });
      groups.push(group)
    }

    for (const group of groups) {
      setTimeout(() => {
        editor?.canvas.add(group)
      }, 0)
    }

  }

  const switchToStudentView = () => {
    let originalObjectsHere = editor?.canvas.toJSON(['id'])
    setTimeout(() => {
      editor?.canvas.clear()
      setTimeout(() => {
        editor?.canvas.loadFromJSON(JSON.stringify(originalObjectsHere),() => {
          editor?.canvas.renderAll()
        }, function(o, object) {
          object.set('selectable', false)
          setTimeout(() => {
            if (!originalObjects) {
              setOriginalObjects(originalObjectsHere)
            } else {
              replaceSmartObjectWithStudents(originalObjectsHere)
            }
          }, 100)
        })
      }, 0)
    }, 0)
  }

  useEffect(() => {
    if (originalObjects && selectedStudent) {
      replaceSmartObjectWithStudents(originalObjects)
    }
  }, [originalObjects])

  const switchToEditableView = () => {
    editor?.canvas.clear()
    setOriginalObjects(null)
    editor?.canvas.loadFromJSON(JSON.stringify(originalObjects),() => {
      editor?.canvas.renderAll()
    }, function(o, object) {
      object.set('selectable', true)
    })
  }

  useEffect(()=> {
    if (selectedStudent) {
      switchToStudentView()
    } else {
      switchToEditableView()
    }
  }, [selectedStudent])


  const replaceSmartObjectWithStudents = (originalObjects) => {
    if (
      originalObjects && originalObjects.objects && 
      selectedStudent
    ) {
      console.log('smartObject ---> ', editor?.canvas.getObjects())
      for (const object of editor?.canvas.getObjects()) {
        if (object.id?.includes('smart-object')) {
          console.log('rmovig...', object)
          editor?.canvas.remove(object)
        }
      }
      originalObjects?.objects.map((obj) => {
        if (obj?.id?.includes('smart-object')) {
          const top = obj.top
          const left = obj.left
          const width = obj.width
          const height = obj.height
          const scaleX = obj.scaleX
          const scaleY = obj.scaleY

          const stringToReplace = obj?.id === 'smart-object-name'
            ? selectedStudent
            : String(smartObjects.find((smartObject) => smartObject.id === obj.id)?.students.find((student) => student.name === selectedStudent).marks)

          var rect = new fabric.Rect({
            width: width * scaleX,
            height: height * scaleY,
            fill: 'transparent',
            originX: 'center',
            originY: 'center'
          });
          const text = new fabric.Text(stringToReplace, {
            originX: 'center',
            originY: 'center',
            fontSize: 16
          })

          var group = new fabric.Group([ rect, text ], {
            id: obj.id,
            top,
            left,
            selectable: false
          });
          
          editor?.canvas.add(group);
        }
      })
    }
  }

  const trackSelectedObjects = () => {
    editor?.canvas.on('selection:created', () => {
      const objects = editor?.canvas.getActiveObjects()
      if (objects.length > 0) {
        console.log('selected Object...', objects[0].top, objects[0].left)
      }
      setSelectedObjects(editor?.canvas.getActiveObjects())
    })
    editor?.canvas.on('selection:updated', () => {
      const objects = editor?.canvas.getActiveObjects()
      if (objects.length > 0) {
        console.log('selected Object...', objects[0].top, objects[0].left)
      }
      setSelectedObjects(editor?.canvas.getActiveObjects())
    })
    editor?.canvas.on('selection:cleared', () => {
      setSelectedObjects(editor?.canvas.getActiveObjects())
    })
  }

  const deleteSelectedObject = () => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        // editor?.canvas.getActiveObjects(), editor?.canvas)
        editor?.canvas.getActiveObjects()
          .forEach((obj) => {
            // check if object is a text
            const isEditingAText = obj.type === 'text' && obj.isEditing
            if (!isEditingAText) {
              editor?.canvas.remove(obj)
            } 
          })
      }
    })
  }



  const keepObjectsInCanvas = () => {
    editor?.canvas.on('object:moving', (e) => {
      const obj = e.target
      const canvas = editor.canvas

      // if object is too big ignore
      if (obj.currentHeight > canvas.height || obj.currentWidth > canvas.width) {
        return
      }

      obj.setCoords()
      // top-left  corner
      if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
        obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top)
        obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left)
      }
      // bot-right corner
      if (obj.getBoundingRect().top + obj.getBoundingRect().height > canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > canvas.width) {
        obj.top = Math.min(obj.top, canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top)
        obj.left = Math.min(obj.left, canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left)
      }
    })
    // also make sure it doesn't resize outside the canvas
    editor?.canvas.on('object:scaling', (e) => {
      const obj = e.target
      const canvas = editor.canvas
      console.log('object:scaling...', obj)
      if (obj.currentHeight > canvas.height || obj.currentWidth > canvas.width) {
        obj.top = Math.min(obj.top, canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top)
        obj.left = Math.min(obj.left, canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left)
      }
    })
  }

  const addRectangleNoStretch = () => {
    var object = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'red',
      left: 100,
      top: 100,
      id: uuid(),
      noScaleCache: false,
      strokeWidth: 10,
      KeepStrokeWidth: 10,
      stroke: 'gray'
    });
    object.set('strokeUniform', true);
    editor.canvas.add(object);
    // editor.canvas.on({
    //   'object:scaling': function(e) {
    //   var obj = e.target;
    //   if(obj.KeepStrokeWidth){
    //       var newStrokeWidth = obj.KeepStrokeWidth / ((obj.scaleX + obj.scaleY) / 2);
    //       console.log(newStrokeWidth)
    //       obj.set('strokeWidth', newStrokeWidth);
    //       }
    //     }
    //   });
  }



  console.log('Selected Student is...', selectedStudent)
  return (
    <>
      <Toolbar editor={editor} addRectangleNoStretch={addRectangleNoStretch} />
      <StudentView
        students={students}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />
      <div style={{ 
        flex: 1,
        height: '100vh',
        background: 'whitesmoke',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <FabricJSCanvas
          onReady={onReady}
          className="canvas"
        />
      </div>
      {/* <ObjectProperties
        // selectedObject={}
      /> */}
    </>
  )
}

export default Canvas