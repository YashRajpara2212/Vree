import { makeAutoObservable } from "mobx";
import * as THREE from "three";

class VreeStore {
  selectedPart = "frame";
  isDarkMode = true;
  frameMesh = [];
  frameMeshOutline = [];
  lensesMesh = [];
  templeMesh = [];

  lensColor = "#ffffff";
  lensTransparency = 0.8;

  templeTexture = null;
  templeIntialTexture = null;
  templeColor = "#ffffff";
  templeMetalness = 0.1;
  templeRoughness = 0.2;
  templeTransparency = 0;

  frameTexture = null;
  frameIntialTexture = null;
  frameColor = "#ffffff";
  frameMetalness = 0.2;
  frameRoughness = 0.1;
  frameTransparency = 0;

  constructor() {
    makeAutoObservable(this);
  }

  toggleDarkMode() {
    this.isDarkM = !this.isDarkMode;
  }

  resetAllProperty() {
    this.lensColor = "#ffffff";
    this.lensesMesh[0].material.color = new THREE.Color("#ffffff");
    this.lensesMesh[1].material.color = new THREE.Color("#ffffff");
    // //
    this.lensTransparency = 0.8;
    this.lensesMesh[0].material.opacity = 0.8;
    this.lensesMesh[1].material.opacity = 0.8;

    // //
    this.frameTexture = "original.jpg";
    this.frameMesh[0].material.map = this.frameIntialTexture;

    // //
    this.frameColor = "#ffffff";
    this.frameMesh[0].material.color = new THREE.Color("#ffffff");
    // //
    this.frameMetalness = 0.2;
    this.frameMesh[0].material.metalness = 0.2;
    // //
    this.frameRoughness = 0.1;
    this.frameMesh[0].material.roughness = 0.1;
    // //
    this.frameTransparency = 0;
    this.frameMesh[0].material.transparent = true;
    this.frameMesh[0].material.opacity = 1;
    // //
    this.templeTexture = "original.jpg";
    this.templeMesh[0].material.map = this.templeIntialTexture;
    this.templeMesh[1].material.map = this.templeIntialTexture;
    // //
    this.templeColor = "#ffffff";
    this.templeMesh[0].material.color = new THREE.Color("#ffffff");
    this.templeMesh[1].material.color = new THREE.Color("#ffffff");
    // //
    this.templeMetalness = 0.1;
    this.templeMesh[0].material.metalness = 0.1;
    this.templeMesh[1].material.metalness = 0.1;
    // //
    this.templeRoughness = 0.2;
    this.templeMesh[0].material.roughness = 0.2;
    this.templeMesh[1].material.roughness = 0.2;
    // //
    this.templeTransparency = 0.1;
    this.templeMesh.material.transparent = true;
    this.templeMesh[0].material.opacity = 0.1;
    this.templeMesh[1].material.opacity = 0.1;
  }
}

export const vreeStore = new VreeStore();
// import { makeAutoObservable } from "mobx";
// import * as THREE from "three";

// class VreeStore {
//   selectedPart = "frame";
//   frameMesh = [];
//   frameMeshOutline = [];
//   lensesMesh = [];
//   templeMesh = [];

//   lensColor = "#ffffff";
//   lensTransparency = 0;

//   templeTexture = null;
//   templeIntialTexture = null;
//   templeColor = "#ffffff";
//   templeMetalness = 0.1;
//   templeRoughness = 0.2;
//   templeTransparency = 0;

//   frameTexture = null;
//   frameIntialTexture = null;
//   frameColor = "#ffffff";
//   frameMetalness = 0.2;
//   frameRoughness = 0.1;
//   frameTransparency = 0;

//   constructor() {
//     makeAutoObservable(this);
//   }

//   resetAllProperty() {
//     this.lensColor = "#ffffff";
//     this.lensesMesh[0].material.color = new THREE.Color("#ffffff");
//     this.lensesMesh[1].material.color = new THREE.Color("#ffffff");
//     // //
//     this.lensTransparency = 0.8;
//     this.lensesMesh[0].material.opacity = 0.8;
//     this.lensesMesh[1].material.opacity = 0.8;

//     // //
//     this.frameTexture = "original.jpg";
//     this.frameMesh.material.map = this.frameIntialTexture;

//     // //
//     this.frameColor = "#ffffff";
//     this.frameMesh.material.color = new THREE.Color("#ffffff");
//     // //
//     this.frameMetalness = 0.2;
//     this.frameMesh.material.metalness = 0.2;
//     // //
//     this.frameRoughness = 0.1;
//     this.frameMesh.material.roughness = 0.1;
//     // //
//     this.frameTransparency = 0.1;
//     this.frameMesh.material.transparent = true;
//     this.frameMesh.material.opacity = 0.1;
//     // //
//     this.templeTexture = "original.jpg";
//     this.templeMesh[0].material.map = this.templeIntialTexture;
//     this.templeMesh[1].material.map = this.templeIntialTexture;
//     // //
//     this.templeColor = "#ffffff";
//     this.templeMesh[0].material.color = new THREE.Color("#ffffff");
//     this.templeMesh[1].material.color = new THREE.Color("#ffffff");
//     // //
//     this.templeMetalness = 0.1;
//     this.templeMesh[0].material.metalness = 0.1;
//     this.templeMesh[1].material.metalness = 0.1;
//     // //
//     this.templeRoughness = 0.2;
//     this.templeMesh[0].material.roughness = 0.2;
//     this.templeMesh[1].material.roughness = 0.2;
//     // //
//     this.templeTransparency = 0.1;
//     this.templeMesh.material.transparent = true;
//     this.templeMesh[0].material.opacity = 0.1;
//     this.templeMesh[1].material.opacity = 0.1;
//   }
// }

// export const vreeStore = new VreeStore();
