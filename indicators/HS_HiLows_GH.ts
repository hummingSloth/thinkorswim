# Study name HS_HiLows_GH
# by hummingSloth https://github.com/hummingSloth/thinkorswim
# version 1.0

script IsTime {
    input time = 0000;
    plot IsTime = SecondsFromTime(time)[1] < 0 and SecondsFromTime(time) >= 0;
}

declare upper;

def Today = if GetLastDay() == GetDay() then yes else no;

input PlotOverNightExtremes = yes;
input ExtendOverNightHighLowTo = 1600;
input ShowPrevDayHighLow = yes;
input ShowT2HighLow = yes;
input ExtendPreviousDayHighLowTo = 1600;
input ShowPDLevelsChartBubbles = no;
input ShowT2LevelsChartBubbles = no;
input TimeOfBubble = 0730;
input ShowPreviousDayClose = no;

DefineGlobalColor("Time1", (CreateColor(143, 239, 191)));
DefineGlobalColor("PDs", (CreateColor(143, 239, 191)));


def o = open;
def h = high;
def l = low;
def c = close;
def v = volume;
def bar = BarNumber();
def TimeX = GetTime() < RegularTradingStart(GetYYYYMMDD());
def PlotTimePMHL = SecondsFromTime(0100) >= 0 and SecondsTillTime(ExtendOverNightHighLowTo) > 0;


def vol = if TimeX and !TimeX[1] 

          then v 

          else if TimeX 

               then vol[1] + v 

               else Double.NaN;

def TimeX_Volume = vol;

def ONhigh = if TimeX and !TimeX[1] 

             then h 

             else if TimeX and 

                     h > ONhigh[1] 

                     then h 

                  else ONhigh[1];

def ONhighBar = if TimeX and h == ONhigh 

                then bar 

                else Double.NaN;

def ONlow = if TimeX and !TimeX[1] 

            then l 

            else if TimeX and 

                    l < ONlow[1] 

            then l 

                 else ONlow[1];

def ONlowBar = if TimeX and l == ONlow 
               then bar 
               else Double.NaN;

def OverNightHigh = if BarNumber() == HighestAll(ONhighBar) 
                    then ONhigh 
                    else OverNightHigh[1];

def OverNightLow = if BarNumber() == HighestAll(ONlowBar) 
                   then ONlow 
                   else OverNightLow[1];

plot ONH = if OverNightHigh > 0 and PlotTimePMHL
           then OverNightHigh 
           else Double.NaN;

ONH.SetHiding(!PlotOverNightExtremes);
ONH.SetPaintingStrategy(PaintingStrategy.DASHES);
ONH.SetDefaultColor(CreateColor(77, 166, 255));
ONH.HideBubble();
ONH.HideTitle();

plot ONL = if OverNightLow > 0 and PlotTimePMHL

           then OverNightLow 

           else Double.NaN;

ONL.SetHiding(!PlotOverNightExtremes);
ONL.SetPaintingStrategy(PaintingStrategy.DASHES);
ONL.SetDefaultColor(CreateColor(77, 166, 255));
ONL.HideBubble();
ONL.HideTitle(); 

# >>> Previous Day High/Low Plot snf T-2 H/L <<<

def Day = GetDay();
def LDay = GetLastDay();
def CTDay = Day == LDay;
def PDH = if !Day then Double.NaN else high (period = "day")[1];
def PDL = if !Day then Double.NaN else low (period = "day")[1];
def PDC = if !Day then Double.NaN else close (period = "day")[1];
def PlotTimePDHL = SecondsFromTime(0100) >= 0 and SecondsTillTime(ExtendPreviousDayHighLowTo) > 0;

plot PDCH = if ShowPrevDayHighLow && CTDay && PlotTimePDHL && Today then PDH else Double.NaN;
plot PDCL = if ShowPrevDayHighLow && CTDay && PlotTimePDHL && Today then PDL else Double.NaN;
plot PDCLS = if ShowPreviousDayClose && ShowPrevDayHighLow && CTDay && PlotTimePDHL && Today then PDC else Double.NaN;

PDCH.SetDefaultColor(CreateColor(143, 239, 191));
PDCH.SetLineWeight(1);
PDCH.SetPaintingStrategy(PaintingStrategy.LINE);
PDCL.SetDefaultColor(CreateColor(143, 239, 191));
PDCL.SetLineWeight(1);
PDCL.SetPaintingStrategy(PaintingStrategy.LINE);
PDCLS.SetDefaultColor(GetColor(9));
PDCLS.SetPaintingStrategy(PaintingStrategy.LINE);
PDCLS.SetStyle(Curve.MEDIUM_DASH);
PDCLS.SetLineWeight(2);

AddChartBubble(IsTime(TimeOfBubble) && ShowPrevDayHighLow && ShowPDLevelsChartBubbles && Today, "price location" = PDH, text = "PD High",GlobalColor("PDs"),yes);
AddChartBubble(IsTime(TimeOfBubble) && ShowPrevDayHighLow && ShowPDLevelsChartBubbles && Today, "price location" = PDL, text = "PD Low",GlobalColor("PDs"),no);

##### T-2 Levels #####
def T2H = if !Day then Double.NaN else high (period = "day")[2];
def T2L = if !Day then Double.NaN else low (period = "day")[2];

plot T2PDCH = if ShowT2HighLow && CTDay && PlotTimePDHL && Today then T2H else Double.NaN;
plot T2PDCL = if ShowT2HighLow && CTDay && PlotTimePDHL && Today then T2L else Double.NaN;

T2PDCH.SetDefaultColor(CreateColor(143, 239, 191));
T2PDCH.SetPaintingStrategy(PaintingStrategy.LINE);
T2PDCH.SetLineWeight(3);
T2PDCL.SetDefaultColor(CreateColor(143, 239, 191));
T2PDCL.SetPaintingStrategy(PaintingStrategy.LINE);
T2PDCL.SetLineWeight(3);

AddChartBubble(IsTime(TimeOfBubble) && ShowT2HighLow && ShowT2LevelsChartBubbles && Today, "price location" = T2PDCH, text = "T-2 High",GlobalColor("PDs"),yes);
AddChartBubble(IsTime(TimeOfBubble) && ShowT2HighLow && ShowT2LevelsChartBubbles && Today, "price location" = T2PDCL, text = "T-2 Low",GlobalColor("PDs"),no);
 
