import * as THREE from "three";
import { vreeStore } from "../../VreeStore";

class Frame {
  constructor() {
    vreeStore.frameTexture = null;
    vreeStore.frameColor = vreeStore.frameMesh.material.color;
    vreeStore.frameMetalness = vreeStore.frameMesh.material.metalness;
    vreeStore.frameRoughness = vreeStore.frameMesh.material.roughness;
    // vreeStore.frameMesh.material.transparent = true;
    vreeStore.frameTransparency = vreeStore.frameMesh.material.opacity;
  }

  static updateFrameTexture(texturePath, textureName) {
    vreeStore.frameTexture = textureName;
    if (textureName === "original.jpg") {
      vreeStore.frameMesh.material.map = vreeStore.frameIntialTexture;
      vreeStore.frameMesh.material.needsUpdate = true;
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
        // texture.colorSpace = THREE.SRGBColorSpace;
        // texture.encoding = THREE.sRGBEncoding;
        // texture.repeat.set(0.3, 0.3);
        // texture.wrapS = THREE.RepeatWrapping; // Ensures that the texture is clamped to the edge (no repeat on edges)
        // texture.wrapT = THREE.RepeatWrapping;
        // texture.minFilter = THREE.LinearFilter;
        // texture.magFilter = THREE.LinearFilter;

        //THREE.ClampToEdgeWrapping
        // texture.repeat.set(1, 1);
        // texture.wrapS = THREE.ClampToEdgeWrapping; // Ensures that the texture is clamped to the edge (no repeat on edges)
        // texture.wrapT = THREE.ClampToEdgeWrapping;
        //THREE.LinearFilter
        // texture.minFilter = THREE.LinearFilter;
        // texture.magFilter = THREE.LinearFilter;
        // texture.colorSpace = THREE.SRGBColorSpace;
        vreeStore.frameMesh.material.map = texture;
        vreeStore.frameMesh.material.needsUpdate = true;
        console.log(vreeStore.frameMesh, "frameTexture");
      });
    }
  }

  static updateFrameColor(color) {
    vreeStore.frameColor = color;
    vreeStore.frameMesh.material.color = new THREE.Color(color);
    console.log(vreeStore.frameMesh, "frameColor");
  }

  static updateFrameMetalness(metalness) {
    vreeStore.frameMetalness = metalness;
    vreeStore.frameMesh.material.metalness = metalness;
  }

  static updateFrameRoughness(roughness) {
    vreeStore.frameRoughness = roughness;
    vreeStore.frameMesh.material.roughness = roughness;
  }

  static updateFrameTransparency(transparency) {
    vreeStore.frameTransparency = transparency;
    vreeStore.frameMesh.material.transparent = true;

    vreeStore.frameMesh.material.opacity = 1 - transparency;
    vreeStore.frameMesh.material.needsUpdate = true;
  }
}

export default Frame;
