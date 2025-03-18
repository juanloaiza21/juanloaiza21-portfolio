import * as THREE from "three";
import { extend } from "@react-three/fiber";
import shortUUID from "short-uuid";

class CustomShader extends THREE.ShaderMaterial {
  static key: string;

  constructor() {
    super({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color("#BD45BF") }, // Purple/magenta
        color2: { value: new THREE.Color("#114BBF") }, // Deep blue
        color3: { value: new THREE.Color("#168BF2") }, // Medium blue
        color4: { value: new THREE.Color("#139DF2") }, // Light blue
        colorBg: { value: new THREE.Color("#030826") }, // Dark blue background
      },
      vertexShader: /* glsl */ `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
                }
            `,
      fragmentShader: /* glsl */ `
                uniform float time;
                uniform vec3 color1;
                uniform vec3 color2;
                uniform vec3 color3;
                uniform vec3 color4;
                uniform vec3 colorBg;
                varying vec2 vUv;

                void main() {
                    // Parameters for the waves
                    float frequency = 10.0;
                    float amplitude = 0.1;
                    float speed = 2.0;
                    
                    // Create primary horizontal wave
                    float wave1 = sin(vUv.x * frequency + time * speed) * amplitude;
                    wave1 += sin(vUv.x * frequency * 2.0 + time * speed * 1.5) * amplitude * 0.5;
                    
                    // Create second wave moving in opposite direction (vertical)
                    float wave2 = sin(vUv.y * frequency - time * speed * 0.7) * amplitude;
                    wave2 += sin(vUv.y * frequency * 1.5 - time * speed) * amplitude * 0.3;
                    
                    // Combine waves for interference pattern
                    float combinedWave = wave1 + wave2;
                    
                    // Use the position to create a multi-color gradient
                    float pos = vUv.y + vUv.x * 0.5 + combinedWave * 0.2;
                    
                    // Create 4-color gradient
                    vec3 color;
                    if (pos < 0.33) {
                        color = mix(color1, color2, smoothstep(0.0, 0.33, pos) * 3.0);
                    } else if (pos < 0.66) {
                        color = mix(color2, color3, smoothstep(0.33, 0.66, pos) * 3.0 - 1.0);
                    } else {
                        color = mix(color3, color4, smoothstep(0.66, 1.0, pos) * 3.0 - 2.0);
                    }
                    
                    // Add wave effect
                    float distFromWave = abs((vUv.y - 0.5 - wave1) * (vUv.x - 0.5 - wave2));
                    float waveMix = smoothstep(0.0, 0.03, distFromWave);
                    
                    // Mix with background color based on wave position
                    color = mix(color, colorBg, waveMix * 0.7);
                    
                    // Add a glow effect around the wave intersections
                    float glow = smoothstep(0.02, 0.0, distFromWave);
                    color = mix(color, color1 * 1.5, glow * 0.5);
                    
                    // Output the final color
                    gl_FragColor = vec4(color, 1.0);
                }
            `,
    });
  }

  set time(v: number) {
    this.uniforms.time.value = v;
  }

  get time(): number {
    return this.uniforms.time.value;
  }

  // Type declarations for uniforms access
  declare uniforms: {
    time: { value: number };
    colorStart: { value: THREE.Color };
    colorEnd: { value: THREE.Color };
  };
}

// Generate a unique key for this shader
const translator = shortUUID();
CustomShader.key = translator.generate();

// Extend R3F with this custom shader
extend({ CustomShader });

export { CustomShader };
