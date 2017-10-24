# dsc-react-tools Atom package

An opinionated package to help with React Development.

## Features

- Automatic dectes wether a project is React Web or React Native.
- Automatic detection of `src` folder.
- Component creaction
- Component rename

## Create

Creates a new React component in the directory of the currently selected file or
in the selected directory.

### Usage

Select a file or a folder in the Atom Editor or in the Atom Tree View. The path of the selected element will be used as the directory where to create the new element.

Chose the `Dsc React Tools: Create` command from the Atom Command Palette or use
`cmd-alt-ctrl-c` shortcut. Insert the name of the new component.

### Features

- Dectes wether the project is React DOM or React Native, inspecting the `package.json`.

## Rename

Renames the selcted component and renames the references in the other
files of the project.

### Usage

Select the file of the element to Rename in the Atom Editor or in the Atom Tree View. The path of the selected element will be used as the directory where to create the new element.

Chose the `Dsc React Tools: Rename` command from the Atom Command Palette or use
`cmd-alt-ctrl-r` shortcut. Insert the new name of the component.

**Warning** this command performs a naive case sensitive search and replace among all the files of your project therefore the component name should be unique. It is strongly reccomended, to have a backup mechanism in place.

- Automatic detection of `src` folder.
- Component creaction
- Component rename

### Features

- Scopes the changes to the `src` folder above the `package.json` file if one is present.

## LICENSE

Available under the MIT license.