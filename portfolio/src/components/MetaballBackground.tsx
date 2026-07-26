"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uBgColor;
varying vec2 vUv;

// Distance field for a metaball
float metaball(vec2 p, vec2 center, float radius) {
    vec2 diff = p - center;
    return radius / dot(diff, diff);
}

void main() {
    // Normalize coordinates based on aspect ratio
    vec2 uv = (vUv - 0.5) * uResolution / min(uResolution.x, uResolution.y) + 0.5;

    float sum = 0.0;

    // Create 5 floating blobs
    vec2 pos1 = vec2(0.5 + 0.3 * sin(uTime * 0.4), 0.5 + 0.3 * cos(uTime * 0.3));
    vec2 pos2 = vec2(0.5 + 0.4 * cos(uTime * 0.5), 0.5 + 0.2 * sin(uTime * 0.2));
    vec2 pos3 = vec2(0.5 + 0.2 * sin(uTime * 0.2), 0.5 + 0.4 * cos(uTime * 0.6));
    vec2 pos4 = vec2(0.2 + 0.5 * cos(uTime * 0.3), 0.8 + 0.1 * sin(uTime * 0.4));
    vec2 pos5 = vec2(0.8 + 0.2 * sin(uTime * 0.5), 0.2 + 0.5 * cos(uTime * 0.3));

    // Radii of blobs
    sum += metaball(uv, pos1, 0.08);
    sum += metaball(uv, pos2, 0.12);
    sum += metaball(uv, pos3, 0.05);
    sum += metaball(uv, pos4, 0.03);
    sum += metaball(uv, pos5, 0.06);

    // Background color dynamically passed from active theme uniform
    vec3 bgColor = uBgColor;
    // Blob color: Deep Onyx
    vec3 blobColor = vec3(0.04, 0.04, 0.04); 

    // Threshold the sum to create sharp, merging metaballs
    float t = smoothstep(0.98, 1.02, sum);

    vec3 finalColor = mix(bgColor, blobColor, t);

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

function Scene({ themeColor }: { themeColor: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const targetColor = useMemo(() => new THREE.Color(themeColor), [themeColor]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uResolution: { 
        value: new THREE.Vector2(
          typeof window !== "undefined" ? window.innerWidth : 1000, 
          typeof window !== "undefined" ? window.innerHeight : 1000
        ) 
      },
      uBgColor: { value: new THREE.Color(themeColor) }
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      
      // Smoothly interpolate shader background color to selected theme
      materialRef.current.uniforms.uBgColor.value.lerp(targetColor, 0.05);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function MetaballBackground({ themeColor = "#2563EB" }: { themeColor?: string }) {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }}>
        <Scene themeColor={themeColor} />
      </Canvas>
    </div>
  );
}
