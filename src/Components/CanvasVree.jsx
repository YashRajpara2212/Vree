import { useRef, useEffect } from "react";
import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { LoaderManager } from "../Loader";
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import Frame from "./utils/Frame";
import Lenses from "./utils/Lenses";
import Temple from "./utils/Temple";
// import { vreeStore } from "../VreeStore";

const CanvasVree = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // let vreeObject = null;
    //Scene
    const scene = new THREE.Scene();

    //Camera

    const camera = new THREE.PerspectiveCamera(
      75,
      ((window.innerWidth * 0.6) / window.innerHeight) ,
      0.01,
      1000
    );

    camera.position.z = 3;

    //Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 10);
    scene.add(ambientLight);
    

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
    renderer.setSize(window.innerWidth * 0.6, window.innerHeight );

    // Create loader manager
    const loaderManager = new LoaderManager();
    loaderManager.setScene(scene); // Set the scene for the loader manager

    // Set a callback to be triggered when everything is loaded
    loaderManager.setOnCompleteCallback(() => {
      const frame = new Frame();
      const lense = new Lenses();
      const temple = new Temple();
      // After all assets are loaded, you can start animating/rendering
      animate();
    });

    // Load assets
    // loaderManager.loadTexture("/assets/background/background.png");
    loaderManager.loadEnvironmentTexture(
      "/assets/environment/brown_photostudio_02_1k.hdr"
    );
    loaderManager.loadGLTFModel("/assets/glbs/sampleModel.glb");

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Optional: Enables smooth camera movements
    controls.dampingFactor = 0.25; // Optional: Sets the speed of damping
    controls.screenSpacePanning = false; // Optional: Prevents panning in the screen space

    const animate = () => {
      requestAnimationFrame(animate);
      //control update
      controls.update();

      renderer.render(scene, camera);
    };

    // animate();

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth*0.6 / window.innerHeight;
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

  return <canvas ref={canvasRef} className="webgl" />;
};

export default CanvasVree;
