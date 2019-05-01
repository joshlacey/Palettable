# Palettable
## A React with Redux color palette making app.

[Live Demo](https://palettable.netlify.com/palates)

![So Satisfying](https://media.giphy.com/media/PH8gHFw2YJPaM/giphy.gif)

**Main Features**
- Drag functions from Snap.svg 'snapsvg-cjs'
- [Rails Backend](https://github.com/joshlacey/final-project-backend) for persisting user's saved palettes

## File Structure explaination

[My Blog Post](https://medium.com/@williamjoshualacey/i-konmarid-an-old-react-app-15186fa76b41)

__tldr;__

Component folders are organized by their page route. 
- `index.js` is the file that provides the default export from the file.
- `*.container.js` is the extension given to the Redux connect wrapper.
- `*.component.js` is the extension given to the React component.
- `styles.scss` each component imports its own sass this keeps ui management localized to the component level.
- `modules` each component can also have its own modules. Any shared modules will be located in the at the same directory level as the highest level component which also requires the module.
