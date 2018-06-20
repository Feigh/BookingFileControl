from os import listdir
from os.path import isfile, join
from datetime import datetime
from itertools import groupby
from collections import defaultdict
import calendar
import os
import re

def contains(list, filter):
    for x in list:
        if filter(x):
            return True
    return False


path = os.path.dirname(os.path.abspath(__file__))
myFile = []
for file in os.listdir(path+"\\filer"):
    if file.endswith(".txt"):
        if "PreemverRabatt" not in file:
            myFile.append(file)
print("Number of files: " + str(len(myFile)))
Filecontent = []
try:
    for file in myFile:
        with open("filer\\"+file) as f:
            content = f.readlines()
            for r in content:
                fileLine = re.search('\d{5};\d{6}-\d{4};\d{8}', r)
                fileString = fileLine.group(0)+ ";" + file
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

lastString = ""
stringList = []
for s in Filecontent:
    if(s != lastString ):
        stringList.append(s)
    lastString = s

stationList = []


for s in stringList:
    stringSplit =  s.split(";")
    x = {}
    x['station'] = stringSplit[0]
    x['datum']=datetime.strptime(stringSplit[2], '%Y%m%d')
    x['filname']=stringSplit[3]
    stationList.append(x)


#print(stationList['station'])
# Ä
# skapa en lista med alla dagar i månaden
year = 2018
month = 5
numdays = calendar.monthrange(year, month)[1] # kan ändrags
monthDays = []
for n in range(numdays):
    monthDays.append(datetime(year, month, n+1))

sortkeyfn = key = lambda stn: stn['station']
sortedStations = sorted(stationList, key=lambda stn: stn['station'])

#print(monthDays[0].strftime('%Y%m%d'))
groupedByStation =[]
for key,valuesiter in groupby(sortedStations, key=sortkeyfn):
    groupedByStation.append(key)

#result = list(filter(lambda x: x['station'] == "31875" and x['datum'] == datetime.strptime("2017-09-29", "%Y-%m-%d"), stationList))
#print(result)

missingStations = []
#print(groupedByStation[0])

for g in groupedByStation:
    for d in monthDays:
        result = list( filter(lambda x: x['station'] == str(g) and x['datum'] == d, stationList) )
        if len(result) == 0:
            y = {}
            y['station'] = g
            y['datum'] = d
            y['filname'] = x['filname']
            missingStations.append(y)


filename = "resultat\FilResultat.txt"
with open(filename, "w") as f:
    for s in sortedStations:
        f.write(s['station']+";"+s['datum'].strftime('%Y%m%d')+";"+s['filname']+"\n")

filename = "resultat\FilSaknasResultat.txt"
with open(filename, "w") as f:
    for s in missingStations:
        f.write(s['station']+";"+s['datum'].strftime('%Y%m%d')+";"+s['filname']+"\n")

filename = filename = "resultat\SaknadQuery.txt"
with open(filename, "w") as f:
    f.write("values")
    for s in missingStations:
        f.write(",("+s['station']+",'"+s['datum'].strftime('%Y%m%d')+"')\n")