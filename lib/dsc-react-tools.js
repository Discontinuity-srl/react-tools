"use babel"

import { CompositeDisposable } from "atom"
import DscReactToolsView from "./dsc-react-tools-view"
import renameAction from "./renameAction"
var path = require("path")

// ----------------------------------------------------------------------------

export default {
  dscReactToolsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.dscReactToolsView = new DscReactToolsView(state.dscReactToolsViewState)
    this.dscReactToolsView.onCreate = name => this.rename(name)
    this.dscReactToolsView.close = () => this.closeModalPannel()

    this.modalPanel = atom.workspace.addModalPanel({
      item: this.dscReactToolsView.getElement(),
      visible: false,
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "dsc-react-tools:rename": () => this.showRenameModal(),
      })
    )
  },

  deactivate() {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.dscReactToolsView.destroy()
  },

  serialize() {
    return {
      dscReactToolsViewState: this.dscReactToolsView.serialize(),
    }
  },

  showRenameModal() {
    this.modalPanel.show()
    this.dscReactToolsView.editor.element.focus()
  },

  closeModalPannel() {
    this.modalPanel.hide()
  },

  rename(toName) {
    const filePath = atom.workspace.getActivePaneItem().buffer.file.path
    const fromName = path.basename(filePath, ".js")
    const workDirectory = filePath.match(/^(.+\/src)/)[0]
    renameAction(workDirectory, fromName, toName)
  },
}
