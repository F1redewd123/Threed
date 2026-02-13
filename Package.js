export async function genPrimitives() {
  var vec2 = await import("https://f1redewd123.github.io/Threed/Vector2.js");
  var vec3 = await import("https://f1redewd123.github.io/Threed/Vector3.js");
  var vec4 = await import("https://f1redewd123.github.io/Threed/Vector4.js");

  return [ vec2, vec3, vec4 ];
}
