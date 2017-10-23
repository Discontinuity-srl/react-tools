"use babel"
import { TextEditor, File } from "atom"

export const ESCAPE = 27
export const ENTER = 13
export const SPACE = 32
export const TAB = 9

// ----------------------------------------------------------------------------

export default class DscReactToolsView {
  constructor(serializedState) {
    // Create root element
    this.element = document.createElement("div")
    this.element.classList.add("dsc-react-tools")

    // text editor
    this.editor = new TextEditor({ mini: true })
    this.editor.element.addEventListener("blur", this.close)
    this.editor.element.addEventListener("keydown", this.handleInsert)

    // Create message element
    const message = document.createElement("div")
    message.textContent = "Inser the name to rename the component to"
    message.classList.add("message")
    this.element.appendChild(this.editor.element)
    this.element.appendChild(message)
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove()
  }

  getElement() {
    return this.element
  }

  // -------------------------------------

  handleInsert = e => {
    if (e.keyCode === ESCAPE) {
      this.close()
    } else if (e.keyCode === ENTER) {
      this.onCreate(this.editor.getText())
      this.close()
      // .then(() => {
      // })
      // .catch(err => {
      //   this.message.innerText = err
      // })
    }
  }
}
