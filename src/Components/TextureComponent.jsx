import { useState } from "react";
import Frame from "./utils/Frame";
import Temple from "./utils/Temple";
import { Texture } from "three";

const TextureComponent = ({ selectedSection }) => {
  const [selectedTexture, setSelectedTexture] = useState(null);

  const textures = [
    { texturePath: "/assets/texture/null_image.svg", textureName: "null" },
    {
      texturePath: "/assets/texture/original.jpg",
      textureName: "original.jpg",
    },
    { texturePath: "/assets/texture/texture1.png", textureName: "texture1" },
    { texturePath: "/assets/texture/texture2.jpg", textureName: "texture2" },
  ];
  const handleSelectTexture = (TextureName, TexturePath) => {
    console.log(TexturePath, TextureName, "name and path");
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
      <div className="flex space-x-13 overflow-x-auto p-4">
        {textures.map((texture) => (
          <div
            key={texture.textureName}
            className={`relative cursor-pointer w-13 h-13 rounded-full bg-cover bg-center transition-all duration-300 ${
              selectedTexture === texture.textureName
                ? "border-4 border-blue-500 scale-95"
                : "hover:border-4 hover:border-white hover:scale-95"
            }`}
            style={{ backgroundImage: `url(${texture.texturePath})` }}
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
