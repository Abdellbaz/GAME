D=0,U=1,F=0.5,B=-0.5,R=0.5,L=-0.5;//(down up front back right left) postion

cube={// OPTIMIZE: a cube with vertices/indices/texturecoord  12 vertices
  size:0.48,
    vertices : [
      L,D,F,/*0,1*/ R,D,F,/*1,1*/ R,U,F,/*1,0*/ L,U,F,/*0,0*/
      R,D,B,/*0,1*/ L,D,B,/*1,1*/ L,U,B,/*1,0*/ R,U,B,/*0,0*/
      L,U,F,/*1,1*/ R,U,F,/*0,1*/ L,D,B,/*0,0*/ R,D,B,/*1,0*/
     ],
    indices :[0,1,2,2,3,0, 4,5,6,6,7,4, 1,4,7,7,2,1, 5,0,3,3,6,5, 8,9,7,7,6,8, 1,0,10,10,11,1],
  coord:[0,1,1,1,1,0,0,0, 0,1,1,1,1,0,0,0, 1,1,0,1, 0,0,1,0,   ]}

cube1={// OPTIMIZE: a cube with vertices/indices/texturecoord  16 vertices
  size:0.48,
    vertices : [
       L,D,F, R,D,F,  R,U,F,  L,U,F, //front face
       R,D,B, L,D,B,  L,U,B,  R,U,B, //back face
       L,U,F, R,U,F,  R,U,B,  L,U,B, //Top face
       R,D,F, L,D,F,  L,D,B,  R,D,B, //Down face
    ],
    indices :[0,1,2,2,3,0, 4,5,6,6,7,4, 1,4,7,7,2,1, 5,0,3,3,6,5, 8,9,10,10,11,8, 12,13,14,14,15,12],
  coord:[1,1,0,1,0,0,1,0, 1,1,0,1,0,0,1,0, 1,1,0,1,0,0,1,0, 1,1,0,1,0,0,1,0,]}

  cube2={// just a cube with vertices/indices/texturecoord 24 vertices
    size:0.48,
      vertices : [
         L,D,F, R,D,F,  R,U,F,  L,U,F, //front face
         R,D,B, L,D,B,  L,U,B,  R,U,B, //back face
         R,D,F, R,D,B,  R,U,B,  R,U,F, //Right face
         L,D,B, L,D,F,  L,U,F,  L,U,B, //Left face
         L,U,F, R,U,F,  R,U,B,  L,U,B, //Top face
         R,D,F, L,D,F,  L,D,B,  R,D,B, //Down face
      ],
      indices :[0,1,2,2,3,0, 4,5,6,6,7,4, 8,9,10,10,11,8, 12,13,14,14,15,12, 16,17,18,18,19,16 ,20,21,22,22,23,20],
      coord:[1,1,0,1,0,0,1,0, 1,1,0,1,0,0,1,0, 1,1,0,1,0,0,1,0, 1,1,0,1,0,0,1,0, 1,1,0,1,0,0,1,0, 1,1,0,1,0,0,1,0,]}
