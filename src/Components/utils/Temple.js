import * as THREE from "three";
import { vreeStore } from "../../VreeStore";

class Temple {
  constructor() {
    vreeStore.templeMesh = [
      vreeStore.frameMesh.children[1],
      vreeStore.frameMesh.children[3],
    ];
    vreeStore.templeTexture = null;
    vreeStore.templeColor = vreeStore.templeMesh[0].material.color;
    vreeStore.templeMetalness = vreeStore.templeMesh[0].material.metalness;
    vreeStore.templeRoughness = vreeStore.templeMesh[0].material.roughness;
    vreeStore.templeTransparency = vreeStore.templeMesh[0].material.opacity;
  }

  static updateTempleTexture(texturePath, textureName) {
    vreeStore.templeTexture = textureName;
    const loader = new THREE.TextureLoader();
    loader.load(texturePath, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.encoding = THREE.sRGBEncoding;
      texture.repeat.set(1, 1);
      texture.wrapS = THREE.RepeatWrapping; // Ensures that the texture is clamped to the edge (no repeat on edges)
      texture.wrapT = THREE.RepeatWrapping
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

  static updateTempleColor(color) {
    vreeStore.templeColor = color;
    vreeStore.templeMesh[0].material.color = new THREE.Color(color);
    vreeStore.templeMesh[1].material.color = new THREE.Color(color);
  }

  updateTempleMetalness(metalness) {
    vreeStore.templeMetalness = metalness;
    vreeStore.templeMesh[0].material.metalness = metalness;
    vreeStore.templeMesh[1].material.metalness = metalness;
  }

  updateTempleRoughness(roughness) {
    vreeStore.templeRoughness = roughness;
    vreeStore.templeMesh[0].material.roughness = roughness;
    vreeStore.templeMesh[1].material.roughness = roughness;
  }

  updateTempleTransparency(transparency) {
    vreeStore.templeTransparency = transparency;
    vreeStore.templeMesh[0].material.opacity = transparency;
    vreeStore.templeMesh[1].material.opacity = transparency;
  }
}

export default Temple;
