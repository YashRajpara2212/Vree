// ButtonManager.js
import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js"; 
class ButtonManager {
    constructor(scene, css2DRenderer) {
      this.scene = scene;
      this.css2DRenderer = css2DRenderer; // CSS2DRenderer for rendering the buttons
      this.buttons = []; // Array to store button objects
    }
  
    // Method to create and add a CSS2D button to a specific 3D object
    createButton(object, buttonLabel) {
      // Create a simple HTML button element
      const button = document.createElement('button');
      button.innerText = buttonLabel;
      button.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      button.style.color = 'white';
      button.style.padding = '10px';
      button.style.borderRadius = '5px';
      button.style.fontSize = '14px';
      button.style.cursor = 'pointer';
  
      // Create a CSS2DObject from the HTML button
      const buttonObject = new CSS2DObject(button);
      buttonObject.position.set(0, 1.5, 0); // Set button position relative to the 3D object
  console.log(buttonObject, "buttonObject");
      // Add the button as a child of the specified 3D object in the scene
      object.add(buttonObject);
  
      // Store the button info for future updates and management
      this.buttons.push({ object, buttonObject, button });
    }
  
    // Method to update button positions, ensuring they follow the 3D object
    update() {
      this.buttons.forEach(({ object, buttonObject }) => {
        // Ensure button stays attached to its parent 3D object
        buttonObject.position.copy(object.position).add(new THREE.Vector3(0, 1.5, 0)); // Adjust button's offset
      });
    }
  
    // Method to remove a button from a 3D object
    removeButton(object) {
      const index = this.buttons.findIndex((btn) => btn.object === object);
      if (index !== -1) {
        this.scene.remove(this.buttons[index].buttonObject);
        this.buttons.splice(index, 1);
      }
    }
  }
  
  export default ButtonManager;
  