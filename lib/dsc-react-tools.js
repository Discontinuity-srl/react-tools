"use babel"

const path = require("path")
const fs = require("fs-plus")

import { CompositeDisposable } from "atom"

import DscReactToolsView from "./dsc-react-tools-view"
import { findSourceDir, isPathInReactNativeProject } from "./dscHelpers"
import create from "./actions/create"
import rename from "./actions/rename"

// ----------------------------------------------------------------------------

export default {
  dscReactToolsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.dscReactToolsView = new DscReactToolsView(state.dscReactToolsViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.dscReactToolsView.getElement(),
      visible: false,
    })

    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "dsc-react-tools:create": () => this.createAction(),
      })
    )
    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "dsc-react-tools:rename": () => this.renameAction(),
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

  // ----------------------------------------------------------------------------

  closeModalPannel() {
    this.modalPanel.hide()
  },

  // ----------------------------------------------------------------------------

  createAction() {
    const filePath = getPathOfActiveItem()

    if (!filePath) {
      return
    }

    let dirname
    if (fs.isDirectorySync(filePath)) {
      dirname = filePath
    } else {
      dirname = path.dirname(filePath)
    }

    const isReactNative = isPathInReactNativeProject(dirname)

    const onCreate = givenName => {
      const { name, indexFilePath } = create(givenName, dirname, isReactNative)
      atom.notifications.addSuccess(`Component ${name} created`)
      focusAndRevealOnTreeView(indexFilePath)
    }

    let promptMessage
    if (isReactNative) {
      promptMessage = "Enter the name for the React Native component"
    } else {
      promptMessage = "Enter the name for the React component"
    }
    this.dscReactToolsView.setPromptMessage(promptMessage)
    this.dscReactToolsView.onCreate = name => onCreate(name)
    this.dscReactToolsView.close = () => this.closeModalPannel()

    this.modalPanel.show()
    this.dscReactToolsView.editor.element.focus()
  },

  // ----------------------------------------------------------------------------

  renameAction() {
    const filePath = getPathOfActiveItem()

    if (fs.isDirectorySync(filePath)) {
      atom.notifications.addError("dsc-react-tools: Please select a file")
      return
    }

    const fromName = path.basename(filePath, ".js")
    const sourceDir = findSourceDir(filePath)

    const onCreate = toName => {
      rename(sourceDir, fromName, toName)
      atom.notifications.addSuccess(
        `Component ${fromName} renamed to ${toName}`
      )
    }

    this.dscReactToolsView.setPromptMessage(
      "Enter the new name for the component"
    )
    this.dscReactToolsView.onCreate = name => onCreate(name)
    this.dscReactToolsView.close = () => this.closeModalPannel()

    this.modalPanel.show()
    this.dscReactToolsView.editor.element.focus()
  },
}

// ----------------------------------------------------------------------------
// Atom helpers
// ----------------------------------------------------------------------------

function getPathOfActiveItem() {
  const activeItem = atom.workspace.getActivePaneItem()
  const activeItemType = activeItem.constructor.name

  let filePath
  switch (activeItemType) {
    case "TextEditor":
      filePath = activeItem.buffer.file.path
      break
    case "TreeView":
      filePath = activeItem.selectedPath
      break
    default:
      atom.notifications.addError(
        "dsc-react-tools: Unable to get active item path"
      )
      console.error(
        "dsc-react-tools: Unable to get active item path",
        activeItem
      )
  }

  return filePath
}

function focusAndRevealOnTreeView(path) {
  atom.workspace.open(path)
  // const activeItem = atom.workspace.getActivePaneItem()
  atom.commands.dispatch(atom.workspace, "tree-view:reveal-active-file")
  // activeItem.activate()
}
