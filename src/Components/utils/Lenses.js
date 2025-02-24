import * as THREE from "three";
import { vreeStore } from "../../VreeStore";

class Lenses {
  constructor() {
    vreeStore.lensesMesh = [vreeStore.frameMesh.children[0],vreeStore.frameMesh.children[2]];
    vreeStore.lensColor = vreeStore.lensesMesh[0].material.color;
    vreeStore.lensTransparency = vreeStore.lensesMesh[0].material.opacity;


  }

  static updateLensesColor(color) {
    vreeStore.lensColor = color;
    vreeStore.lensesMesh[0].material.color = new THREE.Color(color);
    vreeStore.lensesMesh[1].material.color = new THREE.Color(color);
  }

  static updateLensesTransparency(transparency) {
    vreeStore.lensTransparency = transparency;
    vreeStore.lensesMesh[0].material.opacity = 1 - transparency;
    vreeStore.lensesMesh[1].material.opacity = 1 - transparency;
  }
}

export default Lenses;
