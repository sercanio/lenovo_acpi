#!/bin/bash

# Set the path to the ideapad_acpi variable folder
ideapad_acpi=/sys/bus/platform/drivers/ideapad_acpi/VPC2004:00

# Check if a parameter has been passed to the script
if [ $# -ne 1 ]; then
  echo "Usage: $0 <value>"
  exit 1
fi

# Get the value passed as the parameter
value=$1

# Change the value of the conversation_mode file
echo "$value" > "$ideapad_acpi/conservation_mode"

# Verify the new value of the conversation_mode file
cat "$ideapad_acpi/conservation_mode"
