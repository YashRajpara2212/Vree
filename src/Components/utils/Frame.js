
import * as THREE from "three";
import { vreeStore } from "../../VreeStore";

class Frame {
  constructor() {
    vreeStore.frameTexture = "original.jpg";
    // vreeStore.frameMesh[0].material.color = new THREE.Color(vreeStore.frameColor);
    vreeStore.frameMesh[0].material.metalness = vreeStore.frameMetalness;
    vreeStore.frameMesh[0].material.roughness = vreeStore.frameRoughness;
    vreeStore.frameMesh[0].material.transparent = true;
     vreeStore.frameMesh[0].material.opacity = 1-vreeStore.frameTransparency;
    //  vreeStore.frameMesh[0].material.needsUpdate = true;
    //  vreeStore .frameMesh[0].material.map = vreeStore.frameIntialTexture;
  }

  static updateFrameTexture(texturePath, textureName) {
    vreeStore.frameTexture = textureName;
    if (textureName === "original.jpg") {
      vreeStore.frameMesh[0].material.map = vreeStore.frameIntialTexture;
      vreeStore.frameMesh[0].material.needsUpdate = true;
    } else {
      const loader = new THREE.TextureLoader();
      loader.load(texturePath, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.encoding = THREE.sRGBEncoding;
        texture.repeat.set(1, 1);
        texture.wrapS = THREE.RepeatWrapping; // Ensures that the texture is clamped to the edge (no repeat on edges)
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
       
        vreeStore.frameMesh[0].material.map = texture;
        vreeStore.frameMesh[0].material.needsUpdate = true;
        console.log(vreeStore.frameMesh[0], "frameTexture");
      });
    }
  }

  static updateFrameColor(color) {
    vreeStore.frameColor = color;
    vreeStore.frameMesh[0].material.color = new THREE.Color(color);
    console.log(vreeStore.frameMesh[0], "frameColor");
  }

  static updateFrameMetalness(metalness) {
    vreeStore.frameMetalness = metalness;
    vreeStore.frameMesh[0].material.metalness = metalness;
  }

  static updateFrameRoughness(roughness) {
    vreeStore.frameRoughness = roughness;
    vreeStore.frameMesh[0].material.roughness = roughness;
  }

  static updateFrameTransparency(transparency) {
    vreeStore.frameTransparency = transparency;
    vreeStore.frameMesh[0].material.transparent = true;

    vreeStore.frameMesh[0].material.opacity = 1 - transparency;
    vreeStore.frameMesh[0].material.needsUpdate = true;
  }
}

export default Frame;
