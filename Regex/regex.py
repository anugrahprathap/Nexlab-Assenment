import re

text = '''
{"orders":[{"id":1},{"id":2},{"id":3},{"id":4},{"id":5},{"id":6},{"id":7},{"id":8},{"id":9},{"id":10},{"id":11},{"id":648},{"id":649},{"id":650},{"id":651},{"id":652},{"id":653}],"errors":[{"code":3,"message":"[PHP Warning #2] count(): Parameter must be an array or an object that implements Countable (153)"}]}
'''

# Define the regular expression pattern to extract "id" and "error code" 
pattern = r'"id":(\d+)|"code":(\d+)'


matches = re.findall(pattern, text)

# Extract both "id" and "code" numbers into separate lists
id = [match[0] for match in matches if match[0]]
codes = [match[1] for match in matches if match[1]]

# Filter out None values in the "codes" list
codes = [code for code in codes if code is not None]

# Print the results as lists of numbers
print("Id :", id)
print("Error Code:", codes)
