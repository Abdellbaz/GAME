"use strict";

const vertexShader = `#version 300 es
in vec4 Position;//get from script
in vec2 TexCoord;//get from script
out vec2 v_texcoord;// send to fragmentShader
in vec3 Offset;//is used by instance

uniform mat4 Matrix;

void main() {
  v_texcoord = TexCoord;
  gl_Position = Matrix * (vec4(Offset,0) +Position);
}
`;

const fragmentShader = `#version 300 es
precision highp float;
in vec2 v_texcoord;
uniform sampler2D _texture;

out vec4 _finalResult;

void main() {
  _finalResult = texture(_texture, v_texcoord);
}
`;
