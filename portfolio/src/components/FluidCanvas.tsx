"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    
    // Mouse distortion
    float dist = distance(st, uMouse);
    float ripple = sin(dist * 20.0 - uTime * 2.0) * exp(-dist * 5.0);
    
    // Noise flow
    float n = snoise(st * 3.0 + uTime * 0.1);
    
    // Combine noise and mouse ripple
    float intensity = n * 0.5 + ripple * 0.5;
    
    // Oceanic Tech Blue Colors
    vec3 color1 = vec3(0.02, 0.08, 0.2); // Deep Navy
    vec3 color2 = vec3(0.0, 0.6, 1.0); // Bright Ocean Blue
    vec3 color3 = vec3(0.1, 0.3, 0.8); // Royal Blue
    
    // Mix colors based on noise flow
    vec3 baseColor = mix(color1, color2, n * 0.5 + 0.5);
    baseColor = mix(baseColor, color3, sin(uTime * 0.2 + st.y * 2.0) * 0.5 + 0.5);
    
    // Lower base intensity for contrast, then add vibrant ripples
    vec3 finalColor = baseColor * (intensity * 0.5 + 0.2);
    
    // Pop the mouse ripple in bright ice blue
    finalColor += vec3(0.0, 0.8, 1.0) * ripple * 0.8;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Update resolution uniform
      materialRef.current.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );

      // Smoothly interpolate mouse (lerp) for fluid feeling
      const currentMouse = materialRef.current.uniforms.uMouse.value;
      const targetMouseX = (state.pointer.x + 1) / 2;
      const targetMouseY = (state.pointer.y + 1) / 2;
      
      currentMouse.x += (targetMouseX - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouseY - currentMouse.y) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function FluidCanvas() {
  return (
    <div className="fixed inset-0 w-full h-screen -z-10 bg-[#050505] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
