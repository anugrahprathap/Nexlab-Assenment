# JSON Data Value Extraction

This code snippet demonstrates how to use Python and regular expressions to extract "id" and "error code" values from JSON data.

## Usage

1. Import the `re` module.
2. Define your JSON data or text containing the "id" and "code" values.
3. Use the provided regular expression pattern to extract the information.
4. Access the extracted "id" and "code" values from the resulting lists.

Example:

```python
import re

# Define your JSON data or text
text = '...'  # Your JSON data here

# Define the regular expression pattern
pattern = r'"id":(\d+)|"code":(\d+)'

# Use the pattern to extract "id" and "code" values.

# Access the extracted values from the 'id' and 'codes' lists.

