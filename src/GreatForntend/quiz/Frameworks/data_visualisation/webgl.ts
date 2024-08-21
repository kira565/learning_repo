// * Webgl

// is a cross-platform API used to create 3D graphic in web browser
// Because it runs in the HTML 5 Canvas element, WebGl has a full integration with DOM interfaces

// WebGl and React

// React has a component system
// As in DOM, in 3D we have nested elements too.
// Get for example Three.js lib, there we have scene, meches(сетки), ligts, renders, cameras,
// First of all we need to create a scene, apply render and camera objects that will be used.

// When we add to mech to the scene, mesh becomes a child of the scene and scene is its parent
// Just like in DOM TREE

// Component way provides like in usual react app better integration because of its hierarchy.
// they are easy to share between parts of application and so on

//* In Kalashnikov, we used a CesiumJs, which uses WebGL and React for data visualization
//* for our application
//* Because we were needed in entities for custom data visualization, we used Resium
//* this is a React component library for Cesium app in React
// <Viewer full>
//   <Entity
//     description="test"
//     name="tokyo"
//     point={{ pixelSize: 10 }}
//     position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
//   />
// </Viewer>;
//* For maintaining component state we used Mobx-state-tree State manager
// thats ho we created functionality for our application such as
// Building routes, manipulating and drawing graphical objects, measuring terrains and objects
// lying on these terrain, injecting 3d models, and so on.

// todo THREE JS
// Three.js is a cross-browser JavaScript library and application programming interface used to create and display animated
// 3D computer graphics in a web browser using WebGL. The source code is hosted in a repository on GitHub

// todo React-three-fiber
// is a REACT renderer for Three.js
// Allows build 3d webGL based application with React, declaratively and re-usable
// also using Components API
//   <Canvas>
//     <ambientLight intensity={Math.PI / 2} />
//     <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
//     <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
//     <Box position={[-1.2, 0, 0]} />
//     <Box position={[1.2, 0, 0]} />
//   </Canvas>,
