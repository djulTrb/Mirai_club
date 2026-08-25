from PIL import Image
import os
import glob

# Convert JPGs to PNGs and make black pixels transparent
files_to_process = [
    'src/assets/hero_sticker_1.jpg',
    'src/assets/hero_sticker_3.jpg'
]

for file_path in files_to_process:
    if os.path.exists(file_path):
        img = Image.open(file_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Change all black (also shades of black)
            # item is (R, G, B, A)
            if item[0] < 15 and item[1] < 15 and item[2] < 15:
                newData.append((0, 0, 0, 0)) # transparent
            else:
                newData.append(item)

        img.putdata(newData)
        new_path = file_path.replace('.jpg', '.png')
        img.save(new_path, "PNG")
        print(f"Processed {file_path} -> {new_path}")

print("Done converting.")
