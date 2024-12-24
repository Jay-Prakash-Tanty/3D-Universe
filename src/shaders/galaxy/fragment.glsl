

varying vec3 vColor;
void main(){
    float pattern = distance(gl_PointCoord, vec2(0.5));
    pattern = 1.0-step(0.5, pattern);

   // float pattern = distance(gl_PointCoord, vec2(0.5));
    //pattern = 1.0 - pattern;
    //pattern = pow(pattern, 10.0);
    
    vec3 mixture = mix(vec3(0),vColor, pattern);
    gl_FragColor = vec4(vec3(mixture),1.0);
}