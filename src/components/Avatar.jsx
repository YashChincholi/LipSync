/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 ./LipSync/models/66e9374104eba267d2af0762.glb -o src/components/Avatar.jsx -r public 
*/

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export function Avatar(props) {
  const corresponding = {
    A: "viseme_PP", // Closed mouth for "P", "B", "M"
    B: "viseme_DD", // Slightly open mouth with clenched teeth for "K", "S", "T"
    C: "viseme_E", // Open mouth for vowels like "EH", "AE"
    D: "viseme_aa", // Wide open mouth for "AA"
    E: "viseme_O", // Slightly rounded mouth for "AO", "ER"
    F: "viseme_U", // Puckered lips for "UW", "OW", "W"
    G: "viseme_FF", // Upper teeth touching lower lip for "F", "V"
    H: "viseme_TH", // Tongue raised behind upper teeth for "L"
    X: "viseme_sil", // Idle position for pauses
  };

  const { playAudio, script } = useControls({
    playAudio: false,
    script: {
      value: "ChattyToaster",
      options: ["BreakfastBandit", "ChattyToaster"],
    },
  });

  const audio = useMemo(
    () => new Audio(`/LipSync/audios/${script}.mp3`),
    [script]
  );
  const jsonFile = useLoader(
    THREE.FileLoader,
    `/LipSync/audios/${script}.json`
  );
  const lipSync = JSON.parse(jsonFile);

  useFrame(() => {
    const currentAudio = audio.currentTime;

    if (audio.paused || audio.ended) {
      setAnimation("Idle");
    }
    Object.values(corresponding).forEach((value) => {
      nodes.Wolf3D_Head.morphTargetInfluences[
        nodes.Wolf3D_Head.morphTargetDictionary[value]
      ] = 0;
      nodes.Wolf3D_Teeth.morphTargetInfluences[
        nodes.Wolf3D_Teeth.morphTargetDictionary[value]
      ] = 0;
    });

    for (let i = 0; i < lipSync.mouthCues.length; i++) {
      let mouthCue = lipSync.mouthCues[i];
      if (currentAudio >= mouthCue.start && currentAudio <= mouthCue.end) {
        nodes.Wolf3D_Head.morphTargetInfluences[
          nodes.Wolf3D_Head.morphTargetDictionary[corresponding[mouthCue.value]]
        ] = 1;
        nodes.Wolf3D_Teeth.morphTargetInfluences[
          nodes.Wolf3D_Teeth.morphTargetDictionary[
            corresponding[mouthCue.value]
          ]
        ] = 1;
      }
    }
  });

  useEffect(() => {
    if (playAudio) {
      audio.play();
      if (script === "ChattyToaster") {
        setAnimation("Greeting");
      }
      if (script === "BreakfastBandit") {
        setAnimation("Idle");
      }
    } else {
      audio.pause();
    }
  }, [playAudio, script]);

  const { nodes, materials } = useGLTF(
    "/LipSync/models/66e9374104eba267d2af0762.glb"
  );
  const { animations: idleAnimation } = useFBX("/LipSync/animations/Idle.fbx");
  const { animations: angryAnimation } = useFBX(
    "/LipSync/animations/Angry%20Gesture.fbx"
  );
  const { animations: greetingAnimation } = useFBX(
    "/LipSync/animations/Standing%20Greeting.fbx"
  );

  idleAnimation[0].name = "Idle";
  angryAnimation[0].name = "Angry";
  greetingAnimation[0].name = "Greeting";

  const [animation, setAnimation] = useState("Angry");

  const group = useRef();
  const { actions } = useAnimations(
    [idleAnimation[0], angryAnimation[0], greetingAnimation[0]],
    group
  );

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation].fadeOut(0.5);
  }, [animation]);

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload("/LipSync/models/66e9374104eba267d2af0762.glb");
