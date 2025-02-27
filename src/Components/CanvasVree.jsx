

{
  /* new Code */
}
import { useState, useRef, useEffect } from "react";
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

    //Plane below Goggles
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
   

    
//Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.9);


    //CSS2DRenderer for Labels
    
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

    setAddLabelsToScene(() => addLabelsToSceneFunction);



    // Create loader manager for loading texture and environment.
    const loaderManager = new LoaderManager(scene, new CSS2DRenderer());
    // Set a callback to be triggered when everything is loaded
    loaderManager.setOnCompleteCallback(() => {
      const frame = new Frame();
      const lense = new Lenses();
      const temple = new Temple();
      vreeStore.rightSideVisibility = true;

      // After all assets are loaded, you can start animating/rendering
      animate();
    });
    loaderManager.setScene(scene); // Set the scene for the loader manager


    // Load assets
    
    loaderManager.loadEnvironmentTexture(
      "/assets/environment/brown_photostudio_02_1k.hdr"
    );
    
    loaderManager.loadGLTFModel("/assets/glbs/sampleModel.glb");


    //Outlinemanager for outline
    const outlinemanager = new OutlineManager(scene, camera, renderer);

    outlinemanager.setupOutline();
    

    //OrbitControls

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Optional: Enables smooth camera movements
    controls.dampingFactor = 0.25; // Optional: Sets the speed of damping
    controls.screenSpacePanning = false; // Optional: Prevents panning in the screen space
    

    //animate function for rendering.
    const animate = () => {
      requestAnimationFrame(animate);
      //control update
      controls.update();
      

      if (outlinemanager.composer) {
        outlinemanager.composer.render();
      } else {
        renderer.render(scene, camera);
      }
      // Render 2D buttons with CSS2DRenderer from labelrendrer
      
      labelRenderer.render(scene, camera);
    
    };

 

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
      {addLabelsToScene && <Labels addToScene={addLabelsToScene} />}
    </div>
  );
};

export default CanvasVree;

