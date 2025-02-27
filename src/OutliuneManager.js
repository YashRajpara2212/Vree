import * as THREE from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { reaction } from "mobx";
import { vreeStore } from "./VreeStore";

class OutlineManager {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    //     // Outline parameters
    this.params = {
      edgeStrength: 3.0,
      edgeGlow: 0.1,
      edgeThickness: 2.0,
    };

    //     // Initialize composer
    this.composer = null;
    this.outlinePass = null;

    // Set initial part's outline when scene is created
    reaction(
      () => vreeStore.selectedPart,

      (selectedPart) => {
        if (selectedPart) {
          const temp = this.getSelectedMesh();
          // debugger;
          // if (!this.outlinePass) return;
          this.outlinePass.selectedObjects = temp;
          // if (temp && this.outlinePass) {
          //   this.outlinePass.selectedObjects = [temp]; // Ensure it's an array
          // }
          //   debugger;
          // if(selectedPart === "frame"){this.outlinePass.selectedObjects =[vreeStore.frameMeshOutline];}
          // if(selectedPart === "lenses"){this.outlinePass.selectedObjects = vreeStore.lensesMesh;}
          // if(selectedPart === "temple"){this.outlinePass.selectedObjects = vreeStore.templeMesh;}
        }
      }
    );
    this.setupOutline();
  }

  setupOutline() {
    // Dispose previous composer
    if (this.composer) {
      this.dispose();
    }

    // if (!this.outlinePass.selectedObjects) {
    //   console.log("not get outline object");
    // } else {
    //   console.log(this.outlinePass.selectedObjects, "hi");
    // }

    // debugger;
    const selectedMesh = this.getSelectedMesh();
    if (!selectedMesh) return;

    // Create new composer
    this.composer = new EffectComposer(this.renderer);

    // 1. Base render pass
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    // 2. Outline pass
    this.outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.scene,
      this.camera
    );

    this.configureOutlinePass(selectedMesh);
    this.composer.addPass(this.outlinePass);

    // 3. FXAA antialiasing
    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.uniforms.resolution.value.set(
      1 / window.innerWidth,
      1 / window.innerHeight
    );
    this.composer.addPass(fxaaPass);

    // 4. Final output pass (LAST)
    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);

    // Force initial render
    this.composer.render();
  }

  // debugger;
  getSelectedMesh() {
    switch (vreeStore.selectedPart) {
      case "frame":
        console.log("mesh get");
        return vreeStore.frameMesh;
      case "lenses":
        return vreeStore.lensesMesh;
      case "temple":
        return vreeStore.templeMesh;
      default:
        return null;
    }
  }
  configureOutlinePass(selectedMesh) {
    this.outlinePass.selectedObjects = selectedMesh;
    this.outlinePass.edgeStrength = this.params.edgeStrength;
    this.outlinePass.edgeGlow = this.params.edgeGlow;
    this.outlinePass.edgeThickness = this.params.edgeThickness;
    this.outlinePass.usePatternTexture = false;
    this.outlinePass.visibleEdgeColor.set("#a774ff");
    this.outlinePass.hiddenEdgeColor.set(0x4e3636);
  }

  dispose() {
    if (this.composer) {
      this.composer.passes.forEach((pass) => {
        if (pass.dispose) pass.dispose();
      });
      this.composer = null;
    }
    this.outlinePass = null;
  }

  onResize() {
    if (this.composer) {
      this.composer.setSize(window.innerWidth, window.innerHeight);
    }
    if (this.outlinePass) {
      this.outlinePass.setSize(window.innerWidth, window.innerHeight);
    }
  }
}
export default OutlineManager;
