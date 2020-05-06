#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Apr 26 22:34:33 2020

@author: miloszwrzesien
"""

from math import sin, cos, sqrt, atan2, radians
import matplotlib.pyplot as plt
from calc3 import calculatePoints
from calc2 import calculatePoints2
from calc1 import calculatePoints1

import xml.etree.ElementTree as ET
tree = ET.parse('KRK22.kml')
root = tree.getroot()

tablica = []

for coord in root.findall('{http://www.opengis.net/kml/2.2}Document/{http://www.opengis.net/kml/2.2}Folder/{http://www.opengis.net/kml/2.2}Placemark/{http://www.opengis.net/kml/2.2}LineString/{http://www.opengis.net/kml/2.2}coordinates'):
    tablica.append(coord.text)

tablica2 = []
tablica3 = []
tablica4 = []

for name in root.findall('{http://www.opengis.net/kml/2.2}Document/{http://www.opengis.net/kml/2.2}Folder/{http://www.opengis.net/kml/2.2}Placemark/{http://www.opengis.net/kml/2.2}name'):
    tablica4.append(name.text)

for i in range(len(tablica)):
    tablica2.append(tablica[i].split("\n            "))

for j in range(len(tablica2)):
    tab = []
    for k in range(len(tablica2[j]) - 2):
        tab.append(tablica2[j][k + 1])
    tab.append((tablica2[j][len(tablica2[j]) - 1]).replace('\n          ', ''))
    tablica3.append([tablica4[j], tab])

array = []
array2 = []
array3 = []

for coord1 in root.findall('{http://www.opengis.net/kml/2.2}Document/{http://www.opengis.net/kml/2.2}Folder/{http://www.opengis.net/kml/2.2}Placemark/{http://www.opengis.net/kml/2.2}Point/{http://www.opengis.net/kml/2.2}coordinates'):
    array.append(coord1.text)

for name1 in root.findall('{http://www.opengis.net/kml/2.2}Document/{http://www.opengis.net/kml/2.2}Folder/{http://www.opengis.net/kml/2.2}Placemark/{http://www.opengis.net/kml/2.2}name'):
    if list(name1.text)[0] == "S":
        array2.append(name1.text)

for h2 in range(len(array)):
    array[h2] = array[h2].replace("\n            ", "")
    array[h2] = array[h2].replace("\n          ", "")

for h3 in range(len(array)):
    array3.append([(array[h3].split(","))[1], (array[h3].split(","))[0], "", ""])

for h4 in range(len(array)):
    array3[h4][2] = array2[h4]


# W i E
latW = 50.0642346
lonW = 19.9208332
latE = 50.0466444
lonE = 19.9770376

#miedzy N i S
latN = 50.0781349
lonN = 19.9488364
latS = 50.0306616
lonS = 19.9451218

def distAndMin(lat1, lon1, tablicaDoSprawdzenia):
    min = 1000000
    dist = 0
    iteracja = 0
    id1 = 0
    idDrogi1 = 0

    for i in range(len(tablicaDoSprawdzenia)):
            dist = sqrt(((lat1 - tablicaDoSprawdzenia[i][0])**2) + ((lon1 - tablicaDoSprawdzenia[i][1])**2))
            if dist < min:
                min = dist
                id1 = tablicaDoSprawdzenia[i][2]
                idDrogi1 = tablicaDoSprawdzenia[i][3]
    return min, id1, idDrogi1

def distance_direction(lat1, lon1, lat2, lon2):
    dist = sqrt(((lat1 - lat2)**2) + ((lon1 - lon2)**2))
    if (lat1 - lat2) < 0:
        dir_lat = -1
    else:
        dir_lat = 1
    if (lon1 - lon2) < 0:
        dir_lon = -1
    else:
        dir_lon = 1
    return dist, dir_lat, dir_lon

def drawOnMap(tab):
    coordinates = []

    for row in range(2000):
        column = []
        for col in range(2000):
            column.append(0)
        coordinates.append(column)

    odejmij_pion = 0.0000265
    dodaj_poziom = 0.0000401

    Z = []
    zetka = []

    for j in range(len(tab)):
        Z.append([(int((float(tab[j][1]) - lonW) / dodaj_poziom)), (int((latN - float(tab[j][0])) / odejmij_pion))])

    for k in range(len(Z)):
        coordinates[Z[k][1]][Z[k][0]] = [tab[k][0], tab[k][1]]

    for x in range(len(coordinates)):
        for y in range(len(coordinates[0])):
            if coordinates[x][y] != 0:
                zetka.append([round(coordinates[x][y][0], 7), round(coordinates[x][y][1], 7), x, y])


    with open('coordinates2.csv', 'w') as f:
        for item in zetka:
            f.write("%s\n" % item)


tablicaDoZlepienia1 = []
tablicaDoZlepienia2 = []
tablicaAll = []
wartosc = 1

for glowne in range(len(tablica3)):
    wartosc = 1
    for poboczne in range(len(tablica3[glowne][1]) - 1):
        tablicaAll, wartosc = calculatePoints1(float(tablica3[glowne][1][poboczne].split(",")[1]), float(tablica3[glowne][1][poboczne].split(",")[0]), float(tablica3[glowne][1][poboczne + 1].split(",")[1]), float(tablica3[glowne][1][poboczne + 1].split(",")[0]), wartosc, tablica3[glowne][0])

for g in range(len(tablicaAll) - 1):
    if tablicaAll[g + 1][2] == tablicaAll[g][2]:
        tablicaAll[g][7] = tablicaAll[g][2]
        tablicaAll[g][8] = int(tablicaAll[g][3]) + 1

for g1 in range(len(tablicaAll)):
    if tablicaAll[g1][7] == "" and tablicaAll[g1][5] == "E":
        tablicaAll[g1][7] = "0"
        tablicaAll[g1][8] = "0"
    if tablicaAll[g1][7] == "" and tablicaAll[g1][5] == "O":
        tablicaAll[g1][7] = "0"
        tablicaAll[g1][8] = "0"

for g2 in range(len(tablicaAll)):
    if tablicaAll[g2][7] == "" and (int((list(tablicaAll[g2 + 1][2])[2])+(list(tablicaAll[g2 + 1][2])[3])) - 1) == (int((list(tablicaAll[g2 - 1][2])[2]) + (list(tablicaAll[g2 - 1][2])[3]))):
        tablicaAll[g2][7] = tablicaAll[g2 + 1][2]
        tablicaAll[g2][8] = int(tablicaAll[g2 + 1][3])
    if tablicaAll[g2][7] == "" and tablicaAll[g2][5] == "0" and (list(tablicaAll[g2 + 1][2])[0]+list(tablicaAll[g2 + 1][2])[1]) != (list(tablicaAll[g2][2])[0]+list(tablicaAll[g2][2])[1]):
        tablicaAll[g2][7] = (list(tablicaAll[g2][2])[0]+list(tablicaAll[g2][2])[1]+"01")
        tablicaAll[g2][8] = 1

for d in range(len(tablicaAll)):
    if list(tablicaAll[d][2])[0] == "A" or list(tablicaAll[d][2])[0] == "B" or list(tablicaAll[d][2])[0] == "C" or list(tablicaAll[d][2])[0] == "D" or list(tablicaAll[d][2])[0] == "E":
        tablicaAll[d][2] = tablicaAll[d][2]+"_1"
        tablicaAll[d][7] = tablicaAll[d][7]+"_1"
    else:
        tablicaAll[d][2] = tablicaAll[d][2]+"_2"
        tablicaAll[d][7] = tablicaAll[d][7]+"_2"

tabHTML = []




#right_neighbour on 1

LG_1_R = []
PD_1_R = []
PG_1_R = []
LD_1_R = []




tabP3 = []
min = 1000
minL = 1000
iteracja3 = -1
iteracja2 = -1
iteracjaLeft = -1
isNew = 0

for g3 in range(len(tablicaAll)):
    isNew = 0
    for d3 in range(len(tablicaAll)):
        if tablicaAll[d3][2] == tablicaAll[g3][7] and int(tablicaAll[d3][3]) == int(tablicaAll[g3][8]):
            iteracja3 = d3
            isNew = 1
            break
    if isNew == 1:
        distPP, dir_latPP, dir_lonPP = distance_direction(tablicaAll[g3][0], tablicaAll[g3][1], tablicaAll[iteracja3][0], tablicaAll[iteracja3][1])
    else:
        dir_latPP = 0
        dir_lonPP = 0

    min = 100
    minL = 100
    for p3 in range(len(tablicaAll)):




        if list(tablicaAll[p3][2])[5] == list(tablicaAll[g3][2])[5] and (list(tablicaAll[p3][2])[0]+list(tablicaAll[p3][2])[1]) != (list(tablicaAll[g3][2])[0]+list(tablicaAll[g3][2])[1]):
            dist1, dir_lat1, dir_lon1 = distance_direction(float(tablicaAll[g3][0]), float(tablicaAll[g3][1]), float(tablicaAll[p3][0]), float(tablicaAll[p3][1]))
            # LG
            if dir_lat1 == -1 and dir_lon1 == -1 and dir_latPP == -1 and dir_lonPP == 1:
                if dist1 < min:
                    min = dist1
                    iteracja2 = p3
            # PD
            if dir_lat1 == 1 and dir_lon1 == 1 and dir_latPP == 1 and dir_lonPP == -1:
                if dist1 < min:
                    min = dist1
                    iteracja2 = p3
            # PG
            if dir_lat1 == -1 and dir_lon1 == 1 and dir_latPP == 1 and dir_lonPP == 1:
                if dist1 < min:
                    min = dist1
                    iteracja2 = p3
            # LD
            if dir_lat1 == 1 and dir_lon1 == -1 and dir_latPP == -1 and dir_lonPP == -1:
                if dist1 < min:
                    min = dist1
                    iteracja2 = p3



            # Lewy
            # LG
            if dir_lat1 == 1 and dir_lon1 == 1 and dir_latPP == -1 and dir_lonPP == 1:
                if dist1 < minL:
                    minL = dist1
                    iteracjaLeft = p3
            # PD
            if dir_lat1 == -1 and dir_lon1 == -1 and dir_latPP == 1 and dir_lonPP == -1:
                if dist1 < minL:
                    minL = dist1
                    iteracjaLeft = p3
            # PG
            if dir_lat1 == 1 and dir_lon1 == -1 and dir_latPP == 1 and dir_lonPP == 1:
                if dist1 < minL:
                    minL = dist1
                    iteracjaLeft = p3
            # LD
            if dir_lat1 == -1 and dir_lon1 == 1 and dir_latPP == -1 and dir_lonPP == -1:
                if dist1 < minL:
                    minL = dist1
                    iteracjaLeft = p3

    tablicaAll[g3][9] = 0
    tablicaAll[g3][10] = 0
    tablicaAll[g3][11] = 0
    tablicaAll[g3][12] = 0
    if min < 0.000059:
        tablicaAll[g3][9] = tablicaAll[iteracja2][2]
        tablicaAll[g3][10] = tablicaAll[iteracja2][3]
    if minL < 0.000059:
        tablicaAll[g3][11] = tablicaAll[iteracjaLeft][2]
        tablicaAll[g3][12] = tablicaAll[iteracjaLeft][3]


iterA = -1
iterAR = -1
iterB = -1
iterBR = -1
iterC = -1
iterX = -1
iterV = -1
iterY = -1
iterW = -1

RiterAR= -1
RiterBR = -1
RiterV = -1
array4 = []

for arr in range(len(array3)):
    minA = 100
    minAR = 100
    minB = 100
    minBR = 100
    minC = 100
    minX = 100
    minV = 100
    minY = 100
    minW = 100

    for all in range(len(tablicaAll)):
        if list(array3[arr][2])[6] == "T" and list(array3[arr][2])[4] == list(tablicaAll[all][2])[5]:
            distTmp, coos1, cos2 = distance_direction(float(array3[arr][0]), float(array3[arr][1]), float(tablicaAll[all][0]), float(tablicaAll[all][1]))
            if (list(tablicaAll[all][2])[0]+list((tablicaAll[all][2]))[1]) == "A0":
                if distTmp < minA:
                    minA = distTmp
                    iterA = all
            if (list(tablicaAll[all][2])[0]+list(tablicaAll[all][2])[1]) == "AR":
                if distTmp < minAR:
                    minAR = distTmp
                    iterAR = all
            if (list(tablicaAll[all][2])[0]+list(tablicaAll[all][2])[1]) == "B0":
                if distTmp < minB:
                    minB = distTmp
                    iterB = all
            if (list(tablicaAll[all][2])[0]+list(tablicaAll[all][2])[1]) == "BR":
                if distTmp < minBR:
                    minBR = distTmp
                    iterBR = all
            if (list(tablicaAll[all][2])[0]+list(tablicaAll[all][2])[1]) == "C0":
                if distTmp < minC:
                    minC = distTmp
                    iterC = all

            # w druga strone
            if (list(tablicaAll[all][2])[0]+list(tablicaAll[all][2])[1]) == "X0":
                if distTmp < minX:
                    minX = distTmp
                    iterX = all
            if (list(tablicaAll[all][2])[0]+list(tablicaAll[all][2])[1]) == "V0":
                if distTmp < minV:
                    minV = distTmp
                    iterV = all
            if (list(tablicaAll[all][2])[0]+list(tablicaAll[all][2])[1]) == "Y0":
                if distTmp < minY:
                    minY = distTmp
                    iterY = all
            if (list(tablicaAll[all][2])[0]+list(tablicaAll[all][2])[1]) == "W0":
                if distTmp < minW:
                    minW = distTmp
                    iterW = all


    if minA < (0.000059 * 5):
        array4.append([array3[arr][0], array3[arr][1], array3[arr][2], (str(tablicaAll[iterA][3]) + "_" + str(tablicaAll[iterA][2]))])
        tablicaAll[iterA][13] = array3[arr][2]
    if minAR < (0.000059 * 5):
        array4.append([array3[arr][0], array3[arr][1], array3[arr][2], (str(tablicaAll[iterAR][3]) + "_" + str(tablicaAll[iterAR][2]))])
        tablicaAll[iterAR][13] = array3[arr][2]
    if minB < (0.000059 * 5):
        array4.append([array3[arr][0], array3[arr][1], array3[arr][2], (str(tablicaAll[iterB][3]) + "_" + str(tablicaAll[iterB][2]))])
        tablicaAll[iterB][13] = array3[arr][2]
    if minBR < (0.000059 * 5):
        array4.append([array3[arr][0], array3[arr][1], array3[arr][2], (str(tablicaAll[iterBR][3]) + "_" + str(tablicaAll[iterBR][2]))])
        tablicaAll[iterBR][13] = array3[arr][2]
    if minC < (0.000059 * 5):
        array4.append([array3[arr][0], array3[arr][1], array3[arr][2], (str(tablicaAll[iterC][3]) + "_" + str(tablicaAll[iterC][2]))])
        tablicaAll[iterC][13] = array3[arr][2]

    if minX < (0.000059 * 5):
        array4.append([array3[arr][0], array3[arr][1], array3[arr][2], (str(tablicaAll[iterX][3]) + "_" + str(tablicaAll[iterX][2]))])
        tablicaAll[iterX][13] = array3[arr][2]
    if minV < (0.000059 * 5):
        array4.append([array3[arr][0], array3[arr][1], array3[arr][2], (str(tablicaAll[iterV][3]) + "_" + str(tablicaAll[iterV][2]))])
        tablicaAll[iterV][13] = array3[arr][2]
    if minY < (0.000059 * 5):
        array4.append([array3[arr][0], array3[arr][1], array3[arr][2], (str(tablicaAll[iterY][3]) + "_" + str(tablicaAll[iterY][2]))])
        tablicaAll[iterY][13] = array3[arr][2]
    if minW < (0.000059 * 5):
        array4.append([array3[arr][0], array3[arr][1], array3[arr][2], (str(tablicaAll[iterW][3]) + "_" + str(tablicaAll[iterW][2]))])
        tablicaAll[iterW][13] = array3[arr][2]

# tylko R

for arr in range(len(array3)):
    RminAR = 100
    RminBR = 100
    RminV = 100
    for all in range(len(tablicaAll)):
        distTmp, coos1, cos2 = distance_direction(float(array3[arr][0]), float(array3[arr][1]), float(tablicaAll[all][0]), float(tablicaAll[all][1]))
        if list(array3[arr][2])[6] == "R" and list(array3[arr][2])[4] == list(tablicaAll[all][2])[5] and tablicaAll[all][4] == "I":
            if (list(tablicaAll[all][2])[0]+list(tablicaAll[all][2])[1]) == "AR":
                if distTmp < RminAR:
                    RminAR = distTmp
                    RiterAR = all

            if (list(tablicaAll[all][2])[0]+list(tablicaAll[all][2])[1]) == "BR":
                if distTmp < RminBR:
                    RminBR = distTmp
                    RiterBR = all
            if (list(tablicaAll[all][2])[0]+list(tablicaAll[all][2])[1]) == "V0":
                if distTmp < RminV:
                    RminV = distTmp
                    RiterV = all

    if RminAR < (0.000059 * 5):
        array4.append([array3[arr][0], array3[arr][1], array3[arr][2], (str(tablicaAll[RiterAR][3]) + "_" + str(tablicaAll[RiterAR][2]))])
        tablicaAll[RiterAR][13] = array3[arr][2]
    if RminBR < (0.000059 * 5):
        array4.append([array3[arr][0], array3[arr][1], array3[arr][2], (str(tablicaAll[RiterBR][3]) + "_" + str(tablicaAll[RiterBR][2]))])
        tablicaAll[RiterBR][13] = array3[arr][2]
    if RminV < (0.000059 * 5):
        array4.append([array3[arr][0], array3[arr][1], array3[arr][2], (str(tablicaAll[RiterV][3]) + "_" + str(tablicaAll[RiterV][2]))])
        tablicaAll[RiterV][13] = array3[arr][2]




for cos in range(len(tablicaAll)):
    if tablicaAll[cos][7] == "0" or tablicaAll[cos][7] == "0_1" or tablicaAll[cos][7] == "0_2":
        tablicaAll[cos][7] = 0
    if tablicaAll[cos][8] == "0":
        tablicaAll[cos][8] = 0
    if len(list(tablicaAll[cos][2])) > 1:
        tablicaAll[cos][2] = tablicaAll[cos][2].replace("_1", "")
        tablicaAll[cos][2] = tablicaAll[cos][2].replace("_2", "")
    if len(list(str(tablicaAll[cos][7]))) > 1:
        tablicaAll[cos][7] = tablicaAll[cos][7].replace("_1", "")
        tablicaAll[cos][7] = tablicaAll[cos][7].replace("_2", "")
    if len(list(str(tablicaAll[cos][9]))) > 1:
        tablicaAll[cos][9] = tablicaAll[cos][9].replace("_1", "")
        tablicaAll[cos][9] = tablicaAll[cos][9].replace("_2", "")
    if len(list(str(tablicaAll[cos][11]))) > 1:
        tablicaAll[cos][11] = tablicaAll[cos][11].replace("_1", "")
        tablicaAll[cos][11] = tablicaAll[cos][11].replace("_2", "")

# numerowanie id
arkusz2 = []

for ark2 in range(len(tablicaAll)):
    arkusz2.append([ark2, tablicaAll[ark2][2], tablicaAll[ark2][3]])

arkusz3 = []
iterPrawy = -1
iterLewy = -1
iterSrodek = -1

for ark3 in range(len(tablicaAll)):
    arkusz3.append([arkusz2[ark3][0], "", "", "", "", "", "", "", ""])
    isNewPrawy = 0
    isNewLewy = 0
    isNewSrodek = 0
    for ark4 in range(len(tablicaAll)):
        if tablicaAll[ark3][9] == arkusz2[ark4][1] and tablicaAll[ark3][10] == arkusz2[ark4][2]:
            iterPrawy = ark4
            isNewPrawy = 1
        if tablicaAll[ark3][11] == arkusz2[ark4][1] and tablicaAll[ark3][12] == arkusz2[ark4][2]:
            iterLewy = ark4
            isNewLewy = 1
        if tablicaAll[ark3][7] == arkusz2[ark4][1] and tablicaAll[ark3][8] == arkusz2[ark4][2]:
            iterSrodek = ark4
            isNewSrodek = 1
    if isNewPrawy == 1:
        arkusz3[ark3][3] = arkusz2[iterPrawy][0]
    if isNewPrawy == 0:
        arkusz3[ark3][3] = ""

    if isNewSrodek == 1:
        arkusz3[ark3][2] = arkusz2[iterSrodek][0]
    if isNewSrodek == 0:
        arkusz3[ark3][2] = ""

    if isNewLewy == 1:
        arkusz3[ark3][1] = arkusz2[iterLewy][0]
    if isNewLewy == 0:
        arkusz3[ark3][1] = ""


for ark5 in range(len(tablicaAll)):
    if tablicaAll[ark5][13] != "":
        arkusz3[ark5][4] = tablicaAll[ark5][13]

    arkusz3[ark5][5] = tablicaAll[ark5][0]
    arkusz3[ark5][6] = tablicaAll[ark5][1]
    arkusz3[ark5][7] = tablicaAll[ark5][4]
    arkusz3[ark5][8] = tablicaAll[ark5][5]

for a in range(len(tablicaAll)):
    tabHTML.append([tablicaAll[a][0], tablicaAll[a][1], (str(tablicaAll[a][3])+" "+tablicaAll[a][2]+" "+tablicaAll[a][4]+tablicaAll[a][5])])




fileToWrite = open("tablicaZMaina10.txt","w")

fileToWrite.write(str(tabHTML))
fileToWrite.close()


with open('plik.csv', 'w') as f:
    for item in tablicaAll:
        f.write("%s\n" % item)

with open('swiatla.csv', 'w') as f1:
    for item1 in array4:
        f1.write("%s\n" % item1)

with open('tmpArray3.csv', 'w') as f2:
    for item2 in arkusz3:
        f2.write("%s\n" % item2)
