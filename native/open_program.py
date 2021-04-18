#!/usr/bin/env python3

import json
import os
import shlex
import struct
import subprocess
import sys

VERSION = '0.1.0'

allowed_extensions = [
    'ff-open-with@example.org'
]

sys.stdin.buffer

def info():
    return {
        'whoami': 'ff-open-with native helper',
        'version': VERSION,
        'file': os.path.realpath(__file__),
        'allowed_extensions': allowed_extensions
    }

# Read a message from stdin and decode it.
def getMessage():
    rawLength = sys.stdin.buffer.read(4)
    if len(rawLength) == 0:
        sys.exit(0)
    messageLength = struct.unpack('@I', rawLength)[0]
    message = sys.stdin.buffer.read(messageLength).decode('utf-8')
    return json.loads(message)

# Send an encoded message to stdout
def sendMessage(messageContent):
    encodedContent = json.dumps(messageContent).encode('utf-8')
    encodedLength = struct.pack('@I', len(encodedContent))

    sys.stdout.buffer.write(encodedLength)
    sys.stdout.buffer.write(encodedContent)
    sys.stdout.buffer.flush()

def listen():
    receivedMessage = getMessage()
    if receivedMessage == 'ping':
        sendMessage(info())
    else:
        args = shlex.split(receivedMessage)
        devnull = open(os.devnull, 'w')
        subprocess.Popen(args, stdout=devnull, stderr=devnull)
        sendMessage(None)

if __name__ == '__main__':
    for ae in allowed_extensions:
        if ae in sys.argv:
            listen()
            sys.exit(0)

    sendMessage(info())
    sys.exit(0)
