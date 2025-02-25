import * as THREE from "three";
import { vreeStore } from "../../VreeStore";

class Temple {
  constructor() {
    // vreeStore.templeMesh = [
    //   vreeStore.frameMesh.children[1],
    //   vreeStore.frameMesh.children[3],
    // ];
    vreeStore.templeTexture = "original.jpg";
    // vreeStore.templeMesh[0].material.color = new THREE.Color(vreeStore.templeColor);
    // vreeStore.templeMesh[1].material.color = new THREE.Color(vreeStore.templeColor);
    vreeStore.templeMesh[0].material.metalness = vreeStore.templeMetalness;
    vreeStore.templeMesh[1].material.metalness = vreeStore.templeMetalness;
    vreeStore.templeMesh[0].material.roughness = vreeStore.templeRoughness;
    vreeStore.templeMesh[1].material.roughness = vreeStore.templeRoughness;
    vreeStore.templeMesh[0].material.transparent = true;
    vreeStore.templeMesh[1].material.transparent = true;

    vreeStore.templeMesh[0].material.opacity = 1 - vreeStore.templeTransparency;
    vreeStore.templeMesh[1].material.opacity = 1 - vreeStore.templeTransparency;
  }

  static updateTempleTexture(texturePath, textureName) {
    vreeStore.templeTexture = textureName;
    if (textureName === "original.jpg") {
      vreeStore.templeMesh[0].material.map = vreeStore.templeIntialTexture;
      vreeStore.templeMesh[1].material.map = vreeStore.templeIntialTexture;
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

        vreeStore.templeMesh[0].material.map = texture;
        vreeStore.templeMesh[1].material.map = texture;

        // Ensure the texture is properly applied to the material
        vreeStore.templeMesh[0].material.needsUpdate = true;
        vreeStore.templeMesh[1].material.needsUpdate = true;
        console.log(vreeStore.templeMesh, "templeTexture");
      });
    }
  }

  static updateTempleColor(color) {
    vreeStore.templeColor = color;
    vreeStore.templeMesh[0].material.color = new THREE.Color(color);
    vreeStore.templeMesh[1].material.color = new THREE.Color(color);
  }

  static updateTempleMetalness(metalness) {
    vreeStore.templeMetalness = metalness;
    vreeStore.templeMesh[0].material.metalness = metalness;
    vreeStore.templeMesh[1].material.metalness = metalness;
  }

  static updateTempleRoughness(roughness) {
    vreeStore.templeRoughness = roughness;
    vreeStore.templeMesh[0].material.roughness = roughness;
    vreeStore.templeMesh[1].material.roughness = roughness;
  }

  static updateTempleTransparency(transparency) {
    console.log(vreeStore.templeMesh[0], "firstmesh");
    vreeStore.templeTransparency = transparency;
    vreeStore.templeMesh[0].material.transparent = true;
    vreeStore.templeMesh[1].material.transparent = true;
    vreeStore.templeMesh[0].material.opacity = 1 - transparency;
    vreeStore.templeMesh[1].material.opacity = 1 - transparency;
    vreeStore.templeMesh[0].material.needsUpdate = true;
    vreeStore.templeMesh[1].material.needsUpdate = true;
  }
}

export default Temple;
