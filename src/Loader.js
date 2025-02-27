
// loaders.js
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { vreeStore } from "./VreeStore";
// import ButtonManager from "./ButtonManager"; // Import ButtonManager
// Loader management function
export class LoaderManager {
  constructor(scene, css2DRenderer) {
    this.loadedAssets = {
      // backgroundTexture: false,
      environmentTexture: false,
      gltfModel: false,
    };
    this.scene = null; // Will be set later
    this.onCompleteCallback = null; // Will be set to a callback that will be triggered when all assets are loaded
    // this.buttonManager = new ButtonManager(scene, css2DRenderer);
  }

  setScene(scene) {
    this.scene = scene;
  }

  setOnCompleteCallback(callback) {
    this.onCompleteCallback = callback;
  }

  

  // Function to load the environment HDR texture
  loadEnvironmentTexture(path) {
    const loader = new RGBELoader();
    loader.load(path, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.loadedAssets.environmentTexture = texture;
      this.checkAssetsLoaded();
    });
  }

  // Function to load a GLTF model
  loadGLTFModel(path) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      // debugger;
      this.loadedAssets.gltfModel = gltf.scene;
      //frameMesh is set
      vreeStore.frameMesh = [this.loadedAssets.gltfModel.children[0]];
      const tempMesh = this.loadedAssets.gltfModel.children[0];
      console.log("mesh set");

      vreeStore.lensesMesh = [tempMesh.children[0], tempMesh.children[2]];
      vreeStore.templeMesh = [tempMesh.children[1], tempMesh.children[3]];
    
      vreeStore.frameIntialTexture =
        this.loadedAssets.gltfModel.children[0].material.map;
      vreeStore.templeIntialTexture =
        this.loadedAssets.gltfModel.children[0].children[1].material.map;
      console.log(this.loadedAssets.gltfModel.children[0], "gltfModel");

      //for displayind g outline of frame , becuause initially framemesh is not get.
      vreeStore.selectedPart = "temple";
      
      this.checkAssetsLoaded();
    });
  }

  // Function to check if all assets are loaded
  checkAssetsLoaded() {
    //backgroundTexture,
    const { environmentTexture, gltfModel } = this.loadedAssets;
    //backgroundTexture &&
    if (environmentTexture && gltfModel) {
      this.addAssetsToScene();
    }
  }

  // Function to add the assets to the scene
  addAssetsToScene() {
    if (this.scene) {
      // Set background texture
      this.scene.background = this.loadedAssets.backgroundTexture;

      // Set environment texture for reflections
      this.scene.environment = this.loadedAssets.environmentTexture;

      // Add the GLTF model to the scene
      // console.log(this.loadedAssets.gltfModel.children[0], "gltfModel");
      const vreeObject = this.loadedAssets.gltfModel.children[0];
      

      this.scene.add(vreeObject);
      const temp = [...vreeObject.children];
      temp.map((child) => this.scene.add(child));
      vreeStore.selectedPart = "frame";
      console.log(this.scene, "scene");

      // Trigger the completion callback if it exists
      if (this.onCompleteCallback) {
        this.onCompleteCallback();
      }
    }
  }
 
}

