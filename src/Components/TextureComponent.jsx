import { useState } from "react";
import Frame from "./utils/Frame";
import Temple from "./utils/Temple";
// import { Texture } from "three";

const TextureComponent = ({ selectedSection }) => {
  const [selectedTexture, setSelectedTexture] = useState("original.jpg");

  //   /assets/texture/null_image.svg
  const textures = [
    {
      texturePath: "/assets/texture/2342.jpg",
      textureName: "null",
      textureImage: "/assets/texture/null_image.svg",
    },
    {
      texturePath: "/assets/texture/original.jpg",
      textureName: "original.jpg",
      textureImage: "/assets/texture/original.jpg",
    },
    {
      texturePath: "/assets/texture/texture1.png",
      textureName: "texture1",
      textureImage: "/assets/texture/texture1.png",
    },
    {
      texturePath: "/assets/texture/texture2.jpg",
      textureName: "texture2",
      textureImage: "/assets/texture/texture2.jpg",
    },
  ];
  const handleSelectTexture = (TextureName, TexturePath) => {
    console.log(TexturePath, TextureName, "path and name");
    setSelectedTexture(TextureName);
    if (selectedSection === "frame") {
      Frame.updateFrameTexture(TexturePath, TextureName);
    }

    if (selectedSection === "temple") {
      Temple.updateTempleTexture(TexturePath, TextureName);
    }
  };
  return (
    <>
      <div className="text-white text-xl font-bold">Texture</div>
      <div className="mx-5 my-3 flex space-x-12 overflow-x-auto p-4">
        {textures.map((texture) => (
          <div
            key={texture.textureName}
            className={`relative cursor-pointer w-13 h-13 rounded-full bg-cover bg-center transition-all duration-300 ${
              selectedTexture === texture.textureName
                ? "border-4 border-blue-500 scale-95"
                : "hover:border-4 hover:border-white hover:scale-95"
            }`}
            style={{ backgroundImage: `url(${texture.textureImage})` }}
            onClick={() =>
              handleSelectTexture(texture.textureName, texture.texturePath)
            }
          >
            {selectedTexture === texture.textureName && (
              <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TextureComponent;
