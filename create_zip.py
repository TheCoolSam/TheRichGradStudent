import zipfile
import os

def create_zip():
    output_filename = 'hostinger_deploy.zip'
    
    # Files and folders to include
    to_include = [
        'src', 
        'public', 
        'sanity', 
        'package.json', 
        'package-lock.json', 
        'next.config.js', 
        'postcss.config.js', 
        'tailwind.config.js', 
        'tsconfig.json', 
        '.eslintrc.json', 
        '.env.local'
    ]

    print(f"Creating {output_filename}...")

    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for item in to_include:
            if os.path.isfile(item):
                print(f"Adding file: {item}")
                zipf.write(item, item)
            elif os.path.isdir(item):
                print(f"Adding directory: {item}")
                for root, dirs, files in os.walk(item):
                    # Skip node_modules and hidden directories like .git
                    dirs[:] = [d for d in dirs if d != 'node_modules' and not d.startswith('.')]
                    
                    for file in files:
                        file_path = os.path.join(root, file)
                        # Archive name should be relative to project root
                        zipf.write(file_path, file_path)
            else:
                print(f"Warning: {item} not found")

    size = os.path.getsize(output_filename)
    print(f"Success! Created {output_filename} ({size} bytes)")

if __name__ == '__main__':
    create_zip()
