import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from PIL import Image
import io
import os

# Set up the figure and axis
fig, ax = plt.subplots(figsize=(6, 6), facecolor='#efeee5')
ax.set_xlim(-1.2, 1.2)
ax.set_ylim(-1.2, 1.2)
ax.set_aspect('equal')
ax.axis('off')
ax.set_facecolor('#efeee5')

# Total number of frames for the animation
total_frames = 200

# Create frames list for GIF
frames = []

print("Generating frames...")

# Generate all frames
for frame in range(total_frames):
    ax.clear()
    ax.set_xlim(-1.2, 1.2)
    ax.set_ylim(-1.2, 1.2)
    ax.set_aspect('equal')
    ax.axis('off')
    ax.set_facecolor('#efeee5')
    fig.patch.set_facecolor('#efeee5')
    
    # Draw stopwatch circle
    circle = plt.Circle((0, 0), 0.9, fill=False, edgecolor='#6B7A47', linewidth=3)
    ax.add_patch(circle)
    
    # Calculate angle: slow at first, then accelerates
    # Using a quadratic function of the frame number to increase speed
    progress = frame / total_frames
    theta = 2 * np.pi * progress + 0.5 * progress * progress
    
    # Calculate new endpoint coordinates for the rotating line
    x = np.cos(theta) * 0.9
    y = np.sin(theta) * 0.9
    
    # Draw the rotating green line
    ax.plot([0, x], [0, y], color='#6B7A47', linewidth=4, solid_capstyle='round')
    
    # Draw lightning bolt at the end of the line
    bolt_size = 0.08
    # Position bolt at the end of the line, slightly extended
    bolt_x = x * 1.05
    bolt_y = y * 1.05
    
    # Lightning bolt shape (simplified)
    bolt_angle = theta + np.pi/2
    cos_a = np.cos(bolt_angle)
    sin_a = np.sin(bolt_angle)
    
    # Create lightning bolt points
    bolt_points = np.array([
        [bolt_x - bolt_size * cos_a, bolt_y - bolt_size * sin_a],
        [bolt_x, bolt_y],
        [bolt_x - bolt_size * 0.5 * cos_a, bolt_y - bolt_size * 0.5 * sin_a],
        [bolt_x + bolt_size * cos_a, bolt_y + bolt_size * sin_a],
        [bolt_x, bolt_y],
        [bolt_x + bolt_size * 0.5 * cos_a, bolt_y + bolt_size * 0.5 * sin_a],
        [bolt_x - bolt_size * cos_a, bolt_y - bolt_size * sin_a]
    ])
    ax.fill(bolt_points[:, 0], bolt_points[:, 1], color='#6B7A47', edgecolor='#6B7A47', linewidth=1.5, zorder=10)
    
    # Draw static clock hands
    # Minute hand (longer)
    ax.plot([0, 0.5], [0, 0.65], color='#6B7A47', linewidth=4, solid_capstyle='round')
    # Hour hand markers (shorter)
    ax.plot([-0.15, 0], [0, 0], color='#6B7A47', linewidth=3, solid_capstyle='round')
    ax.plot([0, 0], [-0.15, 0], color='#6B7A47', linewidth=3, solid_capstyle='round')
    
    # Save frame to buffer
    buf = io.BytesIO()
    fig.savefig(buf, format='png', facecolor='#efeee5', edgecolor='none', dpi=100, bbox_inches='tight', pad_inches=0)
    buf.seek(0)
    frames.append(Image.open(buf).convert('RGBA'))
    buf.close()
    
    if (frame + 1) % 50 == 0:
        print(f"Generated {frame + 1}/{total_frames} frames")

# Save as GIF
output_filename = "efficiency-icon-animation.gif"
print(f"\nSaving animation to {output_filename}...")
frames[0].save(
    output_filename,
    save_all=True,
    append_images=frames[1:],
    duration=30,  # 30ms per frame = ~33 fps
    loop=0  # Loop forever
)

print(f"Animation saved to {output_filename}")
print(f"File size: {os.path.getsize(output_filename) / 1024:.2f} KB")
print(f"\nYou can now upload {output_filename} to the public/ folder and update the Mission component to use it.")
