"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uHoverState;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Sine wave distortion based on hover state
  float wave = sin(uv.y * 10.0 + uTime * 2.0) * 0.05 * uHoverState;
  float waveX = sin(uv.x * 10.0 + uTime * 2.0) * 0.05 * uHoverState;
  
  // Zoom effect
  vec2 center = vec2(0.5);
  vec2 zoomUv = mix(uv, center, uHoverState * 0.1);
  
  vec4 color = texture2D(uTexture, zoomUv + vec2(wave, waveX));
  
  // Color tint on hover (Patrick Heng subtle exposure shift)
  vec3 tint = mix(color.rgb, color.rgb + vec3(0.1, 0.2, 0.3), uHoverState * 0.5);
  
  gl_FragColor = vec4(tint, color.a);
}
`;

const vertexShader = `
varying vec2 vUv;
uniform float uHoverState;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Slight bulge effect
  float dist = distance(uv, vec2(0.5));
  pos.z += sin(dist * 3.14) * 0.2 * uHoverState;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

function Scene({ imagePath }: { imagePath: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHover] = useState(false);
  const texture = useTexture(imagePath);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uHoverState: { value: 0.0 },
      uTime: { value: 0.0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly interpolate hover state
      materialRef.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverState.value,
        hovered ? 1.0 : 0.0,
        0.05
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export default function WebGLImageHover({ imagePath, className = "" }: { imagePath: string, className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Canvas camera={{ position: [0, 0, 1], fov: 50 }}>
        <Scene imagePath={imagePath} />
      </Canvas>
    </div>
  );
}
