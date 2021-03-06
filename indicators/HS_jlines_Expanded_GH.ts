# Study name HS_jlines_expanded_GH
# by hummingSloth with credit to BMONT https://github.com/hummingSloth/thinkorswim
# version 1.0

declare once_per_bar;

input ShowBullishFiveFifteenCloud = no;
input ShowBearishFiveFifteenCloud = no;
input showFiveFifteenEMALines = no;
input Show9EMA = yes;
input ShowCustomJLines = no;
input CustomJLines = AggregationPeriod.Hour;
input Show1MinJlines = no;
input Show1MinJlinesCloud = yes;
input Show3MinJlines = no;
input Show3MinJlinesCloud = yes;
input Show5MinJlines = no;
input Show5MinJlinesCloud = yes;
input Show1Min200EMA = no;
input Show5min200EMA = yes;
input Show15min200EMA = yes;

def Period1Min = AggregationPeriod.MIN;
def Period3min = AggregationPeriod.THREE_MIN;
def Period5min = AggregationPeriod.FIVE_MIN;
def Period15min = AggregationPeriod.FIFTEEN_MIN;
def AvgType = AverageType.EXPONENTIAL;
def na = double.nan;


################## JLines #################
################## 1Min ###################
def EMA72 = 72;
def EMA89 = 89;

plot EMA1min72 = MovingAverage(AvgType, close(period = Period1Min), EMA72);
plot EMA1min89 = MovingAverage(AvgType, close(period = Period1Min), EMA89);
EMA1min72.SetDefaultColor(Color.WHITE);
EMA1min72.SetStyle(Curve.firm);
EMA1min89.SetDefaultColor(Color.WHITE);
EMA1min89.SetStyle(Curve.firm);
EMA1min72.SetHiding(!Show1MinJlines);
EMA1min89.SetHiding(!Show1MinJlines);
DefineGlobalColor("1MinJlines Bull", color.cyan);
DefineGlobalColor("1MinJlines Bear", color.gray);
AddCloud(if Show1MinJlinesCloud == yes then EMA1min72 else na, if Show1MinJlinesCloud == yes then EMA1min89 else na, GlobalColor("1MinJlines Bull"), GlobalColor("1MinJlines Bear"));

################## 3Min #################
plot EMA3min72 = MovingAverage(AvgType, close(period = Period3min), EMA72);
plot EMA3min89 = MovingAverage(AvgType, close(period = Period3min), EMA89);
EMA3min72.SetDefaultColor(color.white);
EMA3min72.SetStyle(Curve.SHORT_DASH);
EMA3min89.SetDefaultColor(color.white);
EMA3min89.SetStyle(Curve.SHORT_DASH);
EMA3min72.SetHiding(!Show3MinJlines);
EMA3min89.SetHiding(!Show3MinJlines);
DefineGlobalColor("3MinJlines Bull", color.orange);
DefineGlobalColor("3MinJlines Bear", color.orange);
AddCloud(if Show3MinJlinesCloud == yes then EMA3min72 else na, if Show3MinJlinesCloud == yes then EMA3min89 else na, GlobalColor("3MinJlines Bull"), GlobalColor("3MinJlines Bear"));

################## 5Min #################
plot EMA5min72 = MovingAverage(AvgType, close(period = Period5min), EMA72);
plot EMA5min89 = MovingAverage(AvgType, close(period = Period5min), EMA89);
EMA5min72.SetDefaultColor(color.white);
EMA5min72.SetStyle(Curve.SHORT_DASH);
EMA5min89.SetDefaultColor(color.white);
EMA5min89.SetStyle(Curve.SHORT_DASH);
EMA5min72.SetHiding(!Show5MinJlines);
EMA5min89.SetHiding(!Show5MinJlines);
DefineGlobalColor("5MinJlines Bull", color.magenta);
DefineGlobalColor("5MinJlines Bear", color.magenta);
AddCloud(if Show5MinJlinesCloud == yes then EMA5min72 else na, if Show5MinJlinesCloud == yes then EMA5min89 else na, GlobalColor("5MinJlines Bull"), GlobalColor("5MinJlines Bear"));


################## Custom ###################
plot CustomEMA72 = MovingAverage(AvgType, close(period = CustomJLines), EMA72);
plot CustomEMA89 = MovingAverage(AvgType, close(period = CustomJLines), EMA89);
CustomEMA72.SetDefaultColor(color.cyan);
CustomEMA72.SetStyle(Curve.SHORT_DASH);
CustomEMA89.SetDefaultColor(color.cyan);
CustomEMA89.SetStyle(Curve.SHORT_DASH);
CustomEMA72.SetHiding(!ShowCustomJLines);
CustomEMA89.SetHiding(!ShowCustomJLines);
AddCloud(if ShowCustomJLines then CustomEMA72 else na, if ShowCustomJLines then CustomEMA89 else na, color.cyan, color.cyan);


################## 200EMAs #################
################## 1Min #################
plot OneMin200EMA = MovingAverage(AvgType, close(period = Period1min), 200);
OneMin200EMA.SetDefaultColor(color.white);
OneMin200EMA.SetStyle(Curve.short_DASH);
OneMin200EMA.SetLineWeight(1);
OneMin200EMA.SetHiding(!Show1min200EMA);

################## 5Min #################
plot FiveMin200EMA = MovingAverage(AvgType, close(period = Period5min), 200);
FiveMin200EMA.SetDefaultColor(color.white);
FiveMin200EMA.SetStyle(Curve.short_dash);
FiveMin200EMA.SetLineWeight(1);
FiveMin200EMA.SetHiding(!Show5min200EMA);

################## 15Min #################
plot FifteenMin200EMA = MovingAverage(AvgType, close(period = Period15min), 200);
FifteenMin200EMA.SetDefaultColor(color.white);
FifteenMin200EMA.SetStyle(Curve.firm);
FifteenMin200EMA.SetLineWeight(1);
FifteenMin200EMA.SetHiding(!Show15min200EMA);



################## 5Min 5/15 EMA Cross #################
def FiveMin5EMA = MovingAverage(AvgType, close(period = Period5min), 5);
def FiveMin15EMA = MovingAverage(AvgType, close(period = Period5min), 15);
plot FiveMin5EMAplot = if (FiveMin5EMA > Fivemin15EMA) and ShowBullishFiveFifteenCloud then FiveMin5EMA else if ((FiveMin5EMA < FiveMin15EMA) and ShowBearishFiveFifteenCloud) then FiveMin5EMA else Double.NaN;
plot FiveMin15EMAplot = if (FiveMin5EMA > Fivemin15EMA) and ShowBullishFiveFifteenCloud then FiveMin15EMA else if ((FiveMin5EMA < FiveMin15EMA) and ShowBearishFiveFifteenCloud) then FiveMin15EMA else Double.NaN;
FiveMin5EMAplot.SetHiding(!showFiveFifteenEMALines);
FiveMin15EMAplot.SetHiding(!showFiveFifteenEMALines);
DefineGlobalColor("5/15 Cross Bull", Color.GREEN);
DefineGlobalColor("5/15 Cross Bear", Color.LIGHT_RED);
AddCloud(FiveMin5EMAplot, FiveMin15EMAplot, GlobalColor("5/15 Cross Bull"), GlobalColor("5/15 Cross Bear"));




################## 9ema ##################
plot OneMin9EMA = MovingAverage(AvgType, close(period = Period1min), 9);
OneMin9EMA.SetDefaultColor(color.violet);
OneMin9EMA.setstyle(curve.short_dash);
OneMin9EMA.sethiding(!Show9EMA);
OneMin9EMA.hidebubble();
