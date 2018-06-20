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
for file in os.listdir(path+"\\filer"):
    if file.endswith(".csv"):
        myFile.append(file)


Filecontent = []
try:
    for file in myFile:
        with open("filer\\"+file) as f:
            content = f.readlines()
            for r in content:
                fileLine = r.split(';')
                stationRow = ''
                stationDate = ''
                stationlin = ''
                for d in fileLine:
                    if len(d.rstrip()) > 2:
                        therow = re.search(' \d{5} ', d)
                        stationRow = therow.group(0)
                    elif d != '' and d != '\n':
                        stationDate = '2018-05-' + d.rstrip()
                        stationlin += '(' +stationRow + ', \'' + stationDate + '\') \n'
                # borde göra om så att den får in data filen
                Filecontent.append( stationlin )

except IOError as e:
    print("I/O error({0}): {1}".format(e.errno, e.strerror) )
except ValueError as e2:
    print("Value Error")
except AttributeError as e:
    print("AttributError")
except:
    print("General error")
    raise

filename = "resultat\FilResultat.txt"
with open(filename, "w") as f:
    for s in Filecontent:
        f.write(s)