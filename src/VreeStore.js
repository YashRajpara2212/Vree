import { makeAutoObservable } from "mobx";
import * as THREE from "three";

class VreeStore {
  selectedPart = "frame";
  isDarkMode = true;
  frameMesh = [];
  frameMeshOutline = [];
  lensesMesh = [];
  templeMesh = [];

  lensColor = "#FFFFFF";
  lensTransparency = 0.8;

  templeTexture = "original.jpg";
  templeIntialTexture = null;
  templeColor = "#FFFFFF";
  templeMetalness = 0.1;
  templeRoughness = 0.2;
  templeTransparency = 0;

  frameTexture = "original.jpg";
  frameIntialTexture = null;
  frameColor = "#FFFFFF";
  frameMetalness = 0.2;
  frameRoughness = 0.1;
  frameTransparency = 0;

  constructor() {
    makeAutoObservable(this);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  // setSelectedPart(part){
  //   this.selectedPart = part;
  // }

  resetAllProperty() {
    this.selectedPart = "frame"
    this.lensColor = "#FFFFFF";
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
    this.frameColor = "#FFFFFF";
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
    this.templeColor = "#FFFFFF";
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
  saveAllProperty() {
    // Prepare the data for download
    const jsonData = {
      glbUrl: "./assets/glbs/sampleModel.glb",
      groups: [
        {
          displayName: "Frame",
          meshNode: ["frame"],
          selectedTexture: this.frameTexture || "original.jpg",
          selectedColor: this.frameColor,
          roughness: this.frameRoughness,
          metalness: this.frameMetalness,
          transparency: this.frameTransparency,
          availableTextures: ["original.jpg", "texture1.png", "texture3.jpg"],
        },
        {
          displayName: "Temple",
          meshNode: ["left_temple", "right_temple"],
          selectedTexture: this.templeTexture || "original.jpg",
          selectedColor: this.templeColor,
          roughness: this.templeRoughness,
          metalness: this.templeMetalness,
          transparency: this.templeTransparency,
          availableTextures: ["original.jpg", "texture1.png", "texture2.jpg"],
        },
        {
          displayName: "Lenses",
          meshNode: ["left_lens", "right_lens"],
          
          selectedColor: this.lensColor,
          
          transparency: this.lensTransparency,
        },
      ],
      textures: ["original.jpg", "texture1.png", "texture2.jpg", "texture3.jpg"],
      colors: [
        "#FFFFFF",
        "#D5BC93",
        "#AC252B",
        "#185848",
        "#025D98",
        "#D2A693",
        "Custom",
      ],
    };

    // Convert to Blob and create a link to trigger the download
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "model_config.json"; // Set the default file name
    link.click();
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
