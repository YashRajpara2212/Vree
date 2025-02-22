// loaders.js
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { vreeStore } from "./VreeStore";
// Loader management function
export class LoaderManager {
  constructor() {
    this.loadedAssets = {
      backgroundTexture: false,
      environmentTexture: false,
      gltfModel: false,
    };
    this.scene = null; // Will be set later
    this.onCompleteCallback = null; // Will be set to a callback that will be triggered when all assets are loaded
  }

  setScene(scene) {
    this.scene = scene;
  }

  setOnCompleteCallback(callback) {
    this.onCompleteCallback = callback;
  }

  // Function to load a texture (background)
  loadTexture(path) {
    const loader = new THREE.TextureLoader();
    loader.load(path, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.loadedAssets.backgroundTexture = texture;
      this.checkAssetsLoaded();
    });
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
      this.loadedAssets.gltfModel = gltf.scene;
      //frameMesh is set
      vreeStore.frameMesh = this.loadedAssets.gltfModel.children[0];
      console.log(this.loadedAssets.gltfModel.children[0], "gltfModel");

      //   console.log(vreeStore.frameMesh, "frameMesh");

      this.checkAssetsLoaded();
    });
  }

  // Function to check if all assets are loaded
  checkAssetsLoaded() {
    const { backgroundTexture, environmentTexture, gltfModel } =
      this.loadedAssets;
    if (backgroundTexture && environmentTexture && gltfModel) {
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
      const vreeObject = this.loadedAssets.gltfModel.children[0];
      vreeObject.position.z = 1;
      this.scene.add(vreeObject);

      // Trigger the completion callback if it exists
      if (this.onCompleteCallback) {
        this.onCompleteCallback();
      }
    }
  }
}
