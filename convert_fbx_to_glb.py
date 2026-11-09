import bpy
import bmesh
import os
import sys

# Ensure output directory exists
output_dir = r"C:\Users\Gokul Murugan\OneDrive\Desktop\rahuldop\rahul-portfolio\public\models"
os.makedirs(output_dir, exist_ok=True)

# Source files and output mappings
conversions = [
    {
        "input": r"C:\Users\Gokul Murugan\OneDrive\Desktop\rahuldop\maya model\radio.fbx",
        "output": os.path.join(output_dir, "radio.glb")
    },
    {
        "input": r"C:\Users\Gokul Murugan\OneDrive\Desktop\rahuldop\maya model\book.fbx",
        "output": os.path.join(output_dir, "book.glb")
    },
    {
        "input": r"C:\Users\Gokul Murugan\OneDrive\Desktop\rahuldop\maya model\axe.fbx",
        "output": os.path.join(output_dir, "axe.glb")
    }
]

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

def convert_fbx_to_glb(input_path, output_path):
    """Convert a single FBX file to GLB."""
    print(f"Converting: {input_path} -> {output_path}")
    
    # Clear scene
    clear_scene()
    
    # Import FBX - Blender 5.2 compatible parameters
    try:
        bpy.ops.import_scene.fbx(
            filepath=input_path,
            global_scale=1.0,
            use_custom_props=True,
            use_anim=True,
            use_custom_normals=True,
            use_image_search=True,
        )
    except Exception as e:
        print(f"ERROR importing {input_path}: {e}")
        return False
    
    # Ensure all objects are selected for export
    bpy.ops.object.select_all(action='SELECT')
    
    # Triangulate all meshes before export (fixes tangent calculation issues)
    for obj in bpy.context.selected_objects:
        if obj.type == 'MESH':
            bpy.context.view_layer.objects.active = obj
            # Apply all transforms first
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
            
            # Special handling for axe: remove bottom round part
            if 'axe' in input_path.lower():
                bpy.ops.object.mode_set(mode='EDIT')
                bpy.ops.mesh.select_all(action='SELECT')
                # Get mesh data
                mesh = bpy.context.active_object.data
                bm = bmesh.from_edit_mesh(mesh)
                if len(bm.verts) > 0:
                    # Find the bottom-most vertex
                    min_z = min(v.co.z for v in bm.verts)
                    max_z = max(v.co.z for v in bm.verts)
                    min_y = min(v.co.y for v in bm.verts)
                    max_y = max(v.co.y for v in bm.verts)
                    
                    # Select vertices in bottom 30% of BOTH Z and Y axes
                    height_z = max_z - min_z
                    threshold_z = min_z + (max_z - min_z) * 0.30
                    height_y = max(v.co.y for v in bm.verts) - min(v.co.y for v in bm.verts)
                    threshold_y = min(v.co.y for v in bm.verts) + (max(v.co.y for v in bm.verts) - min(v.co.y for v in bm.verts)) * 0.30
                    
                    # Also select faces that are horizontal/pointing down (normal.z < -0.7 or normal.y < -0.7)
                    for f in bm.faces:
                        if f.normal.z < -0.7 or f.normal.y < -0.7:
                            # Check if face is in bottom 30%
                            face_center_z = sum(v.co.z for v in f.verts) / len(f.verts)
                            face_center_y = sum(v.co.y for v in f.verts) / len(f.verts)
                            if face_center_z < (min(v.co.z for v in bm.verts) + (max(v.co.z for v in bm.verts) - min(v.co.z for v in bm.verts)) * 0.30) or \
                               face_center_y < (min(v.co.y for v in bm.verts) + (max(v.co.y for v in bm.verts) - min(v.co.y for v in bm.verts)) * 0.30):
                                for v in f.verts:
                                    v.select = True
                    
                    # Select vertices in bottom 30% of Z
                    min_z = min(v.co.z for v in bm.verts)
                    max_z = max(v.co.z for v in bm.verts)
                    threshold_z = min_z + (max_z - min_z) * 0.30
                    for v in bm.verts:
                        if v.co.z < (min(v.co.z for v in bm.verts) + (max(v.co.z for v in bm.verts) - min(v.co.z for v in bm.verts)) * 0.30):
                            v.select = True
                    
                    # Select vertices in bottom 30% of Y
                    min_y = min(v.co.y for v in bm.verts)
                    max_y = max(v.co.y for v in bm.verts)
                    threshold_y = min(v.co.y for v in bm.verts) + (max(v.co.y for v in bm.verts) - min(v.co.y for v in bm.verts)) * 0.30
                    for v in bm.verts:
                        if v.co.y < (min(v.co.y for v in bm.verts) + (max(v.co.y for v in bm.verts) - min(v.co.y for v in bm.verts)) * 0.30):
                            v.select = True
                    
                    # Delete selected vertices/faces
                    bpy.ops.mesh.delete(type='VERT')
                    bmesh.update_edit_mesh(mesh)
                bpy.ops.object.mode_set(mode='OBJECT')
    
    # Export GLB
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
        )
        print(f"SUCCESS: {output_path}")
        return True
    except Exception as e:
        print(f"ERROR exporting {output_path}: {e}")
        return False

# Main conversion loop
success_count = 0
for conv in conversions:
    input_path = conv["input"]
    output_path = conv["output"]
    
    if not os.path.exists(input_path):
        print(f"ERROR: Input file not found: {input_path}")
        continue
    
    success = convert_fbx_to_glb(input_path, output_path)
    if success:
        success_count += 1

print(f"\nConversion complete: {success_count}/3 files converted successfully")

# Verify output files
print("\nVerifying output files:")
for conv in conversions:
    output_path = conv["output"]
    if os.path.exists(output_path):
        size = os.path.getsize(output_path)
        print(f"  {os.path.basename(output_path)}: {size:,} bytes ({size/1024:.1f} KB)")
    else:
        print(f"  {os.path.basename(output_path)}: NOT FOUND")

sys.exit(0 if success_count == 3 else 1)