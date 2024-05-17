//Metal Shading Language version 2.3
#define __METAL__ 
#include <metal_stdlib>
#include <simd/simd.h>
using namespace metal;
#define vec2 float2
#define vec3 float3
#define vec4 float4
#define ivec2 int2
#define ivec3 int3
#define ivec4 int4
#define uvec2 uint2
#define uvec3 uint3
#define uvec4 uint4
#define bvec2 bool2
#define bvec3 bool3
#define bvec4 bool4
#define mat3 float3x3
#define mat4 float4x4


struct MetalTexture
{
    texture2d<float> tex;
    sampler s;
    int get_width() { return tex.get_width(); }
    int get_height() { return tex.get_height(); }
    int get_num_mip_levels() { return tex.get_num_mip_levels(); }
};

int get_width(MetalTexture mtlTex) { return mtlTex.get_width(); }

float4 texture(MetalTexture mtlTex, float2 uv)
{
    return mtlTex.tex.sample(mtlTex.s, uv);
}

float4 textureLod(MetalTexture mtlTex, float2 uv, float lod)
{
    return mtlTex.tex.sample(mtlTex.s, uv, level(lod));
}

int2 textureSize(MetalTexture mtlTex, int mipLevel)
{
    return int2(mtlTex.get_width(), mtlTex.get_height());
}

int texture_mips(MetalTexture mtlTex)
{
    return mtlTex.tex.get_num_mip_levels();
}
struct BSDF { float3 response; float3 throughput; };
#define EDF float3
struct surfaceshader { float3 color; float3 transparency; };
struct volumeshader { float3 color; float3 transparency; };
struct displacementshader { float3 offset; float scale; };
struct lightshader { float3 intensity; float3 direction; };
#define material surfaceshader

// Uniform block: PublicUniforms
struct PublicUniforms
{
    displacementshader displacementshader1;
    int geomprop_UV0_index;
    int mtlximage7_layer;
    vec3 mtlximage7_default;
    int mtlximage7_uaddressmode;
    int mtlximage7_vaddressmode;
    int mtlximage7_filtertype;
    int mtlximage7_framerange;
    int mtlximage7_frameoffset;
    int mtlximage7_frameendaction;
    vec2 mtlximage7_uv_scale;
    vec2 mtlximage7_uv_offset;
    int mtlximage10_layer;
    float mtlximage10_default;
    int mtlximage10_uaddressmode;
    int mtlximage10_vaddressmode;
    int mtlximage10_filtertype;
    int mtlximage10_framerange;
    int mtlximage10_frameoffset;
    int mtlximage10_frameendaction;
    vec2 mtlximage10_uv_scale;
    vec2 mtlximage10_uv_offset;
    int mtlximage11_layer;
    float mtlximage11_default;
    int mtlximage11_uaddressmode;
    int mtlximage11_vaddressmode;
    int mtlximage11_filtertype;
    int mtlximage11_framerange;
    int mtlximage11_frameoffset;
    int mtlximage11_frameendaction;
    vec2 mtlximage11_uv_scale;
    vec2 mtlximage11_uv_offset;
    int mtlximage8_layer;
    float mtlximage8_default;
    int mtlximage8_uaddressmode;
    int mtlximage8_vaddressmode;
    int mtlximage8_filtertype;
    int mtlximage8_framerange;
    int mtlximage8_frameoffset;
    int mtlximage8_frameendaction;
    vec2 mtlximage8_uv_scale;
    vec2 mtlximage8_uv_offset;
    int mtlximage9_layer;
    vec3 mtlximage9_default;
    int mtlximage9_uaddressmode;
    int mtlximage9_vaddressmode;
    int mtlximage9_filtertype;
    int mtlximage9_framerange;
    int mtlximage9_frameoffset;
    int mtlximage9_frameendaction;
    vec2 mtlximage9_uv_scale;
    vec2 mtlximage9_uv_offset;
    int mtlxnormalmap11_space;
    float mtlxnormalmap11_scale;
    float King_W_base;
    float King_W_diffuse_roughness;
    float King_W_specular;
    vec3 King_W_specular_color;
    float King_W_specular_IOR;
    float King_W_specular_anisotropy;
    float King_W_specular_rotation;
    float King_W_transmission;
    vec3 King_W_transmission_color;
    float King_W_transmission_depth;
    vec3 King_W_transmission_scatter;
    float King_W_transmission_scatter_anisotropy;
    float King_W_transmission_dispersion;
    float King_W_transmission_extra_roughness;
    float King_W_subsurface_scale;
    float King_W_subsurface_anisotropy;
    float King_W_sheen;
    vec3 King_W_sheen_color;
    float King_W_sheen_roughness;
    float King_W_coat;
    vec3 King_W_coat_color;
    float King_W_coat_roughness;
    float King_W_coat_anisotropy;
    float King_W_coat_rotation;
    float King_W_coat_IOR;
    float King_W_coat_affect_color;
    float King_W_coat_affect_roughness;
    float King_W_thin_film_thickness;
    float King_W_thin_film_IOR;
    float King_W_emission;
    vec3 King_W_emission_color;
    vec3 King_W_opacity;
    bool King_W_thin_walled;
};

// Uniform block: PrivateUniforms
struct PrivateUniforms
{
    mat4 u_envMatrix;
    float u_envLightIntensity;
    int u_envRadianceMips;
    int u_envRadianceSamples;
    bool u_refractionTwoSided;
    vec3 u_viewPosition;
    int u_numActiveLightSources;
};

// Inputs block: VertexData
struct VertexData
{
    float4 pos [[position]];
    vec3 normalWorld ;
    vec3 tangentWorld ;
    vec2 texcoord_0 ;
    vec3 positionWorld ;
};
// Pixel shader outputs
struct PixelOutputs
{
    vec4 out1;
};

#define DIRECTIONAL_ALBEDO_METHOD 0

#define MAX_LIGHT_SOURCES 3
struct LightData
{
    int type;
    float pad0;
    float pad1;
    float pad2;
};

struct LightData_pixel
{
    LightData u_lightData[MAX_LIGHT_SOURCES];
};

float3x3 operator+(float3x3 a, float b)
{
    return a + float3x3(b,b,b,b,b,b,b,b,b);
}

float4x4 operator+(float4x4 a, float b)
{
    return a + float4x4(b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b);
}

float3x3 operator-(float3x3 a, float b)
{
    return a - float3x3(b,b,b,b,b,b,b,b,b);
}

float4x4 operator-(float4x4 a, float b)
{
    return a - float4x4(b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b);
}

float3x3 operator/(float3x3 a, float3x3 b)
{
    for(int i = 0; i < 3; ++i)
        for(int j = 0; j < 3; ++j)
            a[i][j] /= b[i][j];

    return a;
}

float4x4 operator/(float4x4 a, float4x4 b)
{
    for(int i = 0; i < 4; ++i)
        for(int j = 0; j < 4; ++j)
            a[i][j] /= b[i][j];

    return a;
}

float3x3 operator/(float3x3 a, float b)
{
    for(int i = 0; i < 3; ++i)
        for(int j = 0; j < 3; ++j)
            a[i][j] /= b;

    return a;
}

float4x4 operator/(float4x4 a, float b)
{
    for(int i = 0; i < 4; ++i)
        for(int j = 0; j < 4; ++j)
            a[i][j] /= b;

    return a;
}
struct GlobalContext
{
    GlobalContext(
    VertexData vd
,     constant LightData u_lightData[MAX_LIGHT_SOURCES]
    ,     displacementshader displacementshader1

    ,     int geomprop_UV0_index

, MetalTexture mtlximage7_file    ,     int mtlximage7_layer

    ,     vec3 mtlximage7_default

    ,     int mtlximage7_uaddressmode

    ,     int mtlximage7_vaddressmode

    ,     int mtlximage7_filtertype

    ,     int mtlximage7_framerange

    ,     int mtlximage7_frameoffset

    ,     int mtlximage7_frameendaction

    ,     vec2 mtlximage7_uv_scale

    ,     vec2 mtlximage7_uv_offset

, MetalTexture mtlximage10_file    ,     int mtlximage10_layer

    ,     float mtlximage10_default

    ,     int mtlximage10_uaddressmode

    ,     int mtlximage10_vaddressmode

    ,     int mtlximage10_filtertype

    ,     int mtlximage10_framerange

    ,     int mtlximage10_frameoffset

    ,     int mtlximage10_frameendaction

    ,     vec2 mtlximage10_uv_scale

    ,     vec2 mtlximage10_uv_offset

, MetalTexture mtlximage11_file    ,     int mtlximage11_layer

    ,     float mtlximage11_default

    ,     int mtlximage11_uaddressmode

    ,     int mtlximage11_vaddressmode

    ,     int mtlximage11_filtertype

    ,     int mtlximage11_framerange

    ,     int mtlximage11_frameoffset

    ,     int mtlximage11_frameendaction

    ,     vec2 mtlximage11_uv_scale

    ,     vec2 mtlximage11_uv_offset

, MetalTexture mtlximage8_file    ,     int mtlximage8_layer

    ,     float mtlximage8_default

    ,     int mtlximage8_uaddressmode

    ,     int mtlximage8_vaddressmode

    ,     int mtlximage8_filtertype

    ,     int mtlximage8_framerange

    ,     int mtlximage8_frameoffset

    ,     int mtlximage8_frameendaction

    ,     vec2 mtlximage8_uv_scale

    ,     vec2 mtlximage8_uv_offset

, MetalTexture mtlximage9_file    ,     int mtlximage9_layer

    ,     vec3 mtlximage9_default

    ,     int mtlximage9_uaddressmode

    ,     int mtlximage9_vaddressmode

    ,     int mtlximage9_filtertype

    ,     int mtlximage9_framerange

    ,     int mtlximage9_frameoffset

    ,     int mtlximage9_frameendaction

    ,     vec2 mtlximage9_uv_scale

    ,     vec2 mtlximage9_uv_offset

    ,     int mtlxnormalmap11_space

    ,     float mtlxnormalmap11_scale

    ,     float King_W_base

    ,     float King_W_diffuse_roughness

    ,     float King_W_specular

    ,     vec3 King_W_specular_color

    ,     float King_W_specular_IOR

    ,     float King_W_specular_anisotropy

    ,     float King_W_specular_rotation

    ,     float King_W_transmission

    ,     vec3 King_W_transmission_color

    ,     float King_W_transmission_depth

    ,     vec3 King_W_transmission_scatter

    ,     float King_W_transmission_scatter_anisotropy

    ,     float King_W_transmission_dispersion

    ,     float King_W_transmission_extra_roughness

    ,     float King_W_subsurface_scale

    ,     float King_W_subsurface_anisotropy

    ,     float King_W_sheen

    ,     vec3 King_W_sheen_color

    ,     float King_W_sheen_roughness

    ,     float King_W_coat

    ,     vec3 King_W_coat_color

    ,     float King_W_coat_roughness

    ,     float King_W_coat_anisotropy

    ,     float King_W_coat_rotation

    ,     float King_W_coat_IOR

    ,     float King_W_coat_affect_color

    ,     float King_W_coat_affect_roughness

    ,     float King_W_thin_film_thickness

    ,     float King_W_thin_film_IOR

    ,     float King_W_emission

    ,     vec3 King_W_emission_color

    ,     vec3 King_W_opacity

    ,     bool King_W_thin_walled

    ,     mat4 u_envMatrix

, MetalTexture u_envRadiance    ,     float u_envLightIntensity

    ,     int u_envRadianceMips

    ,     int u_envRadianceSamples

, MetalTexture u_envIrradiance    ,     bool u_refractionTwoSided

    ,     vec3 u_viewPosition

    ,     int u_numActiveLightSources

    ) : 
gl_FragCoord(    vd.pos)
,    vd(vd)
,     u_lightData
    {
        u_lightData[0]
,         u_lightData[1]
,         u_lightData[2]
    }
    ,     displacementshader1(displacementshader1)

    ,     geomprop_UV0_index(geomprop_UV0_index)

,     mtlximage7_file(mtlximage7_file)
    ,     mtlximage7_layer(mtlximage7_layer)

    ,     mtlximage7_default(mtlximage7_default)

    ,     mtlximage7_uaddressmode(mtlximage7_uaddressmode)

    ,     mtlximage7_vaddressmode(mtlximage7_vaddressmode)

    ,     mtlximage7_filtertype(mtlximage7_filtertype)

    ,     mtlximage7_framerange(mtlximage7_framerange)

    ,     mtlximage7_frameoffset(mtlximage7_frameoffset)

    ,     mtlximage7_frameendaction(mtlximage7_frameendaction)

    ,     mtlximage7_uv_scale(mtlximage7_uv_scale)

    ,     mtlximage7_uv_offset(mtlximage7_uv_offset)

,     mtlximage10_file(mtlximage10_file)
    ,     mtlximage10_layer(mtlximage10_layer)

    ,     mtlximage10_default(mtlximage10_default)

    ,     mtlximage10_uaddressmode(mtlximage10_uaddressmode)

    ,     mtlximage10_vaddressmode(mtlximage10_vaddressmode)

    ,     mtlximage10_filtertype(mtlximage10_filtertype)

    ,     mtlximage10_framerange(mtlximage10_framerange)

    ,     mtlximage10_frameoffset(mtlximage10_frameoffset)

    ,     mtlximage10_frameendaction(mtlximage10_frameendaction)

    ,     mtlximage10_uv_scale(mtlximage10_uv_scale)

    ,     mtlximage10_uv_offset(mtlximage10_uv_offset)

,     mtlximage11_file(mtlximage11_file)
    ,     mtlximage11_layer(mtlximage11_layer)

    ,     mtlximage11_default(mtlximage11_default)

    ,     mtlximage11_uaddressmode(mtlximage11_uaddressmode)

    ,     mtlximage11_vaddressmode(mtlximage11_vaddressmode)

    ,     mtlximage11_filtertype(mtlximage11_filtertype)

    ,     mtlximage11_framerange(mtlximage11_framerange)

    ,     mtlximage11_frameoffset(mtlximage11_frameoffset)

    ,     mtlximage11_frameendaction(mtlximage11_frameendaction)

    ,     mtlximage11_uv_scale(mtlximage11_uv_scale)

    ,     mtlximage11_uv_offset(mtlximage11_uv_offset)

,     mtlximage8_file(mtlximage8_file)
    ,     mtlximage8_layer(mtlximage8_layer)

    ,     mtlximage8_default(mtlximage8_default)

    ,     mtlximage8_uaddressmode(mtlximage8_uaddressmode)

    ,     mtlximage8_vaddressmode(mtlximage8_vaddressmode)

    ,     mtlximage8_filtertype(mtlximage8_filtertype)

    ,     mtlximage8_framerange(mtlximage8_framerange)

    ,     mtlximage8_frameoffset(mtlximage8_frameoffset)

    ,     mtlximage8_frameendaction(mtlximage8_frameendaction)

    ,     mtlximage8_uv_scale(mtlximage8_uv_scale)

    ,     mtlximage8_uv_offset(mtlximage8_uv_offset)

,     mtlximage9_file(mtlximage9_file)
    ,     mtlximage9_layer(mtlximage9_layer)

    ,     mtlximage9_default(mtlximage9_default)

    ,     mtlximage9_uaddressmode(mtlximage9_uaddressmode)

    ,     mtlximage9_vaddressmode(mtlximage9_vaddressmode)

    ,     mtlximage9_filtertype(mtlximage9_filtertype)

    ,     mtlximage9_framerange(mtlximage9_framerange)

    ,     mtlximage9_frameoffset(mtlximage9_frameoffset)

    ,     mtlximage9_frameendaction(mtlximage9_frameendaction)

    ,     mtlximage9_uv_scale(mtlximage9_uv_scale)

    ,     mtlximage9_uv_offset(mtlximage9_uv_offset)

    ,     mtlxnormalmap11_space(mtlxnormalmap11_space)

    ,     mtlxnormalmap11_scale(mtlxnormalmap11_scale)

    ,     King_W_base(King_W_base)

    ,     King_W_diffuse_roughness(King_W_diffuse_roughness)

    ,     King_W_specular(King_W_specular)

    ,     King_W_specular_color(King_W_specular_color)

    ,     King_W_specular_IOR(King_W_specular_IOR)

    ,     King_W_specular_anisotropy(King_W_specular_anisotropy)

    ,     King_W_specular_rotation(King_W_specular_rotation)

    ,     King_W_transmission(King_W_transmission)

    ,     King_W_transmission_color(King_W_transmission_color)

    ,     King_W_transmission_depth(King_W_transmission_depth)

    ,     King_W_transmission_scatter(King_W_transmission_scatter)

    ,     King_W_transmission_scatter_anisotropy(King_W_transmission_scatter_anisotropy)

    ,     King_W_transmission_dispersion(King_W_transmission_dispersion)

    ,     King_W_transmission_extra_roughness(King_W_transmission_extra_roughness)

    ,     King_W_subsurface_scale(King_W_subsurface_scale)

    ,     King_W_subsurface_anisotropy(King_W_subsurface_anisotropy)

    ,     King_W_sheen(King_W_sheen)

    ,     King_W_sheen_color(King_W_sheen_color)

    ,     King_W_sheen_roughness(King_W_sheen_roughness)

    ,     King_W_coat(King_W_coat)

    ,     King_W_coat_color(King_W_coat_color)

    ,     King_W_coat_roughness(King_W_coat_roughness)

    ,     King_W_coat_anisotropy(King_W_coat_anisotropy)

    ,     King_W_coat_rotation(King_W_coat_rotation)

    ,     King_W_coat_IOR(King_W_coat_IOR)

    ,     King_W_coat_affect_color(King_W_coat_affect_color)

    ,     King_W_coat_affect_roughness(King_W_coat_affect_roughness)

    ,     King_W_thin_film_thickness(King_W_thin_film_thickness)

    ,     King_W_thin_film_IOR(King_W_thin_film_IOR)

    ,     King_W_emission(King_W_emission)

    ,     King_W_emission_color(King_W_emission_color)

    ,     King_W_opacity(King_W_opacity)

    ,     King_W_thin_walled(King_W_thin_walled)

    ,     u_envMatrix(u_envMatrix)

,     u_envRadiance(u_envRadiance)
    ,     u_envLightIntensity(u_envLightIntensity)

    ,     u_envRadianceMips(u_envRadianceMips)

    ,     u_envRadianceSamples(u_envRadianceSamples)

,     u_envIrradiance(u_envIrradiance)
    ,     u_refractionTwoSided(u_refractionTwoSided)

    ,     u_viewPosition(u_viewPosition)

    ,     u_numActiveLightSources(u_numActiveLightSources)

    {}
    #define __DECL_GL_MATH_FUNCTIONS__
    #define M_FLOAT_EPS 1e-8
    
    float mx_square(float x)
    {
        return x*x;
    }
    
    vec2 mx_square(vec2 x)
    {
        return x*x;
    }
    
    vec3 mx_square(vec3 x)
    {
        return x*x;
    }
    
    #ifdef __DECL_GL_MATH_FUNCTIONS__
    
    float radians(float degree) { return (degree * M_PI_F / 180.0f); }
    
    float3x3 inverse(float3x3 m)
    {
        float n11 = m[0][0], n12 = m[1][0], n13 = m[2][0];
        float n21 = m[0][1], n22 = m[1][1], n23 = m[2][1];
        float n31 = m[0][2], n32 = m[1][2], n33 = m[2][2];
    
        float det = determinant(m);
        float idet = 1.0f / det;
    
        float3x3 ret;
    
        ret[0][0] = idet * (n22 * n33 - n32 * n23);
        ret[1][0] = idet * (n32 * n13 - n12 * n33);
        ret[2][0] = idet * (n12 * n23 - n22 * n13);
        
        ret[0][1] = idet * (n31 * n23 - n21 * n33);
        ret[1][1] = idet * (n11 * n33 - n31 * n13);
        ret[2][1] = idet * (n21 * n13 - n11 * n23);
        
        ret[0][2] = idet * (n21 * n32 - n31 * n22);
        ret[1][2] = idet * (n31 * n12 - n11 * n32);
        ret[2][2] = idet * (n11 * n22 - n21 * n12);
    
        return ret;
    }
    
    float4x4 inverse(float4x4 m)
    {
        float n11 = m[0][0], n12 = m[1][0], n13 = m[2][0], n14 = m[3][0];
        float n21 = m[0][1], n22 = m[1][1], n23 = m[2][1], n24 = m[3][1];
        float n31 = m[0][2], n32 = m[1][2], n33 = m[2][2], n34 = m[3][2];
        float n41 = m[0][3], n42 = m[1][3], n43 = m[2][3], n44 = m[3][3];
    
        float t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
        float t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
        float t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
        float t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
    
        float det = determinant(m);
        float idet = 1.0f / det;
    
        float4x4 ret;
    
        ret[0][0] = t11 * idet;
        ret[0][1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * idet;
        ret[0][2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * idet;
        ret[0][3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * idet;
    
        ret[1][0] = t12 * idet;
        ret[1][1] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * idet;
        ret[1][2] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * idet;
        ret[1][3] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * idet;
    
        ret[2][0] = t13 * idet;
        ret[2][1] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * idet;
        ret[2][2] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * idet;
        ret[2][3] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * idet;
    
        ret[3][0] = t14 * idet;
        ret[3][1] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * idet;
        ret[3][2] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * idet;
        ret[3][3] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * idet;
    
        return ret;
    }
    
    template<class T1, class T2>
    T1 mod(T1 x, T2 y)
    {
        return x - y * floor(x/y);
    }
    
    template <typename T>
    T atan(T y_over_x) { return ::atan(y_over_x); }
    
    template <typename T>
    T atan(T y, T x) { return ::atan2(y, x); }
    
    #define lessThan(a, b) ((a) < (b))
    #define lessThanEqual(a, b) ((a) <= (b))
    #define greaterThan(a, b) ((a) > (b))
    #define greaterThanEqual(a, b) ((a) >= (b))
    #define equal(a, b) ((a) == (b))
    #define notEqual(a, b) ((a) != (b))
    
    #endif

    #define M_PI 3.1415926535897932
    #define M_PI_INV (1.0 / M_PI)
    
    float mx_pow5(float x)
    {
        return mx_square(mx_square(x)) * x;
    }
    
    float mx_pow6(float x)
    {
        float x2 = mx_square(x);
        return mx_square(x2) * x2;
    }
    
    // Standard Schlick Fresnel
    float mx_fresnel_schlick(float cosTheta, float F0)
    {
        float x = clamp(1.0 - cosTheta, 0.0, 1.0);
        float x5 = mx_pow5(x);
        return F0 + (1.0 - F0) * x5;
    }
    vec3 mx_fresnel_schlick(float cosTheta, vec3 F0)
    {
        float x = clamp(1.0 - cosTheta, 0.0, 1.0);
        float x5 = mx_pow5(x);
        return F0 + (1.0 - F0) * x5;
    }
    
    // Generalized Schlick Fresnel
    float mx_fresnel_schlick(float cosTheta, float F0, float F90)
    {
        float x = clamp(1.0 - cosTheta, 0.0, 1.0);
        float x5 = mx_pow5(x);
        return mix(F0, F90, x5);
    }
    vec3 mx_fresnel_schlick(float cosTheta, vec3 F0, vec3 F90)
    {
        float x = clamp(1.0 - cosTheta, 0.0, 1.0);
        float x5 = mx_pow5(x);
        return mix(F0, F90, x5);
    }
    
    // Generalized Schlick Fresnel with a variable exponent
    float mx_fresnel_schlick(float cosTheta, float F0, float F90, float exponent)
    {
        float x = clamp(1.0 - cosTheta, 0.0, 1.0);
        return mix(F0, F90, pow(x, exponent));
    }
    vec3 mx_fresnel_schlick(float cosTheta, vec3 F0, vec3 F90, float exponent)
    {
        float x = clamp(1.0 - cosTheta, 0.0, 1.0);
        return mix(F0, F90, pow(x, exponent));
    }
    
    // Enforce that the given normal is forward-facing from the specified view direction.
    vec3 mx_forward_facing_normal(vec3 N, vec3 V)
    {
        return (dot(N, V) < 0.0) ? -N : N;
    }
    
    // https://www.graphics.rwth-aachen.de/publication/2/jgt.pdf
    float mx_golden_ratio_sequence(int i)
    {
        const float GOLDEN_RATIO = 1.6180339887498948;
        return fract((float(i) + 1.0) * GOLDEN_RATIO);
    }
    
    // https://people.irisa.fr/Ricardo.Marques/articles/2013/SF_CGF.pdf
    vec2 mx_spherical_fibonacci(int i, int numSamples)
    {
        return vec2((float(i) + 0.5) / float(numSamples), mx_golden_ratio_sequence(i));
    }
    
    // Generate a uniform-weighted sample in the unit hemisphere.
    vec3 mx_uniform_sample_hemisphere(vec2 Xi)
    {
        float phi = 2.0 * M_PI * Xi.x;
        float cosTheta = 1.0 - Xi.y;
        float sinTheta = sqrt(1.0 - mx_square(cosTheta));
        return vec3(cos(phi) * sinTheta,
                    sin(phi) * sinTheta,
                    cosTheta);
    }
    
    const int FRESNEL_MODEL_DIELECTRIC = 0;
    const int FRESNEL_MODEL_CONDUCTOR = 1;
    const int FRESNEL_MODEL_SCHLICK = 2;
    
    // Parameters for Fresnel calculations
    struct FresnelData
    {
        // Fresnel model
        int model;
        bool airy;
    
        // Physical Fresnel
        vec3 ior;
        vec3 extinction;
    
        // Generalized Schlick Fresnel
        vec3 F0;
        vec3 F82;
        vec3 F90;
        float exponent;
    
        // Thin film
        float tf_thickness;
        float tf_ior;
    
        // Refraction
        bool refraction;
    };
    
    // https://media.disneyanimation.com/uploads/production/publication_asset/48/asset/s2012_pbs_disney_brdf_notes_v3.pdf
    // Appendix B.2 Equation 13
    float mx_ggx_NDF(vec3 H, vec2 alpha)
    {
        vec2 He = H.xy / alpha;
        float denom = dot(He, He) + mx_square(H.z);
        return 1.0 / (M_PI * alpha.x * alpha.y * mx_square(denom));
    }
    
    // https://ggx-research.github.io/publication/2023/06/09/publication-ggx.html
    vec3 mx_ggx_importance_sample_VNDF(vec2 Xi, vec3 V, vec2 alpha)
    {
        // Transform the view direction to the hemisphere configuration.
        V = normalize(vec3(V.xy * alpha, V.z));
    
        // Sample a spherical cap in (-V.z, 1].
        float phi = 2.0 * M_PI * Xi.x;
        float z = (1.0 - Xi.y) * (1.0 + V.z) - V.z;
        float sinTheta = sqrt(clamp(1.0 - z * z, 0.0, 1.0));
        float x = sinTheta * cos(phi);
        float y = sinTheta * sin(phi);
        vec3 c = vec3(x, y, z);
    
        // Compute the microfacet normal.
        vec3 H = c + V;
    
        // Transform the microfacet normal back to the ellipsoid configuration.
        H = normalize(vec3(H.xy * alpha, max(H.z, 0.0)));
    
        return H;
    }
    
    // https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf
    // Equation 34
    float mx_ggx_smith_G1(float cosTheta, float alpha)
    {
        float cosTheta2 = mx_square(cosTheta);
        float tanTheta2 = (1.0 - cosTheta2) / cosTheta2;
        return 2.0 / (1.0 + sqrt(1.0 + mx_square(alpha) * tanTheta2));
    }
    
    // Height-correlated Smith masking-shadowing
    // http://jcgt.org/published/0003/02/03/paper.pdf
    // Equations 72 and 99
    float mx_ggx_smith_G2(float NdotL, float NdotV, float alpha)
    {
        float alpha2 = mx_square(alpha);
        float lambdaL = sqrt(alpha2 + (1.0 - alpha2) * mx_square(NdotL));
        float lambdaV = sqrt(alpha2 + (1.0 - alpha2) * mx_square(NdotV));
        return 2.0 / (lambdaL / NdotL + lambdaV / NdotV);
    }
    
    // Rational quadratic fit to Monte Carlo data for GGX directional albedo.
    vec3 mx_ggx_dir_albedo_analytic(float NdotV, float alpha, vec3 F0, vec3 F90)
    {
        float x = NdotV;
        float y = alpha;
        float x2 = mx_square(x);
        float y2 = mx_square(y);
        vec4 r = vec4(0.1003, 0.9345, 1.0, 1.0) +
                 vec4(-0.6303, -2.323, -1.765, 0.2281) * x +
                 vec4(9.748, 2.229, 8.263, 15.94) * y +
                 vec4(-2.038, -3.748, 11.53, -55.83) * x * y +
                 vec4(29.34, 1.424, 28.96, 13.08) * x2 +
                 vec4(-8.245, -0.7684, -7.507, 41.26) * y2 +
                 vec4(-26.44, 1.436, -36.11, 54.9) * x2 * y +
                 vec4(19.99, 0.2913, 15.86, 300.2) * x * y2 +
                 vec4(-5.448, 0.6286, 33.37, -285.1) * x2 * y2;
        vec2 AB = clamp(r.xy / r.zw, 0.0, 1.0);
        return F0 * AB.x + F90 * AB.y;
    }
    
    vec3 mx_ggx_dir_albedo_table_lookup(float NdotV, float alpha, vec3 F0, vec3 F90)
    {
    #if DIRECTIONAL_ALBEDO_METHOD == 1
        if (textureSize(u_albedoTable, 0).x > 1)
        {
            vec2 AB = texture(u_albedoTable, vec2(NdotV, alpha)).rg;
            return F0 * AB.x + F90 * AB.y;
        }
    #endif
        return vec3(0.0);
    }
    
    // https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
    vec3 mx_ggx_dir_albedo_monte_carlo(float NdotV, float alpha, vec3 F0, vec3 F90)
    {
        NdotV = clamp(NdotV, M_FLOAT_EPS, 1.0);
        vec3 V = vec3(sqrt(1.0 - mx_square(NdotV)), 0, NdotV);
    
        vec2 AB = vec2(0.0);
        const int SAMPLE_COUNT = 64;
        for (int i = 0; i < SAMPLE_COUNT; i++)
        {
            vec2 Xi = mx_spherical_fibonacci(i, SAMPLE_COUNT);
    
            // Compute the half vector and incoming light direction.
            vec3 H = mx_ggx_importance_sample_VNDF(Xi, V, vec2(alpha));
            vec3 L = -reflect(V, H);
            
            // Compute dot products for this sample.
            float NdotL = clamp(L.z, M_FLOAT_EPS, 1.0);
            float VdotH = clamp(dot(V, H), M_FLOAT_EPS, 1.0);
    
            // Compute the Fresnel term.
            float Fc = mx_fresnel_schlick(VdotH, 0.0, 1.0);
    
            // Compute the per-sample geometric term.
            // https://hal.inria.fr/hal-00996995v2/document, Algorithm 2
            float G2 = mx_ggx_smith_G2(NdotL, NdotV, alpha);
            
            // Add the contribution of this sample.
            AB += vec2(G2 * (1.0 - Fc), G2 * Fc);
        }
    
        // Apply the global component of the geometric term and normalize.
        AB /= mx_ggx_smith_G1(NdotV, alpha) * float(SAMPLE_COUNT);
    
        // Return the final directional albedo.
        return F0 * AB.x + F90 * AB.y;
    }
    
    vec3 mx_ggx_dir_albedo(float NdotV, float alpha, vec3 F0, vec3 F90)
    {
    #if DIRECTIONAL_ALBEDO_METHOD == 0
        return mx_ggx_dir_albedo_analytic(NdotV, alpha, F0, F90);
    #elif DIRECTIONAL_ALBEDO_METHOD == 1
        return mx_ggx_dir_albedo_table_lookup(NdotV, alpha, F0, F90);
    #else
        return mx_ggx_dir_albedo_monte_carlo(NdotV, alpha, F0, F90);
    #endif
    }
    
    float mx_ggx_dir_albedo(float NdotV, float alpha, float F0, float F90)
    {
        return mx_ggx_dir_albedo(NdotV, alpha, vec3(F0), vec3(F90)).x;
    }
    
    // https://blog.selfshadow.com/publications/turquin/ms_comp_final.pdf
    // Equations 14 and 16
    vec3 mx_ggx_energy_compensation(float NdotV, float alpha, vec3 Fss)
    {
        float Ess = mx_ggx_dir_albedo(NdotV, alpha, 1.0, 1.0);
        return 1.0 + Fss * (1.0 - Ess) / Ess;
    }
    
    float mx_ggx_energy_compensation(float NdotV, float alpha, float Fss)
    {
        return mx_ggx_energy_compensation(NdotV, alpha, vec3(Fss)).x;
    }
    
    // Compute the average of an anisotropic alpha pair.
    float mx_average_alpha(vec2 alpha)
    {
        return sqrt(alpha.x * alpha.y);
    }
    
    // Convert a real-valued index of refraction to normal-incidence reflectivity.
    float mx_ior_to_f0(float ior)
    {
        return mx_square((ior - 1.0) / (ior + 1.0));
    }
    
    // Convert normal-incidence reflectivity to real-valued index of refraction.
    float mx_f0_to_ior(float F0)
    {
        float sqrtF0 = sqrt(clamp(F0, 0.01, 0.99));
        return (1.0 + sqrtF0) / (1.0 - sqrtF0);
    }
    vec3 mx_f0_to_ior(vec3 F0)
    {
        vec3 sqrtF0 = sqrt(clamp(F0, 0.01, 0.99));
        return (vec3(1.0) + sqrtF0) / (vec3(1.0) - sqrtF0);
    }
    
    // https://renderwonk.com/publications/wp-generalization-adobe/gen-adobe.pdf
    vec3 mx_fresnel_hoffman_schlick(float cosTheta, FresnelData fd)
    {
        const float COS_THETA_MAX = 1.0 / 7.0;
        const float COS_THETA_FACTOR = 1.0 / (COS_THETA_MAX * pow(1.0 - COS_THETA_MAX, 6.0));
    
        float x = clamp(cosTheta, 0.0, 1.0);
        vec3 a = mix(fd.F0, fd.F90, pow(1.0 - COS_THETA_MAX, fd.exponent)) * (vec3(1.0) - fd.F82) * COS_THETA_FACTOR;
        return mix(fd.F0, fd.F90, pow(1.0 - x, fd.exponent)) - a * x * mx_pow6(1.0 - x);
    }
    
    // https://seblagarde.wordpress.com/2013/04/29/memo-on-fresnel-equations/
    float mx_fresnel_dielectric(float cosTheta, float ior)
    {
        float c = cosTheta;
        float g2 = ior*ior + c*c - 1.0;
        if (g2 < 0.0)
        {
            // Total internal reflection
            return 1.0;
        }
    
        float g = sqrt(g2);
        return 0.5 * mx_square((g - c) / (g + c)) *
                    (1.0 + mx_square(((g + c) * c - 1.0) / ((g - c) * c + 1.0)));
    }
    
    // https://seblagarde.wordpress.com/2013/04/29/memo-on-fresnel-equations/
    vec2 mx_fresnel_dielectric_polarized(float cosTheta, float ior)
    {
        float cosTheta2 = mx_square(clamp(cosTheta, 0.0, 1.0));
        float sinTheta2 = 1.0 - cosTheta2;
    
        float t0 = max(ior * ior - sinTheta2, 0.0);
        float t1 = t0 + cosTheta2;
        float t2 = 2.0 * sqrt(t0) * cosTheta;
        float Rs = (t1 - t2) / (t1 + t2);
    
        float t3 = cosTheta2 * t0 + sinTheta2 * sinTheta2;
        float t4 = t2 * sinTheta2;
        float Rp = Rs * (t3 - t4) / (t3 + t4);
    
        return vec2(Rp, Rs);
    }
    
    // https://seblagarde.wordpress.com/2013/04/29/memo-on-fresnel-equations/
    void mx_fresnel_conductor_polarized(float cosTheta, vec3 n, vec3 k, thread vec3& Rp, thread vec3& Rs)
    {
        float cosTheta2 = mx_square(clamp(cosTheta, 0.0, 1.0));
        float sinTheta2 = 1.0 - cosTheta2;
        vec3 n2 = n * n;
        vec3 k2 = k * k;
    
        vec3 t0 = n2 - k2 - vec3(sinTheta2);
        vec3 a2plusb2 = sqrt(t0 * t0 + 4.0 * n2 * k2);
        vec3 t1 = a2plusb2 + vec3(cosTheta2);
        vec3 a = sqrt(max(0.5 * (a2plusb2 + t0), 0.0));
        vec3 t2 = 2.0 * a * cosTheta;
        Rs = (t1 - t2) / (t1 + t2);
    
        vec3 t3 = cosTheta2 * a2plusb2 + vec3(sinTheta2 * sinTheta2);
        vec3 t4 = t2 * sinTheta2;
        Rp = Rs * (t3 - t4) / (t3 + t4);
    }
    
    vec3 mx_fresnel_conductor(float cosTheta, vec3 n, vec3 k)
    {
        vec3 Rp, Rs;
        mx_fresnel_conductor_polarized(cosTheta, n, k, Rp, Rs);
        return 0.5 * (Rp  + Rs);
    }
    
    // https://belcour.github.io/blog/research/publication/2017/05/01/brdf-thin-film.html
    void mx_fresnel_conductor_phase_polarized(float cosTheta, float eta1, vec3 eta2, vec3 kappa2, thread vec3& phiP, thread vec3& phiS)
    {
        vec3 k2 = kappa2 / eta2;
        vec3 sinThetaSqr = vec3(1.0) - cosTheta * cosTheta;
        vec3 A = eta2*eta2*(vec3(1.0)-k2*k2) - eta1*eta1*sinThetaSqr;
        vec3 B = sqrt(A*A + mx_square(2.0*eta2*eta2*k2));
        vec3 U = sqrt((A+B)/2.0);
        vec3 V = max(vec3(0.0), sqrt((B-A)/2.0));
    
        phiS = atan(2.0*eta1*V*cosTheta, U*U + V*V - mx_square(eta1*cosTheta));
        phiP = atan(2.0*eta1*eta2*eta2*cosTheta * (2.0*k2*U - (vec3(1.0)-k2*k2) * V),
                    mx_square(eta2*eta2*(vec3(1.0)+k2*k2)*cosTheta) - eta1*eta1*(U*U+V*V));
    }
    
    // https://belcour.github.io/blog/research/publication/2017/05/01/brdf-thin-film.html
    vec3 mx_eval_sensitivity(float opd, vec3 shift)
    {
        // Use Gaussian fits, given by 3 parameters: val, pos and var
        float phase = 2.0*M_PI * opd;
        vec3 val = vec3(5.4856e-13, 4.4201e-13, 5.2481e-13);
        vec3 pos = vec3(1.6810e+06, 1.7953e+06, 2.2084e+06);
        vec3 var = vec3(4.3278e+09, 9.3046e+09, 6.6121e+09);
        vec3 xyz = val * sqrt(2.0*M_PI * var) * cos(pos * phase + shift) * exp(- var * phase*phase);
        xyz.x   += 9.7470e-14 * sqrt(2.0*M_PI * 4.5282e+09) * cos(2.2399e+06 * phase + shift[0]) * exp(- 4.5282e+09 * phase*phase);
        return xyz / 1.0685e-7;
    }
    
    // A Practical Extension to Microfacet Theory for the Modeling of Varying Iridescence
    // https://belcour.github.io/blog/research/publication/2017/05/01/brdf-thin-film.html
    vec3 mx_fresnel_airy(float cosTheta, FresnelData fd)
    {
        // XYZ to CIE 1931 RGB color space (using neutral E illuminant)
        const mat3 XYZ_TO_RGB = mat3(2.3706743, -0.5138850, 0.0052982, -0.9000405, 1.4253036, -0.0146949, -0.4706338, 0.0885814, 1.0093968);
    
        // Assume vacuum on the outside
        float eta1 = 1.0;
        float eta2 = max(fd.tf_ior, eta1);
        vec3 eta3 = (fd.model == FRESNEL_MODEL_SCHLICK) ? mx_f0_to_ior(fd.F0) : fd.ior;
        vec3 kappa3 = (fd.model == FRESNEL_MODEL_SCHLICK) ? vec3(0.0) : fd.extinction;
        float cosThetaT = sqrt(1.0 - (1.0 - mx_square(cosTheta)) * mx_square(eta1 / eta2));
    
        // First interface
        vec2 R12 = mx_fresnel_dielectric_polarized(cosTheta, eta2 / eta1);
        if (cosThetaT <= 0.0)
        {
            // Total internal reflection
            R12 = vec2(1.0);
        }
        vec2 T121 = vec2(1.0) - R12;
    
        // Second interface
        vec3 R23p, R23s;
        if (fd.model == FRESNEL_MODEL_SCHLICK)
        {
            vec3 f = mx_fresnel_hoffman_schlick(cosThetaT, fd);
            R23p = 0.5 * f;
            R23s = 0.5 * f;
        }
        else
        {
            mx_fresnel_conductor_polarized(cosThetaT, eta3 / eta2, kappa3 / eta2, R23p, R23s);
        }
    
        // Phase shift
        float cosB = cos(atan(eta2 / eta1));
        vec2 phi21 = vec2(cosTheta < cosB ? 0.0 : M_PI, M_PI);
        vec3 phi23p, phi23s;
        if (fd.model == FRESNEL_MODEL_SCHLICK)
        {
            phi23p = vec3((eta3[0] < eta2) ? M_PI : 0.0,
                          (eta3[1] < eta2) ? M_PI : 0.0,
                          (eta3[2] < eta2) ? M_PI : 0.0);
            phi23s = phi23p;
        }
        else
        {
            mx_fresnel_conductor_phase_polarized(cosThetaT, eta2, eta3, kappa3, phi23p, phi23s);
        }
        vec3 r123p = max(sqrt(R12.x*R23p), 0.0);
        vec3 r123s = max(sqrt(R12.y*R23s), 0.0);
    
        // Iridescence term
        vec3 I = vec3(0.0);
        vec3 Cm, Sm;
    
        // Optical path difference
        float distMeters = fd.tf_thickness * 1.0e-9;
        float opd = 2.0 * eta2 * cosThetaT * distMeters;
    
        // Iridescence term using spectral antialiasing for Parallel polarization
    
        // Reflectance term for m=0 (DC term amplitude)
        vec3 Rs = (mx_square(T121.x) * R23p) / (vec3(1.0) - R12.x*R23p);
        I += R12.x + Rs;
    
        // Reflectance term for m>0 (pairs of diracs)
        Cm = Rs - T121.x;
        for (int m=1; m<=2; m++)
        {
            Cm *= r123p;
            Sm  = 2.0 * mx_eval_sensitivity(float(m) * opd, float(m)*(phi23p+vec3(phi21.x)));
            I  += Cm*Sm;
        }
    
        // Iridescence term using spectral antialiasing for Perpendicular polarization
    
        // Reflectance term for m=0 (DC term amplitude)
        vec3 Rp = (mx_square(T121.y) * R23s) / (vec3(1.0) - R12.y*R23s);
        I += R12.y + Rp;
    
        // Reflectance term for m>0 (pairs of diracs)
        Cm = Rp - T121.y;
        for (int m=1; m<=2; m++)
        {
            Cm *= r123s;
            Sm  = 2.0 * mx_eval_sensitivity(float(m) * opd, float(m)*(phi23s+vec3(phi21.y)));
            I  += Cm*Sm;
        }
    
        // Average parallel and perpendicular polarization
        I *= 0.5;
    
        // Convert back to RGB reflectance
        I = clamp(XYZ_TO_RGB * I, 0.0, 1.0);
    
        return I;
    }
    
    FresnelData mx_init_fresnel_dielectric(float ior, float tf_thickness, float tf_ior)
    {
        FresnelData fd;
        fd.model = FRESNEL_MODEL_DIELECTRIC;
        fd.airy = tf_thickness > 0.0;
        fd.ior = vec3(ior);
        fd.extinction = vec3(0.0);
        fd.F0 = vec3(0.0);
        fd.F82 = vec3(0.0);
        fd.F90 = vec3(0.0);
        fd.exponent = 0.0;
        fd.tf_thickness = tf_thickness;
        fd.tf_ior = tf_ior;
        fd.refraction = false;
        return fd;
    }
    
    FresnelData mx_init_fresnel_conductor(vec3 ior, vec3 extinction, float tf_thickness, float tf_ior)
    {
        FresnelData fd;
        fd.model = FRESNEL_MODEL_CONDUCTOR;
        fd.airy = tf_thickness > 0.0;
        fd.ior = ior;
        fd.extinction = extinction;
        fd.F0 = vec3(0.0);
        fd.F82 = vec3(0.0);
        fd.F90 = vec3(0.0);
        fd.exponent = 0.0;
        fd.tf_thickness = tf_thickness;
        fd.tf_ior = tf_ior;
        fd.refraction = false;
        return fd;
    }
    
    FresnelData mx_init_fresnel_schlick(vec3 F0, vec3 F82, vec3 F90, float exponent, float tf_thickness, float tf_ior)
    {
        FresnelData fd;
        fd.model = FRESNEL_MODEL_SCHLICK;
        fd.airy = tf_thickness > 0.0;
        fd.ior = vec3(0.0);
        fd.extinction = vec3(0.0);
        fd.F0 = F0;
        fd.F82 = F82;
        fd.F90 = F90;
        fd.exponent = exponent;
        fd.tf_thickness = tf_thickness;
        fd.tf_ior = tf_ior;
        fd.refraction = false;
        return fd;
    }
    
    vec3 mx_compute_fresnel(float cosTheta, FresnelData fd)
    {
        if (fd.airy)
        {
             return mx_fresnel_airy(cosTheta, fd);
        }
        else if (fd.model == FRESNEL_MODEL_DIELECTRIC)
        {
            return vec3(mx_fresnel_dielectric(cosTheta, fd.ior.x));
        }
        else if (fd.model == FRESNEL_MODEL_CONDUCTOR)
        {
            return mx_fresnel_conductor(cosTheta, fd.ior, fd.extinction);
        }
        else
        {
            return mx_fresnel_hoffman_schlick(cosTheta, fd);
        }
    }
    
    // Compute the refraction of a ray through a solid sphere.
    vec3 mx_refraction_solid_sphere(vec3 R, vec3 N, float ior)
    {
        R = refract(R, N, 1.0 / ior);
        vec3 N1 = normalize(R * dot(R, N) - N * 0.5);
        return refract(R, N1, ior);
    }
    
    vec2 mx_latlong_projection(vec3 dir)
    {
        float latitude = -asin(dir.y) * M_PI_INV + 0.5;
        float longitude = atan(dir.x, -dir.z) * M_PI_INV * 0.5 + 0.5;
        return vec2(longitude, latitude);
    }
    
    vec3 mx_latlong_map_lookup(vec3 dir, mat4 transform, float lod, MetalTexture envSampler)
    {
        vec3 envDir = normalize((transform * vec4(dir,0.0)).xyz);
        vec2 uv = mx_latlong_projection(envDir);
        return textureLod(envSampler, uv, lod).rgb;
    }
    
    // Return the mip level with the appropriate coverage for a filtered importance sample.
    // https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch20.html
    // Section 20.4 Equation 13
    float mx_latlong_compute_lod(vec3 dir, float pdf, float maxMipLevel, int envSamples)
    {
        const float MIP_LEVEL_OFFSET = 1.5;
        float effectiveMaxMipLevel = maxMipLevel - MIP_LEVEL_OFFSET;
        float distortion = sqrt(1.0 - mx_square(dir.y));
        return max(effectiveMaxMipLevel - 0.5 * log2(float(envSamples) * pdf * distortion), 0.0);
    }
    
    vec3 mx_environment_radiance(vec3 N, vec3 V, vec3 X, vec2 alpha, int distribution, FresnelData fd)
    {
        // Generate tangent frame.
        X = normalize(X - dot(X, N) * N);
        vec3 Y = cross(N, X);
        mat3 tangentToWorld = mat3(X, Y, N);
    
        // Transform the view vector to tangent space.
        V = vec3(dot(V, X), dot(V, Y), dot(V, N));
    
        // Compute derived properties.
        float NdotV = clamp(V.z, M_FLOAT_EPS, 1.0);
        float avgAlpha = mx_average_alpha(alpha);
        float G1V = mx_ggx_smith_G1(NdotV, avgAlpha);
        
        // Integrate outgoing radiance using filtered importance sampling.
        // http://cgg.mff.cuni.cz/~jaroslav/papers/2008-egsr-fis/2008-egsr-fis-final-embedded.pdf
        vec3 radiance = vec3(0.0);
        int envRadianceSamples = u_envRadianceSamples;
        for (int i = 0; i < envRadianceSamples; i++)
        {
            vec2 Xi = mx_spherical_fibonacci(i, envRadianceSamples);
    
            // Compute the half vector and incoming light direction.
            vec3 H = mx_ggx_importance_sample_VNDF(Xi, V, alpha);
            vec3 L = fd.refraction ? mx_refraction_solid_sphere(-V, H, fd.ior.x) : -reflect(V, H);
            
            // Compute dot products for this sample.
            float NdotL = clamp(L.z, M_FLOAT_EPS, 1.0);
            float VdotH = clamp(dot(V, H), M_FLOAT_EPS, 1.0);
    
            // Sample the environment light from the given direction.
            vec3 Lw = tangentToWorld * L;
            float pdf = mx_ggx_NDF(H, alpha) * G1V / (4.0 * NdotV);
            float lod = mx_latlong_compute_lod(Lw, pdf, float(u_envRadianceMips - 1), envRadianceSamples);
            vec3 sampleColor = mx_latlong_map_lookup(Lw, u_envMatrix, lod, u_envRadiance);
    
            // Compute the Fresnel term.
            vec3 F = mx_compute_fresnel(VdotH, fd);
    
            // Compute the geometric term.
            float G = mx_ggx_smith_G2(NdotL, NdotV, avgAlpha);
    
            // Compute the combined FG term, which is inverted for refraction.
            vec3 FG = fd.refraction ? vec3(1.0) - (F * G) : F * G;
    
            // Add the radiance contribution of this sample.
            // From https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
            //   incidentLight = sampleColor * NdotL
            //   microfacetSpecular = D * F * G / (4 * NdotL * NdotV)
            //   pdf = D * G1V / (4 * NdotV);
            //   radiance = incidentLight * microfacetSpecular / pdf
            radiance += sampleColor * FG;
        }
    
        // Apply the global component of the geometric term and normalize.
        radiance /= G1V * float(envRadianceSamples);
    
        // Return the final radiance.
        return radiance * u_envLightIntensity;
    }
    
    vec3 mx_environment_irradiance(vec3 N)
    {
        vec3 Li = mx_latlong_map_lookup(N, u_envMatrix, 0.0, u_envIrradiance);
        return Li * u_envLightIntensity;
    }

    
    vec3 mx_surface_transmission(vec3 N, vec3 V, vec3 X, vec2 alpha, int distribution, FresnelData fd, vec3 tint)
    {
        // Approximate the appearance of surface transmission as glossy
        // environment map refraction, ignoring any scene geometry that might
        // be visible through the surface.
        fd.refraction = true;
        if (u_refractionTwoSided)
        {
            tint = mx_square(tint);
        }
        return mx_environment_radiance(N, V, X, alpha, distribution, fd) * tint;
    }

    vec4 gl_FragCoord;
    VertexData vd;

    LightData u_lightData[MAX_LIGHT_SOURCES];
    
    displacementshader displacementshader1;

    
    int geomprop_UV0_index;


MetalTexture mtlximage7_file;    
    int mtlximage7_layer;

    
    vec3 mtlximage7_default;

    
    int mtlximage7_uaddressmode;

    
    int mtlximage7_vaddressmode;

    
    int mtlximage7_filtertype;

    
    int mtlximage7_framerange;

    
    int mtlximage7_frameoffset;

    
    int mtlximage7_frameendaction;

    
    vec2 mtlximage7_uv_scale;

    
    vec2 mtlximage7_uv_offset;


MetalTexture mtlximage10_file;    
    int mtlximage10_layer;

    
    float mtlximage10_default;

    
    int mtlximage10_uaddressmode;

    
    int mtlximage10_vaddressmode;

    
    int mtlximage10_filtertype;

    
    int mtlximage10_framerange;

    
    int mtlximage10_frameoffset;

    
    int mtlximage10_frameendaction;

    
    vec2 mtlximage10_uv_scale;

    
    vec2 mtlximage10_uv_offset;


MetalTexture mtlximage11_file;    
    int mtlximage11_layer;

    
    float mtlximage11_default;

    
    int mtlximage11_uaddressmode;

    
    int mtlximage11_vaddressmode;

    
    int mtlximage11_filtertype;

    
    int mtlximage11_framerange;

    
    int mtlximage11_frameoffset;

    
    int mtlximage11_frameendaction;

    
    vec2 mtlximage11_uv_scale;

    
    vec2 mtlximage11_uv_offset;


MetalTexture mtlximage8_file;    
    int mtlximage8_layer;

    
    float mtlximage8_default;

    
    int mtlximage8_uaddressmode;

    
    int mtlximage8_vaddressmode;

    
    int mtlximage8_filtertype;

    
    int mtlximage8_framerange;

    
    int mtlximage8_frameoffset;

    
    int mtlximage8_frameendaction;

    
    vec2 mtlximage8_uv_scale;

    
    vec2 mtlximage8_uv_offset;


MetalTexture mtlximage9_file;    
    int mtlximage9_layer;

    
    vec3 mtlximage9_default;

    
    int mtlximage9_uaddressmode;

    
    int mtlximage9_vaddressmode;

    
    int mtlximage9_filtertype;

    
    int mtlximage9_framerange;

    
    int mtlximage9_frameoffset;

    
    int mtlximage9_frameendaction;

    
    vec2 mtlximage9_uv_scale;

    
    vec2 mtlximage9_uv_offset;

    
    int mtlxnormalmap11_space;

    
    float mtlxnormalmap11_scale;

    
    float King_W_base;

    
    float King_W_diffuse_roughness;

    
    float King_W_specular;

    
    vec3 King_W_specular_color;

    
    float King_W_specular_IOR;

    
    float King_W_specular_anisotropy;

    
    float King_W_specular_rotation;

    
    float King_W_transmission;

    
    vec3 King_W_transmission_color;

    
    float King_W_transmission_depth;

    
    vec3 King_W_transmission_scatter;

    
    float King_W_transmission_scatter_anisotropy;

    
    float King_W_transmission_dispersion;

    
    float King_W_transmission_extra_roughness;

    
    float King_W_subsurface_scale;

    
    float King_W_subsurface_anisotropy;

    
    float King_W_sheen;

    
    vec3 King_W_sheen_color;

    
    float King_W_sheen_roughness;

    
    float King_W_coat;

    
    vec3 King_W_coat_color;

    
    float King_W_coat_roughness;

    
    float King_W_coat_anisotropy;

    
    float King_W_coat_rotation;

    
    float King_W_coat_IOR;

    
    float King_W_coat_affect_color;

    
    float King_W_coat_affect_roughness;

    
    float King_W_thin_film_thickness;

    
    float King_W_thin_film_IOR;

    
    float King_W_emission;

    
    vec3 King_W_emission_color;

    
    vec3 King_W_opacity;

    
    bool King_W_thin_walled;

    
    mat4 u_envMatrix;


MetalTexture u_envRadiance;    
    float u_envLightIntensity;

    
    int u_envRadianceMips;

    
    int u_envRadianceSamples;


MetalTexture u_envIrradiance;    
    bool u_refractionTwoSided;

    
    vec3 u_viewPosition;

    
    int u_numActiveLightSources;

    vec4 out1;
    int numActiveLightSources()
    {
        return min(u_numActiveLightSources, MAX_LIGHT_SOURCES) ;
    }

    void sampleLightSource(LightData light, float3 position, thread lightshader& result)
    {
        result.intensity = float3(0.0);
        result.direction = float3(0.0);
    }

    vec2 mx_transform_uv(vec2 uv, vec2 uv_scale, vec2 uv_offset)
    {
        uv = uv * uv_scale + uv_offset;
        return uv;
    }
    
    void mx_image_color3(MetalTexture tex_sampler, int layer, vec3 defaultval, vec2 texcoord, int uaddressmode, int vaddressmode, int filtertype, int framerange, int frameoffset, int frameendaction, vec2 uv_scale, vec2 uv_offset, thread vec3& result)
    {
        vec2 uv = mx_transform_uv(texcoord, uv_scale, uv_offset);
        result = texture(tex_sampler, uv).rgb;
    }

    
    void mx_image_float(MetalTexture tex_sampler, int layer, float defaultval, vec2 texcoord, int uaddressmode, int vaddressmode, int filtertype, int framerange, int frameoffset, int frameendaction, vec2 uv_scale, vec2 uv_offset, thread float& result)
    {
        vec2 uv = mx_transform_uv(texcoord, uv_scale, uv_offset);
        result = texture(tex_sampler, uv).r;
    }

    
    void mx_image_vector3(MetalTexture tex_sampler, int layer, vec3 defaultval, vec2 texcoord, int uaddressmode, int vaddressmode, int filtertype, int framerange, int frameoffset, int frameendaction, vec2 uv_scale, vec2 uv_offset, thread vec3& result)
    {
        vec2 uv = mx_transform_uv(texcoord, uv_scale, uv_offset);
        result = texture(tex_sampler, uv).rgb;
    }

    void NG_srgb_texture_to_lin_rec709_color3(vec3 in1, thread vec3& out1)
    {
        const float bias_in2_tmp = 0.055000;
        vec3 bias_out = in1 + bias_in2_tmp;
        const float linSeg_in2_tmp = 12.920000;
        vec3 linSeg_out = in1 / linSeg_in2_tmp;
        const int swizzle_index_tmp = 0;
        float swizzle_out = in1[swizzle_index_tmp];
        const int swizzle2_index_tmp = 1;
        float swizzle2_out = in1[swizzle2_index_tmp];
        const int swizzle3_index_tmp = 2;
        float swizzle3_out = in1[swizzle3_index_tmp];
        const float max_in2_tmp = 0.000000;
        vec3 max_out = max(bias_out, max_in2_tmp);
        const float isAboveR_value2_tmp = 0.040450;
        const float isAboveR_in1_tmp = 1.000000;
        const float isAboveR_in2_tmp = 0.000000;
        float isAboveR_out = (swizzle_out > isAboveR_value2_tmp) ? isAboveR_in1_tmp : isAboveR_in2_tmp;
        const float isAboveG_value2_tmp = 0.040450;
        const float isAboveG_in1_tmp = 1.000000;
        const float isAboveG_in2_tmp = 0.000000;
        float isAboveG_out = (swizzle2_out > isAboveG_value2_tmp) ? isAboveG_in1_tmp : isAboveG_in2_tmp;
        const float isAboveB_value2_tmp = 0.040450;
        const float isAboveB_in1_tmp = 1.000000;
        const float isAboveB_in2_tmp = 0.000000;
        float isAboveB_out = (swizzle3_out > isAboveB_value2_tmp) ? isAboveB_in1_tmp : isAboveB_in2_tmp;
        const float scale_in2_tmp = 1.055000;
        vec3 scale_out = max_out / scale_in2_tmp;
        vec3 isAbove_out = vec3(isAboveR_out, isAboveG_out, isAboveB_out);
        const float powSeg_in2_tmp = 2.400000;
        vec3 powSeg_out = pow(scale_out, vec3(powSeg_in2_tmp));
        vec3 mix_out = mix(linSeg_out, powSeg_out, isAbove_out);
        out1 = mix_out;
    }

    void mx_normalmap_vector2(vec3 value, int map_space, vec2 normal_scale, vec3 N, vec3 T,  thread vec3& result)
    {
        // Decode the normal map.
        value = all(value == vec3(0.0f)) ? vec3(0.0, 0.0, 1.0) : value * 2.0 - 1.0;
    
        // Transform from tangent space if needed.
        if (map_space == 0)
        {
            vec3 B = normalize(cross(N, T));
            value.xy *= normal_scale;
            value = T * value.x + B * value.y + N * value.z;
        }
    
        // Normalize the result.
        result = normalize(value);
    }
    
    void mx_normalmap_float(vec3 value, int map_space, float normal_scale, vec3 N, vec3 T,  thread vec3& result)
    {
        mx_normalmap_vector2(value, map_space, vec2(normal_scale), N, T, result);
    }

    void mx_roughness_anisotropy(float roughness, float anisotropy, thread vec2& result)
    {
        float roughness_sqr = clamp(roughness*roughness, M_FLOAT_EPS, 1.0);
        if (anisotropy > 0.0)
        {
            float aspect = sqrt(1.0 - clamp(anisotropy, 0.0, 0.98));
            result.x = min(roughness_sqr / aspect, 1.0);
            result.y = roughness_sqr * aspect;
        }
        else
        {
            result.x = roughness_sqr;
            result.y = roughness_sqr;
        }
    }

    
    // http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
    // Equation 2
    float mx_imageworks_sheen_NDF(float NdotH, float roughness)
    {
        float invRoughness = 1.0 / max(roughness, 0.005);
        float cos2 = NdotH * NdotH;
        float sin2 = 1.0 - cos2;
        return (2.0 + invRoughness) * pow(sin2, invRoughness * 0.5) / (2.0 * M_PI);
    }
    
    float mx_imageworks_sheen_brdf(float NdotL, float NdotV, float NdotH, float roughness)
    {
        // Microfacet distribution.
        float D = mx_imageworks_sheen_NDF(NdotH, roughness);
    
        // Fresnel and geometry terms are ignored.
        float F = 1.0;
        float G = 1.0;
    
        // We use a smoother denominator, as in:
        // https://blog.selfshadow.com/publications/s2013-shading-course/rad/s2013_pbs_rad_notes.pdf
        return D * F * G / (4.0 * (NdotL + NdotV - NdotL*NdotV));
    }
    
    // Rational quadratic fit to Monte Carlo data for Imageworks sheen directional albedo.
    float mx_imageworks_sheen_dir_albedo_analytic(float NdotV, float roughness)
    {
        vec2 r = vec2(13.67300, 1.0) +
                 vec2(-68.78018, 61.57746) * NdotV +
                 vec2(799.08825, 442.78211) * roughness +
                 vec2(-905.00061, 2597.49308) * NdotV * roughness +
                 vec2(60.28956, 121.81241) * mx_square(NdotV) +
                 vec2(1086.96473, 3045.55075) * mx_square(roughness);
        return r.x / r.y;
    }
    
    float mx_imageworks_sheen_dir_albedo_table_lookup(float NdotV, float roughness)
    {
    #if DIRECTIONAL_ALBEDO_METHOD == 1
        if (textureSize(u_albedoTable, 0).x > 1)
        {
            return texture(u_albedoTable, vec2(NdotV, roughness)).b;
        }
    #endif
        return 0.0;
    }
    
    float mx_imageworks_sheen_dir_albedo_monte_carlo(float NdotV, float roughness)
    {
        NdotV = clamp(NdotV, M_FLOAT_EPS, 1.0);
        vec3 V = vec3(sqrt(1.0f - mx_square(NdotV)), 0, NdotV);
    
        float radiance = 0.0;
        const int SAMPLE_COUNT = 64;
        for (int i = 0; i < SAMPLE_COUNT; i++)
        {
            vec2 Xi = mx_spherical_fibonacci(i, SAMPLE_COUNT);
    
            // Compute the incoming light direction and half vector.
            vec3 L = mx_uniform_sample_hemisphere(Xi);
            vec3 H = normalize(L + V);
            
            // Compute dot products for this sample.
            float NdotL = clamp(L.z, M_FLOAT_EPS, 1.0);
            float NdotH = clamp(H.z, M_FLOAT_EPS, 1.0);
    
            // Compute sheen reflectance.
            float reflectance = mx_imageworks_sheen_brdf(NdotL, NdotV, NdotH, roughness);
    
            // Add the radiance contribution of this sample.
            //   uniform_pdf = 1 / (2 * PI)
            //   radiance = reflectance * NdotL / uniform_pdf;
            radiance += reflectance * NdotL * 2.0 * M_PI;
        }
    
        // Return the final directional albedo.
        return radiance / float(SAMPLE_COUNT);
    }
    
    float mx_imageworks_sheen_dir_albedo(float NdotV, float roughness)
    {
    #if DIRECTIONAL_ALBEDO_METHOD == 0
        float dirAlbedo = mx_imageworks_sheen_dir_albedo_analytic(NdotV, roughness);
    #elif DIRECTIONAL_ALBEDO_METHOD == 1
        float dirAlbedo = mx_imageworks_sheen_dir_albedo_table_lookup(NdotV, roughness);
    #else
        float dirAlbedo = mx_imageworks_sheen_dir_albedo_monte_carlo(NdotV, roughness);
    #endif
        return clamp(dirAlbedo, 0.0, 1.0);
    }
    
    void mx_sheen_bsdf_reflection(vec3 L, vec3 V, vec3 P, float occlusion, float weight, vec3 color, float roughness, vec3 N, thread BSDF& bsdf)
    {
        if (weight < M_FLOAT_EPS)
        {
            return;
        }
    
        N = mx_forward_facing_normal(N, V);
    
        vec3 H = normalize(L + V);
    
        float NdotL = clamp(dot(N, L), M_FLOAT_EPS, 1.0);
        float NdotV = clamp(dot(N, V), M_FLOAT_EPS, 1.0);
        float NdotH = clamp(dot(N, H), M_FLOAT_EPS, 1.0);
    
        vec3 fr = color * mx_imageworks_sheen_brdf(NdotL, NdotV, NdotH, roughness);
        float dirAlbedo = mx_imageworks_sheen_dir_albedo(NdotV, roughness);
        bsdf.throughput = vec3(1.0 - dirAlbedo * weight);
    
        // We need to include NdotL from the light integral here
        // as in this case it's not cancelled thread by& the BRDF denominator.
        bsdf.response = fr * NdotL * occlusion * weight;
    }
    
    void mx_sheen_bsdf_indirect(vec3 V, float weight, vec3 color, float roughness, vec3 N, thread BSDF& bsdf)
    {
        if (weight < M_FLOAT_EPS)
        {
            return;
        }
    
        N = mx_forward_facing_normal(N, V);
    
        float NdotV = clamp(dot(N, V), M_FLOAT_EPS, 1.0);
    
        float dirAlbedo = mx_imageworks_sheen_dir_albedo(NdotV, roughness);
        bsdf.throughput = vec3(1.0 - dirAlbedo * weight);
    
        vec3 Li = mx_environment_irradiance(N);
        bsdf.response = Li * color * dirAlbedo * weight;
    }

    void mx_luminance_color3(vec3 _in, vec3 lumacoeffs, thread vec3& result)
    {
        result = vec3(dot(_in, lumacoeffs));
    }

    mat4 mx_rotationMatrix(vec3 axis, float angle)
    {
        axis = normalize(axis);
        float s = sin(angle);
        float c = cos(angle);
        float oc = 1.0 - c;
    
        return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                    0.0,                                0.0,                                0.0,                                1.0);
    }
    
    void mx_rotate_vector3(vec3 _in, float amount, vec3 axis, thread vec3& result)
    {
        float rotationRadians = radians(amount);
        mat4 m = mx_rotationMatrix(axis, rotationRadians);
        result = (m * vec4(_in, 1.0)).xyz;
    }

    void mx_artistic_ior(vec3 reflectivity, vec3 edge_color, thread vec3& ior, thread vec3& extinction)
    {
        // "Artist Friendly Metallic Fresnel", Ole Gulbrandsen, 2014
        // http://jcgt.org/published/0003/04/03/paper.pdf
    
        vec3 r = clamp(reflectivity, 0.0, 0.99);
        vec3 r_sqrt = sqrt(r);
        vec3 n_min = (1.0 - r) / (1.0 + r);
        vec3 n_max = (1.0 + r_sqrt) / (1.0 - r_sqrt);
        ior = mix(n_max, n_min, edge_color);
    
        vec3 np1 = ior + 1.0;
        vec3 nm1 = ior - 1.0;
        vec3 k2 = (np1*np1 * r - nm1*nm1) / (1.0 - r);
        k2 = max(k2, 0.0);
        extinction = sqrt(k2);
    }

    void mx_uniform_edf(vec3 N, vec3 L, vec3 color, thread EDF& result)
    {
        result = color;
    }

    
    void mx_dielectric_bsdf_reflection(vec3 L, vec3 V, vec3 P, float occlusion, float weight, vec3 tint, float ior, vec2 roughness, float thinfilm_thickness, float thinfilm_ior, vec3 N, vec3 X, int distribution, int scatter_mode, thread BSDF& bsdf)
    {
        if (weight < M_FLOAT_EPS)
        {
            return;
        }
    
        N = mx_forward_facing_normal(N, V);
    
        X = normalize(X - dot(X, N) * N);
        vec3 Y = cross(N, X);
        vec3 H = normalize(L + V);
    
        float NdotL = clamp(dot(N, L), M_FLOAT_EPS, 1.0);
        float NdotV = clamp(dot(N, V), M_FLOAT_EPS, 1.0);
        float VdotH = clamp(dot(V, H), M_FLOAT_EPS, 1.0);
    
        vec2 safeAlpha = clamp(roughness, M_FLOAT_EPS, 1.0);
        float avgAlpha = mx_average_alpha(safeAlpha);
        vec3 Ht = vec3(dot(H, X), dot(H, Y), dot(H, N));
    
        vec3 safeTint = max(tint, 0.0);
        FresnelData fd = mx_init_fresnel_dielectric(ior, thinfilm_thickness, thinfilm_ior);
        vec3  F = mx_compute_fresnel(VdotH, fd);
        float D = mx_ggx_NDF(Ht, safeAlpha);
        float G = mx_ggx_smith_G2(NdotL, NdotV, avgAlpha);
    
        float F0 = mx_ior_to_f0(ior);
        vec3 comp = mx_ggx_energy_compensation(NdotV, avgAlpha, F);
        vec3 dirAlbedo = mx_ggx_dir_albedo(NdotV, avgAlpha, F0, 1.0) * comp;
        bsdf.throughput = 1.0 - dirAlbedo * weight;
    
        // Note: NdotL is cancelled out
        bsdf.response = D * F * G * comp * safeTint * occlusion * weight / (4.0 * NdotV);
    }
    
    void mx_dielectric_bsdf_transmission(vec3 V, float weight, vec3 tint, float ior, vec2 roughness, float thinfilm_thickness, float thinfilm_ior, vec3 N, vec3 X, int distribution, int scatter_mode, thread BSDF& bsdf)
    {
        if (weight < M_FLOAT_EPS)
        {
            return;
        }
    
        N = mx_forward_facing_normal(N, V);
        float NdotV = clamp(dot(N, V), M_FLOAT_EPS, 1.0);
    
        vec3 safeTint = max(tint, 0.0);
        FresnelData fd = mx_init_fresnel_dielectric(ior, thinfilm_thickness, thinfilm_ior);
        vec3 F = mx_compute_fresnel(NdotV, fd);
    
        vec2 safeAlpha = clamp(roughness, M_FLOAT_EPS, 1.0);
        float avgAlpha = mx_average_alpha(safeAlpha);
    
        float F0 = mx_ior_to_f0(ior);
        vec3 comp = mx_ggx_energy_compensation(NdotV, avgAlpha, F);
        vec3 dirAlbedo = mx_ggx_dir_albedo(NdotV, avgAlpha, F0, 1.0) * comp;
        bsdf.throughput = 1.0 - dirAlbedo * weight;
    
        if (scatter_mode != 0)
        {
            bsdf.response = mx_surface_transmission(N, V, X, safeAlpha, distribution, fd, safeTint) * weight;
        }
    }
    
    void mx_dielectric_bsdf_indirect(vec3 V, float weight, vec3 tint, float ior, vec2 roughness, float thinfilm_thickness, float thinfilm_ior, vec3 N, vec3 X, int distribution, int scatter_mode, thread BSDF& bsdf)
    {
        if (weight < M_FLOAT_EPS)
        {
            return;
        }
    
        N = mx_forward_facing_normal(N, V);
    
        float NdotV = clamp(dot(N, V), M_FLOAT_EPS, 1.0);
    
        vec3 safeTint = max(tint, 0.0);
        FresnelData fd = mx_init_fresnel_dielectric(ior, thinfilm_thickness, thinfilm_ior);
        vec3 F = mx_compute_fresnel(NdotV, fd);
    
        vec2 safeAlpha = clamp(roughness, M_FLOAT_EPS, 1.0);
        float avgAlpha = mx_average_alpha(safeAlpha);
    
        float F0 = mx_ior_to_f0(ior);
        vec3 comp = mx_ggx_energy_compensation(NdotV, avgAlpha, F);
        vec3 dirAlbedo = mx_ggx_dir_albedo(NdotV, avgAlpha, F0, 1.0) * comp;
        bsdf.throughput = 1.0 - dirAlbedo * weight;
    
        vec3 Li = mx_environment_radiance(N, V, X, safeAlpha, distribution, fd);
        bsdf.response = Li * safeTint * comp * weight;
    }

    
    void mx_conductor_bsdf_reflection(vec3 L, vec3 V, vec3 P, float occlusion, float weight, vec3 ior_n, vec3 ior_k, vec2 roughness, float thinfilm_thickness, float thinfilm_ior, vec3 N, vec3 X, int distribution, thread BSDF& bsdf)
    {
        bsdf.throughput = vec3(0.0);
    
        if (weight < M_FLOAT_EPS)
        {
            return;
        }
    
        N = mx_forward_facing_normal(N, V);
    
        X = normalize(X - dot(X, N) * N);
        vec3 Y = cross(N, X);
        vec3 H = normalize(L + V);
    
        float NdotL = clamp(dot(N, L), M_FLOAT_EPS, 1.0);
        float NdotV = clamp(dot(N, V), M_FLOAT_EPS, 1.0);
        float VdotH = clamp(dot(V, H), M_FLOAT_EPS, 1.0);
    
        vec2 safeAlpha = clamp(roughness, M_FLOAT_EPS, 1.0);
        float avgAlpha = mx_average_alpha(safeAlpha);
        vec3 Ht = vec3(dot(H, X), dot(H, Y), dot(H, N));
    
        FresnelData fd = mx_init_fresnel_conductor(ior_n, ior_k, thinfilm_thickness, thinfilm_ior);
        vec3 F = mx_compute_fresnel(VdotH, fd);
        float D = mx_ggx_NDF(Ht, safeAlpha);
        float G = mx_ggx_smith_G2(NdotL, NdotV, avgAlpha);
    
        vec3 comp = mx_ggx_energy_compensation(NdotV, avgAlpha, F);
    
        // Note: NdotL is cancelled out
        bsdf.response = D * F * G * comp * occlusion * weight / (4.0 * NdotV);
    }
    
    void mx_conductor_bsdf_indirect(vec3 V, float weight, vec3 ior_n, vec3 ior_k, vec2 roughness, float thinfilm_thickness, float thinfilm_ior, vec3 N, vec3 X, int distribution, thread BSDF& bsdf)
    {
        bsdf.throughput = vec3(0.0);
    
        if (weight < M_FLOAT_EPS)
        {
            return;
        }
    
        N = mx_forward_facing_normal(N, V);
    
        float NdotV = clamp(dot(N, V), M_FLOAT_EPS, 1.0);
    
        FresnelData fd = mx_init_fresnel_conductor(ior_n, ior_k, thinfilm_thickness, thinfilm_ior);
        vec3 F = mx_compute_fresnel(NdotV, fd);
    
        vec2 safeAlpha = clamp(roughness, M_FLOAT_EPS, 1.0);
        float avgAlpha = mx_average_alpha(safeAlpha);
        vec3 comp = mx_ggx_energy_compensation(NdotV, avgAlpha, F);
    
        vec3 Li = mx_environment_radiance(N, V, X, safeAlpha, distribution, fd);
    
        bsdf.response = Li * comp * weight;
    }

    // We fake diffuse transmission by using diffuse reflection from the opposite side.
    // So this BTDF is really a BRDF.
    void mx_translucent_bsdf_reflection(vec3 L, vec3 V, vec3 P, float occlusion, float weight, vec3 color, vec3 normal, thread BSDF& bsdf)
    {
        bsdf.throughput = vec3(0.0);
    
        // Invert normal since we're transmitting light from the other side
        float NdotL = dot(L, -normal);
        if (NdotL <= 0.0 || weight < M_FLOAT_EPS)
        {
            return;
        }
    
        bsdf.response = color * weight * NdotL * M_PI_INV;
    }
    
    void mx_translucent_bsdf_indirect(vec3 V, float weight, vec3 color, vec3 normal, thread BSDF& bsdf)
    {
        bsdf.throughput = vec3(0.0);
    
        if (weight < M_FLOAT_EPS)
        {
            return;
        }
    
        // Invert normal since we're transmitting light from the other side
        vec3 Li = mx_environment_irradiance(-normal);
        bsdf.response = Li * color * weight;
    }

    
    // Based on the implementation of Oren-Nayar diffuse in Open Shading Language.
    // https://github.com/AcademySoftwareFoundation/OpenShadingLanguage/blob/main/src/testrender/shading.cpp
    float mx_oren_nayar_diffuse(float NdotV, float NdotL, float LdotV, float roughness)
    {
        float s = LdotV - NdotL * NdotV;
        float stinv = (s > 0.0f) ? s / max(NdotL, NdotV) : 0.0;
    
        float sigma2 = mx_square(roughness);
        float A = 1.0 - 0.5 * (sigma2 / (sigma2 + 0.33));
        float B = 0.45 * sigma2 / (sigma2 + 0.09);
    
        return A + B * stinv;
    }
    
    // Rational quadratic fit to Monte Carlo data for Oren-Nayar directional albedo.
    float mx_oren_nayar_diffuse_dir_albedo_analytic(float NdotV, float roughness)
    {
        vec2 r = vec2(1.0, 1.0) +
                 vec2(-0.4297, -0.6076) * roughness +
                 vec2(-0.7632, -0.4993) * NdotV * roughness +
                 vec2(1.4385, 2.0315) * mx_square(roughness);
        return r.x / r.y;
    }
    
    float mx_oren_nayar_diffuse_dir_albedo_table_lookup(float NdotV, float roughness)
    {
    #if DIRECTIONAL_ALBEDO_METHOD == 1
        if (textureSize(u_albedoTable, 0).x > 1)
        {
            return texture(u_albedoTable, vec2(NdotV, roughness)).b;
        }
    #endif
        return 0.0;
    }
    
    float mx_oren_nayar_diffuse_dir_albedo_monte_carlo(float NdotV, float roughness)
    {
        NdotV = clamp(NdotV, M_FLOAT_EPS, 1.0);
        vec3 V = vec3(sqrt(1.0f - mx_square(NdotV)), 0, NdotV);
    
        float radiance = 0.0;
        const int SAMPLE_COUNT = 64;
        for (int i = 0; i < SAMPLE_COUNT; i++)
        {
            vec2 Xi = mx_spherical_fibonacci(i, SAMPLE_COUNT);
    
            // Compute the incoming light direction.
            vec3 L = mx_uniform_sample_hemisphere(Xi);
            
            // Compute dot products for this sample.
            float NdotL = clamp(L.z, M_FLOAT_EPS, 1.0);
            float LdotV = clamp(dot(L, V), M_FLOAT_EPS, 1.0);
    
            // Compute diffuse reflectance.
            float reflectance = mx_oren_nayar_diffuse(NdotV, NdotL, LdotV, roughness);
    
            // Add the radiance contribution of this sample.
            //   uniform_pdf = 1 / (2 * PI)
            //   radiance = (reflectance * NdotL) / (uniform_pdf * PI);
            radiance += reflectance * NdotL;
        }
    
        // Apply global components and normalize.
        radiance *= 2.0 / float(SAMPLE_COUNT);
    
        // Return the final directional albedo.
        return radiance;
    }
    
    float mx_oren_nayar_diffuse_dir_albedo(float NdotV, float roughness)
    {
    #if DIRECTIONAL_ALBEDO_METHOD == 2
        float dirAlbedo = mx_oren_nayar_diffuse_dir_albedo_monte_carlo(NdotV, roughness);
    #else
        float dirAlbedo = mx_oren_nayar_diffuse_dir_albedo_analytic(NdotV, roughness);
    #endif
        return clamp(dirAlbedo, 0.0, 1.0);
    }
    
    // https://media.disneyanimation.com/uploads/production/publication_asset/48/asset/s2012_pbs_disney_brdf_notes_v3.pdf
    // Section 5.3
    float mx_burley_diffuse(float NdotV, float NdotL, float LdotH, float roughness)
    {
        float F90 = 0.5 + (2.0 * roughness * mx_square(LdotH));
        float refL = mx_fresnel_schlick(NdotL, 1.0, F90);
        float refV = mx_fresnel_schlick(NdotV, 1.0, F90);
        return refL * refV;
    }
    
    // Compute the directional albedo component of Burley diffuse for the given
    // view angle and roughness.  Curve fit provided by Stephen Hill.
    float mx_burley_diffuse_dir_albedo(float NdotV, float roughness)
    {
        float x = NdotV;
        float fit0 = 0.97619 - 0.488095 * mx_pow5(1.0 - x);
        float fit1 = 1.55754 + (-2.02221 + (2.56283 - 1.06244 * x) * x) * x;
        return mix(fit0, fit1, roughness);
    }
    
    // Evaluate the Burley diffusion profile for the given distance and diffusion shape.
    // Based on https://graphics.pixar.com/library/ApproxBSSRDF/
    vec3 mx_burley_diffusion_profile(float dist, vec3 shape)
    {
        vec3 num1 = exp(-shape * dist);
        vec3 num2 = exp(-shape * dist / 3.0);
        float denom = max(dist, M_FLOAT_EPS);
        return (num1 + num2) / denom;
    }
    
    // Integrate the Burley diffusion profile over a sphere of the given radius.
    // Inspired by Eric Penner's presentation in http://advances.realtimerendering.com/s2011/
    vec3 mx_integrate_burley_diffusion(vec3 N, vec3 L, float radius, vec3 mfp)
    {
        float theta = acos(dot(N, L));
    
        // Estimate the Burley diffusion shape from mean free path.
        vec3 shape = vec3(1.0) / max(mfp, 0.1);
    
        // Integrate the profile over the sphere.
        vec3 sumD = vec3(0.0);
        vec3 sumR = vec3(0.0);
        const int SAMPLE_COUNT = 32;
        const float SAMPLE_WIDTH = (2.0 * M_PI) / float(SAMPLE_COUNT);
        for (int i = 0; i < SAMPLE_COUNT; i++)
        {
            float x = -M_PI + (float(i) + 0.5) * SAMPLE_WIDTH;
            float dist = radius * abs(2.0 * sin(x * 0.5));
            vec3 R = mx_burley_diffusion_profile(dist, shape);
            sumD += R * max(cos(theta + x), 0.0);
            sumR += R;
        }
    
        return sumD / sumR;
    }
    
    vec3 mx_subsurface_scattering_approx(vec3 N, vec3 L, vec3 P, vec3 albedo, vec3 mfp)
    {
        float curvature = length(fwidth(N)) / length(fwidth(P));
        float radius = 1.0 / max(curvature, 0.01);
        return albedo * mx_integrate_burley_diffusion(N, L, radius, mfp) / vec3(M_PI);
    }
    
    void mx_subsurface_bsdf_reflection(vec3 L, vec3 V, vec3 P, float occlusion, float weight, vec3 color, vec3 radius, float anisotropy, vec3 normal, thread BSDF& bsdf)
    {
        bsdf.throughput = vec3(0.0);
    
        if (weight < M_FLOAT_EPS)
        {
            return;
        }
    
        normal = mx_forward_facing_normal(normal, V);
    
        vec3 sss = mx_subsurface_scattering_approx(normal, L, P, color, radius);
        float NdotL = clamp(dot(normal, L), M_FLOAT_EPS, 1.0);
        float visibleOcclusion = 1.0 - NdotL * (1.0 - occlusion);
        bsdf.response = sss * visibleOcclusion * weight;
    }
    
    void mx_subsurface_bsdf_indirect(vec3 V, float weight, vec3 color, vec3 radius, float anisotropy, vec3 normal, thread BSDF& bsdf)
    {
        bsdf.throughput = vec3(0.0);
    
        if (weight < M_FLOAT_EPS)
        {
            return;
        }
    
        normal = mx_forward_facing_normal(normal, V);
    
        // For now, we render indirect subsurface as simple indirect diffuse.
        vec3 Li = mx_environment_irradiance(normal);
        bsdf.response = Li * color * weight;
    }

    
    void mx_oren_nayar_diffuse_bsdf_reflection(vec3 L, vec3 V, vec3 P, float occlusion, float weight, vec3 color, float roughness, vec3 normal, thread BSDF& bsdf)
    {
        bsdf.throughput = vec3(0.0);
    
        if (weight < M_FLOAT_EPS)
        {
            return;
        }
    
        normal = mx_forward_facing_normal(normal, V);
    
        float NdotV = clamp(dot(normal, V), M_FLOAT_EPS, 1.0);
        float NdotL = clamp(dot(normal, L), M_FLOAT_EPS, 1.0);
        float LdotV = clamp(dot(L, V), M_FLOAT_EPS, 1.0);
    
        bsdf.response = color * occlusion * weight * NdotL * M_PI_INV;
        if (roughness > 0.0)
        {
            bsdf.response *= mx_oren_nayar_diffuse(NdotV, NdotL, LdotV, roughness);
        }
    }
    
    void mx_oren_nayar_diffuse_bsdf_indirect(vec3 V, float weight, vec3 color, float roughness, vec3 normal, thread BSDF& bsdf)
    {
        bsdf.throughput = vec3(0.0);
    
        if (weight < M_FLOAT_EPS)
        {
            return;
        }
    
        normal = mx_forward_facing_normal(normal, V);
    
        float NdotV = clamp(dot(normal, V), M_FLOAT_EPS, 1.0);
    
        vec3 Li = mx_environment_irradiance(normal) *
                  mx_oren_nayar_diffuse_dir_albedo(NdotV, roughness);
        bsdf.response = Li * color * weight;
    }

    
    void mx_generalized_schlick_edf(vec3 N, vec3 V, vec3 color0, vec3 color90, float exponent, EDF base, thread EDF& result)
    {
        N = mx_forward_facing_normal(N, V);
        float NdotV = clamp(dot(N, V), M_FLOAT_EPS, 1.0);
        vec3 f = mx_fresnel_schlick(NdotV, color0, color90, exponent);
        result = base * f;
    }

    void NG_standard_surface_surfaceshader_100(float base, vec3 base_color, float diffuse_roughness, float metalness, float specular, vec3 specular_color, float specular_roughness, float specular_IOR, float specular_anisotropy, float specular_rotation, float transmission, vec3 transmission_color, float transmission_depth, vec3 transmission_scatter, float transmission_scatter_anisotropy, float transmission_dispersion, float transmission_extra_roughness, float subsurface, vec3 subsurface_color, vec3 subsurface_radius, float subsurface_scale, float subsurface_anisotropy, float sheen, vec3 sheen_color, float sheen_roughness, float coat, vec3 coat_color, float coat_roughness, float coat_anisotropy, float coat_rotation, float coat_IOR, vec3 coat_normal, float coat_affect_color, float coat_affect_roughness, float thin_film_thickness, float thin_film_IOR, float emission, vec3 emission_color, vec3 opacity, bool thin_walled, vec3 normal, vec3 tangent, thread surfaceshader& out1)
    {
        vec2 coat_roughness_vector_out = vec2(0.0);
        mx_roughness_anisotropy(coat_roughness, coat_anisotropy, coat_roughness_vector_out);
        const float coat_tangent_rotate_degree_in2_tmp = 360.000000;
        float coat_tangent_rotate_degree_out = coat_rotation * coat_tangent_rotate_degree_in2_tmp;
        vec3 metal_reflectivity_out = base_color * base;
        vec3 metal_edgecolor_out = specular_color * specular;
        float coat_affect_roughness_multiply1_out = coat_affect_roughness * coat;
        const float tangent_rotate_degree_in2_tmp = 360.000000;
        float tangent_rotate_degree_out = specular_rotation * tangent_rotate_degree_in2_tmp;
        float transmission_roughness_add_out = specular_roughness + transmission_extra_roughness;
        const float subsurface_color_nonnegative_in2_tmp = 0.000000;
        vec3 subsurface_color_nonnegative_out = max(subsurface_color, subsurface_color_nonnegative_in2_tmp);
        const float coat_clamped_low_tmp = 0.000000;
        const float coat_clamped_high_tmp = 1.000000;
        float coat_clamped_out = clamp(coat, coat_clamped_low_tmp, coat_clamped_high_tmp);
        vec3 subsurface_radius_vector_out = vec3(subsurface_radius.x, subsurface_radius.y, subsurface_radius.z);
        float subsurface_selector_out = float(thin_walled);
        const float base_color_nonnegative_in2_tmp = 0.000000;
        vec3 base_color_nonnegative_out = max(base_color, base_color_nonnegative_in2_tmp);
        const vec3 coat_attenuation_bg_tmp = vec3(1.000000, 1.000000, 1.000000);
        vec3 coat_attenuation_out = mix(coat_attenuation_bg_tmp, coat_color, coat);
        const float one_minus_coat_ior_in1_tmp = 1.000000;
        float one_minus_coat_ior_out = one_minus_coat_ior_in1_tmp - coat_IOR;
        const float one_plus_coat_ior_in1_tmp = 1.000000;
        float one_plus_coat_ior_out = one_plus_coat_ior_in1_tmp + coat_IOR;
        vec3 emission_weight_out = emission_color * emission;
        vec3 opacity_luminance_out = vec3(0.0);
        mx_luminance_color3(opacity, vec3(0.272229, 0.674082, 0.053689), opacity_luminance_out);
        vec3 coat_tangent_rotate_out = vec3(0.0);
        mx_rotate_vector3(tangent, coat_tangent_rotate_degree_out, coat_normal, coat_tangent_rotate_out);
        vec3 artistic_ior_ior = vec3(0.0);
        vec3 artistic_ior_extinction = vec3(0.0);
        mx_artistic_ior(metal_reflectivity_out, metal_edgecolor_out, artistic_ior_ior, artistic_ior_extinction);
        float coat_affect_roughness_multiply2_out = coat_affect_roughness_multiply1_out * coat_roughness;
        vec3 tangent_rotate_out = vec3(0.0);
        mx_rotate_vector3(tangent, tangent_rotate_degree_out, normal, tangent_rotate_out);
        const float transmission_roughness_clamped_low_tmp = 0.000000;
        const float transmission_roughness_clamped_high_tmp = 1.000000;
        float transmission_roughness_clamped_out = clamp(transmission_roughness_add_out, transmission_roughness_clamped_low_tmp, transmission_roughness_clamped_high_tmp);
        float coat_gamma_multiply_out = coat_clamped_out * coat_affect_color;
        vec3 subsurface_radius_scaled_out = subsurface_radius_vector_out * subsurface_scale;
        float coat_ior_to_F0_sqrt_out = one_minus_coat_ior_out / one_plus_coat_ior_out;
        const int swizzle2_index_tmp = 0;
        float swizzle2_out = opacity_luminance_out[swizzle2_index_tmp];
        vec3 coat_tangent_rotate_normalize_out = normalize(coat_tangent_rotate_out);
        const float coat_affected_roughness_fg_tmp = 1.000000;
        float coat_affected_roughness_out = mix(specular_roughness, coat_affected_roughness_fg_tmp, coat_affect_roughness_multiply2_out);
        vec3 tangent_rotate_normalize_out = normalize(tangent_rotate_out);
        const float coat_affected_transmission_roughness_fg_tmp = 1.000000;
        float coat_affected_transmission_roughness_out = mix(transmission_roughness_clamped_out, coat_affected_transmission_roughness_fg_tmp, coat_affect_roughness_multiply2_out);
        const float coat_gamma_in2_tmp = 1.000000;
        float coat_gamma_out = coat_gamma_multiply_out + coat_gamma_in2_tmp;
        float coat_ior_to_F0_out = coat_ior_to_F0_sqrt_out * coat_ior_to_F0_sqrt_out;
        const float coat_tangent_value2_tmp = 0.000000;
        vec3 coat_tangent_out = (coat_anisotropy > coat_tangent_value2_tmp) ? coat_tangent_rotate_normalize_out : tangent;
        vec2 main_roughness_out = vec2(0.0);
        mx_roughness_anisotropy(coat_affected_roughness_out, specular_anisotropy, main_roughness_out);
        const float main_tangent_value2_tmp = 0.000000;
        vec3 main_tangent_out = (specular_anisotropy > main_tangent_value2_tmp) ? tangent_rotate_normalize_out : tangent;
        vec2 transmission_roughness_out = vec2(0.0);
        mx_roughness_anisotropy(coat_affected_transmission_roughness_out, specular_anisotropy, transmission_roughness_out);
        vec3 coat_affected_subsurface_color_out = pow(subsurface_color_nonnegative_out, vec3(coat_gamma_out));
        vec3 coat_affected_diffuse_color_out = pow(base_color_nonnegative_out, vec3(coat_gamma_out));
        const float one_minus_coat_ior_to_F0_in1_tmp = 1.000000;
        float one_minus_coat_ior_to_F0_out = one_minus_coat_ior_to_F0_in1_tmp - coat_ior_to_F0_out;
        vec3 swizzle_out = vec3(one_minus_coat_ior_to_F0_out, one_minus_coat_ior_to_F0_out, one_minus_coat_ior_to_F0_out);
        surfaceshader shader_constructor_out = surfaceshader{float3(0.0),float3(0.0)};
        {
            float3 N = normalize(vd.normalWorld);
            float3 V = normalize(u_viewPosition - vd.positionWorld);
            float3 P = vd.positionWorld;

            float surfaceOpacity = swizzle2_out;

            // Shadow occlusion
            float occlusion = 1.0;

            // Light loop
            int numLights = numActiveLightSources();
            lightshader lightShader;
            for (int activeLightIndex = 0; activeLightIndex < numLights; ++activeLightIndex)
            {
                sampleLightSource(u_lightData[activeLightIndex], vd.positionWorld, lightShader);
                float3 L = lightShader.direction;

                // Calculate the BSDF response for this light source
                BSDF coat_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_dielectric_bsdf_reflection(L, V, P, occlusion, coat, vec3(1.000000, 1.000000, 1.000000), coat_IOR, coat_roughness_vector_out, 0.000000, 1.500000, coat_normal, coat_tangent_out, 0, 0, coat_bsdf_out);
                BSDF metal_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_conductor_bsdf_reflection(L, V, P, occlusion, 1.000000, artistic_ior_ior, artistic_ior_extinction, main_roughness_out, thin_film_thickness, thin_film_IOR, normal, main_tangent_out, 0, metal_bsdf_out);
                BSDF specular_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_dielectric_bsdf_reflection(L, V, P, occlusion, specular, specular_color, specular_IOR, main_roughness_out, thin_film_thickness, thin_film_IOR, normal, main_tangent_out, 0, 0, specular_bsdf_out);
                BSDF transmission_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                BSDF sheen_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_sheen_bsdf_reflection(L, V, P, occlusion, sheen, sheen_color, sheen_roughness, normal, sheen_bsdf_out);
                BSDF translucent_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_translucent_bsdf_reflection(L, V, P, occlusion, 1.000000, coat_affected_subsurface_color_out, normal, translucent_bsdf_out);
                BSDF subsurface_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_subsurface_bsdf_reflection(L, V, P, occlusion, 1.000000, coat_affected_subsurface_color_out, subsurface_radius_scaled_out, subsurface_anisotropy, normal, subsurface_bsdf_out);
                BSDF selected_subsurface_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                selected_subsurface_bsdf_out.response = mix(subsurface_bsdf_out.response, translucent_bsdf_out.response, subsurface_selector_out);
                selected_subsurface_bsdf_out.throughput = mix(subsurface_bsdf_out.throughput, translucent_bsdf_out.throughput, subsurface_selector_out);
                BSDF diffuse_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_oren_nayar_diffuse_bsdf_reflection(L, V, P, occlusion, base, coat_affected_diffuse_color_out, diffuse_roughness, normal, diffuse_bsdf_out);
                BSDF subsurface_mix_out = BSDF{float3(0.0),float3(1.0)};
                subsurface_mix_out.response = mix(diffuse_bsdf_out.response, selected_subsurface_bsdf_out.response, subsurface);
                subsurface_mix_out.throughput = mix(diffuse_bsdf_out.throughput, selected_subsurface_bsdf_out.throughput, subsurface);
                BSDF sheen_layer_out = BSDF{float3(0.0),float3(1.0)};
                sheen_layer_out.response = sheen_bsdf_out.response + subsurface_mix_out.response * sheen_bsdf_out.throughput;
                sheen_layer_out.throughput = sheen_bsdf_out.throughput * subsurface_mix_out.throughput;
                BSDF transmission_mix_out = BSDF{float3(0.0),float3(1.0)};
                transmission_mix_out.response = mix(sheen_layer_out.response, transmission_bsdf_out.response, transmission);
                transmission_mix_out.throughput = mix(sheen_layer_out.throughput, transmission_bsdf_out.throughput, transmission);
                BSDF specular_layer_out = BSDF{float3(0.0),float3(1.0)};
                specular_layer_out.response = specular_bsdf_out.response + transmission_mix_out.response * specular_bsdf_out.throughput;
                specular_layer_out.throughput = specular_bsdf_out.throughput * transmission_mix_out.throughput;
                BSDF metalness_mix_out = BSDF{float3(0.0),float3(1.0)};
                metalness_mix_out.response = mix(specular_layer_out.response, metal_bsdf_out.response, metalness);
                metalness_mix_out.throughput = mix(specular_layer_out.throughput, metal_bsdf_out.throughput, metalness);
                vec3 thin_film_layer_attenuated_out_in2_clamped = clamp(coat_attenuation_out, 0.0, 1.0);
                BSDF thin_film_layer_attenuated_out = BSDF{float3(0.0),float3(1.0)};
                thin_film_layer_attenuated_out.response = metalness_mix_out.response * thin_film_layer_attenuated_out_in2_clamped;
                thin_film_layer_attenuated_out.throughput = metalness_mix_out.throughput * thin_film_layer_attenuated_out_in2_clamped;
                BSDF coat_layer_out = BSDF{float3(0.0),float3(1.0)};
                coat_layer_out.response = coat_bsdf_out.response + thin_film_layer_attenuated_out.response * coat_bsdf_out.throughput;
                coat_layer_out.throughput = coat_bsdf_out.throughput * thin_film_layer_attenuated_out.throughput;

                // Accumulate the light's contribution
                shader_constructor_out.color += lightShader.intensity * coat_layer_out.response;
            }

            // Ambient occlusion
            occlusion = 1.0;

            // Add environment contribution
            {
                BSDF coat_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_dielectric_bsdf_indirect(V, coat, vec3(1.000000, 1.000000, 1.000000), coat_IOR, coat_roughness_vector_out, 0.000000, 1.500000, coat_normal, coat_tangent_out, 0, 0, coat_bsdf_out);
                BSDF metal_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_conductor_bsdf_indirect(V, 1.000000, artistic_ior_ior, artistic_ior_extinction, main_roughness_out, thin_film_thickness, thin_film_IOR, normal, main_tangent_out, 0, metal_bsdf_out);
                BSDF specular_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_dielectric_bsdf_indirect(V, specular, specular_color, specular_IOR, main_roughness_out, thin_film_thickness, thin_film_IOR, normal, main_tangent_out, 0, 0, specular_bsdf_out);
                BSDF transmission_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                BSDF sheen_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_sheen_bsdf_indirect(V, sheen, sheen_color, sheen_roughness, normal, sheen_bsdf_out);
                BSDF translucent_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_translucent_bsdf_indirect(V, 1.000000, coat_affected_subsurface_color_out, normal, translucent_bsdf_out);
                BSDF subsurface_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_subsurface_bsdf_indirect(V, 1.000000, coat_affected_subsurface_color_out, subsurface_radius_scaled_out, subsurface_anisotropy, normal, subsurface_bsdf_out);
                BSDF selected_subsurface_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                selected_subsurface_bsdf_out.response = mix(subsurface_bsdf_out.response, translucent_bsdf_out.response, subsurface_selector_out);
                selected_subsurface_bsdf_out.throughput = mix(subsurface_bsdf_out.throughput, translucent_bsdf_out.throughput, subsurface_selector_out);
                BSDF diffuse_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_oren_nayar_diffuse_bsdf_indirect(V, base, coat_affected_diffuse_color_out, diffuse_roughness, normal, diffuse_bsdf_out);
                BSDF subsurface_mix_out = BSDF{float3(0.0),float3(1.0)};
                subsurface_mix_out.response = mix(diffuse_bsdf_out.response, selected_subsurface_bsdf_out.response, subsurface);
                subsurface_mix_out.throughput = mix(diffuse_bsdf_out.throughput, selected_subsurface_bsdf_out.throughput, subsurface);
                BSDF sheen_layer_out = BSDF{float3(0.0),float3(1.0)};
                sheen_layer_out.response = sheen_bsdf_out.response + subsurface_mix_out.response * sheen_bsdf_out.throughput;
                sheen_layer_out.throughput = sheen_bsdf_out.throughput * subsurface_mix_out.throughput;
                BSDF transmission_mix_out = BSDF{float3(0.0),float3(1.0)};
                transmission_mix_out.response = mix(sheen_layer_out.response, transmission_bsdf_out.response, transmission);
                transmission_mix_out.throughput = mix(sheen_layer_out.throughput, transmission_bsdf_out.throughput, transmission);
                BSDF specular_layer_out = BSDF{float3(0.0),float3(1.0)};
                specular_layer_out.response = specular_bsdf_out.response + transmission_mix_out.response * specular_bsdf_out.throughput;
                specular_layer_out.throughput = specular_bsdf_out.throughput * transmission_mix_out.throughput;
                BSDF metalness_mix_out = BSDF{float3(0.0),float3(1.0)};
                metalness_mix_out.response = mix(specular_layer_out.response, metal_bsdf_out.response, metalness);
                metalness_mix_out.throughput = mix(specular_layer_out.throughput, metal_bsdf_out.throughput, metalness);
                vec3 thin_film_layer_attenuated_out_in2_clamped = clamp(coat_attenuation_out, 0.0, 1.0);
                BSDF thin_film_layer_attenuated_out = BSDF{float3(0.0),float3(1.0)};
                thin_film_layer_attenuated_out.response = metalness_mix_out.response * thin_film_layer_attenuated_out_in2_clamped;
                thin_film_layer_attenuated_out.throughput = metalness_mix_out.throughput * thin_film_layer_attenuated_out_in2_clamped;
                BSDF coat_layer_out = BSDF{float3(0.0),float3(1.0)};
                coat_layer_out.response = coat_bsdf_out.response + thin_film_layer_attenuated_out.response * coat_bsdf_out.throughput;
                coat_layer_out.throughput = coat_bsdf_out.throughput * thin_film_layer_attenuated_out.throughput;

                shader_constructor_out.color += occlusion * coat_layer_out.response;
            }

            // Add surface emission
            {
                EDF emission_edf_out = EDF(0.0);
                mx_uniform_edf(N, V, emission_weight_out, emission_edf_out);
                EDF coat_tinted_emission_edf_out = emission_edf_out * coat_color;
                EDF coat_emission_edf_out = EDF(0.0);
                mx_generalized_schlick_edf(N, V, swizzle_out, vec3(0.000000, 0.000000, 0.000000), 5.000000, coat_tinted_emission_edf_out, coat_emission_edf_out);
                // Omitted node 'emission_edf'. Function already called in this scope.
                EDF blended_coat_emission_edf_out = mix(emission_edf_out, coat_emission_edf_out, coat);
                shader_constructor_out.color += blended_coat_emission_edf_out;
            }

            // Calculate the BSDF transmission for viewing direction
            {
                BSDF coat_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_dielectric_bsdf_transmission(V, coat, vec3(1.000000, 1.000000, 1.000000), coat_IOR, coat_roughness_vector_out, 0.000000, 1.500000, coat_normal, coat_tangent_out, 0, 0, coat_bsdf_out);
                BSDF metal_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                BSDF specular_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_dielectric_bsdf_transmission(V, specular, specular_color, specular_IOR, main_roughness_out, thin_film_thickness, thin_film_IOR, normal, main_tangent_out, 0, 0, specular_bsdf_out);
                BSDF transmission_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                mx_dielectric_bsdf_transmission(V, 1.000000, transmission_color, specular_IOR, transmission_roughness_out, thin_film_thickness, thin_film_IOR, normal, main_tangent_out, 0, 1, transmission_bsdf_out);
                BSDF sheen_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                BSDF translucent_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                BSDF subsurface_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                BSDF selected_subsurface_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                selected_subsurface_bsdf_out.response = mix(subsurface_bsdf_out.response, translucent_bsdf_out.response, subsurface_selector_out);
                selected_subsurface_bsdf_out.throughput = mix(subsurface_bsdf_out.throughput, translucent_bsdf_out.throughput, subsurface_selector_out);
                BSDF diffuse_bsdf_out = BSDF{float3(0.0),float3(1.0)};
                BSDF subsurface_mix_out = BSDF{float3(0.0),float3(1.0)};
                subsurface_mix_out.response = mix(diffuse_bsdf_out.response, selected_subsurface_bsdf_out.response, subsurface);
                subsurface_mix_out.throughput = mix(diffuse_bsdf_out.throughput, selected_subsurface_bsdf_out.throughput, subsurface);
                BSDF sheen_layer_out = BSDF{float3(0.0),float3(1.0)};
                sheen_layer_out.response = sheen_bsdf_out.response + subsurface_mix_out.response * sheen_bsdf_out.throughput;
                sheen_layer_out.throughput = sheen_bsdf_out.throughput * subsurface_mix_out.throughput;
                BSDF transmission_mix_out = BSDF{float3(0.0),float3(1.0)};
                transmission_mix_out.response = mix(sheen_layer_out.response, transmission_bsdf_out.response, transmission);
                transmission_mix_out.throughput = mix(sheen_layer_out.throughput, transmission_bsdf_out.throughput, transmission);
                BSDF specular_layer_out = BSDF{float3(0.0),float3(1.0)};
                specular_layer_out.response = specular_bsdf_out.response + transmission_mix_out.response * specular_bsdf_out.throughput;
                specular_layer_out.throughput = specular_bsdf_out.throughput * transmission_mix_out.throughput;
                BSDF metalness_mix_out = BSDF{float3(0.0),float3(1.0)};
                metalness_mix_out.response = mix(specular_layer_out.response, metal_bsdf_out.response, metalness);
                metalness_mix_out.throughput = mix(specular_layer_out.throughput, metal_bsdf_out.throughput, metalness);
                vec3 thin_film_layer_attenuated_out_in2_clamped = clamp(coat_attenuation_out, 0.0, 1.0);
                BSDF thin_film_layer_attenuated_out = BSDF{float3(0.0),float3(1.0)};
                thin_film_layer_attenuated_out.response = metalness_mix_out.response * thin_film_layer_attenuated_out_in2_clamped;
                thin_film_layer_attenuated_out.throughput = metalness_mix_out.throughput * thin_film_layer_attenuated_out_in2_clamped;
                BSDF coat_layer_out = BSDF{float3(0.0),float3(1.0)};
                coat_layer_out.response = coat_bsdf_out.response + thin_film_layer_attenuated_out.response * coat_bsdf_out.throughput;
                coat_layer_out.throughput = coat_bsdf_out.throughput * thin_film_layer_attenuated_out.throughput;
                shader_constructor_out.color += coat_layer_out.response;
            }

            // Compute and apply surface opacity
            {
                shader_constructor_out.color *= surfaceOpacity;
                shader_constructor_out.transparency = mix(float3(1.0), shader_constructor_out.transparency, surfaceOpacity);
            }
        }

        out1 = shader_constructor_out;
    }

    PixelOutputs FragmentMain()
    {
        vec3 geomprop_Nworld_out1 = normalize(vd.normalWorld);
        vec3 geomprop_Tworld_out1 = normalize(vd.tangentWorld);
        vec2 geomprop_UV0_out1 = vd.texcoord_0.xy;
        vec3 mtlximage7_out = vec3(0.0);
        mx_image_color3(mtlximage7_file, mtlximage7_layer, mtlximage7_default, geomprop_UV0_out1, mtlximage7_uaddressmode, mtlximage7_vaddressmode, mtlximage7_filtertype, mtlximage7_framerange, mtlximage7_frameoffset, mtlximage7_frameendaction, mtlximage7_uv_scale, mtlximage7_uv_offset, mtlximage7_out);
        float mtlximage10_out = 0.0;
        mx_image_float(mtlximage10_file, mtlximage10_layer, mtlximage10_default, geomprop_UV0_out1, mtlximage10_uaddressmode, mtlximage10_vaddressmode, mtlximage10_filtertype, mtlximage10_framerange, mtlximage10_frameoffset, mtlximage10_frameendaction, mtlximage10_uv_scale, mtlximage10_uv_offset, mtlximage10_out);
        float mtlximage11_out = 0.0;
        mx_image_float(mtlximage11_file, mtlximage11_layer, mtlximage11_default, geomprop_UV0_out1, mtlximage11_uaddressmode, mtlximage11_vaddressmode, mtlximage11_filtertype, mtlximage11_framerange, mtlximage11_frameoffset, mtlximage11_frameendaction, mtlximage11_uv_scale, mtlximage11_uv_offset, mtlximage11_out);
        float mtlximage8_out = 0.0;
        mx_image_float(mtlximage8_file, mtlximage8_layer, mtlximage8_default, geomprop_UV0_out1, mtlximage8_uaddressmode, mtlximage8_vaddressmode, mtlximage8_filtertype, mtlximage8_framerange, mtlximage8_frameoffset, mtlximage8_frameendaction, mtlximage8_uv_scale, mtlximage8_uv_offset, mtlximage8_out);
        vec3 mtlximage9_out = vec3(0.0);
        mx_image_vector3(mtlximage9_file, mtlximage9_layer, mtlximage9_default, geomprop_UV0_out1, mtlximage9_uaddressmode, mtlximage9_vaddressmode, mtlximage9_filtertype, mtlximage9_framerange, mtlximage9_frameoffset, mtlximage9_frameendaction, mtlximage9_uv_scale, mtlximage9_uv_offset, mtlximage9_out);
        vec3 mtlximage7_out_cm_out = vec3(0.0);
        NG_srgb_texture_to_lin_rec709_color3(mtlximage7_out, mtlximage7_out_cm_out);
        vec3 mtlxnormalmap11_out = vec3(0.0);
        mx_normalmap_float(mtlximage9_out, mtlxnormalmap11_space, mtlxnormalmap11_scale, geomprop_Nworld_out1, geomprop_Tworld_out1, mtlxnormalmap11_out);
        surfaceshader King_W_out = surfaceshader{float3(0.0),float3(0.0)};
        NG_standard_surface_surfaceshader_100(King_W_base, mtlximage7_out_cm_out, King_W_diffuse_roughness, mtlximage10_out, King_W_specular, King_W_specular_color, mtlximage11_out, King_W_specular_IOR, King_W_specular_anisotropy, King_W_specular_rotation, King_W_transmission, King_W_transmission_color, King_W_transmission_depth, King_W_transmission_scatter, King_W_transmission_scatter_anisotropy, King_W_transmission_dispersion, King_W_transmission_extra_roughness, mtlximage8_out, mtlximage7_out_cm_out, mtlximage7_out_cm_out, King_W_subsurface_scale, King_W_subsurface_anisotropy, King_W_sheen, King_W_sheen_color, King_W_sheen_roughness, King_W_coat, King_W_coat_color, King_W_coat_roughness, King_W_coat_anisotropy, King_W_coat_rotation, King_W_coat_IOR, geomprop_Nworld_out1, King_W_coat_affect_color, King_W_coat_affect_roughness, King_W_thin_film_thickness, King_W_thin_film_IOR, King_W_emission, King_W_emission_color, King_W_opacity, King_W_thin_walled, mtlxnormalmap11_out, geomprop_Tworld_out1, King_W_out);
        material M_King_W_out = King_W_out;
        out1 = float4(M_King_W_out.color, 1.0);
return PixelOutputs{out1        };
    }

};
fragment PixelOutputs FragmentMain(
VertexData vd [[ stage_in ]], constant LightData_pixel& u_lightData[[ buffer(0) ]], texture2d<float> mtlximage7_file_tex [[texture(0)]], sampler mtlximage7_file_sampler [[sampler(0)]]
, texture2d<float> mtlximage10_file_tex [[texture(1)]], sampler mtlximage10_file_sampler [[sampler(1)]]
, texture2d<float> mtlximage11_file_tex [[texture(2)]], sampler mtlximage11_file_sampler [[sampler(2)]]
, texture2d<float> mtlximage8_file_tex [[texture(3)]], sampler mtlximage8_file_sampler [[sampler(3)]]
, texture2d<float> mtlximage9_file_tex [[texture(4)]], sampler mtlximage9_file_sampler [[sampler(4)]]
, constant PublicUniforms& u_pub[[ buffer(1) ]], texture2d<float> u_envRadiance_tex [[texture(5)]], sampler u_envRadiance_sampler [[sampler(5)]]
, texture2d<float> u_envIrradiance_tex [[texture(6)]], sampler u_envIrradiance_sampler [[sampler(6)]]
, constant PrivateUniforms& u_prv[[ buffer(2) ]])
{
	GlobalContext ctx {vd,     u_lightData.u_lightData
    , u_pub.displacementshader1
    , u_pub.geomprop_UV0_index
, MetalTexture    {
mtlximage7_file_tex, mtlximage7_file_sampler    }
    , u_pub.mtlximage7_layer
    , u_pub.mtlximage7_default
    , u_pub.mtlximage7_uaddressmode
    , u_pub.mtlximage7_vaddressmode
    , u_pub.mtlximage7_filtertype
    , u_pub.mtlximage7_framerange
    , u_pub.mtlximage7_frameoffset
    , u_pub.mtlximage7_frameendaction
    , u_pub.mtlximage7_uv_scale
    , u_pub.mtlximage7_uv_offset
, MetalTexture    {
mtlximage10_file_tex, mtlximage10_file_sampler    }
    , u_pub.mtlximage10_layer
    , u_pub.mtlximage10_default
    , u_pub.mtlximage10_uaddressmode
    , u_pub.mtlximage10_vaddressmode
    , u_pub.mtlximage10_filtertype
    , u_pub.mtlximage10_framerange
    , u_pub.mtlximage10_frameoffset
    , u_pub.mtlximage10_frameendaction
    , u_pub.mtlximage10_uv_scale
    , u_pub.mtlximage10_uv_offset
, MetalTexture    {
mtlximage11_file_tex, mtlximage11_file_sampler    }
    , u_pub.mtlximage11_layer
    , u_pub.mtlximage11_default
    , u_pub.mtlximage11_uaddressmode
    , u_pub.mtlximage11_vaddressmode
    , u_pub.mtlximage11_filtertype
    , u_pub.mtlximage11_framerange
    , u_pub.mtlximage11_frameoffset
    , u_pub.mtlximage11_frameendaction
    , u_pub.mtlximage11_uv_scale
    , u_pub.mtlximage11_uv_offset
, MetalTexture    {
mtlximage8_file_tex, mtlximage8_file_sampler    }
    , u_pub.mtlximage8_layer
    , u_pub.mtlximage8_default
    , u_pub.mtlximage8_uaddressmode
    , u_pub.mtlximage8_vaddressmode
    , u_pub.mtlximage8_filtertype
    , u_pub.mtlximage8_framerange
    , u_pub.mtlximage8_frameoffset
    , u_pub.mtlximage8_frameendaction
    , u_pub.mtlximage8_uv_scale
    , u_pub.mtlximage8_uv_offset
, MetalTexture    {
mtlximage9_file_tex, mtlximage9_file_sampler    }
    , u_pub.mtlximage9_layer
    , u_pub.mtlximage9_default
    , u_pub.mtlximage9_uaddressmode
    , u_pub.mtlximage9_vaddressmode
    , u_pub.mtlximage9_filtertype
    , u_pub.mtlximage9_framerange
    , u_pub.mtlximage9_frameoffset
    , u_pub.mtlximage9_frameendaction
    , u_pub.mtlximage9_uv_scale
    , u_pub.mtlximage9_uv_offset
    , u_pub.mtlxnormalmap11_space
    , u_pub.mtlxnormalmap11_scale
    , u_pub.King_W_base
    , u_pub.King_W_diffuse_roughness
    , u_pub.King_W_specular
    , u_pub.King_W_specular_color
    , u_pub.King_W_specular_IOR
    , u_pub.King_W_specular_anisotropy
    , u_pub.King_W_specular_rotation
    , u_pub.King_W_transmission
    , u_pub.King_W_transmission_color
    , u_pub.King_W_transmission_depth
    , u_pub.King_W_transmission_scatter
    , u_pub.King_W_transmission_scatter_anisotropy
    , u_pub.King_W_transmission_dispersion
    , u_pub.King_W_transmission_extra_roughness
    , u_pub.King_W_subsurface_scale
    , u_pub.King_W_subsurface_anisotropy
    , u_pub.King_W_sheen
    , u_pub.King_W_sheen_color
    , u_pub.King_W_sheen_roughness
    , u_pub.King_W_coat
    , u_pub.King_W_coat_color
    , u_pub.King_W_coat_roughness
    , u_pub.King_W_coat_anisotropy
    , u_pub.King_W_coat_rotation
    , u_pub.King_W_coat_IOR
    , u_pub.King_W_coat_affect_color
    , u_pub.King_W_coat_affect_roughness
    , u_pub.King_W_thin_film_thickness
    , u_pub.King_W_thin_film_IOR
    , u_pub.King_W_emission
    , u_pub.King_W_emission_color
    , u_pub.King_W_opacity
    , u_pub.King_W_thin_walled
    , u_prv.u_envMatrix
, MetalTexture    {
u_envRadiance_tex, u_envRadiance_sampler    }
    , u_prv.u_envLightIntensity
    , u_prv.u_envRadianceMips
    , u_prv.u_envRadianceSamples
, MetalTexture    {
u_envIrradiance_tex, u_envIrradiance_sampler    }
    , u_prv.u_refractionTwoSided
    , u_prv.u_viewPosition
    , u_prv.u_numActiveLightSources
    };
    return ctx.FragmentMain();
}
