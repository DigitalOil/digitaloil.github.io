import json

# Define the input and output file names
input_file = 'data.txt'
output_file = 'output.json'

# Initialize an empty dictionary to hold the JSON structure
json_data = {}

with open(input_file, 'r') as file:
    lines = file.readlines()

year = None
entries = []

for line in lines:
    line = line.strip()
    if line.startswith('"Year"'):
        if year is not None:
            json_data[year] = entries
            entries = []
        year = line.split(":")[1].strip()
    elif line.startswith("[{") or line.startswith("{"):
        entries.append(json.loads(line.replace("'", '"')))
    else:
        continue

if year is not None:
    json_data[year] = entries

with open(output_file, 'w') as file:
    json.dump(json_data, file, indent=4)

print(f"Data successfully converted to {output_file}")
