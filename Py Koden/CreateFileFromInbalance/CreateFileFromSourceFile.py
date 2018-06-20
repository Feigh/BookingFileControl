from os import listdir
from os.path import isfile, join
from datetime import datetime
from itertools import groupby
from collections import defaultdict
import calendar
import os
import re

path = os.path.dirname(os.path.abspath(__file__))
myFile = []
for file in os.listdir(path+"\\source"):
    if file.endswith(".txt"):
        if "PreemverRabatt" not in file:
            myFile.append(file)
print("Number of files: " + str(len(myFile)))
Filecontent = []
try:
    for file in myFile:
        with open("source\\"+file) as f:
            content = f.readlines()
            for r in content:
                fileLine = re.search('\d{5};\d{6}-\d{4};\d{8}', r)
                fileString = fileLine.group(0)
                Filecontent.append( fileString )
except IOError as e:
    print("I/O error({0}): {1}".format(e.errno, e.strerror) )
except ValueError:
    print("Could not convert data to an integer.")
except AttributeError:
    print("AttributError")
except:
    print("Unexpected error:")
    raise

newlist = list(set(Filecontent))

imbFile = []
for file in os.listdir(path+"\\newfile"):
    if file.endswith(".txt"):
        imbFile.append(file)

newFilecontent = []
try:
    for file in imbFile:
        with open("newfile\\"+file) as f:
            content = f.readlines()
            for r in content:
                fileLine = re.search('\d{5};\d{6}-\d{4};\d{8}', r)
                if fileLine.group(0) in newlist:
                    newFilecontent.append( r )
except IOError as e:
    print("I/O error({0}): {1}".format(e.errno, e.strerror) )
except ValueError:
    print("Could not convert data to an integer.")
except AttributeError:
    print("AttributError")
except:
    print("Unexpected error:")
    raise

filename = "result\FilResultat.txt"
with open(filename, "w") as f:
    for s in newFilecontent:
        f.write(s)