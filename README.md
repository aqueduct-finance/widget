## aqueduct-widget

Install:<br>
`npm i aqueduct-widget`

To test with hot reload:
1. go to packages/widget
2. install modules (e.g `yarn`)
3. start the app with `yarn dev`

To test the bundled code:
1. go to packages/widget
2. run `npx rollup -c`
3. this will generate the 'testing_dist' directory
4. go to packages/test
5. install node modules (e.g. `yarn`)
    - you may need to run `yarn upgrade aqueduct-widget` to force it to update local files
    - you may also need to clear cached files like the .next directory
6. start the app with `yarn dev`