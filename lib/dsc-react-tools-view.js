"use babel"
import { TextEditor } from "atom"

export const ESCAPE = 27
export const ENTER = 13

// ----------------------------------------------------------------------------

export default class DscReactToolsView {
  constructor(serializedState) {
    // Root element
    this.element = document.createElement("div")
    this.element.classList.add("dsc-react-tools")

    // Label
    this.message = document.createElement("label")
    this.message.classList.add("icon")
    this.message.classList.add("icon-arrow-right")
    this.element.appendChild(this.message)

    // Text Editor
    this.editor = new TextEditor({ mini: true })
    this.editor.element.addEventListener("blur", this.close)
    this.editor.element.addEventListener("keydown", this.handleInsert)
    this.element.appendChild(this.editor.element)
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

  setPromptMessage = message => {
    this.message.textContent = message
  }

  // -------------------------------------

  handleInsert = e => {
    if (e.keyCode === ESCAPE) {
      this.close()
    } else if (e.keyCode === ENTER) {
      this.onCreate(this.editor.getText())
      this.close()
      this.editor.selectAll()
      this.editor.delete()
    }
  }
}
