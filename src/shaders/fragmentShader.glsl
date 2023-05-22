uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
uniform sampler2D uTexture;

varying float vElevation;
varying vec2 vUv;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  float mixStrengthColor = (vElevation + uColorOffset) * uColorMultiplier;
  vec3 color = mix(uDepthColor, uSurfaceColor, mixStrengthColor);
  // gl_FragColor = vec4(color, 1.0);
  textureColor.rgb *= vElevation * 2.0 + uColorOffset;
  gl_FragColor = textureColor;
}