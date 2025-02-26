// import { useRef, useEffect } from "react";
// import * as THREE from "three";
// // import { GLTFLoader } from "three/examples/jsm/Addons.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { LoaderManager } from "../Loader";
// // import ButtonManager from "../ButtonManager"; // Import ButtonManager
// import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

// // import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
// import Frame from "./utils/Frame";
// import Lenses from "./utils/Lenses";
// import Temple from "./utils/Temple";
// import OutlineManager from "../OutliuneManager";
// import Labels from "./Labels";

// import { vreeStore } from "../VreeStore";

// const CanvasVree = () => {
//   const canvasRef = useRef(null);
//   const addLabelsToSceneRef = useRef(null);

//   useEffect(() => {
//     // let vreeObject = null;
//     if (!canvasRef.current) return;
//     //Scene
//     const scene = new THREE.Scene();


//     //Camera
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       (window.innerWidth * 0.6) / window.innerHeight,
//       0.01,
//       1000
//     );

//     camera.position.z = 3;

//     //Lights
//     const ambientLight = new THREE.AmbientLight(0xffffff, 10);
//     scene.add(ambientLight);

//     const textureLoader = new THREE.TextureLoader();
//     const simpleShadow = textureLoader.load("/assets/planeTexture/unnamed.jpg");
//     const sphereShadow = new THREE.Mesh(
//       new THREE.PlaneGeometry(1, 1),
//       new THREE.MeshBasicMaterial({
//         color: 0x000000,
//         transparent: true,
//         alphaMap: simpleShadow,
//       })
//     );
//     sphereShadow.rotation.x = -Math.PI * 0.5;
//     sphereShadow.position.set(0, -0.5, -0.9);
//     sphereShadow.scale.set(5, 3.5, 5);
//     scene.add(sphereShadow);
//     console.log(simpleShadow, "simpleShadow");

//     //All Loader

//     //Texture Loader
//     // const backgroundTexture = new THREE.TextureLoader();

//     // backgroundTexture.load("/assets/background/background.png", (texture) => {
//     //   texture.colorSpace = THREE.SRGBColorSpace;
//     //   scene.background = texture;
//     //   //   scene.environment = texture;
//     // });

//     // const environmentTexture = new RGBELoader();

//     // environmentTexture.load(
//     //   "/assets/environment/brown_photostudio_02_1k.hdr",
//     //   (texture) => {
//     //     // texture.colorSpace = THREE.SRGBColorSpace;
//     //     texture.mapping = THREE.EquirectangularReflectionMapping;
//     //     scene.environment = texture;
//     //   }
//     // );
//     //GLTFLoader
//     // const gltfLoader = new GLTFLoader();

//     // gltfLoader.load("public/assets/glbs/sampleModel.glb", (gltf) => {
//     //   //   console.log(gltf.scene.children[0], "gltf");
//     //   vreeObject = gltf.scene.children[0];
//     //   vreeObject.position.z = 1;

//     //   scene.add(vreeObject);
//     // });

//     //object
//     // vreeObject.position.x = 2;

//     //Renderer
//     // console.log(scene, "scene");

//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true,
//     });
//     renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.9);
//     //
//     //     const css2DRenderer = new CSS2DRenderer();
//     // css2DRenderer.setSize(window.innerWidth * 0.6, window.innerHeight);
//     // css2DRenderer.domElement.style.position = 'absolute';
//     // css2DRenderer.domElement.style.top = '0px';
//     // css2DRenderer.domElement.style.zIndex = '10';
//     // document.body.appendChild(css2DRenderer.domElement); // Attach to the DOM
//     //

//     // Create the label renderer (for the 2D labels)
//     const labelRenderer = new CSS2DRenderer();
//     labelRenderer.setSize(
//       canvasRef.current.clientWidth,
//       canvasRef.current.clientHeight
//     );
//     labelRenderer.domElement.style.position = "absolute";
//     labelRenderer.domElement.style.top = "0px";
//     labelRenderer.domElement.style.pointerEvents = "none";
//     canvasRef.current.parentElement.appendChild(labelRenderer.domElement);

//     // Set the addLabelsToScene function to the useRef
//     addLabelsToSceneRef.current = (labels) => {
//       labels.forEach((label) => scene.add(label));
//     };

//     // Create loader manager
//     const loaderManager = new LoaderManager(scene, new CSS2DRenderer());
//     loaderManager.setOnCompleteCallback(() => {
//       const frame = new Frame();
//       const lense = new Lenses();
//       const temple = new Temple();

//       // After all assets are loaded, you can start animating/rendering
//       animate();
//     });
//     loaderManager.setScene(scene); // Set the scene for the loader manager

//     // Set a callback to be triggered when everything is loaded

//     // Load assets
//     // loaderManager.loadTexture("/assets/background/background.png");
//     loaderManager.loadEnvironmentTexture(
//       "/assets/environment/brown_photostudio_02_1k.hdr"
//     );
//     // debugger;
//     loaderManager.loadGLTFModel("/assets/glbs/sampleModel.glb");

//     const outlinemanager = new OutlineManager(scene, camera, renderer);
    
//     outlinemanager.setupOutline();
//     console.log(outlinemanager.outlinePass);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true; // Optional: Enables smooth camera movements
//     controls.dampingFactor = 0.25; // Optional: Sets the speed of damping
//     controls.screenSpacePanning = false; // Optional: Prevents panning in the screen space
//     console.log(scene, "scene1");
//     const animate = () => {
//       requestAnimationFrame(animate);
//       //control update
//       controls.update();
//       // loaderManager.update(); // Ensure buttons follow the objects

//       if (outlinemanager.composer) {
//         outlinemanager.composer.render();
//       } else {
//         renderer.render(scene, camera);
//       }
//       // Render 2D buttons with CSS2DRenderer
//       // css2DRenderer.render(scene, camera);
//       labelRenderer.render(scene, camera);
//       // outlinemanager.composer.render();
//     };

//     // animate();

//     // Handle window resizing
//     const handleResize = () => {
//       camera.aspect = ((window.innerWidth * 0.6) / window.innerHeight) * 0.9;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener("resize", handleResize);

//     // Cleanup on component unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       controls.dispose();
//     };
//   }, []);

//   return (
//     <div>
//       <canvas ref={canvasRef} className="webgl" />
//       {/* Pass addLabelsToScene to Labels component */}
//       <Labels addToScene={addLabelsToSceneRef} />
//     </div>
//   );
// };

// export default CanvasVree;
import {useState, useRef, useEffect } from "react";
import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { LoaderManager } from "../Loader";
// import ButtonManager from "../ButtonManager"; // Import ButtonManager
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import Frame from "./utils/Frame";
import Lenses from "./utils/Lenses";
import Temple from "./utils/Temple";
import OutlineManager from "../OutliuneManager";
import Labels from "./Labels";

import { vreeStore } from "../VreeStore";

const CanvasVree = () => {
  const canvasRef = useRef(null);
  // const addLabelsToSceneRef = useRef(null);
const [addLabelsToScene, setAddLabelsToScene] = useState(null);
  useEffect(() => {
    // let vreeObject = null;
    if (!canvasRef.current) return;
    //Scene
    const scene = new THREE.Scene();


    //Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      (window.innerWidth * 0.6) / window.innerHeight,
      0.01,
      1000
    );

    camera.position.z = 3;

    //Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 10);
    scene.add(ambientLight);

    const textureLoader = new THREE.TextureLoader();
    const simpleShadow = textureLoader.load("/assets/planeTexture/unnamed.jpg");
    const sphereShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow,
      })
    );
    sphereShadow.rotation.x = -Math.PI * 0.5;
    sphereShadow.position.set(0, -0.5, -0.9);
    sphereShadow.scale.set(5, 3.5, 5);
    scene.add(sphereShadow);
    console.log(simpleShadow, "simpleShadow");

    //All Loader

    //Texture Loader
    // const backgroundTexture = new THREE.TextureLoader();

    // backgroundTexture.load("/assets/background/background.png", (texture) => {
    //   texture.colorSpace = THREE.SRGBColorSpace;
    //   scene.background = texture;
    //   //   scene.environment = texture;
    // });

    // const environmentTexture = new RGBELoader();

    // environmentTexture.load(
    //   "/assets/environment/brown_photostudio_02_1k.hdr",
    //   (texture) => {
    //     // texture.colorSpace = THREE.SRGBColorSpace;
    //     texture.mapping = THREE.EquirectangularReflectionMapping;
    //     scene.environment = texture;
    //   }
    // );
    //GLTFLoader
    // const gltfLoader = new GLTFLoader();

    // gltfLoader.load("public/assets/glbs/sampleModel.glb", (gltf) => {
    //   //   console.log(gltf.scene.children[0], "gltf");
    //   vreeObject = gltf.scene.children[0];
    //   vreeObject.position.z = 1;

    //   scene.add(vreeObject);
    // });

    //object
    // vreeObject.position.x = 2;

    //Renderer
    // console.log(scene, "scene");

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.9);
    //
    //     const css2DRenderer = new CSS2DRenderer();
    // css2DRenderer.setSize(window.innerWidth * 0.6, window.innerHeight);
    // css2DRenderer.domElement.style.position = 'absolute';
    // css2DRenderer.domElement.style.top =OutlineManager '0px';
    // css2DRenderer.domElement.style.zIndex = '10';
    // document.body.appendChild(css2DRenderer.domElement); // Attach to the DOM
    //

    // Create the label renderer (for the 2D labels)
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0px";
    labelRenderer.domElement.style.pointerEvents = "none";
    //
    labelRenderer.domElement.style.zIndex = "10";
    //
    canvasRef.current.parentElement.appendChild(labelRenderer.domElement);

    // Set the addLabelsToScene function to the useRef
    const addLabelsToSceneFunction = (labels) => {
      labels.forEach((label) => scene.add(label));
    };

    setAddLabelsToScene( ()=>addLabelsToSceneFunction);

    // Create loader manager
    const loaderManager = new LoaderManager(scene, new CSS2DRenderer());
    loaderManager.setOnCompleteCallback(() => {
      const frame = new Frame();
      const lense = new Lenses();
      const temple = new Temple();

      // After all assets are loaded, you can start animating/rendering
      animate();
    });
    loaderManager.setScene(scene); // Set the scene for the loader manager

    // Set a callback to be triggered when everything is loaded

    // Load assets
    // loaderManager.loadTexture("/assets/background/background.png");
    loaderManager.loadEnvironmentTexture(
      "/assets/environment/brown_photostudio_02_1k.hdr"
    );
    // debugger;
    loaderManager.loadGLTFModel("/assets/glbs/sampleModel.glb");

    const outlinemanager = new OutlineManager(scene, camera, renderer);
    
    outlinemanager.setupOutline();
    console.log(outlinemanager.outlinePass);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Optional: Enables smooth camera movements
    controls.dampingFactor = 0.25; // Optional: Sets the speed of damping
    controls.screenSpacePanning = false; // Optional: Prevents panning in the screen space
    console.log(scene, "scene1");
    const animate = () => {
      requestAnimationFrame(animate);
      //control update
      controls.update();
      // loaderManager.update(); // Ensure buttons follow the objects

      if (outlinemanager.composer) {
        outlinemanager.composer.render();
      } else {
        renderer.render(scene, camera);
      }
      // Render 2D buttons with CSS2DRenderer
      // css2DRenderer.render(scene, camera);
      labelRenderer.render(scene, camera);
      // outlinemanager.composer.render();
    };

    // animate();

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = ((window.innerWidth * 0.6) / window.innerHeight) * 0.9;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="webgl" />
      {/* Pass addLabelsToScene to Labels component */}
      {addLabelsToScene &&    <Labels addToScene={addLabelsToScene} />}
    </div>
  );
};

export default CanvasVree;
