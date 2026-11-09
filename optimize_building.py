import bpy
import os
import sys

# Input and output paths
input_path = r"C:\Users\Gokul Murugan\OneDrive\Desktop\rahuldop\rahul-portfolio\public\models\building.glb"
output_path = r"C:\Users\Gokul Murugan\OneDrive\Desktop\rahuldop\rahul-portfolio\public\models\building_optimized.glb"

def clear_scene():
    """Clear all objects from the scene."""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    # Clear orphaned data
    for block in bpy.data.meshes:
        if block.users == 0:
            bpy.data.meshes.remove(block)
    for block in bpy.data.materials:
        if block.users == 0:
            bpy.data.materials.remove(block)
    for block in bpy.data.textures:
        if block.users == 0:
            bpy.data.textures.remove(block)
    for block in bpy.data.images:
        if block.users == 0:
            bpy.data.images.remove(block)

def optimize_model(input_path, output_path):
    """Optimize a GLB model with Draco compression and mesh simplification."""
    print(f"Optimizing: {input_path} -> {output_path}")
    
    # Clear scene
    clear_scene()
    
    # Import GLB
    try:
        bpy.ops.import_scene.gltf(filepath=input_path)
    except Exception as e:
        print(f"ERROR importing {input_path}: {e}")
        return False
    
    # Process all mesh objects
    for obj in bpy.context.selected_objects:
        if obj.type == 'MESH':
            bpy.context.view_layer.objects.active = obj
            
            # Apply all transforms
            bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
            
            # Set origin to geometry center
            bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')
            
            # Recalculate normals
            bpy.ops.object.mode_set(mode='EDIT')
            bpy.ops.mesh.select_all(action='SELECT')
            bpy.ops.mesh.remove_doubles(threshold=0.0001)
            bpy.ops.mesh.normals_make_consistent(inside=False)
            bpy.ops.mesh.quads_convert_to_tris()
            bpy.ops.object.mode_set(mode='OBJECT')
    
    # Export GLB with Draco compression and simplification
    try:
        bpy.ops.export_scene.gltf(
            filepath=output_path,
            export_format='GLB',
            export_apply=True,
            export_yup=True,
            export_animations=False,
            export_materials='EXPORT',
            export_cameras=False,
            export_lights=False,
            export_tangents=True,
            export_normals=True,
            export_skins=True,
            export_morph=False,
            export_extras=False,
            # Draco compression
            export_draco_mesh_compression_enable=True,
            export_draco_mesh_compression_level=10,
            export_draco_position_quantization=14,
            export_draco_normal_quantization=10,
            export_draco_texcoord_quantization=12,
            export_draco_color_quantization=10,
            export_draco_generic_quantization=12,
            # Mesh optimization
            export_meshopt_enable=True,
            export_meshopt_threshold=0.001,
        )
        print(f"SUCCESS: {output_path}")
        return True
    except Exception as e:
        print(f"ERROR exporting {output_path}: {e}")
        return False

# Run optimization
success = optimize_model(input_path, output_path)
sys.exit(0 if success else 1)