 uniform float uTime;
 
  varying vec3 vColor;
  
  
  
   void main(){
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      float angle = atan(modelPosition.x, modelPosition.z);
      float distanceToCenter = length(modelPosition.xz);



      float angleOffSet = -(1.0/distanceToCenter) * (uTime) * 0.02;


      angle += angleOffSet;


      modelPosition.x = sin(angle) *distanceToCenter ;
      //console.log(modelPosition.x);

      modelPosition.z = cos(angle) *distanceToCenter ;
      //console.log(modelPosition.z);

      
      vec4 modelView = viewMatrix * modelPosition;
      vec4 modelProjection = projectionMatrix *modelView;
      gl_Position = modelProjection;
      gl_PointSize = 6.0;
      gl_PointSize *= ( 1.0 / - modelView.z );
      vColor = color;
}