# Cell Simulator AKA Conway's Game of Life

# Demo

https://hutch120.github.io/cell-simulator/

# How to run

- Clone the repo
- Run `yarn`
- Run  `yarn start`
- A webpage will show in the browser. 
- Click the board squares to setup the initial state, or use `Random` button to randomize the board.
- Then click `Run` button to see the iterations.


# Features
- TypeScript
- Hooks
- Styling with styled-components


# Deploy with gh-pages

- yarn add gh-pages --dev
- Set homepage in package.json
- Add this to package scripts: `"deploy": "yarn build && gh-pages -b gh-deploy -d build"`
- Run `yarn deploy`
- Got to github settings -> pages and set the pages to gh-pages branch