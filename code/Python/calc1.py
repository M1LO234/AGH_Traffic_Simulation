#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Apr 11 11:35:26 2020

@author: miloszwrzesien
"""

from math import sin, cos, sqrt, atan2, radians, acos, pi, atan
import matplotlib.pyplot as plt

R = 6373.0
tablica2 = []
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

def calculatePoints1(lat1_n, lon1_n, lat2_n, lon2_n, wart, flaga):
    lat1 = radians(lat1_n)
    lon1 = radians(lon1_n)
    lat2 = radians(lat2_n)
    lon2 = radians(lon2_n)

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    wartosc = wart

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c * 1000
    points = distance / 3
    points = int(points) + 1

    rozLat = abs(lat1_n - lat2_n)
    rozLon = abs(lon1_n - lon2_n)

    distanceLat = rozLat / points
    distanceLon = rozLon / points

    pasy = 3

    #przesuniecie 1.

    przesuniety_Lat_1 = 0
    przesuniety_Lon_1 = 0
    przesuniety_Lat_2 = 0
    przesuniety_Lon_2 = 0


    i = 1
    # PG, PD, LD, LG

    # 1
    if lat1_n < lat2_n and lon1_n < lon2_n:
        for i in range(points):
            tablica2.append([round((lat1_n + (distanceLat * i)), 7), round((lon1_n + (distanceLon * i)), 7), (list(flaga)[0]+list(flaga)[1]+list(flaga)[2]+list(flaga)[3]), int(wartosc), list(flaga)[5], list(flaga)[6], "PG", "", "", "", "", "", "", ""])
            wartosc = wartosc + 1
    # 2
    elif lat1_n > lat2_n and lon1_n < lon2_n:
        for i in range(points):
            tablica2.append([round((lat1_n - (distanceLat * i)), 7), round((lon1_n + (distanceLon * i)), 7), (list(flaga)[0]+list(flaga)[1]+list(flaga)[2]+list(flaga)[3]), int(wartosc), list(flaga)[5], list(flaga)[6], "PD", "", "", "", "", "", "", ""])
            wartosc = wartosc + 1
    # 3
    elif lat1_n > lat2_n and lon1_n > lon2_n:
        for i in range(points):
            tablica2.append([round((lat1_n - (distanceLat * i)), 7), round((lon1_n - (distanceLon * i)), 7), (list(flaga)[0]+list(flaga)[1]+list(flaga)[2]+list(flaga)[3]), int(wartosc), list(flaga)[5], list(flaga)[6], "LD", "", "", "", "", "", "", ""])
            wartosc = wartosc + 1
    # 4
    elif lat1_n < lat2_n and lon1_n > lon2_n:
        for i in range(points):
            tablica2.append([round((lat1_n + (distanceLat * i)), 7), round((lon1_n - (distanceLon * i)), 7), (list(flaga)[0]+list(flaga)[1]+list(flaga)[2]+list(flaga)[3]), int(wartosc), list(flaga)[5], list(flaga)[6], "LG", "", "", "", "", "", "", ""])
            wartosc = wartosc + 1

    return tablica2, wartosc
