setwd("~/Dropbox/AGH_MILO/WEAIiIB/sem4/badania")
dane <- read.csv("~/Dropbox/AGH_MILO/WEAIiIB/sem4/badania/speed/15075040data", header=FALSE)
dane <- dane[15:900,]


czas<-dane$V2/60
Speed<-dane[,3:4]
matplot(czas,Speed,type='l',xlab='Time [min]',ylab = 'Speed [km/h]',
        main="Average speed on the beltway 2 (In:15, On:750)",lty=1)


x0=par("usr")[2]
y0=par("usr")[4]
legend(x0,y0, xjust=1, yjust=1,
       legend=c("AvgMaxSpeed", "AvgSpeed"),
       lty = 1,
       col=c("black","red"),
       bty="n"
       )
Traf<-dane[,5:7]

matplot(czas,Traf,type='l',xlab='Time [min]',ylab = 'Number of cars', 
        main="Number of cars in time (In:15, On:750)",lty=1)
x0=par("usr")[2]
y0=par("usr")[4]
legend(x0,y0, xjust=1, yjust=1,
       legend=c("InCars", "OutCars", "CarsOnStreet"),
       lty = 1,
       col=c("black","red","green"),
       bty="n"
)
#Flow <- read.delim("~/Dropbox/AGH_MILO/WEAIiIB/sem4/badania/02075040flow1")
#FDane <- read.delim("~/Dropbox/AGH_MILO/WEAIiIB/sem4/badania/02075040flow3", header=FALSE)
#FCzas <- FDane$V1
#Flow <- FDane[,2:16]
#matplot(FCzas,Flow,type='l',xlab='Time [s]',ylab = 'Speed [km/h]', main="Speed 2/750",lty=1)
